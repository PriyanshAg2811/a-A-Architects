"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Marquee } from "./marquee";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 8, suffix: "", label: "Design Awards" },
  { value: 35, suffix: "M", label: "Sq Ft Designed" },
];

const clients = [
  "Google",
  "Apple",
  "Airbnb",
  "Tesla",
  "Meta",
  "Nike",
  "Spotify",
  "Netflix",
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-foreground py-32 text-background">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <svg className="h-full w-full">
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative px-6 md:px-12 lg:px-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-background/20">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 h-px bg-background/20" />

        {/* Client Marquee */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-sm uppercase tracking-[0.3em] text-background/60"
          >
            Trusted by industry leaders
          </motion.p>

          <Marquee speed={30} className="py-4">
            {clients.map((client) => (
              <span
                key={client}
                className="mx-8 text-3xl font-light tracking-tight text-background/40 transition-colors hover:text-background md:text-5xl"
              >
                {client}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center md:px-8"
    >
      <div className="text-5xl font-light tracking-tight md:text-7xl">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-background/60">
        {stat.label}
      </p>
    </motion.div>
  );
}
