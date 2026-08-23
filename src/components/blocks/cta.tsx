import Image from "next/image";
import type { Block, Media } from "@/lib/types";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { cn } from "@/design-system/helpers";
import { Link } from "@/i18n/navigation";

interface CTAAction {
  label: string;
  url: string;
  style?: "primary" | "secondary";
  id?: string;
}

interface CTABlockProps {
  block: Block & {
    heading?: string;
    description?: string;
    actions?: CTAAction[];
    background?: "default" | "brand" | "dark" | "image";
    backgroundImage?: Media;
  };
}

export function CTABlock({ block }: CTABlockProps) {
  if (!block.heading) return null;

  const background = block.background ?? "default";
  const bgImageUrl =
    background === "image"
      ? mediaUrl(block.backgroundImage, "feature") ?? mediaUrl(block.backgroundImage)
      : undefined;

  const isDark = background === "brand" || background === "dark" || background === "image";

  const sectionClass = cn(
    "relative my-12 lg:my-20 py-16 lg:py-24 overflow-hidden",
    background === "default" && "bg-lev-gray-50/30",
    background === "brand" && "bg-lev-green-dark text-white",
    background === "dark" && "bg-lev-black text-white",
    background === "image" && "text-white",
  );

  return (
    <section className={sectionClass}>
      {bgImageUrl && (
        <>
          <Image
            src={bgImageUrl}
            alt={mediaAlt(block.backgroundImage)}
            fill
            className="object-cover -z-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 -z-10" />
        </>
      )}

      <div className="container-md text-center relative">
        <h2
          className={cn(
            "typography-EB32 lg:typography-EB48 mb-4",
            isDark ? "text-white" : "text-lev-green-dark",
          )}
        >
          {block.heading}
        </h2>

        {block.description && (
          <p
            className={cn(
              "typography-R16 lg:typography-R18 mb-8 max-w-2xl mx-auto",
              isDark ? "text-white/90" : "text-lev-black/80",
            )}
          >
            {block.description}
          </p>
        )}

        {block.actions && block.actions.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {block.actions.map((action, i) => (
              <CTAButton key={action.id ?? i} action={action} isDarkBg={isDark} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CTAButton({ action, isDarkBg }: { action: CTAAction; isDarkBg: boolean }) {
  const isExternal = /^https?:\/\//.test(action.url);
  const primary = (action.style ?? "primary") === "primary";

  const className = cn(
    "px-6 py-3 rounded-lg typography-S14 transition-colors inline-block",
    primary
      ? "bg-lev-red text-white hover:bg-lev-red/90"
      : isDarkBg
        ? "border border-white text-white hover:bg-white/10"
        : "border border-lev-green-dark text-lev-green-dark hover:bg-lev-green-dark/5",
  );

  if (isExternal) {
    return (
      <a
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.url} className={className}>
      {action.label}
    </Link>
  );
}
