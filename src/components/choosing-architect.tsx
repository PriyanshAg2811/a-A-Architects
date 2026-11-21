import Link from "next/link";

export function ChoosingArchitect() {
  return (
    <section aria-labelledby="choosing-architect" className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl border-t border-border pt-10">
        <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">Finding the right studio</p>
        <h2 id="choosing-architect" className="max-w-3xl text-3xl font-light md:text-4xl">
          Choosing an architect in Lucknow
        </h2>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
          When comparing the best architects in Lucknow for your project, look for a
          studio whose work, approach and scope suit what you want to build. Review
          relevant projects, discuss your budget and ask how drawings, approvals,
          design revisions and site coordination will be handled.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium">Explore work close to your brief</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Our Lucknow portfolio includes homes and interiors across the city.
              Explore Serenity Edge Residence in Indira Nagar, Maison Blanche in
              Gomti Nagar and Curated Spaces in Vikalp Khand to see examples of our work.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/projects/serenity-edge-residence" className="underline underline-offset-4">Serenity Edge Residence</Link></li>
              <li><Link href="/projects/maison-blanche" className="underline underline-offset-4">Maison Blanche</Link></li>
              <li><Link href="/projects/curated-spaces" className="underline underline-offset-4">Curated Spaces</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium">Start with a clear scope</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Bring your site location, approximate area and priorities to the first
              conversation. Ask for a written scope covering deliverables, fees,
              exclusions and responsibilities before appointing a studio. Our
              Gomtinagar studio offers architecture, planning, consultancy, map
              approval assistance, facade design, interiors and 3D visualization,
              with services available across Uttar Pradesh and India.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/services" className="underline underline-offset-4">Explore our services</Link>
              <Link href="/contact" className="underline underline-offset-4">Discuss your brief</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
