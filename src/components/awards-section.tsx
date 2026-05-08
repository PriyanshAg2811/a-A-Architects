"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const awards = [
  {
    year: "2024",
    title: "AIA National Honor Award",
    project: "Cascade House",
    category: "Architecture",
  },
  {
    year: "2024",
    title: "Red Dot Design Award",
    project: "Vertex Tower",
    category: "Best of the Best",
  },
  {
    year: "2023",
    title: "Dezeen Awards",
    project: "Azure Villa",
    category: "House of the Year",
  },
  {
    year: "2023",
    title: "Interior Design Best of Year",
    project: "Horizon Loft",
    category: "Large Apartment",
  },
  {
    year: "2022",
    title: "Architizer A+ Award",
    project: "Slate Pavilion",
    category: "Cultural Building",
  },
];

export function AwardsSection() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              Recognition
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            >
              Awards & Honors
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm text-muted-foreground"
          >
            Our commitment to excellence has been recognized by leading
            institutions worldwide.
          </motion.p>
        </div>

        {/* Awards List */}
        <div className="mt-16">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.year}-${award.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer border-t border-border"
            >
              <div className="flex flex-col gap-4 py-6 transition-colors hover:bg-muted/30 md:flex-row md:items-center md:py-8">
                {/* Year */}
                <div className="w-24 shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {award.year}
                  </span>
                </div>

                {/* Title & Project */}
                <div className="flex-1">
                  <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {award.project}
                  </p>
                </div>

                {/* Category */}
                <div className="flex items-center gap-4 md:w-48">
                  <span className="text-sm text-muted-foreground">
                    {award.category}
                  </span>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-auto"
                  >
                    <ArrowUpRight className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100 group-hover:rotate-45" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
