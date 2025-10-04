import { Link } from "react-router-dom";
import { useProjects } from "@/lib/hooks/useProjects";

const CaseStudy4 = () => {
    const { projects, loading, error } = useProjects({ status: 'published' });

    if (loading) {
        return (
            <section className="case-studies-section-4 fix section-padding">
                <div className="container">
                    <div className="row g-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="col-xl-6 col-lg-6 col-md-6">
                                <div className="case-studies-card-items mt-0">
                                    <div className="thumb placeholder-glow">
                                        <div className="placeholder w-100" style={{ height: '300px' }}></div>
                                    </div>
                                    <div className="content">
                                        <div className="placeholder-glow">
                                            <div className="placeholder col-10 mb-2"></div>
                                            <div className="placeholder col-6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="case-studies-section-4 fix section-padding">
                <div className="container">
                    <div className="alert alert-danger">Failed to load projects. Please try again later.</div>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className="case-studies-section-4 fix section-padding">
                <div className="container">
                    <div className="alert alert-info">No projects available at this time.</div>
                </div>
            </section>
        );
    }

    return (
        <section className="case-studies-section-4 fix section-padding">
        <div className="container">
            <div className="row g-4">
            {projects.map((project) => (
                <div key={project.id} className="col-xl-6 col-lg-6 col-md-6">
                    <div className="case-studies-card-items mt-0">
                        <div className="thumb">
                            <img src={project.cover_url || '/assets/img/case-studies/02.jpg'} alt={project.title} />
                        </div>
                        <div className="content">
                            <div className="title">
                                <h3><Link to={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
                                <p>{project.tech?.[0] || 'PROJECT'}</p>
                            </div>
                            <Link 
                                to={`/portfolio/${project.slug}`}
                                className="icon"
                                aria-label={`View ${project.title} project details`}
                            >
                                <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
    );
};

export default CaseStudy4;