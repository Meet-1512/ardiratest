import { useState, useCallback } from 'react';

// Declare grecaptcha on window type to avoid TypeScript errors
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (elementId: string, options: unknown) => void;
      reset: () => void;
      getResponse: () => string;
    };
  }
}

// Get reCAPTCHA Site Key from environment variable (public key, safe to expose)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh";

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecaptcha = useCallback(() => {
    if (isLoaded || document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      if (window.grecaptcha) setIsLoaded(true);
      return;
    }

    // Guard against concurrent injection calls
    if ((window as unknown as { ___recaptcha_injected?: boolean }).___recaptcha_injected) return;
    (window as unknown as { ___recaptcha_injected?: boolean }).___recaptcha_injected = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, [isLoaded]);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!window.grecaptcha) {
      console.warn("reCAPTCHA has not loaded yet");
      return null;
    }
    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    } catch (e) {
      console.error("reCAPTCHA execution failed", e);
      return null;
    }
  };

  return { loadRecaptcha, executeRecaptcha, isLoaded };
};