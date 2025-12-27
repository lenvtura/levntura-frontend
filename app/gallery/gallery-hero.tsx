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
        At Levntura, every picture tells a story—a story of discovery,
        friendship, and unforgettable moments that shape who we are. From summer
        adventures in the U.S. to cultural exchanges around the world, our
        gallery captures the essence of what it means to explore, connect, and
        grow. These are the memories we’re proud to create together—moments that
        remind us that every journey starts with a single step
      </FadeUpAnimator>
    </SectionWrapper>
  );
}
