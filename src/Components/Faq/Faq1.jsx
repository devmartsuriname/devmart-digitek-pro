import { useEffect, useRef, useState } from "react";
import { useFAQs } from "@/lib/hooks/useFAQ";
import LoadingSkeleton from "@/Components/Common/LoadingSkeleton";

const Faq1 = ({addclass}) => {
    const { faqs, loading, error } = useFAQs();

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
        if (firstItemOpen && faqs.length > 0) {
          setOpenItemIndex(0);
          setFirstItemOpen(false);
        }
      }, [firstItemOpen, faqs]);

      if (loading) {
        return (
            <section className={addclass}>
                <div className="container">
                    <div className="row g-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="col-12">
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
            <section className={addclass}>
                <div className="container">
                    <div className="alert alert-danger">Failed to load FAQs. Please try again later.</div>
                </div>
            </section>
        );
      }

      if (faqs.length === 0) {
        return (
            <section className={addclass}>
                <div className="container">
                    <div className="alert alert-info">No FAQs available at this time.</div>
                </div>
            </section>
        );
      }

    return (
        <section className={addclass}>
            <div className="faq-overlay">
                <img src="/assets/img/faq-overlay.png" alt="img" />
            </div>
            <div className="faq-shape">
                <img src="/assets/img/faq-shape.png" alt="img" />
            </div>
            <div className="container">
                <div className="faq-wrapper">
                    <div className="row g-4 justify-content-between">
                        <div className="col-xl-5 col-lg-6">
                            <div className="faq-content">
                                <div className="section-title">
                                    <div className="sub-title bg-color-2 wow fadeInUp">
                                        <span>FAQs</span>
                                    </div>
                                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                        Let’s make something awesome together
                                    </h2>
                                </div>
                                <p className="wow fadeInUp" data-wow-delay=".5s">
                                    We are not just another agency - we are your digital growth partners. With
                                    years of industry experience and a passion for innovation, our team is
                                    dedicated to delivering measurable results propel your business forward.
                                </p>
                                <ul className="faq-list">
                                    <li className="wow fadeInUp" data-wow-delay=".3s">
                                    <i className="bi bi-check-circle"></i>
                                        Top quality service
                                    </li>
                                    <li className="wow fadeInUp" data-wow-delay=".5s">
                                    <i className="bi bi-check-circle"></i>
                                        Intermodal Shipping
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="faq-accordion-items">
                                <div className="faq-accordion">
                                    <div className="accordion" id="accordion">
                                    {faqs.map((faq, index) => (
                                        <div key={faq.id} className={`accordion-item mb-3 ${index === openItemIndex ? "active" : "" }`}  data-wow-delay=".3s">
                                            <h5 onClick={() => handleItemClick(index)} className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${faq.id}`} aria-expanded={index === openItemIndex} aria-controls={`faq${faq.id}`}>
                                                {faq.question}
                                                </button>
                                            </h5>
                                            <div ref={index === openItemIndex ? accordionContentRef : null} id={`faq${faq.id}`} className={`accordion-collapse collapse ${index === openItemIndex ? "show" : ""}`} data-bs-parent="#accordion">
                                                <div className="accordion-body">
                                                {faq.answer}
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
        </section>
    );
};

export default Faq1;