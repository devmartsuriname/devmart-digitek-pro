import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLeadSchema } from '@/lib/schemas/lead';
import { SupabaseLeadRepository } from '@/lib/adapters/supabase/SupabaseLeadRepository';
import { toast } from 'react-hot-toast';

const repository = new SupabaseLeadRepository();

const RATE_LIMIT_KEY = 'last_lead_submission';
const RATE_LIMIT_MINUTES = 5;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const checkRateLimit = () => {
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmission) return true;

    const lastTime = new Date(lastSubmission);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastTime.getTime()) / (1000 * 60);

    if (diffMinutes < RATE_LIMIT_MINUTES) {
      const remaining = Math.ceil(RATE_LIMIT_MINUTES - diffMinutes);
      toast.error(`Please wait ${remaining} minute${remaining > 1 ? 's' : ''} before submitting again`);
      return false;
    }

    return true;
  };

  const onSubmit = async (data) => {
    if (!checkRateLimit()) return;

    setIsSubmitting(true);
    setSuccess(false);

    try {
      // Add source to the data
      const leadData = {
        ...data,
        source: 'contact_form',
      };

      // Create lead in database
      await repository.create(leadData);

      // Store submission time
      localStorage.setItem(RATE_LIMIT_KEY, new Date().toISOString());

      // Show success
      setSuccess(true);
      toast.success('Thank you! We\'ll get back to you soon.');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrap">
      {success && (
        <div className="alert alert-success mb-4" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          <strong>Success!</strong> Your message has been sent. We'll contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-inner">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register('name')}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <small className="text-danger d-block mt-1">{errors.name.message}</small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <small className="text-danger d-block mt-1">{errors.email.message}</small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone"
                {...register('phone')}
              />
              {errors.phone && (
                <small className="text-danger d-block mt-1">{errors.phone.message}</small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="What is this about?"
                {...register('subject')}
              />
              {errors.subject && (
                <small className="text-danger d-block mt-1">{errors.subject.message}</small>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="form-inner">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                rows={6}
                placeholder="Write your message here..."
                {...register('message')}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && (
                <small className="text-danger d-block mt-1">{errors.message.message}</small>
              )}
            </div>
          </div>

          {/* Honeypot field - hidden from users, filled by bots */}
          <input
            type="text"
            {...register('honeypot')}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="col-12">
            <button
              type="submit"
              className="eg-btn btn--primary btn--lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
            <p className="form-note mt-3 text-muted" style={{ fontSize: '13px' }}>
              <i className="bi bi-shield-check me-1"></i>
              We respect your privacy. Your information will only be used to respond to your inquiry.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
