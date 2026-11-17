"use client";

import { FormEvent, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, TextReveal } from "./text-reveal";
import { RippleButton } from "./ui/ripple-button";
import { NoiseTexture } from "./ui/noise-texture";
import { contactData, contactServiceOptions } from "@/lib/contact";
import { toast } from "sonner";

interface ContactSectionProps {
  compact?: boolean;
}

export function ContactSection({ compact = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const fullName = formData.fullName.trim();
    const message = formData.message.trim();

    if (!fullName) {
      setSubmitError("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    if (!phone) {
      setSubmitError("Please enter your phone number.");
      setIsSubmitting(false);
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!/^[0-9+\-().\s]{7,25}$/.test(phone) || phone.replace(/[^0-9]/g, "").length < 7) {
      setSubmitError("Please enter a valid phone number.");
      setIsSubmitting(false);
      return;
    }

    const contactPromise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email: email || undefined,
        phone,
        service: formData.service || undefined,
        message,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Failed to send your message.");
      }
      return response;
    });

    try {
      toast.promise(contactPromise, {
        loading: "Sending your message...",
        success: "Message sent successfully.",
        error: (err) =>
          err instanceof Error ? err.message : "Failed to send your message.",
      });

      await contactPromise;
      setFormData({ fullName: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send your message.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "bg-transparent border-border text-foreground placeholder:text-foreground/50 focus-visible:ring-foreground/25 transition-all duration-300";

  return (
    <section
      id="contact"
      className={`${compact ? "py-20 md:py-24" : "py-24 md:py-32"} bg-background text-foreground overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${compact ? "gap-12 lg:gap-16" : "gap-16 lg:gap-24"}`}>
          <div>
            <FadeIn>
              <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
                Contact Us
              </p>
            </FadeIn>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-balance">
                {contactData.heading}
              </h2>
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className={`opacity-70 leading-relaxed ${compact ? "mb-8" : "mb-12"} max-w-md`}>
                {contactData.description}
              </p>
            </FadeIn>

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
              <div>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${contactData.email}`}
                  className="inline-block underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
                >
                  {contactData.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Phone
                </p>
                <div>
                  {contactData.phone.map((phoneNumber, index) => (
                    <span key={phoneNumber}>
                      <a
                        href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                        className="underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
                      >
                        {phoneNumber}
                      </a>

                      {index < contactData.phone.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Address
                </p>
                <p className="inline-block">
                  {contactData.address.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < contactData.address.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-6 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {contactData.socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="hover:opacity-70 transition-opacity relative group"
                  whileHover={{ y: -2 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-5 h-5 dark:invert md:w-7 md:h-7"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`relative rounded-4xl border border-border/50 bg-background/90 ${compact ? "p-6 sm:p-8" : "p-8"} shadow-[0_30px_120px_rgba(0,0,0,0.12)]`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: 0.1,
              }}
            >
              <NoiseTexture className="rounded-4xl" />

              <div className={`grid gap-${compact ? "5" : "6"} sm:grid-cols-2`}>
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block"
                  >
                    Full name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Optional email"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="phone"
                  className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Required phone number"
                  required
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="service"
                  className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block"
                >
                  Service interested in
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className={`${inputClasses} w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2`}
                >
                  <option value="" className="bg-background text-foreground">Select a service (optional)</option>
                  {contactServiceOptions.map((service) => (
                    <option key={service} value={service} className="bg-background text-foreground">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2 block"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClasses} min-h-37.5`}
                  placeholder="Tell us about your project... (optional)"
                />
              </div>

              <div className={`mt-8 flex flex-col items-start gap-${compact ? "3" : "4"} sm:flex-row sm:items-center sm:justify-between`}>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    {/* Ready to collaborate? */}
                  </p>
                  {submitError ? (
                    <p className="mt-2 text-sm text-destructive">{submitError}</p>
                  ) : null}
                </div>
                <RippleButton
                  type="submit"
                  className="px-10"
                  disabled={isSubmitting}
                >
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
