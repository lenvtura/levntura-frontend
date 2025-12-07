import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { LeventuraSymbolLogo } from "@/atoms/logo";

export function ShareCard() {
  return (
    <div className="relative group bg-white p-8 lg:p-12">
      <LeventuraSymbolLogo className="absolute -bottom-4  -right-16 text-lev-gray-light size-[300px] group-hover:scale-105 group-hover:rotate-90 transition-all duration-500" />
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 lg:typography-S48 text-lev-black mb-4 leading-tight">
          Share it with the <br /> ones you love!
        </h2>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="typography-R16 text-lev-gray max-w-md mb-10 leading-relaxed">
          If you like this post feel free to share it with those who you think
          would get new info!
        </p>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.3 }}>
        <SocialShareIcons size="md" />
      </FadeUpAnimator>
    </div>
  );
}
