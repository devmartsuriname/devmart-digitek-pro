import About2 from "../Components/About/About2";
import BreadCumb from "../Components/Common/BreadCumb";
import Counter3 from "../Components/Counter/Counter3";
import Team2 from "../Components/Team/Team2";
import Testimonial3 from "../Components/Testimonial/Testimonial3";
import Value1 from "../Components/Value/Value1";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema, generateOrganizationSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const AboutPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="About Us - Digital Marketing Agency"
                description="Learn about Devmart Digtek, Suriname's leading digital marketing and web development agency. Our team of experts delivers innovative solutions for businesses."
                canonical={getCanonicalUrl('/about')}
                ogImage={getOgImageUrl('/assets/img/about/01.jpg')}
                ogType="website"
                jsonLd={[
                    generateWebPageSchema({
                        title: 'About Us',
                        description: 'Learn about Devmart Digtek and our team',
                        url: getCanonicalUrl('/about'),
                        breadcrumbs
                    }),
                    generateOrganizationSchema(settings || {})
                ]}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="about us"
            ></BreadCumb>
            <About2 addclass="about-section-2 fix section-padding"></About2>
            <Counter3></Counter3>
            <Value1></Value1>
            <Team2></Team2>
            <Testimonial3></Testimonial3>
        </div>
    );
};

export default AboutPage;