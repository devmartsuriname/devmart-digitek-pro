import BreadCumb from "../Components/Common/BreadCumb";
import ServiceDetails from "../Components/ServiceDetails/ServiceDetails";
import SEOHead from "../components/SEO/SEOHead";
import { useParams } from "react-router-dom";
import { useServiceBySlug } from "@/lib/hooks/useServices";
import { useSettings } from "@/lib/hooks/useSettings";
import { generateWebPageSchema, generateServiceSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs, sanitizeDescription } from "../lib/utils/seoHelpers";

const ServiceDetailsPage = () => {
    const { slug } = useParams();
    const { service, loading } = useServiceBySlug(slug);
    const { settings } = useSettings();

    const breadcrumbs = generateBreadcrumbs(`/services/${slug}`);

    return (
        <div>
            {!loading && service && (
                <SEOHead
                    title={service.seo_title || `${service.title} - Our Services`}
                    description={service.seo_desc || sanitizeDescription(service.summary || service.body)}
                    canonical={getCanonicalUrl(`/services/${slug}`)}
                    ogImage={getOgImageUrl(service.icon_url || '/assets/img/service/details-1.jpg')}
                    ogType="website"
                    jsonLd={[
                        generateWebPageSchema({
                            title: service.title,
                            description: service.summary || service.seo_desc,
                            url: getCanonicalUrl(`/services/${slug}`),
                            breadcrumbs
                        }),
                        generateServiceSchema(service)
                    ]}
                    siteName={settings?.site_name}
                />
            )}
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Service Details"
            ></BreadCumb>  
            <ServiceDetails></ServiceDetails>       
        </div>
    );
};

export default ServiceDetailsPage;