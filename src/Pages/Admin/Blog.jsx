import { useState, lazy, Suspense } from 'react';
import { useBlogPosts } from '@/lib/hooks/useBlogPosts';
import BlogTable from '@/Components/Admin/Tables/BlogTable';
import { FormSkeleton } from '@/Components/Common/LoadingSkeleton';
import toast from 'react-hot-toast';

const BlogForm = lazy(() => import('@/Components/Admin/Forms/BlogForm'));

const Blog = () => {
  const [view, setView] = useState('list');
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    featured: undefined,
  });

  const { blogPosts, loading, error, createBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts(filters);

  const handleCreate = async (data) => {
    try {
      await createBlogPost(data);
      toast.success('Blog post created successfully!');
      setView('list');
    } catch (err) {
      toast.error(err.message || 'Failed to create blog post');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateBlogPost(selectedBlogPost.id, data);
      toast.success('Blog post updated successfully!');
      setView('list');
      setSelectedBlogPost(null);
    } catch (err) {
      toast.error(err.message || 'Failed to update blog post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogPost(id);
      toast.success('Blog post deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete blog post');
    }
  };

  const handleEdit = (blogPost) => {
    setSelectedBlogPost(blogPost);
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedBlogPost(null);
  };

  if (view === 'create') {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white mb-0">
                <i className="bi bi-file-text me-2"></i>
                Create Blog Post
              </h2>
            </div>
            <Suspense fallback={<FormSkeleton />}>
              <BlogForm onSubmit={handleCreate} onCancel={handleCancel} loading={loading} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white mb-0">
                <i className="bi bi-pencil me-2"></i>
                Edit Blog Post
              </h2>
            </div>
            <Suspense fallback={<FormSkeleton />}>
              <BlogForm
                initialData={selectedBlogPost}
                onSubmit={handleUpdate}
                onCancel={handleCancel}
                loading={loading}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white mb-0">
              <i className="bi bi-file-text me-2"></i>
              Blog Management
              <span className="badge ms-3" style={{ background: '#6A47ED', fontSize: '14px' }}>
                {blogPosts.length}
              </span>
            </h2>
            <button
              className="btn"
              style={{ background: '#6A47ED', color: 'white', border: 'none' }}
              onClick={() => setView('create')}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Blog Post
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
                    placeholder="Search by title or summary..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={filters.featured === undefined ? '' : filters.featured ? 'true' : 'false'}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        featured: e.target.value === '' ? undefined : e.target.value === 'true',
                      })
                    }
                  >
                    <option value="">All Posts</option>
                    <option value="true">Featured Only</option>
                    <option value="false">Not Featured</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setFilters({ search: '', status: '', featured: undefined })}
                  >
                    Clear
                  </button>
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

          <div className="card bg-dark border-secondary">
            <div className="card-body p-0">
              <BlogTable
                blogPosts={blogPosts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
