import { useState, useEffect } from 'react';
import { CreateProjectSchema, UpdateProjectSchema } from '@/lib/schemas/project';
import toast from 'react-hot-toast';
import DatePicker from './DatePicker';
import FeaturedToggle from './FeaturedToggle';
import TechStackChips from './TechStackChips';
import GalleryManager from './GalleryManager';

const ProjectForm = ({ project, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    date: '',
    cover_url: '',
    gallery: [],
    tech: [],
    summary: '',
    body: '',
    seo_title: '',
    seo_desc: '',
    featured: false,
    status: 'draft',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        client: project.client || '',
        date: project.date || '',
        cover_url: project.cover_url || '',
        gallery: Array.isArray(project.gallery) ? project.gallery : [],
        tech: project.tech || [],
        summary: project.summary || '',
        body: project.body || '',
        seo_title: project.seo_title || '',
        seo_desc: project.seo_desc || '',
        featured: project.featured || false,
        status: project.status || 'draft',
      });
    }
  }, [project]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from title
    if (field === 'title' && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate with Zod
      const schema = isEdit ? UpdateProjectSchema : CreateProjectSchema;
      const validatedData = schema.parse(formData);

      await onSubmit(validatedData);
      toast.success(`Project ${isEdit ? 'updated' : 'created'} successfully`);
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error(error.message || 'Failed to save project');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">
          {isEdit ? 'Edit Project' : 'Create New Project'}
        </h4>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onCancel}
          disabled={loading}
        ></button>
      </div>

      {/* Basic Info Section */}
      <h6 className="text-white-50 mb-3">Basic Information</h6>

      <div className="mb-3">
        <label className="form-label text-white">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control bg-dark text-white border-secondary ${
            errors.title ? 'is-invalid' : ''
          }`}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          disabled={loading}
          maxLength={200}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label text-white">
          Slug <span className="text-danger">*</span>
          <small className="text-white-50 ms-2">(URL-friendly identifier)</small>
        </label>
        <input
          type="text"
          className={`form-control bg-dark text-white border-secondary ${
            errors.slug ? 'is-invalid' : ''
          }`}
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          disabled={loading}
          maxLength={200}
        />
        {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label text-white">Client</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={formData.client}
              onChange={(e) => handleChange('client', e.target.value)}
              disabled={loading}
              maxLength={200}
              placeholder="e.g., Acme Corp"
            />
          </div>
        </div>
        <div className="col-md-6">
          <DatePicker
            label="Completion Date"
            value={formData.date}
            onChange={(value) => handleChange('date', value)}
            error={errors.date}
            disabled={loading}
          />
        </div>
      </div>

      <hr className="border-secondary my-4" />

      {/* Media Section */}
      <h6 className="text-white-50 mb-3">Media</h6>

      <div className="mb-3">
        <label className="form-label text-white">Cover Image URL</label>
        <input
          type="url"
          className={`form-control bg-dark text-white border-secondary ${
            errors.cover_url ? 'is-invalid' : ''
          }`}
          value={formData.cover_url}
          onChange={(e) => handleChange('cover_url', e.target.value)}
          disabled={loading}
          placeholder="https://example.com/cover.jpg"
        />
        {errors.cover_url && <div className="invalid-feedback">{errors.cover_url}</div>}
        {formData.cover_url && (
          <img
            src={formData.cover_url}
            alt="Cover preview"
            className="mt-2 rounded"
            style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x150?text=Invalid+URL';
            }}
          />
        )}
      </div>

      <GalleryManager
        value={formData.gallery}
        onChange={(value) => handleChange('gallery', value)}
        disabled={loading}
      />

      <hr className="border-secondary my-4" />

      {/* Tech Stack Section */}
      <h6 className="text-white-50 mb-3">Tech Stack</h6>

      <TechStackChips
        value={formData.tech}
        onChange={(value) => handleChange('tech', value)}
        disabled={loading}
      />

      <hr className="border-secondary my-4" />

      {/* Content Section */}
      <h6 className="text-white-50 mb-3">Content</h6>

      <div className="mb-3">
        <label className="form-label text-white">
          Summary
          <small className="text-white-50 ms-2">
            ({formData.summary.length}/500 characters)
          </small>
        </label>
        <textarea
          className="form-control bg-dark text-white border-secondary"
          rows={3}
          value={formData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          disabled={loading}
          maxLength={500}
          placeholder="Brief project overview"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Body Content</label>
        <textarea
          className="form-control bg-dark text-white border-secondary"
          rows={8}
          value={formData.body}
          onChange={(e) => handleChange('body', e.target.value)}
          disabled={loading}
          placeholder="Detailed project description, challenges, solutions..."
        />
      </div>

      <hr className="border-secondary my-4" />

      {/* SEO Section */}
      <h6 className="text-white-50 mb-3">SEO</h6>

      <div className="mb-3">
        <label className="form-label text-white">
          SEO Title
          <small className="text-white-50 ms-2">
            ({formData.seo_title.length}/200 characters)
          </small>
        </label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          value={formData.seo_title}
          onChange={(e) => handleChange('seo_title', e.target.value)}
          disabled={loading}
          maxLength={200}
          placeholder="Leave empty to use project title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">
          SEO Description
          <small className="text-white-50 ms-2">
            ({formData.seo_desc.length}/300 characters)
          </small>
        </label>
        <textarea
          className="form-control bg-dark text-white border-secondary"
          rows={3}
          value={formData.seo_desc}
          onChange={(e) => handleChange('seo_desc', e.target.value)}
          disabled={loading}
          maxLength={300}
          placeholder="Leave empty to use project summary"
        />
      </div>

      <hr className="border-secondary my-4" />

      {/* Publishing Section */}
      <h6 className="text-white-50 mb-3">Publishing</h6>

      <FeaturedToggle
        value={formData.featured}
        onChange={(value) => handleChange('featured', value)}
        disabled={loading}
      />

      <div className="mb-3">
        <label className="form-label text-white">Status</label>
        <select
          className="form-select bg-dark text-white border-secondary"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          disabled={loading}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 justify-content-end mt-4">
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ background: '#6A47ED', borderColor: '#6A47ED' }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            <>{isEdit ? 'Update' : 'Create'} Project</>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
