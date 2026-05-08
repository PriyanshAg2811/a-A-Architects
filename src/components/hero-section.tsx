"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./magnetic-button";
import { TextReveal, FadeIn } from "./text-reveal";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <motion.div style={{ scale: imageScale }} className="w-full h-full">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Modern architectural design"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute left-1/4 top-0 bottom-0 w-px bg-foreground/5"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/5"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute left-3/4 top-0 bottom-0 w-px bg-foreground/5"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl">
          <FadeIn delay={0.1}>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Architecture & Design Studio
            </p>
          </FadeIn>

          <div className="mb-6">
            <TextReveal delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
                Designing Spaces That
              </h1>
            </TextReveal>
            <TextReveal delay={0.3}>
              <span className="text-4xl md:text-6xl lg:text-7xl italic font-normal">
                Inspire
              </span>
            </TextReveal>
          </div>

          <FadeIn delay={0.4}>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Award-winning architectural practice specializing in modern
              residential and commercial design. We craft environments that
              harmonize form, function, and nature.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <Button size="lg" className="px-8 group">
                  <span>View Projects</span>
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    &rarr;
                  </motion.span>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" size="lg" className="px-8">
                  Get in Touch
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </motion.div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}
