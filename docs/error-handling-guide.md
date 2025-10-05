# Error Handling Guide – Devmart Digtek Pro

**Version:** 0.18.0  
**Phase:** 3.5 Complete  
**Last Updated:** 2025-01-05

---

## Overview

This document outlines the error handling strategy for Devmart Digtek Pro, including React Error Boundaries, API retry logic, toast notifications, and error pages.

---

## Error Handling Strategy

### 1. React Error Boundaries ✅

**What they catch:**
- JavaScript errors in React components
- Errors in lifecycle methods
- Errors in constructors
- Rendering errors

**What they DON'T catch:**
- Event handlers (use try-catch)
- Asynchronous code (use try-catch)
- Server-side errors
- Errors in Error Boundary itself

**Usage:**

```jsx
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Custom Fallback:**

```jsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

**With Reset Callback:**

```jsx
<ErrorBoundary onReset={() => {
  // Cleanup or reset state
}}>
  <YourComponent />
</ErrorBoundary>
```

---

### 2. API Retry Logic ✅

**Automatic Retry Conditions:**
- Network errors (timeout, connection failed)
- Server errors (500, 502, 503, 504)
- Rate limiting (429)
- Upstream connection errors

**Configuration:**

```javascript
import { withRetry } from '@/lib/utils/apiRetry';

// Default: 3 retries, exponential backoff
const data = await withRetry(
  () => supabase.from('table').select()
);

// Custom configuration
const data = await withRetry(
  () => supabase.from('table').select(),
  {
    maxRetries: 5,
    initialDelay: 2000,
    maxDelay: 15000,
  }
);
```

**Repository Integration:**

```javascript
// In repository methods
async findAll() {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published');
    
    if (error) throw new Error(error.message);
    return data;
  });
}
```

**Fetch Requests:**

```javascript
import { fetchWithRetry } from '@/lib/utils/apiRetry';

const response = await fetchWithRetry(
  'https://api.example.com/data',
  {
    method: 'POST',
    body: JSON.stringify(data),
  }
);
```

---

### 3. Toast Notifications ✅

**Basic Usage:**

```javascript
import { 
  showSuccess, 
  showError, 
  showWarning, 
  showInfo 
} from '@/lib/utils/toastHelpers';

// Success
showSuccess('Data saved successfully!');

// Error
showError('Failed to save data');

// Warning
showWarning('This action cannot be undone');

// Info
showInfo('New update available');
```

**Loading States:**

```javascript
import { showLoading, updateToSuccess, updateToError } from '@/lib/utils/toastHelpers';

const toastId = showLoading('Saving changes...');

try {
  await saveData();
  updateToSuccess(toastId, 'Changes saved!');
} catch (error) {
  updateToError(toastId, 'Failed to save');
}
```

**Promise-Based:**

```javascript
import { showPromise } from '@/lib/utils/toastHelpers';

showPromise(
  saveData(),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save',
  }
);
```

**With Action Button:**

```javascript
import { showWithAction } from '@/lib/utils/toastHelpers';

showWithAction(
  'Changes saved. View history?',
  'View',
  () => {
    navigate('/history');
  }
);
```

**Confirmation:**

```javascript
import { showConfirm } from '@/lib/utils/toastHelpers';

showConfirm(
  'Delete this item?',
  () => {
    // Confirmed
    deleteItem();
  },
  () => {
    // Cancelled
    console.log('Cancelled');
  }
);
```

---

### 4. Error Pages ✅

**404 Not Found:**
- Route: `*` (catch-all)
- Component: `src/Pages/NotFound.jsx`
- Features: Back to home, search, sitemap links

**500 Server Error:**
- Route: Error element in router
- Component: `src/Pages/Error500.jsx`
- Features: Reload, back to home, contact support, error ID

**Error Boundary Fallback:**
- Component: `src/components/ErrorBoundary/ErrorFallback.jsx`
- Features: Try again, go home, contact support, dev error details

---

## Best Practices

### 1. Component-Level Error Handling

