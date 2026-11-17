"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
    margin: "-50px",
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const reducedMotion = useReducedMotion();

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (isInView && !hasStarted && !reducedMotion) {
      setHasStarted(true);
      spring.set(value);
    }
  }, [isInView, hasStarted, spring, value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{reducedMotion ? value : displayValue}{suffix}</span>
    </span>
  );
}
