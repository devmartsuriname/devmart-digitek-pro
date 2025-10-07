import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRepositoryRegistry } from '@/lib/repos/RepositoryRegistry';
import type { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';
import { logger } from '@/lib/utils/logger';

const serviceRepo = getRepositoryRegistry().getServiceRepository();
const withTimeout = async <T,>(promise: Promise<T>, ms = 10000): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)) as Promise<T>,
  ]);
};

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // Memoize filters to prevent infinite loops
  const filterKey = useMemo(
    () => JSON.stringify(filters || {}),
    [filters]
  );

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, total] = await Promise.all([
        withTimeout(serviceRepo.findAll(filters)),
        withTimeout(serviceRepo.count(filters)),
      ]);
      setServices(data);
      setCount(total);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMsg);
      logger.error('Failed to fetch services', err);
    } finally {
      setLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const createService = async (data: CreateServiceDTO) => {
    try {
      const newService = await withTimeout(serviceRepo.create(data));
      await fetchServices();
      return newService;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create service');
    }
  };

  const updateService = async (id: string, data: UpdateServiceDTO) => {
    try {
      const updated = await withTimeout(serviceRepo.update(id, data));
      await fetchServices();
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await withTimeout(serviceRepo.delete(id));
      await fetchServices();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };

  const refreshServices = () => {
    fetchServices();
  };

  return {
    services,
    loading,
    error,
    count,
    createService,
    updateService,
    deleteService,
    refreshServices,
  };
}

export function useService(id: string) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await withTimeout(serviceRepo.findById(id));
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  return { service, loading, error };
}

/**
 * Hook to fetch a single service by slug
 */
export function useServiceBySlug(slug: string | undefined) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await withTimeout(serviceRepo.findBySlug(slug));
        setService(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service');
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  return { service, loading, error };
}
