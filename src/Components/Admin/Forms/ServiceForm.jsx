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
                <label htmlFor="service-title" className="form-label text-white">Title *</label>
                <input
                  type="text"
                  id="service-title"
                  className={`form-control bg-dark text-white border-secondary ${errors.title ? 'is-invalid' : ''}`}
                  {...register('title')}
                  aria-required="true"
                  aria-invalid={errors.title ? 'true' : 'false'}
                  aria-describedby={errors.title ? 'service-title-error' : undefined}
                />
                {errors.title && (
                  <div id="service-title-error" className="invalid-feedback" role="alert">
                    {errors.title.message}
                  </div>
                )}
              </div>

              {/* Slug */}
              <div className="col-md-6">
                <label htmlFor="service-slug" className="form-label text-white">Slug *</label>
                <input
                  type="text"
                  id="service-slug"
                  className={`form-control bg-dark text-white border-secondary ${errors.slug ? 'is-invalid' : ''}`}
                  {...register('slug')}
                  aria-required="true"
                  aria-invalid={errors.slug ? 'true' : 'false'}
                  aria-describedby={errors.slug ? 'service-slug-error' : undefined}
                />
                {errors.slug && (
                  <div id="service-slug-error" className="invalid-feedback" role="alert">
                    {errors.slug.message}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="col-12">
                <label htmlFor="service-summary" className="form-label text-white">Summary</label>
                <textarea
                  id="service-summary"
                  className={`form-control bg-dark text-white border-secondary ${errors.summary ? 'is-invalid' : ''}`}
                  rows="3"
                  {...register('summary')}
                  aria-invalid={errors.summary ? 'true' : 'false'}
                  aria-describedby={errors.summary ? 'service-summary-error' : undefined}
                />
                {errors.summary && (
                  <div id="service-summary-error" className="invalid-feedback" role="alert">
                    {errors.summary.message}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="col-12">
                <label htmlFor="service-body" className="form-label text-white">Body Content</label>
                <textarea
                  id="service-body"
                  className={`form-control bg-dark text-white border-secondary ${errors.body ? 'is-invalid' : ''}`}
                  rows="8"
                  {...register('body')}
                  aria-invalid={errors.body ? 'true' : 'false'}
                  aria-describedby={errors.body ? 'service-body-error' : undefined}
                />
                {errors.body && (
                  <div id="service-body-error" className="invalid-feedback" role="alert">
                    {errors.body.message}
                  </div>
                )}
              </div>

              {/* Icon URL */}
              <div className="col-md-6">
                <label htmlFor="service-icon-url" className="form-label text-white">Icon URL</label>
                <input
                  type="text"
                  id="service-icon-url"
                  className={`form-control bg-dark text-white border-secondary ${errors.icon_url ? 'is-invalid' : ''}`}
                  {...register('icon_url')}
                  aria-invalid={errors.icon_url ? 'true' : 'false'}
                  aria-describedby={errors.icon_url ? 'service-icon-url-error' : undefined}
                />
                {errors.icon_url && (
                  <div id="service-icon-url-error" className="invalid-feedback" role="alert">
                    {errors.icon_url.message}
                  </div>
                )}
              </div>

              {/* Order */}
              <div className="col-md-6">
                <label htmlFor="service-order" className="form-label text-white">Order</label>
                <input
                  type="number"
                  id="service-order"
                  className={`form-control bg-dark text-white border-secondary ${errors.order_num ? 'is-invalid' : ''}`}
                  {...register('order_num', { valueAsNumber: true })}
                  aria-invalid={errors.order_num ? 'true' : 'false'}
                  aria-describedby={errors.order_num ? 'service-order-error' : undefined}
                />
                {errors.order_num && (
                  <div id="service-order-error" className="invalid-feedback" role="alert">
                    {errors.order_num.message}
                  </div>
                )}
              </div>

              {/* SEO Title */}
              <div className="col-md-6">
                <label htmlFor="service-seo-title" className="form-label text-white">SEO Title</label>
                <input
                  type="text"
                  id="service-seo-title"
                  className={`form-control bg-dark text-white border-secondary ${errors.seo_title ? 'is-invalid' : ''}`}
                  {...register('seo_title')}
                  aria-invalid={errors.seo_title ? 'true' : 'false'}
                  aria-describedby={errors.seo_title ? 'service-seo-title-error' : undefined}
                />
                {errors.seo_title && (
                  <div id="service-seo-title-error" className="invalid-feedback" role="alert">
                    {errors.seo_title.message}
                  </div>
                )}
              </div>

              {/* SEO Description */}
              <div className="col-md-6">
                <label htmlFor="service-seo-desc" className="form-label text-white">SEO Description</label>
                <input
                  type="text"
                  id="service-seo-desc"
                  className={`form-control bg-dark text-white border-secondary ${errors.seo_desc ? 'is-invalid' : ''}`}
                  {...register('seo_desc')}
                  aria-invalid={errors.seo_desc ? 'true' : 'false'}
                  aria-describedby={errors.seo_desc ? 'service-seo-desc-error' : undefined}
                />
                {errors.seo_desc && (
                  <div id="service-seo-desc-error" className="invalid-feedback" role="alert">
                    {errors.seo_desc.message}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label htmlFor="service-status" className="form-label text-white">Status *</label>
                <select
                  id="service-status"
                  className={`form-select bg-dark text-white border-secondary ${errors.status ? 'is-invalid' : ''}`}
                  {...register('status')}
                  aria-required="true"
                  aria-invalid={errors.status ? 'true' : 'false'}
                  aria-describedby={errors.status ? 'service-status-error' : undefined}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                {errors.status && (
                  <div id="service-status-error" className="invalid-feedback" role="alert">
                    {errors.status.message}
                  </div>
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
