/**
 * Toast Notification Helpers
 * Enhanced toast utilities with custom styles and actions
 */

import toast from 'react-hot-toast';

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {object} options - Toast options
 */
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 4000,
    icon: '✅',
    ...options,
  });
};

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {object} options - Toast options
 */
export const showError = (message, options = {}) => {
  return toast.error(message, {
    duration: 5000,
    icon: '❌',
    ...options,
  });
};

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {object} options - Toast options
 */
export const showWarning = (message, options = {}) => {
  return toast(message, {
    duration: 4500,
    icon: '⚠️',
    style: {
      background: '#f59e0b',
      color: '#fff',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
    ...options,
  });
};

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {object} options - Toast options
 */
export const showInfo = (message, options = {}) => {
  return toast(message, {
    duration: 4000,
    icon: 'ℹ️',
    style: {
      background: '#3b82f6',
      color: '#fff',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
    ...options,
  });
};

/**
 * Show loading toast
 * @param {string} message - Loading message
 * @param {object} options - Toast options
 * @returns {string} - Toast ID for updating
 */
export const showLoading = (message, options = {}) => {
  return toast.loading(message, {
    duration: Infinity,
    ...options,
  });
};

/**
 * Update loading toast to success
 * @param {string} toastId - Toast ID from showLoading
 * @param {string} message - Success message
 */
export const updateToSuccess = (toastId, message) => {
  toast.success(message, { id: toastId });
};

/**
 * Update loading toast to error
 * @param {string} toastId - Toast ID from showLoading
 * @param {string} message - Error message
 */
export const updateToError = (toastId, message) => {
  toast.error(message, { id: toastId });
};

/**
 * Show toast with action button
 * @param {string} message - Message
 * @param {string} actionLabel - Button label
 * @param {function} onAction - Action callback
 * @param {object} options - Toast options
 */
export const showWithAction = (message, actionLabel, onAction, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`toast-with-action ${t.visible ? 'toast-enter' : 'toast-exit'}`}
        style={{
          background: '#17012C',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid rgba(106, 71, 237, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          minWidth: '300px',
        }}
      >
        <span>{message}</span>
        <button
          onClick={() => {
            onAction();
            toast.dismiss(t.id);
          }}
          style={{
            background: '#6A47ED',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {actionLabel}
        </button>
      </div>
    ),
    {
      duration: 6000,
      ...options,
    }
  );
};

/**
 * Show confirmation toast
 * @param {string} message - Confirmation message
 * @param {function} onConfirm - Confirm callback
 * @param {function} onCancel - Cancel callback
 * @param {object} options - Toast options
 */
export const showConfirm = (message, onConfirm, onCancel, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`toast-confirm ${t.visible ? 'toast-enter' : 'toast-exit'}`}
        style={{
          background: '#17012C',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid rgba(106, 71, 237, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          minWidth: '320px',
        }}
      >
        <p style={{ marginBottom: '12px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              onCancel?.();
              toast.dismiss(t.id);
            }}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
            }}
            style={{
              background: '#6A47ED',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      ...options,
    }
  );
};

/**
 * Show promise toast (automatically handles loading/success/error)
 * @param {Promise} promise - Promise to track
 * @param {object} messages - { loading, success, error }
 * @param {object} options - Toast options
 */
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: (err) => messages.error || err.message || 'Failed',
    },
    options
  );
};

/**
 * Dismiss all toasts
 */
export const dismissAll = () => {
  toast.dismiss();
};

/**
 * Dismiss specific toast
 * @param {string} toastId - Toast ID
 */
export const dismiss = (toastId) => {
  toast.dismiss(toastId);
};
