import { contactData } from "@/lib/contact";

export const businessId = "https://www.aplusa-architects.com/#business";
export const businessDescription =
  "a+A Architects is an architecture and interior design studio in Gomtinagar, Lucknow, providing architecture, planning, consultancy, map approval assistance, facade design and 3D visualization for clients across Uttar Pradesh and India.";

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  name: "a+A Architects",
  alternateName: ["Aplusa Architects", "a plus a architects"],
  url: "https://www.aplusa-architects.com",
  logo: "https://www.aplusa-architects.com/icon.svg",
  description: businessDescription,
  telephone: contactData.phone[0].replace(/\s/g, ""),
  email: contactData.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactData.address[0],
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226010",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  sameAs: contactData.socialLinks
    .filter((social) => social.label !== "WhatsApp")
    .map((social) => social.href.split("?")[0]),
};
