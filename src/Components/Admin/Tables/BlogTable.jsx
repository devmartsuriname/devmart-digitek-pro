const BlogTable = ({ blogPosts, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getStatusBadge = (status) => {
    return status === 'published' ? (
      <span className="badge bg-success">Published</span>
    ) : (
      <span className="badge bg-secondary">Draft</span>
    );
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

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-file-text" style={{ fontSize: '4rem', color: '#6A47ED' }}></i>
        <h4 className="text-white mt-3">No Blog Posts Found</h4>
        <p className="text-white-50">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover" role="table" aria-label="Blog posts list">
        <thead>
          <tr>
            <th style={{ width: '30%' }} scope="col">Title</th>
            <th style={{ width: '12%' }} scope="col">Author</th>
            <th style={{ width: '10%' }} scope="col">Date</th>
            <th style={{ width: '10%' }} scope="col">Status</th>
            <th style={{ width: '5%', textAlign: 'center' }} scope="col">Featured</th>
            <th style={{ width: '20%' }} scope="col">Tags</th>
            <th style={{ width: '8%', textAlign: 'center' }} scope="col">Views</th>
            <th style={{ width: '10%', textAlign: 'right' }} scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.map((post) => (
            <tr key={post.id}>
              <td>
                <div className="text-white fw-semibold">{truncate(post.title, 50)}</div>
                {post.summary && (
                  <small className="text-white-50">{truncate(post.summary, 60)}</small>
                )}
              </td>
              <td className="text-white-50">
                {post.author_name || 'Unknown'}
              </td>
              <td className="text-white-50">{formatDate(post.date)}</td>
              <td>{getStatusBadge(post.status)}</td>
              <td style={{ textAlign: 'center' }}>
                {post.featured && (
                  <i className="bi bi-star-fill" style={{ color: '#C6F806', fontSize: '1.2rem' }}></i>
                )}
              </td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="badge bg-secondary" style={{ fontSize: '11px' }}>
                      {tag}
                    </span>
                  ))}
                  {post.tags && post.tags.length > 3 && (
                    <span className="badge bg-secondary" style={{ fontSize: '11px' }}>
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td style={{ textAlign: 'center' }} className="text-white-50">
                {post.views.toLocaleString()}
              </td>
              <td style={{ textAlign: 'right' }}>
                <button
                  className="btn btn-sm me-2"
                  style={{ background: '#6A47ED', color: 'white', border: 'none' }}
                  onClick={() => onEdit(post)}
                  title="Edit"
                  aria-label={`Edit blog post: ${post.title}`}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    if (window.confirm(`Delete "${post.title}"?`)) {
                      onDelete(post.id);
                    }
                  }}
                  title="Delete"
                  aria-label={`Delete blog post: ${post.title}`}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
