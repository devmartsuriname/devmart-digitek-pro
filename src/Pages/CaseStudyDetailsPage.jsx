import { useEffect } from "react";
import CaseStudyDetails from "../Components/CaseStudyDetails/CaseStudyDetails";
import BreadCumb from "../Components/Common/BreadCumb";
import SEOHead from "../components/SEO/SEOHead";
import { useParams } from "react-router-dom";
import { useProjectBySlug } from "@/lib/hooks/useProjects";
import { useSettings } from "@/lib/hooks/useSettings";
import { generateWebPageSchema, generateCreativeWorkSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs, sanitizeDescription } from "../lib/utils/seoHelpers";
import { trackProjectView } from "@/lib/adapters/plausible/PlausibleAdapter";

const CaseStudyDetailsPage = () => {
    const { slug } = useParams();
    const { project, loading } = useProjectBySlug(slug);
    const { settings } = useSettings();

    const breadcrumbs = generateBreadcrumbs(`/portfolio/${slug}`);

    // Track project view when data loads
    useEffect(() => {
        if (!loading && project) {
            trackProjectView(project.title);
        }
    }, [loading, project]);

    return (
        <div>
            {!loading && project && (
                <SEOHead
                    title={project.seo_title || `${project.title} - Portfolio Project`}
                    description={project.seo_desc || sanitizeDescription(project.summary || project.body)}
                    canonical={getCanonicalUrl(`/portfolio/${slug}`)}
                    ogImage={getOgImageUrl(project.cover_url || '/assets/img/case-studies/details-1.jpg')}
                    ogType="website"
                    jsonLd={[
                        generateWebPageSchema({
                            title: project.title,
                            description: project.summary || project.seo_desc,
                            url: getCanonicalUrl(`/portfolio/${slug}`),
                            breadcrumbs
                        }),
                        generateCreativeWorkSchema(project)
                    ]}
                    siteName={settings?.site_name}
                />
            )}
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Case study Details"
            ></BreadCumb>  
            <CaseStudyDetails></CaseStudyDetails>           
        </div>
    );
};

export default CaseStudyDetailsPage;