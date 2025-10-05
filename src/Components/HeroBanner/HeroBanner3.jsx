import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import OptimizedImage from "../../components/Common/OptimizedImage";
import { trackCTAClick } from "@/lib/adapters/plausible/PlausibleAdapter";

// Cache-busting update: 2025-01-03 - Force editor to reload assets
const HeroBanner3 = () => {

        useEffect(() => {
            loadBackgroudImages();
        }, []);

        const heroContent = {
            bg:'/assets/img/hero/hero-bg-3.jpg',  
            subtitle:"Excellence in Digital Innovation",
            title:'Transform Your <span>Digital Presence</span>',
            content:'At Devmart, we combine creativity and technology to accelerate your growth. From websites to graphic design and app development – we make technology accessible, innovative and effective.',
            img:'/assets/img/hero/hero-image-3.png',     
            btnname:'GET STARTED',             
            btnurl:'/contact',             
          }

    return (
        <section className="hero-section hero-3" data-background={heroContent.bg}>
            <div className="line-shape">
                <img src="/assets/img/hero/line-shape.png" alt="img" />
            </div>
            <div className="container-fluid">
                <div className="row g-4 justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-content">
                            <h6 className="wow fadeInUp">{heroContent.subtitle}</h6>
                            <h1 className="wow fadeInUp" data-wow-delay=".3s">
                               {parse(heroContent.title)}
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay=".5s">
                            {heroContent.content}
                            </p>
                            <div className="hero-button">
                                <div className="main-button wow fadeInUp" data-wow-delay=".3s">
                                    <Link 
                                        to={heroContent.btnurl}
                                        onClick={() => trackCTAClick(heroContent.btnname, 'Hero Banner')}
                                    > 
                                        <span className="theme-btn">{heroContent.btnname}</span>
                                        <span className="arrow-btn"><i className="bi bi-arrow-right"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="hero-image wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
                            <OptimizedImage 
                                src={heroContent.img} 
                                alt="Transform your digital presence with Devmart - Professional web development and digital marketing services" 
                                eager={true}
                                width={1200}
                                height={1000}
                                lqip={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner3;