import { z } from 'zod';

// Base Project schema matching backend.md exactly
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  client: z.string().nullable(),
  date: z.string().nullable(),
  cover_url: z.string().nullable(),
  gallery: z.array(z.string()).nullable(),
  tech: z.array(z.string()).nullable(),
  summary: z.string().nullable(),
  body: z.string().nullable(),
  seo_title: z.string().nullable(),
  seo_desc: z.string().nullable(),
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO
export const CreateProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  client: z.string().max(200).optional(),
  date: z.string().optional(),
  cover_url: z.string().url('Invalid cover URL').optional(),
  gallery: z.array(z.string().url()).optional(),
  tech: z.array(z.string().max(50)).optional(),
  summary: z.string().max(500).optional(),
  body: z.string().optional(),
  seo_title: z.string().max(200).optional(),
  seo_desc: z.string().max(300).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Update DTO
export const UpdateProjectSchema = CreateProjectSchema.partial();

// Filter DTO
export const ProjectFiltersSchema = z.object({
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  tech: z.string().optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof UpdateProjectSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersSchema>;
