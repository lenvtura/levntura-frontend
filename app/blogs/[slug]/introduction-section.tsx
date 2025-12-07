import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import studentsImage from "@/assets/photos/students.png";

export function IntroductionSection() {
  return (
    <section id="introduction" className="scroll-mt-24 mb-16 lg:mb-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 capitalize text-lev-black mb-6">
          introduction
        </h2>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.3 }}>
        <div className="text-lev-gray space-y-4 typography-R18 mb-10">
          <p className="mb-4 text-lev-black leading-relaxed">
            Are you ready to embark on an adventure that will not only enhance
            your resume but also expand your cultural horizons?
            &quot;Levntura&quot; invites students like you to dive into the
            vibrant cultures of the Arab world through our tailored summer work
            and travel programs. Whether you&apos;re looking to gain practical
            experience, learn a new language, or meet people from diverse
            backgrounds, our programs offer something unique for everyone.
          </p>
        </div>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }} className="mb-8">
        <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-sm">
          <Image
            src={studentsImage}
            alt="introduction"
            fill
            className="object-cover"
          />
        </div>
      </FadeUpAnimator>
    </section>
  );
}

