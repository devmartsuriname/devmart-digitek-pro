import { useEffect, useState } from 'react';

/**
 * CrashOverlay
 * Global runtime error overlay that listens for window.onerror and unhandledrejection
 * to prevent silent blank screens and provide a quick way to refresh or go home.
 */
export default function CrashOverlay() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (message, source, lineno, colno, err) => {
      setError(err || new Error(message?.toString() || 'Unknown error'));
      return false; // Allow default logging
    };

    const handleRejection = (event) => {
      setError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  if (!error) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', color: '#fff',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ maxWidth: 800, width: '100%', background: 'rgba(23,1,44,0.9)', border: '1px solid rgba(106,71,237,0.4)', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
        <p style={{ opacity: 0.9 }}>An unexpected error occurred. You can try refreshing the page.</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#0b0716', padding: 12, borderRadius: 8, overflow: 'auto', maxHeight: 220 }}>
          {error?.stack || error?.message || String(error)}
        </pre>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 16px', background: '#6A47ED', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Reload</button>
          <a href="/" style={{ padding: '10px 16px', background: 'transparent', color: '#C6F806', border: '1px solid #C6F806', borderRadius: 8, textDecoration: 'none' }}>Go Home</a>
        </div>
      </div>
    </div>
  );
}
