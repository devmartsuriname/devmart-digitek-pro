import { useParams, Navigate } from "react-router-dom";
import { useProjectBySlug } from "@/lib/hooks/useProjects";
import parse from "html-react-parser";

const CaseStudyDetails = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProjectBySlug(slug);

  if (loading) {
    return (
      <section className="project-details-section fix section-padding">
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

  if (error || !project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className="project-details-section fix section-padding">
      <div className="container">
        <div className="project-details-wrapper">
          <div className="project-details-items">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="details-top-items">
                  <div className="details-left">
                    <h2>{project.title}</h2>
                    {project.tech && project.tech.length > 0 && (
                      <ul className="post-cat">
                        {project.tech.map((tech, index) => (
                          <li key={index}>
                            <a href="#">{tech}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="details-right">
                    <ul className="client-details">
                      {project.client && (
                        <li>
                          Client: <span>{project.client}</span>
                        </li>
                      )}
                      {project.date && (
                        <li>
                          Year: <span>{new Date(project.date).getFullYear()}</span>
                        </li>
                      )}
                      <li>
                        Status: <span className="text-capitalize">{project.status}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-details-content">
            <h3>Overview</h3>
            <div className="row g-4">
              <div className="col-lg-12">
                {project.summary && <p className="mb-4">{project.summary}</p>}
                {project.body && (
                  <div className="mb-4">
                    {parse(project.body)}
                  </div>
                )}
              </div>
            </div>
            
            {project.gallery && project.gallery.length > 0 && (
              <div className="row g-4 mt-4">
                {project.gallery.slice(0, 2).map((image, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="details-image">
                      <img src={image} alt={`${project.title} - Image ${index + 1}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="slider-button d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-xxl-4 gap-3 gap-2">
              <button className="cmn-prev cmn-border d-center">
                <i className="bi bi-chevron-left"></i>
              </button>
              <span className="fw-bold white-clr previus-text text-capitalize">
                previous
              </span>
            </div>
            <div className="d-flex align-items-center gap-xxl-4 gap-3 gap-2">
              <span className="fw-bold white-clr previus-text text-capitalize">
                Next
              </span>
              <button className="cmn-next cmn-border d-center">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetails;
