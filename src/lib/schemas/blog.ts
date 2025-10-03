import { z } from 'zod';

// Base BlogPost schema matching backend.md exactly
export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  author_id: z.string().uuid().nullable(),
  date: z.string(),
  cover_url: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  summary: z.string().nullable(),
  body_mdx: z.string().nullable(),
  seo_title: z.string().nullable(),
  seo_desc: z.string().nullable(),
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  views: z.number().int(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO
export const CreateBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  author_id: z.string().uuid().optional(),
  date: z.string().optional(),
  cover_url: z.string().url('Invalid cover URL').optional(),
  tags: z.array(z.string().max(50)).optional(),
  summary: z.string().max(500).optional(),
  body_mdx: z.string().optional(),
  seo_title: z.string().max(200).optional(),
  seo_desc: z.string().max(300).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Update DTO
export const UpdateBlogPostSchema = CreateBlogPostSchema.partial();

// Filter DTO
export const BlogPostFiltersSchema = z.object({
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  author_id: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type CreateBlogPostDTO = z.infer<typeof CreateBlogPostSchema>;
export type UpdateBlogPostDTO = z.infer<typeof UpdateBlogPostSchema>;
export type BlogPostFilters = z.infer<typeof BlogPostFiltersSchema>;
