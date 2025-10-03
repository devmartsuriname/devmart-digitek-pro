import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTeamMemberSchema } from '@/lib/schemas/team';

const TeamForm = ({ teamMember, onSubmit, onCancel, loading }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [socialFields, setSocialFields] = useState([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(CreateTeamMemberSchema),
    defaultValues: teamMember || {
      name: '',
      slug: '',
      role: '',
      bio: '',
      photo_url: '',
      socials: {},
      order_num: 0,
    },
  });

  const watchName = watch('name');
  const watchPhotoUrl = watch('photo_url');

  // Initialize social fields from existing data
  useEffect(() => {
    if (teamMember?.socials) {
      const fields = Object.entries(teamMember.socials).map(([platform, url]) => ({
        id: Math.random().toString(),
        platform,
        url,
      }));
      setSocialFields(fields);
    }
  }, [teamMember]);

  // Auto-generate slug from name
  useEffect(() => {
    if (watchName && !teamMember) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchName, teamMember, setValue]);

  const addSocialField = () => {
    setSocialFields([...socialFields, { id: Math.random().toString(), platform: '', url: '' }]);
  };

  const removeSocialField = (id) => {
    setSocialFields(socialFields.filter((field) => field.id !== id));
  };

  const updateSocialField = (id, key, value) => {
    setSocialFields(
      socialFields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const onFormSubmit = (data) => {
    // Convert social fields array to object
    const socials = {};
    socialFields.forEach((field) => {
      if (field.platform && field.url) {
        socials[field.platform] = field.url;
      }
    });

    onSubmit({ ...data, socials: Object.keys(socials).length > 0 ? socials : undefined });
  };

  const formData = watch();

  return (
    <div className="card bg-dark border-0 shadow-lg">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white mb-0">
            {teamMember ? 'Edit Team Member' : 'Create New Team Member'}
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
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label text-white">Name *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.name ? 'is-invalid' : ''}`}
                  {...register('name')}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
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

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label text-white">Role</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.role ? 'is-invalid' : ''}`}
                  placeholder="e.g., CEO, Developer, Designer"
                  {...register('role')}
                />
                {errors.role && (
                  <div className="invalid-feedback">{errors.role.message}</div>
                )}
              </div>

              {/* Order */}
              <div className="col-md-6">
                <label className="form-label text-white">Display Order</label>
                <input
                  type="number"
                  className={`form-control bg-dark text-white border-secondary ${errors.order_num ? 'is-invalid' : ''}`}
                  {...register('order_num', { valueAsNumber: true })}
                />
                {errors.order_num && (
                  <div className="invalid-feedback">{errors.order_num.message}</div>
                )}
              </div>

              {/* Photo URL */}
              <div className="col-12">
                <label className="form-label text-white">Photo URL</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.photo_url ? 'is-invalid' : ''}`}
                  placeholder="https://example.com/photo.jpg"
                  {...register('photo_url')}
                />
                {errors.photo_url && (
                  <div className="invalid-feedback">{errors.photo_url.message}</div>
                )}
                {watchPhotoUrl && (
                  <div className="mt-2">
                    <img
                      src={watchPhotoUrl}
                      alt="Preview"
                      className="rounded"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="col-12">
                <label className="form-label text-white">Bio</label>
                <textarea
                  className={`form-control bg-dark text-white border-secondary ${errors.bio ? 'is-invalid' : ''}`}
                  rows="4"
                  placeholder="Brief biography or description"
                  {...register('bio')}
                />
                {errors.bio && (
                  <div className="invalid-feedback">{errors.bio.message}</div>
                )}
              </div>

              {/* Social Links */}
              <div className="col-12">
                <label className="form-label text-white">Social Links</label>
                <div className="d-flex flex-column gap-2">
                  {socialFields.map((field) => (
                    <div key={field.id} className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Platform (e.g., facebook, twitter, linkedin)"
                        value={field.platform}
                        onChange={(e) => updateSocialField(field.id, 'platform', e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="URL"
                        value={field.url}
                        onChange={(e) => updateSocialField(field.id, 'url', e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeSocialField(field.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={addSocialField}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Social Link
                  </button>
                </div>
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
                    {teamMember ? 'Update Member' : 'Create Member'}
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
              <div className="d-flex align-items-start gap-4">
                {watchPhotoUrl && (
                  <img
                    src={watchPhotoUrl}
                    alt={formData.name}
                    className="rounded-circle"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                )}
                <div className="flex-grow-1">
                  <h4 className="text-white mb-2">{formData.name || 'Unnamed Member'}</h4>
                  <p className="text-white-50 mb-3">{formData.role || 'No role specified'}</p>
                  <p className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                    {formData.bio || 'No bio provided'}
                  </p>
                  {socialFields.length > 0 && (
                    <div className="mt-3">
                      <h6 className="text-white-50">Social Links:</h6>
                      <div className="d-flex gap-2">
                        {socialFields.map((field) => (
                          field.platform && field.url && (
                            <a
                              key={field.id}
                              href={field.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm"
                              style={{ background: 'rgba(106, 71, 237, 0.2)', color: '#C6F806' }}
                            >
                              {field.platform}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-3">
                    <span className="text-white-50">Display Order: {formData.order_num}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamForm;
