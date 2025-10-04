import { Link } from "react-router-dom";

const Services2 = () => {

    const chooseContent = [
        {img:'/assets/img/service/01.png', title:'Web Development', content:'We build custom websites that strengthen your brand and attract customers. User-friendly, fast and visually impressive.'},
        {img:'/assets/img/service/05.png', title:'App Development', content:'From concept to launch, we develop innovative apps that strengthen your business in the digital world.'},
        {img:'/assets/img/service/06.png', title:'Graphic Design', content:'Make your brand stand out with visual designs that speak. We create imagery that powerfully conveys your story.'},
      ]; 

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
                <div className="row">
                    {chooseContent.map((item, i) => (
                    <div key={i} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <div className="service-card-items style-2">
                            <div className="service-thumb">
                                <img src={item.img} alt="img" loading="lazy" />
                            </div>
                            <div className="content">
                                <h3 className="title-2">
                                    <Link to="/service/service-details">{item.title}</Link>
                                </h3>
                                <p>
                                {item.content}
                                </p>
                                <Link to="/service/service-details" className="service-btn">Read more <i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Services2;