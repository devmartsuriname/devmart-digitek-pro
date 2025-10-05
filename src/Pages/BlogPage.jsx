import Blog4 from "../Components/Blog/Blog4";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "@/lib/hooks/useSettings";
import { getCanonicalUrl, generateMetaTags } from "@/lib/utils/seoHelpers";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas/jsonLd";

const BlogPage = () => {
    const { settings } = useSettings();
    
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' }
    ];

    const metaTags = generateMetaTags({
        title: 'Blog & Insights - Digital Marketing Tips',
        description: 'Explore expert insights on web development, digital marketing, SEO, and design. Stay updated with the latest trends and best practices.',
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
            <Blog4 />       
        </div>
    );
};

export default BlogPage;