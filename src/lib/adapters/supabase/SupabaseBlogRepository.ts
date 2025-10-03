import { supabase } from '@/integrations/supabase/client';
import type { IBlogRepository } from '@/lib/repos/IBlogRepository';
import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from '@/lib/schemas/blog';
import type { Database } from '@/integrations/supabase/types';

type BlogPostRow = Database['public']['Tables']['blog_posts']['Row'];

export class SupabaseBlogRepository implements IBlogRepository {
  private mapToBlogPost(row: BlogPostRow): BlogPost {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      author_id: row.author_id,
      date: row.date,
      cover_url: row.cover_url,
      tags: row.tags,
      summary: row.summary,
      body_mdx: row.body_mdx,
      seo_title: row.seo_title,
      seo_desc: row.seo_desc,
      featured: row.featured,
      status: row.status as 'draft' | 'published',
      views: row.views,
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: CreateBlogPostDTO): Promise<BlogPost> {
    const user = (await supabase.auth.getUser()).data.user;
    const { data: row, error } = await supabase
      .from('blog_posts')
      .insert({
        ...data,
        author_id: data.author_id || user?.id,
        created_by: user?.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create blog post: ${error.message}`);
    return this.mapToBlogPost(row);
  }

  async findById(id: string): Promise<BlogPost | null> {
    const { data: row, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find blog post: ${error.message}`);
    return row ? this.mapToBlogPost(row) : null;
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const { data: row, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`Failed to find blog post: ${error.message}`);
    return row ? this.mapToBlogPost(row) : null;
  }

  async findAll(filters?: BlogPostFilters): Promise<BlogPost[]> {
    let query = supabase.from('blog_posts').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    if (filters?.author_id) {
      query = query.eq('author_id', filters.author_id);
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
    }

    query = query.order('date', { ascending: false });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find blog posts: ${error.message}`);
    return rows?.map(row => this.mapToBlogPost(row)) || [];
  }

  async findAllPublished(filters?: Omit<BlogPostFilters, 'status'>): Promise<BlogPost[]> {
    return this.findAll({ ...filters, status: 'published' });
  }

  async findFeatured(limit: number = 3): Promise<BlogPost[]> {
    const { data: rows, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to find featured blog posts: ${error.message}`);
    return rows?.map(row => this.mapToBlogPost(row)) || [];
  }

  async findByTag(tag: string, filters?: BlogPostFilters): Promise<BlogPost[]> {
    return this.findAll({ ...filters, tags: [tag] });
  }

  async count(filters?: BlogPostFilters): Promise<number> {
    let query = supabase.from('blog_posts').select('*', { count: 'exact', head: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count blog posts: ${error.message}`);
    return count || 0;
  }

  async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment', {
      row_id: id,
      table_name: 'blog_posts',
      column_name: 'views',
    }).catch(() => {
      // Fallback if RPC doesn't exist
      return supabase
        .from('blog_posts')
        .update({ views: supabase.raw('views + 1') as any })
        .eq('id', id);
    });

    if (error) console.error('Failed to increment views:', error);
  }

  async update(id: string, data: UpdateBlogPostDTO): Promise<BlogPost> {
    const { data: row, error } = await supabase
      .from('blog_posts')
      .update({
        ...data,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update blog post: ${error.message}`);
    return this.mapToBlogPost(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete blog post: ${error.message}`);
  }
}
