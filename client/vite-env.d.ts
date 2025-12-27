/// <reference types="vite/client" />

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export {};
