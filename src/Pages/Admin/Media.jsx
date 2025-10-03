const Media = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-image" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
              </div>
              <h2 className="text-center mb-3 text-white">Media Library</h2>
              <p className="text-center text-white-50 mb-4">
                Upload, organize, and manage all your media files in one place.
              </p>
              
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-cloud-upload me-2"></i>
                      Drag & Drop
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Upload multiple files with drag and drop
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-collection me-2"></i>
                      Folder Organization
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Organize files into folders and categories
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
                    <h5 className="text-white mb-3">
                      <i className="bi bi-aspect-ratio me-2"></i>
                      Auto Optimization
                    </h5>
                    <p className="text-white-50 small mb-0">
                      Automatic image resizing and optimization
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <span className="badge px-4 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
                  Coming in Phase 2.6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
