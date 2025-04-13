import { SectionWrapper } from "../(home)/section-wrapper";

export default function ValuesWeLiveBy() {
  return (
    <SectionWrapper sectionColor="bg-lev-yellow-light" className="space-y-8 ">
      <article className="flex flex-col lg:flex-row gap-y-4 justify-between">
        <div className="space-y-4">
          <h4 className="typography-S20 text-lev-orange">mission</h4>
          <div className="md:flex space-y-4">
            <p className="typography-R14 leading-5 md:w-72">
              between their dreams and reality”, by providing the opportunities,
              tools and strategies for achieving the greater good.
            </p>
            <p className="typography-R14 leading-5 md:w-72">
              Levntura facilitates the youth’s connection locally and globally,
              to create leaders with exceptional set of skills, by means of our
              study abroad programs, personal development seminars, local and
              global volunteering opportunities, and most importantly, cultural
              exchange programs.
            </p>
          </div>
        </div>
        <h1 className="typography-B74 leading-16 text-lev-red-dark shrink-0">
          Values We <br />
          Live By
        </h1>
      </article>

      <article className="lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mx-auto">
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">01</h4>
          <h3 className="typography-M24 text-lev-red-dark">Trust</h3>
          <p className="typography-R14 text-lev-red-dark">
            in our Partners, Clients and Mission.
          </p>
        </div>
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">02</h4>
          <h3 className="typography-M24 text-lev-red-dark">Commitment</h3>
          <p className="typography-R14 text-lev-red-dark">
            Better done than said.
          </p>
        </div>
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">03</h4>
          <h3 className="typography-M24 text-lev-red-dark">Having Fun</h3>
          <p className="typography-R14 text-lev-red-dark">
            We are meant to have a blast!
          </p>
        </div>
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">04</h4>
          <h3 className="typography-M24 text-lev-red-dark">Growth</h3>
          <p className="typography-R14 text-lev-red-dark">We design it!</p>
        </div>
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">05</h4>
          <h3 className="typography-M24 text-lev-red-dark">
            Diversity and inclusion
          </h3>
          <p className="typography-R14 text-lev-red-dark">
            a safe, nourishing environment for all the youth.
          </p>
        </div>
        <div className="border-t border-b-lev-gray space-y-4 pt-4">
          <h4 className="typography-R18 opacity-50">06</h4>
          <h3 className="typography-M24 text-lev-red-dark">
            Empowering the youth
          </h3>
          <p className="typography-R14 text-lev-red-dark">
            by broadening their horizons.
          </p>
        </div>
      </article>
    </SectionWrapper>
  );
}
