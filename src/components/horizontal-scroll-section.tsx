"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Cascade House",
    category: "Residential",
    year: "2024",
    location: "Malibu, CA",
    image: "/images/project-1.jpg",
    description: "A cliffside sanctuary where architecture meets the Pacific",
  },
  {
    id: 2,
    title: "Vertex Tower",
    category: "Commercial",
    year: "2023",
    location: "San Francisco, CA",
    image: "/images/project-2.jpg",
    description: "Redefining the urban skyline with sustainable innovation",
  },
  {
    id: 3,
    title: "Horizon Loft",
    category: "Interior",
    year: "2024",
    location: "New York, NY",
    image: "/images/project-3.jpg",
    description: "Industrial heritage transformed into modern living space",
  },
  {
    id: 4,
    title: "Azure Villa",
    category: "Residential",
    year: "2023",
    location: "Santorini, Greece",
    image: "/images/project-4.jpg",
    description: "Mediterranean minimalism with infinite sea views",
  },
];

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;
      setContainerWidth(scrollWidth - clientWidth);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -containerWidth]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-end justify-between px-6 pt-24 pb-8 md:px-12 lg:px-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              Selected Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-5xl font-light tracking-tight md:text-7xl"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden text-sm text-muted-foreground md:block"
          >
            Scroll to explore
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mx-6 mb-8 h-[1px] bg-border md:mx-12 lg:mx-20">
          <motion.div
            className="h-full bg-foreground origin-left"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          style={{ x }}
          className="flex gap-8 px-6 md:px-12 lg:px-20"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          {/* End Card */}
          <div className="flex h-[60vh] w-[40vw] shrink-0 flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              View All
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group mt-6 flex h-32 w-32 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowUpRight className="h-8 w-8 transition-transform group-hover:rotate-45" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[60vh] w-[70vw] shrink-0 cursor-pointer md:w-[50vw] lg:w-[40vw]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden bg-muted">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="relative h-full w-full"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-foreground/20"
        />

        {/* Index Number */}
        <div className="absolute left-6 top-6 text-sm font-medium text-background">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Reveal Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-accent"
        />
      </div>

      {/* Content */}
      <div className="mt-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-light tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.category} / {project.location}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="h-6 w-6" />
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="mt-3 max-w-sm text-sm text-muted-foreground"
      >
        {project.description}
      </motion.p>
    </motion.div>
  );
}
