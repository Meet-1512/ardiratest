import { useCallback, useRef } from "react";

const SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

/** Singleton promise so we only ever inject one <script> tag. */
let scriptLoadPromise: Promise<void> | null = null;

/**
 * Dynamically injects the reCAPTCHA v3 script tag into the document head.
 * Returns a promise that resolves once `grecaptcha.ready()` fires.
 * Subsequent calls return the same promise (idempotent).
 */
function loadRecaptchaScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    // If grecaptcha is already available (e.g. from a previous session/HMR), skip injection.
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
      // grecaptcha.ready fires when the library is fully initialised.
      window.grecaptcha.ready(() => resolve());
    };

    script.onerror = () => {
      scriptLoadPromise = null; // allow retry on next call
      reject(new Error("Failed to load reCAPTCHA script"));
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Lazily loads the reCAPTCHA v3 script (only on first call) and returns
 * an `executeRecaptcha(action)` function that resolves with a token.
 *
 * The script is NOT loaded at module evaluation time — it is deferred until
 * `loadRecaptcha()` or `executeRecaptcha()` is called, keeping the initial
 * page load fast.
 *
 * @example
 *   const { executeRecaptcha, loadRecaptcha } = useRecaptcha();
 *
 *   // Pre-warm (optional): start loading the script in the background.
 *   useEffect(() => { loadRecaptcha(); }, [loadRecaptcha]);
 *
 *   // Execute when needed:
 *   const token = await executeRecaptcha("contact_form");
 */
export function useRecaptcha() {
  const loadingRef = useRef(false);

  /** Pre-warm: trigger the script load without executing a challenge. */
  const loadRecaptcha = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      await loadRecaptchaScript();
    } catch {
      loadingRef.current = false;
    }
  }, []);

  /** Execute the reCAPTCHA challenge and return the token string. */
  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      await loadRecaptchaScript(); // no-op if already loaded
      return window.grecaptcha.execute(SITE_KEY, { action });
    },
    [],
  );

  return { executeRecaptcha, loadRecaptcha };
}
