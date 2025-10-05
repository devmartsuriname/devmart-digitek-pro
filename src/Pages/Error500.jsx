import { Link } from 'react-router-dom';

/**
 * Error 500 Page
 * Displayed when server errors occur
 */
const Error500 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <section className="error-section section-padding fix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-items text-center">
              {/* Error Illustration */}
              <div className="error-image mb-4">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-danger"
                >
                  <path d="M12 9v4m0 4h.01M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z" />
                </svg>
              </div>

              {/* Error Code */}
              <h1 className="display-1 fw-bold text-primary mb-3">500</h1>

              {/* Error Title */}
              <h2 className="h3 mb-4">Internal Server Error</h2>

              {/* Error Description */}
              <p className="mb-5 text-muted">
                We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                <button 
                  onClick={handleReload}
                  className="theme-btn"
                  aria-label="Reload page"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reload Page
                </button>

                <Link to="/" className="theme-btn bg-secondary">
                  <i className="bi bi-house me-2"></i>
                  Back To Home
                </Link>

                <Link to="/contact" className="theme-btn-outline">
                  <i className="bi bi-envelope me-2"></i>
                  Contact Support
                </Link>
              </div>

              {/* Additional Info */}
              <div className="error-info text-start bg-light p-4 rounded">
                <h3 className="h5 mb-3">What happened?</h3>
                <p className="mb-3">
                  The server encountered an unexpected condition that prevented it from fulfilling your request.
                </p>
                
                <h3 className="h5 mb-3 mt-4">What can you do?</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Wait a few minutes and try again
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    If the problem persists, contact our support team
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Check our status page for any ongoing issues
                  </li>
                </ul>
              </div>

              {/* Error ID (for support) */}
              <p className="mt-4 text-muted small">
                Error ID: {Date.now().toString(36).toUpperCase()}
                <br />
                Time: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error500;
