import { Link } from "react-router-dom";
import LazySlider from "../Common/LazySlider";
import { useProjects } from "@/lib/hooks/useProjects";

const CaseStudy3 = () => {
    const { projects, loading } = useProjects({ 
        status: 'published',
        featured: true,
        limit: 6 
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };  


    return (
        <section className="case-studies-section-3 fix section-padding" aria-labelledby="projects-heading">
        <div className="container">
            <div className="section-title text-center">
                <div className="sub-title wow fadeInUp">
                    <span>Case Studies</span>
                </div>
                <h2 id="projects-heading" className="wow fadeInUp" data-wow-delay=".3s">
                    Discover Our Recent <br/>
                    Projects & Success Stories
                </h2>
            </div>
        </div>
        <div className="container-fluid">
            {loading ? (
                <div className="container">
                    <div className="row">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6">
                                <div className="case-studies-card-items">
                                    <div className="thumb placeholder-glow">
                                        <div className="placeholder bg-secondary" style={{width: '100%', height: '300px'}}></div>
                                    </div>
                                    <div className="content">
                                        <div className="title placeholder-glow">
                                            <h3><span className="placeholder bg-secondary col-8"></span></h3>
                                            <p><span className="placeholder bg-secondary col-6"></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : projects.length === 0 ? (
                <div className="container">
                    <div className="text-center py-5">
                        <p className="text-white">No projects available at the moment.</p>
                    </div>
                </div>
            ) : (
                <div className="swiper project-slider">
                    <div className="swiper-wrapper cs_slider_gap_30">
                        <LazySlider settings={settings}>
                            {projects.map((project) => (
                                <div key={project.id} className="swiper-slide">
                                    <div className="case-studies-card-items">
                                        <div className="thumb">
                                            <img 
                                                src={project.cover_url || '/assets/img/case-studies/02.jpg'} 
                                                alt={project.title} 
                                                loading="lazy" 
                                            />
                                        </div>
                                        <div className="content">
                                            <div className="title">
                                                <h3><Link to={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
                                                <p>{project.client || project.summary}</p>
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
                        </LazySlider>
                    </div>
                </div>
            )}
        </div>
    </section>
    );
};

export default CaseStudy3;