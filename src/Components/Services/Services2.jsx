import { Link } from "react-router-dom";
import { useServices } from "@/lib/hooks/useServices";
import OptimizedImage from "../../components/Common/OptimizedImage";

const Services2 = () => {
    const { services, loading, error } = useServices({ 
        status: 'published',
        limit: 3 
    });

    return (
        <section className="service-section fix section-padding" aria-labelledby="services-heading">
            <div className="bg-shape-2">
                <img src="/assets/img/service/bg-shape-2.png" alt="" role="presentation" loading="lazy" />
            </div>
            <div className="right-shape-3">
                <img src="/assets/img/service/right-shape-3.png" alt="" role="presentation" loading="lazy" />
            </div>
            <div className="container">
                <div className="section-title text-center">
                    <div className="sub-title bg-color-2 wow fadeInUp">
                        <span>OUR SERVICES</span>
                    </div>
                    <h2 id="services-heading" className="wow fadeInUp" data-wow-delay=".3s">
                        Services We Offer <br/> to Accelerate Your Growth
                    </h2>
                </div>
                <div className="row" style={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                    {error ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-white-50">
                                <i className="bi bi-exclamation-circle me-2"></i>
                                Unable to load services at the moment. Please try again later.
                            </p>
                        </div>
                    ) : services.length === 0 && !loading ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-white">No services available at the moment.</p>
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service.id} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                <div className="service-card-items style-2">
                                    <div className="service-thumb" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <OptimizedImage 
                                            src={service.icon_url || '/assets/img/service/01.png'} 
                                            alt={`${service.title} - Professional digital service icon`}
                                            width={80}
                                            height={80}
                                            sizesAttr="80px"
                                            style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    </div>
                                    <div className="content">
                                        <h3 className="title-2">
                                            <Link to={`/services/${service.slug}`}>{service.title}</Link>
                                        </h3>
                                        <p>
                                            {service.summary}
                                        </p>
                                        <Link 
                                            to={`/services/${service.slug}`} 
                                            className="service-btn"
                                            aria-label={`Learn more about ${service.title}`}
                                        >
                                            Learn more <span className="visually-hidden">about {service.title}</span> <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Services2;