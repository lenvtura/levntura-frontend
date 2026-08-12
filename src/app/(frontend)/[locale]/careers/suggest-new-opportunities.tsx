"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Link } from "@/i18n/navigation";
import studentPhoto from "@/assets/photos/students.png";
import { LeventuraSymbolLogo } from "@/atoms/logo";
import { FormModal } from "@/components/form-modal";
import type { CmsForm } from "@/lib/types";

export function SuggestNewOpportunities({ form }: { form?: CmsForm | null }) {
  const t = useTranslations("internship");
  return (
    <div className="flex group flex-col lg:flex-row h-[300px] overflow-hidden lg:h-[500px] relative">
      {/* Image — anchored to the inline-start so on hover it shrinks toward the
          start and reveals the text panel at the inline-end. Logical props keep
          the reveal working in RTL (Arabic) too. */}
      <div className="absolute inset-y-0 start-0 w-full overflow-hidden hidden lg:block transition-all duration-500 ease-in-out z-[100] group-hover:lg:w-[70%]">
        <div className="absolute inset-0">
          <Image
            src={studentPhoto}
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      </div>

      {/* Right section - Text and Button */}
      <div className="relative lg:ms-auto lg:w-[30%] flex flex-col justify-center items-center h-full">
        <LeventuraSymbolLogo
          className="absolute top-0 opacity-10 -right-1/2 -translate-x-1/2  size-[500px] group-hover:scale-105 group-hover:rotate-90 transition-all duration-500"
          width={500}
          height={500}
        />
        <div className="relative flex flex-col items-center justify-center z-10 text-center lg:text-left w-full">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h2 className="typography-EB34 text-center lg:typography-EB48 uppercase text-lev-black mb-8 leading-tight max-w-[280px]">
              {t("suggest.title")}
            </h2>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.2 }}>
            {form ? (
              <FormModal
                form={form}
                title={form.title ?? t("suggest.title")}
                trigger={
                  <Button className="border-lev-black text-lev-black hover:bg-lev-black hover:text-white w-full lg:w-auto px-8">
                    {t("suggest.button")}
                  </Button>
                }
              />
            ) : (
              <Button
                asChild
                className="border-lev-black text-lev-black hover:bg-lev-black hover:text-white w-full lg:w-auto px-8"
              >
                <Link href="#">{t("suggest.button")}</Link>
              </Button>
            )}
          </FadeUpAnimator>
        </div>
      </div>
    </div>
  );
}
