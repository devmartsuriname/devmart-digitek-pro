/**
 * Dynamic Import Utilities
 * Helpers for code splitting and lazy loading heavy dependencies
 */

/**
 * Dynamically import Chart.js for admin dashboard
 * Only loads when needed (admin routes)
 * @returns {Promise<object>} - Recharts components
 */
export const loadCharts = () => {
  return import('recharts').then(module => ({
    LineChart: module.LineChart,
    Line: module.Line,
    BarChart: module.BarChart,
    Bar: module.Bar,
    PieChart: module.PieChart,
    Pie: module.Pie,
    Cell: module.Cell,
    XAxis: module.XAxis,
    YAxis: module.YAxis,
    CartesianGrid: module.CartesianGrid,
    Tooltip: module.Tooltip,
    Legend: module.Legend,
    ResponsiveContainer: module.ResponsiveContainer,
  }));
};

/**
 * Dynamically import jQuery (used for legacy template components)
 * @returns {Promise<object>} - jQuery
 */
export const loadJQuery = () => {
  if (typeof window !== 'undefined' && window.$) {
    return Promise.resolve(window.$);
  }
  return import('jquery').then(module => {
    window.$ = window.jQuery = module.default;
    return module.default;
  });
};

/**
 * Dynamically import Slick Carousel
 * Only loads on pages that use carousels
 * @returns {Promise<object>} - Slick components
 */
export const loadSlickCarousel = async () => {
  // Load jQuery first if not already loaded
  await loadJQuery();
  
  // Load slick carousel CSS and JS
  const [slickModule] = await Promise.all([
    import('react-slick'),
    import('slick-carousel/slick/slick.css'),
    import('slick-carousel/slick/slick-theme.css'),
  ]);
  
  return slickModule.default;
};

/**
 * Dynamically import Focus Trap (used in modals)
 * @returns {Promise<object>} - FocusTrap component
 */
export const loadFocusTrap = () => {
  return import('focus-trap-react').then(module => module.default);
};

/**
 * Dynamically import HTML Parser
 * Only loads when rendering rich content
 * @returns {Promise<function>} - parse function
 */
export const loadHtmlParser = () => {
  return import('html-react-parser').then(module => module.default);
};

/**
 * Dynamically import React Markdown
 * Only loads on blog detail pages
 * @returns {Promise<object>} - ReactMarkdown component
 */
export const loadMarkdown = () => {
  return import('react-markdown').then(module => module.default);
};

/**
 * Preload critical chunks for faster navigation
 * Call this on user interaction (hover, focus) to prefetch next page
 * @param {string} route - Route to preload (e.g., '/admin', '/blog')
 */
export const preloadRoute = (route) => {
  if (typeof window === 'undefined') return;

  const preloadMap = {
    '/admin': () => import('@/Pages/Admin/Dashboard'),
    '/blog': () => import('@/Pages/BlogPage'),
    '/services': () => import('@/Pages/ServicesPage'),
    '/portfolio': () => import('@/Pages/CaseStudyPage'),
    '/about': () => import('@/Pages/AboutPage'),
    '/contact': () => import('@/Pages/ContactPage'),
  };

  const loader = preloadMap[route];
  if (loader) {
    loader().catch(err => {
      console.warn(`Failed to preload route ${route}:`, err);
    });
  }
};

/**
 * Check if a chunk is already loaded
 * @param {string} chunkName - Name of the chunk
 * @returns {boolean}
 */
export const isChunkLoaded = (chunkName) => {
  if (typeof window === 'undefined') return false;
  
  // Check if module is in Vite's module cache
  return window.__vitePreload?.has?.(chunkName) || false;
};

/**
 * Get current bundle statistics
 * Useful for debugging and monitoring
 * @returns {object} - Bundle stats
 */
export const getBundleStats = () => {
  if (typeof window === 'undefined') return null;

  const performance = window.performance;
  const resources = performance?.getEntriesByType?.('resource') || [];

  const jsResources = resources.filter(r => r.name.endsWith('.js'));
  const cssResources = resources.filter(r => r.name.endsWith('.css'));
  const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

  return {
    totalResources: resources.length,
    jsFiles: jsResources.length,
    cssFiles: cssResources.length,
    totalSize: (totalSize / 1024).toFixed(2) + ' KB',
    loadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0,
  };
};

/**
 * Lazy load component with retry logic
 * Handles chunk loading failures gracefully
 * @param {function} importFn - Dynamic import function
 * @param {number} retries - Number of retries (default: 3)
 * @returns {Promise<object>} - Loaded component
 */
export const lazyWithRetry = (importFn, retries = 3) => {
  return new Promise((resolve, reject) => {
    const attemptImport = (attemptsLeft) => {
      importFn()
        .then(resolve)
        .catch((error) => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          
          // Wait before retry (exponential backoff)
          const delay = (retries - attemptsLeft + 1) * 1000;
          console.warn(`Chunk load failed, retrying in ${delay}ms...`, error);
          
          setTimeout(() => {
            attemptImport(attemptsLeft - 1);
          }, delay);
        });
    };
    
    attemptImport(retries);
  });
};

/**
 * Prefetch component on link hover
 * Usage: <Link onMouseEnter={() => prefetchOnHover('/admin')} />
 * @param {string} route - Route to prefetch
 */
export const prefetchOnHover = (route) => {
  // Only prefetch on desktop (not mobile)
  if (typeof window === 'undefined' || window.innerWidth < 768) return;
  
  // Add small delay to avoid prefetching on quick hovers
  const timeoutId = setTimeout(() => {
    preloadRoute(route);
  }, 100);

  return () => clearTimeout(timeoutId);
};
