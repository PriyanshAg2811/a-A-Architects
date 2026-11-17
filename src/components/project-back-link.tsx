"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectCategory } from "@/lib/projects";

export function ProjectBackLink() {
  const [href, setHref] = useState("/projects");
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) setHref(`/projects?category=${encodeURIComponent(category)}`);
  }, []);
  return <Link href={href} className="text-sm uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition">Back to projects</Link>;
}
