import { API_BASE_URL } from "./api-config";

export interface PotentialMatchUser {
    id: string;
    name: string;
    profilePhoto?: string;
    institution?: string;
    department?: string;
    matchConfidence: number;
    matchMethod: 'name' | 'phonetic' | 'social' | 'location';
}

export interface SearchMatchesResponse {
    count: number;
    potentialMatches: PotentialMatchUser[];
}

export interface CreateConfessionRequest {
    crushFirstName: string;
    institutionType: 'school' | 'college' | 'office' | 'social';
    institutionName?: string;
    socialPlatform?: string;
    socialUsername?: string;
    className?: string;
    department?: string;
    city?: string;
    state?: string;
    country?: string;
    targetUserId?: string;
    matchConfidence?: number;
    matchMethod?: string;
}

export const confessionApi = {
    searchPotentialMatches: async (searchParams: any): Promise<{ success: boolean; message?: string; data?: SearchMatchesResponse }> => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`${API_BASE_URL}/confessions/search-matches`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(searchParams),
            });
            return await response.json();
        } catch (error) {
            console.error("Search potential matches error:", error);
            return { success: false, message: "Failed to search for matches" };
        }
    },

    createConfession: async (confession: CreateConfessionRequest): Promise<{ success: boolean; message?: string; data?: any }> => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`${API_BASE_URL}/confessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(confession),
            });
            return await response.json();
        } catch (error) {
            console.error("Create confession error:", error);
            return { success: false, message: "Failed to create confession" };
        }
    }
};
