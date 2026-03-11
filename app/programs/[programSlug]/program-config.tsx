import { ReactNode } from "react";
import { StaticImageData } from "next/image";

import { StarSvg } from "@/app/programs/work-and-travel/star-svg";
import { HandSvg } from "@/app/programs/work-and-travel/hand-svg";
import { FaceSvg } from "@/app/programs/work-and-travel/face-svg";
import { BagSvg } from "@/app/programs/work-and-travel/bag-svg";
import { PeopleSvg } from "@/app/programs/work-and-travel/people-svg";
import { CheckSvg } from "@/app/programs/work-and-travel/check-svg";
import { PassportSvg } from "@/app/programs/work-and-travel/passport-svg";
import { CollegeSvg } from "@/app/programs/work-and-travel/college-svg";
import { LanguageSvg } from "@/app/programs/work-and-travel/language-svg";
import { AgeSvg } from "@/app/programs/work-and-travel/age-svg";
import { DiplomaSvg } from "@/app/programs/work-and-travel/diploma-svg";

import photo2 from "@/app/programs/work-and-travel/photo2.webp";
import photo3 from "@/app/programs/work-and-travel/photo3.webp";
import meetNewFriendsPhoto from "@/app/programs/work-and-travel/meet-new-friends-photo.svg";
import professionalGrowthPhoto from "@/app/programs/work-and-travel/professional-growth-photo.svg";
import discoverYourselfPhoto from "@/app/programs/work-and-travel/discover-yourself-photo.svg";
import travelAroundTheUSAPhoto from "@/app/programs/work-and-travel/travel-around-photo.webp";
import nationalParkPhoto from "@/app/programs/work-and-travel/national-park-photo.svg";
import cedarPointPhoto from "@/app/programs/work-and-travel/cedar-point-photo.svg";
import grandCanyonPhoto from "@/app/programs/work-and-travel/grand-canyon-photo.svg";
import sixFlagsPhoto from "@/app/programs/work-and-travel/great-america-photo.svg";

export interface Job {
  title: string;
  image: string;
}

export interface Benefit {
  src: StaticImageData | string;
  title: string;
  description: string;
}

export interface Destination {
  src: StaticImageData | string;
  area: string;
  country: string;
}

export interface Requirement {
  svg: ReactNode;
  title: string;
  description: string;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ProgramPageConfig {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    note: string;
    image: StaticImageData | string;
  };
  photo2: StaticImageData | string;
  photo3: StaticImageData | string;
  intro: {
    eyebrow: string;
    body: string;
  };
  whatIs: {
    title: ReactNode;
    body: ReactNode;
  };
  pictureYourself: {
    eyebrow: string;
    body: string;
    circleHeading: string;
    circleBody: string;
  };
  whyParticipate: {
    body: string;
    benefits: Benefit[];
  };
  jobs: {
    body: string;
    items: Job[];
  };
  destinations: {
    leadText: string;
    items: Destination[];
  };
  memories: {
    title: string;
  };
  benefitsShowcase: {
    title: ReactNode;
    items: string[];
  };
  requirements: Requirement[];
  features: Feature[];
}

