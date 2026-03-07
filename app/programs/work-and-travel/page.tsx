"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import programHeroPhoto from "@/app/programs/work-and-travel/program-hero.webp";
import photo2 from "@/app/programs/work-and-travel/photo2.webp";
import photo3 from "@/app/programs/work-and-travel/photo3.webp";
import { StarSvg } from "@/app/programs/work-and-travel/star-svg";
import { HandSvg } from "@/app/programs/work-and-travel/hand-svg";
import { SectionTitle } from "@/app/(home)/section-title";
import { SectionWrapper } from "@/app/(home)/section-wrapper";
import { Slider } from "./jobs-slider";
import { BenefitsShowcase } from "./benefits-showcase";
import TourImages from "@/app/about/tour-images";
import { FaceSvg } from "./face-svg";
import { BagSvg } from "./bag-svg";
import { PeopleSvg } from "./people-svg";
import { CheckSvg } from "./check-svg";
import { TitleWithBreaks } from "./title-with-breaks";

import meetNewFriendsPhoto from "@/app/programs/work-and-travel/meet-new-friends-photo.svg";
import professionalGrowthPhoto from "@/app/programs/work-and-travel/professional-growth-photo.svg";
import discoverYourselfPhoto from "@/app/programs/work-and-travel/discover-yourself-photo.svg";
import travelAroundTheUSAPhoto from "@/app/programs/work-and-travel/travel-around-photo.webp";

import nationalParkPhoto from "@/app/programs/work-and-travel/national-park-photo.svg";
import cedarPointPhoto from "@/app/programs/work-and-travel/cedar-point-photo.svg";
import grandCanyonPhoto from "@/app/programs/work-and-travel/grand-canyon-photo.svg";
import sixFlagsPhoto from "@/app/programs/work-and-travel/great-america-photo.svg";
import { PassportSvg } from "./passport-svg";
import { CollegeSvg } from "./college-svg";
import { LanguageSvg } from "./language-svg";
import { AgeSvg } from "./age-svg";
import { DiplomaSvg } from "./diploma-svg";

import firstPhoto from "@/assets/photos/3.png";
import secondPhoto from "@/assets/photos/4.png";
import thirdPhoto from "@/assets/photos/5.png";
import fourthPhoto from "@/assets/photos/6.png";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { ContactForm } from "@/app/contact/contact-form";

