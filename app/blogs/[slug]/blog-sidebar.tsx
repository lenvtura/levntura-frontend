"use client";

import { useEffect, useState } from "react";
import { cn } from "@/design-system/helpers";

interface BlogSidebarProps {
  sections: Array<{ id: string; title: string }>;
}

export function BlogSidebar({ sections }: BlogSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: [0, 0.1, 0.5],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));

    // Fallback: Update active section on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
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
              : "text-lev-gray hover:text-lev-black",
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
