import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

// Change only when page content or its presentation materially changes, never on each request/build.
const lastModified = "2026-11-17";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/services", "/contact", ...projects.map(project => `/projects/${project.slug}`)];
  return routes.map(path => ({ url: `https://www.aplusa-architects.com${path || "/"}`, lastModified }));
}
