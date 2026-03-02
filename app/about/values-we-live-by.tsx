import { cn } from "@/design-system/helpers";
import { SectionWrapper } from "../(home)/section-wrapper";

const values = [
  {
    number: "01",
    title: "Trust",
    description:
      "We build lasting relationships founded on honesty, transparency, and integrity—with our partners, clients, and team.",
  },
  {
    number: "02",
    title: "Commitment",
    description:
      "We keep our word and deliver excellence—because actions speak louder than promises.",
  },
  {
    number: "03",
    title: "Fun",
    description:
      "We believe joy fuels creativity—we're meant to learn, grow, and have a blast doing it.",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "We design growth—by pushing boundaries, learning continuously, and inspiring transformation.",
  },
  {
    number: "05",
    title: "Empowerment",
    description:
      "We open minds, broaden horizons, and enable every young person to become a confident global leader.",
  },
];

export default function ValuesWeLiveBy() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-yellow-light"
      className="space-y-8 container-md"
    >
      <article className="flex flex-col lg:flex-row gap-y-4 justify-between">
        <h1 className="typography-B74 ms-auto uppercase leading-16 text-lev-red-dark shrink-0">
          Values We <br />
          Live By
        </h1>
      </article>

      <article
        className={cn(
          "lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mx-auto",
          "[&>*]:border-t [&>*]:border-lev-red-dark/10 [&>*]:space-y-8 [&>*]:pt-4"
        )}
      >
        {values.map((value) => (
          <div key={value.number}>
            <h4 className="typography-R18 text-lev-red-dark opacity-50">
              {value.number}
            </h4>
            <h3 className="typography-M24 text-lev-red-dark">{value.title}</h3>
            <p className="typography-R14 leading-5 text-lev-red-dark">
              {value.description}
            </p>
          </div>
        ))}
      </article>
    </SectionWrapper>
  );
}
