import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import ColorPicker from './ColorPicker';

const BrandingSchema = z.object({
  logo_url: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  primary_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional().or(z.literal('')),
  theme: z.string().max(50).optional(),
});

const SettingsBrandingForm = ({ settings, onSave, saving }) => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    resolver: zodResolver(BrandingSchema),
    defaultValues: {
      logo_url: settings?.logo_url || '',
      primary_color: settings?.primary_color || '#6A47ED',
      theme: settings?.theme || 'dark',
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        logo_url: settings.logo_url || '',
        primary_color: settings.primary_color || '#6A47ED',
        theme: settings.theme || 'dark',
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
          <label className="form-label text-white">Logo URL</label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.logo_url ? 'is-invalid' : ''}`}
            placeholder="https://example.com/logo.png"
            {...register('logo_url')}
          />
          {errors.logo_url && (
            <div className="invalid-feedback">{errors.logo_url.message}</div>
          )}
          <small className="text-white-50">Upload logo via Media Library and paste URL here</small>
        </div>

        <div className="col-12">
          <label className="form-label text-white">Primary Brand Color</label>
          <Controller
            name="primary_color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                value={field.value}
                onChange={field.onChange}
                error={errors.primary_color?.message}
              />
            )}
          />
          <small className="text-white-50">Main brand color used throughout the site</small>
        </div>

        <div className="col-12">
          <label className="form-label text-white">Theme</label>
          <select
            className={`form-select bg-dark text-white border-secondary ${errors.theme ? 'is-invalid' : ''}`}
            {...register('theme')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
          {errors.theme && (
            <div className="invalid-feedback">{errors.theme.message}</div>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ background: '#6A47ED' }}
          >
            {saving ? 'Saving...' : 'Save Branding Settings'}
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

export default SettingsBrandingForm;
