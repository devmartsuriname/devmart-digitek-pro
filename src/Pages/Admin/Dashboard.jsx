import { useAuth } from '@/lib/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

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
        {/* Placeholder Stats Cards */}
        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-file-earmark-text display-4 text-primary mb-3"></i>
              <h3 className="text-white">0</h3>
              <p className="text-white-50 mb-0">Services</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-folder display-4 text-success mb-3"></i>
              <h3 className="text-white">0</h3>
              <p className="text-white-50 mb-0">Projects</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-newspaper display-4 text-warning mb-3"></i>
              <h3 className="text-white">0</h3>
              <p className="text-white-50 mb-0">Blog Posts</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-envelope display-4 text-danger mb-3"></i>
              <h3 className="text-white">0</h3>
              <p className="text-white-50 mb-0">Leads</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <h4 className="text-white mb-3">Quick Actions</h4>
              <p className="text-white-50">
                Admin CMS modules will be available in Phase 2. For now, you have access to the
                authenticated admin area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
