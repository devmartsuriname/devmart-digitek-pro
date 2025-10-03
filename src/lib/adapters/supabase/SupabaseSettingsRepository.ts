import { supabase } from '@/integrations/supabase/client';
import type { ISettingsRepository } from '@/lib/repos/ISettingsRepository';
import type { Settings, UpdateSettingsDTO } from '@/lib/schemas/settings';
import type { Database } from '@/integrations/supabase/types';

type SettingsRow = Database['public']['Tables']['settings']['Row'];

export class SupabaseSettingsRepository implements ISettingsRepository {
  private mapToSettings(row: SettingsRow): Settings {
    return {
      id: row.id,
      site_name: row.site_name,
      logo_url: row.logo_url,
      theme: row.theme,
      primary_color: row.primary_color,
      contact_email: row.contact_email,
      contact_phone: row.contact_phone,
      social: row.social as Record<string, string> | null,
      analytics: row.analytics as Record<string, string> | null,
      meta_title: row.meta_title,
      meta_desc: row.meta_desc,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async get(): Promise<Settings | null> {
    const { data: row, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(`Failed to get settings: ${error.message}`);
    return row ? this.mapToSettings(row) : null;
  }

  async update(data: UpdateSettingsDTO): Promise<Settings> {
    // First, check if settings exist
    const existing = await this.get();

    if (!existing) {
      // Create initial settings
      const { data: row, error } = await supabase
        .from('settings')
        .insert(data)
        .select()
        .single();

      if (error) throw new Error(`Failed to create settings: ${error.message}`);
      return this.mapToSettings(row);
    }

    // Update existing settings
    const { data: row, error } = await supabase
      .from('settings')
      .update(data)
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update settings: ${error.message}`);
    return this.mapToSettings(row);
  }
}
