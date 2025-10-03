import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const ContactSchema = z.object({
  contact_email: z.string().email('Invalid email').max(255).optional().or(z.literal('')),
  contact_phone: z.string().max(20).optional(),
});

const SettingsContactForm = ({ settings, onSave, saving }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      contact_email: settings?.contact_email || '',
      contact_phone: settings?.contact_phone || '',
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
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
          <label className="form-label text-white">
            <i className="bi bi-envelope me-2"></i>Contact Email
          </label>
          <input
            type="email"
            className={`form-control bg-dark text-white border-secondary ${errors.contact_email ? 'is-invalid' : ''}`}
            placeholder="contact@devmart.com"
            {...register('contact_email')}
          />
          {errors.contact_email && (
            <div className="invalid-feedback">{errors.contact_email.message}</div>
          )}
          <small className="text-white-50">Main contact email displayed on the site</small>
        </div>

        <div className="col-12">
          <label className="form-label text-white">
            <i className="bi bi-telephone me-2"></i>Contact Phone
          </label>
          <input
            type="tel"
            className={`form-control bg-dark text-white border-secondary ${errors.contact_phone ? 'is-invalid' : ''}`}
            placeholder="+597 123 4567"
            {...register('contact_phone')}
          />
          {errors.contact_phone && (
            <div className="invalid-feedback">{errors.contact_phone.message}</div>
          )}
          <small className="text-white-50">Contact phone number displayed on the site</small>
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