export const PROGRAM_CONFIG: Record<string, ProgramPageConfig> = {
  "work-and-travel": {
    hero: {
      tag: "SUMMER",
      title: "WORK & TRAVEL",
      subtitle: "BACHELOR & MASTER'S DEGREE STUDENTS",
      note: "Program only to USA.",
      image:
        "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-hero_Ul9fA9V.jpg",
    },
    photo2,
    photo3,
    intro: {
      eyebrow:
        "Embark on a Summer Adventure with Levntura's USA Work & Travel Program.",
      body: "Calling all university students ready for a summer that blends adventure, cultural discovery, and real-world experience! If you're eager to improve your English, meet new friends from around the globe, and gain professional growth along the way, the USA Work & Travel Program, officially designated by the U.S. Department of State, is your gateway to a truly unforgettable season.",
    },
    whatIs: {
      title: (
        <>
          What is the <br /> Summer Work <br /> and Travel <br /> Program?{" "}
        </>
      ),
      body: (
        <>
          <strong>The Summer Work and Travel Program</strong> allows university
          students to spend their summer working and exploring the United
          States. It&apos;s a unique opportunity for{" "}
          <strong>
            cultural exchange, language improvement, and hands-on work
            experience
          </strong>{" "}
          within real American communities. Participants engage in seasonal
          jobs, discover new cities, and build lifelong friendships while
          immersing themselves in U.S. culture and everyday life.
        </>
      ),
    },
    pictureYourself: {
      eyebrow: "Why You Should Participate",
      body: "meeting friends from every corner of the world, discovering new places, and gaining hands-on experience under the summer sun. The USA Work & Travel Program isn't just a seasonal job; it's your ticket to a life-changing adventure. By joining, you'll grow personally and professionally while enjoying a perfect mix of cultural exchange, language improvement, and unforgettable joy.",
      circleHeading: "unforgettable journey",
      circleBody:
        "Join the USA Work and Travel Program and make this summer the one you'll always remember. Embrace the thrill, enhance your skills, and create memories that will last a lifetime.",
    },
    whyParticipate: {
      body: "Immerse yourself in a once-in-a-lifetime journey that blends work experience, cultural discovery, and language growth, all wrapped in the excitement of an American summer. It's more than a program; it's a season of new friendships, freedom, and unforgettable moments.",
      benefits: [
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
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp_dRkOpqL.jpg",
          title: "Cultural Exchange",
          description:
            "Immerse yourself in the diverse tapestry of American culture. Engage with locals, understand their traditions, and share your own experiences. This exchange is a two-way street, offering you a deeper understanding of the world.",
        },
        {
          src: discoverYourselfPhoto,
          title: "Discover Yourself",
          description:
            "Challenge yourself in new environments, overcome obstacles, and uncover hidden strengths. The program isn't just about working; it's an opportunity for personal growth and self-discovery.",
        },
        {
          src: professionalGrowthPhoto,
          title: "Professional Growth",
          description:
            "Gain hands-on work experience in the USA, adding an international flair to your resume. Whether you choose to work in hospitality, tourism, or a variety of other sectors, this program opens doors to new opportunities.",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_language-improvement_iEsA3rg.jpg",
          title: "Language Improvement",
          description:
            "Enhance your English language skills in real-life situations. Engage with locals, overcome language barriers, and return home with newfound confidence in your language abilities.",
        },
      ],
    },
    jobs: {
      body: "The Summer Work & Travel Program opens doors to exciting seasonal jobs across the U.S., from theme parks and beach resorts to national landmarks and city cafés. Choose a role that matches your interests, sharpen your skills, and experience what it's like to work and live in a new culture, all while making the most of your American summer.",
      items: [
        {
          title: "LIFEGUARD",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-life_guard_YtXoOkg.jpeg",
        },
        {
          title: "PHOTOGRAPHY",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-photography_DyGSsld.JPG",
        },
        {
          title: "RIDE OPERATOR",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-ride_operator_rgyjmjB.jpg",
        },
        {
          title: "HOUSE KEEPING",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-housekeeping_zbxeFeJ.JPG",
        },
        {
          title: "WAITER",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-waiter_YCfRw4y.jpg",
        },
        {
          title: "CHEF",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-cook_sAoQyNF.jpg",
        },
        {
          title: "FOOD RUNNER",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-food_runner_bYW0DTZ.JPG",
        },
        {
          title: "WATER PARK WORKER",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-water-worker_O8y836C.JPG",
        },
        {
          title: "CASHIER",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-cashier_p0PnC4b.jpg",
        },
        {
          title: "RECEPTIONIST",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-receptionist_QIgteOq.jpeg",
        },
        {
          title: "FOOD SERVICE",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-food_worker_JQcbMCU.jpg",
        },
        {
          title: "DISH WASHER",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-dishwasher_CRD54CX.jpg",
        },
        {
          title: "BARISTA",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-barista_EjX8hKw.jpg",
        },
      ],
    },
    destinations: {
      leadText:
        "Discover your next summer adventure! Explore top employers and destinations across the U.S. through the Work & Travel Program, where every job brings new skills, friendships, and unforgettable memories.",
      items: [
        { src: cedarPointPhoto, area: "Cedar Point", country: "Ohio" },
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
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_culture-exchange_vF9hqNc.jpeg",
          area: "Continental Pool",
          country: "Maryland",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_smugglers-notch_resort_iNwhxF4.jpg",
          area: "Smugglers Notch Resort- Vermont ",
          country: "Vermont ",
        },
        {
          src: "http://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_food-lion_UkqwzVL.jpg",
          area: "Food Lion",
          country: "Maryland",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_fun-city_AQoTxNt.webp",
          area: "Fun City",
          country: "Colorado",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_aramark-kauffman-stadium_N5OiFuF.jpg",
          area: "Aramark-Kauffman Stadium",
          country: "Missouri",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_kalahari-resort_0zxFCfG.jpg",
          area: "Kalahari Resort",
          country: "Ohio",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-next_destination-point_sebago_xr9kC0v.jpg",
          area: "Point Sebago",
          country: "Main ",
        },
      ],
    },
    memories: {
      title: "WE'RE CREATING MEMORIES, WILL YOU BE PART OF THEM?",
    },
    benefitsShowcase: {
      title: (
        <>
          <span className="text-lev-blue-dark">AN </span>
          <span className="text-lev-blue">AMAZING</span>
          <br />
          <span className="text-lev-blue">EXPERINCE </span>
          <span className="text-lev-blue-dark">AND</span>
          <br />
          <span className="text-lev-blue-dark">YET YOU WILL GET</span>
        </>
      ),
      items: [
        "30-day travel period after your program ends",
        "Comfortable housing accommodation",
        "Comprehensive health insurance coverage",
        "Paid Job placement in your preferred field",
        'Official work permit "DS-2019"',
        "U.S. Social Security number",
        "Sponsorship & Visa Assistance",
      ],
    },
    requirements: [
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
    ],
    features: [
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
    ],
  },
  "camp-counselor": {
    hero: {
      tag: "SUMMER",
      title: "CAMP COUNSELOR",
      subtitle: "BACHELOR & MASTER’S DEGREE STUDENTS OR GRADUATES",
      note: "Program only to USA.",
      image:
        "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-hero_cnNHDpN.jpg",
    },
    photo2,
    photo3,
    intro: {
      eyebrow:
        "Embark on a Meaningful Summer Journey with Levntura’s Camp Counselor Program.",
      body: "Calling all students and graduates passionate about leadership, adventure, and cultural exchange! If you’re looking for a summer that combines personal growth, outdoor fun, and global friendships, the Camp Counsellor Program with Levntura is your gateway to an unforgettable experience in the USA, proudly supported by the U.S. Department of State.",
    },
    whatIs: {
      title: (
        <>
          What is the <br /> Camp Counselor <br /> Program?{" "}
        </>
      ),
      body: (
        <>
          The Camp Counselor Program offers university students and graduates
          the chance to work in U.S. summer camps, guiding and inspiring young
          campers while experiencing life in the great outdoors. It’s an
          exchange opportunity that blends leadership, teamwork, and cultural
          discovery. Participants gain valuable experience, improve their
          English, and build friendships from around the world while creating
          unforgettable memories in one of America’s most authentic summer
          traditions.
        </>
      ),
    },
    pictureYourself: {
      eyebrow: "Why You Should Participate",
      body: "mentoring campers from around the world, building leadership and teamwork skills, and enjoying nature every single day. The Camp Counselor Program isn’t just a summer job—it’s a journey of growth and discovery. By joining, you’ll experience a meaningful blend of cultural exchange, personal development, and unforgettable memories surrounded by the outdoors and the spirit of adventure.",
      circleHeading: "unforgettable journey",
      circleBody:
        "Join the Camp Counselor Program and make this summer one to remember. Live the adventure, inspire young campers, and grow every single day. From outdoor challenges to lifelong friendships, every moment will shape your story. Embrace the experience, share your culture, and create memories that will stay with you forever.",
    },
    whyParticipate: {
      body: "Immerse yourself in a rewarding blend of leadership, teamwork, and cultural exchange. Experience personal growth, enhance your communication skills, and enjoy the beauty of nature every day.",
      benefits: [
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
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp_dRkOpqL.jpg",
          title: "Cultural Exchange",
          description:
            "Immerse yourself in the diverse tapestry of American culture. Engage with locals, understand their traditions, and share your own experiences. This exchange is a two-way street, offering you a deeper understanding of the world.",
        },
        {
          src: discoverYourselfPhoto,
          title: "Discover Yourself",
          description:
            "Challenge yourself in new environments, overcome obstacles, and uncover hidden strengths. The program isn't just about working; it's an opportunity for personal growth and self-discovery.",
        },
        {
          src: professionalGrowthPhoto,
          title: "Professional Growth",
          description:
            "Gain hands-on work experience in the USA, adding an international flair to your resume. Whether you choose to work in hospitality, tourism, or a variety of other sectors, this program opens doors to new opportunities.",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_language-improvement_iEsA3rg.jpg",
          title: "Language Improvement",
          description:
            "Enhance your English language skills in real-life situations. Engage with locals, overcome language barriers, and return home with newfound confidence in your language abilities.",
        },
      ],
    },
    jobs: {
      body: "The Camp Counselor Program gives you the chance to spend your summer guiding and inspiring campers in American summer camps. You’ll lead activities, organize games, and help create an unforgettable experience for children and youth. Whether you’re leading a team challenge, teaching a skill, or joining campfires under the stars, every day brings new adventures, friendships, and opportunities for growth.",
      items: [
        {
          title: "LIFEGUARD",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-lifeguard_z2MWzHi.jpg",
        },
        {
          title: "PHOTOGRAPHY",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-photography_37o6vfj.jpg",
        },
        {
          title: "Horse Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp_dRkOpqL.jpg",
        },
        {
          title: "Activity Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-activity_EqM1nXd.jpg",
        },
        {
          title: "Cabin Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-cabin_u9tjvCT.jpg",
        },
        {
          title: "Waterfront Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-waterfront_KaBDbki.jpg",
        },
        {
          title: "Arts and Crafts Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-art_and_carfts_9NjfP5B.jpg",
        },
        {
          title: "Sports Counselor",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-sports_Piz40rf.jpg",
        },
      ],
    },
    destinations: {
      leadText:
        "Discover your next summer journey: Explore top camps and locations across the USA with the Camp Counselor Program! Experience leadership, adventure, and cultural exchange all in one unforgettable summer.",
      items: [
        { src: cedarPointPhoto, area: "Cedar Point", country: "Ohio" },
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
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_culture-exchange_vF9hqNc.jpeg",
          area: "Continental Pool",
          country: "Maryland",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_smugglers-notch_resort_iNwhxF4.jpg",
          area: "Smugglers Notch Resort- Vermont ",
          country: "Vermont ",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_food-lion_UkqwzVL.jpg",
          area: "Food Lion",
          country: "Maryland",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_fun-city_AQoTxNt.webp",
          area: "Fun City",
          country: "Colorado",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_aramark-kauffman-stadium_N5OiFuF.jpg",
          area: "Aramark-Kauffman Stadium",
          country: "Missouri",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel_next-destination_kalahari-resort_0zxFCfG.jpg",
          area: "Kalahari Resort",
          country: "Ohio",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-next_destination-point_sebago_xr9kC0v.jpg",
          area: "Point Sebago",
          country: "Main ",
        },
      ],
    },
    memories: {
      title: "WE'RE CREATING MEMORIES, WILL YOU BE PART OF THEM?",
    },
    benefitsShowcase: {
      title: (
        <>
          <span className="text-lev-blue-dark">AN </span>
          <span className="text-lev-blue">AMAZING</span>
          <br />
          <span className="text-lev-blue">EXPERIENCE </span>
          <span className="text-lev-blue-dark">AND</span>
          <br />
          <span className="text-lev-blue-dark">YET YOU WILL GET</span>
        </>
      ),
      items: [
        "Compensation ($2000-$4000)",
        "Free accommodation & meals",
        'Work permit "DS-2019"',
        "Health insurance coverage",
        "Cultural exchange opportunity",
        "30-day travel time after program ends",
        "Airport Pick-Up",
        "U.S. Social Security number",
        "Sponsorship & Visa Assistance",
      ],
    },
    requirements: [
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
    ],
    features: [
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
    ],
  },
  internship: {
    hero: {
      tag: "",
      title: "INTERNSHIP & TRAINEE PROGRAM",
      subtitle: "FOR UNIVERSITY STUDENTS & RECENT GRADUATES:",
      note: "Program available only in the usa",
      image:
        "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-hero_cnNHDpN.jpg",
    },
    photo2,
    photo3,
    intro: {
      eyebrow:
        "Start Your Professional Journey with Levntura’s Internship & Trainee Program",
      body: "Calling all ambitious university students and recent graduates eager to take their careers global! If you’re seeking a unique blend of professional experience, cultural exchange, personal growth, and real-world learning, Levntura’s Internship & Trainee Program in the USA is your next step toward success. Join a program officially regulated by the U.S. Department of State, designed to shape your future through hands-on experience in American companies.",
    },
    whatIs: {
      title: (
        <>
          What is the <br /> Internship & Trainee <br /> Program?{" "}
        </>
      ),
      body: (
        <>
          The Internship & Trainee Program gives university students and recent
          graduates the opportunity to gain{" "}
          <strong> hands-on professional experience</strong> in the United
          States. <br />
          It promotes <strong>
            cultural exchange, career development,
          </strong>{" "}
          and <strong>global networking,</strong> allowing participants to train
          in real U.S. companies while exploring American culture and lifestyle.
        </>
      ),
    },
    pictureYourself: {
      eyebrow: "Why You Should Participate",
      body: "collaborating with professionals from around the world, gaining real-world experience, and building your future with confidence, all while exploring life in the U.S. The Internship & Trainee Program isn’t just professional training; it’s an inspiring journey of growth where every day brings new skills, global friendships, and unforgettable moments of cultural exchange.",
      circleHeading: "unforgettable journey",
      circleBody:
        "Join the Internship & Trainee Program and make this experience the highlight of your career journey.",
    },
    whyParticipate: {
      body: "Immerse yourself in a unique blend of professional growth, cultural exchange, and unforgettable experiences.",
      benefits: [
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-paid_training_mhopSxM.jpg",
          title: "Paid Training",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-professional_training_SqmqHW9.JPG",
          title: "Professional Training",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-language_tOTfZ04.jpg",
          title: "Language Advancement",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_work-and-travel_24LYy63.jpg",
          title: "Strengthen Your Passport",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/programs_study-abroad_fEhPXO1.JPG",
          title: "Cultural Exchange",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/left-work-and-travel_Prn1fcB.jpg",
          title: "Resume Power",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-personal_development_Fc3gKRH.jpg",
          title: "Personal Development",
          description: "",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-explore_usa_QLE3RKu.jpg",
          title: "Explore the United States",
          description: "",
        },
      ],
    },
    jobs: {
      body: "The Internship & Trainee Program offers a wide range of professional opportunities across multiple industries in the United States. Whether you’re pursuing hands-on training or advanced career experience, choose a field that matches your studies and ambitions to make the most of your journey.",
      items: [
        {
          title: "HOSPITALITY & TOURISM",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-cook_sAoQyNF.jpg",
        },
        {
          title: "BUSINESS & MANAGEMENT",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work_and_travel-waiter_YCfRw4y.jpg",
        },
        {
          title: "ENGINEERING & ARCHITECTURE",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/camp_counselor-art_and_carfts_9NjfP5B.jpg",
        },
        {
          title: "INFORMATION & MEDIA",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-jobs-information_and_media_YLWqAKa.jpg",
        },
        {
          title: "EDUCATION & PUBLIC ADMINISTRATION",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-jobs-education_administration_CY66omg.jpg",
        },
        {
          title: "AGRICULTURE & ENVIRONMENTAL STUDIES",
          image:
            "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-jobs-agriculture_studies_XKoMVTN.jpg",
        },
      ],
    },
    destinations: {
      leadText:
        "Discover where your professional journey begins. From world-class business hubs to culturally rich cities, each destination offers unique opportunities to learn, grow, and explore.",
      items: [
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-ritz_carton_p1s2aa6.webp",
          area: "The Ritz carton",
          country: "Lake Tahoe, California",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-spruce_restaurant_7n2W30r.webp",
          area: "Spruce Restaurant",
          country: "San Francisco, California",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-perry_lane_XTH6zkj.jpg",
          area: "Perry Lane Hotel",
          country: "Savannah, Georgia",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-stanly_ra_w5DMjzz.jpg",
          area: "Stanly Ranch",
          country: "Napa, California",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-mourad_iTw5Z7c.webp",
          area: "Mourad",
          country: "San Francisco, California",
        },
        {
          src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/internship-destination-grand_pacific_IXlli5L.jpg",
          area: "Grand Pacific Carlsbad Hotel",
          country: "Carlsbad, California",
        },
      ],
    },
    memories: {
      title: "WE'RE CREATING MEMORIES, WILL YOU BE PART OF THEM?",
    },
    benefitsShowcase: {
      title: (
        <>
          <span className="text-lev-blue-dark">AN </span>
          <span className="text-lev-blue">AMAZING</span>
          <br />
          <span className="text-lev-blue">EXPERIENCE </span>
          <span className="text-lev-blue-dark">AND</span>
          <br />
          <span className="text-lev-blue-dark">YET YOU WILL GET</span>
        </>
      ),
      items: [
        "Paid Internship (USD 2,000–3,000 / Month)",
        'Work permit "DS-2019"',
        "Sponsorship & Visa Assistance",
        "U.S. Social Security number",
        "Health insurance coverage",
        "Housing Assistance",
        "30-day travel time after program ends",
      ],
    },
    requirements: [
      {
        svg: <PassportSvg />,
        title: "Passport",
        description: "Valid Passport",
      },
      {
        svg: <CollegeSvg />,
        title: "Education",
        description: "Relevant Education",
      },
      {
        svg: <LanguageSvg />,
        title: "Language",
        description: "English Language Proficiency",
      },
      {
        svg: <AgeSvg />,
        title: "Letter",
        description: "Experience Letter (if applicable)",
      },
    ],
    features: [
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
    ],
  },
};
