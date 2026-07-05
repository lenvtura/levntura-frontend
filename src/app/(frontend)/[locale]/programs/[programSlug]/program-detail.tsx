/**
 * Program Detail page — visual 1:1 port of the legacy static
 * `app/programs/[programSlug]/program-page.tsx`, but each section reads
 * from structured CMS fields on the Program doc.
 *
 * Sections (rendered in order, each skipped when its data is empty):
 *   1.  Hero            — image bg + tag/title/subtitle/note + Start now btn
 *   2.  Intro           — eyebrow + centered body
 *   3.  What Is         — large title + side-aligned body
 *   4.  Photo break     — visual decoration between sections
 *   5.  Picture Yourself— "Picture yourself" + circle overlay on photo
 *   6.  Why Participate — large title + body + benefits slider (6+ cards)
 *   7.  Jobs            — title + body + round-image slider
 *   8.  Destinations    — leadText + title + round-image slider
 *   9.  Benefits Showcase — checklist (8+ items) in pill grid
 *   10. Requirements    — slider of icon cards
 *   11. Memories        — TourImages gallery with overlay title
 *   12. Why Choose Levntura — 2-col features grid (icon + title + desc)
 *   13. Are You Ready   — photos + title + apply form
 *
 * Marked `"use client"` because the 4 slider sections use <Slider>, which
 * is a framer-motion-driven client component and requires `renderItem`
 * functions — those can't cross the server→client boundary. Pre-rendered
 * server JSX (applyForm + extraSections) is passed in as props instead.
 */

"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { TitleWithBreaks } from "@/app/(frontend)/[locale]/programs/work-and-travel/title-with-breaks";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { MemoriesGridBlock } from "@/components/blocks/memories-grid";

import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Program } from "@/lib/types";

import { FeatureIcon, RequirementIcon } from "./icons";

// Decorative photos wrapping the "Are You Ready" apply section — same set
// the legacy static page used (3.png + 4.png above the form, 5.png + 6.png
// below). They aren't editable on purpose: pure brand decoration shared
// across every program.
import applyTopLeftPhoto from "@/assets/photos/3.png";
import applyTopRightPhoto from "@/assets/photos/4.png";
import applyBottomLeftPhoto from "@/assets/photos/6.png";
import applyBottomRightPhoto from "@/assets/photos/5.png";

// Static fallbacks for images that lived as local files in the legacy
// static page (never on DO Spaces). Used when the matching CMS field is
// empty so the page never looks broken — editor uploads override.
import photoMiddleFallback from "@/app/(frontend)/[locale]/programs/work-and-travel/photo2.webp";
import pictureYourselfFallback from "@/app/(frontend)/[locale]/programs/work-and-travel/photo3.webp";

import meetNewFriendsPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/meet-new-friends-photo.svg";
import travelAroundPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/travel-around-photo.webp";
import discoverYourselfPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/discover-yourself-photo.svg";
import professionalGrowthPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/professional-growth-photo.svg";

import cedarPointPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/cedar-point-photo.svg";
import nationalParkPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/national-park-photo.svg";
import grandCanyonPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/grand-canyon-photo.svg";
import greatAmericaPhoto from "@/app/(frontend)/[locale]/programs/work-and-travel/great-america-photo.svg";

// Title → static fallback maps for benefits + destinations whose original
// images were local SVGs/webp (not on DO Spaces). Lookup is case- and
// whitespace-insensitive so newlines in the seed titles ("Meet New\nFriends")
// still resolve.
const BENEFIT_FALLBACKS: Record<string, StaticImageData> = {
  "meet new friends": meetNewFriendsPhoto,
  "travel around the usa": travelAroundPhoto,
  "discover yourself": discoverYourselfPhoto,
  "professional growth": professionalGrowthPhoto,
};

const DESTINATION_FALLBACKS: Record<string, StaticImageData> = {
  "cedar point": cedarPointPhoto,
  "yellowstone national park": nationalParkPhoto,
  "grand canyon national park": grandCanyonPhoto,
  "six flags great america": greatAmericaPhoto,
};

