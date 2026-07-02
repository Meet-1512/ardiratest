import { useCallback, useRef } from "react";

const SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  import.meta.env.RECAPTCHA_SITE_KEY ||
  "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  console.info("useRecaptcha: loadRecaptchaScript called. Site Key:", SITE_KEY);

  if (!SITE_KEY) {
    console.warn(
      "useRecaptcha: Site Key is empty! Make sure VITE_RECAPTCHA_SITE_KEY or RECAPTCHA_SITE_KEY is defined in .env and envPrefix is configured in vite.config.ts.",
    );
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.id = "recaptcha-v3-script";

    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve());
      } else {
        reject(new Error("reCAPTCHA script loaded but grecaptcha is unavailable"));
      }
    };

    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error("Failed to load reCAPTCHA script"));
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

export function useRecaptcha() {
  const loadingRef = useRef(false);

  const loadRecaptcha = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      await loadRecaptchaScript();
    } catch (error) {
      loadingRef.current = false;
      throw error;
    }
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      await loadRecaptchaScript();

      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA is not available");
      }

      return window.grecaptcha.execute(SITE_KEY, { action });
    },
    [],
  );

  return { executeRecaptcha, loadRecaptcha };
}