const jobs = [
  {
    title: "LIFEGUARD",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-life_guard.jpeg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=xK8gTiBfqBu5B8iLTr%2FX6V0nt2g%3D&Expires=1772918119",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "PHOTOGRAPHY",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-photography.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=av%2FHcCFta4jnlbiFtG5Pgfn2HRU%3D&Expires=1772918461",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "RIDE OPERATOR",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-ride_operator.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=dloHT99%2FCPP2R0AJMh79n13D4e8%3D&Expires=1772918695",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "HOUSE KEEPING",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-housekeeping.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=rePPESJk26VcG4ePfe3XeoKuxPI%3D&Expires=1772918740",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "WAITER",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-waiter.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=4RyISc%2Fej9T9BoYrddVG1WU5jY4%3D&Expires=1772920221",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "CHEF",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-cook.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=FF3kKcwsFYNSgGvJzauCQacstck%3D&Expires=1772919021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "FOOD RUNNER",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-food_runner.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=ZgrYtGeVF%2FdDHJ3%2BZSOwDDOTb%2Bc%3D&Expires=1772919062",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "WATER PARK WORKER",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-water-worker.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=E1m4KU1mdgMDMJOFFIFuhT6TYPY%3D&Expires=1772919573",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "CASHIER",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-cashier.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=du4OQvz4p9ZfyaTSq7sXoZmxJKE%3D&Expires=1772919479",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "RECEPTIONIST",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-receptionist.jpeg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=gAZWEn4TXDEqBA58jHb%2FLYtueN0%3D&Expires=1772919436",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "FOOD SERVICE",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-food_worker.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=WBQ3w4sJFXGPZmTsl02gVrVi9og%3D&Expires=1772919378",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "DISH WASHER",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-dishwasher.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=6AW74CJgNrEjl4kDhaGrNghu7Iw%3D&Expires=1772919274",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "BARISTA",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-barista.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=kGKN%2FBksBlUWXasFwgldiH0n6II%3D&Expires=1772919215",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
];

const benefits = [
  {
    src: meetNewFriendsPhoto,
    title: "Meet New \n Friends",
    description:
      "Forge connections with people from diverse backgrounds. The program brings together individuals with a shared sense of adventure, creating friendships that can last a lifetime.",
  },
  {
    src: travelAroundTheUSAPhoto,
    title: "Travel Around the USA",
    description:
      "Beyond the workplace, take advantage of your time in the USA to explore its rich landscapes, iconic landmarks, and vibrant cities. From coast to coast, this is your chance to discover the beauty of the United States.",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=m5p2rMs%2Be8xZONd2S5APOl7xLEM%3D&Expires=1772914451",
    title: "Cultural Exchange",
    description:
      "Immerse yourself in the diverse tapestry of American culture. Engage with locals, understand their traditions, and share your own experiences. This exchange is a two-way street, offering you a deeper understanding of the world.",
  },
  {
    src: discoverYourselfPhoto,
    title: "Discover Yourself",
    description:
      "Challenge yourself in new environments, overcome obstacles, and uncover hidden strengths. The program isn’t just about working; it’s an opportunity for personal growth and self-discovery.",
  },
  {
    src: professionalGrowthPhoto,
    title: "Professional Growth",
    description:
      "Gain hands-on work experience in the USA, adding an international flair to your resume. Whether you choose to work in hospitality, tourism, or a variety of other sectors, this program opens doors to new opportunities.",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_language-improvement.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=5qAJXqUUQwvzd3RrawgdYxweIfg%3D&Expires=1772914328",
    title: "Language Improvement",
    description:
      "Enhance your English language skills in real-life situations. Engage with locals, overcome language barriers, and return home with newfound confidence in your language abilities.",
  },
];

const countries = [
  {
    src: cedarPointPhoto,
    area: "Cedar Point",
    country: "Ohio",
  },
  {
    src: nationalParkPhoto,
    area: "Yellowstone National Park",
    country: "Montana, Idaho, Wyoming",
  },
  {
    src: grandCanyonPhoto,
    area: "Grand Canyon National Park",
    country: "Arizona",
  },
  {
    src: sixFlagsPhoto,
    area: "Six Flags Great America",
    country: "Arizona",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_culture-exchange.jpeg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=MTJKuUkLiJmb3Dsp6%2B%2FMPZvTlTA%3D&Expires=1772915023",
    area: "Continental Pool",
    country: "Maryland",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_smugglers-notch_resort.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=U7Nit2TzJYfpvNUjRz7Z3MFu%2F4M%3D&Expires=1772915203",
    area: "Smugglers Notch Resort- Vermont ",
    country: "Vermont ",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_food-lion.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=u%2BMTKHnzPtNLe9YbdlQp7wcw%2FmM%3D&Expires=1772915287",
    area: "Food Lion",
    country: "Maryland",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_fun-city.webp?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=TeBf9mcbv3faWEkpLGKbC9EJxrg%3D&Expires=1772915367",
    area: "Fun City",
    country: "Colorado",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_aramark-kauffman-stadium.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=%2BNlg3NysF8XlZw49WSMudCO%2FSxY%3D&Expires=1772915470",
    area: "Aramark-Kauffman Stadium",
    country: "Missouri",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_kalahari-resort.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=lgZzV%2FqZo53dJHHbBaHOmr19i9U%3D&Expires=1772915578",
    area: "Kalahari Resort",
    country: "Ohio",
  },
  {
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-next_destination-point_sebago.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=lArjK1fJyNiaUghsgnxv8d%2Fbiuw%3D&Expires=1772915680",
    area: "Point Sebago",
    country: "Main ",
  },
];

const requirements = [
  {
    svg: <PassportSvg />,
    title: "Passport",
    description: "Valid Passport",
  },
  {
    svg: <CollegeSvg />,
    title: "Education",
    description: "Enrollment as a Full-Time University Student",
  },
  {
    svg: <LanguageSvg />,
    title: "Language",
    description: "English Language Proficiency",
  },
  {
    svg: <AgeSvg />,
    title: "Age",
    description: "between 18–25",
  },
  {
    svg: <DiplomaSvg />,
    title: "Interview",
    description: "Interview & Application Form",
  },
];

const features = [
  {
    icon: <StarSvg />,
    title: "5-Star\nRatings",
    description:
      "Recognized with top-notch reviews on Google Maps and Facebook, showcasing our commitment to client satisfaction.",
  },
  {
    icon: <BagSvg />,
    title: "Diverse Job\nOffers",
    description:
      "Explore a wide range of exciting job opportunities tailored to your preferences and professional goals.",
  },
  {
    icon: <HandSvg />,
    title: "Rich Cultural\nExperience",
    description:
      "Founded by individuals with active participation in cultural exchange programs, offering valuable insights and a seamless immersion process.",
  },
  {
    icon: <PeopleSvg />,
    title: "Effortless\nRegistration",
    description:
      "Simple and smooth steps to register with Levntura, ensuring a hassle-free onboarding experience.",
  },
  {
    icon: <FaceSvg />,
    title: "Comprehensive\nSupport",
    description:
      "From embassy assistance to job interviews, count on us for thorough guidance and support throughout your journey.",
  },
  {
    icon: <CheckSvg />,
    title: "Experience-\nCentric Approach",
    description:
      "We prioritize creating meaningful experiences, ensuring participants get the most out of their cultural exchange programs.",
  },
];

function ScrollRevealText() {
  const text =
    "Calling all university students ready for a summer that blends adventure, cultural discovery, and real-world experience! If you’re eager to improve your English, meet new friends from around the globe, and gain professional growth along the way, the USA Work & Travel Program, officially designated by the U.S. Department of State, is your gateway to a truly unforgettable season.";

  return (
    <p className="typography-S34 leading-9 text-center text-lev-blue-dark">
      {text}
    </p>
  );
}

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  return (
    <div className="bg-[#F7F7F8]">
      <div
        ref={heroRef}
        className="flex relative bg-gradient-to-b from-lev-gray-light to-transparent justify-center items-center min-h-screen overflow-hidden"
      >
        <motion.div
          style={{ y: imageY }}
          className="min-w-[2000px] w-full absolute z-100 -bottom-[300px] left-1/2 -translate-x-1/2"
        >
          <Image
            src={programHeroPhoto}
            className="w-full pointer-events-none object-cover"
            alt=""
          />
          <StartNowBtn className="z-10 text-white cursor-pointer border-white absolute top-[350px] left-[50%] translate-x-[-50%]" />
        </motion.div>
        <motion.div
          style={{ y: textY }}
          className="flex flex-col uppercase z-10 gap-4 items-center -translate-y-[200px]"
        >
          <span className="typography-B18">SUMMER</span>
          <h1 className="typography-EB48! mix-blend-difference! sm:typography-EB74! text-[90px] text-lev-blue-dark ">
            WORK & TRAVEL
          </h1>
          <p className="typography-S18 mix-blend-difference text-lev-blue-dark">
            BACHELOR & MASTER&apos;S DEGREE STUDENTS
          </p>
          <p className="typography-S18 text-lev-blue-dark">
            Program only to USA.
          </p>
        </motion.div>
      </div>

      <SectionWrapper className="mb-[64px]">
        <p className="typography-S16 text-center text-lev-blue-light mb-4">
          Embark on a Summer Adventure with Levntura’s USA Work & Travel
          Program.
        </p>
        <ScrollRevealText />
      </SectionWrapper>

      <SectionWrapper className="container-md">
        <FadeUpAnimator>
          <SectionTitle className="mb-[80px]">
            What is the <br /> Summer Work <br /> and Travel <br />{" "}
            Program?{" "}
          </SectionTitle>
        </FadeUpAnimator>
        <FadeUpAnimator className="flex">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            <strong>The Summer Work and Travel Program</strong> allows
            university students to spend their summer working and exploring the
            United States. It’s a unique opportunity for{" "}
            <strong>
              cultural exchange, language improvement, and hands-on work
              experience
            </strong>{" "}
            within real American communities. Participants engage in seasonal
            jobs, discover new cities, and build lifelong friendships while
            immersing themselves in U.S. culture and everyday life.
          </p>
        </FadeUpAnimator>
      </SectionWrapper>

      <SectionWrapper className="flex justify-center items-center">
        <Image src={photo2} alt="" />
      </SectionWrapper>

      <SectionWrapper className="container-md">
        <FadeUpAnimator>
          <span className="typography-R18 text-lev-blue mb-8 inline-block">
            Why You Should Participate
          </span>
          <SectionTitle className="mb-[40px] sm:mb-0">
            Picture <br /> yourself
          </SectionTitle>
        </FadeUpAnimator>
        <FadeUpAnimator className="flex lg:-translate-y-[50px]">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            meeting friends from every corner of the world, discovering new
            places, and gaining hands-on experience under the summer sun. The
            USA Work & Travel Program isn’t just a seasonal job; it’s your
            ticket to a life-changing adventure. By joining, you’ll grow
            personally and professionally while enjoying a perfect mix of
            cultural exchange, language improvement, and unforgettable joy.
          </p>
        </FadeUpAnimator>
      </SectionWrapper>

      <SectionWrapper className="flex justify-center items-center mb-[200px]">
        <div className="relative max-w-[85%] rounded-full overflow-hidden">
          <Image className="w-full h-full" src={photo3} alt="" />
          <div className="absolute hidden lg:flex  text-center  flex-col gap-6 p-8 justify-center aspect-square shrink-0 items-center end-8 h-[80%] top-1/2 -translate-y-1/2 bg-lev-yellow rounded-full">
            <p className="uppercase text-lev-red-dark typography-EB24">
              unforgettable <br /> journey
            </p>
            <p>
              Join the USA Work and Travel Program and make this summer the one
              you’ll always remember. Embrace the thrill, enhance your skills,
              and create memories that will last a lifetime.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <div className="mb-[180px]">
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            <SectionTitle className="mb-[100px] text-[120px]">
              Why You <br /> Should <br /> Participate?
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex ">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              Immerse yourself in a once-in-a-lifetime journey that blends work
              experience, cultural discovery, and language growth, all wrapped
              in the excitement of an American summer. It’s more than a program;
              it’s a season of new friendships, freedom, and unforgettable
              moments.
            </p>
          </FadeUpAnimator>
        </SectionWrapper>
        <div>
          <Slider
            data={benefits}
            renderItem={(benefit) => (
              <div>
                <div className="relative h-[400px] sm:h-[670px] w-[300px] sm:w-[480px] flex flex-col gap-7">
                  <Image
                    width={500}
                    height={500}
                    className="absolute object-cover pointer-events-none w-full h-full inset-0"
                    src={benefit.src}
                    alt=""
                  />
                  <TitleWithBreaks
                    title={benefit.title}
                    className="typography-EB34 sm:typography-EB48 text-white absolute bottom-10 left-10 uppercase "
                  />
                </div>
                <p className="typography-R16 text-gray-500 w-[300px] sm:w-[480px] mt-4 leading-6">
                  {benefit.description}
                </p>
              </div>
            )}
          />
        </div>
      </div>

      <div className="mb-[150px]">
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            <SectionTitle className="mb-[40px]">
              What you will <br /> be doing
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex ">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              The Summer Work & Travel Program opens doors to exciting seasonal
              jobs across the U.S., from theme parks and beach resorts to
              national landmarks and city cafés. Choose a role that matches your
              interests, sharpen your skills, and experience what it’s like to
              work and live in a new culture, all while making the most of your
              American summer.
            </p>
          </FadeUpAnimator>
        </SectionWrapper>

        <div>
          <Slider
            data={jobs}
            renderItem={(job) => (
              <div className="flex size-[300px] lg:size-[450px] justify-center bg-white p-10 flex-col gap-7">
                <div className="size-[200px] self-center shrink-0 lg:size-[300px] aspect-square overflow-hidden rounded-full">
                  <Image
                    src={job.image}
                    className="object-cover w-full h-full pointer-events-none"
                    width={300}
                    height={300}
                    alt={job.title}
                  />
                </div>
                <h4 className="typography-EB34 min-h-[200px lg:typography-EB48 text-lev-red-dark">
                  {job.title}
                </h4>
                {/* <p className="typography-R18 leading-6">{job.description}</p> */}
              </div>
            )}
          />
        </div>
      </div>

      <div className="mb-[100px] sm:mb-0">
        <SectionWrapper>
          <FadeUpAnimator>
            <p className="mb-12 text-lev-red-dark w-[300px]">
              <strong>Discover your next summer adventure!</strong> Explore top
              employers and destinations across the U.S. through the Work &
              Travel Program, where every job brings new skills, friendships,
              and unforgettable memories.
            </p>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex">
            <SectionTitle className="ms-auto text-end">
              CHOOSE YOUR <br /> NEXT ADVENTURE
            </SectionTitle>
          </FadeUpAnimator>
        </SectionWrapper>
        <Slider
          data={countries}
          renderItem={(country) => (
            <div className="flex flex-col gap-4 w-[400px]">
              <div className="relative shrink-0  overflow-hidden rounded-full  h-[300px] aspect-square grid gap-7">
                <Image
                  fill
                  className="pointer-events-none w-full object-cover"
                  src={country.src}
                  alt=""
                />
              </div>
              <div className="self-center text-center">
                <TitleWithBreaks
                  title={country.area}
                  className="typography-S24 leading-9! sm:typography-S34 uppercase "
                />
                <p className="typography-R18 leading-6">{country.country}</p>
              </div>
            </div>
          )}
        />
      </div>

      <SectionWrapper>
        <BenefitsShowcase />
      </SectionWrapper>

      <div className="flex h-[60vh] gap-8 flex-col">
        <SectionTitle className="ms-auto me-[40px] lg:me-[350px] uppercase mb-[80px] text-lev-red">
          Required
        </SectionTitle>
        <div className="mb-[120px]">
          <Slider
            data={requirements}
            renderItem={(requirement) => (
              <div className="relative grid bg-white w-[250px] h-full  gap-7 p-6">
                <span className="mb-14 inline-block">{requirement.svg}</span>
                <TitleWithBreaks
                  title={requirement.title}
                  className="typography-S24 lg:typography-M24 self-end"
                />
                <p className="typography-R18 leading-6">
                  {requirement.description}
                </p>
              </div>
            )}
          />
        </div>
      </div>

      <SectionWrapper sectionColor="bg-[#F7F7F8]">
        <TourImages
          gradientProps={{ className: "from-[#F7F7F8]" }}
          title="WE’RE CREATING MEMORIES, WILL YOU BE PART OF THEM?"
        />
      </SectionWrapper>

      <SectionWrapper className="min-h-screen container-md mb-[100px]">
        <FadeUpAnimator>
          <SectionTitle className="mb-[90px]">
            Why Choose <br /> Levntura?
          </SectionTitle>
        </FadeUpAnimator>
        <div className="grid gap-y-[120px] gap-x-24 grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((f, index) => {
            return (
              <FadeUpAnimator
                transition={{ delay: index * 0.1 }}
                key={f.title}
                className="flex gap-4 lg:gap-10"
              >
                <span className="shrink-0 w-[80px]">{f.icon}</span>
                <div>
                  <TitleWithBreaks
                    title={f.title}
                    className="text-lev-blue-dark leading-9 mb-[22px] typography-R34 text-[32px]"
                  />
                  <p className="typography-R18 leading-6 text-lev-red-dark max-w-[350px]">
                    {f.description}
                  </p>
                </div>
              </FadeUpAnimator>
            );
          })}
        </div>
      </SectionWrapper>

      <div className="relative">
        <SectionWrapper>
          <div className="h-[500px] flex justify-between">
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <Image src={firstPhoto} alt="" />
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <Image src={secondPhoto} alt="" />
            </FadeUpAnimator>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <FadeUpAnimator>
              <SectionTitle>
                Are You <br /> Ready to <br /> Change <br /> Your <br /> World?
              </SectionTitle>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <ContactForm />
            </FadeUpAnimator>
          </div>
        </SectionWrapper>
        <div className="flex gap-14">
          <FadeUpAnimator className="w-full ">
            <Image src={fourthPhoto} alt="" className=" " />
          </FadeUpAnimator>
          <FadeUpAnimator className="w-full">
            <Image src={thirdPhoto} alt="" className="ml-auto mr-6" />
          </FadeUpAnimator>
        </div>
      </div>
    </div>
  );
}
