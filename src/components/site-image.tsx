"use client";

import Image, { type ImageProps, type ImageLoaderProps } from "next/image";

function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return src.replace('/image/upload/', `/image/upload/f_auto,q_${quality ?? 80},c_limit,w_${width}/`);
}

/** Use the existing image CDN directly; preserve originals and avoid double optimization. */
export function SiteImage(props: ImageProps) {
  const remote = typeof props.src === "string" && props.src.startsWith("https://res.cloudinary.com/dhnxyhcwv/image/upload/");
  return <Image {...props} alt={props.alt} quality={props.quality ?? 80} loader={remote ? cloudinaryLoader : undefined} />;
}
