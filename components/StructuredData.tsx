// JSON-LD structured data — tells Google exactly what/where this business is.
// Feeds Google Maps / local pack, the knowledge panel, and rich results.

const data = {
  "@context": "https://schema.org",
  "@type": ["Pharmacy", "Store"],
  "@id": "https://westernaverx.com/#business",
  name: "Western Ave Pharmacy",
  description:
    "Neighborhood pharmacy in Glendale, CA offering over-the-counter medicine, vitamins, first aid, personal care, and beer & wine — with local delivery and in-store pickup, plus long-term care pharmacy services for senior living facilities.",
  url: "https://westernaverx.com",
  telephone: "+1-818-242-5887",
  email: "westernave501@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
  image: "https://westernaverx.com/og.jpg",
  logo: "https://westernaverx.com/logo-primary.svg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "501 Western Ave",
    addressLocality: "Glendale",
    addressRegion: "CA",
    postalCode: "91201",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.1561,
    longitude: -118.2937,
  },
  hasMap: "https://maps.google.com/?q=501+Western+Ave+Glendale+CA+91201",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Glendale, CA",
    "Burbank, CA",
    "Atwater Village, CA",
    "Pasadena, CA",
    "San Fernando Valley, CA",
    "Los Angeles County, CA",
  ].map((name) => ({ "@type": "City", name })),
  sameAs: [
    "https://www.instagram.com/western_ave_pharmacy",
    "https://maps.google.com/?q=501+Western+Ave+Glendale+CA+91201",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Western Ave Pharmacy",
    itemListElement: [
      "Cold, Flu & Pain Relief",
      "Vitamins & Supplements",
      "First Aid & Medical Supplies",
      "Personal Care",
      "Baby & Child",
      "Beer & Wine",
    ].map((name) => ({ "@type": "OfferCatalog", name })),
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
