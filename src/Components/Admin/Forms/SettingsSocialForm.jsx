import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const SocialSchema = z.object({
  facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
  youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const SettingsSocialForm = ({ settings, onSave, saving }) => {
  const socialData = settings?.social || {};
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(SocialSchema),
    defaultValues: {
      facebook: socialData.facebook || '',
      twitter: socialData.twitter || '',
      linkedin: socialData.linkedin || '',
      instagram: socialData.instagram || '',
      youtube: socialData.youtube || '',
    },
  });

  useEffect(() => {
    if (settings?.social) {
      reset({
        facebook: socialData.facebook || '',
        twitter: socialData.twitter || '',
        linkedin: socialData.linkedin || '',
        instagram: socialData.instagram || '',
        youtube: socialData.youtube || '',
      });
    }
  }, [settings, socialData, reset]);

  const onSubmit = (data) => {
    // Convert to JSON object for storage
    const social = {};
    Object.keys(data).forEach(key => {
      if (data[key]) social[key] = data[key];
    });
    onSave({ social });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-4">
        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-facebook me-2"></i>Facebook URL
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.facebook ? 'is-invalid' : ''}`}
            placeholder="https://facebook.com/yourpage"
            {...register('facebook')}
          />
          {errors.facebook && (
            <div className="invalid-feedback">{errors.facebook.message}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-twitter me-2"></i>Twitter URL
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.twitter ? 'is-invalid' : ''}`}
            placeholder="https://twitter.com/yourhandle"
            {...register('twitter')}
          />
          {errors.twitter && (
            <div className="invalid-feedback">{errors.twitter.message}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-linkedin me-2"></i>LinkedIn URL
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.linkedin ? 'is-invalid' : ''}`}
            placeholder="https://linkedin.com/company/yourcompany"
            {...register('linkedin')}
          />
          {errors.linkedin && (
            <div className="invalid-feedback">{errors.linkedin.message}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-instagram me-2"></i>Instagram URL
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.instagram ? 'is-invalid' : ''}`}
            placeholder="https://instagram.com/yourprofile"
            {...register('instagram')}
          />
          {errors.instagram && (
            <div className="invalid-feedback">{errors.instagram.message}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-youtube me-2"></i>YouTube URL
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.youtube ? 'is-invalid' : ''}`}
            placeholder="https://youtube.com/c/yourchannel"
            {...register('youtube')}
          />
          {errors.youtube && (
            <div className="invalid-feedback">{errors.youtube.message}</div>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ background: '#6A47ED' }}
          >
            {saving ? 'Saving...' : 'Save Social Media Settings'}
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

export default SettingsSocialForm;
