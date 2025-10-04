const ServiceTable = ({ services, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-5" role="status" aria-live="polite">
        <div className="spinner-border" style={{ color: '#6A47ED' }}></div>
        <p className="text-white-50 mt-3">Loading services...</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="card bg-dark border-0 shadow-lg">
        <div className="card-body p-5 text-center">
          <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
          <h4 className="text-white mt-3">No Services Found</h4>
          <p className="text-white-50">Create your first service to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-dark border-0 shadow-lg">
      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0" role="table" aria-label="Services list">
          <thead style={{ borderBottom: '2px solid #6A47ED' }}>
            <tr>
              <th className="text-white" scope="col">Title</th>
              <th className="text-white" scope="col">Slug</th>
              <th className="text-white" scope="col">Status</th>
              <th className="text-white" scope="col">Order</th>
              <th className="text-white" scope="col">Updated</th>
              <th className="text-white text-end" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="text-white">{service.title}</td>
                <td className="text-white-50">
                  <code style={{ color: '#C6F806' }}>{service.slug}</code>
                </td>
                <td>
                  <span
                    className={`badge ${
                      service.status === 'published' ? 'bg-success' : 'bg-warning'
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="text-white-50">{service.order_num}</td>
                <td className="text-white-50">
                  {new Date(service.updated_at).toLocaleDateString()}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm me-2"
                    style={{ background: 'rgba(106, 71, 237, 0.2)', color: '#C6F806' }}
                    onClick={() => onEdit(service)}
                    title="Edit"
                    aria-label={`Edit service: ${service.title}`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm(`Delete "${service.title}"?`)) {
                        onDelete(service.id);
                      }
                    }}
                    title="Delete"
                    aria-label={`Delete service: ${service.title}`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
