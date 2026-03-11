import Image from "next/image";
import { StartNowBtn } from "@/atoms/start-now-btn";

export function WhereJourneysBegin() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center bg-lev-yellow">
      <div className="bg-lev-yellow-light lg:block hidden absolute inset-y-0 right-0 w-[37%]" />
      <Image
        src="https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_journeys_dGm3u0H.JPG"
        alt="about"
        height={500}
        width={700}
        className="lg:absolute object-cover right-0 top-0 md:max-w-1/2 max-h-[55vh] mb-12 lg:mb-0"
      />
      <div className="container-md pb-12 lg:pb-0 space-y-12">
        <div className="flex flex-col gap-y-4 self-end">
          <h6 className="uppercase typography-M16 text-lev-orange">
            Discover Levntura
          </h6>

          <h1 className="text-6xl leading-14 font-extrabold md:typography-EB74 md:leading-16 w-3/6 uppercase text-lev-red-dark">
            Where <br /> Journeys <br />
            <span className="text-lev-orange">Begin</span>
          </h1>

          <div className="flex gap-4 flex-wrap">
            <StartNowBtn className="border-1 typography-EB16" size="lg" />
            <StartNowBtn className="border-1 typography-EB16" size="lg">
              Contact US
            </StartNowBtn>
          </div>
        </div>
        <article className="lg:flex justify-between space-y-8">
          <p className="opacity-50 typography-R16 leading-5 w-4/5 lg:w-2/4">
            From our main hub in Amman, Jordan, to our offices in Egypt, we’ve
            been shaping the future of Middle Eastern youth through meaningful
            global experiences. Levntura connects ambitious students with study
            abroad, work & travel, and professional training programs across
            North America, Europe, and Australia. Beyond opportunities, we
            inspire transformation—building leadership, language skills, and a
            lifelong sense of adventure that drives young people to dream bigger
            and achieve more. Levntura stands as a trusted bridge between
            cultures, guiding students to unlock their full potential and
            embrace the world as their classroom.
          </p>
          <p className="opacity-50 typography-R16 leading-5 w-4/5 lg:w-3/10">
            Levntura isn’t just a cultural exchange company—it’s a movement
            empowering young dreamers to become global achievers. Rooted in the
            Middle East and connected to the world, we’ve built a reputation for
            authentic programs, personalized mentorship, and transformative
            experiences that expand horizons and nurture global citizens.
          </p>
        </article>
      </div>
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 left-6/10 bg-lev-yellow-light -z-10" />
    </section>
  );
}
