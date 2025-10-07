/**
 * ActivityFeed Component
 * Recent activity widget showing latest blog posts and leads
 */

import { Link } from 'react-router-dom';

export default function ActivityFeed({ blogPosts = [], leads = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)' }}>
        <div className="card-body p-3">
          <h5 className="text-white mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
            Recent Activity
          </h5>
          <div className="placeholder-glow">
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-2">
                <div className="placeholder col-12 bg-secondary" style={{ height: '16px' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentPosts = blogPosts.slice(0, 3);
  const recentLeads = leads.slice(0, 3);

  return (
    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)' }}>
      <div className="card-body p-3">
        <h5 className="text-white mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
          Recent Activity
        </h5>

        {/* Latest Blog Posts */}
        {recentPosts.length > 0 && (
          <div className="mb-3">
            <h6 className="text-white-50 mb-2" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              <i className="bi bi-newspaper me-2"></i>Latest Posts
            </h6>
            <div className="list-group list-group-flush">
              {recentPosts.map((post) => (
                <div key={post.id} className="list-group-item bg-transparent border-secondary p-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <p className="text-white mb-0" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {post.title}
                      </p>
                      <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                        {new Date(post.date).toLocaleDateString()}
                      </small>
                    </div>
                    {post.views > 0 && (
                      <span className="badge bg-primary" style={{ fontSize: '0.75rem' }}>
                        {post.views} views
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest Leads */}
        {recentLeads.length > 0 && (
          <div className="mb-2">
            <h6 className="text-white-50 mb-2" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              <i className="bi bi-envelope me-2"></i>Latest Leads
            </h6>
            <div className="list-group list-group-flush">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="list-group-item bg-transparent border-secondary p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-white mb-0" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {lead.name}
                      </p>
                      <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                        {lead.email}
                      </small>
                    </div>
                    <span className={`badge ${
                      lead.status === 'new' ? 'bg-primary' :
                      lead.status === 'contacted' ? 'bg-warning' : 'bg-success'
                    }`} style={{ fontSize: '0.75rem' }}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentPosts.length === 0 && recentLeads.length === 0 && (
          <p className="text-white-50 text-center mb-0" style={{ fontSize: '0.875rem' }}>
            No recent activity
          </p>
        )}

        <Link 
          to="/admin/leads" 
          className="btn btn-sm btn-outline-primary mt-3 w-100"
          style={{ fontSize: '0.875rem' }}
        >
          View All Activity
        </Link>
      </div>
    </div>
  );
}
