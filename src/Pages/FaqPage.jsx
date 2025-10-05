import BreadCumb from "../Components/Common/BreadCumb";
import Faq1 from "../Components/Faq/Faq1";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { useFAQ } from "../lib/hooks/useFAQ";
import { generateWebPageSchema, generateFAQPageSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const FaqPage = () => {
    const { settings } = useSettings();
    const { faqs } = useFAQ();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    const jsonLdSchemas = [
        generateWebPageSchema({
            title: 'FAQ',
            description: 'Frequently asked questions',
            url: getCanonicalUrl('/faq'),
            breadcrumbs
        })
    ];

    // Add FAQ schema if FAQs are loaded
    if (faqs && faqs.length > 0) {
        jsonLdSchemas.push(generateFAQPageSchema(faqs));
    }

    return (
        <div>
            <SEOHead
                title="FAQ - Frequently Asked Questions"
                description="Find answers to common questions about our web development, app development, and digital marketing services. Get the information you need to make the right decision."
                canonical={getCanonicalUrl('/faq')}
                ogImage={getOgImageUrl('/assets/img/breadcrumb.jpg')}
                ogType="website"
                jsonLd={jsonLdSchemas}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Faq"
            ></BreadCumb>   
            <Faq1 addclass="faq-section section-padding"></Faq1>        
        </div>
    );
};

export default FaqPage;