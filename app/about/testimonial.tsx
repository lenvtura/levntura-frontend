import studentImg from "@/assets/photos/s-1.png";
import Image, { StaticImageData } from "next/image";

const testimonials = [
  {
    name: "Yazan Al-Halawani",
    description: "Highly recommend, experienced people and great service.",
    image: studentImg,
  },
  {
    name: "Afaf Kamal",
    description: "My experience with Levntura was amazing.",
    image: studentImg,
  },
  {
    name: "Huthaifa Alkhateeb",
    description: "Fantastic program and service!",
    image: studentImg,
  },
];

export function Testimonial() {
  return (
    <section className="bg-lev-black min-h-screen py-8 md:py-0 md:h-screen">
      <div className="container flex flex-col md:flex-row gap-4 md:gap-8 h-full">
        <article className="space-y-2 md:space-y-4 pt-8 md:pt-20">
          <h4 className="typography-M20 text-lev-red uppercase text-sm md:text-base">
            testimonial
          </h4>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:typography-EB74 leading-tight md:leading-16">
            <span className="text-white opacity-20">STUDENTS</span> <br />
            <span className="text-white ms-8 sm:ms-12 md:ms-20 lg:ms-40">
              FEEDBACK
            </span>
          </h1>
        </article>
        {/* Mobile: Infinite horizontal scrolling */}
        <section className="flex md:hidden overflow-hidden pb-4 -mx-6 px-6">
          <div
            className="flex gap-4 animate-horizontal"
            style={{ width: "max-content" }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, idx) => (
              <Comment
                key={`first-${idx}`}
                className="flex flex-col justify-between bg-white p-4 h-64 w-[85vw] flex-shrink-0"
                name={testimonial.name}
                description={testimonial.description}
                image={testimonial.image}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, idx) => (
              <Comment
                key={`second-${idx}`}
                className="flex flex-col justify-between bg-white p-4 h-64 w-[85vw] flex-shrink-0"
                name={testimonial.name}
                description={testimonial.description}
                image={testimonial.image}
              />
            ))}
          </div>
        </section>

        {/* Desktop: Vertical scrolling animations */}
        <section className="hidden md:flex md:flex-row-reverse flex-1 h-full gap-8">
          <article className="overflow-hidden w-70 h-full relative">
            {testimonials.map((testimonial, idx) => (
              <Comment
                key={idx}
                className="flex flex-col justify-between w-full bg-white p-4 h-80 absolute bottom-full animate-to-bottom"
                style={{
                  animationDelay: `calc(20s / 3 * (3 - ${idx + 1}) * -1)`,
                }}
                name={testimonial.name}
                description={testimonial.description}
                image={testimonial.image}
              />
            ))}
          </article>
          <article className="overflow-hidden w-70 h-full relative">
            {testimonials.map((testimonial, idx) => (
              <Comment
                key={idx}
                className="flex flex-col justify-between bg-white p-4 h-80 w-full absolute top-full animate-to-top"
                style={{
                  animationDelay: `calc(20s / 3 * (3 - ${idx + 1}) * -1)`,
                }}
                name={testimonial.name}
                description={testimonial.description}
                image={testimonial.image}
              />
            ))}
          </article>
        </section>
      </div>
    </section>
  );
}

function Comment({
  name,
  description,
  image,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
  description: string;
  image: StaticImageData;
}) {
  return (
    <div {...props}>
      <p className="text-sm md:text-base mb-3 md:mb-0">{description}</p>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="student_img w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h6 className="text-sm md:text-base font-semibold">{name}</h6>
          <h6 className="position text-xs md:text-sm text-gray-600">Student</h6>
        </div>
      </div>
    </div>
  );
}
