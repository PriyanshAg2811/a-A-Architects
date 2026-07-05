'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projects, isProjectSectionArray, ProjectSectionItem } from '@/lib/projects';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';

export default function ProjectSectionsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const project = projects.find((p) => p.slug === slug);

  const [selectedSection, setSelectedSection] = useState<ProjectSectionItem | null>(null);

  useEffect(() => {
    if (project && isProjectSectionArray(project.sections)) {
      setSelectedSection(project.sections[0]);
    }
  }, [project]);

  if (!project) {
    return (
      <>
        <Header />
        <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light">Project not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isProjectSectionArray(project.sections)) {
    // Redirect to normal project page if not a nested sections project
    router.push(`/projects/${slug}`);
    return null;
  }

  const sections = project.sections;

  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <section className="px-6 py-24 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/projects`}
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

        <div className="px-6 md:px-12 pb-40">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              {/* Sidebar with sections list */}
              <motion.aside
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3 lg:sticky lg:top-24"
              >
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      {sections.length} Sections
                    </p>
                    <ul className="space-y-2">
                      {sections.map((section, idx) => (
                        <motion.li
                          key={section.slug}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <button
                            onClick={() => setSelectedSection(section)}
                            className={`text-left text-sm transition-all duration-200 ${
                              selectedSection?.slug === section.slug
                                ? 'text-foreground font-medium'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <span className="text-xs text-muted-foreground mr-2">•</span>
                            {section.title}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {selectedSection?.description && (
                    <div className="border-t border-border pt-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {selectedSection.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.aside>

              {/* Main content - selected section image */}
              {selectedSection && (
                <motion.div
                  key={selectedSection.slug}
                  className="lg:col-span-9"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded border border-border">
                    <Image
                      src={selectedSection.images[0]}
                      alt={selectedSection.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>

                  {/* Gallery of all images in selected section */}
                  {selectedSection.images.length > 1 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedSection.images.slice(1).map((img, idx) => (
                        <motion.div
                          key={idx}
                          className="relative aspect-square overflow-hidden rounded border border-border"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: (idx + 1) * 0.05 }}
                        >
                          <Image
                            src={img}
                            alt={`${selectedSection.title} ${idx + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
