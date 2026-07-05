"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { projects, ProjectCategory, isProjectSectionArray } from "@/lib/projects";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const router = useRouter();
  const pathname = usePathname();

  const categories = useMemo(() => ["All", ...Object.values(ProjectCategory)], []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useLayoutEffect(() => {
    try {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      const urlCat = params.get("category");
      if (urlCat && categories.includes(urlCat)) {
        setSelectedCategory(urlCat);
        return;
      }
    } catch (e) {
      // ignore
    }
    setSelectedCategory("All");
  }, [categories]);

  // keep URL in sync with selection

  useEffect(() => {
    if (selectedCategory === null) return;
    try {
      // reflect selection in the URL without adding history entries
      const catParam = selectedCategory && selectedCategory !== "All" ? `?category=${encodeURIComponent(selectedCategory)}` : "";
      router.replace(`${pathname}${catParam}`);
    } catch (e) {
      // ignore
    }
  }, [selectedCategory, pathname, router]);

  const visibleProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category.includes(selectedCategory as ProjectCategory));
  }, [selectedCategory]);

  if (selectedCategory === null) return null;

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

        <div className="mb-8 px-6">
          {/* Desktop buttons */}
          <div className="hidden md:flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm uppercase tracking-[0.25em] px-3 py-1 border rounded-sm transition ${selectedCategory === cat ? 'bg-foreground text-background' : 'text-muted-foreground border-border hover:bg-foreground/10 hover:text-foreground'} cursor-pointer`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden">
            <label className="sr-only">Select category</label>
            <div className="relative">
              <select
                value={selectedCategory ?? 'All'}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-card text-foreground border border-border px-4 py-2 rounded-sm appearance-none text-sm uppercase tracking-[0.25em] shadow-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-sm">
                    {cat}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.656a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-card items-stretch">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
            >
              <Link
                href={`/projects/${project.slug}${selectedCategory && selectedCategory !== "All" ? `?category=${encodeURIComponent(selectedCategory)}` : ""}`}
                className="group block h-full bg-card overflow-hidden border border-border transition duration-300 hover:-translate-y-1 hover:border-muted-foreground/60"
                data-cursor="View"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    loading="eager"
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
                  {/* Hover overlay with bullet points for nested sections (desktop only) */}
                  {isProjectSectionArray(project.sections) && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden md:flex">
                      <div className="bg-black/70 backdrop-blur-sm rounded p-6 max-w-xs">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                          {project.sections.length} Sections
                        </p>
                        <ul className="space-y-2">
                          {project.sections.map((section, idx) => (
                            <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-xs text-muted-foreground mt-1">•</span>
                              <span>{section.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {project.category.join(", ")}
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
