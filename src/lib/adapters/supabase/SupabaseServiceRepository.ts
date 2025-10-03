import { supabase } from '@/integrations/supabase/client';
import type { IServiceRepository } from '@/lib/repos/IServiceRepository';
import type { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';
import type { Database } from '@/integrations/supabase/types';

type ServiceRow = Database['public']['Tables']['services']['Row'];

export class SupabaseServiceRepository implements IServiceRepository {
  private mapToService(row: ServiceRow): Service {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      body: row.body,
      icon_url: row.icon_url,
      seo_title: row.seo_title,
      seo_desc: row.seo_desc,
      order_num: row.order_num,
      status: row.status as 'draft' | 'published',
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: CreateServiceDTO): Promise<Service> {
    const { data: row, error } = await supabase
      .from('services')
      .insert({
        ...data,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create service: ${error.message}`);
    return this.mapToService(row);
  }

  async findById(id: string): Promise<Service | null> {
    const { data: row, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find service: ${error.message}`);
    return row ? this.mapToService(row) : null;
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const { data: row, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`Failed to find service: ${error.message}`);
    return row ? this.mapToService(row) : null;
  }

  async findAll(filters?: ServiceFilters): Promise<Service[]> {
    let query = supabase.from('services').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
    }

    query = query.order('order_num', { ascending: true });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find services: ${error.message}`);
    return rows?.map(row => this.mapToService(row)) || [];
  }

  async findAllPublished(filters?: Omit<ServiceFilters, 'status'>): Promise<Service[]> {
    return this.findAll({ ...filters, status: 'published' });
  }

  async count(filters?: ServiceFilters): Promise<number> {
    let query = supabase.from('services').select('*', { count: 'exact', head: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count services: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateServiceDTO): Promise<Service> {
    const { data: row, error } = await supabase
      .from('services')
      .update({
        ...data,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update service: ${error.message}`);
    return this.mapToService(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete service: ${error.message}`);
  }
}
