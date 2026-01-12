import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { GalleryForm } from "./gallery-form";
import { SectionWrapper } from "../(home)/section-wrapper";
import { SectionTitle } from "../(home)/section-title";

export function GalleryCTASection() {
  return (
    <SectionWrapper className="py-16 container-md lg:py-24 relative">
      {/* Subtle map pattern background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at center, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left Section - Headline */}
          <div className="flex items-center">
            <FadeUpAnimator>
              <SectionTitle className="text-lev-red-dark max-w-[300px]">
                <span>
                  HELLO! LETS <span className="text-lev-red">START</span> FRESH
                  & NEW
                </span>
              </SectionTitle>
            </FadeUpAnimator>
          </div>

          {/* Right Section - Form */}
          <div className="bg-gray-100 p-8 lg:p-12 max-w-[400px]">
            <FadeUpAnimator className="flex flex-col gap-6">
              <h3 className="typography-S34 uppercase text-lev-black mb-4">
                LITTLE EFFORT, ULTIMATE EXPERIENCE.
              </h3>

              <GalleryForm />
            </FadeUpAnimator>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
