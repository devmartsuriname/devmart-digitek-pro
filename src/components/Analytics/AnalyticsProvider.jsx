import { useEffect } from 'react';
import { useOutboundLinkTracking } from '../../lib/hooks/useAnalytics';
import { loadAnalytics } from '../../lib/utils/loadAnalytics';
import { trackPageView } from '@/lib/adapters/plausible/PlausibleAdapter';

/**
 * AnalyticsProvider - Handles analytics initialization and tracking
 * Safe version that does NOT depend on React Router hooks to avoid invalid hook calls
 */
export default function AnalyticsProvider({ children }) {
  // Outbound link tracking
  useOutboundLinkTracking();

  // Track SPA navigations without using useLocation
  useEffect(() => {
    // Initial pageview
    try {
      trackPageView(window.location.pathname);
    } catch (e) {
      console.warn('Analytics initial pageview failed:', e);
    }

    const dispatchRouteChange = () => {
      try {
        trackPageView(window.location.pathname);
      } catch (e) {
        console.warn('Analytics route change failed:', e);
      }
    };

    // Patch history methods to emit events
    const origPushState = history.pushState;
    const origReplaceState = history.replaceState;
    history.pushState = function (...args) {
      const ret = origPushState.apply(this, args);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
    history.replaceState = function (...args) {
      const ret = origReplaceState.apply(this, args);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };

    window.addEventListener('popstate', dispatchRouteChange);
    window.addEventListener('pushstate', dispatchRouteChange);
    window.addEventListener('replacestate', dispatchRouteChange);
    window.addEventListener('locationchange', dispatchRouteChange);

    return () => {
      window.removeEventListener('popstate', dispatchRouteChange);
      window.removeEventListener('pushstate', dispatchRouteChange);
      window.removeEventListener('replacestate', dispatchRouteChange);
      window.removeEventListener('locationchange', dispatchRouteChange);
      history.pushState = origPushState;
      history.replaceState = origReplaceState;
    };
  }, []);

  // Load analytics script after initial render (deferred 2s)
  useEffect(() => {
    const timer = setTimeout(() => loadAnalytics(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return children;
}

