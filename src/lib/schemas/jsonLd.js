/**
 * JSON-LD Schema Generators
 * Functions to generate structured data for different content types
 * Follows schema.org standards for SEO
 */

import { BASE_URL, DEFAULT_SEO } from '@/lib/utils/seoHelpers';

/**
 * Generate Organization schema (for homepage/footer)
 * @param {object} settings - Site settings from database
 * @returns {object} - Organization JSON-LD schema
 */
export const generateOrganizationSchema = (settings = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_name || DEFAULT_SEO.siteName,
    url: BASE_URL,
    logo: settings.logo_url || `${BASE_URL}/assets/img/logo/black-logo.svg`,
    description: settings.meta_desc || DEFAULT_SEO.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.contact_phone || '+597 123-4567',
      contactType: 'Customer Service',
      email: settings.contact_email || 'info@devmart.sr',
      availableLanguage: ['English', 'Dutch'],
    },
    address: settings.address ? {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressCountry: 'SR',
    } : undefined,
    sameAs: settings.social ? Object.values(settings.social).filter(Boolean) : [],
  };
};

/**
 * Generate WebSite schema (for homepage)
 * @param {object} settings - Site settings from database
 * @returns {object} - WebSite JSON-LD schema
 */
export const generateWebSiteSchema = (settings = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.site_name || DEFAULT_SEO.siteName,
    url: BASE_URL,
    description: settings.meta_desc || DEFAULT_SEO.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate WebPage schema (for all pages)
 * @param {object} params - Page parameters
 * @returns {object} - WebPage JSON-LD schema
 */
export const generateWebPageSchema = ({
  title,
  description,
  url,
  breadcrumbs = [],
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    breadcrumb: breadcrumbs.length > 0 ? generateBreadcrumbSchema(breadcrumbs) : undefined,
    isPartOf: {
      '@type': 'WebSite',
      url: BASE_URL,
    },
  };
};

/**
 * Generate Service schema (for service detail pages)
 * @param {object} service - Service data from database
 * @returns {object} - Service JSON-LD schema
 */
export const generateServiceSchema = (service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary || service.seo_desc,
    provider: {
      '@type': 'Organization',
      name: DEFAULT_SEO.siteName,
      url: BASE_URL,
    },
    serviceType: service.title,
    areaServed: {
      '@type': 'Country',
      name: 'Suriname',
    },
    url: `${BASE_URL}/services/${service.slug}`,
    image: service.icon_url || DEFAULT_SEO.ogImage,
  };
};

/**
 * Generate Article schema (for blog posts)
 * @param {object} post - Blog post data from database
 * @param {object} author - Author profile data
 * @returns {object} - Article JSON-LD schema
 */
export const generateArticleSchema = (post, author = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary || post.seo_desc,
    image: post.cover_url || DEFAULT_SEO.ogImage,
    author: {
      '@type': 'Person',
      name: author.full_name || 'Admin',
      url: `${BASE_URL}/team/${author.slug || 'admin'}`,
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/img/logo/black-logo.svg`,
      },
    },
    datePublished: post.date || post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags ? post.tags.join(', ') : undefined,
  };
};

/**
 * Generate CreativeWork schema (for portfolio projects)
 * @param {object} project - Project data from database
 * @returns {object} - CreativeWork JSON-LD schema
 */
export const generateCreativeWorkSchema = (project) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary || project.seo_desc,
    image: project.cover_url || DEFAULT_SEO.ogImage,
    creator: {
      '@type': 'Organization',
      name: DEFAULT_SEO.siteName,
      url: BASE_URL,
    },
    dateCreated: project.date || project.created_at,
    keywords: project.tech ? project.tech.join(', ') : undefined,
    url: `${BASE_URL}/portfolio/${project.slug}`,
    client: project.client ? {
      '@type': 'Organization',
      name: project.client,
    } : undefined,
  };
};

/**
 * Generate BreadcrumbList schema
 * @param {array} breadcrumbs - Array of breadcrumb items
 * @returns {object} - BreadcrumbList JSON-LD schema
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };
};

/**
 * Generate Person schema (for team member pages)
 * @param {object} member - Team member data from database
 * @returns {object} - Person JSON-LD schema
 */
export const generatePersonSchema = (member) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.photo_url,
    url: `${BASE_URL}/team/${member.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: DEFAULT_SEO.siteName,
      url: BASE_URL,
    },
    sameAs: member.socials ? Object.values(member.socials).filter(Boolean) : [],
  };
};

/**
 * Generate FAQPage schema
 * @param {array} faqs - Array of FAQ items
 * @returns {object} - FAQPage JSON-LD schema
 */
export const generateFAQPageSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
