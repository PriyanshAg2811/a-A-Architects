import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: 'Contact | a+A Architects',
  description: 'Get in touch with a+A Architects. Contact us for your next architecture project.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection compact />
      </main>
      <Footer hideBackToTop />
    </>
  );
}
