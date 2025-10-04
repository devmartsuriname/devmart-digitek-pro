const TeamTable = ({ teamMembers, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-white-50 mt-3">Loading team members...</p>
      </div>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-people" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
        <h5 className="text-white mt-3">No Team Members Found</h5>
        <p className="text-white-50">Create your first team member to get started</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th style={{ color: '#C6F806' }}>Photo</th>
            <th style={{ color: '#C6F806' }}>Name</th>
            <th style={{ color: '#C6F806' }}>Role</th>
            <th style={{ color: '#C6F806' }}>Slug</th>
            <th style={{ color: '#C6F806' }}>Order</th>
            <th style={{ color: '#C6F806' }}>Socials</th>
            <th style={{ color: '#C6F806' }}>Updated</th>
            <th style={{ color: '#C6F806' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236A47ED"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(106, 71, 237, 0.2)',
                      color: '#6A47ED',
                    }}
                  >
                    <i className="bi bi-person"></i>
                  </div>
                )}
              </td>
              <td className="text-white">{member.name}</td>
              <td className="text-white-50">{member.role || 'No role'}</td>
              <td>
                <code className="text-info">{member.slug}</code>
              </td>
              <td className="text-white-50">{member.order_num}</td>
              <td>
                {member.socials && Object.keys(member.socials).length > 0 ? (
                  <div className="d-flex gap-1">
                    {Object.entries(member.socials).slice(0, 3).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-50"
                        title={platform}
                      >
                        <i className={`bi bi-${platform.toLowerCase()}`}></i>
                      </a>
                    ))}
                    {Object.keys(member.socials).length > 3 && (
                      <span className="text-white-50">+{Object.keys(member.socials).length - 3}</span>
                    )}
                  </div>
                ) : (
                  <span className="text-white-50">—</span>
                )}
              </td>
              <td className="text-white-50">
                {new Date(member.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm"
                    style={{ background: 'rgba(106, 71, 237, 0.2)', color: '#C6F806' }}
                    onClick={() => onEdit(member)}
                    title="Edit"
                    aria-label={`Edit team member: ${member.name}`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(member.id)}
                    title="Delete"
                    aria-label={`Delete team member: ${member.name}`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
