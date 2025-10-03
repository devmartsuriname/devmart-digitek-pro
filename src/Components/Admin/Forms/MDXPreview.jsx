import { lazy, Suspense } from 'react';

// Lazy load react-markdown (only loads when preview is opened)
const ReactMarkdown = lazy(() => import('react-markdown'));

const MDXPreview = ({ content, show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <div
        className="modal show d-block"
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-white">
                <i className="bi bi-eye me-2"></i>
                Content Preview
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body text-white">
              <Suspense
                fallback={
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading preview...</span>
                    </div>
                    <p className="text-white-50 mt-3">Loading preview...</p>
                  </div>
                }
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="mb-3 text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="mb-3 text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="mb-3 text-white">{children}</h3>,
                    h4: ({ children }) => <h4 className="mb-3 text-white">{children}</h4>,
                    h5: ({ children }) => <h5 className="mb-3 text-white">{children}</h5>,
                    h6: ({ children }) => <h6 className="mb-3 text-white">{children}</h6>,
                    p: ({ children }) => <p className="mb-3 text-white-75">{children}</p>,
                    ul: ({ children }) => <ul className="mb-3 text-white-75">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-3 text-white-75">{children}</ol>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-start border-3 border-primary ps-3 mb-3 text-white-50">
                        {children}
                      </blockquote>
                    ),
                    code: ({ inline, children }) =>
                      inline ? (
                        <code className="bg-secondary px-2 py-1 rounded text-white">{children}</code>
                      ) : (
                        <pre className="bg-secondary p-3 rounded mb-3">
                          <code className="text-white">{children}</code>
                        </pre>
                      ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-primary text-decoration-none">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </Suspense>
            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MDXPreview;
