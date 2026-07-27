import { Header } from "@/components/header";
import { AboutSection } from "@/components/about-section";
import { TeamSection } from "@/components/team-section";
import { Footer } from "@/components/footer";
// import { CursorFollower } from "@/components/cursor-follower";

export const metadata = {
  title: 'About | a+A Architects',
  description: 'Learn about a+A Architects and our architecture studio. Our philosophy and approach to design.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* <CursorFollower /> */}
      <Header />
      <main>
        <h1 className="sr-only">About a+A Architects</h1>
        <AboutSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
