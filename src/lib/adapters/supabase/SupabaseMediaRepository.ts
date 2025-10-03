import { supabase } from '@/integrations/supabase/client';
import type { IMediaRepository } from '@/lib/repos/IMediaRepository';
import type { Media, CreateMediaDTO, UpdateMediaDTO, MediaFilters } from '@/lib/schemas/media';
import type { Database } from '@/integrations/supabase/types';

type MediaRow = Database['public']['Tables']['media']['Row'];

export class SupabaseMediaRepository implements IMediaRepository {
  private mapToMedia(row: MediaRow): Media {
    return {
      id: row.id,
      url: row.url,
      alt: row.alt,
      width: row.width,
      height: row.height,
      type: row.type,
      folder: row.folder,
      created_at: row.created_at,
    };
  }

  async create(data: CreateMediaDTO): Promise<Media> {
    const { data: row, error } = await supabase
      .from('media')
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(`Failed to create media: ${error.message}`);
    return this.mapToMedia(row);
  }

  async findById(id: string): Promise<Media | null> {
    const { data: row, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find media: ${error.message}`);
    return row ? this.mapToMedia(row) : null;
  }

  async findAll(filters?: MediaFilters): Promise<Media[]> {
    let query = supabase.from('media').select('*');

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.folder) {
      query = query.eq('folder', filters.folder);
    }

    if (filters?.search) {
      query = query.or(`alt.ilike.%${filters.search}%,url.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 50) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find media: ${error.message}`);
    return rows?.map(row => this.mapToMedia(row)) || [];
  }

  async findByFolder(folder: string): Promise<Media[]> {
    return this.findAll({ folder });
  }

  async count(filters?: MediaFilters): Promise<number> {
    let query = supabase.from('media').select('*', { count: 'exact', head: true });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.folder) {
      query = query.eq('folder', filters.folder);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count media: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateMediaDTO): Promise<Media> {
    const { data: row, error } = await supabase
      .from('media')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update media: ${error.message}`);
    return this.mapToMedia(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete media: ${error.message}`);
  }
}
