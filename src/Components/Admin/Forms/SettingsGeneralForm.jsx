import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const GeneralSchema = z.object({
  site_name: z.string().max(200, 'Site name must be less than 200 characters').optional(),
  meta_title: z.string().max(200, 'Meta title must be less than 200 characters').optional(),
  meta_desc: z.string().max(300, 'Meta description must be less than 300 characters').optional(),
});

const SettingsGeneralForm = ({ settings, onSave, saving }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(GeneralSchema),
    defaultValues: {
      site_name: settings?.site_name || '',
      meta_title: settings?.meta_title || '',
      meta_desc: settings?.meta_desc || '',
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        site_name: settings.site_name || '',
        meta_title: settings.meta_title || '',
        meta_desc: settings.meta_desc || '',
      });
    }
  }, [settings, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-4">
        <div className="col-12">
          <label htmlFor="settings-site-name" className="form-label text-white">Site Name</label>
          <input
            type="text"
            id="settings-site-name"
            className={`form-control bg-dark text-white border-secondary ${errors.site_name ? 'is-invalid' : ''}`}
            placeholder="Devmart Suriname"
            {...register('site_name')}
            aria-invalid={errors.site_name ? 'true' : 'false'}
            aria-describedby={errors.site_name ? 'settings-site-name-error' : undefined}
          />
          {errors.site_name && (
            <div id="settings-site-name-error" className="invalid-feedback" role="alert">
              {errors.site_name.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="settings-meta-title" className="form-label text-white">Meta Title (Global SEO)</label>
          <input
            type="text"
            id="settings-meta-title"
            className={`form-control bg-dark text-white border-secondary ${errors.meta_title ? 'is-invalid' : ''}`}
            placeholder="Devmart - Digital Marketing & Web Development"
            {...register('meta_title')}
            aria-invalid={errors.meta_title ? 'true' : 'false'}
            aria-describedby={errors.meta_title ? 'settings-meta-title-error settings-meta-title-hint' : 'settings-meta-title-hint'}
          />
          {errors.meta_title && (
            <div id="settings-meta-title-error" className="invalid-feedback" role="alert">
              {errors.meta_title.message}
            </div>
          )}
          <small id="settings-meta-title-hint" className="text-white-50">Used as default page title for SEO</small>
        </div>

        <div className="col-12">
          <label htmlFor="settings-meta-desc" className="form-label text-white">Meta Description (Global SEO)</label>
          <textarea
            id="settings-meta-desc"
            className={`form-control bg-dark text-white border-secondary ${errors.meta_desc ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Leading digital marketing agency in Suriname..."
            {...register('meta_desc')}
            aria-invalid={errors.meta_desc ? 'true' : 'false'}
            aria-describedby={errors.meta_desc ? 'settings-meta-desc-error settings-meta-desc-hint' : 'settings-meta-desc-hint'}
          />
          {errors.meta_desc && (
            <div id="settings-meta-desc-error" className="invalid-feedback" role="alert">
              {errors.meta_desc.message}
            </div>
          )}
          <small id="settings-meta-desc-hint" className="text-white-50">Used as default meta description for SEO (max 300 chars)</small>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ background: '#6A47ED' }}
          >
            {saving ? 'Saving...' : 'Save General Settings'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => reset()}
            disabled={saving}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default SettingsGeneralForm;
