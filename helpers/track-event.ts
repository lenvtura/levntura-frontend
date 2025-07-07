"use client";

import { sendGAEvent as sendGA } from "@next/third-parties/google";

export type GaEventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: GaEventProps) => {
  sendGA("event", `${category} - ${action}`, {
    ...(category && { event_category: category }),
    ...(label && { event_label: label }),
    ...(value && { value }),
  });
};
