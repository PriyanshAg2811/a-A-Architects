"use client";
import { track } from "@vercel/analytics";

export function trackEnquiry() {
  try {
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_EVENTS === "true") track("Enquiry submitted");
  } catch { /* Analytics must never change a successful enquiry into a form error. */ }
}
