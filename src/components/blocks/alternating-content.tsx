import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { AlternatingContentBlock as AlternatingContentBlockData } from "@/lib/types";

import studentPhoto from "@/assets/photos/students.png";
import happyYoungManPhoto from "@/assets/photos/happy-young-man.png";

const FALLBACK_ROWS: Array<{
  tag: string;
  heading: string;
  paragraph: string;
  image: StaticImageData;
  imagePosition: "left" | "right";
}> = [
  {
    tag: "Explore",
    heading: "Adventure Awaits\nwith Global\nInternships",
    paragraph:
      "Take your first step into the world of professional growth. Levntura's Global Internship Programs connect students with international companies and organizations that value ambition, creativity, and fresh perspectives.",
    image: studentPhoto,
    imagePosition: "left",
  },
  {
    tag: "Empower",
    heading: "Expert Guidance to Unlock Your Potential",
    paragraph:
      "Our expert counsellors are here to guide your path—from choosing the right program to building your confidence abroad. With personal mentorship and continuous support, we help you navigate challenges, seize opportunities, and shape a journey that reflects your goals.",
    image: happyYoungManPhoto,
    imagePosition: "right",
  },
];

interface AlternatingContentBlockProps {
  block: AlternatingContentBlockData;
}

interface RenderRow {
  key: string;
  tag?: string;
  heading: string;
  paragraph?: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition: "left" | "right";
}

export function AlternatingContentBlock({ block }: AlternatingContentBlockProps) {
  if (!block.heading) return null;

  const cmsRows: RenderRow[] = (block.rows ?? []).map((row, i) => ({
    key: row.id ?? `row-${i}`,
    tag: row.tag,
    heading: row.heading,
    paragraph: row.paragraph,
    imageSrc:
      mediaUrl(row.image, "feature") ?? mediaUrl(row.image) ?? FALLBACK_ROWS[i % 2].image.src,
    imageAlt: mediaAlt(row.image, row.heading),
    imageWidth: row.image?.width,
    imageHeight: row.image?.height,
    imagePosition: row.imagePosition ?? "left",
  }));

  const rows: RenderRow[] =
    cmsRows.length > 0
      ? cmsRows
      : FALLBACK_ROWS.map((r, i) => ({
          key: `fb-${i}`,
          tag: r.tag,
          heading: r.heading,
          paragraph: r.paragraph,
          imageSrc: r.image,
          imageAlt: r.heading,
          imageWidth: r.image.width,
          imageHeight: r.image.height,
          imagePosition: r.imagePosition,
        }));

  return (
    <SectionWrapper>
      <FadeUpAnimator className="grid md:grid-cols-2 mb-28 justify-between gap-8">
        <div className="row-start-1 md:sticky md:top-[100px] md:self-start">
          {block.eyebrow && (
            <span className="uppercase text-lev-orange typography-R20 inline-block md:mb-8">
              {block.eyebrow}
            </span>
          )}
          {block.introParagraph && (
            <p className="max-md:hidden">{block.introParagraph}</p>
          )}
        </div>

        <div>
          <SectionTitle className="md:col-start-2 self-end">
            {block.heading}
          </SectionTitle>
        </div>

        {block.introParagraph && (
          <p className="md:hidden">{block.introParagraph}</p>
        )}
      </FadeUpAnimator>

      {rows.map((row) => (
        <FadeUpAnimator
          key={row.key}
          className={
            row.imagePosition === "left"
              ? "flex flex-col-reverse md:flex-row mb-28 justify-between gap-8"
              : "flex flex-col md:flex-row mb-28 justify-between gap-8"
          }
        >
          {row.imagePosition === "left" && (
            <div className="max-md:h-[364px]">
              {typeof row.imageSrc === "string" ? (
                <Image
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  width={row.imageWidth ?? 600}
                  height={row.imageHeight ?? 600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div className="lg:flex-2/3">
            {row.tag && (
              <span className="uppercase bg-lev-yellow px-2 py-1 typography-R14 rounded-full inline-block mb-4">
                {row.tag}
              </span>
            )}
            <h5 className="typography-B34 leading-[1.1] mb-4">
              {row.heading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h5>
            {row.paragraph && <p>{row.paragraph}</p>}
          </div>

          {row.imagePosition === "right" && (
            <div className="max-md:h-[364px] max-md:row-start-1">
              {typeof row.imageSrc === "string" ? (
                <Image
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  width={row.imageWidth ?? 600}
                  height={row.imageHeight ?? 600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </FadeUpAnimator>
      ))}
    </SectionWrapper>
  );
}
