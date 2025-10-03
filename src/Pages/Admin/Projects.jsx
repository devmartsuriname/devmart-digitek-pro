import { useState, lazy, Suspense } from 'react';
import { useProjects } from '@/lib/hooks/useProjects';
import { FormSkeleton } from '@/Components/Common/LoadingSkeleton';
import ProjectTable from '@/Components/Admin/Tables/ProjectTable';
import toast from 'react-hot-toast';

const ProjectForm = lazy(() => import('@/Components/Admin/Forms/ProjectForm'));

const Projects = () => {
  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    featured: undefined,
    tech: '',
  });

  const { projects, loading, error, totalCount, createProject, updateProject, deleteProject } = useProjects(filters);

  const handleCreate = async (data) => {
    try {
      await createProject(data);
      setView('list');
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error(error.message || 'Failed to create project');
      throw error;
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateProject(selectedProject.id, data);
      setView('list');
      setSelectedProject(null);
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error(error.message || 'Failed to update project');
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error(error.message || 'Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Render form view
  if (view === 'create' || view === 'edit') {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card bg-dark border-0 shadow-lg">
              <Suspense fallback={<FormSkeleton />}>
                <ProjectForm
                  project={view === 'edit' ? selectedProject : null}
                  onSubmit={view === 'edit' ? handleUpdate : handleCreate}
                  onCancel={handleCancel}
                  isEdit={view === 'edit'}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render list view
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-white mb-1">Projects</h2>
              <p className="text-white-50 mb-0">
                Manage your portfolio projects ({totalCount} total)
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setView('create')}
              style={{ background: '#6A47ED', borderColor: '#6A47ED' }}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Project
            </button>
          </div>

          {/* Filters */}
          <div className="card bg-dark border-secondary mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Search projects..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={filters.featured === undefined ? '' : filters.featured}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        featured: e.target.value === '' ? undefined : e.target.value === 'true',
                      })
                    }
                  >
                    <option value="">All Projects</option>
                    <option value="true">Featured</option>
                    <option value="false">Not Featured</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Filter by tech (e.g., React)"
                    value={filters.tech}
                    onChange={(e) => setFilters({ ...filters, tech: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {/* Table */}
          <ProjectTable
            projects={projects}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
