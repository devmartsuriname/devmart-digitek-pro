import { z } from 'zod';

// Base FAQ schema matching backend.md exactly
export const FAQSchema = z.object({
  id: z.string().uuid(),
  category: z.string().nullable(),
  question: z.string().min(1),
  answer: z.string().min(1),
  order_num: z.number().int(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO
export const CreateFAQSchema = z.object({
  category: z.string().max(100).optional(),
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required').max(2000),
  order_num: z.number().int().min(0).default(0),
});

// Update DTO
export const UpdateFAQSchema = CreateFAQSchema.partial();

// Filter DTO
export const FAQFiltersSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type FAQ = z.infer<typeof FAQSchema>;
export type CreateFAQDTO = z.infer<typeof CreateFAQSchema>;
export type UpdateFAQDTO = z.infer<typeof UpdateFAQSchema>;
export type FAQFilters = z.infer<typeof FAQFiltersSchema>;
