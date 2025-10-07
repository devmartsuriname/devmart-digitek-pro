/**
 * Repository Registry - Singleton Pattern
 * Centralized registry for repository instances to prevent memory leaks
 */

import { SupabaseServiceRepository } from '@/lib/adapters/supabase/SupabaseServiceRepository';
import { SupabaseProjectRepository } from '@/lib/adapters/supabase/SupabaseProjectRepository';
import { SupabaseBlogRepository } from '@/lib/adapters/supabase/SupabaseBlogRepository';
import { SupabaseTeamRepository } from '@/lib/adapters/supabase/SupabaseTeamRepository';
import { SupabaseFAQRepository } from '@/lib/adapters/supabase/SupabaseFAQRepository';
import { SupabaseMediaRepository } from '@/lib/adapters/supabase/SupabaseMediaRepository';
import { SupabaseLeadRepository } from '@/lib/adapters/supabase/SupabaseLeadRepository';
import { SupabaseSettingsRepository } from '@/lib/adapters/supabase/SupabaseSettingsRepository';

class RepositoryRegistry {
  private static instance: RepositoryRegistry;
  private repositories: Map<string, any>;

  private constructor() {
    this.repositories = new Map();
  }

  public static getInstance(): RepositoryRegistry {
    if (!RepositoryRegistry.instance) {
      RepositoryRegistry.instance = new RepositoryRegistry();
    }
    return RepositoryRegistry.instance;
  }

  public getServiceRepository(): SupabaseServiceRepository {
    if (!this.repositories.has('service')) {
      this.repositories.set('service', new SupabaseServiceRepository());
    }
    return this.repositories.get('service')!;
  }

  public getProjectRepository(): SupabaseProjectRepository {
    if (!this.repositories.has('project')) {
      this.repositories.set('project', new SupabaseProjectRepository());
    }
    return this.repositories.get('project')!;
  }

  public getBlogRepository(): SupabaseBlogRepository {
    if (!this.repositories.has('blog')) {
      this.repositories.set('blog', new SupabaseBlogRepository());
    }
    return this.repositories.get('blog')!;
  }

  public getTeamRepository(): SupabaseTeamRepository {
    if (!this.repositories.has('team')) {
      this.repositories.set('team', new SupabaseTeamRepository());
    }
    return this.repositories.get('team')!;
  }

  public getFAQRepository(): SupabaseFAQRepository {
    if (!this.repositories.has('faq')) {
      this.repositories.set('faq', new SupabaseFAQRepository());
    }
    return this.repositories.get('faq')!;
  }

  public getMediaRepository(): SupabaseMediaRepository {
    if (!this.repositories.has('media')) {
      this.repositories.set('media', new SupabaseMediaRepository());
    }
    return this.repositories.get('media')!;
  }

  public getLeadRepository(): SupabaseLeadRepository {
    if (!this.repositories.has('lead')) {
      this.repositories.set('lead', new SupabaseLeadRepository());
    }
    return this.repositories.get('lead')!;
  }

  public getSettingsRepository(): SupabaseSettingsRepository {
    if (!this.repositories.has('settings')) {
      this.repositories.set('settings', new SupabaseSettingsRepository());
    }
    return this.repositories.get('settings')!;
  }

  /**
   * Clear all repository instances (useful for testing or forced refresh)
   */
  public clear(): void {
    this.repositories.clear();
  }

  /**
   * Clear a specific repository instance
   */
  public clearRepository(key: string): void {
    this.repositories.delete(key);
  }
}

// Export singleton instance getter
export const getRepositoryRegistry = () => RepositoryRegistry.getInstance();
