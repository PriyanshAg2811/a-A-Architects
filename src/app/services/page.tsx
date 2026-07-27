import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: 'Services | a+A Architects',
  description: 'Explore our architectural services, from residential design to commercial planning and interior concepts.',
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
    description: 'Explore our architectural services, from residential design to commercial planning and interior concepts.',
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
        <h1 className="sr-only">Services</h1>
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
