import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Button } from "@/design-system/button";
import { LeventuraSymbolLogo } from "@/atoms/logo";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { Link } from "@/i18n/navigation";
import type { PromptCTABlock as PromptCTABlockData } from "@/lib/types";

import studentPhoto from "@/assets/photos/students.png";

interface PromptCTABlockProps {
  block: PromptCTABlockData;
}

export function PromptCTABlock({ block }: PromptCTABlockProps) {
  if (!block.heading) return null;

  const cta = block.cta;
  const imgUrl = mediaUrl(block.image, "feature") ?? mediaUrl(block.image);
  const usingCmsImage = Boolean(imgUrl);
  const imgSrc: string | StaticImageData = imgUrl ?? studentPhoto;
  const imgAlt = mediaAlt(block.image, "Team collaboration");

  return (
    <div className="flex group flex-col lg:flex-row h-[300px] overflow-hidden lg:h-[500px] relative">
      <div className="absolute inset-0 w-full overflow-hidden hidden lg:block transition-all duration-500 ease-in-out z-10000 group-hover:lg:w-[70%]">
        <div className="absolute inset-0">
          {usingCmsImage && typeof imgSrc === "string" ? (
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <Image
              src={imgSrc as StaticImageData}
              alt={imgAlt}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      </div>

      <div className="relative lg:ml-auto lg:w-[30%] flex flex-col justify-center items-center h-full">
        <LeventuraSymbolLogo
          className="absolute top-0 opacity-10 -right-1/2 -translate-x-1/2 size-[500px] group-hover:scale-105 group-hover:rotate-90 transition-all duration-500"
          width={500}
          height={500}
        />
        <div className="relative flex flex-col items-center justify-center z-10 text-center lg:text-left w-full">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h2 className="typography-EB34 text-center lg:typography-EB48 uppercase text-lev-black mb-8 leading-tight">
              {block.heading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUpAnimator>

          {cta?.label && cta?.url && (
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <Button
                asChild
                className="border-lev-black text-lev-black hover:bg-lev-black hover:text-white w-full lg:w-auto px-8"
              >
                <Link href={cta.url}>{cta.label}</Link>
              </Button>
            </FadeUpAnimator>
          )}
        </div>
      </div>
    </div>
  );
}
