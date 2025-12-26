/**
 * API Configuration
 * Centralized configuration for API base URL
 */

// Use localhost backend server for both dev and production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

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

