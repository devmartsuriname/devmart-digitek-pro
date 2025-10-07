import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BASE_URL } from '@/lib/utils/seoHelpers';
import { logger } from '@/lib/utils/logger';

/**
 * Sitemap Component - Generates dynamic XML sitemap
 * Fetches all published content from database and generates sitemap.xml
 */
const Sitemap = () => {
  const [xml, setXml] = useState('');

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        const urls = [];

        // Static pages with priority and changefreq
        const staticPages = [
          { loc: '', priority: '1.0', changefreq: 'daily' }, // Homepage
          { loc: 'about', priority: '0.8', changefreq: 'monthly' },
          { loc: 'service', priority: '0.9', changefreq: 'weekly' },
          { loc: 'portfolio', priority: '0.9', changefreq: 'weekly' },
          { loc: 'blog', priority: '0.9', changefreq: 'daily' },
          { loc: 'team', priority: '0.7', changefreq: 'monthly' },
          { loc: 'pricing', priority: '0.8', changefreq: 'monthly' },
          { loc: 'faq', priority: '0.7', changefreq: 'monthly' },
          { loc: 'contact', priority: '0.8', changefreq: 'monthly' },
        ];

        staticPages.forEach(page => {
          urls.push({
            loc: `${BASE_URL}/${page.loc}`,
            lastmod: new Date().toISOString().split('T')[0],
            priority: page.priority,
            changefreq: page.changefreq,
          });
        });

        // Fetch published services
        const { data: services } = await supabase
          .from('services')
          .select('slug, updated_at')
          .eq('status', 'published')
          .order('order_num', { ascending: true });

        if (services) {
          services.forEach(service => {
            urls.push({
              loc: `${BASE_URL}/services/${service.slug}`,
              lastmod: service.updated_at.split('T')[0],
              priority: '0.8',
              changefreq: 'weekly',
            });
          });
        }

        // Fetch published projects
        const { data: projects } = await supabase
          .from('projects')
          .select('slug, updated_at')
          .eq('status', 'published')
          .order('date', { ascending: false });

        if (projects) {
          projects.forEach(project => {
            urls.push({
              loc: `${BASE_URL}/portfolio/${project.slug}`,
              lastmod: project.updated_at.split('T')[0],
              priority: '0.7',
              changefreq: 'monthly',
            });
          });
        }

        // Fetch published blog posts
        const { data: posts } = await supabase
          .from('blog_posts')
          .select('slug, updated_at')
          .eq('status', 'published')
          .order('date', { ascending: false });

        if (posts) {
          posts.forEach(post => {
            urls.push({
              loc: `${BASE_URL}/blog/${post.slug}`,
              lastmod: post.updated_at.split('T')[0],
              priority: '0.7',
              changefreq: 'weekly',
            });
          });
        }

        // Fetch team members
        const { data: team } = await supabase
          .from('team')
          .select('slug, updated_at')
          .order('order_num', { ascending: true });

        if (team) {
          team.forEach(member => {
            urls.push({
              loc: `${BASE_URL}/team/${member.slug}`,
              lastmod: member.updated_at.split('T')[0],
              priority: '0.6',
              changefreq: 'monthly',
            });
          });
        }

        // Generate XML
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        setXml(xmlContent);

        // Set response headers for XML
        document.contentType = 'application/xml';
        
      } catch (error) {
        logger.error('Failed to generate sitemap', error);
        setXml('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
      }
    };

    generateSitemap();
  }, []);

  // Render raw XML (browser will display as XML tree)
  useEffect(() => {
    if (xml) {
      // Replace the entire page content with XML
      document.open();
      document.write(xml);
      document.close();
    }
  }, [xml]);

  return null;
};

export default Sitemap;
