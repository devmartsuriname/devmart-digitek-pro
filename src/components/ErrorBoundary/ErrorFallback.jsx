import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Error Fallback Component
 * Default UI shown when Error Boundary catches an error
 * 
 * @param {Error} error - The error that was caught
 * @param {object} errorInfo - React error info with component stack
 * @param {function} resetError - Function to reset error state and retry
 */
const ErrorFallback = ({ error, errorInfo, resetError }) => {
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <div className="error-fallback-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-fallback-content text-center py-5">
              {/* Error Icon */}
              <div className="error-icon mb-4">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-danger"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>

              {/* Error Title */}
              <h1 className="error-title mb-3">Oops! Something went wrong</h1>

              {/* Error Description */}
              <p className="error-description mb-4">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>

              {/* Error Details (Development only) */}
              {isDevelopment && error && (
                <div className="error-details-dev text-start mb-4">
                  <details className="bg-light p-3 rounded">
                    <summary className="cursor-pointer fw-bold text-danger mb-2">
                      🐛 Error Details (Development)
                    </summary>
                    <div className="mt-3">
                      <p className="mb-2">
                        <strong>Message:</strong>
                      </p>
                      <pre className="bg-white p-2 rounded border text-sm">
                        {error.message || 'Unknown error'}
                      </pre>

                      {error.stack && (
                        <>
                          <p className="mb-2 mt-3">
                            <strong>Stack Trace:</strong>
                          </p>
                          <pre className="bg-white p-2 rounded border text-sm overflow-auto" style={{ maxHeight: '200px' }}>
                            {error.stack}
                          </pre>
                        </>
                      )}

                      {errorInfo?.componentStack && (
                        <>
                          <p className="mb-2 mt-3">
                            <strong>Component Stack:</strong>
                          </p>
                          <pre className="bg-white p-2 rounded border text-sm overflow-auto" style={{ maxHeight: '200px' }}>
                            {errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action Buttons */}
              <div className="error-actions d-flex flex-wrap gap-3 justify-content-center">
                <button
                  onClick={resetError}
                  className="theme-btn"
                  aria-label="Try again"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Try Again
                </button>

                <Link
                  to="/"
                  className="theme-btn bg-secondary"
                  aria-label="Go to homepage"
                >
                  <i className="bi bi-house me-2"></i>
                  Go Home
                </Link>

                <Link
                  to="/contact"
                  className="theme-btn-outline"
                  aria-label="Contact support"
                >
                  <i className="bi bi-envelope me-2"></i>
                  Contact Support
                </Link>
              </div>

              {/* Helpful Tips */}
              <div className="error-tips mt-5 text-start">
                <h3 className="h5 mb-3">What you can try:</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Refresh the page
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Clear your browser cache
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Try a different browser
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Check your internet connection
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.object,
  resetError: PropTypes.func.isRequired,
};

export default ErrorFallback;
