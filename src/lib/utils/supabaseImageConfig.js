/**
 * Supabase Storage Configuration for Image Optimization
 * 
 * This file documents the required Supabase Storage configuration for image transformations.
 * 
 * IMPORTANT: Supabase Image Transformation is ONLY available on Pro plan or higher.
 * Free tier does NOT support automatic image transformations.
 * 
 * For production deployment:
 * 1. Upgrade to Supabase Pro plan
 * 2. Enable image transformations in Supabase Dashboard:
 *    Settings > Storage > Image Transformations > Enable
 * 3. Buckets must be PUBLIC for transformations to work
 * 
 * Supported transformations:
 * - width/height resize
 * - quality adjustment (1-100)
 * - format conversion (webp, jpg, png)
 * - blur effect (for LQIP)
 * 
 * Example transformation URL:
 * https://[project].supabase.co/storage/v1/render/image/public/[bucket]/[path]?width=800&quality=80&format=webp
 * 
 * Fallback strategy for free tier:
 * - Images are served as-is without transformations
 * - LQIP uses original image with CSS blur
 * - Consider using external CDN (Cloudinary/Imgix) for free tier projects
 */

export const STORAGE_BUCKETS = {
  PROJECT_COVERS: 'project-covers',
  BLOG_COVERS: 'blog-covers',
  TEAM_PHOTOS: 'team-photos',
  MEDIA_LIBRARY: 'media-library',
};

export const IMAGE_PRESETS = {
  // Hero images (large, high quality)
  hero: {
    width: 1920,
    quality: 90,
    format: 'webp',
  },
  
  // Thumbnail (small, fast loading)
  thumbnail: {
    width: 320,
    quality: 75,
    format: 'webp',
  },
  
  // Card images (medium size)
  card: {
    width: 640,
    quality: 80,
    format: 'webp',
  },
  
  // Full width images
  full: {
    width: 1280,
    quality: 85,
    format: 'webp',
  },
  
  // Placeholder (LQIP)
  placeholder: {
    width: 20,
    quality: 30,
    format: 'webp',
    blur: 10,
  },
  
  // Avatar images
  avatar: {
    width: 256,
    quality: 85,
    format: 'webp',
  },
};

export const RESPONSIVE_SIZES = {
  // Mobile first sizes
  mobile: [320, 480, 640],
  
  // Tablet sizes
  tablet: [768, 1024],
  
  // Desktop sizes
  desktop: [1280, 1536, 1920],
  
  // All sizes (default)
  all: [320, 480, 640, 768, 1024, 1280, 1536, 1920],
};

/**
 * Check if Supabase project supports image transformations
 * @returns {Promise<boolean>}
 */
export const checkImageTransformSupport = async () => {
  // This is a placeholder - actual implementation would need to:
  // 1. Make a test transformation request
  // 2. Check if it returns transformed image or original
  // 3. Cache result in localStorage
  
  // For now, assume transformations are available
  // In production, implement proper feature detection
  return true;
};

/**
 * SQL migration for creating storage buckets with proper RLS
 * Run this in Supabase SQL Editor
 */
export const STORAGE_MIGRATION_SQL = `
-- Create storage buckets for optimized images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-covers', 'project-covers', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('blog-covers', 'blog-covers', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('team-photos', 'team-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('media-library', 'media-library', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for authenticated uploads
CREATE POLICY "Authenticated users can upload to project-covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-covers');

CREATE POLICY "Authenticated users can upload to blog-covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-covers');

CREATE POLICY "Authenticated users can upload to team-photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can upload to media-library"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media-library');

-- Public read access for all buckets
CREATE POLICY "Public read access for project-covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-covers');

CREATE POLICY "Public read access for blog-covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-covers');

CREATE POLICY "Public read access for team-photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'team-photos');

CREATE POLICY "Public read access for media-library"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media-library');

-- Admins and editors can delete
CREATE POLICY "Admins and editors can delete from all buckets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);
`;
