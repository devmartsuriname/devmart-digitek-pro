/**
 * Plausible Analytics Adapter
 * Client-side analytics tracking with privacy-first approach
 * 
 * Documentation: https://plausible.io/docs
 */

// Plausible configuration
const PLAUSIBLE_DOMAIN = 'devmart.sr'; // Update with your domain
const PLAUSIBLE_API_HOST = 'https://plausible.io'; // Or self-hosted URL

/**
 * Check if Plausible is loaded and available
 * @returns {boolean}
 */
export const isPlausibleLoaded = () => {
  return typeof window !== 'undefined' && typeof window.plausible === 'function';
};

/**
 * Track a custom event
 * @param {string} eventName - Event name (e.g., "Contact Form Submit")
 * @param {object} props - Event properties (optional)
 */
export const trackEvent = (eventName, props = {}) => {
  if (!isPlausibleLoaded()) {
    console.warn('Plausible not loaded, event not tracked:', eventName);
    return;
  }

  try {
    if (Object.keys(props).length > 0) {
      window.plausible(eventName, { props });
    } else {
      window.plausible(eventName);
    }
    
    console.log('📊 Tracked event:', eventName, props);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Track page view (automatic with script, but useful for SPAs)
 * @param {string} path - Page path
 * @param {object} props - Additional properties
 */
export const trackPageView = (path, props = {}) => {
  if (!isPlausibleLoaded()) return;

  try {
    window.plausible('pageview', {
      props: {
        path: path || window.location.pathname,
        ...props,
      },
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Track outbound link click
 * @param {string} url - External URL
 * @param {object} props - Additional properties
 */
export const trackOutboundLink = (url, props = {}) => {
  trackEvent('Outbound Link: Click', {
    url,
    ...props,
  });
};

/**
 * Track file download
 * @param {string} fileName - File name
 * @param {string} fileType - File type (e.g., "PDF", "ZIP")
 */
export const trackDownload = (fileName, fileType) => {
  trackEvent('File Download', {
    fileName,
    fileType,
  });
};

/**
 * Track form submission
 * @param {string} formName - Form name (e.g., "Contact Form", "Newsletter")
 * @param {boolean} success - Whether submission was successful
 */
export const trackFormSubmit = (formName, success = true) => {
  trackEvent(`Form Submit: ${formName}`, {
    status: success ? 'success' : 'error',
  });
};

/**
 * Track CTA click
 * @param {string} ctaText - CTA button text
 * @param {string} location - Where CTA is located (e.g., "Hero", "Footer")
 */
export const trackCTAClick = (ctaText, location) => {
  trackEvent('CTA Click', {
    text: ctaText,
    location,
  });
};

/**
 * Track service page view
 * @param {string} serviceName - Service name
 */
export const trackServiceView = (serviceName) => {
  trackEvent('Service View', {
    service: serviceName,
  });
};

/**
 * Track project/portfolio view
 * @param {string} projectName - Project name
 */
export const trackProjectView = (projectName) => {
  trackEvent('Project View', {
    project: projectName,
  });
};

/**
 * Track blog post view
 * @param {string} postTitle - Blog post title
 * @param {array} tags - Post tags
 */
export const trackBlogView = (postTitle, tags = []) => {
  trackEvent('Blog Post View', {
    title: postTitle,
    tags: tags.join(', '),
  });
};

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 * @param {number} depth - Scroll depth percentage
 * @param {string} page - Page identifier
 */
export const trackScrollDepth = (depth, page) => {
  trackEvent('Scroll Depth', {
    depth: `${depth}%`,
    page,
  });
};

/**
 * Track search query
 * @param {string} query - Search query
 * @param {number} resultsCount - Number of results
 */
export const trackSearch = (query, resultsCount) => {
  trackEvent('Search', {
    query,
    results: resultsCount,
  });
};

/**
 * Track video play
 * @param {string} videoTitle - Video title
 */
export const trackVideoPlay = (videoTitle) => {
  trackEvent('Video Play', {
    title: videoTitle,
  });
};

/**
 * Track social share
 * @param {string} platform - Social platform (e.g., "Twitter", "LinkedIn")
 * @param {string} contentTitle - Content being shared
 */
export const trackSocialShare = (platform, contentTitle) => {
  trackEvent('Social Share', {
    platform,
    content: contentTitle,
  });
};

/**
 * Initialize Plausible Analytics
 * Loads the Plausible script and sets up automatic page view tracking
 */
export const initPlausible = () => {
  if (typeof window === 'undefined') return;
  
  // Check if already loaded
  if (document.querySelector('script[data-domain]')) {
    console.log('Plausible already loaded');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
  script.src = `${PLAUSIBLE_API_HOST}/js/script.js`;
  
  // Add error handler
  script.onerror = () => {
    console.error('Failed to load Plausible Analytics');
  };
  
  script.onload = () => {
    console.log('✅ Plausible Analytics loaded');
    
    // Track initial page view
    if (isPlausibleLoaded()) {
      window.plausible('pageview');
    }
  };

  // Append to document
  document.head.appendChild(script);
};

/**
 * Plausible Analytics Provider (for React)
 */
export class PlausibleProvider {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    initPlausible();
    this.initialized = true;
  }

  trackEvent(eventName, props) {
    trackEvent(eventName, props);
  }

  trackPageView(path, props) {
    trackPageView(path, props);
  }
}

// Export singleton instance
export const plausible = new PlausibleProvider();
