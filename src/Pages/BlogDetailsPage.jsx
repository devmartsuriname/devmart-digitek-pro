import { useEffect, useRef } from "react";
import BlogDetails from "../Components/BlogDetails/BlogDetails";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useParams } from "react-router-dom";
import { useBlogPostBySlug } from "@/lib/hooks/useBlogPosts";
import { useSettings } from "@/lib/hooks/useSettings";
import { generateWebPageSchema, generateArticleSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs, sanitizeDescription } from "../lib/utils/seoHelpers";
import { trackBlogView, trackScrollDepth } from "@/lib/adapters/plausible/PlausibleAdapter";

const BlogDetailsPage = () => {
    const { slug } = useParams();
    const { blogPost, loading } = useBlogPostBySlug(slug);
    const { settings } = useSettings();

    const breadcrumbs = generateBreadcrumbs(`/blog/${slug}`);

    // Track blog view when data loads
    useEffect(() => {
        if (!loading && blogPost) {
            trackBlogView(blogPost.title, blogPost.tags || []);
        }
    }, [loading, blogPost]);

    // Track scroll depth inline to avoid hook dependency issues
    const trackedDepths = useRef(new Set());
    useEffect(() => {
        const pageIdentifier = slug || 'blog-post';
        
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
    }, [slug]);

    return (
        <div>
            {!loading && blogPost && (
                <SEOHead
                    title={blogPost.seo_title || `${blogPost.title} - Blog`}
                    description={blogPost.seo_desc || sanitizeDescription(blogPost.summary || blogPost.body_mdx)}
                    canonical={getCanonicalUrl(`/blog/${slug}`)}
                    ogImage={getOgImageUrl(blogPost.cover_url || '/assets/img/news/details-1.jpg')}
                    ogType="article"
                    article={{
                        publishedTime: blogPost.date,
                        modifiedTime: blogPost.updated_at,
                        author: 'Admin',
                        tags: blogPost.tags || []
                    }}
                    jsonLd={[
                        generateWebPageSchema({
                            title: blogPost.title,
                            description: blogPost.summary || blogPost.seo_desc,
                            url: getCanonicalUrl(`/blog/${slug}`),
                            breadcrumbs
                        }),
                        generateArticleSchema(blogPost, { full_name: 'Admin' })
                    ]}
                    siteName={settings?.site_name}
                />
            )}
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Blog Details"
            ></BreadCumb>  
            <BlogDetails></BlogDetails>         
        </div>
    );
};

export default BlogDetailsPage;