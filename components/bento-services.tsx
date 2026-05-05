"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Compass,
  Layers,
  Maximize2,
  PenTool,
  Building2,
  Leaf,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "From concept to completion, we craft spaces that inspire. Our design process integrates form, function, and sustainability.",
    icon: Compass,
    className: "md:col-span-2 md:row-span-2",
    featured: true,
    image: "/images/project-1.jpg",
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Curated interiors that reflect your vision",
    icon: Layers,
    className: "md:col-span-1",
  },
  {
    id: 3,
    title: "Space Planning",
    description: "Optimized layouts for maximum efficiency",
    icon: Maximize2,
    className: "md:col-span-1",
  },
  {
    id: 4,
    title: "Concept Development",
    description:
      "Transforming ideas into architectural narratives through research, sketching, and 3D visualization",
    icon: PenTool,
    className: "md:col-span-2",
  },
  {
    id: 5,
    title: "Project Management",
    description: "End-to-end oversight of your project",
    icon: Building2,
    className: "md:col-span-1",
  },
  {
    id: 6,
    title: "Sustainable Design",
    description: "Eco-conscious solutions for the future",
    icon: Leaf,
    className: "md:col-span-1",
  },
];

export function BentoServices() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
          >
            Services tailored to your{" "}
            <span className="italic text-muted-foreground">architectural vision</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-4">
          {services.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden border border-border bg-card p-6 transition-colors hover:bg-muted/50",
        service.className
      )}
    >
      {service.featured && service.image && (
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
        </div>
      )}

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center border border-border",
              service.featured && "bg-foreground text-background"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="flex h-10 w-10 items-center justify-center"
          >
            <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        </div>

        <div>
          <h3
            className={cn(
              "text-xl font-medium tracking-tight",
              service.featured && "text-2xl md:text-3xl"
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              service.featured && "text-base max-w-md"
            )}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Hover Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-foreground"
      />
    </motion.div>
  );
}
