import { useEffect, useId } from "react";

interface OrganizationProps {
  type: "Organization";
}

interface WebSiteProps {
  type: "WebSite";
}

interface WebPageProps {
  type: "WebPage";
  name: string;
  description: string;
  url: string;
}

type StructuredDataProps = OrganizationProps | WebSiteProps | WebPageProps;

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ardira",
  legalName: "Ardira Corporation",
  url: "https://ardira.com",
  logo: "https://ardira.com/favicon.webp",
  description:
    "Ardira builds 100% Salesforce-native applications with no integrations, ensuring data security and native performance on the Salesforce platform.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2040 Martin Ave",
    addressLocality: "Santa Clara",
    addressRegion: "CA",
    postalCode: "95050",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-669-777-6838",
    contactType: "sales",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/ardira",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ardira",
  url: "https://ardira.com",
  description:
    "Ardira builds 100% Salesforce-native applications with no integrations, ensuring data security and native performance.",
  publisher: {
    "@type": "Organization",
    name: "Ardira",
    url: "https://ardira.com",
  },
};

function buildWebPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "Ardira",
      url: "https://ardira.com",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Ardira",
      url: "https://ardira.com",
    },
  };
}

export default function StructuredData(props: StructuredDataProps) {
  const id = useId();
  const scriptId = `structured-data-${id}`;

  useEffect(() => {
    let schema: object;

    switch (props.type) {
      case "Organization":
        schema = ORGANIZATION_SCHEMA;
        break;
      case "WebSite":
        schema = WEBSITE_SCHEMA;
        break;
      case "WebPage":
        schema = buildWebPageSchema(props.name, props.description, props.url);
        break;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [props, scriptId]);

  return null;
}
