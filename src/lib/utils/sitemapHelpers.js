/**
 * Sitemap Helper Functions
 * Utilities for generating and validating sitemap data
 */

/**
 * Format date for sitemap (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatSitemapDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toISOString().split('T')[0];
};

/**
 * Validate sitemap priority (must be between 0.0 and 1.0)
 * @param {number|string} priority - Priority value
 * @returns {string} - Valid priority string
 */
export const validatePriority = (priority) => {
  const num = parseFloat(priority);
  
  if (isNaN(num) || num < 0) return '0.5';
  if (num > 1) return '1.0';
  
  return num.toFixed(1);
};

/**
 * Validate change frequency
 * @param {string} freq - Change frequency
 * @returns {string} - Valid changefreq value
 */
export const validateChangeFreq = (freq) => {
  const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  
  return validFreqs.includes(freq) ? freq : 'weekly';
};

/**
 * Escape XML special characters
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeXml = (str) => {
  if (!str) return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Generate sitemap URL entry
 * @param {object} params - URL parameters
 * @returns {string} - XML URL entry
 */
export const generateUrlEntry = ({
  loc,
  lastmod,
  changefreq = 'weekly',
  priority = '0.5',
}) => {
  const escapedLoc = escapeXml(loc);
  const validPriority = validatePriority(priority);
  const validChangefreq = validateChangeFreq(changefreq);
  const formattedDate = formatSitemapDate(lastmod);

  return `  <url>
    <loc>${escapedLoc}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>${validChangefreq}</changefreq>
    <priority>${validPriority}</priority>
  </url>`;
};

/**
 * Generate complete sitemap XML
 * @param {array} urls - Array of URL objects
 * @returns {string} - Complete sitemap XML
 */
export const generateSitemapXml = (urls) => {
  const urlEntries = urls.map(generateUrlEntry).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Calculate priority based on content type
 * @param {string} type - Content type (homepage, service, project, blog, etc.)
 * @param {boolean} isFeatured - Whether content is featured
 * @returns {string} - Priority value
 */
export const calculatePriority = (type, isFeatured = false) => {
  const basePriorities = {
    homepage: 1.0,
    service: 0.9,
    'service-detail': 0.8,
    portfolio: 0.9,
    'portfolio-detail': 0.7,
    blog: 0.9,
    'blog-detail': 0.7,
    team: 0.7,
    'team-detail': 0.6,
    about: 0.8,
    contact: 0.8,
    pricing: 0.8,
    faq: 0.7,
  };

  let priority = basePriorities[type] || 0.5;
  
  // Boost featured content
  if (isFeatured && priority < 0.9) {
    priority = Math.min(priority + 0.1, 1.0);
  }

  return priority.toFixed(1);
};

/**
 * Determine change frequency based on content type
 * @param {string} type - Content type
 * @returns {string} - Change frequency
 */
export const determineChangeFreq = (type) => {
  const frequencies = {
    homepage: 'daily',
    blog: 'daily',
    'blog-detail': 'weekly',
    service: 'weekly',
    'service-detail': 'weekly',
    portfolio: 'weekly',
    'portfolio-detail': 'monthly',
    team: 'monthly',
    'team-detail': 'monthly',
    about: 'monthly',
    contact: 'monthly',
    pricing: 'monthly',
    faq: 'monthly',
  };

  return frequencies[type] || 'weekly';
};

/**
 * Validate sitemap XML
 * @param {string} xml - Sitemap XML string
 * @returns {object} - { isValid: boolean, errors: array }
 */
export const validateSitemapXml = (xml) => {
  const errors = [];

  // Check XML declaration
  if (!xml.includes('<?xml version="1.0"')) {
    errors.push('Missing XML declaration');
  }

  // Check urlset namespace
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('Missing or invalid urlset namespace');
  }

  // Check for required elements
  const urlCount = (xml.match(/<url>/g) || []).length;
  const locCount = (xml.match(/<loc>/g) || []).length;

  if (urlCount === 0) {
    errors.push('No URLs found in sitemap');
  }

  if (urlCount !== locCount) {
    errors.push('Mismatch between <url> and <loc> elements');
  }

  // Check for URL limit (50,000 max per sitemap)
  if (urlCount > 50000) {
    errors.push('Sitemap exceeds maximum URL limit (50,000)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    urlCount,
  };
};
