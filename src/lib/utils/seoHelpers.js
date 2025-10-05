/**
 * SEO Helper Functions
 * Utilities for generating SEO metadata, sanitizing content, and creating canonical URLs
 */

// Base URL for the site (update this in production)
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://devmart.sr';

// Default site metadata
export const DEFAULT_SEO = {
  siteName: 'Devmart Digtek',
  title: 'Devmart Digtek | Digital Marketing & Web Development Agency',
  description: 'Leading digital marketing and web development agency in Suriname. We create stunning websites, mobile apps, and effective digital marketing campaigns.',
  ogImage: `${BASE_URL}/assets/img/hero/hero-image-3.png`,
  twitterHandle: '@devmartsuriname',
};

/**
 * Generate canonical URL
 * @param {string} path - Relative path (e.g., '/services/web-development')
 * @returns {string} - Absolute canonical URL
 */
export const getCanonicalUrl = (path = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

/**
 * Sanitize and truncate text for meta descriptions
 * @param {string} text - Raw text content
 * @param {number} maxLength - Maximum character length (default: 160)
 * @returns {string} - Sanitized and truncated text
 */
export const sanitizeDescription = (text, maxLength = 160) => {
  if (!text) return '';
  
  // Remove HTML tags
  const stripped = text.replace(/<[^>]*>/g, '');
  
  // Remove extra whitespace
  const cleaned = stripped.replace(/\s+/g, ' ').trim();
  
  // Truncate if too long
  if (cleaned.length <= maxLength) return cleaned;
  
  // Find last complete word within limit
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? `${truncated.substring(0, lastSpace)}...`
    : `${truncated}...`;
};

/**
 * Generate SEO-friendly title
 * @param {string} title - Page title
 * @param {string} siteName - Site name (optional)
 * @returns {string} - Formatted title
 */
export const formatTitle = (title, siteName = DEFAULT_SEO.siteName) => {
  if (!title) return siteName;
  return title.length > 60 ? `${title.substring(0, 57)}...` : title;
};

/**
 * Extract excerpt from markdown/HTML content
 * @param {string} content - Full content (markdown or HTML)
 * @param {number} wordCount - Number of words to extract (default: 30)
 * @returns {string} - Excerpt text
 */
export const extractExcerpt = (content, wordCount = 30) => {
  if (!content) return '';
  
  // Remove markdown syntax and HTML tags
  const cleaned = content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const words = cleaned.split(' ').slice(0, wordCount);
  return words.join(' ') + (words.length === wordCount ? '...' : '');
};

/**
 * Generate OpenGraph image URL
 * @param {string} imageUrl - Relative or absolute image URL
 * @returns {string} - Absolute OG image URL
 */
export const getOgImageUrl = (imageUrl) => {
  if (!imageUrl) return DEFAULT_SEO.ogImage;
  
  // If already absolute, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Convert relative to absolute
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${BASE_URL}${cleanUrl}`;
};

/**
 * Calculate reading time for blog posts
 * @param {string} content - Full content text
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} - Reading time in minutes
 */
export const calculateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return 0;
  
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return minutes;
};

/**
 * Generate breadcrumb trail for current page
 * @param {string} pathname - Current path (e.g., '/services/web-development')
 * @returns {array} - Array of breadcrumb items { name, path }
 */
export const generateBreadcrumbs = (pathname) => {
  const breadcrumbs = [{ name: 'Home', path: '/' }];
  
  if (!pathname || pathname === '/') return breadcrumbs;
  
  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format segment name (capitalize and remove hyphens)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      path: currentPath,
      isLast: index === segments.length - 1,
    });
  });
  
  return breadcrumbs;
};

/**
 * Validate and format date for structured data
 * @param {string|Date} date - Date to format
 * @returns {string} - ISO 8601 formatted date
 */
export const formatStructuredDate = (date) => {
  if (!date) return new Date().toISOString();
  
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toISOString();
};

/**
 * Generate meta tags object for easy consumption
 * @param {object} options - SEO options
 * @returns {object} - Structured meta tags object
 */
export const generateMetaTags = ({
  title,
  description,
  path = '',
  image,
  type = 'website',
  article,
}) => {
  return {
    title: formatTitle(title),
    description: sanitizeDescription(description),
    canonical: getCanonicalUrl(path),
    ogImage: getOgImageUrl(image),
    ogType: type,
    article: article ? {
      publishedTime: formatStructuredDate(article.date),
      modifiedTime: formatStructuredDate(article.updatedAt),
      author: article.author,
      tags: article.tags || [],
    } : null,
  };
};
