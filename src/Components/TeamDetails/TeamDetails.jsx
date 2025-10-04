import { useParams, Navigate } from "react-router-dom";
import { useTeamMemberBySlug } from "@/lib/hooks/useTeam";

const TeamDetails = () => {
  const { slug } = useParams();
  const { teamMember, loading, error } = useTeamMemberBySlug(slug);

  if (loading) {
    return (
      <section className="team-details-section fix section-padding pb-0">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !teamMember) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <section className="team-details-section fix section-padding pb-0">
        <div className="container">
          <div className="team-details-wrapper">
            <div className="team-details-items">
              {teamMember.photo_url && (
                <div className="thumb">
                  <img src={teamMember.photo_url} alt={teamMember.name} />
                </div>
              )}
              <div className="content">
                <div className="cont">
                  <h4>{teamMember.name}</h4>
                  {teamMember.role && <span>{teamMember.role}</span>}
                </div>
                {teamMember.bio && (
                  <div className="mt-3">
                    <p>{teamMember.bio}</p>
                  </div>
                )}
                {teamMember.socials && (
                  <div className="team-contact-info mt-4">
                    {teamMember.socials.email && (
                      <div className="icon-items">
                        <div className="icon">
                          <i className="bi bi-envelope-fill"></i>
                        </div>
                        <h5><a href={`mailto:${teamMember.socials.email}`}>{teamMember.socials.email}</a></h5>
                      </div>
                    )}
                    {teamMember.socials.phone && (
                      <div className="icon-items">
                        <div className="icon">
                          <i className="bi bi-telephone-fill"></i>
                        </div>
                        <h5><a href={`tel:${teamMember.socials.phone}`}>{teamMember.socials.phone}</a></h5>
                      </div>
                    )}
                    {teamMember.socials.linkedin && (
                      <div className="icon-items">
                        <div className="icon">
                          <i className="bi bi-linkedin"></i>
                        </div>
                        <h5><a href={teamMember.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></h5>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="personal-information-area section-padding">
        <div className="container">
          <div className="personal-information-wrapper">
            <h3>Personal Information</h3>
            {teamMember.bio && (
              <p className="mt-3">{teamMember.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
