import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SEOHead Component - Manages meta tags, OpenGraph, Twitter Cards, and JSON-LD
 * 
 * @param {string} title - Page title (will be appended with site name)
 * @param {string} description - Meta description
 * @param {string} canonical - Canonical URL (absolute)
 * @param {string} ogImage - OpenGraph image URL (absolute)
 * @param {string} ogType - OpenGraph type (website, article, etc.)
 * @param {object} article - Article-specific metadata (publishedTime, author, tags)
 * @param {object|array} jsonLd - JSON-LD structured data (single object or array)
 * @param {string} siteName - Site name (defaults to "Devmart Digtek")
 */
const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  article,
  jsonLd,
  siteName = 'Devmart Digtek',
}) => {
  useEffect(() => {
    // Set document title
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (property, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set basic meta tags
    setMetaTag('description', description);
    setMetaTag('author', 'Devmart Suriname');

    // Set OpenGraph tags
    setMetaTag('og:title', title || siteName, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonical, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', siteName, true);

    // Set Twitter Card tags
    setMetaTag('twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMetaTag('twitter:title', title || siteName);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Set canonical link
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonical);
    }

    // Set article-specific meta tags
    if (article && ogType === 'article') {
      setMetaTag('article:published_time', article.publishedTime, true);
      setMetaTag('article:modified_time', article.modifiedTime, true);
      setMetaTag('article:author', article.author, true);
      
      if (article.tags && Array.isArray(article.tags)) {
        // Remove existing article:tag meta tags
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
        
        // Add new tags
        article.tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }

    // Set JSON-LD structured data
    if (jsonLd) {
      const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      
      // Remove existing JSON-LD scripts
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
      
      // Add new JSON-LD scripts
      jsonLdArray.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on unmount to prevent flashing
      // They will be updated by the next page's SEOHead component
    };
  }, [title, description, canonical, ogImage, ogType, article, jsonLd, siteName]);

  // This component doesn't render anything visible
  return null;
};

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  article: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  jsonLd: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  siteName: PropTypes.string,
};

export default SEOHead;
