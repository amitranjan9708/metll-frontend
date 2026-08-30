import { API_BASE_URL } from "./api-config";

export const userApi = {
  updateProfile: async (data: any) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  uploadProfilePicture: async (file: File) => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(`${API_BASE_URL}/verification/photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Do not set Content-Type here, let the browser set it with the correct boundary
      },
      body: formData,
    });
    return response.json();
  },

  uploadPhotos: async (files: File[]) => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetch(`${API_BASE_URL}/user/photos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  },
};
