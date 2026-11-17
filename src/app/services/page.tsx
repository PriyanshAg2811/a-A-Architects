import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { ServiceQuestions } from "@/components/service-questions";
import { services } from "@/lib/services";
import { businessId } from "@/lib/business";

const description =
  "Explore architecture, planning, consultancy, facade design, interiors, and 3D visualization from our Lucknow studio, serving clients across India.";

export const metadata = pageMetadata('Architecture & Design Services in Lucknow | a+A Architects', description, '/services');

export default function Home() {
  const servicesPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.aplusa-architects.com/services#page',
    name: 'Architectural Services by a+A Architects',
    url: 'https://www.aplusa-architects.com/services',
    description,
    about: { "@id": businessId },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Architecture and design services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `https://www.aplusa-architects.com/services#service-${service.number}`,
          url: `https://www.aplusa-architects.com/services#service-${service.number}`,
          name: service.title,
          description: service.description,
          provider: { "@id": businessId },
          areaServed: { "@type": "Country", name: "India" },
        },
      })),
    },
  };

  return (
    <>
      <StructuredData data={servicesPageSchema} />
      <Header />
      <main id="main-content">
        <ServicesSection standalone />
        <ServiceQuestions />
      </main>
      <Footer />
    </>
  );
}
