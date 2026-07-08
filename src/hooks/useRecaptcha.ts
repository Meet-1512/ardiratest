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

// Use environment variable for reCAPTCHA site key
// This uses RECAPTCHA_SITE_KEY (no VITE_ prefix) as configured in vite.config.ts,
// consistent with the shared "Ardira-Websites" edge function naming across all sites.
const RECAPTCHA_SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || "";

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecaptcha = useCallback(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key is not configured. Set RECAPTCHA_SITE_KEY in your environment.");
      return;
    }

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
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key is not configured");
      return null;
    }
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