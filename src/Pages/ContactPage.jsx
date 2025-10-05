import BreadCumb from "../Components/Common/BreadCumb";
import ContactInfo2 from "../Components/ContactInfo/ContactInfo2";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateWebPageSchema, generateOrganizationSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs } from "../lib/utils/seoHelpers";
import { useLocation } from "react-router-dom";

const ContactPage = () => {
    const { settings } = useSettings();
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <div>
            <SEOHead
                title="Contact Us - Get in Touch"
                description="Contact Devmart Digtek for web development, app development, and digital marketing services. Let's discuss your project and bring your ideas to life."
                canonical={getCanonicalUrl('/contact')}
                ogImage={getOgImageUrl('/assets/img/contact-img.png')}
                ogType="website"
                jsonLd={[
                    generateWebPageSchema({
                        title: 'Contact Us',
                        description: 'Get in touch with our team',
                        url: getCanonicalUrl('/contact'),
                        breadcrumbs
                    }),
                    generateOrganizationSchema(settings)
                ]}
                siteName={settings?.site_name}
            />
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Contact Us"
            ></BreadCumb>  
            <ContactInfo2></ContactInfo2>            
        </div>
    );
};

export default ContactPage;