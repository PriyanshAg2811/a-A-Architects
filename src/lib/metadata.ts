import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string, image = "/images/hero/hero-light-1672.webp"): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "a+A Architects", images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
