import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectsSection } from "@/components/projects-section";
import { NoiseTexture } from "@/components/ui/noise-texture";

export const metadata = {
  title: 'Projects | a+A Architects',
  description: 'Explore our award-winning architecture projects. Modern residential and commercial designs.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Projects</h1>
        <ProjectsSection></ProjectsSection>
      </main>
      <Footer />
    </>
  );
}
