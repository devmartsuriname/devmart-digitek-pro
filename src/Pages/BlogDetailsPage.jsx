import { useEffect } from "react";
import BlogDetails from "../Components/BlogDetails/BlogDetails";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useParams } from "react-router-dom";
import { useBlogPostBySlug } from "@/lib/hooks/useBlogPosts";
import { useSettings } from "@/lib/hooks/useSettings";
import { generateWebPageSchema, generateArticleSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs, sanitizeDescription } from "../lib/utils/seoHelpers";
import { trackBlogView } from "@/lib/adapters/plausible/PlausibleAdapter";
import { useScrollTracking } from "@/lib/hooks/useAnalytics";

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

    // Track scroll depth on blog posts
    useScrollTracking(slug || 'blog-post');

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