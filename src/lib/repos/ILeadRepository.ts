import type { Lead, CreateLeadDTO, UpdateLeadDTO, LeadFilters } from '@/lib/schemas/lead';

export interface ILeadRepository {
  // Create (public)
  create(data: CreateLeadDTO): Promise<Lead>;
  
  // Read (admin only)
  findById(id: string): Promise<Lead | null>;
  findAll(filters?: LeadFilters): Promise<Lead[]>;
  count(filters?: LeadFilters): Promise<number>;
  
  // Update (admin only)
  update(id: string, data: UpdateLeadDTO): Promise<Lead>;
  
  // No delete (audit trail)
}
