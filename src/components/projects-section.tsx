"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";

export function ProjectsSection() {
  return (
    <motion.section style={{ fontFamily: "var(--font-display)" }} className="min-h-screen bg-card text-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[10px] tracking-[0.35em] text-muted-foreground mb-3">
                  a+A Architects — Selected Work
                </p>
                <h1
                  className="text-5xl md:text-7xl font-light leading-none tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Projects
                </h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground max-w-md">
                  Explore an editorial collection of architecture projects. Tap a card to open the full story and image sequence for each work.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px bg-[#2E2A26]" />
        </header>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-card items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full bg-card overflow-hidden border border-border transition duration-300 hover:-translate-y-1 hover:border-muted-foreground/60"
                data-cursor="View"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 dark:brightness-75 dark:saturate-90"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {project.hoverImage ? (
                    <Image
                      src={project.hoverImage}
                      alt={`${project.title} hover`}
                      fill
                      className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {project.category}
                  </p>
                  <h2
                    className="mt-4 text-3xl font-light leading-tight text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {project.title}
                  </h2>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {project.location} · {project.year}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
