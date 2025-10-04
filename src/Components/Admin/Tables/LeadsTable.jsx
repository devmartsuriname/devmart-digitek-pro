import { useState } from 'react';

const STATUS_COLORS = {
  new: { bg: 'rgba(106, 71, 237, 0.1)', text: '#6A47ED', label: 'New' },
  contacted: { bg: 'rgba(13, 110, 253, 0.1)', text: '#0d6efd', label: 'Contacted' },
  closed: { bg: 'rgba(25, 135, 84, 0.1)', text: '#198754', label: 'Closed' },
};

const LeadsTable = ({ leads, loading, onStatusChange, onRowClick }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleStatusChange = async (e, leadId) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    if (newStatus && onStatusChange) {
      await onStatusChange(leadId, newStatus);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" role="status" aria-live="polite">
        <div className="spinner-border" style={{ color: '#6A47ED' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#6A47ED', opacity: 0.3 }}></i>
        <h4 className="text-white mt-3">No leads found</h4>
        <p className="text-white-50">Leads will appear here when visitors submit the contact form.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover" role="table" aria-label="Leads inbox">
        <thead>
          <tr style={{ borderBottom: '2px solid #6A47ED' }}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th className="d-none d-md-table-cell" scope="col">Phone</th>
            <th className="d-none d-lg-table-cell" scope="col">Subject</th>
            <th className="d-none d-lg-table-cell" scope="col">Source</th>
            <th scope="col">Status</th>
            <th className="d-none d-md-table-cell" scope="col">Date</th>
            <th style={{ width: '40px' }} scope="col"><span className="visually-hidden">Expand</span></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isExpanded = expandedRows.has(lead.id);
            const statusConfig = STATUS_COLORS[lead.status];

            return (
              <>
                <tr
                  key={lead.id}
                  onClick={() => toggleRow(lead.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="text-white fw-semibold">{lead.name}</div>
                  </td>
                  <td>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-decoration-none"
                      style={{ color: '#6A47ED' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="d-none d-md-table-cell text-white-50">
                    {lead.phone ? (
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-decoration-none text-white-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {lead.phone}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="d-none d-lg-table-cell text-white-50">
                    {lead.subject || '—'}
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {lead.source && (
                      <span
                        className="badge"
                        style={{
                          background: 'rgba(106, 71, 237, 0.1)',
                          color: '#6A47ED',
                          fontSize: '11px',
                        }}
                      >
                        {lead.source}
                      </span>
                    )}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      className="form-select form-select-sm bg-dark text-white border-0"
                      value={lead.status}
                      onChange={(e) => handleStatusChange(e, lead.id)}
                      style={{
                        background: statusConfig.bg,
                        color: statusConfig.text,
                        fontWeight: '600',
                        fontSize: '12px',
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="d-none d-md-table-cell text-white-50" style={{ fontSize: '13px' }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-center">
                    <i
                      className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}
                      style={{ color: '#6A47ED' }}
                      role="button"
                      aria-label={isExpanded ? 'Collapse lead details' : 'Expand lead details'}
                    ></i>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan="8" style={{ background: 'rgba(106, 71, 237, 0.05)' }}>
                      <div className="p-3">
                        <div className="row g-3">
                          <div className="col-12">
                            <h6 className="text-white mb-2">
                              <i className="bi bi-chat-left-text me-2" style={{ color: '#6A47ED' }}></i>
                              Message
                            </h6>
                            <p className="text-white-50 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                              {lead.message}
                            </p>
                          </div>
                          {/* Mobile info */}
                          <div className="col-md-6 d-md-none">
                            <small className="text-white-50 d-block mb-1">Phone</small>
                            <div className="text-white">{lead.phone || '—'}</div>
                          </div>
                          <div className="col-md-6 d-md-none">
                            <small className="text-white-50 d-block mb-1">Subject</small>
                            <div className="text-white">{lead.subject || '—'}</div>
                          </div>
                          <div className="col-md-6 d-md-none">
                            <small className="text-white-50 d-block mb-1">Date</small>
                            <div className="text-white">
                              {new Date(lead.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
