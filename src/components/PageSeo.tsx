import { Helmet } from "react-helmet-async";

const BASE_URL =
  import.meta.env.VITE_CANONICAL_BASE_URL || "https://ardira.com";
const DEFAULT_OG_IMAGE = "/ArdiraLogo.webp";
const SITE_NAME = "Ardira";

/** A single breadcrumb entry. */
export interface BreadcrumbItem {
  /** Display name shown in the breadcrumb. */
  name: string;
  /** Path relative to the base URL (e.g. "/team"). */
  path: string;
}

export interface PageSeoProps {
  /** Page title – also used for og:title and twitter:title. */
  title: string;
  /** Page meta description – also used for og:description and twitter:description. */
  description: string;
  /** Path segment for this page (e.g. "/team"). Used to build canonical & OG URLs. */
  path?: string;
  /** Optional keywords meta tag value. */
  keywords?: string;
  /** Override the default OG image. Accepts a relative path (e.g. "/ArdiraLogo.webp") which is resolved against BASE_URL. */
  ogImage?: string;
  /** OG type – defaults to "website". */
  ogType?: string;
  /**
   * If true, adds <meta name="robots" content="noindex" /> so the page is
   * never indexed, even in production (e.g. 404 page).
   */
  noIndex?: boolean;
  /**
   * Optional breadcrumb trail. When provided, a BreadcrumbList JSON-LD
   * schema is injected into the page head.
   */
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * PageSeo
 *
 * A generic, reusable SEO wrapper built on react-helmet-async.
 * Drop it at the top of any page component to set:
 * - <title> and <meta name="description">
 * - Open Graph tags (og:title, og:description, og:url, og:image, og:type, og:site_name)
 * - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
 * - Optional <meta name="robots" content="noindex"> for pages that must never be indexed
 * - Optional BreadcrumbList JSON-LD structured data
 */
export default function PageSeo({
  title,
  description,
  path = "/",
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  breadcrumbs,
}: PageSeoProps) {
  // Clean trailing slash for non-root paths
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "") || "/";
  const pageUrl = `${BASE_URL}${cleanPath}`;

  // Resolve relative image paths to absolute URLs (OG/Twitter require absolute URLs)
  const resolvedImage = ogImage.startsWith("/")
    ? `${BASE_URL}${ogImage}`
    : ogImage;

  // Build BreadcrumbList JSON-LD if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${BASE_URL}${crumb.path === "/" ? "" : crumb.path}`,
        })),
      }
    : null;

  return (
    <Helmet>
      {/* ── Basic Meta ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* ── Robots override (page-level) ── */}
      {noIndex && <meta name="robots" content="noindex" />}

      {/* ── Open Graph ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* ── BreadcrumbList JSON-LD ── */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}
