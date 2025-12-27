"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

import languageImprovementPhoto from "@/app/programs/work-and-travel/language-improvement-photo.svg";
import meetNewFriendsPhoto from "@/app/programs/work-and-travel/meet-new-friends-photo.svg";
import professionalGrowthPhoto from "@/app/programs/work-and-travel/professional-growth-photo.svg";
import discoverYourselfPhoto from "@/app/programs/work-and-travel/discover-yourself-photo.svg";
import culturalExchangePhoto from "@/app/programs/work-and-travel/culture-exchange-photo.svg";
import travelAroundTheUSAPhoto from "@/app/programs/work-and-travel/travel-around-photo.webp";

import nationalParkPhoto from "@/app/programs/work-and-travel/national-park-photo.svg";
import cedarPointPhoto from "@/app/programs/work-and-travel/cedar-point-photo.svg";
import grandCanyonPhoto from "@/app/programs/work-and-travel/grand-canyon-photo.svg";
import sixFlagsPhoto from "@/app/programs/work-and-travel/great-america-photo.svg";
import { PassportSvg } from "./passport-svg";
import { CollegeSvg } from "./college-svg";
import { EducationSvg } from "./education-svg";
import { LanguageSvg } from "./language-svg";
import { AgeSvg } from "./age-svg";
import { InfinitySvg } from "./infinity-svg";
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
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "FOOD RUNNER",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "WAITER",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "CHEF",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "PHOTOGRAPHY",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "RIDE OPERATOR",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor",
  },
  {
    title: "HOUSE KEEPING",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
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
    src: culturalExchangePhoto,
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
    src: languageImprovementPhoto,
    title: "Language Improvement",
    description:
      "Enhance your English language skills in real-life situations. Engage with locals, overcome language barriers, and return home with newfound confidence in your language abilities.",
  },
];

const countries = [
  {
    src: nationalParkPhoto,
    area: "Yellowstone National Park",
    country: "Montana, Idaho, Wyoming",
  },
  {
    src: cedarPointPhoto,
    area: "Cedar Point",
    country: "Ohio",
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
];

const requirements = [
  {
    svg: <PassportSvg />,
    title: "Valid passport",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    svg: <CollegeSvg />,
    title: "Enrollment in a college",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    svg: <EducationSvg />,
    title: "Education",
    description: "Bachelor’s or higher",
  },
  {
    svg: <LanguageSvg />,
    title: "Language",
    description: "conversational level of English",
  },
  {
    svg: <AgeSvg />,
    title: "Age",
    description: "between 19 and 26 years old.",
  },
  {
    svg: <DiplomaSvg />,
    title: "Degrees Transcript",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    svg: <InfinitySvg />,
    title: "Ready for infinity?",
    description: "Lorem ipsum dolor sit amet.",
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

function WordReveal({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start + 0.05, end],
    [0.15, 1, 1]
  );

  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function ScrollRevealText() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const text =
    "Calling all university students seeking an unforgettable summer experience! If you're yearning for a combination of adventure, cultural exchange, language improvement, and professional growth, look no further than the Summer Work and Travel Program to the USA, proudly provided by the Department of State.";

  const textWords = text.split(" ");

  return (
    <motion.p
      ref={textRef}
      className="typography-S34 leading-9 text-center text-lev-blue-dark"
    >
      {textWords.map((word, index) => (
        <WordReveal
          key={index}
          word={word}
          progress={scrollYProgress}
          index={index}
          total={textWords.length}
        />
      ))}
    </motion.p>
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
          className="flex flex-col uppercase z-10 gap-4 items-center -translate-y-[150px]"
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

      <SectionWrapper className="mb-[200px]">
        <p className="typography-S16 text-center text-lev-blue-light mb-4">
          Embark on a Summer Adventure with the USA Work and Travel Program
        </p>
        <ScrollRevealText />
      </SectionWrapper>

      <SectionWrapper>
        <FadeUpAnimator>
          <SectionTitle className="mb-[80px]">
            What is the <br /> Summer Work <br /> and Travel <br /> Program?{" "}
          </SectionTitle>
        </FadeUpAnimator>
        <FadeUpAnimator className="flex">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            The Summer Work and Travel Program offers students the chance to
            work and travel in the United States during their summer break. It
            provides an opportunity for cultural exchange, language improvement,
            and valuable work experience. Participants engage in temporary jobs
            while exploring diverse landscapes and forging friendships with
            people from around the world.
          </p>
        </FadeUpAnimator>
      </SectionWrapper>

      <SectionWrapper className="flex justify-center items-center">
        <Image src={photo2} alt="" />
      </SectionWrapper>

      <SectionWrapper>
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
            making new friends from around the world, and gaining valuable work
            experience – all while basking in the summer sun. The USA Work and
            Travel Program isn’t just a job opportunity; it’s a gateway to a
            life-changing adventure. By participating, you’ll immerse yourself
            in a unique blend of cultural exchange, language improvement, and
            pure happiness.
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
        <SectionWrapper>
          <FadeUpAnimator>
            <SectionTitle className="mb-[100px] text-[120px]">
              Why You <br /> Should <br /> Participate?
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex ">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              Immerse Yourself In A Unique Blend Of Cultural Exchange, Language
              Improvement, And Pure Happiness.
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
        <SectionWrapper>
          <FadeUpAnimator>
            <SectionTitle className="mb-[40px]">
              What you will <br /> be doing
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex ">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              The Summer Work and Travel Program offers a range of job
              opportunities tailored to your interests and skills. From working
              in bustling cities to charming tourist destinations, choose a job
              that aligns with your passions and allows you to make the most of
              your summer.
            </p>
          </FadeUpAnimator>
        </SectionWrapper>

        <div>
          <Slider
            data={jobs}
            renderItem={(job) => (
              <div className="flex w-[300px] lg:w-[480px] bg-white p-10 flex-col gap-7">
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
              Discover Your Summer Work Adventure: Top Employers and Locations
              for the USA Work and Travel Program!
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
            <div className="relative w-[300px] lg:w-[480px] grid gap-7">
              <Image
                className="pointer-events-none w-full object-cover"
                src={country.src}
                alt=""
              />
              <TitleWithBreaks
                title={country.area}
                className="typography-S24 sm:typography-S34 uppercase "
              />
              <p className="typography-R18 leading-6">{country.country}</p>
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
              <div className="relative grid bg-white w-[250px] lg:w-[480px] h-full  gap-7 p-10">
                <span className="mb-14 inline-block">{requirement.svg}</span>
                <TitleWithBreaks
                  title={requirement.title}
                  className="typography-S24 lg:typography-S34 self-end uppercase"
                />
                {/* <p className="typography-R18 leading-6">
                  {requirement.description}
                </p> */}
              </div>
            )}
          />
        </div>
      </div>

      <SectionWrapper sectionColor="bg-[#F7F7F8]">
        <TourImages gradientProps={{ className: "from-[#F7F7F8]" }} />
      </SectionWrapper>

      <SectionWrapper className="min-h-screen mb-[100px]">
        <FadeUpAnimator>
          <SectionTitle className="mb-[90px]">
            Why Choose <br /> Levntura?
          </SectionTitle>
        </FadeUpAnimator>
        <div className="grid gap-y-[120px] gap-x-24 grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((f, index) => {
            return (
              <FadeUpAnimator
                transition={{ delay: index * 0.2 }}
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
