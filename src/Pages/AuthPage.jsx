import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCumb from '../Components/Common/BreadCumb';
import LoginForm from '../Components/Auth/LoginForm';
import SignupForm from '../Components/Auth/SignupForm';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate('/admin/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="cs_height_219 cs_height_lg_120 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadCumb Title="Authentication" />
      <section className="contact-section section-padding">
        <div className="container">
          <div className="section-title-area text-center">
            <div className="section-title">
              <h6 className="wow fadeInUp" data-wow-delay=".3s">
                <i className="bi bi-shield-lock"></i> Secure Access
              </h6>
              <h2 className="text-white mt-3 wow fadeInUp" data-wow-delay=".5s">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white mt-3 wow fadeInUp" data-wow-delay=".7s">
                {activeTab === 'login'
                  ? 'Sign in to access your admin dashboard'
                  : 'Create an account to get started'}
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="contact-wrapper wow fadeInUp" data-wow-delay=".9s">
                <div className="contact-form-area">
                  {/* Tab Buttons */}
                  <div className="d-flex gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className={`theme-btn flex-fill ${
                        activeTab === 'login' ? '' : 'btn-outline-light'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className={`theme-btn flex-fill ${
                        activeTab === 'signup' ? '' : 'btn-outline-light'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Form Content */}
                  {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
