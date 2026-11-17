"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FadeIn, TextReveal } from "./text-reveal";

const projects = [
  {
    id: 1,
    title: "Alpine Retreat",
    category: "Residential",
    location: "Aspen, Colorado",
    year: "2024",
    image: "/images/project-1.jpg",
    description:
      "A sustainable mountain home blending seamlessly with its natural surroundings.",
  },
  {
    id: 2,
    title: "Urban Axis Tower",
    category: "Commercial",
    location: "Chicago, Illinois",
    year: "2023",
    image: "/images/project-2.jpg",
    description:
      "A 40-story office complex redefining the city skyline with innovative design.",
  },
  {
    id: 3,
    title: "The Glass Pavilion",
    category: "Residential",
    location: "Malibu, California",
    year: "2023",
    image: "/images/project-3.jpg",
    description:
      "Open-concept living space celebrating natural light and ocean views.",
  },
  {
    id: 4,
    title: "Coastal Sanctuary",
    category: "Residential",
    location: "Santorini, Greece",
    year: "2022",
    image: "/images/project-4.jpg",
    description:
      "Mediterranean-inspired luxury villa with contemporary minimalism.",
  },
];

const categories = ["All", "Residential", "Commercial"];

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
              A curated selection of residential and commercial projects that
              exemplify our design philosophy.
            </p>
          </FadeIn>
        </div>

        {/* Category Filter */}
        <FadeIn delay={0.3}>
          <div className="flex gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm uppercase tracking-widest transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
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

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor="View"
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden mb-6"
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner Brackets */}
        <div className="absolute inset-4 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          />
        </div>

        {/* Description Overlay */}
        <motion.div
          className="absolute inset-0 flex items-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-card text-sm max-w-xs"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-start justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <div>
          <motion.h3
            className="text-xl font-medium mb-1"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-muted-foreground">{project.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {project.category}
          </p>
          <p className="text-sm text-muted-foreground">{project.year}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}
