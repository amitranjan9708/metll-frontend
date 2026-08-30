export const getDeviceId = async (): Promise<string> => {
  // If we already have one cached in memory or local storage, use it (optional)
  // For highest accuracy against incognito, we always regenerate it.
  try {
    const fpPromise = import('@fingerprintjs/fingerprintjs').then(FingerprintJS => FingerprintJS.load());
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error("Failed to generate fingerprint:", error);
    // Fallback: Check if a UUID exists in localStorage, otherwise create a simple one
    let fallbackId = localStorage.getItem('fallback_device_id');
    if (!fallbackId) {
      fallbackId = 'web_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('fallback_device_id', fallbackId);
    }
    return fallbackId;
  }
};
