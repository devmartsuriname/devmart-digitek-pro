import { useEffect } from 'react';
import { usePageViewTracking, useOutboundLinkTracking } from '../../lib/hooks/useAnalytics';
import { loadAnalytics } from '../../lib/utils/loadAnalytics';

/**
 * AnalyticsProvider - Handles analytics initialization and tracking
 * Must be rendered inside RouterProvider to access route context
 */
export default function AnalyticsProvider({ children }) {
  // Track page views automatically on route changes
  usePageViewTracking();
  
  // Track outbound link clicks automatically
  useOutboundLinkTracking();

  useEffect(() => {
    // Load analytics script after initial render (deferred 2s)
    const timer = setTimeout(() => loadAnalytics(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return children;
}
