import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: 'Contact | Elena Vasquez',
  description: 'Get in touch with Elena Vasquez. Contact us for your next architecture project.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
