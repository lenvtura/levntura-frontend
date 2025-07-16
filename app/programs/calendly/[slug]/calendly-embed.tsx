"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/helpers/track-event";

const calendlyEvents = {
  "calendly.event_scheduled"() {
    trackEvent({
      action: "Calendly Event Scheduled",
      category: "Calendly",
      label: "Event Scheduled",
    });
  },
  "calendly.event_type_viewed"() {
    trackEvent({
      action: "Calendly Event Viewed",
      category: "Calendly",
      label: "Event Type Viewed",
    });
  },
  "calendly.date_and_time_selected"() {
    trackEvent({
      action: "Calendly Date and Time Selected",
      category: "Calendly",
      label: "Date and Time Selected",
    });
  },
};

export function CalendlyEmbed({ url }: { url?: string }) {
  useEffect(() => {
    const handleAllMessages = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com") {
        const eventKey = e.data.event as keyof typeof calendlyEvents;
        const sendCalendlyEvent = calendlyEvents[eventKey];
        sendCalendlyEvent?.();
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
