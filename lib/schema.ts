import { business } from "./business";
import { faqs } from "./faq";
import { photos } from "./photos";
import { services } from "./services";
import { absoluteUrl, SITE_URL } from "./site";

// Structured data. Only true things: no ratings, no reviews (the one review is unconfirmed),
// no prices, no dates, no awards, no geo coordinates, and no opening hours while they are DRAFT.

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const areaServed = [
  { "@type": "City", name: "Pasadena", containedInPlace: { "@type": "State", name: "Maryland" } },
  { "@type": "AdministrativeArea", name: "Anne Arundel County, Maryland" },
  { "@type": "City", name: "Baltimore", containedInPlace: { "@type": "State", name: "Maryland" } },
  { "@type": "City", name: "Frederick", containedInPlace: { "@type": "State", name: "Maryland" } },
  { "@type": "City", name: "Ocean City", containedInPlace: { "@type": "State", name: "Maryland" } },
  { "@type": "City", name: "Washington, D.C." },
  { "@type": "State", name: "Maryland" },
];

export function businessJsonLd() {
  const node: Record<string, unknown> = {
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: business.legalName,
    alternateName: business.name,
    url: absoluteUrl("/"),
    telephone: business.phoneE164,
    email: business.email,
    logo: absoluteUrl(photos.logo.src),
    image: [absoluteUrl(photos.p01.src), absoluteUrl("/og-image.png")],
    description:
      "Licensed home remodeling and repair contractor in Pasadena, Maryland: kitchens, bathrooms, club basements, tile, drywall and painting, doors, windows and trim, built-ins, decks and rental turnovers.",
    slogan: business.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Maryland Home Improvement Commission contractor licence",
      identifier: business.licence.numberPlain,
      recognizedBy: { "@type": "GovernmentOrganization", name: business.licence.body },
    },
    knowsAbout: services.map((s) => s.name),
    sameAs: [business.facebookHref],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phoneE164,
      email: business.email,
      contactType: "customer service",
      areaServed: "US-MD",
      availableLanguage: "English",
    },
  };
  // Opening hours go in only once the owner confirms them (business.hoursConfirmed).
  if (business.hoursConfirmed) {
    node.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:30",
    };
  }
  return node;
}

function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: business.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessJsonLd(),
      websiteJsonLd(),
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        url: absoluteUrl("/"),
        name: "Home Remodeling in Pasadena, MD | Precision Home Services",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(photos.p01.src) },
        inLanguage: "en-US",
      },
      ...services.map((s) => ({
        "@type": "Service",
        "@id": `${absoluteUrl("/")}#${s.id}`,
        name: s.name,
        serviceType: s.name,
        description: s.schemaDescription,
        url: `${absoluteUrl("/")}#${s.id}`,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "State", name: "Maryland" },
      })),
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl("/")}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessJsonLd(),
      websiteJsonLd(),
      {
        "@type": "ContactPage",
        "@id": `${absoluteUrl("/contact")}#webpage`,
        url: absoluteUrl("/contact"),
        name: "Contact Precision Home Services | Pasadena, MD Remodeling",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
        ],
      },
    ],
  };
}
