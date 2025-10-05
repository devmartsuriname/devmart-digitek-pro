/**
 * API Retry Logic
 * Utilities for retrying failed API calls with exponential backoff
 */

/**
 * Retry a function with exponential backoff
 * @param {function} fn - Async function to retry
 * @param {object} options - Retry options
 * @returns {Promise} - Result of the function
 */
export const retryWithBackoff = async (
  fn,
  {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    shouldRetry = () => true,
    onRetry = () => {},
  } = {}
) => {
  let lastError;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry this error
      if (!shouldRetry(error) || attempt === maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const currentDelay = Math.min(delay, maxDelay);
      
      // Notify about retry
      onRetry(attempt + 1, currentDelay, error);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, currentDelay));

      // Increase delay for next attempt
      delay *= backoffFactor;
    }
  }

  throw lastError;
};

/**
 * Determine if an error is retryable
 * @param {Error} error - Error to check
 * @returns {boolean}
 */
export const isRetryableError = (error) => {
  // Network errors
  if (error.message?.includes('network') || 
      error.message?.includes('timeout') ||
      error.message?.includes('fetch failed')) {
    return true;
  }

  // Rate limiting
  if (error.message?.includes('rate limit') ||
      error.message?.includes('429')) {
    return true;
  }

  // Server errors (5xx)
  if (error.message?.includes('500') ||
      error.message?.includes('502') ||
      error.message?.includes('503') ||
      error.message?.includes('504')) {
    return true;
  }

  // Connection errors
  if (error.message?.includes('connection') ||
      error.message?.includes('upstream')) {
    return true;
  }

  return false;
};

/**
 * Wrap a Supabase query with retry logic
 * @param {function} queryFn - Supabase query function
 * @param {object} options - Retry options
 * @returns {Promise} - Query result
 */
export const withRetry = async (queryFn, options = {}) => {
  return retryWithBackoff(
    async () => {
      const { data, error } = await queryFn();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    {
      shouldRetry: isRetryableError,
      onRetry: (attempt, delay, error) => {
        console.warn(
          `Retry attempt ${attempt} after ${delay}ms due to:`,
          error.message
        );
      },
      ...options,
    }
  );
};

/**
 * Wrap a fetch request with retry logic
 * @param {string} url - URL to fetch
 * @param {object} fetchOptions - Fetch options
 * @param {object} retryOptions - Retry options
 * @returns {Promise<Response>}
 */
export const fetchWithRetry = async (url, fetchOptions = {}, retryOptions = {}) => {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: AbortSignal.timeout(30000), // 30s timeout
      });

      // Throw on HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    },
    {
      shouldRetry: (error) => {
        // Retry on network errors or 5xx server errors
        return (
          isRetryableError(error) ||
          error.message?.includes('AbortError')
        );
      },
      onRetry: (attempt, delay, error) => {
        console.warn(
          `Fetch retry attempt ${attempt} for ${url} after ${delay}ms:`,
          error.message
        );
      },
      ...retryOptions,
    }
  );
};

/**
 * Create a retry decorator for repository methods
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {function} - Decorator function
 */
export const withRetryDecorator = (maxRetries = 3) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      return retryWithBackoff(
        () => originalMethod.apply(this, args),
        {
          maxRetries,
          shouldRetry: isRetryableError,
          onRetry: (attempt, delay, error) => {
            console.warn(
              `Retry ${propertyKey} attempt ${attempt} after ${delay}ms:`,
              error.message
            );
          },
        }
      );
    };

    return descriptor;
  };
};

/**
 * Queue for managing concurrent retries
 */
class RetryQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(fn) {
    if (this.running >= this.concurrency) {
      await new Promise(resolve => this.queue.push(resolve));
    }

    this.running++;

    try {
      return await fn();
    } finally {
      this.running--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

export const retryQueue = new RetryQueue(3);

/**
 * Batch retry multiple requests
 * @param {array} requests - Array of request functions
 * @param {object} options - Retry options
 * @returns {Promise<array>} - Results array
 */
export const batchRetry = async (requests, options = {}) => {
  return Promise.all(
    requests.map(request =>
      retryQueue.add(() =>
        retryWithBackoff(request, options)
      )
    )
  );
};
