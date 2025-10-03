import { supabase } from '@/integrations/supabase/client';
import type { IFAQRepository } from '@/lib/repos/IFAQRepository';
import type { FAQ, CreateFAQDTO, UpdateFAQDTO, FAQFilters } from '@/lib/schemas/faq';
import type { Database } from '@/integrations/supabase/types';

type FAQRow = Database['public']['Tables']['faqs']['Row'];

export class SupabaseFAQRepository implements IFAQRepository {
  private mapToFAQ(row: FAQRow): FAQ {
    return {
      id: row.id,
      category: row.category,
      question: row.question,
      answer: row.answer,
      order_num: row.order_num,
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: CreateFAQDTO): Promise<FAQ> {
    const { data: row, error } = await supabase
      .from('faqs')
      .insert({
        ...data,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create FAQ: ${error.message}`);
    return this.mapToFAQ(row);
  }

  async findById(id: string): Promise<FAQ | null> {
    const { data: row, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Failed to find FAQ: ${error.message}`);
    return row ? this.mapToFAQ(row) : null;
  }

  async findAll(filters?: FAQFilters): Promise<FAQ[]> {
    let query = supabase.from('faqs').select('*');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`question.ilike.%${filters.search}%,answer.ilike.%${filters.search}%`);
    }

    query = query.order('order_num', { ascending: true });
    query = query.range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 50) - 1);

    const { data: rows, error } = await query;

    if (error) throw new Error(`Failed to find FAQs: ${error.message}`);
    return rows?.map(row => this.mapToFAQ(row)) || [];
  }

  async findByCategory(category: string): Promise<FAQ[]> {
    return this.findAll({ category });
  }

  async count(filters?: FAQFilters): Promise<number> {
    let query = supabase.from('faqs').select('*', { count: 'exact', head: true });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    const { count, error } = await query;

    if (error) throw new Error(`Failed to count FAQs: ${error.message}`);
    return count || 0;
  }

  async update(id: string, data: UpdateFAQDTO): Promise<FAQ> {
    const { data: row, error } = await supabase
      .from('faqs')
      .update({
        ...data,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update FAQ: ${error.message}`);
    return this.mapToFAQ(row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete FAQ: ${error.message}`);
  }
}
