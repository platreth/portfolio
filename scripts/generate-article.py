#!/usr/bin/env python3
"""
AI Blog Article Generator
Generates technical blog posts using Google Gemini and publishes them via API
"""

import os
import json
import requests
from datetime import datetime
from google import genai

# Configuration
GEMINI_API_KEY = os.environ.get('GOOGLE_GENERATIVE_AI_API_KEY')
BLOG_API_KEY = os.environ.get('BLOG_PUBLISH_API_KEY')
BLOG_API_URL = os.environ.get('BLOG_API_URL', 'https://zaamsflow.com/api/publish-article')

# Topics pool for article generation
TOPICS = [
    "Building MCP servers for legacy PHP applications",
    "Implementing RAG with local LLMs for GDPR compliance",
    "Migrating from Zend Framework to modern Laravel",
    "AI-powered code review for PHP codebases",
    "Serverless AI agents with Vercel Edge Functions",
    "Database optimization strategies for AI workloads",
    "Building autonomous customer support agents",
    "Type-safe AI integrations with TypeScript",
    "Real-time AI features with WebSockets and Next.js",
    "Cost optimization for OpenAI API usage",
    "Local AI inference on consumer hardware",
    "Building reliable AI workflows with LangGraph",
    "API design for AI-first applications",
    "Testing strategies for AI-powered features",
    "Privacy-first AI for European businesses"
]

def generate_article(topic: str, retries: int = 2) -> dict:
    """Generate a blog article using Gemini AI with retry logic and schema validation"""
    
    if not GEMINI_API_KEY:
        raise ValueError("GOOGLE_GENERATIVE_AI_API_KEY not set")
    
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    prompt = f"""You are Hugo Platret, a senior full-stack developer specializing in AI and PHP.
Write a technical blog post for zaamsflow.com about: {topic}

Requirements:
- Title: SEO-optimized, 50-70 characters, compelling
- Excerpt: Hook that makes developers want to read, 120-160 characters
- Content: 800-1200 words in Markdown format
- Include practical code examples (PHP/TypeScript)
- Target audience: Senior developers, CTOs, tech leads
- Tone: Technical but approachable, confident, practical
- Focus on real-world e-commerce or SaaS contexts

IMPORTANT: Ensure all double quotes and backslashes in your Markdown content are properly escaped for JSON.
"""

    for attempt in range(retries + 1):
        try:
            # Use JSON mode with a strict schema for maximum reliability
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': {
                        'type': 'OBJECT',
                        'properties': {
                            'title': {'type': 'STRING'},
                            'excerpt': {'type': 'STRING'},
                            'content': {'type': 'STRING'},
                            'tags': {'type': 'ARRAY', 'items': {'type': 'STRING'}}
                        },
                        'required': ['title', 'excerpt', 'content', 'tags']
                    }
                }
            )
            
            text = response.text.strip()
            # strict=False allows control characters like \n in the string content
            article = json.loads(text, strict=False)
            return article
            
        except (json.JSONDecodeError, Exception) as e:
            if attempt == retries:
                print(f"❌ Final attempt failed: {e}")
                if 'text' in locals():
                    print(f"Response text start: {text[:200]}...")
                raise
            print(f"⚠️ Attempt {attempt + 1} failed, retrying in 2s... Error: {e}")
            import time
            time.sleep(2)

def save_article(article: dict) -> str:
    """Save the generated article directly to the content/blog directory"""
    import re
    # Generate slug from title
    slug = re.sub(r'[^a-z0-9]+', '-', article['title'].lower()).strip('-')
    
    # Create the frontmatter and content
    today = datetime.now().strftime('%Y-%m-%d')
    tags_formatted = json.dumps(article.get('tags', []))
    
    mdx_content = f"""---
title: "{article['title']}"
date: "{today}"
excerpt: "{article['excerpt']}"
tags: {tags_formatted}
readTime: "5 min"
---

{article['content']}
"""

    # Determine the path
    # When running in GitHub Actions or local repo root
    base_path = os.getcwd()
    blog_dir = os.path.join(base_path, 'content', 'blog')
    
    # Ensure directory exists
    os.makedirs(blog_dir, exist_ok=True)
    
    file_path = os.path.join(blog_dir, f"{slug}.mdx")
    
    # Write the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(mdx_content)
    
    return slug

def main():
    """Main execution"""
    # Select topic (rotate through list based on day of year)
    day_of_year = datetime.now().timetuple().tm_yday
    topic = TOPICS[day_of_year % len(TOPICS)]
    
    print(f"📝 Generating article about: {topic}")
    
    try:
        # Generate article
        article = generate_article(topic)
        print(f"✅ Generated: {article['title']}")
        
        # Save directly to filesystem
        slug = save_article(article)
        print(f"🚀 Saved locally: content/blog/{slug}.mdx")
        print("   GitHub Action will now commit this file.")
        
        return 0
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == '__main__':
    exit(main())
