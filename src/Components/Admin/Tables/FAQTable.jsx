import { useState } from 'react';

const FAQTable = ({ faqs, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Extract unique categories
  const categories = [...new Set(faqs.map(faq => faq.category).filter(Boolean))];

  // Filter FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const truncate = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Search questions or answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select bg-dark text-white border-secondary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-3">
        <small className="text-white-50">
          Showing {filteredFAQs.length} of {faqs.length} FAQs
        </small>
      </div>

      {/* Table */}
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6A47ED' }}></i>
          <p className="text-white-50 mt-3">
            {searchTerm || categoryFilter ? 'No FAQs match your filters' : 'No FAQs yet. Create your first one!'}
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Question</th>
                <th style={{ width: '35%' }}>Answer</th>
                <th style={{ width: '15%' }}>Category</th>
                <th style={{ width: '8%' }}>Order</th>
                <th style={{ width: '7%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFAQs.map(faq => (
                <tr key={faq.id}>
                  <td>
                    <strong className="text-white">{truncate(faq.question, 80)}</strong>
                  </td>
                  <td>
                    <span className="text-white-50" style={{ fontSize: '0.9rem' }}>
                      {truncate(faq.answer, 100)}
                    </span>
                  </td>
                  <td>
                    {faq.category ? (
                      <span className="badge" style={{ background: 'rgba(106, 71, 237, 0.2)', color: '#C6F806' }}>
                        {faq.category}
                      </span>
                    ) : (
                      <span className="text-white-50">—</span>
                    )}
                  </td>
                  <td>
                    <span className="text-white-50">{faq.order_num}</span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-light"
                        onClick={() => onEdit(faq)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          if (window.confirm(`Delete FAQ: "${faq.question}"?`)) {
                            onDelete(faq.id);
                          }
                        }}
                        title="Delete"
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
      )}
    </div>
  );
};

export default FAQTable;
