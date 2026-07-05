"use client";

import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

import { Link } from "@/i18n/navigation";

interface FeaturedBlogCardProps {
  image: StaticImageData | string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

export function FeaturedBlogCard({
  image,
  category,
  readTime,
  title,
  description,
  date,
  href = "#",
}: FeaturedBlogCardProps) {
  return (
    <Link href={href}>
      <div className="container-md mb-12 lg:mb-24">
        <div className="flex flex-col md:flex-row gap-8 group cursor-pointer">
          <FadeUpAnimator transition={{ delay: 0.1 }} className="w-full  ">
            <div className="relative aspect-square h-[350px] w-full overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-lev-gray-light" />
              )}
            </div>
          </FadeUpAnimator>

          <div className="flex flex-col">
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="typography-S14 uppercase text-lev-green">
                  {category}
                </span>
                <span className="typography-R14 text-lev-gray">{readTime}</span>
              </div>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <h2 className="typography-EB34 lg:typography-EB48 uppercase text-lev-green-dark mb-6">
                {title}
              </h2>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <p className="text-lev-red-dark leading-relaxed mb-6">
                {description}
              </p>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.5 }}>
              <p className="typography-R14 text-lev-gray">{date}</p>
            </FadeUpAnimator>
          </div>
        </div>
      </div>
    </Link>
  );
}
