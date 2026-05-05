"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ImageReveal } from "./image-reveal";
import { SplitText } from "./split-text";

export function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              Our Philosophy
            </motion.p>

            <h2 className="mt-6 text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <SplitText text="We believe architecture" delay={0.1} />
              <span className="block mt-2 italic text-muted-foreground">
                <SplitText text="shapes human experience" delay={0.3} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Every space tells a story. We approach each project as a unique
              narrative, weaving together context, culture, and craft to create
              buildings that resonate with their inhabitants and surroundings.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Our work is guided by three principles: innovation in form,
              responsibility to environment, and dedication to the human scale.
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <p className="text-lg font-light italic">Elena Vasquez</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Founder & Principal Architect
              </p>
            </motion.div>
          </div>

          {/* Image Grid */}
          <div className="relative h-[600px] lg:h-auto">
            <motion.div
              style={{ y: y1 }}
              className="absolute left-0 top-0 h-[350px] w-[60%] md:h-[400px]"
            >
              <ImageReveal
                src="/images/project-3.jpg"
                alt="Interior design"
                containerClassName="h-full w-full"
              />
            </motion.div>

            <motion.div
              style={{ y: y2, rotate }}
              className="absolute bottom-0 right-0 h-[300px] w-[55%] md:h-[350px]"
            >
              <ImageReveal
                src="/images/project-4.jpg"
                alt="Architecture detail"
                containerClassName="h-full w-full"
                delay={0.2}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -right-4 top-1/2 h-24 w-24 border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
