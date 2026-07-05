"use client";

import { useTranslations } from "next-intl";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";

// Rendered by blogs-client.tsx (a client component) so this stays client too.
// next-intl reads the active locale from the NextIntlClientProvider rehydrated
// in the root layout — no prop drilling needed.
export function BlogsHeader() {
  const t = useTranslations("blogs");

  return (
    <SectionWrapper className="py-12 lg:py-16 text-center">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <SectionTitle className="text-lev-black mb-6">
          {t("heading")}
        </SectionTitle>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="text-lev-gray max-w-[900px] mx-auto leading-relaxed">
          {t("intro")}
        </p>
      </FadeUpAnimator>
    </SectionWrapper>
  );
}
