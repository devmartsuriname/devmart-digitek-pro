import BreadCumb from "../Components/Common/BreadCumb";
import Team3 from "../Components/Team/Team3";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const TeamPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="Our Team - Meet the Digital Experts"
                description="Meet the talented team behind Devmart Digtek. Our experts in web development, design, and digital marketing are ready to bring your vision to life."
                canonical={getCanonicalUrl('/team')}
                ogImage={getOgImageUrl('/assets/img/team/team-bg.jpg')}
                ogType="website"
                jsonLd={generateWebPageSchema({
                    title: 'Our Team',
                    description: 'Meet our team of experts',
                    url: getCanonicalUrl('/team'),
                    breadcrumbs
                })}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Team"
            ></BreadCumb>
            <Team3></Team3>        
        </div>
    );
};

export default TeamPage;