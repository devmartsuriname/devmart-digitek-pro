import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Author {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profiles with admin or editor roles
        const { data, error: queryError } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            avatar_url
          `)
          .in('id', 
            supabase
              .from('user_roles')
              .select('user_id')
              .in('role', ['admin', 'editor'])
          )
          .order('full_name', { ascending: true });

        if (queryError) throw queryError;

        setAuthors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch authors');
        console.error('Error fetching authors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, loading, error };
};
