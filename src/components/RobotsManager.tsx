import { Helmet } from "react-helmet-async";

/**
 * RobotsManager
 *
 * Reads the environment variable VITE_APP_ENV (falling back to Vite's MODE).
 * - Non-production: injects <meta name="robots" content="noindex, nofollow, noarchive">
 *   to protect staging / development sites from search-engine crawlers.
 * - Production: does NOT inject a restrictive robots tag, allowing indexing.
 *
 * Individual pages can still override with their own <meta name="robots"> via
 * react-helmet-async's nested priority (deeper Helmet wins).
 */
export default function RobotsManager() {
  const appEnv =
    import.meta.env.VITE_APP_ENV || import.meta.env.MODE || "development";
  const isProduction = appEnv === "production";

  if (isProduction) {
    // In production, do not inject any restrictive robots tag.
    // Pages that need noindex (e.g. 404) will add their own via PageSeo.
    return null;
  }

  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow, noarchive" />
    </Helmet>
  );
}
