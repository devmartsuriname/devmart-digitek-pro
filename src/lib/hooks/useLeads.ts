import { useState, useEffect, useCallback, useMemo } from 'react';
import { SupabaseLeadRepository } from '@/lib/adapters/supabase/SupabaseLeadRepository';
import type { Lead, LeadFilters, UpdateLeadDTO } from '@/lib/schemas/lead';
import { toast } from 'react-hot-toast';
import { logger } from '@/lib/utils/logger';

const repository = new SupabaseLeadRepository();

interface LeadCounts {
  new: number;
  contacted: number;
  closed: number;
  total: number;
}

export function useLeads(filters?: LeadFilters) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<LeadCounts>({
    new: 0,
    contacted: 0,
    closed: 0,
    total: 0,
  });

  // Memoize filters to prevent infinite loops
  const filterKey = useMemo(
    () => JSON.stringify(filters || {}),
    [filters]
  );

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await repository.findAll(filters);
      setLeads(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(message);
      logger.error('Failed to fetch leads', err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filterKey]);

  const fetchCounts = useCallback(async () => {
    try {
      const [newCount, contactedCount, closedCount, totalCount] = await Promise.all([
        repository.count({ status: 'new' }),
        repository.count({ status: 'contacted' }),
        repository.count({ status: 'closed' }),
        repository.count(),
      ]);

      setCounts({
        new: newCount,
        contacted: contactedCount,
        closed: closedCount,
        total: totalCount,
      });
    } catch (err) {
      logger.error('Failed to fetch lead counts', err);
    }
  }, []);

  const updateLeadStatus = useCallback(
    async (id: string, status: UpdateLeadDTO['status']) => {
      try {
        await repository.update(id, { status });
        toast.success(`Lead marked as ${status}`);
        // Refresh both leads and counts
        await Promise.all([fetchLeads(), fetchCounts()]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update lead';
        logger.error('Failed to update lead status', err);
        toast.error(message);
        throw err;
      }
    },
    [fetchLeads, fetchCounts]
  );

  useEffect(() => {
    fetchLeads();
    fetchCounts();
  }, [fetchLeads, fetchCounts]);

  return {
    leads,
    loading,
    error,
    counts,
    updateLeadStatus,
    refresh: fetchLeads,
  };
}
