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
          <label className="form-label text-white">Site Name</label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.site_name ? 'is-invalid' : ''}`}
            placeholder="Devmart Suriname"
            {...register('site_name')}
          />
          {errors.site_name && (
            <div className="invalid-feedback">{errors.site_name.message}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label text-white">Meta Title (Global SEO)</label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.meta_title ? 'is-invalid' : ''}`}
            placeholder="Devmart - Digital Marketing & Web Development"
            {...register('meta_title')}
          />
          {errors.meta_title && (
            <div className="invalid-feedback">{errors.meta_title.message}</div>
          )}
          <small className="text-white-50">Used as default page title for SEO</small>
        </div>

        <div className="col-12">
          <label className="form-label text-white">Meta Description (Global SEO)</label>
          <textarea
            className={`form-control bg-dark text-white border-secondary ${errors.meta_desc ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Leading digital marketing agency in Suriname..."
            {...register('meta_desc')}
          />
          {errors.meta_desc && (
            <div className="invalid-feedback">{errors.meta_desc.message}</div>
          )}
          <small className="text-white-50">Used as default meta description for SEO (max 300 chars)</small>
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
