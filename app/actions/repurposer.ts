'use server';

import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import * as cheerio from 'cheerio';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function repurposeContent(formData: FormData) {
    const url = formData.get('url') as string;

    if (!url) {
        return { error: 'Please provide a URL.' };
    }

    try {
        // 1. Scrape the content with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const html = await res.text();

        if (!html || html.length < 100) {
            throw new Error('Page content is too short or empty');
        }

        const $ = cheerio.load(html);

        // Simple extraction of title and body text
        const title = $('title').text();
        // Remove scripts, styles, etc.
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('footer').remove();
        const body = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 5000); // Limit to 5k chars

        // 2. Generate Content
        const { object } = await generateObject({
            model: google('gemini-2.5-flash'),
            schema: z.object({
                tweet: z.string().describe('A viral-style tweet thread opener or single tweet'),
                linkedin: z.string().describe('A professional LinkedIn post with hashtags'),
                newsletter: z.string().describe('A short, punchy newsletter blurb linking to this content'),
                summary: z.string().describe('One sentence summary of the source'),
            }),
            prompt: `You are a world-class growth marketer. Repurpose the following webpage content into three formats:
      
      SOURCE TITLE: ${title}
      SOURCE CONTENT: ${body}
      
      1. TWEET: punchy, hook-driven, no hashtags.
      2. LINKEDIN: professional but engaging, line breaks for readability.
      3. NEWSLETTER: "TL;DR" style.
      
      Keep the tone confident and high-value.`,
        });

        return { success: true, data: object };
    } catch (error) {
        console.error('Repurpose error:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { error: `Failed to process this URL: ${errorMessage}` };
    }
}
