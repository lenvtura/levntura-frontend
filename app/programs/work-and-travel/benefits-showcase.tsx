import { SectionTitle } from "@/app/(home)/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { cn } from "@/design-system/helpers";

const benefits = [
  "30-day traveltime after program ends",
  "Housing accommodation",
  "Health insurance coverage",
  "Job offers in your preferred field",
  'Work permit "DS-2019"',
  "Social Security number",
];

export function BenefitsShowcase() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUpAnimator>
            <SectionTitle className="mb-4">
              <span className="text-lev-blue-dark">AN </span>
              <span className="text-lev-blue">AMAZING</span>
              <br />
              <span className="text-lev-blue">EXPERINCE </span>
              <span className="text-lev-blue-dark">AND</span>
              <br />
              <span className="text-lev-blue-dark">YET YOU WILL GET</span>
            </SectionTitle>
          </FadeUpAnimator>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <FadeUpAnimator
              transition={{ delay: idx * 0.2 }}
              key={idx}
              className="flex flex-col gap-6"
            >
              <div
                className={cn(
                  "border h-[100px] sm:h-[150px] text-lev-blue-dark flex justify-center items-center border-lev-blue rounded-full p-8 text-center",
                  idx === 1 && "lg:rounded-ee-none",
                  idx === 4 && "lg:rounded-ss-none"
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
