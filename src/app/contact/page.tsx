import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: 'Contact | a+A Architects',
  description: 'Get in touch with a+A Architects. Contact us for your next architecture project.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Contact a+A Architects</h1>
        <ContactSection compact />
      </main>
      <Footer hideBackToTop />
    </>
  );
}
