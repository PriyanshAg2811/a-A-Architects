import Link from "next/link";
import { FadeIn, TextReveal } from "./text-reveal";
import { services } from "@/lib/services";

export function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="services" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <FadeIn><p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Services</p></FadeIn>
          <TextReveal><Heading className="text-3xl md:text-4xl font-light mb-6">Architecture &amp; Design Services</Heading></TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">Whether you&apos;re planning a home, shaping a workplace, or rethinking an existing space, we can help you work through the design decisions that matter to your project. From our studio in Gomti Nagar, Lucknow, we work with clients across Uttar Pradesh and throughout India.</p>
          </FadeIn>
        </div>
        <div className="space-y-px bg-border whitespace-pre-line">
          {services.map(service => (
            <article key={service.number} id={`service-${service.number}`} className="bg-card p-6 md:p-8">
              <details name="architecture-services" className="group service-disclosure">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground [&::-webkit-details-marker]:hidden">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-4">
                      <span className="text-md text-accent font-mono">{service.number}</span>
                      <h3 className="text-2xl font-medium">{service.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed ml-12">{service.description}</p>
                  </div>
                  <span aria-hidden="true" className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="ml-12 mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-foreground leading-relaxed">{service.expanded}</p>
                  <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 mt-2 text-sm text-accent underline underline-offset-4">Learn more<span className="sr-only"> about {service.title}</span><span aria-hidden="true">→</span></Link>
                </div>
              </details>
              {service.project && <Link href={`/projects/${service.project.slug}`} className="inline-block ml-12 mt-3 text-sm underline underline-offset-4">{service.project.label}</Link>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
