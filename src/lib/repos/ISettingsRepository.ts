import type { Settings, UpdateSettingsDTO } from '@/lib/schemas/settings';

export interface ISettingsRepository {
  // Read (singleton)
  get(): Promise<Settings | null>;
  
  // Update (admin only)
  update(data: UpdateSettingsDTO): Promise<Settings>;
  
  // No create or delete (singleton pattern)
}
