import { API_BASE_URL } from "./api-config";

// Mock profiles for development
const MOCK_PROFILES = [
  {
    id: "user_1",
    name: "Priya",
    age: 22,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    bio: "Coffee addict & weekend hiker. Let's debate which pizza topping is best.",
    distance: 2,
    school: { name: "Delhi University" }
  },
  {
    id: "user_2",
    name: "Rohan",
    age: 24,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    bio: "Software Engineer by day, aspiring chef by night.",
    distance: 5,
    office: { name: "Google" }
  },
  {
    id: "user_3",
    name: "Aisha",
    age: 23,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    bio: "Art student. I probably like your dog more than you.",
    distance: 1,
    college: { name: "NIFT Delhi" }
  },
];

export const swipeApi = {
  getProfiles: async (filters: any = {}) => {
    // In a real scenario, this would fetch from the backend
    // const token = localStorage.getItem("authToken");
    // const response = await fetch(`${API_BASE_URL}/swipe/profiles`, { ... });
    // return response.json();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PROFILES);
      }, 800);
    });
  },

  swipe: async (targetUserId: string, direction: 'like' | 'pass') => {
    // Mock the swipe action
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, isMatch: false });
      }, 400);
    });
  },

  getMatches: async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/swipe/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  },

  getWhoLikedMe: async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/swipe/likes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  }
};
