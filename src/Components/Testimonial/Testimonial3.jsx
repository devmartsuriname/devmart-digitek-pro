import LazySlider from "../Common/LazySlider";
import OptimizedImage from "../Common/OptimizedImage";

const Testimonial3 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 1,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };  

    const testimonialContent = [
        {img:'/assets/img/testimonial/05.png', subtitle:'Technical Manager, AppTec', title:'Alex Jansen', content:'For AppTec, finding the right partner for app development was crucial. Devmart exceeded every expectation with their technical expertise, fast communication, and ability to solve complex problems simply. We are proud of the end product.'},
        {img:'/assets/img/testimonial/05.png', subtitle:'CEO, InnovatieStart', title:'Janine de Vries', content:'Devmart brought our vision to life with a custom-made website that not only exceeded our expectations but also significantly improved our online visibility. Their attention to detail and dedication to quality makes them an indispensable partner.'},
        {img:'/assets/img/testimonial/05.png', subtitle:'Marketing Director, GroenEnergie', title:'Lucas Meijer', content:'Working with Devmart on our digital marketing strategy was a game changer. Their expertise in SEO and social media has doubled our leads and significantly increased our brand awareness. True professionals!'},
      ];

    return (
        <section className="testimonial-section-3 section-padding pt-0" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="visually-hidden">Client Testimonials</h2>
            <div className="overlay-shape">
                <img src="/assets/img/testimonial/overlay-shape.png" alt="" role="presentation" loading="lazy" />
            </div>
            <div className="overlay-shape-2">
                <img src="/assets/img/testimonial/overlay-shape-2.png" alt="img" loading="lazy" />
            </div>
            <div className="left-shape">
                <img src="/assets/img/testimonial/left-shape.png" alt="img" loading="lazy" />
            </div>
            <div className="right-shape">
                <img src="/assets/img/testimonial/right-shape.png" alt="img" loading="lazy" />
            </div>
            <div className="container">
                <div className="testimonial-wrapper-3">
                    <div className="client-1">
                        <img src="/assets/img/testimonial/06.png" alt="img" loading="lazy" />
                    </div>
                    <div className="client-2">
                        <img src="/assets/img/testimonial/07.png" alt="img" loading="lazy" />
                    </div>
                    <div className="client-3">
                        <img src="/assets/img/testimonial/08.png" alt="img" loading="lazy" />
                    </div>
                    <div className="client-4">
                        <img src="/assets/img/testimonial/09.png" alt="img" loading="lazy" />
                    </div>
                    <div className="swiper testimonial-slider-2">
                        <div className="swiper-wrapper">
                            
                        <LazySlider settings={settings}>
                        {testimonialContent.map((item, i) => (                            
                            <div key={i} className="swiper-slide">
                                <div className="testimonial-content">
                                    <div className="icon">
                                        <img src="/assets/img/testimonial/quote.png" alt="img" loading="lazy" />
                                    </div>
                                    <p>
                                    {item.content}
                                    </p>
                                    <div className="client-info">
                                        <div className="client-img">
                                            <OptimizedImage 
                                                src={item.img} 
                                                alt={`${item.title} - ${item.subtitle}`}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                        <div className="content">
                                            <h3>{item.title}</h3>
                                            <span>{item.subtitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            </LazySlider>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial3;