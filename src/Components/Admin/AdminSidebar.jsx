import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function AdminSidebar({ isOpen, onClose }) {
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
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            background: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1040,
            backdropFilter: 'blur(4px)'
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar position-fixed position-lg-sticky top-0 start-0 h-100 ${isOpen ? 'open' : ''}`}
        style={{
          width: '250px',
          background: '#17012C',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          zIndex: 1050,
          overflowY: 'auto',
        }}
      >
        {/* Sidebar Header */}
        <div
          className="d-flex align-items-center justify-content-between p-3"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <h5 className="text-white mb-0">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Menu
          </h5>
          <button
            className="btn btn-link text-white p-0 d-lg-none"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3" role="navigation" aria-label="Admin navigation">
          <ul className="list-unstyled mb-0" role="list">
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `d-flex align-items-center text-decoration-none px-3 py-2 rounded ${
                      isActive ? 'admin-nav-active' : 'admin-nav-link'
                    }`
                  }
                  style={{
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 992) {
                      onClose();
                    }
                  }}
                >
                  <i className={`bi ${item.icon} me-3`} style={{ fontSize: '1.1rem' }}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style>{`
        /* Desktop: always show sidebar */
        @media (min-width: 992px) {
          .admin-sidebar {
            position: sticky !important;
            transform: translateX(0) !important;
          }
        }

        /* Navigation styles */
        .admin-nav-link {
          color: rgba(255, 255, 255, 0.7);
        }

        .admin-nav-link:hover {
          color: #fff;
          background: rgba(106, 71, 237, 0.1);
        }

        .admin-nav-active {
          color: #fff;
          background: #6A47ED;
          font-weight: 500;
        }

        .admin-nav-active i {
          color: #C6F806;
        }

        /* Scrollbar styling */
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
      `}</style>
    </>
  );
}
