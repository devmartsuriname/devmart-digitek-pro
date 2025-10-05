import { useState, useEffect, useCallback } from 'react';
import { SupabaseProjectRepository } from '@/lib/adapters/supabase/SupabaseProjectRepository';
import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilters } from '@/lib/schemas/project';

const projectRepo = new SupabaseProjectRepository();
const withTimeout = async <T,>(promise: Promise<T>, ms = 10000): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)) as Promise<T>,
  ]);
};

/**
 * Hook for managing multiple projects with filtering
 */
export function useProjects(filters?: ProjectFilters) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, count] = await Promise.all([
        withTimeout(projectRepo.findAll(filters)),
        withTimeout(projectRepo.count(filters)),
      ]);
      setProjects(data);
      setTotalCount(count);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: CreateProjectDTO): Promise<Project> => {
    const newProject = await withTimeout(projectRepo.create(data));
    await fetchProjects();
    return newProject;
  };

  const updateProject = async (id: string, data: UpdateProjectDTO): Promise<Project> => {
    const updatedProject = await withTimeout(projectRepo.update(id, data));
    await fetchProjects();
    return updatedProject;
  };

  const deleteProject = async (id: string): Promise<void> => {
    await withTimeout(projectRepo.delete(id));
    await fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    totalCount,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects,
  };
}

/**
 * Hook for managing a single project by ID
 */
export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await withTimeout(projectRepo.findById(id));
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}

/**
 * Hook to fetch a single project by slug
 */
export function useProjectBySlug(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const repo = new SupabaseProjectRepository();
        const data = await withTimeout(repo.findBySlug(slug));
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return { project, loading, error };
}
