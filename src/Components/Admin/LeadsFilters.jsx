import { useState } from 'react';
import { exportLeadsToCSV } from '@/lib/utils/exportCSV';
import { toast } from 'react-hot-toast';

const LeadsFilters = ({ counts, currentStatus, currentSearch, onStatusChange, onSearchChange, onExport }) => {
  const [searchValue, setSearchValue] = useState(currentSearch || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    onSearchChange('');
    onStatusChange(undefined);
  };

  const hasActiveFilters = currentStatus || searchValue;

  return (
    <div className="mb-4">
      {/* Status Filter Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <button
          className={`btn ${!currentStatus ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={
            !currentStatus
              ? { background: '#6A47ED', borderColor: '#6A47ED' }
              : { borderColor: '#444', color: '#fff' }
          }
          onClick={() => onStatusChange(undefined)}
        >
          All
          <span className="badge bg-dark ms-2">{counts.total}</span>
        </button>

        <button
          className={`btn ${currentStatus === 'new' ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={
            currentStatus === 'new'
              ? { background: '#6A47ED', borderColor: '#6A47ED' }
              : { borderColor: '#444', color: '#fff' }
          }
          onClick={() => onStatusChange('new')}
        >
          <i className="bi bi-inbox me-2"></i>
          New
          <span className="badge bg-dark ms-2">{counts.new}</span>
        </button>

        <button
          className={`btn ${currentStatus === 'contacted' ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={
            currentStatus === 'contacted'
              ? { background: '#6A47ED', borderColor: '#6A47ED' }
              : { borderColor: '#444', color: '#fff' }
          }
          onClick={() => onStatusChange('contacted')}
        >
          <i className="bi bi-telephone me-2"></i>
          Contacted
          <span className="badge bg-dark ms-2">{counts.contacted}</span>
        </button>

        <button
          className={`btn ${currentStatus === 'closed' ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={
            currentStatus === 'closed'
              ? { background: '#6A47ED', borderColor: '#6A47ED' }
              : { borderColor: '#444', color: '#fff' }
          }
          onClick={() => onStatusChange('closed')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Closed
          <span className="badge bg-dark ms-2">{counts.closed}</span>
        </button>
      </div>

      {/* Search and Actions */}
      <div className="row g-2">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-dark border-secondary">
              <i className="bi bi-search text-white-50"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Search by name, email, or subject..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            {searchValue && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearchValue('');
                  onSearchChange('');
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        <div className="col-md-6 d-flex gap-2 justify-content-md-end">
          {hasActiveFilters && (
            <button className="btn btn-outline-secondary" onClick={handleClearFilters}>
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Clear Filters
            </button>
          )}

          <button
            className="btn btn-outline-primary"
            style={{ borderColor: '#6A47ED', color: '#6A47ED' }}
            onClick={onExport}
          >
            <i className="bi bi-download me-2"></i>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsFilters;
