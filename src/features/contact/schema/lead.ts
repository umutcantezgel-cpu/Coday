import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.enum([
    'Neue Website',
    'Redesign',
    'Headless CMS',
    'SEO/GEO',
    'Wartung',
    'Sonstiges',
  ]),
  budget: z.enum([
    '<5k',
    '5-10k',
    '10-25k',
    '25-50k',
    '50k+',
    'Unsicher',
  ]),
  timeframe: z.enum([
    'ASAP',
    '1-3 Monate',
    '3-6 Monate',
    '> 6 Monate',
    'Flexibel',
  ]),
  description: z.string().min(30, 'Please describe your project in at least 30 characters'),
  source: z.string().optional(),
  privacyAccepted: z.literal(true, {
    message: 'You must accept the privacy policy'
  }),
  // Honeypot field (hidden from users, bots might fill it)
  address_line_2: z.string().max(0, 'Invalid submission').optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const calculateLeadScore = (data: LeadFormValues): number => {
  let score = 0;
  
  if (data.budget === '10-25k' || data.budget === '25-50k' || data.budget === '50k+') {
    score += 3;
  }
  if (data.timeframe === 'ASAP') {
    score += 2;
  }
  
  const descLower = data.description.toLowerCase();
  if (descLower.includes('wetzlar') || descLower.includes('hessen')) {
    score += 2;
  }
  
  if (data.phone && data.phone.trim().length > 5) {
    score += 1;
  }
  
  if (data.description.length > 100) {
    score += 1;
  }
  
  return score;
};
