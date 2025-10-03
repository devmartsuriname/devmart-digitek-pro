import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const AnalyticsSchema = z.object({
  plausible_site_id: z.string().optional(),
  google_analytics_id: z.string().optional(),
});

const SettingsAnalyticsForm = ({ settings, onSave, saving }) => {
  const analyticsData = settings?.analytics || {};
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(AnalyticsSchema),
    defaultValues: {
      plausible_site_id: analyticsData.plausible_site_id || '',
      google_analytics_id: analyticsData.google_analytics_id || '',
    },
  });

  useEffect(() => {
    if (settings?.analytics) {
      reset({
        plausible_site_id: analyticsData.plausible_site_id || '',
        google_analytics_id: analyticsData.google_analytics_id || '',
      });
    }
  }, [settings, analyticsData, reset]);

  const onSubmit = (data) => {
    // Convert to JSON object for storage
    const analytics = {};
    Object.keys(data).forEach(key => {
      if (data[key]) analytics[key] = data[key];
    });
    onSave({ analytics });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-4">
        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-graph-up me-2"></i>Plausible Site ID
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.plausible_site_id ? 'is-invalid' : ''}`}
            placeholder="devmart.com"
            {...register('plausible_site_id')}
          />
          {errors.plausible_site_id && (
            <div className="invalid-feedback">{errors.plausible_site_id.message}</div>
          )}
          <small className="text-white-50">Your Plausible Analytics domain/site ID</small>
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-google me-2"></i>Google Analytics ID
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.google_analytics_id ? 'is-invalid' : ''}`}
            placeholder="G-XXXXXXXXXX"
            {...register('google_analytics_id')}
          />
          {errors.google_analytics_id && (
            <div className="invalid-feedback">{errors.google_analytics_id.message}</div>
          )}
          <small className="text-white-50">Google Analytics 4 Measurement ID (optional)</small>
        </div>

        <div className="col-12">
          <div className="alert alert-info bg-dark border-primary text-white">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Note:</strong> Analytics tracking codes will be automatically integrated into the public site once configured.
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ background: '#6A47ED' }}
          >
            {saving ? 'Saving...' : 'Save Analytics Settings'}
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

export default SettingsAnalyticsForm;
