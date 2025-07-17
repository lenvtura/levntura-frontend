"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/helpers/track-event";
import { usePathname, useRouter } from "next/navigation";

const calendlyEvents = {
  "calendly.event_scheduled"({
    setQuery,
    label,
  }: {
    setQuery: (url: string) => void;
    label: string;
  }) {
    trackEvent({
      action: "Calendly Event Scheduled",
      category: "Calendly",
      label,
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "calendly_event_scheduled",
      calendlyLabel: label,
      calendlyCategory: "Calendly",
      calendlyAction: "Calendly Event Scheduled",
    });
    setQuery(`status=scheduled`);
  },
  "calendly.event_type_viewed"({
    setQuery,
    label,
  }: {
    setQuery: (url: string) => void;
    label: string;
  }) {
    trackEvent({
      action: "Calendly Event Viewed",
      category: "Calendly",
      label,
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "calendly_event_viewed",
      calendlyLabel: label,
      calendlyCategory: "Calendly",
      calendlyAction: "Calendly Event Viewed",
    });
  },
  "calendly.date_and_time_selected"({
    setQuery,
    label,
  }: {
    setQuery: (url: string) => void;
    label: string;
  }) {
    trackEvent({
      action: "Calendly Date and Time Selected",
      category: "Calendly",
      label,
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "calendly_event_date_and_time_selected",
      calendlyLabel: label,
      calendlyCategory: "Calendly",
      calendlyAction: "Date and Time Selected",
    });
    setQuery(`status=date_selected`);
  },
};

export function CalendlyEmbed({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const setQuery = (query: string) => {
    router.push(`${pathname}?${query}`);
  };

  useEffect(() => {
    const handleAllMessages = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com") {
        const eventKey = e.data.event as keyof typeof calendlyEvents;
        const sendCalendlyEvent = calendlyEvents[eventKey];
        sendCalendlyEvent?.({ setQuery, label });
      }
    };

    window.addEventListener("message", handleAllMessages);

    return () => {
      window.removeEventListener("message", handleAllMessages);
    };
  }, [label]);

  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </>
  );
}
