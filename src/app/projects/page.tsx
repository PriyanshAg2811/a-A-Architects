import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectsSection } from "@/components/projects-section";
import { NoiseTexture } from "@/components/ui/noise-texture";

export const metadata = {
  title: 'Projects | Elena Vasquez',
  description: 'Explore our award-winning architecture projects. Modern residential and commercial designs.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <ProjectsSection></ProjectsSection>
      </main>
      <Footer />
    </>
  );
}
