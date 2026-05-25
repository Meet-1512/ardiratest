import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageType?: string;
  ogLogo?: string;
  ogType?: string;
  canonicalUrl?: string;
}

function setMetaTag(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) {
    el.setAttribute("content", content);
  } else {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  }
}

function removeMetaTag(attr: string, key: string) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (link) {
    link.href = url;
  } else {
    link = document.createElement("link");
    link.rel = "canonical";
    link.href = url;
    document.head.appendChild(link);
  }
}

function removeCanonical() {
  const link = document.querySelector('link[rel="canonical"]');
  if (link) link.remove();
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageType,
  ogLogo,
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Standard meta
    setMetaTag("name", "description", description);

    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    } else {
      removeMetaTag("name", "keywords");
    }

    // Open Graph
    setMetaTag("property", "og:type", ogType);

    if (ogTitle) {
      setMetaTag("property", "og:title", ogTitle);
    } else {
      setMetaTag("property", "og:title", title);
    }

    if (ogDescription) {
      setMetaTag("property", "og:description", ogDescription);
    } else {
      setMetaTag("property", "og:description", description);
    }

    if (ogUrl) {
      setMetaTag("property", "og:url", ogUrl);
    } else {
      removeMetaTag("property", "og:url");
    }

    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
      
      // Set image dimensions and type
      if (ogImageWidth) {
        setMetaTag("property", "og:image:width", ogImageWidth);
      }
      if (ogImageHeight) {
        setMetaTag("property", "og:image:height", ogImageHeight);
      }
      if (ogImageType) {
        setMetaTag("property", "og:image:type", ogImageType);
      }
    } else {
      removeMetaTag("property", "og:image");
      removeMetaTag("property", "og:image:width");
      removeMetaTag("property", "og:image:height");
      removeMetaTag("property", "og:image:type");
    }

    // OG Logo
    if (ogLogo) {
      setMetaTag("property", "og:logo", ogLogo);
    } else {
      removeMetaTag("property", "og:logo");
    }

    // OG Site Name
    setMetaTag("property", "og:site_name", "Ardira");

    // Canonical
    if (canonicalUrl) {
      setCanonical(canonicalUrl);
    } else if (ogUrl) {
      setCanonical(ogUrl);
    } else {
      removeCanonical();
    }

    // Cleanup on unmount — restore defaults
    return () => {
      document.title = "Ardira — 100% Native Salesforce Applications";
      removeMetaTag("name", "keywords");
      removeMetaTag("property", "og:title");
      removeMetaTag("property", "og:description");
      removeMetaTag("property", "og:url");
      removeMetaTag("property", "og:image");
      removeMetaTag("property", "og:image:width");
      removeMetaTag("property", "og:image:height");
      removeMetaTag("property", "og:image:type");
      removeMetaTag("property", "og:logo");
      removeMetaTag("property", "og:type");
      removeCanonical();
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogUrl, ogImage, ogImageWidth, ogImageHeight, ogImageType, ogLogo, ogType, canonicalUrl]);

  return null;
}
