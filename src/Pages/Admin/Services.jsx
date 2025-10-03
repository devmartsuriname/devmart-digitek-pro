const Services = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-gear" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Services Management</h2>
              <p className="text-center text-white-50 mb-4">
                This module will allow you to create, edit, and manage your service offerings.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-list-ul me-2"></i>
                      Services List
                    </h5>
                    <p className="text-white-50 small mb-0">
                      View all services with search, filter, and sort capabilities
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-pencil-square me-2"></i>
                      Create & Edit
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Rich text editor for service descriptions and details
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-eye me-2"></i>
                      SEO Optimization
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Meta titles, descriptions, and slug management
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
