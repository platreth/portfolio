'use server';

import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import * as cheerio from 'cheerio';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function scoutCompany(formData: FormData) {
    const url = formData.get('url') as string;

    if (!url) {
        return { error: 'Please provide a Company URL.' };
    }

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });
        if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status} ${res.statusText}`);
        const html = await res.text();
        const $ = cheerio.load(html);

        // Clean text
        $('script').remove();
        $('style').remove();
        const body = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 6000);

        const { object } = await generateObject({
            model: google('gemini-2.5-flash'),
            schema: z.object({
                oneLiner: z.string().describe('A crystal clear, jargon-free one-liner about what they do'),
                targetAudience: z.string().describe('Inferred primary target audience'),
                valueProps: z.array(z.string()).describe('List of 3 main value propositions'),
                competitors: z.array(z.string()).describe('3 potential competitor categories or known names'),
                rating: z.number().describe('A score from 1-10 on their messaging clarity'),
                improvement: z.string().describe('One specific tip to improve their landing page conversion'),
            }),
            prompt: `Analyze this company based on their homepage content:
      
      URL: ${url}
      CONTENT: ${body}
      
      Act as a Venture Capital Scout. Cut through the marketing fluff.
      1. What do they ACTUALLY do?
      2. Who is it for?
      3. Rate their messaging clarity.
      
      Be sharp, direct, and slightly critical but constructive.`,
        });

        return { success: true, data: object };
    } catch (error) {
        console.error('Scout error:', error);
        return { error: 'Could not access the site. It might have bot protection.' };
    }
}
