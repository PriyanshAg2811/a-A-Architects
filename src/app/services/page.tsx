import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";

const description =
  "Explore architecture, planning, consultancy, facade design, interiors, and 3D visualization from our Lucknow studio, serving clients across India.";

export const metadata = {
  title: 'Architecture & Design Services in Lucknow | a+A Architects',
  description,
  alternates: {
    canonical: '/services',
  },
};

export default function Home() {
  const servicesPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Architectural Services by a+A Architects',
    url: 'https://www.aplusa-architects.com/services',
    description,
    areaServed: { "@type": "Country", name: "India" },
    provider: {
      '@type': 'Organization',
      name: 'a+A Architects',
      url: 'https://www.aplusa-architects.com',
    },
  };

  return (
    <>
      <StructuredData data={servicesPageSchema} />
      <Header />
      <main>
        <ServicesSection standalone />
      </main>
      <Footer />
    </>
  );
}
