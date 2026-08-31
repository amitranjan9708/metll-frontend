const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAuthToken = () => {
    return localStorage.getItem('authToken');
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

export interface MagnetWallet {
    coinBalance: number;
    totalCoinsEarned: number;
    balanceRupees: number;
    upiId: string | null;
    coinsPerReferral: number;
    coinToRupee: number;
    minWithdrawalCoins: number;
}

export const walletApi = {
    /**
     * Get Magnet coin wallet — balance, transactions, withdrawals
     */
    getWallet: async (): Promise<{
        success: boolean;
        data?: { wallet: MagnetWallet; transactions: any[]; withdrawals: any[] };
    }> => {
        const response = await authFetch('/wallet');
        return response.json();
    },

    /**
     * Request a withdrawal of Magnets
     */
    withdraw: async (upiId: string, amount: number): Promise<{ success: boolean; message?: string }> => {
        const response = await authFetch('/wallet/withdraw', {
            method: 'POST',
            body: JSON.stringify({ upiId, amount })
        });
        return response.json();
    },
};
