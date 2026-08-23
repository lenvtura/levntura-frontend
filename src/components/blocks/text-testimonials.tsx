import Image, { type StaticImageData } from "next/image";

import { mediaUrl, mediaAlt } from "@/lib/url";
import type { TextTestimonialsBlock as TextTestimonialsBlockData } from "@/lib/types";

import studentImg from "@/assets/photos/s-1.png";

interface RenderTestimonial {
  key: string;
  name: string;
  description: string;
  role?: string;
  photoSrc: string | StaticImageData;
}

interface TextTestimonialsBlockProps {
  block: TextTestimonialsBlockData;
}

export function TextTestimonialsBlock({ block }: TextTestimonialsBlockProps) {
  if (!block.headingFaded || !block.headingSolid) return null;

  const testimonials: RenderTestimonial[] = (block.testimonials ?? []).map(
    (t, i) => ({
      key: t.id ?? `t-${i}`,
      name: t.name,
      description: t.description,
      role: t.role,
      photoSrc:
        mediaUrl(t.photo, "card") ?? mediaUrl(t.photo) ?? studentImg.src,
    }),
  );

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-lev-black min-h-screen py-8 md:py-0 md:h-screen">
      <div className="container flex flex-col md:flex-row gap-4 md:gap-8 h-full">
        <article className="space-y-2 md:space-y-4 pt-8 md:pt-20">
          {block.eyebrow && (
            <h4 className="typography-M20 text-lev-red uppercase text-sm md:text-base">
              {block.eyebrow}
            </h4>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:typography-EB74 leading-tight md:leading-16">
            <span className="text-white opacity-20">{block.headingFaded}</span>{" "}
            <br />
            <span className="text-white ms-8 sm:ms-12 md:ms-20 lg:ms-40">
              {block.headingSolid}
            </span>
          </h1>
        </article>

        <section className="flex md:hidden overflow-hidden pb-4 -mx-6 px-6">
          <div
            className="flex gap-4 animate-horizontal"
            style={{ width: "max-content" }}
          >
            {testimonials.map((t) => (
              <Comment
                key={`first-${t.key}`}
                className="flex flex-col justify-between bg-white p-4 h-64 w-[85vw] flex-shrink-0"
                testimonial={t}
              />
            ))}
            {testimonials.map((t) => (
              <Comment
                key={`second-${t.key}`}
                className="flex flex-col justify-between bg-white p-4 h-64 w-[85vw] flex-shrink-0"
                testimonial={t}
              />
            ))}
          </div>
        </section>

        <section className="hidden md:flex md:flex-row-reverse flex-1 h-full gap-8">
          <article className="overflow-hidden w-70 h-full relative">
            {testimonials.map((t, idx) => (
              <Comment
                key={t.key}
                className="flex flex-col justify-between w-full bg-white p-4 h-80 absolute bottom-full animate-to-bottom"
                style={{
                  animationDelay: `calc(20s / ${testimonials.length} * (${testimonials.length} - ${idx + 1}) * -1)`,
                }}
                testimonial={t}
              />
            ))}
          </article>
          <article className="overflow-hidden w-70 h-full relative">
            {testimonials.map((t, idx) => (
              <Comment
                key={t.key}
                className="flex flex-col justify-between bg-white p-4 h-80 w-full absolute top-full animate-to-top"
                style={{
                  animationDelay: `calc(20s / ${testimonials.length} * (${testimonials.length} - ${idx + 1}) * -1)`,
                }}
                testimonial={t}
              />
            ))}
          </article>
        </section>
      </div>
    </section>
  );
}

function Comment({
  testimonial,
  ...props
}: React.ComponentProps<"div"> & { testimonial: RenderTestimonial }) {
  return (
    <div {...props}>
      <p className="text-sm md:text-base mb-3 md:mb-0">
        {testimonial.description}
      </p>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="student_img w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
          {typeof testimonial.photoSrc === "string" ? (
            <Image
              src={testimonial.photoSrc}
              alt={testimonial.name}
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Image
              src={testimonial.photoSrc}
              alt={mediaAlt(undefined, testimonial.name)}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <div>
          <h6 className="text-sm md:text-base font-semibold">
            {testimonial.name}
          </h6>
          <h6 className="position text-xs md:text-sm text-gray-600">
            {testimonial.role ?? "Student"}
          </h6>
        </div>
      </div>
    </div>
  );
}
