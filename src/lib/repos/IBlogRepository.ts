import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from '@/lib/schemas/blog';

export interface IBlogRepository {
  // Create
  create(data: CreateBlogPostDTO): Promise<BlogPost>;
  
  // Read
  findById(id: string): Promise<BlogPost | null>;
  findBySlug(slug: string): Promise<BlogPost | null>;
  findAll(filters?: BlogPostFilters): Promise<BlogPost[]>;
  findAllPublished(filters?: Omit<BlogPostFilters, 'status'>): Promise<BlogPost[]>;
  findFeatured(limit?: number): Promise<BlogPost[]>;
  findByTag(tag: string, filters?: BlogPostFilters): Promise<BlogPost[]>;
  count(filters?: BlogPostFilters): Promise<number>;
  incrementViews(id: string): Promise<void>;
  
  // Update
  update(id: string, data: UpdateBlogPostDTO): Promise<BlogPost>;
  
  // Delete
  delete(id: string): Promise<void>;
}
