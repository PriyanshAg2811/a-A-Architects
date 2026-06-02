import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsHorizontalScroll } from "@/components/projects-horizontal-scroll";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { NoiseTexture } from "@/components/ui/noise-texture";

export default function Home() {
  return (
    <>
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
