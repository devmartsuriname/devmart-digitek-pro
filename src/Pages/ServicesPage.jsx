import BreadCumb from "../Components/Common/BreadCumb";
import Cta2 from "../Components/Cta/Cta2";
import Pricing1 from "../Components/Pricing/Pricing1";
import Services3 from "../Components/Services/Services3";
import Testimonial2 from "../Components/Testimonial/Testimonial2";
import WhyChoose4 from "../Components/WhyChoose/WhyChoose4";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const ServicesPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="Our Services - Web Development, App Development & Digital Marketing"
                description="Explore our comprehensive digital services: custom web development, mobile app development, graphic design, SEO, and digital marketing solutions for your business."
                canonical={getCanonicalUrl('/services')}
                ogImage={getOgImageUrl('/assets/img/service/service-bg.jpg')}
                ogType="website"
                jsonLd={generateWebPageSchema({
                    title: 'Our Services',
                    description: 'Digital marketing and development services',
                    url: getCanonicalUrl('/services'),
                    breadcrumbs
                })}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Our Services"
            ></BreadCumb>  
            <Services3></Services3> 
            <WhyChoose4></WhyChoose4>
            <Pricing1 CoulmnClass="pricing-section section-padding"></Pricing1>      
            <Cta2></Cta2>
            <Testimonial2></Testimonial2>  
        </div>
    );
};

export default ServicesPage;