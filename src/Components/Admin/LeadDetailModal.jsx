import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const STATUS_COLORS = {
  new: { bg: 'rgba(106, 71, 237, 0.1)', text: '#6A47ED', label: 'New' },
  contacted: { bg: 'rgba(13, 110, 253, 0.1)', text: '#0d6efd', label: 'Contacted' },
  closed: { bg: 'rgba(25, 135, 84, 0.1)', text: '#198754', label: 'Closed' },
};

const LeadDetailModal = ({ lead, show, onHide, onStatusChange }) => {
  if (!lead) return null;

  const statusConfig = STATUS_COLORS[lead.status];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(lead.email);
    toast.success('Email copied to clipboard');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="bg-dark border-secondary" closeButton closeVariant="white">
        <Modal.Title className="text-white">
          <i className="bi bi-person-badge me-2" style={{ color: '#6A47ED' }}></i>
          Lead Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <div className="row g-4">
          {/* Header with status */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h4 className="text-white mb-1">{lead.name}</h4>
                <small className="text-white-50">
                  <i className="bi bi-calendar3 me-1"></i>
                  {new Date(lead.created_at).toLocaleString()}
                </small>
              </div>
              <div>
                <select
                  className="form-select form-select-sm"
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value)}
                  style={{
                    background: statusConfig.bg,
                    color: statusConfig.text,
                    border: 'none',
                    fontWeight: '600',
                  }}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-12">
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <h6 className="text-white mb-3">
                  <i className="bi bi-person-lines-fill me-2" style={{ color: '#6A47ED' }}></i>
                  Contact Information
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <small className="text-white-50 d-block mb-1">Email</small>
                    <div className="d-flex align-items-center">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-decoration-none me-2"
                        style={{ color: '#6A47ED' }}
                      >
                        {lead.email}
                      </a>
                      <button
                        className="btn btn-sm btn-link p-0"
                        onClick={handleCopyEmail}
                        style={{ color: '#6A47ED' }}
                        aria-label="Copy email to clipboard"
                        title="Copy email"
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </div>
                  {lead.phone && (
                    <div className="col-md-6">
                      <small className="text-white-50 d-block mb-1">Phone</small>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-decoration-none"
                        style={{ color: '#6A47ED' }}
                      >
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  {lead.source && (
                    <div className="col-md-6">
                      <small className="text-white-50 d-block mb-1">Source</small>
                      <span
                        className="badge"
                        style={{
                          background: 'rgba(106, 71, 237, 0.1)',
                          color: '#6A47ED',
                        }}
                      >
                        {lead.source}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subject */}
          {lead.subject && (
            <div className="col-12">
              <h6 className="text-white mb-2">
                <i className="bi bi-tag me-2" style={{ color: '#6A47ED' }}></i>
                Subject
              </h6>
              <p className="text-white-50 mb-0">{lead.subject}</p>
            </div>
          )}

          {/* Message */}
          <div className="col-12">
            <h6 className="text-white mb-2">
              <i className="bi bi-chat-left-text me-2" style={{ color: '#6A47ED' }}></i>
              Message
            </h6>
            <div
              className="p-3 rounded"
              style={{
                background: 'rgba(106, 71, 237, 0.05)',
                whiteSpace: 'pre-wrap',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <p className="text-white-50 mb-0">{lead.message}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary">
        <button className="btn btn-outline-secondary" onClick={onHide}>
          Close
        </button>
        <a
          href={`mailto:${lead.email}?subject=Re: ${lead.subject || 'Your inquiry'}`}
          className="btn"
          style={{ background: '#6A47ED', color: 'white' }}
        >
          <i className="bi bi-envelope me-2"></i>
          Reply via Email
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default LeadDetailModal;
