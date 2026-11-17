"use client";
import { useCallback, useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { track } from "@vercel/analytics";

// Explicit opt-in: confirm the analytics plan and privacy settings before enabling custom events.
export function PerformanceObserver() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_EVENTS !== "true") return;
    const handleClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      const href = anchor?.getAttribute('href') || '';
      const channel = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : href.startsWith('https://wa.me/') ? 'whatsapp' : null;
      if (channel) { try { track('Contact link clicked', { channel }); } catch { /* Navigation remains available. */ } }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  useReportWebVitals(useCallback(metric => {
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_EVENTS !== "true") return;
    if (!["LCP", "CLS", "INP"].includes(metric.name)) return;
    try { track("Web Vital", { metric: metric.name, value: Number(metric.value.toFixed(3)), route: window.location.pathname }); } catch { /* Optional measurement only. */ }
  }, []));
  return null;
}
