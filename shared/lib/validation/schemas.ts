import { z } from 'zod';

export const ContactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    project: z.string().min(1, { message: "Please select a project scope" }),
    budget: z.string().min(1, { message: "Please select a budget range" }),
    timeline: z.string().min(1, { message: "Please select a timeline" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

export const LeadApiSchema = ContactFormSchema.extend({
    source: z.string().optional(),
    phone: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
export type LeadApiPayload = z.infer<typeof LeadApiSchema>;