```jsx
const MyComponent = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await someAsyncAction();
      
      showSuccess('Action completed!');
    } catch (err) {
      const message = err.message || 'Unknown error';
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};
```

### 2. Form Error Handling

```jsx
import { useForm } from 'react-hook-form';
import { showError, showSuccess } from '@/lib/utils/toastHelpers';

const MyForm = () => {
  const { handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitData(data);
      showSuccess('Form submitted successfully!');
    } catch (error) {
      showError(error.message || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      {errors.email && (
        <span className="text-danger" role="alert">
          {errors.email.message}
        </span>
      )}
    </form>
  );
};
```

### 3. API Error Handling in Repositories

```javascript
// SupabaseProjectRepository.ts
import { withRetry } from '@/lib/utils/apiRetry';

class SupabaseProjectRepository {
  async findAll() {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*');
        
        if (error) {
          throw new Error(`Failed to fetch projects: ${error.message}`);
        }
        
        if (!data) {
          return [];
        }
        
        return data;
      });
    } catch (error) {
      console.error('Repository error:', error);
      throw error; // Re-throw for component handling
    }
  }
}
```

### 4. Network Error Detection

```javascript
const isNetworkError = (error) => {
  return (
    error.message.includes('network') ||
    error.message.includes('fetch') ||
    error.message.includes('timeout') ||
    !navigator.onLine
  );
};

if (isNetworkError(error)) {
  showWarning('Network connection issue. Please check your internet.');
} else {
  showError('An error occurred. Please try again.');
}
```

---

## Error Logging

### Development Mode

```javascript
// Error Boundary logs to console
console.error('Error Boundary caught:', error, errorInfo);

// Repository errors
console.error('Repository error:', error.message, error.stack);
```

### Production Mode (Future)

```javascript
// Send to error tracking service (Sentry, LogRocket, etc.)
window.Sentry?.captureException(error, {
  extra: {
    componentStack: errorInfo.componentStack,
    userId: user?.id,
    timestamp: new Date().toISOString(),
  },
});
```

---

## Testing Error Scenarios

### 1. Trigger Error Boundary

```jsx
// Test component that throws error
const ErrorTest = () => {
  throw new Error('Test error');
  return <div>Never rendered</div>;
};

// Wrap in Error Boundary
<ErrorBoundary>
  <ErrorTest />
</ErrorBoundary>
```

### 2. Test Retry Logic

```javascript
// Simulate network error
const mockFailThenSucceed = (() => {
  let attempts = 0;
  return async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error('Network timeout');
    }
    return { success: true };
  };
})();

await withRetry(mockFailThenSucceed);
// Should succeed after 3 attempts
```

### 3. Test Toast Notifications

```javascript
// Test all toast types
showSuccess('Success message');
showError('Error message');
showWarning('Warning message');
showInfo('Info message');

// Test promise-based
showPromise(
  new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.5 ? resolve() : reject(), 2000);
  }),
  {
    loading: 'Processing...',
    success: 'Done!',
    error: 'Failed!',
  }
);
```

---

## Common Error Messages

### User-Friendly Messages

❌ **Bad:**
```javascript
showError('Error: undefined is not a function');
```

✅ **Good:**
```javascript
showError('Unable to save changes. Please try again.');
```

### Specific vs Generic

❌ **Too Generic:**
```javascript
showError('An error occurred');
```

✅ **Specific:**
```javascript
showError('Failed to upload image. File size must be under 5MB.');
```

---

## Error Monitoring Checklist

- [ ] All async operations wrapped in try-catch
- [ ] Repository methods use retry logic
- [ ] Forms show validation errors
- [ ] Loading states implemented
- [ ] Error boundaries around major sections
- [ ] Toast notifications for user actions
- [ ] Error pages styled and tested
- [ ] Error IDs generated for support
- [ ] Console errors fixed (no red in console)
- [ ] Network errors handled gracefully

---

## Resources

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Error Handling Best Practices](https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react)
- [Retry Strategies](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#retry)

---

**Status:** ✅ Phase 3.5 Complete  
**Next:** Phase 4 - Content Seeding & Production Testing
