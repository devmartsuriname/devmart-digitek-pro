import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  trackEvent,
  trackScrollDepth,
  trackOutboundLink,
} from '@/lib/adapters/plausible/PlausibleAdapter';

/**
 * Hook to track page views on route change
 * Automatically tracks every route navigation
 */
export const usePageViewTracking = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    // Only track if path actually changed (not just query params)
    if (previousPath.current !== location.pathname) {
      trackPageView(location.pathname);
      previousPath.current = location.pathname;
    }
  }, [location]);
};

/**
 * Hook to track scroll depth
 * Tracks 25%, 50%, 75%, 100% scroll milestones
 * @param {string} pageIdentifier - Unique page identifier
 */
export const useScrollTracking = (pageIdentifier) => {
  const trackedDepths = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackScrollDepth(milestone, pageIdentifier);
          trackedDepths.current.add(milestone);
        }
      });
    };

    // Throttle scroll events (max once per second)
    let isThrottled = false;
    const throttledScroll = () => {
      if (isThrottled) return;
      isThrottled = true;
      handleScroll();
      setTimeout(() => {
        isThrottled = false;
      }, 1000);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [pageIdentifier]);
};

/**
 * Hook to track outbound link clicks
 * Automatically tracks all external links
 */
export const useOutboundLinkTracking = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if external link
      const isExternal = 
        href.startsWith('http') && 
        !href.includes(window.location.hostname);

      if (isExternal) {
        trackOutboundLink(href, {
          text: link.textContent.trim(),
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

/**
 * Hook to track time on page
 * @param {string} pageIdentifier - Unique page identifier
 * @returns {number} - Time spent on page (seconds)
 */
export const useTimeOnPage = (pageIdentifier) => {
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      
      // Only track if user spent more than 10 seconds
      if (timeSpent > 10) {
        trackEvent('Time on Page', {
          page: pageIdentifier,
          seconds: timeSpent,
        });
      }
    };
  }, [pageIdentifier]);
};

/**
 * Hook to track element visibility (e.g., CTA impressions)
 * @param {string} elementId - ID of element to track
 * @param {string} eventName - Event name to fire
 */
export const useElementVisibility = (elementId, eventName) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackEvent(eventName, {
              element: elementId,
            });
            hasTracked.current = true;
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementId, eventName]);
};

/**
 * Hook to track form interactions
 * @param {string} formName - Form name
 * @returns {object} - { trackFieldFocus, trackFieldBlur, trackSubmit, trackError }
 */
export const useFormTracking = (formName) => {
  const trackFieldFocus = (fieldName) => {
    trackEvent('Form Field Focus', {
      form: formName,
      field: fieldName,
    });
  };

  const trackFieldBlur = (fieldName, hasValue) => {
    trackEvent('Form Field Blur', {
      form: formName,
      field: fieldName,
      filled: hasValue ? 'yes' : 'no',
    });
  };

  const trackSubmit = (success = true) => {
    trackEvent(`Form Submit: ${formName}`, {
      status: success ? 'success' : 'error',
    });
  };

  const trackError = (errorMessage) => {
    trackEvent('Form Error', {
      form: formName,
      error: errorMessage,
    });
  };

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackSubmit,
    trackError,
  };
};

/**
 * Hook to track video engagement
 * @param {string} videoId - Video identifier
 * @param {string} videoTitle - Video title
 * @returns {object} - Video event handlers
 */
export const useVideoTracking = (videoId, videoTitle) => {
  const hasTrackedPlay = useRef(false);
  const hasTracked25 = useRef(false);
  const hasTracked50 = useRef(false);
  const hasTracked75 = useRef(false);
  const hasTracked100 = useRef(false);

  const trackPlay = () => {
    if (!hasTrackedPlay.current) {
      trackEvent('Video Play', { video: videoTitle, id: videoId });
      hasTrackedPlay.current = true;
    }
  };

  const trackProgress = (percentage) => {
    if (percentage >= 25 && !hasTracked25.current) {
      trackEvent('Video Progress: 25%', { video: videoTitle, id: videoId });
      hasTracked25.current = true;
    }
    if (percentage >= 50 && !hasTracked50.current) {
      trackEvent('Video Progress: 50%', { video: videoTitle, id: videoId });
      hasTracked50.current = true;
    }
    if (percentage >= 75 && !hasTracked75.current) {
      trackEvent('Video Progress: 75%', { video: videoTitle, id: videoId });
      hasTracked75.current = true;
    }
    if (percentage >= 100 && !hasTracked100.current) {
      trackEvent('Video Complete', { video: videoTitle, id: videoId });
      hasTracked100.current = true;
    }
  };

  const trackPause = (currentTime) => {
    trackEvent('Video Pause', {
      video: videoTitle,
      id: videoId,
      time: Math.floor(currentTime),
    });
  };

  return {
    trackPlay,
    trackProgress,
    trackPause,
  };
};
