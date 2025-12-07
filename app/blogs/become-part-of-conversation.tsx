import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import Link from "next/link";

export function BecomePartOfConversation() {
  return (
    <div className="relative py-24 lg:py-32 bg-gray-100 overflow-hidden">
      {/* Map Background - SVG map with location markers */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg
          className="w-full h-full max-w-[1400px]"
          viewBox="0 0 1400 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified world map silhouette */}
          <path
            d="M200 250 L250 200 L300 220 L350 180 L400 200 L450 180 L500 200 L550 220 L600 200 L650 220 L700 200 L750 220 L800 240 L850 220 L900 240 L950 220 L1000 240 L1050 260 L1100 240 L1150 260 L1200 280"
            stroke="#C0C0C0"
            strokeWidth="2"
            fill="none"
          />
          <ellipse cx="300" cy="350" rx="800" ry="200" fill="#D0D0D0" opacity="0.3" />
          
          {/* Location markers */}
          <circle cx="280" cy="320" r="8" fill="#FC535C" />
          <circle cx="850" cy="280" r="8" fill="#FC535C" />
          <circle cx="1100" cy="350" r="8" fill="#FC535C" />
          <circle cx="400" cy="450" r="8" fill="#FC535C" />
          <circle cx="1150" cy="500" r="8" fill="#FC535C" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h2 className="typography-EB34 lg:typography-EB48 text-lev-red uppercase mb-8">
              Become Part of the Conversation
            </h2>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <p className="text-lev-black leading-relaxed mb-8">
              Do you have a story to tell, an idea to share, or a burning passion to ignite? Levntura is your
              platform. Whether you&apos;re an expert breaking down industry secrets, a news hawk with the
              latest scoop, or simply someone with a unique perspective, our vibrant community welcomes
              you. Millions have already discovered the power of self-expression on Levntura — sign up
              now and find out why!
            </p>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <Button
              asChild
              className="bg-lev-blue-dark text-white hover:bg-lev-blue-dark/90 border-lev-blue-dark px-8 py-6 text-base"
            >
              <Link href="/contact">create your blog</Link>
            </Button>
          </FadeUpAnimator>
        </div>
      </div>
    </div>
  );
}




