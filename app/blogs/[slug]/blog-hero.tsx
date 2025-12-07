import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

import lebanonPhoto from "@/assets/photos/lebanon.jpeg";

interface BlogHeroProps {
  title: string;
}

export function BlogHero({ title }: BlogHeroProps) {
  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={lebanonPhoto}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
