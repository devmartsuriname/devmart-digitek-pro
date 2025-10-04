import { Link } from "react-router-dom";
import { useTeamMembers } from "@/lib/hooks/useTeam";
import LoadingSkeleton from "@/Components/Common/LoadingSkeleton";

const Team3 = () => {
    const { teamMembers, loading, error } = useTeamMembers();

    if (loading) {
        return (
            <section className="team-section-3 fix section-padding">
                <div className="container-fluid">
                    <div className="row g-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                                <LoadingSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="team-section-3 fix section-padding">
                <div className="container-fluid">
                    <div className="alert alert-danger">Failed to load team members. Please try again later.</div>
                </div>
            </section>
        );
    }

    if (teamMembers.length === 0) {
        return (
            <section className="team-section-3 fix section-padding">
                <div className="container-fluid">
                    <div className="alert alert-info">No team members available at this time.</div>
                </div>
            </section>
        );
    }

    return (
        <section className="team-section-3 fix section-padding">
            <div className="container-fluid">
                <div className="row g-4">

                {teamMembers.map((member) => (
                    <div key={member.id} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="team-card-items mt-0">
                            <div className="team-image">
                                <img src={member.photo_url || '/assets/img/team/01.jpg'} alt={member.name} />
                            </div>
                            <div className="team-content">
                                <h3><Link to={`/team/${member.slug}`}>{member.name}</Link></h3>
                                <p>{member.role}</p>
                            </div>
                            <div className="icon-shape">
                                <img src="/assets/img/team/icon-shape.png" alt="img" />
                                <div className="social-profile">
                                    <ul>
                                        {member.socials?.instagram && (
                                            <li><Link to={member.socials.instagram}><i className="bi bi-instagram"></i></Link></li>
                                        )}
                                        {member.socials?.facebook && (
                                            <li><Link to={member.socials.facebook}><i className="bi bi-facebook"></i></Link></li>
                                        )}
                                        {member.socials?.twitter && (
                                            <li><Link to={member.socials.twitter}><i className="bi bi-twitter-x"></i></Link></li>
                                        )}
                                        {member.socials?.linkedin && (
                                            <li><Link to={member.socials.linkedin}><i className="bi bi-linkedin"></i></Link></li>
                                        )}
                                    </ul>
                                    <span className="plus-btn"><i className="bi bi-share"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                     ))}


                </div>
            </div>
        </section>
    );
};

export default Team3;