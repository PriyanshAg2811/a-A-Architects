import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsHorizontalScroll } from "@/components/projects-horizontal-scroll";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { businessId } from "@/lib/business";
import type { Metadata } from "next";

const title = "Architects in Lucknow | a+A Architects";
const description =
  "Lucknow-based architects serving Uttar Pradesh and clients across India with architecture, planning, facade design, interiors, and 3D visualization.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "a+A Architects",
    type: "website",
    images: [{ url: "/images/hero/hero-light-1672.webp", alt: "a+A Architects" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/hero-light-1672.webp"],
  },
};

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    publisher: { '@id': businessId },
    name: 'a+A Architects',
    alternateName: ['Aplusa Architects', 'aplusa architects', 'a + a architects', 'a plus a architects', 'a+a architects'],
    url: 'https://www.aplusa-architects.com',
  };

  return (
    <>
      <StructuredData data={websiteSchema} />
      <Header />
      <main id="main-content">
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
