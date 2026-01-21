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

def generate_article(topic: str) -> dict:
    """Generate a blog article using Gemini AI"""
    
    if not GEMINI_API_KEY:
        raise ValueError("GOOGLE_GENERATIVE_AI_API_KEY not set")
    
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    prompt = f"""You are Hugo Platret, a senior full-stack developer specializing in AI and PHP.
Write a technical blog post for zaamsflow.com about: {topic}

Requirements:
- Title: SEO-optimized, 50-70 characters, compelling
- Excerpt: Hook that makes developers want to read, 120-160 characters
- Content: 800-1200 words in Markdown format
- Include practical code examples
- Target audience: Senior developers, CTOs, tech leads
- Tone: Technical but approachable, confident, practical
- Focus on real-world implementation, not theory
- Include specific examples from e-commerce or SaaS contexts

Structure:
1. Hook (problem statement)
2. Context (why this matters)
3. Solution (practical approach with code)
4. Real-world impact
5. Conclusion with actionable takeaway

Return valid JSON in this exact format:
{{
  "title": "Article title here",
  "excerpt": "Compelling excerpt here",
  "content": "# Introduction\\n\\nFull markdown content here...",
  "tags": ["Tag1", "Tag2", "Tag3"]
}}"""

    # Use JSON mode for better reliability
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
        }
    )
    
    text = response.text.strip()
    
    try:
        # Use strict=False to handle potential control characters (like literal tabs) 
        # that might be present in the markdown content string
        article = json.loads(text, strict=False)
        return article
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON: {e}")
        # Log the full response for debugging (truncated for brevity in standard output)
        print(f"Response text start: {text[:500]}...")
        print(f"Response text end: ...{text[-500:]}")
        raise

def publish_article(article: dict) -> dict:
    """Publish article via API"""
    
    if not BLOG_API_KEY:
        raise ValueError("BLOG_PUBLISH_API_KEY not set")
    
    payload = {
        **article,
        'apiKey': BLOG_API_KEY
    }
    
    response = requests.post(BLOG_API_URL, json=payload)
    response.raise_for_status()
    
    return response.json()

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
        print(f"   Tags: {', '.join(article['tags'])}")
        print(f"   Length: {len(article['content'])} characters")
        
        # Publish article
        result = publish_article(article)
        print(f"🚀 Published: {result['url']}")
        print(f"   Slug: {result['slug']}")
        
        return 0
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == '__main__':
    exit(main())
