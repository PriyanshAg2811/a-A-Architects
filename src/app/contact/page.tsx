import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: 'Contact | a+A Architects',
  description: 'Get in touch with a+A Architects. Contact us for your next architecture project.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact a+A Architects',
    url: 'https://www.aplusa-architects.com/contact',
    description: 'Get in touch with a+A Architects. Contact us for your next architecture project.',
  };

  return (
    <>
      <StructuredData data={contactPageSchema} />
      <Header />
      <main>
        <h1 className="sr-only">Contact a+A Architects</h1>
        <ContactSection compact />
      </main>
      <Footer hideBackToTop />
    </>
  );
}
