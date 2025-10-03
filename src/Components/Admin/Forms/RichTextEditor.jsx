import { useState } from 'react';
import MDXPreview from './MDXPreview';

const RichTextEditor = ({ value = '', onChange, disabled = false, label = 'Content' }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label text-white mb-0">
          {label}
          <small className="text-white-50 ms-2">(Markdown/MDX supported)</small>
        </label>
        <button
          type="button"
          className="btn btn-sm btn-outline-light"
          onClick={() => setShowPreview(true)}
          disabled={!value || disabled}
        >
          <i className="bi bi-eye me-1"></i>
          Preview
        </button>
      </div>
      <textarea
        className="form-control bg-dark text-white border-secondary"
        style={{ fontFamily: 'monospace', fontSize: '14px' }}
        rows={15}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Write your content here using Markdown syntax..."
      />
      <div className="d-flex justify-content-between mt-1">
        <small className="text-white-50">
          {value.length.toLocaleString()} characters
        </small>
        <small className="text-white-50">
          ~{Math.ceil(value.split(/\s+/).length / 200)} min read
        </small>
      </div>

      <MDXPreview
        content={value}
        show={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default RichTextEditor;
