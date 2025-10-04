import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '@/lib/schemas/auth';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SignupForm() {
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    setIsSubmitting(true);

    const { error } = await signUp(data.email, data.password);

    if (error) {
      setIsSubmitting(false);
      if (error.includes('already registered')) {
        setAuthError('This email is already registered. Try logging in.');
      } else {
        setAuthError(error);
      }
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row">
      {authError && (
        <div className="col-lg-12 mb-3">
          <div className="alert alert-danger" role="alert">
            {authError}
          </div>
        </div>
      )}

      <div className="col-lg-12">
        <div className="form-clt">
          <label htmlFor="signup-email" className="visually-hidden">Email Address</label>
          <input
            type="email"
            id="signup-email"
            placeholder="Email Address*"
            {...register('email')}
            className={errors.email ? 'is-invalid' : ''}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'signup-email-error' : undefined}
          />
          {errors.email && (
            <div id="signup-email-error" className="invalid-feedback d-block" role="alert">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <div className="form-clt">
          <label htmlFor="signup-password" className="visually-hidden">Password</label>
          <input
            type="password"
            id="signup-password"
            placeholder="Password*"
            {...register('password')}
            className={errors.password ? 'is-invalid' : ''}
            aria-required="true"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'signup-password-error' : undefined}
          />
          {errors.password && (
            <div id="signup-password-error" className="invalid-feedback d-block" role="alert">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <div className="form-clt">
          <label htmlFor="signup-confirm-password" className="visually-hidden">Confirm Password</label>
          <input
            type="password"
            id="signup-confirm-password"
            placeholder="Confirm Password*"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'is-invalid' : ''}
            aria-required="true"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? 'signup-confirm-password-error' : undefined}
          />
          {errors.confirmPassword && (
            <div id="signup-confirm-password-error" className="invalid-feedback d-block" role="alert">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <button type="submit" className="theme-btn w-100" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
}
