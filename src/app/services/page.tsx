import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: 'Services | a+A Architects',
  description: 'Explore our architectural services, from residential design to commercial planning and interior concepts.',
  alternates: {
    canonical: '/services',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Services</h1>
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
