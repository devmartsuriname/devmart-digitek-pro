const FAQ = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-question-circle" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">FAQ Management</h2>
              <p className="text-center text-white-50 mb-4">
                Create and organize frequently asked questions for your visitors.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-folder2 me-2"></i>
                      Categories
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Organize FAQs into logical categories
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-text-paragraph me-2"></i>
                      Rich Answers
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Format answers with rich text editor
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-search me-2"></i>
                      Search & Filter
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Help users find answers quickly
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
