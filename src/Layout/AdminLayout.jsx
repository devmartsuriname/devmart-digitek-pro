import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import '@/assets/admin-theme.css';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    return saved === 'true';
  });

  // Update collapsed state from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('admin-sidebar-collapsed');
      setSidebarCollapsed(saved === 'true');
    };

    // Listen for storage changes (from sidebar toggle)
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for same-window changes
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
      <a href="#admin-main-content" className="skip-link" style={{ 
        position: 'absolute',
        left: '-9999px',
        zIndex: 9999,
        padding: '1rem',
        background: '#6A47ED',
        color: '#fff',
        textDecoration: 'none',
      }}>
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
          height: '56px',
        }}
      >
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              {/* Sidebar Toggle - Mobile/Tablet */}
              <button
                className="btn btn-link text-white p-0 d-md-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
              </button>

              <Link to="/admin/dashboard" className="text-decoration-none">
                <h4 className="text-white mb-0" style={{ fontSize: '1.25rem' }}>
                  <i className="bi bi-speedometer2 me-2"></i>
                  Devmart Admin
                </h4>
              </Link>
            </div>

            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="text-white text-decoration-none d-none d-md-flex align-items-center" style={{ fontSize: '0.875rem' }}>
                <i className="bi bi-house-door me-1"></i>
                View Site
              </Link>
              <div className="text-white d-none d-sm-block" style={{ fontSize: '0.875rem' }}>
                <i className="bi bi-person-circle me-2"></i>
                {user?.email}
              </div>
              <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
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
        <main 
          id="admin-main-content"
          className="flex-grow-1 p-4"
          role="main"
          style={{
            marginLeft: sidebarCollapsed ? '56px' : '240px',
            minHeight: 'calc(100vh - 56px)',
            backgroundColor: '#0A0118',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        /* Mobile: no margin */
        @media (max-width: 767px) {
          #admin-main-content {
            margin-left: 0 !important;
          }
        }

        /* Skip link focus */
        .skip-link:focus {
          left: 0;
          top: 0;
        }
      `}</style>
    </div>
  );
}
