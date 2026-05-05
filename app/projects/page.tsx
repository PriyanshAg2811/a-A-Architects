import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/cursor-follower";

export const metadata = {
  title: 'Projects | Elena Vasquez',
  description: 'Explore our award-winning architecture projects. Modern residential and commercial designs.',
};

export default function ProjectsPage() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
