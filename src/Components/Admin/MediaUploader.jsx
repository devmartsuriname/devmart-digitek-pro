import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

const MediaUploader = ({ onUpload, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [folder, setFolder] = useState('');
  const [altText, setAltText] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (files.length === 0 || disabled) return;

    setUploading(true);
    const progress = files.map((file) => ({
      name: file.name,
      progress: 0,
      status: 'uploading',
    }));
    setUploadProgress(progress);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        await onUpload(file, folder || undefined, altText || file.name);
        setUploadProgress((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, progress: 100, status: 'success' } : item
          )
        );
      } catch (error) {
        setUploadProgress((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: 'error', error: error.message } : item
          )
        );
      }
    }

    setUploading(false);
    setTimeout(() => {
      setUploadProgress([]);
      setAltText('');
    }, 2000);
  };

  const clearProgress = () => {
    setUploadProgress([]);
  };

  return (
    <div className="mb-4">
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label text-white-50 small">Folder (optional)</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="e.g., blog, products, team"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            disabled={uploading}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50 small">Default Alt Text (optional)</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Descriptive text for images"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            disabled={uploading}
          />
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded p-5 text-center ${
          isDragging
            ? 'border-primary bg-primary bg-opacity-10'
            : 'border-secondary bg-dark'
        } ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Upload size={48} className="mx-auto mb-3" style={{ color: '#6A47ED' }} />
        <h5 className="text-white mb-2">Drop files here or click to browse</h5>
        <p className="text-white-50 small mb-0">
          Supports: Images, Videos, Documents (Max 10MB per file)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="d-none"
          onChange={handleFileSelect}
          disabled={disabled}
        />
      </div>

      {uploadProgress.length > 0 && (
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="text-white mb-0">Upload Progress</h6>
            {!uploading && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearProgress}
              >
                <X size={16} />
              </button>
            )}
          </div>
          {uploadProgress.map((item, idx) => (
            <div key={idx} className="mb-2">
              <div className="d-flex justify-content-between text-white-50 small mb-1">
                <span>{item.name}</span>
                <span>
                  {item.status === 'uploading' && `${item.progress}%`}
                  {item.status === 'success' && (
                    <span className="text-success">✓ Complete</span>
                  )}
                  {item.status === 'error' && (
                    <span className="text-danger">✗ Failed</span>
                  )}
                </span>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div
                  className={`progress-bar ${
                    item.status === 'success'
                      ? 'bg-success'
                      : item.status === 'error'
                      ? 'bg-danger'
                      : ''
                  }`}
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: item.status === 'uploading' ? '#6A47ED' : undefined,
                  }}
                />
              </div>
              {item.error && (
                <small className="text-danger">{item.error}</small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
