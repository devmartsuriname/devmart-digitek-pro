import type { FAQ, CreateFAQDTO, UpdateFAQDTO, FAQFilters } from '@/lib/schemas/faq';

export interface IFAQRepository {
  // Create
  create(data: CreateFAQDTO): Promise<FAQ>;
  
  // Read
  findById(id: string): Promise<FAQ | null>;
  findAll(filters?: FAQFilters): Promise<FAQ[]>;
  findByCategory(category: string): Promise<FAQ[]>;
  count(filters?: FAQFilters): Promise<number>;
  
  // Update
  update(id: string, data: UpdateFAQDTO): Promise<FAQ>;
  
  // Delete
  delete(id: string): Promise<void>;
}
