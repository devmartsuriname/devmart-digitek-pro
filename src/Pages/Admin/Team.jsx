const Team = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-people" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Team Management</h2>
              <p className="text-center text-white-50 mb-4">
                Manage your team members and showcase your talented professionals.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-person-badge me-2"></i>
                      Team Profiles
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Create detailed profiles for each team member
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-share me-2"></i>
                      Social Links
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Add social media profiles for each member
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-arrow-down-up me-2"></i>
                      Display Order
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Drag and drop to reorder team members
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
