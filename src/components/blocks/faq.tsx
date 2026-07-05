"use client";

import { useState } from "react";
import type { Block } from "@/lib/types";
import { cn } from "@/design-system/helpers";
import { ChevronDown } from "lucide-react";
import { RichTextBlock } from "./rich-text";

interface FAQItem {
  question: string;
  answer: unknown;
  id?: string;
}

interface FAQBlockProps {
  block: Block & {
    heading?: string;
    subheading?: string;
    items?: FAQItem[];
  };
}

export function FAQBlock({ block }: FAQBlockProps) {
  const items = block.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="my-12 lg:my-16">
      <div className="container-md">
        {(block.heading || block.subheading) && (
          <div className="mb-8 text-center">
            {block.heading && (
              <h2 className="typography-EB24 lg:typography-EB32 text-lev-green-dark mb-2">
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className="typography-R16 text-lev-gray max-w-2xl mx-auto">
                {block.subheading}
              </p>
            )}
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => (
            <FAQAccordionItem key={item.id ?? i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-black/10 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-4 lg:p-5 text-left hover:bg-lev-gray-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="typography-S16 lg:typography-S18 text-lev-black">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 shrink-0 text-lev-green-dark transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="px-4 lg:px-5 pb-5 pt-1 text-lev-black/80">
          <RichTextBlock block={{ blockType: "richText", content: item.answer }} />
        </div>
      )}
    </div>
  );
}
