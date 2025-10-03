const Blog = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-file-text" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Blog Management</h2>
              <p className="text-center text-white-50 mb-4">
                Publish articles and insights with a powerful content management system.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-markdown me-2"></i>
                      MDX Editor
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Rich text editing with Markdown support
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-tags me-2"></i>
                      Tags & Categories
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Organize posts with tags and categories
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-calendar-check me-2"></i>
                      Draft & Publish
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Save drafts and schedule posts for later
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
