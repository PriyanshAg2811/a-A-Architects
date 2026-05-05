"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:2rem] gap-[var(--gap)]",
        pauseOnHover && "[&:hover_.marquee-content]:pause",
        className
      )}
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="marquee-content flex shrink-0 gap-[var(--gap)] items-center"
          animate={{
            x: direction === "left" ? [0, "-100%"] : ["-100%", 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
