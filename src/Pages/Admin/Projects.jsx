const Projects = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-folder" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Projects Management</h2>
              <p className="text-center text-white-50 mb-4">
                Showcase your portfolio with a powerful project management system.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-grid-3x3 me-2"></i>
                      Project Grid
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Display projects in a filterable grid with tags
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-images me-2"></i>
                      Gallery Upload
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Upload multiple images with drag-drop ordering
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-star me-2"></i>
                      Featured Projects
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Mark projects as featured for homepage display
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
