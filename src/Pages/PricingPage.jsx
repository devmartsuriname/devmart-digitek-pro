import BreadCumb from "../Components/Common/BreadCumb";
import Faq1 from "../Components/Faq/Faq1";
import Pricng2 from "../Components/Pricing/Pricng2";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const PricingPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="Pricing - Affordable Digital Marketing & Development Packages"
                description="Transparent pricing for web development, app development, and digital marketing services. Choose the perfect package for your business needs and budget."
                canonical={getCanonicalUrl('/pricing')}
                ogImage={getOgImageUrl('/assets/img/cta-bg.jpg')}
                ogType="website"
                jsonLd={generateWebPageSchema({
                    title: 'Pricing',
                    description: 'Our pricing packages and plans',
                    url: getCanonicalUrl('/pricing'),
                    breadcrumbs
                })}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Pricing"
            ></BreadCumb>   
            <Pricng2></Pricng2>
            <Faq1 addclass="faq-section section-padding pt-0"></Faq1>
        </div>
    );
};

export default PricingPage;