"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { trackEvent } from "@/helpers/track-event";
import { Loader2 } from "lucide-react";
import { cn } from "@/design-system/helpers";
import { Button } from "@/design-system/button";

export function CalendlyEmbed({ url, label }: { url: string; label: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisplayed, setIsBtnDisplayed] = useState(true);

  const calendlyEvents = {
    "calendly.event_scheduled"() {
      trackEvent({
        action: "Calendly Event Scheduled",
        category: "Calendly",
        label,
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        calendlyAction: "Calendly Event Scheduled",
      });
    },

    "calendly.event_type_viewed"() {
      trackEvent({
        action: "Calendly Event Viewed",
        category: "Calendly",
        label,
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "calendly_event_viewed",
        calendlyAction: "Calendly Event Viewed",
      });
      setIsLoading(false);
    },

    "calendly.date_and_time_selected"() {
      trackEvent({
        action: "Calendly Date and Time Selected",
        category: "Calendly",
        label,
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "calendly_event_date_and_time_selected",
        calendlyAction: "Date and Time Selected",
      });
    },
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCalendly = () => {
    window.dataLayer?.push({
      calendlyAction: "BookAppointment CTA - Clicked",
    });
    setIsBtnDisplayed(false);
    setIsLoading(true);
    window.Calendly?.initInlineWidget({
      url,
      parentElement: document.getElementById("calendly-embed"),
    });
    trackEvent({
      action: "Calendly Opened",
      category: "Calendly",
      label,
    });
  };

  if (url !== "https://calendly.com/levntura/wat-2024-jordan-clone") {
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

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center mt-4 text-blue-950">
          <Loader2 className="animate-spin text-blue-700" size={32} />
        </div>
      )}
      <div
        className={cn(!isBtnDisplayed && "h-[700px]")}
        id="calendly-embed"
      ></div>

      {isBtnDisplayed && (
        <div className="flex justify-center items-center w-full mt-4 ">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            size="lg"
            onClick={openCalendly}
          >
            Book Appointment
          </Button>
        </div>
      )}

      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        defer
      />
    </>
  );
}
