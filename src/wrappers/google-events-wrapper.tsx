"use client";

import { GaEventProps, trackEvent } from "@/helpers/track-event";
import type { ComponentProps } from "react";

export function GoogleEventsWrapper({
  action,
  category,
  label,
  value,
  ...props
}: GaEventProps & ComponentProps<"div">) {
  return (
    <div
      onClick={() => trackEvent({ action, category, label, value })}
      {...props}
    />
  );
}
