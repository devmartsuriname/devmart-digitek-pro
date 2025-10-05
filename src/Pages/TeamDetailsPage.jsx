import BreadCumb from "../Components/Common/BreadCumb";
import TeamDetails from "../Components/TeamDetails/TeamDetails";
import SEOHead from "../components/SEO/SEOHead";
import { useParams } from "react-router-dom";
import { useTeamMemberBySlug } from "@/lib/hooks/useTeam";
import { useSettings } from "@/lib/hooks/useSettings";
import { generateWebPageSchema, generatePersonSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl, generateBreadcrumbs, sanitizeDescription } from "../lib/utils/seoHelpers";

const TeamDetailsPage = () => {
    const { slug } = useParams();
    const { teamMember, loading } = useTeamMemberBySlug(slug);
    const { settings } = useSettings();

    const breadcrumbs = generateBreadcrumbs(`/team/${slug}`);

    return (
        <div>
            {!loading && teamMember && (
                <SEOHead
                    title={`${teamMember.name} - ${teamMember.role || 'Team Member'}`}
                    description={sanitizeDescription(teamMember.bio || `Meet ${teamMember.name}, ${teamMember.role} at Devmart Digtek`)}
                    canonical={getCanonicalUrl(`/team/${slug}`)}
                    ogImage={getOgImageUrl(teamMember.photo_url || '/assets/img/team/01.jpg')}
                    ogType="profile"
                    jsonLd={[
                        generateWebPageSchema({
                            title: teamMember.name,
                            description: teamMember.bio,
                            url: getCanonicalUrl(`/team/${slug}`),
                            breadcrumbs
                        }),
                        generatePersonSchema(teamMember)
                    ]}
                    siteName={settings?.site_name}
                />
            )}
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Team Details"
            ></BreadCumb>
            <TeamDetails></TeamDetails>           
        </div>
    );
};

export default TeamDetailsPage;