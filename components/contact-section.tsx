"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, TextReveal } from "./text-reveal";
import { MagneticButton } from "./magnetic-button";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", projectType: "", message: "" });
    }, 3000);
  };

  const inputClasses =
    "bg-transparent border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/50 transition-all duration-300";

  return (
    <section id="contact" className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
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
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Email
                </p>
                <motion.a
                  href="mailto:studio@elenavasquez.com"
                  className="hover:opacity-70 transition-opacity inline-block"
                  whileHover={{ x: 5 }}
                >
                  studio@elenavasquez.com
                </motion.a>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Phone
                </p>
                <motion.a
                  href="tel:+12125551234"
                  className="hover:opacity-70 transition-opacity inline-block"
                  whileHover={{ x: 5 }}
                >
                  +1 (212) 555-1234
                </motion.a>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Address
                </p>
                <motion.p whileHover={{ x: 5 }} className="inline-block">
                  450 West 15th Street
                  <br />
                  New York, NY 10011
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Social Links with Hover Effect */}
            <motion.div
              className="flex gap-6 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {["Instagram", "LinkedIn", "Pinterest"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity relative group"
                  whileHover={{ y: -2 }}
                >
                  {social}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-px bg-primary-foreground"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Interactive Form */}
          <div>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Success Overlay */}
              <motion.div
                className="absolute inset-0 bg-primary flex items-center justify-center z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSubmitted ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isSubmitted ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary-foreground flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isSubmitted ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={isSubmitted ? { pathLength: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                  <p className="text-xl font-light">Message Sent</p>
                  <p className="text-sm opacity-70 mt-2">
                    We&apos;ll be in touch soon
                  </p>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  animate={{
                    scale: focusedField === "name" ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest opacity-50 mb-2 block"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses}
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                <motion.div
                  animate={{
                    scale: focusedField === "email" ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest opacity-50 mb-2 block"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses}
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                animate={{
                  scale: focusedField === "projectType" ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor="projectType"
                  className="text-xs uppercase tracking-widest opacity-50 mb-2 block"
                >
                  Project Type
                </label>
                <Input
                  id="projectType"
                  type="text"
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  onFocus={() => setFocusedField("projectType")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                  placeholder="Residential, Commercial, Renovation..."
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: focusedField === "message" ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest opacity-50 mb-2 block"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClasses} min-h-[150px]`}
                  placeholder="Tell us about your project..."
                  required
                />
              </motion.div>

              <MagneticButton strength={15}>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-12 relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <motion.span
                    className="relative z-10"
                    animate={{ opacity: isSubmitting ? 0 : 1 }}
                  >
                    Send Message
                  </motion.span>
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </Button>
              </MagneticButton>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
