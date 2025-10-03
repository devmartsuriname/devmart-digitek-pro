import { useState, useMemo } from 'react';
import { useMedia } from '@/lib/hooks/useMedia';
import MediaUploader from '@/Components/Admin/MediaUploader';
import MediaGrid from '@/Components/Admin/MediaGrid';
import MediaFilters from '@/Components/Admin/MediaFilters';
import MediaEditModal from '@/Components/Admin/MediaEditModal';
import toast from 'react-hot-toast';

const Media = () => {
  const [filters, setFilters] = useState({ limit: 50, offset: 0 });
  const [editingMedia, setEditingMedia] = useState(null);
  const [deletingMedia, setDeletingMedia] = useState(null);

  const {
    media,
    loading,
    error,
    totalCount,
    uploadMedia,
    updateMedia,
    deleteMedia,
    copyToClipboard,
  } = useMedia(filters);

  // Extract unique folders from media
  const folders = useMemo(() => {
    const folderSet = new Set();
    media.forEach((item) => {
      if (item.folder) folderSet.add(item.folder);
    });
    return Array.from(folderSet).sort();
  }, [media]);

  const handleUpload = async (file, folder, alt) => {
    try {
      await uploadMedia(file, folder, alt);
      toast.success(`${file.name} uploaded successfully`);
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const handleEdit = (mediaItem) => {
    setEditingMedia(mediaItem);
  };

  const handleSaveEdit = async (id, data) => {
    try {
      await updateMedia(id, data);
      toast.success('Media updated successfully');
      setEditingMedia(null);
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const handleDelete = (mediaItem) => {
    setDeletingMedia(mediaItem);
  };

  const confirmDelete = async () => {
    if (!deletingMedia) return;

    try {
      await deleteMedia(deletingMedia.id);
      toast.success('Media deleted successfully');
      setDeletingMedia(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCopyUrl = async (url) => {
    try {
      await copyToClipboard(url);
      toast.success('URL copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-white mb-1">Media Library</h2>
              <p className="text-white-50 mb-0">
                {totalCount} {totalCount === 1 ? 'file' : 'files'} total
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <MediaUploader onUpload={handleUpload} disabled={loading} />

      <MediaFilters
        filters={filters}
        onFilterChange={setFilters}
        folders={folders}
      />

      <MediaGrid
        media={media}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCopyUrl={handleCopyUrl}
      />

      <MediaEditModal
        media={editingMedia}
        show={!!editingMedia}
        onSave={handleSaveEdit}
        onClose={() => setEditingMedia(null)}
      />

      {/* Delete Confirmation Modal */}
      {deletingMedia && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title text-white">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setDeletingMedia(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-white">
                  Are you sure you want to delete this media file?
                </p>
                <p className="text-white-50 small mb-0">
                  <strong>{deletingMedia.alt || 'Untitled'}</strong>
                  <br />
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setDeletingMedia(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
