'use server';

import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function translateCode(formData: FormData) {
    const input = formData.get('input') as string;
    const mode = formData.get('mode') as string; // 'to-code' or 'explain'

    if (!input) {
        return { error: 'Please provide input.' };
    }

    try {
        const isToCode = mode === 'to-code';

        const { object } = await generateObject({
            model: google('gemini-2.5-flash'),
            schema: z.object({
                output: z.string().describe('The verified code solution OR explanation'),
                language: z.string().describe('The programming language used (e.g. Python, Regex, SQL)'),
                explanation: z.string().describe('Brief explanation of how it works'),
            }),
            prompt: isToCode
                ? `Translate this natural language request into high-quality, efficient code. Infer the language (Regex, SQL, Python, JS) from context if not specified.
           REQUEST: "${input}"`
                : `Explain this code in plain English. Break down complex logic.
           CODE: "${input}"`,
        });

        return { success: true, data: object };
    } catch (error) {
        console.error('Translate error:', error);
        return { error: 'Failed to process request.' };
    }
}
