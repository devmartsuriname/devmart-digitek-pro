import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilters } from '@/lib/schemas/project';

export interface IProjectRepository {
  // Create
  create(data: CreateProjectDTO): Promise<Project>;
  
  // Read
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findAll(filters?: ProjectFilters): Promise<Project[]>;
  findAllPublished(filters?: Omit<ProjectFilters, 'status'>): Promise<Project[]>;
  findFeatured(limit?: number): Promise<Project[]>;
  count(filters?: ProjectFilters): Promise<number>;
  
  // Update
  update(id: string, data: UpdateProjectDTO): Promise<Project>;
  
  // Delete
  delete(id: string): Promise<void>;
}
