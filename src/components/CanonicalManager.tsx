import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL =
  import.meta.env.VITE_CANONICAL_BASE_URL || "https://ardira.com";

/**
 * CanonicalManager
 *
 * Listens to React Router route changes via useLocation() and keeps the
 * <link id="canonical-link" rel="canonical"> tag in index.html up-to-date.
 *
 * - Strips trailing slashes from non-root paths  (/team/ → /team).
 * - Builds the full canonical URL from BASE_URL + cleaned pathname.
 * - Updates the existing #canonical-link element's href attribute.
 */
function CanonicalManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Clean trailing slash for all paths except the root "/"
    const cleanPath =
      pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";

    const canonicalUrl = `${BASE_URL}${cleanPath}`;

    const link = document.getElementById(
      "canonical-link",
    ) as HTMLLinkElement | null;

    if (link) {
      link.href = canonicalUrl;
    }
  }, [pathname]);

  return null;
}

export default memo(CanonicalManager);
