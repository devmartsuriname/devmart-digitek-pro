import { Link } from "react-router-dom";
import { useServices } from "@/lib/hooks/useServices";
import LoadingSkeleton from "@/Components/Common/LoadingSkeleton";

const Services3 = () => {
    const { services, loading, error } = useServices({ status: 'published' });

    if (loading) {
        return (
            <section className="service-section fix section-padding">
                <div className="container">
                    <div className="row g-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
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
            <section className="service-section fix section-padding">
                <div className="container">
                    <div className="alert alert-danger">Failed to load services. Please try again later.</div>
                </div>
            </section>
        );
    }

    if (services.length === 0) {
        return (
            <section className="service-section fix section-padding">
                <div className="container">
                    <div className="alert alert-info">No services available at this time.</div>
                </div>
            </section>
        );
    }

    return (
        <section className="service-section fix section-padding">
            <div className="container">
                <div className="row g-4">

                {services.map((service) => (
                    <div key={service.id} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <div className="service-box-items mt-0">
                            <div className="icon">
                                <img src={service.icon_url || '/assets/img/service/icon-1.png'} alt={service.title} />
                            </div>
                            <div className="content"> 
                                <h4><Link to={`/services/${service.slug}`}>{service.title}</Link></h4>
                                <p>{service.summary}</p>
                                <Link to={`/services/${service.slug}`} className="link-btn">Read More <i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Services3;