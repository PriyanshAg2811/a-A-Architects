import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/cursor-follower";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
