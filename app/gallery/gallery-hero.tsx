import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "../(home)/section-wrapper";
import { SectionTitle } from "../(home)/section-title";

export function GalleryHero() {
  return (
    <SectionWrapper className="py-30">
      <FadeUpAnimator>
        <SectionTitle className="text-white mb-8 text-center">
          <span className="text-lev-red-dark">WE ARE</span>{" "}
          <span className="text-lev-red">CREATING</span>
          <br />
          <span className="text-lev-red">MEMORIES,</span>{" "}
          <span className="text-lev-red-dark">ARE</span>
          <br />
          <span className="text-lev-red-dark">YOU JOINING?</span>
        </SectionTitle>
      </FadeUpAnimator>

      <FadeUpAnimator className="text-lev-gray leading-relaxed max-w-3xl mx-auto text-center">
        At Levntura, we&apos;re here to guide you every step of the way on your
        journey of discovery. Whether you have questions about our programs,
        want to share feedback, or simply want to say hello, we&apos;d love to
        hear from you. Get in touch with us using any of the following methods:
      </FadeUpAnimator>
    </SectionWrapper>
  );
}
