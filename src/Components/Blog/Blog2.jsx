import { Link } from "react-router-dom";
import { useBlogPosts } from "@/lib/hooks/useBlogPosts";

const Blog2 = () => {
    const { blogPosts, loading } = useBlogPosts({ 
        status: 'published',
        limit: 4 
    });

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
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                                <div className="news-card-items">
                                    <div className="news-image placeholder-glow">
                                        <div className="placeholder bg-secondary" style={{width: '100%', height: '250px'}}></div>
                                    </div>
                                    <div className="news-content">
                                        <ul className="post-cat placeholder-glow">
                                            <li><span className="placeholder bg-secondary col-6"></span></li>
                                        </ul>
                                        <h3 className="placeholder-glow">
                                            <span className="placeholder bg-secondary col-10"></span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : blogPosts.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p className="text-white">No blog posts available at the moment.</p>
                    </div>
                ) : (
                    blogPosts.map((post) => (
                        <div key={post.id} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                            <div className="news-card-items">
                                <div className="news-image">
                                    <img 
                                        src={post.cover_url || '/assets/img/news/05.jpg'} 
                                        alt={post.title} 
                                        loading="lazy" 
                                    />
                                </div>
                                <div className="news-content">
                                    <ul className="post-cat">
                                        <li>
                                            <i className="fa-regular fa-user"></i>
                                            By Admin
                                        </li>
                                        {post.tags && post.tags.length > 0 && (
                                            <li>
                                                <i className="fa-regular fa-tag"></i>
                                                {post.tags[0]}
                                            </li>
                                        )}
                                    </ul>
                                    <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                                    <Link to={`/blog/${post.slug}`} className="link-btn">
                                        Read More <i className="bi bi-arrow-right"></i>
                                    </Link>
                                    <div className="post-date">
                                        <i className="fa-light fa-calendar-days"></i>
                                        {new Date(post.date).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: '2-digit', 
                                            year: 'numeric' 
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </section>
    );
};

export default Blog2;