import { API_BASE_URL } from "./api-config";

export const configApi = {
  getConfigs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/config`);
      if (response.ok) {
        return await response.json();
      }
      return { success: false, data: {} };
    } catch (error) {
      console.error('Config API Error:', error);
      return { success: false, data: {} };
    }
  }
};

export enum AppConfigKey {
  SHOW_EARLY_AMBASSADOR_CTA = 'SHOW_EARLY_AMBASSADOR_CTA',
  WHITELISTED_COLLEGES = 'WHITELISTED_COLLEGES',
  HIDDEN_ONBOARDING_STEPS = 'HIDDEN_ONBOARDING_STEPS',
}
