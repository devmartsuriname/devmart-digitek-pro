import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await signOut();
    }
  };

  return (
    <div className="admin-layout d-flex flex-column" style={{ minHeight: '100vh', background: '#17012C' }}>
      {/* Skip to main content link for accessibility */}
      <a href="#admin-main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Admin Header */}
      <header
        className="admin-header"
        role="banner"
        style={{
          background: '#17012C',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              {/* Sidebar Toggle - Mobile/Tablet */}
              <button
                className="btn btn-link text-white p-0 d-lg-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
              </button>

              <Link to="/admin/dashboard" className="text-decoration-none">
                <h4 className="text-white mb-0">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Devmart Admin
                </h4>
              </Link>
            </div>

            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="text-white text-decoration-none d-none d-md-flex align-items-center">
                <i className="bi bi-house-door me-1"></i>
                View Site
              </Link>
              <div className="text-white d-none d-sm-block">
                <i className="bi bi-person-circle me-2"></i>
                {user?.email}
              </div>
              <button onClick={handleLogout} className="theme-btn btn-sm">
                <i className="bi bi-box-arrow-right me-1 d-none d-sm-inline"></i>
                <span className="d-none d-sm-inline">Logout</span>
                <i className="bi bi-box-arrow-right d-sm-none"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Body with Sidebar */}
      <div className="d-flex flex-grow-1">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <main id="admin-main-content" className="flex-grow-1" style={{ padding: '3rem 1.5rem', overflowX: 'hidden' }} role="main">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
