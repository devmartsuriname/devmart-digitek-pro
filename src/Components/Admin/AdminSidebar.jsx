import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminSidebar({ isOpen, onClose }) {
  // Persistent collapse state for desktop
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin-sidebar-collapsed', isCollapsed);
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/admin/services', icon: 'bi-gear', label: 'Services' },
    { path: '/admin/projects', icon: 'bi-folder', label: 'Projects' },
    { path: '/admin/blog', icon: 'bi-file-text', label: 'Blog' },
    { path: '/admin/team', icon: 'bi-people', label: 'Team' },
    { path: '/admin/faq', icon: 'bi-question-circle', label: 'FAQ' },
    { path: '/admin/media', icon: 'bi-image', label: 'Media' },
    { path: '/admin/leads', icon: 'bi-envelope', label: 'Leads' },
    { path: '/admin/settings', icon: 'bi-sliders', label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            background: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1040,
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          position: 'fixed',
          top: '56px',
          left: isOpen ? '0' : (isCollapsed ? '-56px' : '-240px'),
          width: isCollapsed ? '56px' : '240px',
          height: 'calc(100vh - 56px)',
          backgroundColor: '#17012C',
          zIndex: 1040,
          overflowY: 'auto',
          transition: 'left 0.3s ease, width 0.3s ease',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: isCollapsed ? '0.75rem' : '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {!isCollapsed && (
            <h5 className="text-white mb-0 nav-text" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
              Admin Panel
            </h5>
          )}
          <button
            className="btn btn-link text-white d-md-none p-0"
            onClick={onClose}
            aria-label="Close sidebar"
            style={{ fontSize: '1.5rem' }}
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1rem 0', flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="nav-link"
              onClick={onClose}
              title={isCollapsed ? item.label : ''}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: isCollapsed ? '0.75rem' : '0.75rem 1rem',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: isActive ? '#6A47ED' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: isActive ? '600' : '400',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              })}
            >
              <i className={`${item.icon}`} style={{ fontSize: '1.25rem', marginRight: isCollapsed ? '0' : '0.75rem' }}></i>
              {!isCollapsed && <span className="nav-text">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse Toggle (Desktop Only) */}
        <div
          className="d-none d-md-block"
          style={{
            padding: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <button
            onClick={toggleCollapse}
            className="btn btn-link text-white p-2 w-100"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
            {!isCollapsed && <span className="ms-2 nav-text" style={{ fontSize: '0.875rem' }}>Collapse</span>}
          </button>
        </div>
      </aside>

      <style>{`
        /* Desktop sidebar positioning */
        @media (min-width: 768px) {
          .admin-sidebar {
            left: 0 !important;
          }
          .admin-sidebar.collapsed {
            width: 56px;
          }
        }

        /* Navigation hover effects */
        .admin-sidebar .nav-link:hover {
          background: linear-gradient(90deg, rgba(106, 71, 237, 0.2) 0%, rgba(106, 71, 237, 0.1) 100%);
        }

        /* Sidebar scrollbar */
        .admin-sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .admin-sidebar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .admin-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Text fade transition */
        .admin-sidebar .nav-text {
          opacity: 1;
          transition: opacity 0.2s ease 0.1s;
        }

        .admin-sidebar.collapsed .nav-text {
          opacity: 0;
          transition: opacity 0.1s ease;
        }
      `}</style>
    </>
  );
}
