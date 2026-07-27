import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsHorizontalScroll } from "@/components/projects-horizontal-scroll";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'a+A Architects',
    alternateName: ['a + a architects', 'a plus a architects', 'a+a architects'],
    url: 'https://www.aplusa-architects.com',
    sameAs: [
      'https://www.instagram.com/aplusaarchitects/',
      'https://www.linkedin.com/company/aplusaarchitects/'
    ],
    logo: 'https://www.aplusa-architects.com/icon.svg',
    description: 'Award-winning architecture studio specializing in modern residential and commercial design, also known as a + a architects and a plus a architects.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'a+A Architects',
    alternateName: ['a + a architects', 'a plus a architects', 'a+a architects'],
    url: 'https://www.aplusa-architects.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.aplusa-architects.com/projects',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <Header />
      <main>
        <HeroSection />
        <ProjectsHorizontalScroll />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
