import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/lib/schemas/auth';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginForm() {
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    setIsSubmitting(true);

    const { error } = await signIn(data.email, data.password);

    if (error) {
      setIsSubmitting(false);
      if (error.includes('Invalid login credentials')) {
        setAuthError('Invalid email or password');
      } else if (error.includes('Email not confirmed')) {
        setAuthError('Please verify your email before logging in');
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
          <input
            type="email"
            placeholder="Email Address*"
            {...register('email')}
            className={errors.email ? 'is-invalid' : ''}
          />
          {errors.email && (
            <div className="invalid-feedback d-block">{errors.email.message}</div>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <div className="form-clt">
          <input
            type="password"
            placeholder="Password*"
            {...register('password')}
            className={errors.password ? 'is-invalid' : ''}
          />
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password.message}</div>
          )}
        </div>
      </div>

      <div className="col-lg-12">
        <button type="submit" className="theme-btn w-100" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </div>
    </form>
  );
}
