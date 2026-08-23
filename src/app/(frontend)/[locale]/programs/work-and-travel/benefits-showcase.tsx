import { ReactNode } from "react";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { cn } from "@/design-system/helpers";

interface BenefitsShowcaseProps {
  title: ReactNode;
  items: string[];
}

export function BenefitsShowcase({ title, items }: BenefitsShowcaseProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <FadeUpAnimator>
            <SectionTitle className="mb-4">{title}</SectionTitle>
          </FadeUpAnimator>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((benefit, idx) => (
            <FadeUpAnimator
              transition={{ delay: idx * 0.2 }}
              key={idx}
              className="flex flex-col gap-6"
            >
              <div
                className={cn(
                  "border h-[100px] sm:h-[150px] text-lev-blue-dark flex justify-center items-center border-lev-blue rounded-full p-8 text-center",
                  idx === 1 && "lg:rounded-ee-none",
                  idx === 4 && "lg:rounded-ss-none",
                )}
              >
                <p className="typography-R34 text-[24px] sm:text-[32px] leading-9">
                  {benefit}
                </p>
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      </div>
    </div>
  );
}
