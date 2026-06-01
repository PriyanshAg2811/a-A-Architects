"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/app/lib/projects";

interface ProjectSectionsProps {
  project: Project;
}

export function ProjectSections({ project }: ProjectSectionsProps) {
  return (
    <>
      {project.sections.map((section, index) => {
        const isReversed = index % 2 === 1;

        return (
          <motion.section
            key={section.image}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="max-w-450 mx-auto px-6 mb-40 md:px-12"
          >
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className={isReversed ? "md:col-span-4 md:order-last" : "md:col-span-8"}>
                <div className="overflow-hidden rounded-4xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
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
          </motion.section>
        );
      })}
    </>
  );
}
