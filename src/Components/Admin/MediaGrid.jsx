import { useState } from 'react';
import { Copy, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const MediaGrid = ({ media, loading, onEdit, onDelete, onCopyUrl }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getFileTypeIcon = (type) => {
    if (!type) return 'bi-file-earmark';
    if (type.startsWith('image/')) return 'bi-file-image';
    if (type.startsWith('video/')) return 'bi-file-play';
    if (type.includes('pdf')) return 'bi-file-pdf';
    return 'bi-file-earmark';
  };

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="col-md-4 col-lg-3">
            <div className="card bg-dark border-secondary">
              <div
                className="placeholder-glow"
                style={{ paddingTop: '75%', position: 'relative' }}
              >
                <div
                  className="placeholder bg-secondary w-100 h-100"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
              <div className="card-body">
                <div className="placeholder-glow">
                  <span className="placeholder col-12 bg-secondary"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="text-center py-5">
        <ImageIcon size={64} className="mb-3" style={{ color: '#6A47ED', opacity: 0.5 }} />
        <h4 className="text-white mb-2">No media files yet</h4>
        <p className="text-white-50">Upload your first file to get started</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {media.map((item) => {
        const isImage = item.type?.startsWith('image/');
        const hasError = imageErrors[item.id];

        return (
          <div key={item.id} className="col-md-4 col-lg-3">
            <div className="card bg-dark border-secondary h-100 media-card">
              <div
                className="position-relative"
                style={{ paddingTop: '75%', overflow: 'hidden' }}
              >
                {isImage && !hasError ? (
                  <img
                    src={item.url}
                    alt={item.alt || 'Media'}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
                  >
                    <i
                      className={`bi ${getFileTypeIcon(item.type)}`}
                      style={{ fontSize: '3rem', color: '#6A47ED' }}
                    ></i>
                  </div>
                )}

                <div className="position-absolute top-0 start-0 w-100 h-100 media-overlay d-flex align-items-center justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => onCopyUrl(item.url)}
                    title="Copy URL"
                    aria-label={`Copy URL for ${item.alt || 'media file'}`}
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(item)}
                    title="Edit"
                    aria-label={`Edit ${item.alt || 'media file'}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(item)}
                    title="Delete"
                    aria-label={`Delete ${item.alt || 'media file'}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="card-body">
                <p className="text-white small mb-1 text-truncate" title={item.alt}>
                  {item.alt || 'No description'}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  {item.folder && (
                    <span className="badge bg-secondary small">{item.folder}</span>
                  )}
                  <small className="text-white-50 ms-auto">
                    {new Date(item.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .media-card {
          transition: transform 0.2s;
        }
        .media-card:hover {
          transform: translateY(-4px);
        }
        .media-overlay {
          background: rgba(0, 0, 0, 0.8);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .media-card:hover .media-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default MediaGrid;
