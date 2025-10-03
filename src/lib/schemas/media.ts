import { z } from 'zod';

// Base Media schema matching backend.md exactly
export const MediaSchema = z.object({
  id: z.string().uuid(),
  url: z.string().min(1),
  alt: z.string().nullable(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  type: z.string().nullable(),
  folder: z.string().nullable(),
  created_at: z.string(),
});

// Create DTO
export const CreateMediaSchema = z.object({
  url: z.string().url('Invalid URL'),
  alt: z.string().max(200).optional(),
  width: z.number().int().min(1).optional(),
  height: z.number().int().min(1).optional(),
  type: z.string().max(50).optional(),
  folder: z.string().max(100).optional(),
});

// Update DTO
export const UpdateMediaSchema = z.object({
  alt: z.string().max(200).optional(),
  folder: z.string().max(100).optional(),
});

// Filter DTO
export const MediaFiltersSchema = z.object({
  type: z.string().optional(),
  folder: z.string().optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type Media = z.infer<typeof MediaSchema>;
export type CreateMediaDTO = z.infer<typeof CreateMediaSchema>;
export type UpdateMediaDTO = z.infer<typeof UpdateMediaSchema>;
export type MediaFilters = z.infer<typeof MediaFiltersSchema>;