function normalizeTitle(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

interface ProgramDetailProps {
  program: Program;
  applyForm: ReactNode;
  extraSections?: ReactNode;
}

export function ProgramDetail({ program, applyForm, extraSections }: ProgramDetailProps) {
  // Hero data (with sane fallbacks so the section always renders something)
  const hero = program.detailHero ?? {};
  const heroImageUrl =
    mediaUrl(hero.image, "feature") ??
    mediaUrl(hero.image) ??
    mediaUrl(program.featuredImage, "feature") ??
    mediaUrl(program.featuredImage) ??
    null;

  const intro = program.detailIntro;
  const whatIs = program.detailWhatIs;
  const photoMiddleUrl =
    mediaUrl(program.detailPhotoMiddle, "feature") ??
    mediaUrl(program.detailPhotoMiddle);
  const pictureYourself = program.detailPictureYourself;
  const pictureYourselfPhotoUrl =
    mediaUrl(pictureYourself?.photo, "feature") ??
    mediaUrl(pictureYourself?.photo);
  const whyParticipate = program.detailWhyParticipate;
  const benefits = whyParticipate?.benefits ?? [];
  const jobs = program.detailJobs;
  const jobItems = jobs?.items ?? [];
  const destinations = program.detailDestinations;
  const destinationItems = destinations?.items ?? [];
  const benefitsShowcase = program.detailBenefitsShowcase;
  const showcaseItems = benefitsShowcase?.items ?? [];
  const requirements = program.detailRequirements ?? [];
  const memories = program.detailMemories;
  const features = program.detailFeatures ?? [];

  return (
    <div className="bg-[#F7F7F8]">
      {/* ─── 1. Hero ─────────────────────────────────────────────────── */}
      <div className="flex relative bg-gradient-to-b from-lev-gray-light to-transparent justify-center items-center min-h-screen overflow-hidden">
        {heroImageUrl ? (
          <Image
            fill
            src={heroImageUrl}
            alt={mediaAlt(hero.image, program.title)}
            className="w-full pointer-events-none object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-lev-green-dark" />
        )}
        <StartNowBtn
          href="#apply"
          className="z-10 text-white cursor-pointer border-white absolute top-[350px] left-[50%] translate-x-[-50%]"
        />
        <div className="flex flex-col text-white uppercase z-10 gap-4 items-center -translate-y-[200px] text-center px-4">
          {hero.tag && <span className="typography-B18">{hero.tag}</span>}
          <h1 className="typography-EB48! mix-blend-difference! sm:typography-EB74! text-[64px] sm:text-[90px]">
            {program.title}
          </h1>
          {hero.subtitle && (
            <p className="typography-S18 mix-blend-difference">{hero.subtitle}</p>
          )}
          {hero.note && <p className="typography-S18">{hero.note}</p>}
        </div>
      </div>

      {/* ─── 2. Intro ────────────────────────────────────────────────── */}
      {(intro?.eyebrow || intro?.body) && (
        <SectionWrapper className="mb-[64px]">
          {intro.eyebrow && (
            <p className="typography-S16 text-center text-lev-blue-light mb-4">
              {intro.eyebrow}
            </p>
          )}
          {intro.body && (
            <p className="typography-S34 leading-9 text-center text-lev-blue-dark">
              {intro.body}
            </p>
          )}
        </SectionWrapper>
      )}

      {/* ─── 3. What Is ──────────────────────────────────────────────── */}
      {(whatIs?.title || whatIs?.body) && (
        <SectionWrapper className="container-md">
          {whatIs.title && (
            <FadeUpAnimator>
              <SectionTitle className="mb-[80px]">
                <TitleWithBreaks title={whatIs.title} />
              </SectionTitle>
            </FadeUpAnimator>
          )}
          {whatIs.body && (
            <FadeUpAnimator className="flex">
              <p className="ms-auto text-lev-red-dark w-[300px]">
                <RichTextish text={whatIs.body} />
              </p>
            </FadeUpAnimator>
          )}
        </SectionWrapper>
      )}

      {/* ─── 4. Photo break ──────────────────────────────────────────── */}
      {/* Renders at the image's natural dimensions (no w-full / object-cover)
          to mirror the legacy static page exactly — the polaroid mock is
          ~600px wide and looks oversized stretched to the full container. */}
      <SectionWrapper className="flex justify-center items-center">
        {photoMiddleUrl ? (
          <Image
            src={photoMiddleUrl}
            alt={mediaAlt(program.detailPhotoMiddle, "")}
            width={program.detailPhotoMiddle?.width ?? 700}
            height={program.detailPhotoMiddle?.height ?? 500}
            className="h-auto max-w-full"
          />
        ) : (
          <Image src={photoMiddleFallback} alt="" />
        )}
      </SectionWrapper>

      {/* ─── 5. Picture Yourself ─────────────────────────────────────── */}
      {(pictureYourself?.eyebrow || pictureYourself?.body) && (
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            {pictureYourself.eyebrow && (
              <span className="typography-R18 text-lev-blue mb-8 inline-block">
                {pictureYourself.eyebrow}
              </span>
            )}
            <SectionTitle className="mb-[40px] sm:mb-0">
              Picture <br /> yourself
            </SectionTitle>
          </FadeUpAnimator>
          {pictureYourself.body && (
            <FadeUpAnimator className="flex lg:-translate-y-[50px]">
              <p className="ms-auto text-lev-red-dark w-[300px]">
                {pictureYourself.body}
              </p>
            </FadeUpAnimator>
          )}
        </SectionWrapper>
      )}

      <SectionWrapper className="flex justify-center items-center mb-[200px]">
        <div className="relative max-w-[85%] rounded-full overflow-hidden">
          {pictureYourselfPhotoUrl ? (
            <Image
              src={pictureYourselfPhotoUrl}
              alt={mediaAlt(pictureYourself?.photo, "")}
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
          {(pictureYourself?.circleHeading || pictureYourself?.circleBody) && (
            <div className="absolute hidden lg:flex text-center flex-col gap-6 p-8 justify-center aspect-square shrink-0 items-center end-8 h-[80%] top-1/2 -translate-y-1/2 bg-lev-yellow rounded-full">
              {pictureYourself?.circleHeading && (
                <p className="uppercase text-lev-red-dark typography-EB24">
                  {pictureYourself.circleHeading}
                </p>
              )}
              {pictureYourself?.circleBody && (
                <p>{pictureYourself.circleBody}</p>
              )}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* ─── 6. Why Participate ──────────────────────────────────────── */}
      {(whyParticipate?.body || benefits.length > 0) && (
        <div className="mb-[180px]">
          <SectionWrapper className="container-md">
            <FadeUpAnimator>
              <SectionTitle className="mb-[100px] text-[120px]">
                Why You <br /> Should <br /> Participate?
              </SectionTitle>
            </FadeUpAnimator>
            {whyParticipate?.body && (
              <FadeUpAnimator className="flex">
                <p className="ms-auto text-lev-red-dark w-[300px]">
                  {whyParticipate.body}
                </p>
              </FadeUpAnimator>
            )}
          </SectionWrapper>
          {benefits.length > 0 && (
            <div>
              <Slider
                data={benefits}
                renderItem={(benefit) => {
                  const cmsSrc =
                    mediaUrl(benefit.image, "feature") ?? mediaUrl(benefit.image);
                  const fallback = BENEFIT_FALLBACKS[normalizeTitle(benefit.title)];
                  const src: string | StaticImageData | undefined = cmsSrc ?? fallback;
                  return (
                    <div>
                      <div className="relative h-[400px] sm:h-[670px] w-[300px] sm:w-[480px] flex flex-col gap-7 bg-lev-gray-light">
                        {src && (
                          typeof src === "string" ? (
                            <Image
                              width={500}
                              height={500}
                              className="absolute object-cover pointer-events-none w-full h-full inset-0"
                              src={src}
                              alt={mediaAlt(benefit.image, benefit.title)}
                            />
                          ) : (
                            <Image
                              className="absolute object-cover pointer-events-none w-full h-full inset-0"
                              src={src}
                              alt={benefit.title}
                            />
                          )
                        )}
                        <TitleWithBreaks
                          title={benefit.title}
                          className="typography-EB34 sm:typography-EB48 text-white absolute bottom-10 left-10 uppercase"
                        />
                      </div>
                      {benefit.description && (
                        <p className="typography-R16 text-gray-500 w-[300px] sm:w-[480px] mt-4 leading-6">
                          {benefit.description}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── 7. Jobs ─────────────────────────────────────────────────── */}
      {(jobs?.body || jobItems.length > 0) && (
        <div className="mb-[150px]">
          <SectionWrapper className="container-md">
            <FadeUpAnimator>
              <SectionTitle className="mb-[40px]">
                What you will <br /> be doing
              </SectionTitle>
            </FadeUpAnimator>
            {jobs?.body && (
              <FadeUpAnimator className="flex">
                <p className="ms-auto text-lev-red-dark w-[300px]">{jobs.body}</p>
              </FadeUpAnimator>
            )}
          </SectionWrapper>
          {jobItems.length > 0 && (
            <div>
              <Slider
                data={jobItems}
                renderItem={(job) => {
                  const src = mediaUrl(job.image, "feature") ?? mediaUrl(job.image);
                  return (
                    <div className="flex size-[300px] lg:size-[450px] justify-center bg-white p-10 flex-col gap-7">
                      <div className="size-[200px] self-center shrink-0 lg:size-[300px] aspect-square overflow-hidden rounded-full bg-lev-gray-light">
                        {src && (
                          <Image
                            src={src}
                            className="object-cover w-full h-full pointer-events-none"
                            width={300}
                            height={300}
                            alt={mediaAlt(job.image, job.title)}
                          />
                        )}
                      </div>
                      <h4 className="typography-EB34 lg:typography-EB48 text-lev-red-dark">
                        {job.title}
                      </h4>
                    </div>
                  );
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── 8. Destinations ─────────────────────────────────────────── */}
      {(destinations?.leadText || destinationItems.length > 0) && (
        <div className="mb-[100px] sm:mb-0">
          <SectionWrapper>
            {destinations?.leadText && (
              <FadeUpAnimator>
                <p className="mb-12 text-lev-red-dark w-[300px]">
                  {destinations.leadText}
                </p>
              </FadeUpAnimator>
            )}
            <FadeUpAnimator className="flex">
              <SectionTitle className="ms-auto text-end">
                CHOOSE YOUR <br /> NEXT ADVENTURE
              </SectionTitle>
            </FadeUpAnimator>
          </SectionWrapper>
          {destinationItems.length > 0 && (
            <Slider
              data={destinationItems}
              renderItem={(dest) => {
                const cmsSrc =
                  mediaUrl(dest.image, "feature") ?? mediaUrl(dest.image);
                const fallback = DESTINATION_FALLBACKS[normalizeTitle(dest.area)];
                const src: string | StaticImageData | undefined = cmsSrc ?? fallback;
                return (
                  <div className="flex flex-col gap-4 w-[400px]">
                    <div className="relative shrink-0 overflow-hidden rounded-full h-[300px] aspect-square grid gap-7 bg-lev-gray-light">
                      {src && (
                        typeof src === "string" ? (
                          <Image
                            fill
                            className="pointer-events-none w-full object-cover"
                            src={src}
                            alt={mediaAlt(dest.image, dest.area)}
                          />
                        ) : (
                          <Image
                            fill
                            className="pointer-events-none w-full object-cover"
                            src={src}
                            alt={dest.area}
                          />
                        )
                      )}
                    </div>
                    <div className="self-center text-center">
                      <TitleWithBreaks
                        title={dest.area}
                        className="typography-S24 leading-9! sm:typography-S34 uppercase"
                      />
                      {dest.country && (
                        <p className="typography-R18 leading-6">{dest.country}</p>
                      )}
                    </div>
                  </div>
                );
              }}
            />
          )}
        </div>
      )}

      {/* ─── 9. Benefits Showcase (checklist) ────────────────────────── */}
      {(benefitsShowcase?.title || showcaseItems.length > 0) && (
        <SectionWrapper>
          <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
            <div className="max-w-6xl w-full relative z-10">
              {benefitsShowcase?.title && (
                <div className="text-center mb-16">
                  <FadeUpAnimator>
                    <SectionTitle className="mb-4">
                      <TitleWithBreaks title={benefitsShowcase.title} />
                    </SectionTitle>
                  </FadeUpAnimator>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {showcaseItems.map((item, idx) => (
                  <FadeUpAnimator
                    transition={{ delay: idx * 0.2 }}
                    key={item.id ?? `showcase-${idx}`}
                    className="flex flex-col gap-6"
                  >
                    <div className="border h-[100px] sm:h-[150px] text-lev-blue-dark flex justify-center items-center border-lev-blue rounded-full p-8 text-center">
                      <p className="typography-R18 leading-6">{item.text}</p>
                    </div>
                  </FadeUpAnimator>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ─── 10. Requirements ────────────────────────────────────────── */}
      {requirements.length > 0 && (
        <div className="flex min-h-[60vh] gap-8 flex-col">
          <SectionTitle className="ms-auto me-[40px] lg:me-[350px] uppercase mb-[80px] text-lev-red">
            Required
          </SectionTitle>
          <div className="mb-[120px]">
            <Slider
              data={requirements}
              renderItem={(req) => (
                <div className="relative grid bg-white w-[250px] h-full gap-7 p-6">
                  <span className="mb-14 inline-block">
                    <RequirementIcon icon={req.iconKey} />
                  </span>
                  <TitleWithBreaks
                    title={req.title}
                    className="typography-S24 lg:typography-M24 self-end"
                  />
                  {req.description && (
                    <p className="typography-R18 leading-6">{req.description}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      )}

      {/* ─── 11. Memories ────────────────────────────────────────────── */}
      {/* Re-uses the same CMS-driven `MemoriesGridBlock` the About page uses.
          Editor manages photos per-program in admin (uploads land in Media);
          falls back to the 8 packaged tour-images when no photos are set.
          The programs collection's `detailMemories.images` is still an
          `array of { image, alt }` (legacy shape on programs only) — we
          flatten it to `Media[]` to match the block's new hasMany prop. */}
      {memories?.title && (
        <MemoriesGridBlock
          block={{
            blockType: "memoriesGrid",
            title: memories.title,
            images: (memories.images ?? [])
              .map((i) => i?.image)
              .filter(
                (m): m is import("@/lib/types").Media =>
                  Boolean(m) && typeof m === "object",
              ),
            primaryCta: memories.primaryCta,
            secondaryLink: memories.secondaryLink,
            backgroundColor: "none",
          }}
        />
      )}

      {/* ─── 12. Why Choose Levntura ─────────────────────────────────── */}
      {features.length > 0 && (
        <SectionWrapper className="min-h-screen container-md mb-[100px]">
          <FadeUpAnimator>
            <SectionTitle className="mb-[90px]">
              Why Choose <br /> Levntura?
            </SectionTitle>
          </FadeUpAnimator>
          <div className="grid gap-y-[120px] gap-x-24 grid-cols-1 lg:grid-cols-2">
            {features.map((feature, index) => (
              <FadeUpAnimator
                transition={{ delay: index * 0.1 }}
                key={feature.id ?? `feat-${index}`}
                className="flex gap-4 lg:gap-10"
              >
                <span className="shrink-0 w-[80px]">
                  <FeatureIcon icon={feature.iconKey} />
                </span>
                <div>
                  <TitleWithBreaks
                    title={feature.title}
                    className="text-lev-blue-dark leading-9 mb-[22px] typography-R34 text-[32px]"
                  />
                  {feature.description && (
                    <p className="typography-R18 leading-6 text-lev-red-dark max-w-[350px]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </FadeUpAnimator>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* ─── 13. Apply (Are You Ready) ───────────────────────────────── */}
      {program.isOpen && (
        <div id="apply" className="relative">
          <SectionWrapper>
            {/* Top decorative photos — one floats left, one right. */}
            <div className="h-[500px] flex justify-between max-md:hidden">
              <FadeUpAnimator transition={{ delay: 0.1 }}>
                <Image src={applyTopLeftPhoto} alt="" />
              </FadeUpAnimator>
              <FadeUpAnimator transition={{ delay: 0.2 }}>
                <Image src={applyTopRightPhoto} alt="" />
              </FadeUpAnimator>
            </div>

            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              <FadeUpAnimator>
                <SectionTitle>
                  Are You <br /> Ready to <br /> Change <br /> Your <br /> World?
                </SectionTitle>
              </FadeUpAnimator>
              <FadeUpAnimator transition={{ delay: 0.3 }} className="w-full max-w-2xl">
                {applyForm}
              </FadeUpAnimator>
            </div>
          </SectionWrapper>

          {/* Bottom decorative photos — sit just outside the SectionWrapper
              so they edge against the page bleed like the legacy layout. */}
          <div className="flex gap-14 max-md:hidden">
            <FadeUpAnimator className="w-full">
              <Image src={applyBottomLeftPhoto} alt="" />
            </FadeUpAnimator>
            <FadeUpAnimator className="w-full">
              <Image
                src={applyBottomRightPhoto}
                alt=""
                className="ml-auto mr-6"
              />
            </FadeUpAnimator>
          </div>
        </div>
      )}

      {/* ─── Extra blocks (optional, after structured content) ──────── */}
      {extraSections}
    </div>
  );
}

/**
 * Minimal **bold** marker → <strong>. Lets editors mark important phrases
 * in a textarea without committing to a full rich-text field. Pure inline
 * — no surrounding paragraph wrapping (caller decides container).
 */
function RichTextish({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) return <strong key={i}>{m[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
