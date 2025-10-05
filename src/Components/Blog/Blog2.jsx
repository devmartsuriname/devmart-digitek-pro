import { Link } from "react-router-dom";
import { useBlogPosts } from "@/lib/hooks/useBlogPosts";
import OptimizedImage from "../../components/Common/OptimizedImage";

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
            <div className="row" style={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                {blogPosts.length === 0 && !loading ? (
                    <div className="col-12 text-center py-5">
                        <p className="text-white">No blog posts available at the moment.</p>
                    </div>
                ) : (
                    blogPosts.map((post) => (
                        <div key={post.id} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                            <div className="news-card-items">
                                <div className="news-image">
                                    <OptimizedImage 
                                        src={post.cover_url || '/assets/img/news/05.jpg'} 
                                        alt={`${post.title} - Blog post cover image`}
                                        width={600}
                                        height={450}
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