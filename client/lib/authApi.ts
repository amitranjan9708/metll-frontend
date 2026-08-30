import { API_BASE_URL } from "./api-config";
import { getDeviceId } from "./deviceUtils";

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: any;
    token: string;
  };
}

export const authApi = {
  sendOtp: async (email: string, phoneNumber?: string, referralCode?: string, authType?: 'login' | 'signup'): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phoneNumber, referralCode, authType }),
    });
    return response.json();
  },

  verifyOtp: async (email: string, otp: string): Promise<AuthResponse> => {
    const androidId = await getDeviceId();
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, androidId }),
    });
    return response.json();
  },

  googleLogin: async (idToken: string, referralCode?: string, authType?: 'login' | 'signup'): Promise<AuthResponse> => {
    const androidId = await getDeviceId();
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, referralCode, authType, androidId }),
    });
    return response.json();
  },

  validateSession: async (token: string): Promise<{ valid: boolean; user?: any; message?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 401) {
        return { valid: false, message: data.message };
      }
      return { valid: true, user: data.data?.user };
    } catch (error: any) {
      return { valid: true, message: `Network error: ${error.message}` };
    }
  },

  uploadVerificationVideo: async (videoFile: File): Promise<any> => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await fetch(`${API_BASE_URL}/verification/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  },
};
