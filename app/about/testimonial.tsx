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
    <section className="bg-lev-black h-screen">
      <div className="container flex gap-8 h-full">
        <article className="space-y-4 pt-20 ">
          <h4 className="typography-M20 text-lev-red uppercase">testimonial</h4>

          <h1 className="text-5xl sm:text-6xl font-extrabold lg:typography-EB74 leading-16">
            <span className="text-white opacity-20">STUDENTS</span> <br />
            <span className="text-white ms-20 lg:ms-40">FEEDBACK</span>
          </h1>
        </article>
        <section className="flex flex-row-reverse flex-1 h-full gap-2 md:gap-8">
          <article className="overflow-hidden w-1/2 md:w-70 h-full relative">
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
          <article className="overflow-hidden w-1/2 md:w-70 h-full relative">
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
      <p>{description}</p>
      <div className="flex items-center gap-3">
        <div className="student_img">
          <Image src={image} alt={name} />
        </div>
        <div>
          <h6>{name}</h6>
          <h6 className="position">Student</h6>
        </div>
      </div>
    </div>
  );
}
