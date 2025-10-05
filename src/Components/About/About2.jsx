import { Link } from "react-router-dom";
import OptimizedImage from "../../components/Common/OptimizedImage";

const About2 = ({addclass}) => {

    const aboutContent = {  
        img:'/assets/img/about/01.jpg',  
        subtitle:"About Devmart",
        title:'Your Partner in Digital Innovation',
        content:'Devmart Suriname is a leading digital marketing and web development agency committed to helping businesses succeed online. We combine creativity, technology, and strategy to deliver exceptional digital solutions. With years of industry experience and a passion for innovation, our team transforms ideas into powerful digital experiences that drive real results.',  
        icon1:'bi bi-globe', 
        title2:'Modern Technology', 
        content2:'Latest tools and frameworks for cutting-edge solutions that keep you ahead of the competition', 
        icon2:'bi bi-award', 
        title3:'Proven Results', 
        content3:'Data-driven approach with measurable outcomes and transparent reporting for your success', 
      }

    return (
        <section className={addclass}>
            <div className="bg-shape">
                <img src="/assets/img/about/bg-shape-2.png" alt="img" />
            </div>
            <div className="right-shape float-bob-x">
                <img src="/assets/img/case-studies/right-shaape.png" alt="img" />
            </div>
            <div className="container">
                <div className="about-wrapper-2">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="about-image">
                                <OptimizedImage 
                                    src={aboutContent.img} 
                                    alt="About Devmart - Your partner in digital innovation and web development" 
                                    className="wow img-custom-anim-left" 
                                    width={800}
                                    height={1000}
                                />
                                <div className="box-shape float-bob-y">
                                    <img src="/assets/img/about/box-shape-2.png" alt="img" />
                                </div>
                                <div className="gap-shape float-bob-x">
                                    <img src="/assets/img/about/grap-2.png" alt="img" />
                                </div>
                                <Link to="/about" className="circle-button">
                                <i className="bi bi-arrow-up-right"></i>
                                    <span className="text-circle">
                                        <img src="/assets/img/about/white-text.png" alt="img" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-title">
                                    <div className="sub-title bg-color-2 wow fadeInUp">
                                        <span>{aboutContent.subtitle}</span>
                                    </div>
                                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                    {aboutContent.title}
                                    </h2>
                                </div>
                                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                                {aboutContent.content}
                                </p>
                                <div className="icon-items-area">
                                    <div className="icon-items wow fadeInUp" data-wow-delay=".3s">
                                        <div className="icon">
                                            <i className={aboutContent.icon1}></i>
                                        </div>
                                        <div className="content">
                                            <h3>{aboutContent.title2}</h3>
                                            <p>{aboutContent.content2}</p>
                                        </div>
                                    </div>
                                    <div className="icon-items wow fadeInUp" data-wow-delay=".5s">
                                        <div className="icon">
                                            <i className={aboutContent.icon2}></i>
                                        </div>
                                        <div className="content">
                                            <h3>{aboutContent.title3}</h3>
                                            <p>{aboutContent.content3} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-button">
                                    <div className="main-button wow fadeInUp" data-wow-delay=".3s">
                                        <Link to="/about"> <span className="theme-btn">ABOUT US MORE </span><span className="arrow-btn"><i className="bi bi-arrow-up-right"></i></span></Link>
                                    </div>
                                    <Link to="/about" className="link-btn wow fadeInUp" data-wow-delay=".5s">EXPLORE MORE</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About2;