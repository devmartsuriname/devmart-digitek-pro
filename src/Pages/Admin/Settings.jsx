import { useState } from 'react';
import { useSettings } from '@/lib/hooks/useSettings';
import SettingsGeneralForm from '@/Components/Admin/Forms/SettingsGeneralForm';
import SettingsBrandingForm from '@/Components/Admin/Forms/SettingsBrandingForm';
import SettingsSocialForm from '@/Components/Admin/Forms/SettingsSocialForm';
import SettingsAnalyticsForm from '@/Components/Admin/Forms/SettingsAnalyticsForm';
import SettingsContactForm from '@/Components/Admin/Forms/SettingsContactForm';

const Settings = () => {
  const { settings, loading, saving, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('general');

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-3">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-white mb-1">
                <i className="bi bi-gear-fill me-2" style={{ color: '#6A47ED' }}></i>
                Site Settings
              </h2>
              {settings?.updated_at && (
                <small className="text-white-50">
                  Last updated: {new Date(settings.updated_at).toLocaleString()}
                </small>
              )}
            </div>
          </div>

          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-header bg-dark border-bottom border-secondary">
              <ul className="nav nav-tabs card-header-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                    type="button"
                  >
                    <i className="bi bi-info-circle me-2"></i>General
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'branding' ? 'active' : ''}`}
                    onClick={() => setActiveTab('branding')}
                    type="button"
                  >
                    <i className="bi bi-palette me-2"></i>Branding
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'social' ? 'active' : ''}`}
                    onClick={() => setActiveTab('social')}
                    type="button"
                  >
                    <i className="bi bi-share me-2"></i>Social Media
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                    type="button"
                  >
                    <i className="bi bi-graph-up me-2"></i>Analytics
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                    type="button"
                  >
                    <i className="bi bi-telephone me-2"></i>Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body p-4">
              <div className="tab-content">
                {activeTab === 'general' && (
                  <div className="tab-pane fade show active">
                    <SettingsGeneralForm
                      settings={settings}
                      onSave={updateSettings}
                      saving={saving}
                    />
                  </div>
                )}

                {activeTab === 'branding' && (
                  <div className="tab-pane fade show active">
                    <SettingsBrandingForm
                      settings={settings}
                      onSave={updateSettings}
                      saving={saving}
                    />
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="tab-pane fade show active">
                    <SettingsSocialForm
                      settings={settings}
                      onSave={updateSettings}
                      saving={saving}
                    />
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="tab-pane fade show active">
                    <SettingsAnalyticsForm
                      settings={settings}
                      onSave={updateSettings}
                      saving={saving}
                    />
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="tab-pane fade show active">
                    <SettingsContactForm
                      settings={settings}
                      onSave={updateSettings}
                      saving={saving}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
