import { useState, useEffect, useCallback } from 'react';
import { SupabaseMediaRepository } from '@/lib/adapters/supabase/SupabaseMediaRepository';
import { supabase } from '@/integrations/supabase/client';
import type { Media, CreateMediaDTO, UpdateMediaDTO, MediaFilters } from '@/lib/schemas/media';

const mediaRepo = new SupabaseMediaRepository();

export function useMedia(filters?: MediaFilters) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [mediaList, count] = await Promise.all([
        mediaRepo.findAll(filters),
        mediaRepo.count(filters),
      ]);
      setMedia(mediaList);
      setTotalCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const uploadMedia = async (
    file: File,
    folder?: string,
    alt?: string
  ): Promise<Media> => {
    try {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      // Create database record
      const mediaData: CreateMediaDTO = {
        url: publicUrl,
        alt: alt || file.name,
        width: undefined,
        height: undefined,
        type: file.type,
        folder: folder || null,
      };

      const newMedia = await mediaRepo.create(mediaData);
      
      // Refresh media list
      await fetchMedia();
      
      return newMedia;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upload media');
    }
  };

  const updateMedia = async (id: string, data: UpdateMediaDTO): Promise<Media> => {
    try {
      const updated = await mediaRepo.update(id, data);
      await fetchMedia();
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update media');
    }
  };

  const deleteMedia = async (id: string): Promise<void> => {
    try {
      const mediaItem = await mediaRepo.findById(id);
      if (!mediaItem) throw new Error('Media not found');

      // Extract file path from URL
      const url = new URL(mediaItem.url);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(pathParts.indexOf('media-library') + 1).join('/');

      // Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('media-library')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from DB
      await mediaRepo.delete(id);
      
      // Refresh media list
      await fetchMedia();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete media');
    }
  };

  const copyToClipboard = async (url: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      throw new Error('Failed to copy URL to clipboard');
    }
  };

  return {
    media,
    loading,
    error,
    totalCount,
    uploadMedia,
    updateMedia,
    deleteMedia,
    copyToClipboard,
    refreshMedia: fetchMedia,
  };
}

export function useMediaItem(id: string) {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const mediaItem = await mediaRepo.findById(id);
        setMedia(mediaItem);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch media');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMedia();
    }
  }, [id]);

  return { media, loading, error };
}
