import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLeadSchema } from '@/lib/schemas/lead';
import { SupabaseLeadRepository } from '@/lib/adapters/supabase/SupabaseLeadRepository';
import { toast } from 'react-hot-toast';
import { trackFormSubmit } from '@/lib/adapters/plausible/PlausibleAdapter';
import { useFormTracking } from '@/lib/hooks/useAnalytics';

const repository = new SupabaseLeadRepository();

const RATE_LIMIT_KEY = 'last_lead_submission';
const RATE_LIMIT_MINUTES = 5;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form tracking hooks
  const { trackFieldFocus, trackFieldBlur, trackSubmit, trackError } = useFormTracking('Contact Form');

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
      const newLead = await repository.create(leadData);

      // Store submission time
      localStorage.setItem(RATE_LIMIT_KEY, new Date().toISOString());

      // Track successful submission
      trackSubmit(true);

      // Send email notification (non-blocking)
      try {
        const response = await fetch(
          'https://ujevbkwzywuuslmsckzh.supabase.co/functions/v1/send-lead-notification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              subject: data.subject,
              message: data.message,
              source: 'contact_form',
              leadId: newLead.id,
            }),
          }
        );

        if (!response.ok) {
          console.warn('Email notification failed, but lead was saved');
        }
      } catch (emailError) {
        // Don't block submission if email fails
        console.warn('Email notification error:', emailError);
      }

      // Show success
      setSuccess(true);
      toast.success('Thank you! We\'ll get back to you soon.');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      toast.error('Failed to submit form. Please try again.');
      
      // Track failed submission
      trackSubmit(false);
      trackError('submission_failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-items">
      {success && (
        <div className="alert alert-success mb-4" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          <strong>Success!</strong> Your message has been sent. We'll contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-clt">
              <label htmlFor="contact-name">Your Name *</label>
              <input
                type="text"
                id="contact-name"
                placeholder="Enter your name"
                {...register('name')}
                className={errors.name ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                onFocus={() => trackFieldFocus('name')}
                onBlur={() => trackFieldBlur('name')}
              />
              {errors.name && (
                <small 
                  id="contact-name-error" 
                  className="text-danger d-block mt-1" 
                  role="alert"
                >
                  {errors.name.message}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-clt">
              <label htmlFor="contact-email">Your Email *</label>
              <input
                type="email"
                id="contact-email"
                placeholder="Enter your email"
                {...register('email')}
                className={errors.email ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onFocus={() => trackFieldFocus('email')}
                onBlur={() => trackFieldBlur('email')}
              />
              {errors.email && (
                <small 
                  id="contact-email-error" 
                  className="text-danger d-block mt-1" 
                  role="alert"
                >
                  {errors.email.message}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-clt">
              <label htmlFor="contact-phone">Phone Number</label>
              <input
                type="tel"
                id="contact-phone"
                placeholder="Enter your phone"
                {...register('phone')}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                onFocus={() => trackFieldFocus('phone')}
                onBlur={() => trackFieldBlur('phone')}
              />
              {errors.phone && (
                <small 
                  id="contact-phone-error" 
                  className="text-danger d-block mt-1" 
                  role="alert"
                >
                  {errors.phone.message}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-clt">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                placeholder="What is this about?"
                {...register('subject')}
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                onFocus={() => trackFieldFocus('subject')}
                onBlur={() => trackFieldBlur('subject')}
              />
              {errors.subject && (
                <small 
                  id="contact-subject-error" 
                  className="text-danger d-block mt-1" 
                  role="alert"
                >
                  {errors.subject.message}
                </small>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="form-clt">
              <label htmlFor="contact-message">Your Message *</label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="Write your message here..."
                {...register('message')}
                className={errors.message ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                onFocus={() => trackFieldFocus('message')}
                onBlur={() => trackFieldBlur('message')}
              />
              {errors.message && (
                <small 
                  id="contact-message-error" 
                  className="text-danger d-block mt-1" 
                  role="alert"
                >
                  {errors.message.message}
                </small>
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
            aria-hidden="true"
          />

          <div className="col-12">
            <button
              type="submit"
              className="theme-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
            <p className="form-note mt-3" style={{ fontSize: '13px', color: '#64748B' }}>
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
