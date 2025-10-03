import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MediaEditModal = ({ media, onSave, onClose, show }) => {
  const [formData, setFormData] = useState({
    alt: '',
    folder: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (media) {
      setFormData({
        alt: media.alt || '',
        folder: media.folder || '',
      });
    }
  }, [media]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.alt.trim()) {
      setError('Alt text is required');
      return;
    }

    if (formData.alt.length > 200) {
      setError('Alt text must be less than 200 characters');
      return;
    }

    if (formData.folder && formData.folder.length > 100) {
      setError('Folder name must be less than 100 characters');
      return;
    }

    try {
      setSaving(true);
      await onSave(media.id, {
        alt: formData.alt.trim(),
        folder: formData.folder.trim() || undefined,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!show || !media) return null;

  const isImage = media.type?.startsWith('image/');
  const charCount = formData.alt.length;
  const charLimit = 200;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-white">Edit Media</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={saving}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {isImage && (
                <div className="mb-3">
                  <img
                    src={media.url}
                    alt={media.alt || 'Preview'}
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-white">
                  Alt Text <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  name="alt"
                  value={formData.alt}
                  onChange={handleChange}
                  placeholder="Descriptive text for this media"
                  required
                  maxLength={200}
                  disabled={saving}
                />
                <small className={`${charCount > charLimit ? 'text-danger' : 'text-white-50'}`}>
                  {charCount} / {charLimit} characters
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Folder (optional)</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  name="folder"
                  value={formData.folder}
                  onChange={handleChange}
                  placeholder="e.g., blog, products, team"
                  maxLength={100}
                  disabled={saving}
                />
                <small className="text-white-50">Organize media into folders</small>
              </div>

              <div className="mb-0">
                <label className="form-label text-white-50 small">URL</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white-50 border-secondary"
                  value={media.url}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                style={{ backgroundColor: '#6A47ED', borderColor: '#6A47ED' }}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaEditModal;
