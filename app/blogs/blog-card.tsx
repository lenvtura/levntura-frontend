import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: StaticImageData | string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

export function BlogCard({
  image,
  category,
  readTime,
  title,
  description,
  date,
  href = "#",
}: BlogCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col cursor-pointer">
        <div className="relative h-[240px] overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-0 pt-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-3">
            <span className="typography-S12 uppercase text-lev-green">
              {category}
            </span>
            <span className="typography-R12 text-lev-gray">{readTime}</span>
          </div>

          <h3 className="typography-S20 uppercase text-lev-black mb-4 leading-tight">
            {title}
          </h3>

          <p className="text-lev-black text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          <p className="typography-R12 text-lev-gray mt-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
}

