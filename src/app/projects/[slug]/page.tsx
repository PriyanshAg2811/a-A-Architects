import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectSections } from "@/components/project-sections";
import { projects, isProjectSectionArray } from "@/lib/projects";

export default async function ProjectPage({ params, searchParams }: { params: any; searchParams?: { category?: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const category = searchParams?.category;

  const project = projects.find(
    (project) => project.slug === slug
  );
  if (!project) notFound();

  // If this project has nested sections, redirect to the sections page
  if (isProjectSectionArray(project.sections)) {
    redirect(`/projects/${slug}/sections`);
  }

  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <section className="px-6 py-24 md:px-12">
          <div className="max-w-5xl">
            <Link
              href={`/projects${category ? `?category=${encodeURIComponent(category)}` : ""}`}
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
              <br />
              {project.category.join(', ')}
            </div>
          </div>
        </section>

        <ProjectSections project={project} />
      </main>
      <Footer />
    </>
  );
}
