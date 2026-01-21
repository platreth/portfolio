'use server';

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function extractData(formData: FormData) {
    const text = formData.get('text') as string;
    const fieldsInput = formData.get('fields') as string;

    if (!text || !fieldsInput) {
        return { error: 'Please provide both text and fields.' };
    }

    const fields = fieldsInput.split(',').map((f) => f.trim());

    try {
        const { text: response } = await generateText({
            model: google('gemini-2.5-flash'),
            prompt: `You are a data extraction expert. Extract the following fields from the text and return ONLY a valid JSON array of objects.

Fields to extract: ${fields.join(', ')}

Text to analyze:
"${text}"

IMPORTANT:
- Return ONLY the JSON array, no other text
- Each object in the array should have these exact keys: ${fields.join(', ')}
- If a field is not found, use an empty string ""
- Extract ALL items found in the text

Example format:
[
  {"${fields[0]}": "value1", "${fields[1]}": "value2"},
  {"${fields[0]}": "value3", "${fields[1]}": "value4"}
]`,
        });

        // Parse the JSON response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('No valid JSON array found in response');
        }

        const data = JSON.parse(jsonMatch[0]);
        return { success: true, data };
    } catch (error) {
        console.error('Extraction error:', error);
        return { error: `Failed to extract data: ${error instanceof Error ? error.message : String(error)}` };
    }
}
