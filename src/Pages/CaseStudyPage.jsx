import CaseStudy4 from "../Components/CaseStudy/CaseStudy4";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const CaseStudyPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="Portfolio - Our Work & Case Studies"
                description="Explore our portfolio of successful web development, app development, and digital marketing projects. See how we've helped businesses grow online."
                canonical={getCanonicalUrl('/portfolio')}
                ogImage={getOgImageUrl('/assets/img/case-studies/bg.jpg')}
                ogType="website"
                jsonLd={generateWebPageSchema({
                    title: 'Portfolio',
                    description: 'Our work and case studies',
                    url: getCanonicalUrl('/portfolio'),
                    breadcrumbs
                })}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Case studies"
            ></BreadCumb>       
            <CaseStudy4></CaseStudy4>      
        </div>
    );
};

export default CaseStudyPage;