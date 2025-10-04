import { Link, useParams, Navigate } from "react-router-dom";
import { useBlogPostBySlug, useBlogPosts } from "@/lib/hooks/useBlogPosts";
import parse from "html-react-parser";

const BlogDetails = () => {
  const { slug } = useParams();
  const { blogPost, loading, error } = useBlogPostBySlug(slug);
  const { blogPosts: recentPosts } = useBlogPosts({ status: 'published', limit: 3, orderBy: 'date' });

  if (loading) {
    return (
      <section className="news-details-section section-padding">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !blogPost) {
    return <Navigate to="/404" replace />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="news-details-section section-padding">
      <div className="container">
        <div className="news-details-wrapper">
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="news-post-details">
                <div className="single-news-post">
                  {blogPost.cover_url && (
                    <div className="post-featured-thumb">
                      <img src={blogPost.cover_url} alt={blogPost.title} />
                    </div>
                  )}
                  <div className="post-content">
                    <ul className="post-list d-flex align-items-center">
                      <li>
                        <i className="fa-regular fa-user"></i>
                        By Admin
                      </li>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i>
                        {formatDate(blogPost.date)}
                      </li>
                      {blogPost.views > 0 && (
                        <li>
                          <i className="fa-solid fa-eye"></i>
                          {blogPost.views} views
                        </li>
                      )}
                    </ul>
                    <h3>{blogPost.title}</h3>
                    {blogPost.summary && (
                      <p className="mb-3">{blogPost.summary}</p>
                    )}
                    {blogPost.body_mdx && (
                      <div className="blog-content">
                        {parse(blogPost.body_mdx)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row tag-share-wrap mt-4 mb-5">
                  <div className="col-lg-8 col-12">
                    {blogPost.tags && blogPost.tags.length > 0 && (
                      <div className="tagcloud">
                        <span>Tags:</span>
                        {blogPost.tags.map((tag, index) => (
                          <a href="#" key={index}>{tag}</a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end">
                    <div className="social-share">
                      <span className="me-3">Share:</span>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-twitter"></i></a>
                      <a href="#"><i className="bi bi-youtube"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="main-sidebar sticky-style">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Search</h4>
                  </div>
                  <div className="search-widget">
                    <form action="#">
                      <input type="text" placeholder="Search here" />
                      <button type="submit"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Recent Posts</h3>
                  </div>
                  <div className="recent-post-area">
                    {recentPosts.filter(post => post.slug !== slug).slice(0, 3).map((post) => (
                      <div className="recent-items" key={post.id}>
                        {post.cover_url && (
                          <div className="recent-thumb">
                            <img src={post.cover_url} alt={post.title} />
                          </div>
                        )}
                        <div className="recent-content">
                          <ul>
                            <li>
                              <i className="fa-solid fa-calendar-days"></i>
                              {formatDate(post.date)}
                            </li>
                          </ul>
                          <h6>
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
