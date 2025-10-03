import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateServiceSchema } from '@/lib/schemas/service';

const ServiceForm = ({ service, onSubmit, onCancel, loading }) => {
  const [isPreview, setIsPreview] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(CreateServiceSchema),
    defaultValues: service || {
      title: '',
      slug: '',
      summary: '',
      body: '',
      icon_url: '',
      seo_title: '',
      seo_desc: '',
      order_num: 0,
      status: 'draft',
    },
  });

  const watchTitle = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !service) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchTitle, service, setValue]);

  const formData = watch();

  return (
    <div className="card bg-dark border-0 shadow-lg">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white mb-0">
            {service ? 'Edit Service' : 'Create New Service'}
          </h3>
          <button
            type="button"
            className="btn btn-sm"
            style={{ background: 'rgba(106, 71, 237, 0.2)', color: '#C6F806' }}
            onClick={() => setIsPreview(!isPreview)}
          >
            <i className={`bi bi-${isPreview ? 'pencil' : 'eye'} me-2`}></i>
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {!isPreview ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              {/* Title */}
              <div className="col-md-6">
                <label className="form-label text-white">Title *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.title ? 'is-invalid' : ''}`}
                  {...register('title')}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              {/* Slug */}
              <div className="col-md-6">
                <label className="form-label text-white">Slug *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.slug ? 'is-invalid' : ''}`}
                  {...register('slug')}
                />
                {errors.slug && (
                  <div className="invalid-feedback">{errors.slug.message}</div>
                )}
              </div>

              {/* Summary */}
              <div className="col-12">
                <label className="form-label text-white">Summary</label>
                <textarea
                  className={`form-control bg-dark text-white border-secondary ${errors.summary ? 'is-invalid' : ''}`}
                  rows="3"
                  {...register('summary')}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary.message}</div>
                )}
              </div>

              {/* Body */}
              <div className="col-12">
                <label className="form-label text-white">Body Content</label>
                <textarea
                  className={`form-control bg-dark text-white border-secondary ${errors.body ? 'is-invalid' : ''}`}
                  rows="8"
                  {...register('body')}
                />
                {errors.body && (
                  <div className="invalid-feedback">{errors.body.message}</div>
                )}
              </div>

              {/* Icon URL */}
              <div className="col-md-6">
                <label className="form-label text-white">Icon URL</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.icon_url ? 'is-invalid' : ''}`}
                  {...register('icon_url')}
                />
                {errors.icon_url && (
                  <div className="invalid-feedback">{errors.icon_url.message}</div>
                )}
              </div>

              {/* Order */}
              <div className="col-md-6">
                <label className="form-label text-white">Order</label>
                <input
                  type="number"
                  className={`form-control bg-dark text-white border-secondary ${errors.order_num ? 'is-invalid' : ''}`}
                  {...register('order_num', { valueAsNumber: true })}
                />
                {errors.order_num && (
                  <div className="invalid-feedback">{errors.order_num.message}</div>
                )}
              </div>

              {/* SEO Title */}
              <div className="col-md-6">
                <label className="form-label text-white">SEO Title</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.seo_title ? 'is-invalid' : ''}`}
                  {...register('seo_title')}
                />
                {errors.seo_title && (
                  <div className="invalid-feedback">{errors.seo_title.message}</div>
                )}
              </div>

              {/* SEO Description */}
              <div className="col-md-6">
                <label className="form-label text-white">SEO Description</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.seo_desc ? 'is-invalid' : ''}`}
                  {...register('seo_desc')}
                />
                {errors.seo_desc && (
                  <div className="invalid-feedback">{errors.seo_desc.message}</div>
                )}
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label text-white">Status *</label>
                <select
                  className={`form-select bg-dark text-white border-secondary ${errors.status ? 'is-invalid' : ''}`}
                  {...register('status')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status.message}</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 mt-4">
              <button
                type="submit"
                className="btn"
                style={{ background: '#6A47ED', color: 'white' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {service ? 'Update Service' : 'Create Service'}
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="preview-container">
            <div className="p-4 rounded" style={{ background: 'rgba(106, 71, 237, 0.1)' }}>
              <h4 className="text-white mb-3">{formData.title || 'Untitled Service'}</h4>
              <p className="text-white-50 mb-3">{formData.summary || 'No summary provided'}</p>
              <div className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                {formData.body || 'No content provided'}
              </div>
              <div className="mt-4">
                <span className={`badge ${formData.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                  {formData.status}
                </span>
                <span className="text-white-50 ms-3">Order: {formData.order_num}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceForm;
