import type { Media, CreateMediaDTO, UpdateMediaDTO, MediaFilters } from '@/lib/schemas/media';

export interface IMediaRepository {
  // Create
  create(data: CreateMediaDTO): Promise<Media>;
  
  // Read
  findById(id: string): Promise<Media | null>;
  findAll(filters?: MediaFilters): Promise<Media[]>;
  findByFolder(folder: string): Promise<Media[]>;
  count(filters?: MediaFilters): Promise<number>;
  
  // Update
  update(id: string, data: UpdateMediaDTO): Promise<Media>;
  
  // Delete
  delete(id: string): Promise<void>;
}
