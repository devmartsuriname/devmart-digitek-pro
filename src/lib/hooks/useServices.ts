import { useState, useEffect } from 'react';
import { SupabaseServiceRepository } from '@/lib/adapters/supabase/SupabaseServiceRepository';
import type { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';

const serviceRepo = new SupabaseServiceRepository();

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, total] = await Promise.all([
        serviceRepo.findAll(filters),
        serviceRepo.count(filters)
      ]);
      setServices(data);
      setCount(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [JSON.stringify(filters)]);

  const createService = async (data: CreateServiceDTO) => {
    try {
      const newService = await serviceRepo.create(data);
      await fetchServices();
      return newService;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create service');
    }
  };

  const updateService = async (id: string, data: UpdateServiceDTO) => {
    try {
      const updated = await serviceRepo.update(id, data);
      await fetchServices();
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await serviceRepo.delete(id);
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
        const data = await serviceRepo.findById(id);
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
