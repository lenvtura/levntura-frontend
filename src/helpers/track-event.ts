"use client";

// GA gtag.js is loaded via SiteSettings.headCode (raw <script>). It listens
// to window.dataLayer.push() — we don't need @next/third-parties for events.

export type GaEventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: GaEventProps) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `${category} - ${action}`,
    event_category: category,
    ...(label && { event_label: label }),
    ...(value && { value }),
  });
};
