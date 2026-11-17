import { ProjectBackLink } from "@/components/project-back-link";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectSections } from "@/components/project-sections";
import { StructuredData } from "@/components/structured-data";
import { projects } from "@/lib/projects";
import { businessId } from "@/lib/business";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((project) => project.slug === resolvedParams.slug);

  if (!project) {
    return {};
  }

  return pageMetadata(`${project.title} | a+A Architects`, `Explore ${project.title}, a ${project.category.join(" and ").toLowerCase()} project in ${project.location}, by a+A Architects.`, `/projects/${project.slug}`, project.thumbnail.replace('/upload/', '/upload/f_jpg,q_80,c_limit,w_1200/'));
}

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export const dynamicParams = false;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const project = projects.find(
    (project) => project.slug === slug
  );
  if (!project) notFound();

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.thumbnail,
    url: `https://www.aplusa-architects.com/projects/${project.slug}`,
    author: {
      '@id': businessId,
      '@type': 'Organization',
      name: 'a+A Architects',
      url: 'https://www.aplusa-architects.com',
    },
    keywords: project.category.join(', '),
    locationCreated: { '@type': 'Place', name: project.location },
  };

  return (
    <>
      <StructuredData data={projectSchema} />
      <Header />
      <main id="main-content" className="bg-background text-foreground">
        <section className="px-6 py-24 md:px-12">
          <div className="max-w-5xl">
            <ProjectBackLink />
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
