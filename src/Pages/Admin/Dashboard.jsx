import { useAuth } from '@/lib/contexts/AuthContext';
import { useServices } from '@/lib/hooks/useServices';
import { useProjects } from '@/lib/hooks/useProjects';
import { useBlogPosts } from '@/lib/hooks/useBlogPosts';
import { useLeads } from '@/lib/hooks/useLeads';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch counts from repositories
  const { count: servicesCount, loading: servicesLoading } = useServices({ status: 'published' });
  const { totalCount: projectsCount, loading: projectsLoading } = useProjects({ status: 'published' });
  const { blogPosts, loading: blogLoading } = useBlogPosts({ status: 'published', limit: 3 });
  const { leads, counts: leadCounts, loading: leadsLoading } = useLeads({ limit: 5 });
  
  const isLoading = servicesLoading || projectsLoading || blogLoading || leadsLoading;

  return (
    <div>
      <div className="section-title-area mb-5">
        <div className="section-title">
          <h2 className="text-white">Welcome to Devmart Admin</h2>
          <p className="text-white mt-3">
            You're logged in as: <strong>{user?.email}</strong>
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Stats Cards */}
        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-file-earmark-text display-4 text-primary mb-3"></i>
              <h3 className="text-white">
                {isLoading ? '...' : servicesCount || 0}
              </h3>
              <p className="text-white-50 mb-0">Published Services</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-folder display-4 text-success mb-3"></i>
              <h3 className="text-white">
                {isLoading ? '...' : projectsCount || 0}
              </h3>
              <p className="text-white-50 mb-0">Published Projects</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-newspaper display-4 text-warning mb-3"></i>
              <h3 className="text-white">
                {isLoading ? '...' : blogPosts?.length || 0}
              </h3>
              <p className="text-white-50 mb-0">Published Blog Posts</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-envelope display-4 text-danger mb-3"></i>
              <h3 className="text-white">
                {isLoading ? '...' : leadCounts?.total || 0}
              </h3>
              <p className="text-white-50 mb-0">Total Leads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="row mt-5 g-4">
        <div className="col-lg-8">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <h4 className="text-white mb-4">Recent Leads</h4>
              {leadsLoading ? (
                <p className="text-white-50">Loading...</p>
              ) : leads && leads.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice(0, 5).map((lead) => (
                        <tr key={lead.id}>
                          <td className="text-white">{lead.name}</td>
                          <td className="text-white-50">{lead.email}</td>
                          <td>
                            <span className={`badge ${
                              lead.status === 'new' ? 'bg-primary' :
                              lead.status === 'contacted' ? 'bg-warning' : 'bg-success'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="text-white-50">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-white-50">No leads yet.</p>
              )}
              <Link to="/admin/leads" className="btn btn-primary mt-3">
                View All Leads
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <h4 className="text-white mb-4">Quick Actions</h4>
              <div className="d-grid gap-2">
                <Link to="/admin/services" className="btn btn-outline-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Services
                </Link>
                <Link to="/admin/projects" className="btn btn-outline-success">
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Projects
                </Link>
                <Link to="/admin/blog" className="btn btn-outline-warning">
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Blog
                </Link>
                <Link to="/admin/team" className="btn btn-outline-info">
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Team
                </Link>
              </div>
            </div>
          </div>

          {/* Latest Blog Posts */}
          <div className="card bg-dark border-0 shadow-sm mt-4">
            <div className="card-body">
              <h4 className="text-white mb-4">Latest Blog Posts</h4>
              {blogLoading ? (
                <p className="text-white-50">Loading...</p>
              ) : blogPosts && blogPosts.length > 0 ? (
                <div className="list-group list-group-flush">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="list-group-item bg-dark border-secondary">
                      <h6 className="text-white mb-1">{post.title}</h6>
                      <small className="text-white-50">
                        {new Date(post.date).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white-50">No posts yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
