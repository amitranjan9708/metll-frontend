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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            matchedUser: { id: "user_4", name: "Sara", isVerified: true, profilePhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop" },
            lastMessage: { content: "Hey! How's your day going?" },
            matchedAt: new Date().toISOString()
          },
          {
            id: 2,
            matchedUser: { id: "user_5", name: "Rahul", isVerified: false, profilePhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop" },
            lastMessage: null,
            matchedAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]);
      }, 600);
    });
  },

  getWhoLikedMe: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "user_6",
            name: "Anjali",
            age: 23,
            profilePhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
            likedAt: new Date().toISOString()
          },
          {
            id: "user_7",
            name: "Kabir",
            age: 25,
            profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
            likedAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      }, 600);
    });
  }
};
