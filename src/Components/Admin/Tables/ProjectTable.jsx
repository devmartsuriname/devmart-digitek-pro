const ProjectTable = ({ projects, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card bg-dark border-secondary">
        <div className="card-body text-center py-5">
          <i className="bi bi-folder2-open" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
          <h5 className="text-white mt-3">No Projects Found</h5>
          <p className="text-white-50">Create your first project to showcase your work</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-dark border-secondary">
      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Featured</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="text-white fw-semibold">{project.title}</td>
                <td className="text-white-50">{project.client || '—'}</td>
                <td className="text-white-50">
                  {project.date ? new Date(project.date).toLocaleDateString() : '—'}
                </td>
                <td>
                  <span
                    className={`badge ${
                      project.status === 'published'
                        ? 'bg-success'
                        : 'bg-secondary'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="text-center">
                  {project.featured && (
                    <i className="bi bi-star-fill" style={{ color: '#C6F806' }}></i>
                  )}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => onEdit(project)}
                    title="Edit project"
                    aria-label={`Edit project: ${project.title}`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      if (window.confirm(`Delete "${project.title}"?`)) {
                        onDelete(project.id);
                      }
                    }}
                    title="Delete project"
                    aria-label={`Delete project: ${project.title}`}
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

export default ProjectTable;
