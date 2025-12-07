import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { QuoteIcon, Share2 } from "lucide-react";

interface PastStudentsSectionProps {
  id?: string;
  image: StaticImageData | string;
  name: string;
  bio: string;
}

export function PastStudentsSection({
  id = "past-students",
  image,
  name,
  bio,
}: PastStudentsSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 mb-16 lg:mb-24">
      <div className="bg-gray-100 p-8 lg:p-12 rounded-sm">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Left Side - Text Content */}
          <div>
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <div className="w-fit flex items-center justify-center bg-lev-blue/20 px-3 py-2 rounded mb-6">
                <span className="typography-R34 uppercase text-white">BIO</span>
              </div>
            </FadeUpAnimator>

            <FadeUpAnimator className="mb-6">
              <QuoteIcon
                fill="currentColor"
                className="size-[100px] opacity-20 text-lev-gray"
              />
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <p className="typography-S34 text-[28px] text-lev-black leading-tight mb-6 whitespace-pre-line">
                {bio}
              </p>
            </FadeUpAnimator>

            <div className="h-px bg-lev-gray mb-6" />

            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3">
                <SocialShareIcons size="sm" />
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-lev-blue bg-white flex items-center justify-center hover:bg-lev-blue hover:text-white transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5 text-lev-blue" />
                </a>
              </div>
            </FadeUpAnimator>
          </div>

          {/* Right Side - Circular Image */}
          <FadeUpAnimator
            transition={{ delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full h-[300px] lg:w-[300px] lg:h-[400px] rounded-full overflow-hidden">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          </FadeUpAnimator>
        </div>
      </div>
    </section>
  );
}
