import { z } from 'zod';

// Base Lead schema matching backend.md exactly
export const LeadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  subject: z.string().nullable(),
  message: z.string().min(1),
  source: z.string().nullable(),
  status: z.enum(['new', 'contacted', 'closed']),
  created_at: z.string(),
});

// Create DTO (public form submission)
export const CreateLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
  source: z.string().max(100).optional(),
});

// Update DTO (admin only)
export const UpdateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']),
});

// Filter DTO
export const LeadFiltersSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type Lead = z.infer<typeof LeadSchema>;
export type CreateLeadDTO = z.infer<typeof CreateLeadSchema>;
export type UpdateLeadDTO = z.infer<typeof UpdateLeadSchema>;
export type LeadFilters = z.infer<typeof LeadFiltersSchema>;
