"use client";

import { SiteImage as Image } from "./site-image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FadeIn, TextReveal } from "./text-reveal";
import { projects } from "@/lib/projects";

export function ProjectsHorizontalScroll() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasFocus, setHasFocus] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const visible = useInView(scrollContainerRef, { amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reducedMotion = mounted && prefersReducedMotion;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const normalizeScroll = () => {
      const { scrollLeft, scrollWidth } = container;
      const halfWidth = scrollWidth / 2;

      if (scrollLeft >= halfWidth) {
        container.scrollLeft = scrollLeft - halfWidth;
      } else if (scrollLeft < 0) {
        container.scrollLeft = scrollLeft + halfWidth;
      }
    };

    normalizeScroll();
    const handleScroll = () => normalizeScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const mainProjects = projects.filter((project) => project.isMain);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !visible || isPaused || !isPlaying || hasFocus || reducedMotion) return;
    let frame = 0;
    let last = 0;
    let position = container.scrollLeft;
    let cycleWidth = container.scrollWidth / 2;
    const resize = new ResizeObserver(() => { cycleWidth = container.scrollWidth / 2; });
    resize.observe(container);
    const tick = (time: number) => {
      if (document.hidden) return;
      if (last) position += Math.min(time - last, 40) * 0.075;
      if (position >= cycleWidth) position -= cycleWidth;
      container.scrollLeft = position;
      last = time;
      frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      position = container.scrollLeft;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", restart);
    restart();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); document.removeEventListener("visibilitychange", restart); };
  }, [visible, isPaused, isPlaying, hasFocus, reducedMotion]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, clientWidth } = container;
    const scrollAmount = clientWidth * 0.75;
    let target = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
    if (target < 0) {
      // Move to the equivalent end of the loop before travelling backwards.
      const cycleWidth = container.scrollWidth / 2;
      container.scrollLeft = cycleWidth - 1;
      target += cycleWidth;
    }
    container.scrollTo({
      left: target,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  const infiniteProjects = [...mainProjects, ...mainProjects];

  return (
    <section id="work" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Selected Work
              </p>
            </FadeIn>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-light">
                Featured Projects
              </h2>
            </TextReveal>
          </div>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground max-w-md">
              Explore our various types of residential, institutional, commercial projects.
            </p>
          </FadeIn>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto md:overflow-x-hidden pb-4 hide-scrollbar"
            aria-label="Featured architecture projects"
            onPointerDown={(event) => { setIsPaused(true); if (event.pointerType === "touch") setIsPlaying(false); }}
            onPointerUp={() => setIsPaused(false)}
            onPointerCancel={() => setIsPaused(false)}
          >
            {infiniteProjects.map((project, index) => (
              <HorizontalProjectCard
                key={`${project.slug}-${index}`}
                project={project}
                duplicate={index >= mainProjects.length}
                isHovered={hoveredProject === project.slug}
                onHover={() => setHoveredProject(project.slug)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scroll("left")}
            className="hidden md:inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scroll("right")}
            className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button type="button" className="min-h-11 px-3 text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4" aria-pressed={!isPlaying} onClick={() => setIsPlaying(!isPlaying)} disabled={!!reducedMotion}>
            {reducedMotion ? "Automatic motion off" : isPlaying ? "Pause slideshow" : "Play slideshow"}
          </button>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors group"
              data-cursor="Explore"
            >
              View All Projects
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

interface HorizontalProjectCardProps {
  duplicate: boolean;
  project: (typeof projects)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function HorizontalProjectCard({
  duplicate,
  project,
  isHovered,
  onHover,
  onLeave,
}: HorizontalProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} prefetch={false} className="block" tabIndex={duplicate ? -1 : undefined} aria-hidden={duplicate || undefined}>
      <motion.article
        className="shrink-0 w-80 md:w-96 group cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-cursor="View"
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="relative aspect-4/3 overflow-hidden rounded-lg mb-4">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 320px, 384px"
              className="object-cover transition-all duration-500 group-hover:scale-105 dark:brightness-75 dark:saturate-90"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-foreground/40 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 flex items-end p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-card text-xs max-w-xs leading-relaxed"
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {project.title}
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="flex items-start justify-between gap-2">
          <div>
            <motion.h3
              className="text-lg font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-xs text-muted-foreground">{project.location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {project.category}
            </p>
            <p className="text-xs text-muted-foreground">{project.year}</p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
