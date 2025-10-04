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
        <section className="cta-counter-section-2 section-padding bg-cover" data-background="/assets/img/cta-counter-bg.jpg">
            <div className="container">
                <div className="cta-counter-wrapper-2">
                    <div className="section-title-area">
                        <div className="section-title">
                            <div className="sub-title bg-color-3 wow fadeInUp">
                                <span>Counter</span>
                            </div>
                            <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                                Make your marketing <br/> more effective
                            </h2>
                        </div>
                        <div className="counter-box-area">
                            <div className="counter-text wow fadeInUp" data-wow-delay=".3s">
                                <div className="counter-number">
                                    <span className="count">19.4</span>K
                                </div>
                                <p>Projects Done</p>
                            </div>
                            <div className="counter-text wow fadeInUp" data-wow-delay=".5s">
                                <div className="counter-number">
                                    <span className="count">95.2</span>K
                                </div>
                                <p>Happy Clients</p>
                            </div>
                            <div className="counter-text wow fadeInUp" data-wow-delay=".7s">
                                <div className="counter-number">
                                    <span className="count">142.6</span>K
                                </div>
                                <p>Team Members</p>
                            </div>
                        </div>
                    </div>
                    <div className="cta-video-image wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
                        <img src="/assets/img/cta-video.jpg" alt="img" loading="lazy" />
                        <a onClick={handelClick} className="video-icon video-popup">
                            <i className="bi bi-play-fill"></i>
                        </a>
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