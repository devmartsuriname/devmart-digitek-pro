import { useEffect, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import VideoModal from "../VideoModal/VideoModal";

const Counter2 = () => {

    useEffect(() => {
        loadBackgroudImages();
    }, []);

       const [iframeSrc, setIframeSrc] = useState('about:blank');
      const [toggle, setToggle] = useState(false);
    
      const handelClick = () => {
        setIframeSrc("https://www.youtube.com/embed/rRid6GCJtgc");
        setToggle(!toggle);
      };
      const handelClose = () => {
        setIframeSrc('about:blank');
        setToggle(!toggle);
      };   

    return (
        <section className="cta-counter-section-2 section-padding bg-cover" data-background="/assets/img/cta-counter-bg.jpg" aria-labelledby="stats-heading">
            <div className="container">
                <div className="cta-counter-wrapper-2">
                    <div className="section-title-area">
                        <div className="section-title">
                            <div className="sub-title bg-color-3 wow fadeInUp">
                                <span>Our Success Story</span>
                            </div>
                            <h2 id="stats-heading" className="text-white wow fadeInUp" data-wow-delay=".3s">
                                Building Digital Excellence <br/> in Suriname
                            </h2>
                        </div>
                        <div className="counter-box-area">
                            <div className="counter-text wow fadeInUp" data-wow-delay=".3s">
                                <div className="counter-number">
                                    <span className="count">380</span>+
                                </div>
                                <p>Completed Projects</p>
                            </div>
                            <div className="counter-text wow fadeInUp" data-wow-delay=".5s">
                                <div className="counter-number">
                                    <span className="count">426</span>+
                                </div>
                                <p>Satisfied Clients</p>
                            </div>
                            <div className="counter-text wow fadeInUp" data-wow-delay=".7s">
                                <div className="counter-number">
                                    <span className="count">45</span>+
                                </div>
                                <p>Team Members</p>
                            </div>
                        </div>
                    </div>
                    <div className="cta-video-image wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
                        <img src="/assets/img/cta-video.jpg" alt="Devmart success story video thumbnail" loading="lazy" />
                        <button 
                            onClick={handelClick} 
                            className="video-icon video-popup"
                            aria-label="Play video about Devmart success story"
                        >
                            <i className="bi bi-play-fill" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <VideoModal
            isTrue={toggle}
            iframeSrc={iframeSrc}
            handelClose={handelClose}        
        ></VideoModal>             
        </section>
    );
};

export default Counter2;