import { Link } from "react-router-dom";

const Blog2 = () => {

    const blogContent = [
        {img:'/assets/img/news/05.jpg', title:'Why Every Surinamese Business Needs a Website in 2025'},
        {img:'/assets/img/news/06.jpg', title:'Mobile App Development: Native vs Cross-Platform'},
        {img:'/assets/img/news/07.jpg', title:'SEO Basics: How to Rank Higher on Google in Suriname'},
        {img:'/assets/img/news/08.jpg', title:'Branding Tips for Small Businesses and Startups'},
      ];

    return (
        <section className="news-section pt-0 section-padding" aria-labelledby="blog-heading">
        <div className="container">
            <div className="section-title text-center">
                <div className="sub-title bg-color-2 wow fadeInUp">
                    <span>BLOG & NEWS</span>
                </div>
                <h2 id="blog-heading" className="wow fadeInUp" data-wow-delay=".3s">
                    Featured News And Insights
                </h2>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
            {blogContent.map((item, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                    <div className="news-card-items">
                        <div className="news-image">
                            <img src={item.img} alt="img" loading="lazy" />
                        </div>
                        <div className="news-content">
                            <ul className="post-cat">
                                <li>
                                    <i className="fa-regular fa-user"></i>
                                    By Admin
                                </li>
                                <li>
                                    <i className="fa-regular fa-tag"></i>
                                    Business
                                </li>
                            </ul>
                            <h3><Link to="/blog/blog-details">{item.title}</Link></h3>
                            <Link to="/blog/blog-details" className="link-btn">Read More <i className="bi bi-arrow-right"></i></Link>
                            <div className="post-date">
                                <i className="fa-light fa-calendar-days"></i>
                                Oct  05, 2024
                            </div>
                        </div>
                    </div>
                </div>
                ))}



            </div>
        </div>
    </section>
    );
};

export default Blog2;