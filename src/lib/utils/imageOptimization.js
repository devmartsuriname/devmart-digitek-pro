/**
 * Image Optimization Utilities
 * Helpers for Supabase Storage transformations, WebP conversion, and responsive images
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Check if URL is from Supabase Storage
 * @param {string} url - Image URL
 * @returns {boolean}
 */
export const isSupabaseStorageUrl = (url) => {
  if (!url) return false;
  return url.includes('supabase.co/storage/v1/object/public/');
};

/**
 * Extract bucket and path from Supabase Storage URL
 * @param {string} url - Full Supabase Storage URL
 * @returns {object} - { bucket, path } or null
 */
export const parseSupabaseStorageUrl = (url) => {
  if (!isSupabaseStorageUrl(url)) return null;

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/storage/v1/object/public/');
    if (pathParts.length !== 2) return null;

    const [bucket, ...pathSegments] = pathParts[1].split('/');
    return {
      bucket,
      path: pathSegments.join('/'),
    };
  } catch (error) {
    console.error('Failed to parse Supabase Storage URL:', error);
    return null;
  }
};

/**
 * Get optimized image URL with transformations
 * Supports Supabase Storage transformations and fallback to original
 * 
 * @param {string} url - Original image URL
 * @param {object} options - Transformation options
 * @param {number} options.width - Resize width
 * @param {number} options.height - Resize height
 * @param {number} options.quality - Quality (1-100, default: 80)
 * @param {string} options.format - Output format (webp, jpg, png, auto)
 * @param {number} options.blur - Blur radius (for LQIP)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return '';

  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    blur,
  } = options;

  // For Supabase Storage URLs, use transformation API
  if (isSupabaseStorageUrl(url)) {
    const parsed = parseSupabaseStorageUrl(url);
    if (!parsed) return url;

    try {
      const { data } = supabase.storage
        .from(parsed.bucket)
        .getPublicUrl(parsed.path, {
          transform: {
            width,
            height,
            quality,
            format,
            ...(blur && { blur }),
          },
        });

      return data.publicUrl;
    } catch (error) {
      console.error('Failed to generate optimized URL:', error);
      return url;
    }
  }

  // For external URLs or local assets, return as-is
  // (In production, you might use a CDN service like Cloudinary/Imgix here)
  return url;
};

/**
 * Generate srcset for responsive images
 * @param {string} url - Original image URL
 * @param {array} sizes - Array of widths (e.g., [320, 640, 1024])
 * @returns {string} - srcset string
 */
export const generateSrcSet = (url, sizes = [320, 640, 768, 1024, 1280, 1536]) => {
  if (!url) return '';

  // Only generate srcset for Supabase Storage URLs
  if (!isSupabaseStorageUrl(url)) return '';

  const srcSetArray = sizes.map((size) => {
    const optimizedUrl = getOptimizedImageUrl(url, {
      width: size,
      quality: 85,
      format: 'webp',
    });
    return `${optimizedUrl} ${size}w`;
  });

  return srcSetArray.join(', ');
};

/**
 * Preload critical images (for hero/above-the-fold images)
 * @param {string} url - Image URL
 * @param {object} options - Optimization options
 */
export const preloadImage = (url, options = {}) => {
  if (!url || typeof window === 'undefined') return;

  const optimizedUrl = getOptimizedImageUrl(url, {
    width: options.width || 1920,
    quality: 85,
    format: 'webp',
    ...options,
  });

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizedUrl;
  
  if (options.sizes) {
    link.sizes = options.sizes;
  }

  document.head.appendChild(link);
};

/**
 * Upload image to Supabase Storage with automatic optimization
 * @param {File} file - Image file
 * @param {string} bucket - Storage bucket name
 * @param {string} path - Storage path (without filename)
 * @returns {Promise<object>} - { url, error }
 */
export const uploadOptimizedImage = async (file, bucket, path = '') => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    const fullPath = path ? `${path}/${filename}` : filename;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '31536000', // 1 year cache
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
      error: null,
    };
  } catch (error) {
    console.error('Failed to upload image:', error);
    return {
      url: null,
      path: null,
      error: error.message,
    };
  }
};

/**
 * Get image dimensions from File or URL
 * @param {File|string} source - Image file or URL
 * @returns {Promise<object>} - { width, height }
 */
export const getImageDimensions = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    if (source instanceof File) {
      img.src = URL.createObjectURL(source);
    } else if (typeof source === 'string') {
      img.src = source;
    } else {
      reject(new Error('Invalid source type'));
    }
  });
};

/**
 * Check if browser supports WebP
 * @returns {boolean}
 */
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Generate placeholder data URL (tiny blurred version)
 * @param {string} url - Original image URL
 * @returns {Promise<string>} - Data URL placeholder
 */
export const generatePlaceholder = async (url) => {
  try {
    // Get tiny optimized version
    const tinyUrl = getOptimizedImageUrl(url, {
      width: 20,
      quality: 30,
      format: 'webp',
    });

    // Fetch and convert to data URL
    const response = await fetch(tinyUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to generate placeholder:', error);
    return '';
  }
};
