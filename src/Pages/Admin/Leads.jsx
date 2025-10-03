const Leads = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-envelope" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Leads Inbox</h2>
              <p className="text-center text-white-50 mb-4">
                Manage and respond to contact form submissions and inquiries.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-inbox me-2"></i>
                      Lead Inbox
                    </h5>
                    <p className="text-white-50 small mb-0">
                      View all contact form submissions in one place
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-check-circle me-2"></i>
                      Status Tracking
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Mark leads as new, contacted, or closed
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-download me-2"></i>
                      Export CSV
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Export leads for external CRM integration
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
