/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Waitlist request type
 */
export interface WaitlistRequest {
  name: string;
  email: string;
  suggestion?: string;
}

/**
 * Waitlist response type
 */
export interface WaitlistResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: number;
    name: string;
    email: string;
  };
}