import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './lib/contexts/AuthContext';
import { loadAnalytics } from './lib/utils/loadAnalytics';

export default function RootProvider() {
  useEffect(() => {
    // Load analytics script after initial render (deferred 2s)
    const timer = setTimeout(() => loadAnalytics(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#17012C',
            color: '#fff',
            border: '1px solid rgba(106, 71, 237, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#6A47ED',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Outlet />
    </AuthProvider>
  );
}
