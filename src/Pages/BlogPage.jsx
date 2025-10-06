import Blog4 from "../Components/Blog/Blog4";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "@/lib/hooks/useSettings";
import { getCanonicalUrl, generateMetaTags } from "@/lib/utils/seoHelpers";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas/jsonLd";

const BlogPage = () => {
    const { settings } = useSettings();
    
    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' }
    ];

    const metaTags = generateMetaTags({
        title: 'Blog & Insights - Digital Marketing Tips & Tutorials',
        description: 'Explore expert insights on web development, digital marketing, SEO, and design. Stay updated with the latest industry trends, best practices, and actionable tips from our team.',
        path: '/blog',
        type: 'website'
    });

    return (
        <div>
            <SEOHead
                title={metaTags.title}
                description={metaTags.description}
                canonical={metaTags.canonical}
                ogImage={metaTags.ogImage}
                ogType={metaTags.ogType}
                jsonLd={[
                    generateWebPageSchema({
                        title: 'Blog & Insights',
                        description: metaTags.description,
                        url: getCanonicalUrl('/blog'),
                        breadcrumbs
                    }),
                    generateBreadcrumbSchema(breadcrumbs)
                ]}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Blog"
            />     
            <main role="main" id="main-content">
                <Blog4 />
            </main>
        </div>
    );
};

export default BlogPage;