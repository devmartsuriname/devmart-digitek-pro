import type { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';

export interface IServiceRepository {
  // Create
  create(data: CreateServiceDTO): Promise<Service>;
  
  // Read
  findById(id: string): Promise<Service | null>;
  findBySlug(slug: string): Promise<Service | null>;
  findAll(filters?: ServiceFilters): Promise<Service[]>;
  findAllPublished(filters?: Omit<ServiceFilters, 'status'>): Promise<Service[]>;
  count(filters?: ServiceFilters): Promise<number>;
  
  // Update
  update(id: string, data: UpdateServiceDTO): Promise<Service>;
  
  // Delete
  delete(id: string): Promise<void>;
}
