"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";
import { FadeIn, TextReveal, StaggerChildren, staggerChildVariants } from "./text-reveal";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 8, suffix: "", label: "Design Awards" },
  { value: 12, suffix: "", label: "Team Members" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 bg-background overflow-hidden">
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
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-4"
                >
                  {/* Animated Border */}
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
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            <StaggerChildren className="space-y-6">
              <motion.p
                variants={staggerChildVariants}
                className="text-muted-foreground leading-relaxed"
              >
                Founded in 2009, our studio has been dedicated to creating
                architectural experiences that transcend the ordinary. We believe
                that great design emerges from a deep understanding of place,
                purpose, and the people who will inhabit the spaces we create.
              </motion.p>
              <motion.p
                variants={staggerChildVariants}
                className="text-muted-foreground leading-relaxed"
              >
                Our approach combines rigorous technical expertise with artistic
                sensibility. Every project begins with listening — to our
                clients, to the site, to the community. This dialogue informs
                designs that are both innovative and deeply contextual.
              </motion.p>
              <motion.p
                variants={staggerChildVariants}
                className="text-muted-foreground leading-relaxed"
              >
                We are committed to sustainable practices, believing that
                beautiful architecture and environmental responsibility are not
                mutually exclusive, but rather essential partners in creating
                buildings that will endure.
              </motion.p>
            </StaggerChildren>

            {/* Signature with Drawing Animation */}
            <FadeIn delay={0.6}>
              <motion.div
                className="mt-12 pt-8 border-t border-border relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Animated underline */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.p
                  className="text-2xl font-light italic mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Elena Vasquez
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Principal Architect & Founder
                </motion.p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
