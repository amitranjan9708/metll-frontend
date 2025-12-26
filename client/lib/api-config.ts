/**
 * API Configuration
 * Centralized configuration for API base URL
 */

// Determine API base URL based on environment
// - Development: Use localhost backend
// - Production: Use Render backend
// - Can be overridden with VITE_API_BASE_URL environment variable
const getDefaultApiUrl = () => {
  // Check if explicitly set via environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Use production backend in production mode, localhost in development
  if (import.meta.env.PROD) {
    return "https://metll-backend.onrender.com";
  }
  
  // Development mode - use localhost
  return "http://localhost:3001";
};

export const API_BASE_URL = getDefaultApiUrl();

// Log API URL for debugging (both environments)
console.log(`🔗 API Base URL: ${API_BASE_URL}`);
console.log(`🌍 Mode: ${import.meta.env.PROD ? "PRODUCTION" : "DEVELOPMENT"}`);

/**
 * Get the full API URL for an endpoint
 * @param endpoint - API endpoint path (e.g., "/api/waitlist")
 * @returns Full URL to the API endpoint
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // If endpoint already includes the full URL, return as is
  if (cleanEndpoint.startsWith("http://") || cleanEndpoint.startsWith("https://")) {
    return cleanEndpoint;
  }
  
  // Combine base URL with endpoint
  return `${API_BASE_URL}${cleanEndpoint}`;
}

