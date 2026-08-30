import { getDeviceId } from "./deviceUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://api.metll.in/api";

const getAuthToken = () => {
    return localStorage.getItem('auth_token');
};

const authFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
};

export const referralApi = {
    /**
     * Get referral stats and rewards
     */
    getStats: async (): Promise<{ success: boolean; data?: { stats: any, rewards: any[] } }> => {
        const response = await authFetch('/referrals/stats');
        return response.json();
    },

    /**
     * Redeem a reward
     */
    redeemReward: async (): Promise<{ success: boolean; message?: string; data?: { reward: any } }> => {
        const response = await authFetch('/referrals/redeem', { method: 'POST' });
        return response.json();
    },

    /**
     * Get referral coffee date tickets for Dates screen
     */
    getReferralTickets: async (): Promise<{ success: boolean; data?: { tickets: any[] } }> => {
        const response = await authFetch('/referrals/tickets');
        return response.json();
    },

    /**
     * Claim a referral ticket with a match
     */
    claimTicket: async (rewardId: number, matchId: number): Promise<{
        success: boolean;
        message?: string;
        data?: { ticket: any }
    }> => {
        const response = await authFetch('/referrals/claim-ticket', {
            method: 'POST',
            body: JSON.stringify({ rewardId, matchId })
        });
        return response.json();
    }
};
