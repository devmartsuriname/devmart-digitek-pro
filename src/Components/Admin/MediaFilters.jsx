import { Search, X } from 'lucide-react';

const MediaFilters = ({ filters, onFilterChange, folders = [] }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value || undefined });
  };

  const handleFolderChange = (e) => {
    onFilterChange({ ...filters, folder: e.target.value || undefined });
  };

  const clearFilters = () => {
    onFilterChange({ limit: 50, offset: 0 });
  };

  const hasActiveFilters = filters.search || filters.type || filters.folder;

  return (
    <div className="card bg-dark border-secondary mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-white-50 small">Search</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary">
                <Search size={16} className="text-white-50" />
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Search by alt text..."
                value={filters.search || ''}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50 small">Type</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={filters.type || ''}
              onChange={handleTypeChange}
            >
              <option value="">All Types</option>
              <option value="image/">Images</option>
              <option value="video/">Videos</option>
              <option value="application/pdf">Documents</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50 small">Folder</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={filters.folder || ''}
              onChange={handleFolderChange}
            >
              <option value="">All Folders</option>
              {folders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            {hasActiveFilters && (
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                <X size={16} className="me-1" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFilters;
