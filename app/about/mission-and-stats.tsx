import { SectionTitle } from "../(home)/section-title";
import { SectionWrapper } from "../(home)/section-wrapper";

const stats = [
  {
    value: "20+",
    label: "COUNTRIES",
  },
  {
    value: "6.5K",
    label: "STUDENTS",
  },
  {
    value: "1.5K",
    label: "UNIVIRSITIES",
  },
];

export function MissionAndStats() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-orange"
      className="space-y-16 container-md"
    >
      <article className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between border-b border-lev-yellow/20 pb-16">
        <SectionTitle className="text-white">
          WHAT IS OUR
          <br />
          MISSION
        </SectionTitle>
        <div className="space-y-6 text-white lg:w-1/3">
          <p className="typography-R12 leading-relaxed">
            between their dreams and raulty*, by providing the opportunities,
            tools and strategies for achieving the greater result.
          </p>
          <p className="typography-R12 leading-relaxed">
            Levntura facilitates the youth&apos;s connection locally and
            globally, to create leaders with exceptional set of skills, by means
            of our study abroad programs, personal development seminars, local
            and global volunteering opportunities, and most importantly,
            cultural exchange programs.
          </p>
        </div>
      </article>

      <article className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <h2 className="text-[100px] font-bold text-lev-yellow leading-none">
              {stat.value}
            </h2>
            <p className="typography-M16 text-white uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </article>
    </SectionWrapper>
  );
}
