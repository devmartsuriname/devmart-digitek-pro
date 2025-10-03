import type { TeamMember, CreateTeamMemberDTO, UpdateTeamMemberDTO, TeamMemberFilters } from '@/lib/schemas/team';

export interface ITeamRepository {
  // Create
  create(data: CreateTeamMemberDTO): Promise<TeamMember>;
  
  // Read
  findById(id: string): Promise<TeamMember | null>;
  findBySlug(slug: string): Promise<TeamMember | null>;
  findAll(filters?: TeamMemberFilters): Promise<TeamMember[]>;
  count(filters?: TeamMemberFilters): Promise<number>;
  
  // Update
  update(id: string, data: UpdateTeamMemberDTO): Promise<TeamMember>;
  
  // Delete
  delete(id: string): Promise<void>;
}
