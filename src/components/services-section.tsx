"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, TextReveal } from "./text-reveal";
import { services } from "../lib/services";

export function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="services" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Services
            </p>
          </FadeIn>
          <TextReveal>
            <Heading className="text-3xl md:text-4xl font-light mb-6">
              Architecture &amp; Design Services
            </Heading>
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're planning a home, shaping a workplace, or rethinking
              an existing space, we can help you work through the design decisions
              that matter to your project. From our studio in Gomti Nagar, Lucknow,
              we work with clients across Uttar Pradesh and throughout India.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid - Accordion Style */}
        <div className="space-y-px bg-border whitespace-pre-line">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isExpanded={expandedService === service.number}
              onToggle={() =>
                setExpandedService(
                  expandedService === service.number ? null : service.number
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, index, isExpanded, onToggle }: ServiceCardProps) {
  return (
    <motion.article
      id={`service-${service.number}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-card"
    >
      <motion.div
        className="p-6 md:p-8 cursor-pointer group"
        onClick={onToggle}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              <motion.span
                className="text-md text-accent font-mono"
                animate={{ scale: isExpanded ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {service.number}
              </motion.span>
              <motion.h3
                className="text-2xl font-medium"
                animate={{ x: isExpanded ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {service.title}
              </motion.h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed ml-12">
              {service.description}
            </p>
            {service.project && (
              <Link
                href={`/projects/${service.project.slug}`}
                className="inline-block ml-12 mt-3 text-sm underline underline-offset-4"
                onClick={(event) => event.stopPropagation()}
              >
                {service.project.label}
              </Link>
            )}

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    className="text-sm text-foreground leading-relaxed ml-12 mt-4 pt-4 border-t border-border"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {service.expanded}
                  </motion.p>

                  {/* CTA */}
                  <motion.div
                    className="ml-12 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Link href="/contact" className="inline-flex items-center gap-2">
                        Learn more
                        <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Icon */}
          <motion.div
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border"
            animate={{
              rotate: isExpanded ? 45 : 0,
              borderColor: isExpanded ? "var(--accent)" : "var(--border)",
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}
