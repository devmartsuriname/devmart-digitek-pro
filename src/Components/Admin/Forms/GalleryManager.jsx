import { useState } from 'react';

const GalleryManager = ({ value = [], onChange, disabled = false }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddImage = () => {
    const trimmed = inputUrl.trim();
    
    // Basic URL validation
    if (!trimmed) {
      setError('Please enter an image URL');
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    if (value.includes(trimmed)) {
      setError('This image URL is already in the gallery');
      return;
    }

    onChange([...value, trimmed]);
    setInputUrl('');
    setError('');
  };

  const handleRemoveImage = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label text-white">
        Gallery Images
        <small className="text-white-50 ms-2">(Image URLs)</small>
      </label>
      
      {/* Image Grid */}
      {value.length > 0 && (
        <div className="row g-3 mb-3">
          {value.map((url, index) => (
            <div key={index} className="col-md-4">
              <div className="position-relative" style={{ aspectRatio: '16/9' }}>
                <img
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-100 h-100 rounded"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
                {!disabled && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    onClick={() => handleRemoveImage(index)}
                    aria-label="Remove image"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Input */}
      <div className="input-group">
        <input
          type="url"
          className={`form-control bg-dark text-white border-secondary ${error ? 'is-invalid' : ''}`}
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="https://example.com/image.jpg"
        />
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={handleAddImage}
          disabled={disabled || !inputUrl.trim()}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Image
        </button>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

export default GalleryManager;
