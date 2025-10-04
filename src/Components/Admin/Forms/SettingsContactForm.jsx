import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const ContactSchema = z.object({
  contact_email: z.string().email('Invalid email').max(255).optional().or(z.literal('')),
  contact_phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  google_maps_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const SettingsContactForm = ({ settings, onSave, saving }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      contact_email: settings?.contact_email || '',
      contact_phone: settings?.contact_phone || '',
      address: settings?.address || '',
      google_maps_url: settings?.google_maps_url || '',
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        address: settings.address || '',
        google_maps_url: settings.google_maps_url || '',
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
          <label htmlFor="settings-contact-email" className="form-label text-white">
            <i className="bi bi-envelope me-2" aria-hidden="true"></i>Contact Email
          </label>
          <input
            type="email"
            id="settings-contact-email"
            className={`form-control bg-dark text-white border-secondary ${errors.contact_email ? 'is-invalid' : ''}`}
            placeholder="contact@devmart.com"
            {...register('contact_email')}
            aria-invalid={errors.contact_email ? 'true' : 'false'}
            aria-describedby={errors.contact_email ? 'settings-contact-email-error settings-contact-email-hint' : 'settings-contact-email-hint'}
          />
          {errors.contact_email && (
            <div id="settings-contact-email-error" className="invalid-feedback" role="alert">
              {errors.contact_email.message}
            </div>
          )}
          <small id="settings-contact-email-hint" className="text-white-50">Main contact email displayed on the site</small>
        </div>

        <div className="col-12">
          <label htmlFor="settings-contact-phone" className="form-label text-white">
            <i className="bi bi-telephone me-2" aria-hidden="true"></i>Contact Phone
          </label>
          <input
            type="tel"
            id="settings-contact-phone"
            className={`form-control bg-dark text-white border-secondary ${errors.contact_phone ? 'is-invalid' : ''}`}
            placeholder="+597 123 4567"
            {...register('contact_phone')}
            aria-invalid={errors.contact_phone ? 'true' : 'false'}
            aria-describedby={errors.contact_phone ? 'settings-contact-phone-error settings-contact-phone-hint' : 'settings-contact-phone-hint'}
          />
          {errors.contact_phone && (
            <div id="settings-contact-phone-error" className="invalid-feedback" role="alert">
              {errors.contact_phone.message}
            </div>
          )}
          <small id="settings-contact-phone-hint" className="text-white-50">Contact phone number displayed on the site</small>
        </div>

        <div className="col-12">
          <label htmlFor="settings-address" className="form-label text-white">
            <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>Address
          </label>
          <textarea
            id="settings-address"
            className={`form-control bg-dark text-white border-secondary ${errors.address ? 'is-invalid' : ''}`}
            placeholder="2464 Royal Ln. Mesa, New Jersey 45463"
            rows={3}
            {...register('address')}
            aria-invalid={errors.address ? 'true' : 'false'}
            aria-describedby={errors.address ? 'settings-address-error settings-address-hint' : 'settings-address-hint'}
          />
          {errors.address && (
            <div id="settings-address-error" className="invalid-feedback" role="alert">
              {errors.address.message}
            </div>
          )}
          <small id="settings-address-hint" className="text-white-50">Physical address displayed on the site</small>
        </div>

        <div className="col-12">
          <label htmlFor="settings-google-maps" className="form-label text-white">
            <i className="bi bi-map me-2" aria-hidden="true"></i>Google Maps Embed URL
          </label>
          <input
            type="url"
            id="settings-google-maps"
            className={`form-control bg-dark text-white border-secondary ${errors.google_maps_url ? 'is-invalid' : ''}`}
            placeholder="https://www.google.com/maps/embed?pb=..."
            {...register('google_maps_url')}
            aria-invalid={errors.google_maps_url ? 'true' : 'false'}
            aria-describedby={errors.google_maps_url ? 'settings-google-maps-error settings-google-maps-hint' : 'settings-google-maps-hint'}
          />
          {errors.google_maps_url && (
            <div id="settings-google-maps-error" className="invalid-feedback" role="alert">
              {errors.google_maps_url.message}
            </div>
          )}
          <small id="settings-google-maps-hint" className="text-white-50">
            Get embed URL from Google Maps → Share → Embed a map
          </small>
        </div>

        <div className="col-12">
          <div className="alert alert-info bg-dark border-primary text-white">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Note:</strong> These contact details will be displayed in the footer and contact page.
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ background: '#6A47ED' }}
          >
            {saving ? 'Saving...' : 'Save Contact Settings'}
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

export default SettingsContactForm;
