import { supabase } from '@/integrations/supabase/client';
import type { IProjectRepository } from '@/lib/repos/IProjectRepository';
import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilters } from '@/lib/schemas/project';
import type { Database } from '@/integrations/supabase/types';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

export class SupabaseProjectRepository implements IProjectRepository {
  private mapToProject(row: ProjectRow): Project {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      client: row.client,
      date: row.date,
      cover_url: row.cover_url,
      gallery: (row.gallery as any) || null,
      tech: row.tech,
      summary: row.summary,
      body: row.body,
      seo_title: row.seo_title,
      seo_desc: row.seo_desc,
      featured: row.featured,
      status: row.status as 'draft' | 'published',
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    const { data: row, error } = await supabase
      .from('projects')
      .insert({
        ...data,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create project: ${error.message}`);
    return this.mapToProject(row);
  }

  async findById(id: string): Promise<Project | null> {
    const { data: row, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find project: ${error.message}`);
    return row ? this.mapToProject(row) : null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const { data: row, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`Failed to find project: ${error.message}`);
    return row ? this.mapToProject(row) : null;
  }

  async findAll(filters?: ProjectFilters): Promise<Project[]> {
    let query = supabase.from('projects').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    if (filters?.tech) {
      query = query.contains('tech', [filters.tech]);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,client.ilike.%${filters.search}%`);
    }

    query = query.order('date', { ascending: false });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find projects: ${error.message}`);
    return rows?.map(row => this.mapToProject(row)) || [];
  }

  async findAllPublished(filters?: Omit<ProjectFilters, 'status'>): Promise<Project[]> {
    return this.findAll({ ...filters, status: 'published' });
  }

  async findFeatured(limit: number = 6): Promise<Project[]> {
    const { data: rows, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to find featured projects: ${error.message}`);
    return rows?.map(row => this.mapToProject(row)) || [];
  }

  async count(filters?: ProjectFilters): Promise<number> {
    let query = supabase.from('projects').select('*', { count: 'exact', head: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count projects: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateProjectDTO): Promise<Project> {
    const { data: row, error } = await supabase
      .from('projects')
      .update({
        ...data,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update project: ${error.message}`);
    return this.mapToProject(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete project: ${error.message}`);
  }
}
