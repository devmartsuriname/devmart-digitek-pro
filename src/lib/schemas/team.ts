import { z } from 'zod';

// Base Team schema matching backend.md exactly
export const TeamMemberSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().nullable(),
  bio: z.string().nullable(),
  photo_url: z.string().nullable(),
  socials: z.record(z.string()).nullable(),
  order_num: z.number().int(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO
export const CreateTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  role: z.string().max(100).optional(),
  bio: z.string().max(1000).optional(),
  photo_url: z.string().url('Invalid photo URL').optional(),
  socials: z.record(z.string().url('Invalid social URL')).optional(),
  order_num: z.number().int().min(0).default(0),
});

// Update DTO
export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial();

// Filter DTO
export const TeamMemberFiltersSchema = z.object({
  search: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

// Type exports
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type CreateTeamMemberDTO = z.infer<typeof CreateTeamMemberSchema>;
export type UpdateTeamMemberDTO = z.infer<typeof UpdateTeamMemberSchema>;
export type TeamMemberFilters = z.infer<typeof TeamMemberFiltersSchema>;
