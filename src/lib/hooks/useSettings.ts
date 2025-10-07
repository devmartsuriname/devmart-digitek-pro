import { useState, useEffect } from 'react';
import { getRepositoryRegistry } from '@/lib/repos/RepositoryRegistry';
import type { Settings, UpdateSettingsDTO } from '@/lib/schemas/settings';
import toast from 'react-hot-toast';
import { logger } from '@/lib/utils/logger';

const repository = getRepositoryRegistry().getSettingsRepository();

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await repository.get();
      setSettings(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load settings';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data: UpdateSettingsDTO) => {
    try {
      setSaving(true);
      setError(null);
      const updated = await repository.update(data);
      setSettings(updated);
      toast.success('Settings saved successfully');
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save settings';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    saving,
    error,
    updateSettings,
    refresh: fetchSettings,
  };
}
