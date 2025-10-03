import { useState, useEffect } from 'react';
import { CreateBlogPostSchema, UpdateBlogPostSchema } from '@/lib/schemas/blog';
import DatePicker from './DatePicker';
import FeaturedToggle from './FeaturedToggle';
import TagsInput from './TagsInput';
import RichTextEditor from './RichTextEditor';
import { useAuthors } from '@/lib/hooks/useAuthors';
import { useAuth } from '@/lib/contexts/AuthContext';

const BlogForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const { user } = useAuth();
  const { authors } = useAuthors();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author_id: user?.id || '',
    date: new Date().toISOString().split('T')[0],
    cover_url: '',
    tags: [],
    summary: '',
    body_mdx: '',
    seo_title: '',
    seo_desc: '',
    featured: false,
    status: 'draft',
  });

  const [errors, setErrors] = useState({});
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        author_id: initialData.author_id || user?.id || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        cover_url: initialData.cover_url || '',
        tags: initialData.tags || [],
        summary: initialData.summary || '',
        body_mdx: initialData.body_mdx || '',
        seo_title: initialData.seo_title || '',
        seo_desc: initialData.seo_desc || '',
        featured: initialData.featured || false,
        status: initialData.status || 'draft',
      });
      setAutoSlug(false);
    }
  }, [initialData, user]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'title' && autoSlug) {
        updated.slug = generateSlug(value);
      }

      if (field === 'title' && !updated.seo_title) {
        updated.seo_title = value;
      }

      if (field === 'summary' && !updated.seo_desc) {
        updated.seo_desc = value;
      }

      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setErrors({});

    const dataToSubmit = { ...formData, status };

    try {
      const schema = initialData ? UpdateBlogPostSchema : CreateBlogPostSchema;
      const validated = schema.parse(dataToSubmit);
      await onSubmit(validated);
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form>
      {/* Section 1: Basic Info */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-info-circle me-2"></i>
            Basic Information
          </h5>

          <div className="mb-3">
            <label className="form-label text-white">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control bg-dark text-white border-secondary ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={loading}
              maxLength={200}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            <small className="text-white-50">{formData.title.length}/200</small>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">
              Slug <span className="text-danger">*</span>
              <small className="text-white-50 ms-2">(URL-friendly identifier)</small>
            </label>
            <div className="input-group">
              <input
                type="text"
                className={`form-control bg-dark text-white border-secondary ${errors.slug ? 'is-invalid' : ''}`}
                value={formData.slug}
                onChange={(e) => {
                  handleChange('slug', e.target.value);
                  setAutoSlug(false);
                }}
                disabled={loading}
                maxLength={200}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  handleChange('slug', generateSlug(formData.title));
                  setAutoSlug(true);
                }}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
            {errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
            <small className="text-white-50">Preview: /blog/{formData.slug || 'your-slug'}</small>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Author</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={formData.author_id}
              onChange={(e) => handleChange('author_id', e.target.value)}
              disabled={loading}
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.full_name || 'Unknown'}
                </option>
              ))}
            </select>
          </div>

          <DatePicker
            label="Publication Date"
            value={formData.date}
            onChange={(value) => handleChange('date', value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Section 2: Media */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-image me-2"></i>
            Cover Image
          </h5>

          <div className="mb-3">
            <label className="form-label text-white">Cover Image URL</label>
            <input
              type="url"
              className={`form-control bg-dark text-white border-secondary ${errors.cover_url ? 'is-invalid' : ''}`}
              value={formData.cover_url}
              onChange={(e) => handleChange('cover_url', e.target.value)}
              disabled={loading}
              placeholder="https://example.com/image.jpg"
            />
            {errors.cover_url && <div className="invalid-feedback">{errors.cover_url}</div>}
          </div>

          {formData.cover_url && (
            <div className="mt-3">
              <img
                src={formData.cover_url}
                alt="Cover preview"
                className="img-fluid rounded"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Tags */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-tags me-2"></i>
            Tags
          </h5>

          <TagsInput
            value={formData.tags}
            onChange={(value) => handleChange('tags', value)}
            disabled={loading}
            suggestions={['Marketing', 'SEO', 'Design', 'Development', 'Strategy', 'Analytics']}
          />
        </div>
      </div>

      {/* Section 4: Content */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-file-text me-2"></i>
            Content
          </h5>

          <div className="mb-3">
            <label className="form-label text-white">Summary</label>
            <textarea
              className={`form-control bg-dark text-white border-secondary ${errors.summary ? 'is-invalid' : ''}`}
              rows={3}
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              disabled={loading}
              maxLength={500}
              placeholder="Brief summary for previews and SEO..."
            />
            {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
            <small className="text-white-50">{formData.summary.length}/500</small>
          </div>

          <RichTextEditor
            label="Body Content (MDX)"
            value={formData.body_mdx}
            onChange={(value) => handleChange('body_mdx', value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Section 5: SEO & Publishing */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-search me-2"></i>
            SEO & Publishing
          </h5>

          <div className="mb-3">
            <label className="form-label text-white">SEO Title</label>
            <input
              type="text"
              className={`form-control bg-dark text-white border-secondary ${errors.seo_title ? 'is-invalid' : ''}`}
              value={formData.seo_title}
              onChange={(e) => handleChange('seo_title', e.target.value)}
              disabled={loading}
              maxLength={200}
              placeholder="Defaults to post title"
            />
            {errors.seo_title && <div className="invalid-feedback">{errors.seo_title}</div>}
            <small className="text-white-50">{formData.seo_title.length}/200</small>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">SEO Description</label>
            <textarea
              className={`form-control bg-dark text-white border-secondary ${errors.seo_desc ? 'is-invalid' : ''}`}
              rows={2}
              value={formData.seo_desc}
              onChange={(e) => handleChange('seo_desc', e.target.value)}
              disabled={loading}
              maxLength={300}
              placeholder="Defaults to summary"
            />
            {errors.seo_desc && <div className="invalid-feedback">{errors.seo_desc}</div>}
            <small className="text-white-50">{formData.seo_desc.length}/300</small>
          </div>

          <FeaturedToggle
            value={formData.featured}
            onChange={(value) => handleChange('featured', value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 justify-content-end">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={loading}
        >
          {loading ? 'Saving...' : initialData ? 'Save as Draft' : 'Save Draft'}
        </button>
        <button
          type="button"
          className="btn"
          style={{ background: '#6A47ED', color: 'white', border: 'none' }}
          onClick={(e) => handleSubmit(e, 'published')}
          disabled={loading}
        >
          {loading ? 'Publishing...' : initialData ? 'Update & Publish' : 'Publish'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
