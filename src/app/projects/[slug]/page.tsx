import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projects } from "@/app/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <section className="px-6 py-24 md:px-12">
          <div className="max-w-5xl">
            <Link
              href="/projects"
              className="text-sm uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition"
            >
              Back to projects
            </Link>
            <h1 className="mt-8 text-5xl md:text-7xl font-light leading-tight">
              {project.title}
            </h1>
            <div className="mt-8 text-sm text-muted-foreground">
              {project.location}
              <br />
              {project.year}
            </div>
          </div>
        </section>

        {project.sections.map((section, index) => {
          const isReversed = index % 2 === 1;

          return (
            <section
  key={section.image}
  className="max-w-[1800px] mx-auto px-6 mb-40 md:px-12"
>
              <div className="grid md:grid-cols-12 gap-10 items-start">
                <div className={isReversed ? "md:col-span-4 md:order-last" : "md:col-span-8"}>
                  <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
                    <Image
                      src={section.image}
                      alt={`${project.title} section ${index + 1}`}
                      width={1800}
                      height={1200}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className={isReversed ? "md:col-span-8" : "md:col-span-4"}>
                  <div className="sticky top-24">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
