import { useState } from 'react';
import { useFAQs } from '@/lib/hooks/useFAQ';
import FAQTable from '@/Components/Admin/Tables/FAQTable';
import FAQForm from '@/Components/Admin/Forms/FAQForm';
import toast from 'react-hot-toast';

const FAQ = () => {
  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [saving, setSaving] = useState(false);

  const { faqs, loading, createFAQ, updateFAQ, deleteFAQ } = useFAQs();

  const handleCreate = async (data) => {
    try {
      setSaving(true);
      await createFAQ(data);
      toast.success('FAQ created successfully!');
      setView('list');
    } catch (error) {
      toast.error(error.message || 'Failed to create FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setSaving(true);
      await updateFAQ(selectedFAQ.id, data);
      toast.success('FAQ updated successfully!');
      setView('list');
      setSelectedFAQ(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id);
      toast.success('FAQ deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete FAQ');
    }
  };

  const handleEdit = (faq) => {
    setSelectedFAQ(faq);
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedFAQ(null);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-body p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="text-white mb-1">
                    <i className="bi bi-question-circle me-2" style={{ color: '#6A47ED' }}></i>
                    FAQ Management
                  </h2>
                  <p className="text-white-50 mb-0">
                    {view === 'list' && `Manage ${faqs.length} frequently asked questions`}
                    {view === 'create' && 'Create a new FAQ'}
                    {view === 'edit' && 'Edit FAQ'}
                  </p>
                </div>
                {view === 'list' && (
                  <button
                    className="btn text-dark"
                    style={{ background: '#C6F806' }}
                    onClick={() => setView('create')}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add FAQ
                  </button>
                )}
              </div>

              {/* Content */}
              {view === 'list' && (
                <FAQTable
                  faqs={faqs}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}

              {view === 'create' && (
                <FAQForm
                  onSubmit={handleCreate}
                  onCancel={handleCancel}
                  loading={saving}
                />
              )}

              {view === 'edit' && (
                <FAQForm
                  faq={selectedFAQ}
                  onSubmit={handleUpdate}
                  onCancel={handleCancel}
                  loading={saving}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
