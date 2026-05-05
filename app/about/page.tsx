import { Header } from "@/components/header";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/cursor-follower";

export const metadata = {
  title: 'About | Elena Vasquez',
  description: 'Learn about Elena Vasquez and our architecture studio. Our philosophy and approach to design.',
};

export default function AboutPage() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
