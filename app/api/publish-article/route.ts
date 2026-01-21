import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple API key check (store in .env)
const API_KEY = process.env.BLOG_PUBLISH_API_KEY || 'your-secret-key-here';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, excerpt, content, tags, apiKey } = body;

        // Validate API key
        if (apiKey !== API_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Validate required fields
        if (!title || !excerpt || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: title, excerpt, content' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Create frontmatter
        const today = new Date().toISOString().split('T')[0];
        const frontmatter = `---
title: "${title}"
date: "${today}"
excerpt: "${excerpt}"
tags: [${tags?.map((tag: string) => `"${tag}"`).join(', ') || ''}]
readTime: "5 min"
---

${content}`;

        // Write to file
        const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: 'Article with this slug already exists' },
                { status: 409 }
            );
        }

        fs.writeFileSync(filePath, frontmatter, 'utf8');

        return NextResponse.json({
            success: true,
            slug,
            url: `/blog/${slug}`,
            message: 'Article published successfully'
        });

    } catch (error) {
        console.error('Publish error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
