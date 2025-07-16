"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/helpers/track-event";

const calendlyEvents = {
  "calendly.event_scheduled"({ label }: { label: string }) {
    trackEvent({
      action: "Calendly Event Scheduled",
      category: "Calendly",
      label,
    });
  },
  "calendly.event_type_viewed"({ label }: { label: string }) {
    trackEvent({
      action: "Calendly Event Viewed",
      category: "Calendly",
      label,
    });
  },
  "calendly.date_and_time_selected"({ label }: { label: string }) {
    trackEvent({
      action: "Calendly Date and Time Selected",
      category: "Calendly",
      label,
    });
  },
};

export function CalendlyEmbed({ url, label }: { url: string; label: string }) {
  useEffect(() => {
    const handleAllMessages = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com") {
        const eventKey = e.data.event as keyof typeof calendlyEvents;
        const sendCalendlyEvent = calendlyEvents[eventKey];
        sendCalendlyEvent?.({ label });
      }
    };

    window.addEventListener("message", handleAllMessages);

    return () => {
      window.removeEventListener("message", handleAllMessages);
    };
  }, []);

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
