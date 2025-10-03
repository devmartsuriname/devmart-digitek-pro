import { useState, lazy, Suspense } from 'react';
import { toast } from 'react-hot-toast';
import { useServices } from '@/lib/hooks/useServices';
import ServiceTable from '@/Components/Admin/Tables/ServiceTable';
import { FormSkeleton } from '@/Components/Common/LoadingSkeleton';

const ServiceForm = lazy(() => import('@/Components/Admin/Forms/ServiceForm'));

const Services = () => {
  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedService, setSelectedService] = useState(null);
  const [filters, setFilters] = useState({ status: undefined, search: '' });
  const [formLoading, setFormLoading] = useState(false);

  const { services, loading, error, count, createService, updateService, deleteService } = useServices(filters);

  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      await createService(data);
      toast.success('Service created successfully!');
      setView('list');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      await updateService(selectedService.id, data);
      toast.success('Service updated successfully!');
      setView('list');
      setSelectedService(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      toast.success('Service deleted successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedService(null);
  };

  if (view === 'create') {
    return (
      <div className="container py-5">
        <Suspense fallback={<FormSkeleton />}>
          <ServiceForm
            onSubmit={handleCreate}
            onCancel={handleCancel}
            loading={formLoading}
          />
        </Suspense>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="container py-5">
        <Suspense fallback={<FormSkeleton />}>
          <ServiceForm
            service={selectedService}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            loading={formLoading}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-white mb-2">Services Management</h2>
          <p className="text-white-50 mb-0">
            {count} {count === 1 ? 'service' : 'services'} found
          </p>
        </div>
        <button
          className="btn"
          style={{ background: '#6A47ED', color: 'white' }}
          onClick={() => setView('create')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-dark border-0 shadow-lg mb-4">
        <div className="card-body p-3">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Search services..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-dark text-white border-secondary"
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Services;
