import { useState, useEffect, useMemo, useCallback } from 'react';
import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from '@/lib/schemas/blog';
import { getRepositoryRegistry } from '@/lib/repos/RepositoryRegistry';
import { logger } from '@/lib/utils/logger';

const repository = getRepositoryRegistry().getBlogRepository();
const withTimeout = async <T,>(promise: Promise<T>, ms = 10000): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)) as Promise<T>,
  ]);
};

export const useBlogPosts = (filters?: BlogPostFilters) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize filters to prevent infinite loops
  const filterKey = useMemo(
    () => JSON.stringify(filters || {}),
    [filters]
  );

  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await withTimeout(repository.findAll(filters));
      setBlogPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      logger.error('Error fetching blog posts', err);
    } finally {
      setLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  const createBlogPost = async (data: CreateBlogPostDTO): Promise<BlogPost> => {
    const post = await repository.create(data);
    await fetchBlogPosts();
    return post;
  };

  const updateBlogPost = async (id: string, data: UpdateBlogPostDTO): Promise<BlogPost> => {
    const post = await repository.update(id, data);
    await fetchBlogPosts();
    return post;
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    await repository.delete(id);
    await fetchBlogPosts();
  };

  const incrementViews = async (id: string): Promise<void> => {
    await repository.incrementViews(id);
  };

  return {
    blogPosts,
    loading,
    error,
    refetch: fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    incrementViews,
  };
};

export const useBlogPost = (id: string | undefined) => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setBlogPost(null);
      setLoading(false);
      return;
    }

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await repository.findById(id);
        setBlogPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
        logger.error('Error fetching blog post', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  return { blogPost, loading, error };
};

/**
 * Hook to fetch a single blog post by slug and increment views
 */
export function useBlogPostBySlug(slug: string | undefined) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const data = await repository.findBySlug(slug);
        setBlogPost(data);
        setError(null);
        
        // Increment views
        if (data?.id) {
          await repository.incrementViews(data.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
        setBlogPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  return { blogPost, loading, error };
}
