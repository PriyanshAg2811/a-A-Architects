import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { contactData } from "@/lib/contact";
import { businessId } from "@/lib/business";

const officeMapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.475071838638!2d81.01745957522235!3d26.85664347668059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f0bb83be85%3A0xc1ffb4b9f5366f9d!2sa%2BA%20Architects!5e0!3m2!1sen!2sin!4v1794899677954!5m2!1sen!2sin";
const officeMapLink = "https://www.google.com/maps?cid=13979090479157243805";

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
    mainEntity: { "@id": businessId },
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
        <section
          aria-labelledby="studio-location"
          className="mx-auto max-w-7xl px-6 pb-20 md:pb-24"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border/70 pt-6">
            <div>
              <h2 id="studio-location" className="text-2xl font-light">
                Visit our studio
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {contactData.address.join(", ")}
              </p>
            </div>
            <a
              href={officeMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 transition-colors hover:text-accent"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-muted">
            <iframe
              src={officeMapEmbed}
              title="Google Maps location for a+A Architects in Gomtinagar, Lucknow"
              width={600}
              height={450}
              className="block h-64 w-full border-0 saturate-[.8] dark:[filter:invert(.92)_hue-rotate(180deg)_saturate(.7)_brightness(.88)] sm:h-80"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </main>
      <Footer hideBackToTop />
    </>
  );
}
