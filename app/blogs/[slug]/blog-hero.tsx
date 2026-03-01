import Image, { StaticImageData } from "next/image";

import lebanonPhoto from "@/assets/photos/lebanon.jpeg";

interface BlogHeroProps {
  title: string;
  /** When provided, use this image instead of default hero image */
  image?: StaticImageData | string;
  /** Alt text for the hero image (e.g. "Work and Travel in Agency KSA") */
  imageAlt?: string;
}

export function BlogHero({
  title,
  image,
  imageAlt,
}: BlogHeroProps) {
  const heroImage = image ?? lebanonPhoto;
  const alt = imageAlt ?? title;

  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
