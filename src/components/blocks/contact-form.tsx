// Server component — `SocialShareIcons` reads `next/headers` for
// country-aware social links. Interactive form bits live in DynamicForm.

import { Suspense } from "react";
import { MapPinIcon } from "lucide-react";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import type {
  CmsForm,
  ContactFormBgColor,
  ContactFormBlock as ContactFormBlockData,
} from "@/lib/types";

import { DynamicForm } from "./contact-form-client";

const BG_CLASS: Record<ContactFormBgColor, string> = {
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-black": "bg-lev-black",
  "lev-green-dark": "bg-lev-green-dark",
  "lev-red-dark": "bg-lev-red-dark",
};

interface ContactFormBlockProps {
  block: ContactFormBlockData;
}

export function ContactFormBlock({ block }: ContactFormBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-blue-dark"];
  const showSocials = block.showSocials ?? true;
  const form = typeof block.form === "object" ? (block.form as CmsForm) : null;

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="overflow-visible min-h-screen flex-col sm:flex-row items-center flex gap-4 flex-wrap"
    >
      <div className="space-y-12 flex-1">
        <article>
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h1 className="typography-EB74 text-white leading-16">
              <HighlightedHeading
                text={block.heading}
                highlight={block.highlightedWord}
              />
            </h1>
          </FadeUpAnimator>
        </article>

        {showSocials && (
          <article className="text-white flex flex-col gap-4 ml-12 -mt-4 self-end">
            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <h6 className="typography-R14">
                {block.socialsLabel ?? "OUR SOCIALS"}
              </h6>
            </FadeUpAnimator>
            <Suspense fallback={<div>Loading...</div>}>
              <SocialShareIcons variant="white-border" className="gap-4" />
            </Suspense>
          </article>
        )}
      </div>

      <div className="flex flex-col translate-y-[200px] border-b sm:border-none sm:translate-y-0 items-center gap-12 flex-1">
        <MapPinIcon className="text-lev-blue-light" size={100} />
        {form ? (
          <DynamicForm form={form} />
        ) : (
          <div className="bg-white p-6 text-lev-black/60 max-w-md w-full text-center">
            No form selected. Pick one in admin → ContactForm block.
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function HighlightedHeading({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {highlight && line.includes(highlight) ? (
            <>
              {line.split(highlight)[0]}
              <span className="text-lev-blue-light">{highlight}</span>
              {line.split(highlight).slice(1).join(highlight)}
            </>
          ) : (
            line
          )}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
