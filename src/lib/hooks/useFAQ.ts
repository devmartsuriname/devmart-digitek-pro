import { useState, useEffect, useCallback } from 'react';
import { getRepositoryRegistry } from '@/lib/repos/RepositoryRegistry';
import type { FAQ, CreateFAQDTO, UpdateFAQDTO, FAQFilters } from '@/lib/schemas/faq';
import { toast } from 'react-hot-toast';
import { logger } from '@/lib/utils/logger';

const faqRepo = getRepositoryRegistry().getFAQRepository();

export const useFAQs = (filters?: FAQFilters) => {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchFAQs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, count] = await Promise.all([
        faqRepo.findAll(filters),
        faqRepo.count(filters),
      ]);
      setFAQs(data);
      setTotal(count);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch FAQs';
      setError(message);
      logger.error('Failed to fetch FAQs', err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const createFAQ = async (data: CreateFAQDTO): Promise<FAQ> => {
    try {
      const newFAQ = await faqRepo.create(data);
      await fetchFAQs();
      return newFAQ;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create FAQ');
    }
  };

  const updateFAQ = async (id: string, data: UpdateFAQDTO): Promise<FAQ> => {
    try {
      const updated = await faqRepo.update(id, data);
      await fetchFAQs();
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update FAQ');
    }
  };

  const deleteFAQ = async (id: string): Promise<void> => {
    try {
      await faqRepo.delete(id);
      await fetchFAQs();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete FAQ');
    }
  };

  return {
    faqs,
    loading,
    error,
    total,
    refresh: fetchFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
  };
};

export const useFAQ = (id: string | null) => {
  const [faq, setFAQ] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setFAQ(null);
      setLoading(false);
      return;
    }

    const fetchFAQ = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await faqRepo.findById(id);
        setFAQ(data);
      } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch FAQ';
      setError(message);
      logger.error('Failed to fetch FAQ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, [id]);

  return { faq, loading, error };
};
