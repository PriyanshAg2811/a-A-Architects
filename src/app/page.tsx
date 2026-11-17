import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsHorizontalScroll } from "@/components/projects-horizontal-scroll";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { StructuredData } from "@/components/structured-data";
import { contactData } from "@/lib/contact";
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
    images: [{ url: "/images/hero/hero-light.png", alt: "a+A Architects" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/hero-light.png"],
  },
};

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'a+A Architects',
    alternateName: ['Aplusa Architects', 'aplusa architects', 'a + a architects', 'a plus a architects', 'a+a architects'],
    url: 'https://www.aplusa-architects.com',
    sameAs: [
      'https://www.instagram.com/aplusaarchitects/',
      'https://www.linkedin.com/company/aplusaarchitects/'
    ],
    logo: 'https://www.aplusa-architects.com/icon.svg',
    description,
    telephone: contactData.phone[0].replace(/\s/g, ""),
    email: contactData.email,
    areaServed: { "@type": "Country", name: "India" },
    address: {
      "@type": "PostalAddress",
      streetAddress: contactData.address[0],
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226010",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'a+A Architects',
    alternateName: ['Aplusa Architects', 'aplusa architects', 'a + a architects', 'a plus a architects', 'a+a architects'],
    url: 'https://www.aplusa-architects.com',
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
