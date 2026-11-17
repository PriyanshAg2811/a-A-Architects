"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";
import {
  FadeIn,
  TextReveal,
} from "./text-reveal";
import { aboutStats } from "@/lib/team";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                About
              </p>
            </FadeIn>

            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-light mb-8 text-balance">
                Architecture is the thoughtful making of space.
              </h2>
            </TextReveal>

            {/* Stats with Animated Counters */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              {aboutStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-4"
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
                    style={{ scaleY: lineScale }}
                  />
                  <p className="text-3xl md:text-4xl font-light">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* <div className="mt-12 overflow-hidden rounded-4xl">
              <Image
                src={isDarkMode ? "/images/about/about-dark.png" : "/images/about/about-light.png"}
                alt="Architecture studio workspace"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div> */}
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2021, our studio has been dedicated to creating
                architectural experiences that transcend the ordinary. We
                believe that great design emerges from a deep understanding of
                place, purpose, and the people who will inhabit the spaces we
                create.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our approach combines rigorous technical expertise with artistic
                sensibility. Every project begins with listening — to our
                clients, to the site, to the community. This dialogue informs
                designs that are both innovative and deeply contextual.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to sustainable practices, believing that
                beautiful architecture and environmental responsibility are not
                mutually exclusive, but rather essential partners in creating
                buildings that will endure.
              </p>

              <div className="mt-12 pt-8 border-t border-border relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-accent" />
                <p className="text-2xl font-light italic mb-2">
                  a+A Architects
                </p>
                <p className="text-sm text-muted-foreground">
                  Architecture & Design Studio
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
