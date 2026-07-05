import Image, { type StaticImageData } from "next/image";

import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FaceboocBoxLogoSvg } from "@/assets/logos/facebooc-box-logo-svg";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  BrandColor,
  SocialFeedBlock as SocialFeedBlockData,
} from "@/lib/types";

import happyFriendship from "@/assets/photos/happy-friendship.png";

const TEXT_CLASS: Record<BrandColor, string> = {
  "lev-blue-light": "text-lev-blue-light",
  "lev-blue": "text-lev-blue",
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-orange": "text-lev-orange",
  "lev-yellow": "text-lev-yellow",
  "lev-yellow-light": "text-lev-yellow-light",
  "lev-green": "text-lev-green",
  "lev-green-light": "text-lev-green-light",
  "lev-green-dark": "text-lev-green-dark",
  "lev-red": "text-lev-red",
  "lev-pink": "text-lev-pink",
  white: "text-white",
};

interface SocialFeedBlockProps {
  block: SocialFeedBlockData;
}

export function SocialFeedBlock({ block }: SocialFeedBlockProps) {
  if (!block.communityHeading) return null;

  const stats = block.stats ?? [];
  const cta = block.cta;

  const bgUrl =
    mediaUrl(block.backgroundImage, "feature") ??
    mediaUrl(block.backgroundImage);

  return (
    <div>
      <SectionWrapper>
        {stats.length > 0 && (
          <div className="grid md:grid-cols-3 items-start justify-center gap-6 mb-16">
            {stats.map((stat, index) => (
              <FadeUpAnimator
                key={stat.id ?? `stat-${index}`}
                transition={{ delay: 0.1 + index * 0.2 }}
                className="relative pr-6 border-r-2 last:border-0 last:pr-0 border-lev-blue-dark"
              >
                <div className="flex mb-4 gap-6 items-center">
                  <span
                    className={cn(
                      "typography-EB74",
                      TEXT_CLASS[stat.numberColor ?? "lev-blue-light"],
                    )}
                  >
                    {stat.number}
                  </span>
                  <span className="typography-M16">{stat.category}</span>
                </div>
                {stat.paragraph && (
                  <p className="text-lev-blue-dark">{stat.paragraph}</p>
                )}
              </FadeUpAnimator>
            ))}
          </div>
        )}

        <div className="relative flex flex-col justify-center p-8 max-md:h-max h-[650]">
          <div className="z-20 flex flex-col gap-6 justify-center items-start h-full relative text-white">
            <FadeUpAnimator
              transition={{ delay: 0.2 }}
              className="flex gap-4 flex-wrap"
            >
              <div className="shrink-0">
                <FaceboocBoxLogoSvg />
              </div>
              {block.communityDescription && (
                <p className="max-w-[350px] bg-blend-overlay mix-blend-overlay opacity-70">
                  {block.communityDescription}
                </p>
              )}
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <SectionTitle className="text-white inline-block">
                {block.communityHeading.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </SectionTitle>
            </FadeUpAnimator>
            {cta?.label && cta?.url && (
              <FadeUpAnimator transition={{ delay: 0.6 }}>
                <ButtonWithArrow
                  href={cta.url}
                  iconClassName="border-white"
                >
                  {cta.label}
                </ButtonWithArrow>
              </FadeUpAnimator>
            )}
          </div>

          {bgUrl ? (
            <Image
              alt={mediaAlt(block.backgroundImage)}
              src={bgUrl}
              fill
              className="object-cover absolute inset-0 w-full h-full"
              sizes="100vw"
            />
          ) : (
            <Image
              alt=""
              src={happyFriendship}
              className="object-cover absolute inset-0 w-full h-full"
            />
          )}
          <div className="absolute inset-y-0 min-w-3/5 bg-gradient-to-r from-black to-[rgba(0,0,0,0)] left-0" />
        </div>
      </SectionWrapper>
    </div>
  );
}
