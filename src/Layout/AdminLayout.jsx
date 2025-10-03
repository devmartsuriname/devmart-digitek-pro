import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function AdminLayout() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await signOut();
    }
  };

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', background: '#17012C' }}>
      {/* Admin Header */}
      <header
        className="admin-header"
        style={{
          background: '#17012C',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0',
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/dashboard" className="text-decoration-none">
              <h4 className="text-white mb-0">
                <i className="bi bi-speedometer2 me-2"></i>
                Devmart Admin
              </h4>
            </Link>

            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door me-1"></i>
                View Site
              </Link>
              <div className="text-white">
                <i className="bi bi-person-circle me-2"></i>
                {user?.email}
              </div>
              <button onClick={handleLogout} className="theme-btn btn-sm">
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="admin-content" style={{ padding: '3rem 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
