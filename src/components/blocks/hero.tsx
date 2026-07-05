import Image, { type StaticImageData } from "next/image";

import type {
  HeroBackgroundColor,
  HeroBlock as HeroBlockData,
  HeroHighlightColor,
} from "@/lib/types";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { cn } from "@/design-system/helpers";
import { Button } from "@/design-system/button";
import { Link } from "@/i18n/navigation";

import aboutHero from "@/assets/photos/about_hero.png";

interface HeroBlockProps {
  block: HeroBlockData;
}

// Section background classes. `none` lets the page bg show through.
const BG_CLASS: Record<HeroBackgroundColor, string> = {
  none: "",
  "lev-yellow": "bg-lev-yellow",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue": "bg-lev-blue",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-green": "bg-lev-green",
  "lev-green-light": "bg-lev-green-light",
  "lev-green-dark": "bg-lev-green-dark",
  "lev-red": "bg-lev-red",
  "lev-red-dark": "bg-lev-red-dark",
  "lev-orange": "bg-lev-orange",
  "lev-pink": "bg-lev-pink",
  "lev-black": "bg-lev-black",
  white: "bg-white",
};

// The decorative right-half panel (used on splitRight only). Picks a *lighter*
// shade that contrasts with the main section bg — defaults defined by lookup.
const DECOR_CLASS: Partial<Record<HeroBackgroundColor, string>> = {
  "lev-yellow": "bg-lev-yellow-light",
  "lev-blue": "bg-lev-blue-light",
  "lev-blue-dark": "bg-lev-blue",
  "lev-green": "bg-lev-green-light",
  "lev-green-dark": "bg-lev-green",
  "lev-red": "bg-lev-red-dark",
  "lev-red-dark": "bg-lev-red",
  "lev-orange": "bg-lev-yellow",
  "lev-pink": "bg-lev-yellow-light",
  "lev-black": "bg-lev-blue-dark",
};

const HIGHLIGHT_CLASS: Record<HeroHighlightColor, string> = {
  "lev-orange": "text-lev-orange",
  "lev-red": "text-lev-red",
  "lev-green": "text-lev-green",
  "lev-green-light": "text-lev-green-light",
  "lev-blue": "text-lev-blue",
  "lev-blue-light": "text-lev-blue-light",
  "lev-yellow": "text-lev-yellow",
};

// On dark hero backgrounds the heading uses red-dark from the original About
// design; on light backgrounds we want a softer red-dark too. textColor
// switches the body text + button outlines independently for contrast.
const HEADING_CLASS = {
  dark: "text-lev-red-dark",
  light: "text-white",
} as const;

const BODY_CLASS = {
  dark: "text-lev-black/60",
  light: "text-white/80",
} as const;

const EYEBROW_CLASS = {
  dark: "text-lev-orange",
  light: "text-lev-yellow",
} as const;

export function HeroBlock({ block }: HeroBlockProps) {
  if (!block.heading) return null;

  const variant = block.variant ?? "splitRight";
  const imageUrl =
    mediaUrl(block.media, "feature") ?? mediaUrl(block.media);
  const imageAlt = mediaAlt(block.media, block.heading);

  if (variant === "fullBackground") {
    return <FullBackgroundHero block={block} imageUrl={imageUrl} imageAlt={imageAlt} />;
  }

  if (variant === "splitRight" || variant === "splitLeft") {
    return (
      <SplitHero
        block={block}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        imageOnRight={variant === "splitRight"}
      />
    );
  }

  return <CenteredHero block={block} imageUrl={imageUrl} imageAlt={imageAlt} />;
}

// ─── Centered ─────────────────────────────────────────────────────────────

