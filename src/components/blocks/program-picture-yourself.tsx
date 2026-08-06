import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

// Bundled default so the round photo shows something before an upload.
import pictureYourselfFallback from "@/app/(frontend)/[locale]/programs/work-and-travel/photo3.webp";

interface ProgramPictureYourselfBlockData {
  eyebrow?: string;
  body?: string;
  circleHeading?: string;
  circleBody?: string;
  photo?: Media | null;
}

/** Block version of program-page section 5 (Picture Yourself). 1:1 original. */
export function ProgramPictureYourselfBlock({
  block,
}: {
  block: ProgramPictureYourselfBlockData;
}) {
  const photoUrl = mediaUrl(block.photo, "feature") ?? mediaUrl(block.photo);

  return (
    <>
      {(block.eyebrow || block.body) && (
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            {block.eyebrow && (
              <span className="typography-R18 text-lev-blue mb-8 inline-block">
                {block.eyebrow}
              </span>
            )}
            <SectionTitle className="mb-[40px] sm:mb-0">
              Picture <br /> yourself
            </SectionTitle>
          </FadeUpAnimator>
          {block.body && (
            <FadeUpAnimator className="flex lg:-translate-y-[50px]">
              <p className="ms-auto text-lev-red-dark w-[300px]">{block.body}</p>
            </FadeUpAnimator>
          )}
        </SectionWrapper>
      )}

      <SectionWrapper className="flex justify-center items-center mb-[200px]">
        <div className="relative max-w-[85%] rounded-full overflow-hidden">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={mediaAlt(block.photo, "")}
              width={1200}
              height={700}
              className="w-full h-full"
            />
          ) : (
            <Image
              src={pictureYourselfFallback}
              alt=""
              className="w-full h-full"
            />
          )}
          {(block.circleHeading || block.circleBody) && (
            <div className="absolute hidden lg:flex text-center flex-col gap-6 p-8 justify-center aspect-square shrink-0 items-center end-8 h-[80%] top-1/2 -translate-y-1/2 bg-lev-yellow rounded-full">
              {block.circleHeading && (
                <p className="uppercase text-lev-red-dark typography-EB24">
                  {block.circleHeading}
                </p>
              )}
              {block.circleBody && <p>{block.circleBody}</p>}
            </div>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
