import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectSections } from "@/components/project-sections";
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

        <ProjectSections project={project} />
      </main>
      <Footer />
    </>
  );
}
