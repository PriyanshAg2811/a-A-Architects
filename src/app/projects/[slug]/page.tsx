import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectSections } from "@/components/project-sections";
import { StructuredData } from "@/components/structured-data";
import { projects } from "@/lib/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((project) => project.slug === resolvedParams.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | a+A Architects`,
    description: project.description || `Explore ${project.title}, an architecture project by a+A Architects.`,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ category?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;
  const category = resolvedSearchParams?.category;

  const project = projects.find(
    (project) => project.slug === slug
  );
  if (!project) notFound();

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `https://www.aplusa-architects.com/projects/${project.slug}`,
    author: {
      '@type': 'Organization',
      name: 'a+A Architects',
      url: 'https://www.aplusa-architects.com',
    },
    keywords: project.category.join(', '),
    locationCreated: project.location,
  };

  return (
    <>
      <StructuredData data={projectSchema} />
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
