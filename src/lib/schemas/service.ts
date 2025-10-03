import { z } from 'zod';

// Base Service schema matching backend.md exactly
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().nullable(),
  body: z.string().nullable(),
  icon_url: z.string().url().nullable(),
  seo_title: z.string().nullable(),
  seo_desc: z.string().nullable(),
  order_num: z.number().int().min(0),
  status: z.enum(['draft', 'published']),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO
export const CreateServiceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  summary: z.string().max(500).optional(),
  body: z.string().optional(),
  icon_url: z.string().url('Invalid icon URL').optional(),
  seo_title: z.string().max(200).optional(),
  seo_desc: z.string().max(300).optional(),
  order_num: z.number().int().min(0).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Update DTO
export const UpdateServiceSchema = CreateServiceSchema.partial();

// Filter DTO
export const ServiceFiltersSchema = z.object({
  status: z.enum(['draft', 'published']).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type Service = z.infer<typeof ServiceSchema>;
export type CreateServiceDTO = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceDTO = z.infer<typeof UpdateServiceSchema>;
export type ServiceFilters = z.infer<typeof ServiceFiltersSchema>;
