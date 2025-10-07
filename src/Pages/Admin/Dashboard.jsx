import { useAuth } from '@/lib/contexts/AuthContext';
import { useServices } from '@/lib/hooks/useServices';
import { useProjects } from '@/lib/hooks/useProjects';
import { useBlogPosts } from '@/lib/hooks/useBlogPosts';
import { useLeads } from '@/lib/hooks/useLeads';
import { Link } from 'react-router-dom';
import StatCard from '@/Components/Admin/UI/StatCard';
import ActivityFeed from '@/Components/Admin/UI/ActivityFeed';
import HealthWidget from '@/Components/Admin/UI/HealthWidget';
import { CardSkeleton } from '@/Components/Admin/UI/ShimmerSkeleton';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch counts from repositories
  const { count: servicesCount, loading: servicesLoading } = useServices({ status: 'published' });
  const { totalCount: projectsCount, loading: projectsLoading } = useProjects({ status: 'published' });
  const { blogPosts, loading: blogLoading } = useBlogPosts({ status: 'published', limit: 3 });
  const { leads, counts: leadCounts, loading: leadsLoading } = useLeads({ limit: 5 });
  
  const isLoading = servicesLoading || projectsLoading || blogLoading || leadsLoading;

  return (
    <div className="admin-layout">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-admin">
          <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white mb-2">Welcome to Devmart Admin</h2>
        <p className="text-white-50 mb-0" style={{ fontSize: '0.875rem' }}>
          Logged in as: <strong>{user?.email}</strong>
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6 col-sm-12">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <StatCard
              icon="bi-file-earmark-text"
              value={servicesCount || 0}
              label="Published Services"
              color="text-primary"
            />
          )}
        </div>

        <div className="col-xl-3 col-md-6 col-sm-12">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <StatCard
              icon="bi-folder"
              value={projectsCount || 0}
              label="Published Projects"
              color="text-success"
            />
          )}
        </div>

        <div className="col-xl-3 col-md-6 col-sm-12">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <StatCard
              icon="bi-newspaper"
              value={blogPosts?.length || 0}
              label="Published Posts"
              color="text-warning"
            />
          )}
        </div>

        <div className="col-xl-3 col-md-6 col-sm-12">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <StatCard
              icon="bi-envelope"
              value={leadCounts?.total || 0}
              label="Total Leads"
              color="text-danger"
            />
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="row g-3">
        {/* Recent Leads - Left Column */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)' }}>
            <div className="card-body p-3">
              <h4 className="text-white mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                Recent Leads
              </h4>
              {leadsLoading ? (
                <div className="placeholder-glow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="mb-2">
                      <div className="placeholder col-12 bg-secondary" style={{ height: '16px' }}></div>
                    </div>
                  ))}
                </div>
              ) : leads && leads.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th style={{ fontSize: '0.875rem' }}>Name</th>
                        <th style={{ fontSize: '0.875rem' }}>Email</th>
                        <th style={{ fontSize: '0.875rem' }}>Status</th>
                        <th style={{ fontSize: '0.875rem' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice(0, 5).map((lead) => (
                        <tr key={lead.id}>
                          <td className="text-white" style={{ fontSize: '0.875rem' }}>{lead.name}</td>
                          <td className="text-white-50" style={{ fontSize: '0.875rem' }}>{lead.email}</td>
                          <td>
                            <span className={`badge ${
                              lead.status === 'new' ? 'bg-primary' :
                              lead.status === 'contacted' ? 'bg-warning' : 'bg-success'
                            }`} style={{ fontSize: '0.75rem' }}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="text-white-50" style={{ fontSize: '0.875rem' }}>
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-white-50 mb-0">No leads yet.</p>
              )}
              <Link to="/admin/leads" className="btn btn-sm btn-primary mt-3" style={{ fontSize: '0.875rem' }}>
                View All Leads
              </Link>
            </div>
          </div>
        </div>

        {/* Activity Feed - Middle Column */}
        <div className="col-lg-3">
          <ActivityFeed 
            blogPosts={blogPosts || []}
            leads={leads || []}
            isLoading={blogLoading || leadsLoading}
          />
        </div>

        {/* Quick Actions & Health - Right Column */}
        <div className="col-lg-3">
          {/* Quick Actions */}
          <div className="card border-0 shadow-sm mb-3" style={{ background: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)' }}>
            <div className="card-body p-3">
              <h5 className="text-white mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                Quick Actions
              </h5>
              <div className="d-grid gap-2">
                <Link to="/admin/services" className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.875rem' }}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Services
                </Link>
                <Link to="/admin/projects" className="btn btn-sm btn-outline-success" style={{ fontSize: '0.875rem' }}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Projects
                </Link>
                <Link to="/admin/blog" className="btn btn-sm btn-outline-warning" style={{ fontSize: '0.875rem' }}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Blog
                </Link>
                <Link to="/admin/team" className="btn btn-sm btn-outline-info" style={{ fontSize: '0.875rem' }}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Manage Team
                </Link>
              </div>
            </div>
          </div>

          {/* Health Widget */}
          <HealthWidget />
        </div>
      </div>
    </div>
  );
}
