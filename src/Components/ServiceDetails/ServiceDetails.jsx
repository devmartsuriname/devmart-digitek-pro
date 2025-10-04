import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useServiceBySlug } from "@/lib/hooks/useServices";
import { useServices } from "@/lib/hooks/useServices";
import parse from "html-react-parser";

const ServiceDetails = () => {
  const { slug } = useParams();
  const { service, loading, error } = useServiceBySlug(slug);
  const { services: allServices } = useServices({ status: 'published', limit: 5 });

  const faqContent = [
    { title: 'Why Is SEO Important For Small Business?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo maximus' },
    { title: 'How do I choose the best SEO Agency?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo maximus' },
    { title: 'Better Security And Faster Server?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo maximus' },
    { title: 'Deployment Within Few Minutes', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo maximus' },
  ];

  const accordionContentRef = useRef(null);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = index => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0);
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);

  if (loading) {
    return (
      <section className="service-details-section section-padding">
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

  if (error || !service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className="service-details-section section-padding">
      <div className="container">
        <div className="service-details-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <div className="details-image">
                <img src={service.icon_url || "/assets/img/service/details-1.jpg"} alt={service.title} />
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-12 col-lg-4">
              <div className="main-sidebar sticky-style">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>All Services</h4>
                  </div>
                  <div className="service-widget-categories">
                    <ul>
                      {allServices.map((s) => (
                        <li key={s.id} className={s.slug === slug ? 'active' : ''}>
                          <Link to={`/services/${s.slug}`}>{s.title}</Link>
                          <span><i className="bi bi-arrow-right"></i></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="service-details-content">
                <h3>{service.title}</h3>
                {service.summary && <p className="mb-4">{service.summary}</p>}
                {service.body && (
                  <div className="mb-4">
                    {parse(service.body)}
                  </div>
                )}
                <h3>What We Provide</h3>
                <p className="mb-5">
                  At tempus aenean sapien torquent sed diam className efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo duis turpis lorem elit dui consectetur magnis lacinia odio per placerat vestibulum volutpat mauris mollis primis imperdiet posu ere ex enim gravida cras congue
                </p>
                <h3>The Challenge</h3>
                <p>
                  At tempus aenean sapien torquent sed diam className efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo duis turpis lorem elit dui consectetur magnis lacinia odio per placerat vestibulum volutpat mauris mollis primis imperdiet posu ere ex enim gravida cras congue
                </p>
                <div className="details-list-items">
                  <ul className="details-list">
                    <li><i className="bi bi-check-circle-fill"></i>Various analysis options.</li>
                    <li><i className="bi bi-check-circle-fill"></i>Advance Data analysis operation.</li>
                  </ul>
                  <ul className="details-list">
                    <li><i className="bi bi-check-circle-fill"></i>Page Load (time, size, number of requests).</li>
                    <li><i className="bi bi-check-circle-fill"></i>Advance Data analysis operation.</li>
                  </ul>
                </div>
              </div>
              <div className="faq-wrapper mt-5">
                <div className="faq-accordion-items">
                  <div className="faq-accordion">
                    <div className="accordion" id="accordion">
                      {faqContent.map((item, index) => (
                        <div key={index} className={`accordion-item mb-3 ${index === openItemIndex ? "active" : ""}`} data-wow-delay=".3s">
                          <h5 onClick={() => handleItemClick(index)} className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                              {item.title}
                            </button>
                          </h5>
                          <div ref={accordionContentRef} id="faq1" className="accordion-collapse collapse" data-bs-parent="#accordion">
                            <div className="accordion-body">
                              {item.content}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
