import { supabase } from '@/integrations/supabase/client';
import type { ITeamRepository } from '@/lib/repos/ITeamRepository';
import type { TeamMember, CreateTeamMemberDTO, UpdateTeamMemberDTO, TeamMemberFilters } from '@/lib/schemas/team';
import type { Database } from '@/integrations/supabase/types';

type TeamRow = Database['public']['Tables']['team']['Row'];

export class SupabaseTeamRepository implements ITeamRepository {
  private mapToTeamMember(row: TeamRow): TeamMember {
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      role: row.role,
      bio: row.bio,
      photo_url: row.photo_url,
      socials: row.socials as Record<string, string> | null,
      order_num: row.order_num,
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: CreateTeamMemberDTO): Promise<TeamMember> {
    const { data: row, error } = await supabase
      .from('team')
      .insert({
        ...data,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create team member: ${error.message}`);
    return this.mapToTeamMember(row);
  }

  async findById(id: string): Promise<TeamMember | null> {
    const { data: row, error } = await supabase
      .from('team')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find team member: ${error.message}`);
    return row ? this.mapToTeamMember(row) : null;
  }

  async findBySlug(slug: string): Promise<TeamMember | null> {
    const { data: row, error } = await supabase
      .from('team')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`Failed to find team member: ${error.message}`);
    return row ? this.mapToTeamMember(row) : null;
  }

  async findAll(filters?: TeamMemberFilters): Promise<TeamMember[]> {
    let query = supabase.from('team').select('*');

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,role.ilike.%${filters.search}%,bio.ilike.%${filters.search}%`);
    }

    query = query.order('order_num', { ascending: true });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find team members: ${error.message}`);
    return rows?.map(row => this.mapToTeamMember(row)) || [];
  }

  async count(filters?: TeamMemberFilters): Promise<number> {
    let query = supabase.from('team').select('*', { count: 'exact', head: true });

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,role.ilike.%${filters.search}%`);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count team members: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateTeamMemberDTO): Promise<TeamMember> {
    const { data: row, error } = await supabase
      .from('team')
      .update({
        ...data,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update team member: ${error.message}`);
    return this.mapToTeamMember(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete team member: ${error.message}`);
  }
}
