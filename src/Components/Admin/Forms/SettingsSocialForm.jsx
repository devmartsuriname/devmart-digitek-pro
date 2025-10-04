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
          <label htmlFor="settings-facebook" className="form-label text-white">
            <i className="bi bi-facebook me-2" aria-hidden="true"></i>Facebook URL
          </label>
          <input
            type="text"
            id="settings-facebook"
            className={`form-control bg-dark text-white border-secondary ${errors.facebook ? 'is-invalid' : ''}`}
            placeholder="https://facebook.com/yourpage"
            {...register('facebook')}
            aria-invalid={errors.facebook ? 'true' : 'false'}
            aria-describedby={errors.facebook ? 'settings-facebook-error' : undefined}
          />
          {errors.facebook && (
            <div id="settings-facebook-error" className="invalid-feedback" role="alert">
              {errors.facebook.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="settings-twitter" className="form-label text-white">
            <i className="bi bi-twitter me-2" aria-hidden="true"></i>Twitter URL
          </label>
          <input
            type="text"
            id="settings-twitter"
            className={`form-control bg-dark text-white border-secondary ${errors.twitter ? 'is-invalid' : ''}`}
            placeholder="https://twitter.com/yourhandle"
            {...register('twitter')}
            aria-invalid={errors.twitter ? 'true' : 'false'}
            aria-describedby={errors.twitter ? 'settings-twitter-error' : undefined}
          />
          {errors.twitter && (
            <div id="settings-twitter-error" className="invalid-feedback" role="alert">
              {errors.twitter.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="settings-linkedin" className="form-label text-white">
            <i className="bi bi-linkedin me-2" aria-hidden="true"></i>LinkedIn URL
          </label>
          <input
            type="text"
            id="settings-linkedin"
            className={`form-control bg-dark text-white border-secondary ${errors.linkedin ? 'is-invalid' : ''}`}
            placeholder="https://linkedin.com/company/yourcompany"
            {...register('linkedin')}
            aria-invalid={errors.linkedin ? 'true' : 'false'}
            aria-describedby={errors.linkedin ? 'settings-linkedin-error' : undefined}
          />
          {errors.linkedin && (
            <div id="settings-linkedin-error" className="invalid-feedback" role="alert">
              {errors.linkedin.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="settings-instagram" className="form-label text-white">
            <i className="bi bi-instagram me-2" aria-hidden="true"></i>Instagram URL
          </label>
          <input
            type="text"
            id="settings-instagram"
            className={`form-control bg-dark text-white border-secondary ${errors.instagram ? 'is-invalid' : ''}`}
            placeholder="https://instagram.com/yourprofile"
            {...register('instagram')}
            aria-invalid={errors.instagram ? 'true' : 'false'}
            aria-describedby={errors.instagram ? 'settings-instagram-error' : undefined}
          />
          {errors.instagram && (
            <div id="settings-instagram-error" className="invalid-feedback" role="alert">
              {errors.instagram.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="settings-youtube" className="form-label text-white">
            <i className="bi bi-youtube me-2" aria-hidden="true"></i>YouTube URL
          </label>
          <input
            type="text"
            id="settings-youtube"
            className={`form-control bg-dark text-white border-secondary ${errors.youtube ? 'is-invalid' : ''}`}
            placeholder="https://youtube.com/c/yourchannel"
            {...register('youtube')}
            aria-invalid={errors.youtube ? 'true' : 'false'}
            aria-describedby={errors.youtube ? 'settings-youtube-error' : undefined}
          />
          {errors.youtube && (
            <div id="settings-youtube-error" className="invalid-feedback" role="alert">
              {errors.youtube.message}
            </div>
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
