import { Link } from "react-router-dom";
import LazySlider from "../Common/LazySlider";

const CaseStudy3 = () => {

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


    const chooseContent = [
        {subtitle:'Web Development', title:'Quality Performers', img:'/assets/img/case-studies/02.jpg'},
        {subtitle:'App Development', title:'Planify Suriname', img:'/assets/img/case-studies/03.jpg'},
        {subtitle:'Web Development', title:'Car Rental City', img:'/assets/img/case-studies/04.jpg'},
      ];

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
            <div className="swiper project-slider">
                <div className="swiper-wrapper cs_slider_gap_30">
                <LazySlider settings={settings}>
                {chooseContent.map((item, i) => (
                    <div key={i} className="swiper-slide">
                        <div className="case-studies-card-items">
                            <div className="thumb">
                                <img src={item.img} alt="img" loading="lazy" />
                            </div>
                            <div className="content">
                                <div className="title">
                                    <h3><Link to="/project/project-details">{item.title}</Link></h3>
                                    <p>{item.subtitle}</p>
                                </div>
                                <Link 
                                    to="/project/project-details" 
                                    className="icon"
                                    aria-label={`View ${item.title} project details`}
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
        </div>
    </section>
    );
};

export default CaseStudy3;