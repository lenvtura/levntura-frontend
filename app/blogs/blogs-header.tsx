import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "../(home)/section-wrapper";
import { SectionTitle } from "../(home)/section-title";

export function BlogsHeader() {
  return (
    <SectionWrapper className="py-12 lg:py-16 text-center">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <SectionTitle className="text-lev-black mb-6">BLOGS</SectionTitle>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="text-lev-gray max-w-[900px] mx-auto leading-relaxed">
          At Levntura, we&apos;re here to guide you every step of the way on
          your journey of discovery. Whether you have questions about our
          programs, want to share feedback, or simply want to say hello,
          we&apos;d love to hear from you. Get in touch with us using any of the
          following methods:
        </p>
      </FadeUpAnimator>
    </SectionWrapper>
  );
}



