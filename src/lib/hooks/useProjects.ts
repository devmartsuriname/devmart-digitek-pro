import { useState, useEffect, useCallback } from 'react';
import { SupabaseProjectRepository } from '@/lib/adapters/supabase/SupabaseProjectRepository';
import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilters } from '@/lib/schemas/project';

const projectRepo = new SupabaseProjectRepository();

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
        projectRepo.findAll(filters),
        projectRepo.count(filters)
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
    const newProject = await projectRepo.create(data);
    await fetchProjects();
    return newProject;
  };

  const updateProject = async (id: string, data: UpdateProjectDTO): Promise<Project> => {
    const updatedProject = await projectRepo.update(id, data);
    await fetchProjects();
    return updatedProject;
  };

  const deleteProject = async (id: string): Promise<void> => {
    await projectRepo.delete(id);
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
        const data = await projectRepo.findById(id);
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
