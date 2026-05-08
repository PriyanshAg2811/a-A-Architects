"use client";

import { FormEvent, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, TextReveal } from "./text-reveal";
import { RippleButton } from "./ui/ripple-button";
import { NoiseTexture } from "./ui/noise-texture";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const inputClasses =
    "bg-transparent border-border text-foreground placeholder:text-foreground/50 focus-visible:ring-foreground/25 transition-all duration-300";

  return (
    <section id="contact" className="py-24 md:py-32 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <FadeIn>
              <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
                Contact
              </p>
            </FadeIn>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-balance">
                Let&apos;s discuss your project.
              </h2>
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="opacity-70 leading-relaxed mb-12 max-w-md">
                Whether you have a specific project in mind or simply want to
                explore possibilities, we&apos;d love to hear from you.
              </p>
            </FadeIn>

            {/* Contact Info with Staggered Animation */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Email
                </p>
                <a
                  href="mailto:studio@elenavasquez.com"
                  className="hover:opacity-70 transition-opacity inline-block"
                >
                  studio@elenavasquez.com
                </a>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Phone
                </p>
                <a
                  href="tel:+12125551234"
                  className="hover:opacity-70 transition-opacity inline-block"
                >
                  +1 (212) 555-1234
                </a>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Address
                </p>
                <p className="inline-block">
                  450 West 15th Street
                  <br />
                  New York, NY 10011
                </p>
              </motion.div>

            {/* Social Links with Hover Effect */}
            <motion.div
              className="flex gap-6 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity relative group"
                whileHover={{ y: -2 }}
              >
                 <img src="/instagram-svgrepo-com.svg" alt="Instagram" className="w-5 h-5 dark:invert md:w-7 md:h-7" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity relative group"
                whileHover={{ y: -2 }}
              >
                 <img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-5 h-5 dark:invert md:w-7 md:h-7" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity relative group"
                whileHover={{ y: -2 }}
              >
                 <img src="/twitter-154-svgrepo-com.svg" alt="Twitter" className="w-5 h-5 dark:invert md:w-7 md:h-7" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Interactive Form */}
          <div>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative rounded-4xl border border-border/50 bg-background/90 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            >
              {isSubmitted && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-4xl bg-primary/90 text-center text-foreground">
                  <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 bg-background/90">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold">Message Sent</p>
                    <p className="text-sm opacity-80">We’ll be in touch soon.</p>
                  </div>
                </div>
              )}

              <NoiseTexture className="rounded-4xl"/>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block">
                    Full name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={inputClasses}
                    placeholder="Manu Arora"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClasses}
                    placeholder="support@aceternity.com"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="company" className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClasses}
                  placeholder="Aceternity Labs LLC"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClasses} min-h-37.5`}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Ready to collaborate?
                </p>
                <RippleButton type="submit" className="px-10" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit"}
                </RippleButton>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
