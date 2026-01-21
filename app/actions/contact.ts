'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const ContactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    type: z.enum(['consultation', 'development', 'legacy', 'other']),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactState = {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // Validate form data
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        type: formData.get('type'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, type, message } = validatedFields.data;

    try {
        await resend.emails.send({
            from: 'Contact <onboarding@resend.dev>', // Default Resend test domain
            to: 'zaamsflow@gmail.com',
            replyTo: email,
            subject: `[Zaamsflow] New ${type} Inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Type: ${type}

Message:
${message}
            `,
            html: `
                <h2>New Website Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type:</strong> ${type}</p>
                <hr />
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        });

        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Resend Error:', error);
        return { success: false, message: 'Failed to send message. Please try again.' };
    }
}
