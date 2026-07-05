"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import london from "@/assets/photos/london.png";

// Rendered by programs-view.tsx (a client component) so this stays client.
// next-intl reads locale + messages from the NextIntlClientProvider in the
// root layout — no `locale` prop needed.
export function ProgramsHero() {
  const t = useTranslations("programs.hero");
  const line2 = t("headingLine2");

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-lev-green-dark" />
        <div className="relative min-h-[200px] md:min-h-[400px] lg:min-h-full">
          <Image
            src={london}
            alt="Big Ben Clock Tower"
            fill
            className="object-cover object-top size-full"
            priority
          />
        </div>
      </div>
      <SectionWrapper className="relative grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side - Content */}
        <div className="flex items-center py-12 md:py-16 lg:py-24">
          <div className="max-w-xl space-y-6 md:space-y-8">
            <SectionTitle className="text-white">
              {t("headingLine1")}
              {line2 ? (
                <>
                  {" "}
                  <br /> {line2}
                </>
              ) : null}
            </SectionTitle>
            <p className="typography-R16 text-white/60 leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
