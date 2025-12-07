"use client";

import { useEffect, useState } from "react";
import { cn } from "@/design-system/helpers";

interface BlogSidebarProps {
  sections: Array<{ id: string; title: string }>;
}

export function BlogSidebar({ sections }: BlogSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observers = sections.map((section) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        });
      }, observerOptions);

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={cn(
            "block text-left w-full px-3 py-2 text-sm transition-colors",
            activeSection === section.id
              ? "text-lev-black font-semibold"
              : "text-lev-gray hover:text-lev-black"
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
