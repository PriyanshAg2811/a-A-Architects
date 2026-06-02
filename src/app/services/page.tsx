import { Header } from "@/components/header";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
