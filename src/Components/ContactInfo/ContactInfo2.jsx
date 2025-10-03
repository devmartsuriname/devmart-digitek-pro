import ContactForm from "./ContactForm";
import { useSettings } from "@/lib/hooks/useSettings";

const ContactInfo2 = () => {
    const { settings } = useSettings();
    
    return (
        <div>
        <section className="contact-info-section fix section-padding">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <div className="contact-info-items text-center active">
                            <div className="icon">
                            <i className="bi bi-geo-alt-fill"></i>
                            </div>
                            <div className="content">
                                <h3>Our Address</h3>
                                <p>
                                    {settings?.address || '2464 Royal Ln. Mesa, New Jersey 45463.'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <div className="contact-info-items text-center">
                            <div className="icon">
                            <i className="bi bi-envelope-fill"></i>
                            </div>
                            <div className="content">
                                <h3>
                                    <a href={`mailto:${settings?.contact_email || 'info@example.com'}`}>
                                        {settings?.contact_email || 'info@example.com'}
                                    </a>
                                </h3>
                                <p>
                                    Email us anytime for any kind <br/>
                                    of query.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                        <div className="contact-info-items text-center">
                            <div className="icon">
                            <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div className="content">
                                <h3>
                                    Hot: <a href={`tel:${settings?.contact_phone?.replace(/\s/g, '') || '+2086660112'}`}>
                                        {settings?.contact_phone || '+208-666-0112'}
                                    </a>
                                </h3>
                                <p>
                                    Call us for any kind of support, we <br/>
                                    will wait for it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="contact-section-33 fix section-padding pt-0">
            <div className="container">
                <div className="contact-wrapper-2">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="map-items">
                                <div className="googpemap">
                                    <iframe 
                                        src={settings?.google_maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"} 
                                        loading="lazy"
                                        title="Location Map"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-content">
                                <h2>Ready to Get Started?</h2>
                                <p>
                                    Get in touch with us today. We'll respond to your inquiry as soon as possible.
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>           
        </div>
    );
};

export default ContactInfo2;