import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster, useToasterStore } from 'react-hot-toast';
import { AuthProvider } from './lib/contexts/AuthContext';

export default function RootProvider() {
  const [liveMessage, setLiveMessage] = useState('');
  const { toasts } = useToasterStore();

  // Announce toasts to screen readers via aria-live region
  useEffect(() => {
    const latestToast = toasts[toasts.length - 1];
    if (latestToast && latestToast.message) {
      const message = typeof latestToast.message === 'string' 
        ? latestToast.message 
        : latestToast.message?.props?.children || '';
      setLiveMessage(message);
      
      // Clear message after announcement to allow re-announcements
      const clearTimer = setTimeout(() => setLiveMessage(''), 1000);
      return () => clearTimeout(clearTimer);
    }
  }, [toasts]);

  return (
    <AuthProvider>
      {/* Visually hidden aria-live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {liveMessage}
      </div>
      
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
