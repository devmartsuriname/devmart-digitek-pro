import { z } from 'zod';

// Base Settings schema matching backend.md exactly
export const SettingsSchema = z.object({
  id: z.string().uuid(),
  site_name: z.string().nullable(),
  logo_url: z.string().nullable(),
  theme: z.string().nullable(),
  primary_color: z.string().nullable(),
  contact_email: z.string().nullable(),
  contact_phone: z.string().nullable(),
  address: z.string().nullable(),
  google_maps_url: z.string().nullable(),
  social: z.record(z.string()).nullable(),
  analytics: z.record(z.string()).nullable(),
  meta_title: z.string().nullable(),
  meta_desc: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Update DTO (settings are update-only, singleton pattern)
export const UpdateSettingsSchema = z.object({
  site_name: z.string().max(200).optional(),
  logo_url: z.string().url('Invalid logo URL').optional(),
  theme: z.string().max(50).optional(),
  primary_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
  contact_email: z.string().email('Invalid email').max(255).optional(),
  contact_phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  google_maps_url: z.string().url('Invalid URL').optional(),
  social: z.record(z.string().url('Invalid social URL')).optional(),
  analytics: z.record(z.string()).optional(),
  meta_title: z.string().max(200).optional(),
  meta_desc: z.string().max(300).optional(),
});

// Type exports
export type Settings = z.infer<typeof SettingsSchema>;
export type UpdateSettingsDTO = z.infer<typeof UpdateSettingsSchema>;
