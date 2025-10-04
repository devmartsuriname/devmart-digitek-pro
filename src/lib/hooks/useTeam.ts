import { useState, useEffect } from 'react';
import { SupabaseTeamRepository } from '@/lib/adapters/supabase/SupabaseTeamRepository';
import type { TeamMember, CreateTeamMemberDTO, UpdateTeamMemberDTO, TeamMemberFilters } from '@/lib/schemas/team';

const teamRepo = new SupabaseTeamRepository();

export function useTeamMembers(filters?: TeamMemberFilters) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, [filters?.search, filters?.limit, filters?.offset]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamRepo.findAll(filters);
      setTeamMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team members');
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTeamMember = async (data: CreateTeamMemberDTO): Promise<TeamMember> => {
    const newMember = await teamRepo.create(data);
    await loadTeamMembers();
    return newMember;
  };

  const updateTeamMember = async (id: string, data: UpdateTeamMemberDTO): Promise<TeamMember> => {
    const updated = await teamRepo.update(id, data);
    await loadTeamMembers();
    return updated;
  };

  const deleteTeamMember = async (id: string): Promise<void> => {
    await teamRepo.delete(id);
    await loadTeamMembers();
  };

  return {
    teamMembers,
    loading,
    error,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    refresh: loadTeamMembers,
  };
}

export function useTeamMember(id: string | null) {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTeamMember(null);
      setLoading(false);
      return;
    }

    loadTeamMember();
  }, [id]);

  const loadTeamMember = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await teamRepo.findById(id);
      setTeamMember(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team member');
      console.error('Error loading team member:', err);
    } finally {
      setLoading(false);
    }
  };

  return { teamMember, loading, error, refresh: loadTeamMember };
}

/**
 * Hook to fetch a single team member by slug
 */
export function useTeamMemberBySlug(slug: string | undefined) {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchTeamMember = async () => {
      try {
        setLoading(true);
        const data = await teamRepo.findBySlug(slug);
        setTeamMember(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch team member');
        setTeamMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [slug]);

  return { teamMember, loading, error };
}
