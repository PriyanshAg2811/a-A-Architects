"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./magnetic-button";
import { TextReveal, FadeIn } from "./text-reveal";
import { contactData } from "@/lib/contact";

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
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <motion.div
          style={{ scale: imageScale }}
          className="relative w-full h-full bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-[url('/images/hero/hero-light.png')] dark:bg-[url('/images/hero/hero-dark.png')] bg-cover bg-center" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

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
                Designing Spaces That{" "}
                <span className="block italic font-normal">Inspire</span>
              </h1>
            </TextReveal>
          </div>

          <FadeIn delay={0.4}>
            <p className="text-lg mb-8 max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] text-foreground dark:text-slate-200">
              An architecture and design studio in Lucknow delivering bespoke residential,
              commercial, institutional, hospitality, and interior projects
              through thoughtful, client-focused design. We craft environments
              that harmonize form, function, and nature.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <Button asChild size="lg" className="px-8">
                  <a href={`tel:${contactData.phone[0].replace(/\s/g, "")}`}>
                    Call {contactData.phone[0]}
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link href="/projects">View Projects</Link>
                </Button>
              </MagneticButton>
              <Link href="/contact" className="self-start sm:self-center text-sm underline underline-offset-4">
                Get in Touch
              </Link>
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