function CenteredHero({
  block,
  imageUrl,
  imageAlt,
}: {
  block: HeroBlockData;
  imageUrl?: string;
  imageAlt: string;
}) {
  const bg = block.backgroundColor ?? "none";
  const textColor = block.textColor ?? "dark";
  const paragraphs = splitParagraphs(block.subheading);

  return (
    <section className={cn("relative py-16 lg:py-24", BG_CLASS[bg])}>
      <div className="container-md text-center">
        <HeroEyebrow value={block.eyebrow} textColor={textColor} />
        <h1
          className={cn(
            "typography-EB48 lg:typography-EB64 uppercase mb-4",
            HEADING_CLASS[textColor],
          )}
        >
          <HighlightedHeading block={block} />
        </h1>
        {paragraphs.length > 0 && (
          <div className={cn("max-w-2xl mx-auto mb-8 space-y-4", BODY_CLASS[textColor])}>
            {paragraphs.map((p, i) => (
              <p key={i} className="typography-R16 lg:typography-R18 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}
        <HeroActions actions={block.actions} className="justify-center" textColor={textColor} />

        {imageUrl && (
          <div className="relative mt-12 aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Split ────────────────────────────────────────────────────────────────
// Mirrors `app/(legacy)/about/where-journeys-begin.tsx` — yellow section bg,
// lighter decorative block on right 37%, half-width image absolute-positioned.

function SplitHero({
  block,
  imageUrl,
  imageAlt,
  imageOnRight,
}: {
  block: HeroBlockData;
  imageUrl?: string;
  imageAlt: string;
  imageOnRight: boolean;
}) {
  const bg = block.backgroundColor ?? "lev-yellow";
  const textColor = block.textColor ?? "dark";
  const decor = DECOR_CLASS[bg];
  const paragraphs = splitParagraphs(block.subheading);

  // Fallback image keeps the About hero looking right pre-DO-Spaces wiring
  const renderImage: string | StaticImageData = imageUrl ?? aboutHero;
  const isStaticImage = typeof renderImage !== "string";

  // Use logical insets (`start-0` / `end-0`) so the layout auto-mirrors
  // in RTL. In LTR `imageOnRight=true` puts the image at `right: 0`; in
  // AR the same `end-0` resolves to `left: 0` so the text on the inside
  // edge no longer overlaps the absolute-positioned image.
  const sideClass = imageOnRight ? "end-0" : "start-0";
  const decorSideClass = imageOnRight ? "end-0" : "start-0";

  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-screen flex flex-col justify-center",
        BG_CLASS[bg],
      )}
    >
      {/* Decorative lighter block — only renders if we have a paired shade */}
      {decor && (
        <div
          className={cn(
            "lg:block hidden absolute inset-y-0 w-[37%]",
            decorSideClass,
            decor,
          )}
        />
      )}

      {/* Half-width image — absolute on lg, stacked on mobile */}
      {isStaticImage ? (
        <Image
          src={renderImage}
          alt={imageAlt}
          className={cn(
            "lg:absolute object-cover top-0 md:max-w-1/2 max-h-[55vh] mb-12 lg:mb-0",
            sideClass,
          )}
        />
      ) : (
        <Image
          src={renderImage}
          alt={imageAlt}
          height={500}
          width={700}
          priority
          className={cn(
            "lg:absolute object-cover top-0 md:max-w-1/2 max-h-[55vh] mb-12 lg:mb-0",
            sideClass,
          )}
        />
      )}

      <div className="container-md pb-12 lg:pb-0 space-y-12 relative">
        <div className={cn("flex flex-col gap-y-4", imageOnRight ? "self-end" : "self-start")}>
          {block.eyebrow && (
            <h6
              className={cn(
                "uppercase typography-M16",
                EYEBROW_CLASS[textColor],
              )}
            >
              {block.eyebrow}
            </h6>
          )}

          <h1
            className={cn(
              "text-6xl leading-14 font-extrabold md:typography-EB74 md:leading-16 w-full lg:w-3/6 uppercase",
              HEADING_CLASS[textColor],
            )}
          >
            <HighlightedHeading block={block} />
          </h1>

          <HeroActions actions={block.actions} textColor={textColor} />
        </div>

        {paragraphs.length > 0 && (
          <article
            className={cn(
              "lg:flex justify-between space-y-8 lg:space-y-0 lg:gap-12",
              BODY_CLASS[textColor],
            )}
          >
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "typography-R16 leading-5",
                  paragraphs.length === 1
                    ? "w-4/5 lg:w-2/4"
                    : i === 0
                      ? "w-4/5 lg:w-2/4"
                      : "w-4/5 lg:w-3/10",
                )}
              >
                {p}
              </p>
            ))}
          </article>
        )}
      </div>
    </section>
  );
}

// ─── Full Background ──────────────────────────────────────────────────────

function FullBackgroundHero({
  block,
  imageUrl,
  imageAlt,
}: {
  block: HeroBlockData;
  imageUrl?: string;
  imageAlt: string;
}) {
  const paragraphs = splitParagraphs(block.subheading);
  return (
    // `isolate` keeps the -z-10 layers within this section's stacking context
    // so the parent <main>'s white bg can't cover them.
    <section className="relative isolate min-h-[60vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-lev-green-dark">
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover -z-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 -z-10" />
        </>
      )}
      <div className="container-md py-20 text-white">
        <HeroEyebrow value={block.eyebrow} textColor="light" />
        <h1 className="typography-EB48 lg:typography-EB72 text-white mb-4 max-w-3xl uppercase">
          <HighlightedHeading block={block} />
        </h1>
        {paragraphs.length > 0 && (
          <div className="text-white/90 max-w-2xl mb-8 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="typography-R18 lg:typography-R20 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}
        <HeroActions actions={block.actions} textColor="light" />
      </div>
    </section>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────

function HeroEyebrow({
  value,
  textColor,
}: {
  value?: string;
  textColor: "dark" | "light";
}) {
  if (!value) return null;
  return (
    <span
      className={cn(
        "inline-block uppercase typography-S14 tracking-widest mb-3",
        EYEBROW_CLASS[textColor],
      )}
    >
      {value}
    </span>
  );
}

/**
 * Renders the heading honoring `\n` line breaks and an optional highlighted
 * substring (which itself may span line breaks — e.g. "CREATING\nMEMORIES,"
 * on the Gallery hero). Falls back to plain text if no highlight is set.
 */
function HighlightedHeading({ block }: { block: HeroBlockData }) {
  const highlight = block.highlightedWord;
  const highlightClass =
    HIGHLIGHT_CLASS[block.highlightColor ?? "lev-orange"];

  if (!highlight || !block.heading.includes(highlight)) {
    return <>{renderHeadingLines(block.heading)}</>;
  }

  const idx = block.heading.indexOf(highlight);
  const before = block.heading.slice(0, idx);
  const after = block.heading.slice(idx + highlight.length);

  return (
    <>
      {before && renderHeadingLines(before)}
      <span className={highlightClass}>{renderHeadingLines(highlight)}</span>
      {after && renderHeadingLines(after)}
    </>
  );
}

function renderHeadingLines(text: string) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="inline">
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function splitParagraphs(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function HeroActions({
  actions,
  className,
  textColor,
}: {
  actions?: HeroBlockData["actions"];
  className?: string;
  textColor: "dark" | "light";
}) {
  if (!actions || actions.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {actions.map((action, i) => (
        <HeroButton
          key={action.id ?? i}
          action={action}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

function HeroButton({
  action,
  textColor,
}: {
  action: NonNullable<HeroBlockData["actions"]>[number];
  textColor: "dark" | "light";
}) {
  const isExternal = /^https?:\/\//.test(action.url);
  const style = action.style ?? "primary";
  const variant = style === "ghost" ? "ghost" : "default";
  // For light-text heroes (dark backgrounds), invert the border + hover so the
  // button reads against the bg.
  const inverted = textColor === "light";

  const className = cn(
    "border-1 typography-EB16",
    inverted &&
      "border-white text-white hover:bg-white hover:text-lev-black",
  );

  const linkProps = isExternal
    ? { href: action.url, target: "_blank", rel: "noopener noreferrer" }
    : { href: action.url };

  return (
    <Button asChild variant={variant} size="lg" className={className}>
      {isExternal ? (
        <a {...linkProps}>{action.label}</a>
      ) : (
        <Link href={action.url}>{action.label}</Link>
      )}
    </Button>
  );
}
