"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
}

export function ImageReveal({
  src,
  alt,
  className,
  containerClassName,
  delay = 0,
}: ImageRevealProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
        className="absolute inset-0 z-10 origin-top bg-foreground"
      />
      <motion.div
        initial={{ scale: 1.4 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
        />
      </motion.div>
    </div>
  );
}
