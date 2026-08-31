import { API_BASE_URL as API_URL, getAuthHeaders } from "./api-config";

export const chatApi = {
  getChatRoom: async (matchId: number) => {
    const response = await fetch(`${API_URL}/chat/${matchId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getMessages: async (matchId: number, limit = 30, cursor?: number) => {
    let url = `${API_URL}/chat/${matchId}/messages?limit=${limit}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  sendMessage: async (matchId: number, data: { content?: string; type?: string; mediaUrl?: string }) => {
    const response = await fetch(`${API_URL}/chat/${matchId}/messages`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  markMessagesAsRead: async (matchId: number) => {
    const response = await fetch(`${API_URL}/chat/${matchId}/read`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
