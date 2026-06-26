"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { BlurFade } from "./ui/blur-fade";

interface ProjectSectionsProps {
  project: Project;
}

function Img({
  src,
  alt,
  className = "",
  index = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  index?: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`overflow-hidden ${className}`}
    >
      <BlurFade>
        <Image
          src={src}
          alt={alt}
          width={1800}
          height={1200}
          priority={priority}
          className="w-full h-auto block"
        />
      </BlurFade>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
  THE ALGORITHM
  
  1. First image is always a full-bleed hero.
  2. Remaining images are consumed in chunks of 1 or 2, cycling through
     4 row shapes. The chunk size alternates: 2, 1, 2, 1 ...
     so we never get stuck with identical rows back-to-back.
  3. Every row shape uses percentage widths + a vertical offset (mt-*)
     on one side so images feel hand-placed, not grid-packed.
  4. If the last chunk is a leftover single, it gets the inset-centered treatment.
─────────────────────────────────────────────────────────────────────────────── */

type RowDef = {
  takes: 1 | 2;
  render: (a: string, b: string | undefined, title: string, i: number) => React.ReactNode;
};

const ROWS: RowDef[] = [
  // 0 — left-heavy pair: 62% + 34%, right drops down
  {
    takes: 2,
    render: (a, b, title, i) => (
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
        <div className="w-full md:w-[62%]">
          <Img src={a} alt={`${title} ${i + 1}`} index={i} />
        </div>
        <div className="w-full md:w-[34%] md:mt-24">
          <Img src={b!} alt={`${title} ${i + 2}`} index={i + 1} />
        </div>
      </div>
    ),
  },
  // 1 — inset centered single: 68%, alternates left/right
  {
    takes: 1,
    render: (a, _b, title, i) => (
      <div className={`w-full md:w-[68%] ${i % 4 === 1 ? "ml-auto" : ""}`}>
        <Img src={a} alt={`${title} ${i + 1}`} index={i} />
      </div>
    ),
  },
  // 2 — right-heavy pair: 38% left offset down + 58% right
  {
    takes: 2,
    render: (a, b, title, i) => (
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
        <div className="w-full md:w-[38%] md:mt-20">
          <Img src={a} alt={`${title} ${i + 1}`} index={i} />
        </div>
        <div className="w-full md:w-[58%]">
          <Img src={b!} alt={`${title} ${i + 2}`} index={i + 1} />
        </div>
      </div>
    ),
  },
  // 3 — inset centered single: 68%, opposite side
  {
    takes: 1,
    render: (a, _b, title, i) => (
      <div className={`w-full md:w-[68%] ${i % 4 !== 1 ? "ml-auto" : ""}`}>
        <Img src={a} alt={`${title} ${i + 1}`} index={i} />
      </div>
    ),
  },
  // 4 — near-equal pair with subtle size diff: 52% + 44%, right drops
  {
    takes: 2,
    render: (a, b, title, i) => (
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start justify-end">
        <div className="w-full md:w-[44%] md:mt-16">
          <Img src={a} alt={`${title} ${i + 1}`} index={i} />
        </div>
        <div className="w-full md:w-[52%]">
          <Img src={b!} alt={`${title} ${i + 2}`} index={i + 1} />
        </div>
      </div>
    ),
  },
];

// Consumption sequence: 2, 1, 2, 1, 2 → maps to row indices 0,1,2,3,4 cycling
const SEQUENCE = [0, 1, 2, 3, 4]; // one full cycle = 8 images consumed

function Gallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null;

  const rows: React.ReactNode[] = [];

  // Hero — always full bleed
  rows.push(
    <Img key="hero" src={images[0]} alt={`${title} hero`} index={0} priority className="w-full" />
  );

  let cursor = 1;
  let seqIndex = 0;

  while (cursor < images.length) {
    const rowDef = ROWS[SEQUENCE[seqIndex % SEQUENCE.length]];
    const a = images[cursor];
    const b = images[cursor + 1]; // may be undefined

    // If this row wants 2 but only 1 remains, render as inset single
    if (rowDef.takes === 2 && !b) {
      rows.push(
        <div key={cursor} className="mx-auto w-full md:w-[60%]">
          <Img src={a} alt={`${title} ${cursor + 1}`} index={cursor} />
        </div>
      );
      cursor += 1;
    } else {
      rows.push(
        <div key={cursor}>
          {rowDef.render(a, b, title, cursor)}
        </div>
      );
      cursor += rowDef.takes;
    }

    seqIndex++;
  }

  return <div className="space-y-6 md:space-y-12">{rows}</div>;
}

export function ProjectSections({ project }: ProjectSectionsProps) {
  const images = project.sections
  const description = project.description || "";

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-40">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">

        {/* Sidebar — sticky, shown once */}
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-3 lg:sticky lg:top-24"
        >
          <div className="space-y-8">
            <dl className="space-y-4 text-[16px] text-muted-foreground">
              {project.location && (
                <div className="flex flex-col gap-0.5">
                  <dt className="uppercase tracking-[0.2em] text-xs opacity-70">Location</dt>
                  <dd>{project.location}</dd>
                </div>
              )}
              {project.year && (
                <div className="flex flex-col gap-0.5">
                  <dt className="uppercase tracking-[0.2em] text-xs opacity-70">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.category && (
                <div className="flex flex-col gap-0.5">
                  <dt className="uppercase tracking-[0.2em] text-xs opacity-70">Type</dt>
                  <dd>{project.category}</dd>
                </div>
              )}
            </dl>

            {description && (
              <p className="text-[16px] leading-relaxed text-muted-foreground border-t border-border pt-8 whitespace-break-spaces">
                {description}
              </p>
            )}
          </div>
        </motion.aside>

        {/* Gallery */}
        <div className="lg:col-span-9">
          <Gallery images={images} title={project.title} />
        </div>

      </div>
    </div>
  );
}