import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

interface BlogContentSectionProps {
  id: string;
  title: string;
  content: string;
  image?: StaticImageData | string;
  imagePosition?: "left" | "right" | "full";
}

export function BlogContentSection({
  id,
  title,
  content,
  image,
  imagePosition = "full",
}: BlogContentSectionProps) {
  // Parse content to handle numbered lists and paragraphs
  const contentLines = content.split("\n").filter((line) => line.trim());
  const formattedContent: React.ReactNode[] = [];

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];

    // Check if line starts with a number followed by a period
    const numberedMatch = line.match(/^(\d+)\.\s*(.+)$/);
    if (numberedMatch) {
      const [, number, rest] = numberedMatch;
      const nextLine = contentLines[i + 1];

      // Check if next line is a description (doesn't start with number)
      if (nextLine && !nextLine.match(/^\d+\./)) {
        formattedContent.push(
          <div key={i} className="mb-8">
            <h3 className="typography-EB24 uppercase text-lev-black mb-3">
              {number}.{rest}
            </h3>
            <p className="text-lev-black leading-relaxed">{nextLine}</p>
          </div>
        );
        i++; // Skip next line as it's the description
      } else {
        formattedContent.push(
          <div key={i} className="mb-6">
            <h3 className="typography-EB24 uppercase text-lev-black">
              {number}.{rest}
            </h3>
          </div>
        );
      }
    } else {
      // Regular paragraph
      formattedContent.push(
        <p key={i} className="mb-4 text-lev-black leading-relaxed">
          {line}
        </p>
      );
    }
  }

  return (
    <section id={id} className="scroll-mt-24 mb-16 lg:mb-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 capitalize text-lev-black mb-6">
          {title}
        </h2>
      </FadeUpAnimator>

      {image && imagePosition === "full" && (
        <FadeUpAnimator transition={{ delay: 0.2 }} className="mb-8">
          <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-sm">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </FadeUpAnimator>
      )}

      {image && imagePosition === "right" ? (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <div className="text-lev-black leading-relaxed space-y-4">
              {formattedContent}
            </div>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.4 }}>
            <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-sm">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </FadeUpAnimator>
        </div>
      ) : (
        <FadeUpAnimator transition={{ delay: 0.3 }}>
          <div className="text-lev-gray space-y-4 typography-R18 mb-10">
            {formattedContent}
          </div>
        </FadeUpAnimator>
      )}
    </section>
  );
}
