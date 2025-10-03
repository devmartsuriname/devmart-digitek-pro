import { supabase } from '@/integrations/supabase/client';
import type { ILeadRepository } from '@/lib/repos/ILeadRepository';
import type { Lead, CreateLeadDTO, UpdateLeadDTO, LeadFilters } from '@/lib/schemas/lead';
import type { Database } from '@/integrations/supabase/types';

type LeadRow = Database['public']['Tables']['leads']['Row'];

export class SupabaseLeadRepository implements ILeadRepository {
  private mapToLead(row: LeadRow): Lead {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      subject: row.subject,
      message: row.message,
      source: row.source,
      status: row.status as 'new' | 'contacted' | 'closed',
      created_at: row.created_at,
    };
  }

  async create(data: CreateLeadDTO): Promise<Lead> {
    const { data: row, error } = await supabase
      .from('leads')
      .insert({
        ...data,
        status: 'new',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create lead: ${error.message}`);
    return this.mapToLead(row);
  }

  async findById(id: string): Promise<Lead | null> {
    const { data: row, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find lead: ${error.message}`);
    return row ? this.mapToLead(row) : null;
  }

  async findAll(filters?: LeadFilters): Promise<Lead[]> {
    let query = supabase.from('leads').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find leads: ${error.message}`);
    return rows?.map(row => this.mapToLead(row)) || [];
  }

  async count(filters?: LeadFilters): Promise<number> {
    let query = supabase.from('leads').select('*', { count: 'exact', head: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count leads: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateLeadDTO): Promise<Lead> {
    const { data: row, error } = await supabase
      .from('leads')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update lead: ${error.message}`);
    return this.mapToLead(row);
  }
}
