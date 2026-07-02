import { useCallback, useRef } from "react";

const SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (!SITE_KEY) {
    console.warn(
      "useRecaptcha: Site Key is empty. Define RECAPTCHA_SITE_KEY (or VITE_RECAPTCHA_SITE_KEY) in your .env and ensure vite.config.ts includes the envPrefix.",
    );
  }

  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Not running in a browser"));
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve());
      return;
    }

    const existing = document.getElementById("recaptcha-v3-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.grecaptcha) window.grecaptcha.ready(() => resolve());
        else reject(new Error("reCAPTCHA script loaded but grecaptcha is unavailable"));
      }, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;

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
    } catch (err) {
      loadingRef.current = false;
      throw err;
    }
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      await loadRecaptchaScript();
      if (!window.grecaptcha) throw new Error("reCAPTCHA unavailable");
      return window.grecaptcha.execute(SITE_KEY, { action });
    },
    [],
  );

  return { executeRecaptcha, loadRecaptcha };
}
