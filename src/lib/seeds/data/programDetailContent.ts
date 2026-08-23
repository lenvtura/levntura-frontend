/**
 * Ported PROGRAM_CONFIG data from the legacy static frontend at
 * `app/programs/[programSlug]/program-config.tsx`.
 *
 * Each entry describes the structured detail-page content for one program.
 * The seed walks these entries, downloads referenced DO Spaces images into
 * the Media collection, and writes the resulting field shape onto the
 * program doc.
 *
 * Notes:
 *   - Image URLs that pointed to local static assets in the original code
 *     (e.g., bundled SVGs / .webp files) are intentionally OMITTED — the
 *     editor uploads those manually from admin. The structured field
 *     keeps the section's text content even without the image.
 *   - The image URLs below are the actual originals from DO Spaces, copied
 *     verbatim from the legacy config.
 *   - `body` strings support inline **bold** markers (see `RichTextish` in
 *     the frontend `program-detail.tsx`).
 */

const DO = 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images'

export interface ProgramDetailBenefitData {
  title: string
  description?: string
  imageUrl?: string
  /** Filename in `src/lib/seeds/data/local-images/` — used when the
   *  source image lived in the frontend repo as a bundled asset rather
   *  than on DO Spaces. Takes precedence over `imageUrl` when set. */
  localFile?: string
}

export interface ProgramDetailJobData {
  title: string
  imageUrl?: string
  localFile?: string
}

export interface ProgramDetailDestinationData {
  area: string
  country?: string
  imageUrl?: string
  localFile?: string
}

export interface ProgramDetailRequirementData {
  iconKey: 'passport' | 'college' | 'language' | 'age' | 'diploma'
  title: string
  description?: string
}

export interface ProgramDetailFeatureData {
  iconKey: 'star' | 'bag' | 'hand' | 'people' | 'face' | 'check'
  title: string
  description?: string
}

export interface ProgramDetailContentData {
  hero: {
    tag?: string
    subtitle?: string
    note?: string
    imageUrl?: string
    localFile?: string
  }
  /** Optional bundled-file image for the "photo break" between What-Is
   *  and Picture-Yourself sections (legacy `photo2.webp`). */
  photoMiddleLocalFile?: string
  /** Bundled-file image for the round Picture-Yourself photo (legacy
   *  `photo3.webp`). */
  pictureYourselfLocalFile?: string
  intro?: {
    eyebrow?: string
    body?: string
  }
  whatIs?: {
    title?: string
    body?: string
  }
  pictureYourself?: {
    eyebrow?: string
    body?: string
    circleHeading?: string
    circleBody?: string
  }
  whyParticipate?: {
    body?: string
    benefits?: ProgramDetailBenefitData[]
  }
  jobs?: {
    body?: string
    items?: ProgramDetailJobData[]
  }
  destinations?: {
    leadText?: string
    items?: ProgramDetailDestinationData[]
  }
  benefitsShowcase?: {
    title?: string
    items?: string[]
  }
  requirements?: ProgramDetailRequirementData[]
  memories?: {
    title?: string
    images?: Array<{ localFile?: string; imageUrl?: string; alt?: string }>
    primaryCta?: { label?: string; url?: string }
    secondaryLink?: { label?: string; url?: string }
  }
  features?: ProgramDetailFeatureData[]
}

// Shared content used by every program — same SVG icons + Levntura value-prop
// copy across all detail pages in the legacy site.
const DEFAULT_FEATURES: ProgramDetailFeatureData[] = [
  {
    iconKey: 'star',
    title: '5-Star\nRatings',
    description:
      'Recognized with top-notch reviews on Google Maps and Facebook, showcasing our commitment to client satisfaction.',
  },
  {
    iconKey: 'bag',
    title: 'Diverse Job\nOffers',
    description:
      'Explore a wide range of exciting job opportunities tailored to your preferences and professional goals.',
  },
  {
    iconKey: 'hand',
    title: 'Rich Cultural\nExperience',
    description:
      'Founded by individuals with active participation in cultural exchange programs, offering valuable insights and a seamless immersion process.',
  },
  {
    iconKey: 'people',
    title: 'Effortless\nRegistration',
    description:
      'Simple and smooth steps to register with Levntura, ensuring a hassle-free onboarding experience.',
  },
  {
    iconKey: 'face',
    title: 'Comprehensive\nSupport',
    description:
      'From embassy assistance to job interviews, count on us for thorough guidance and support throughout your journey.',
  },
  {
    iconKey: 'check',
    title: 'Experience-\nCentric Approach',
    description:
      'We prioritize creating meaningful experiences, ensuring participants get the most out of their cultural exchange programs.',
  },
]

const DEFAULT_REQUIREMENTS: ProgramDetailRequirementData[] = [
  { iconKey: 'passport', title: 'Passport', description: 'Valid Passport' },
  { iconKey: 'college', title: 'Education', description: 'Enrollment as a Full-Time University Student' },
  { iconKey: 'language', title: 'Language', description: 'English Language Proficiency' },
  { iconKey: 'age', title: 'Age', description: 'between 18-25' },
  { iconKey: 'diploma', title: 'Interview', description: 'Interview & Application Form' },
]

const DEFAULT_MEMORIES = {
  title: "WE'RE CREATING MEMORIES, WILL YOU BE PART OF THEM?",
  // Same packaged tour photos the About page uses — seeded into Media so the
  // memories grid shows real, editable images in the admin (not just the
  // component fallback).
  images: [
    { localFile: 'tour-i1.png', alt: 'Memory photo 1' },
    { localFile: 'tour-i2.png', alt: 'Memory photo 2' },
    { localFile: 'tour-i3.png', alt: 'Memory photo 3' },
    { localFile: 'tour-i4.png', alt: 'Memory photo 4' },
    { localFile: 'tour-i5.png', alt: 'Memory photo 5' },
    { localFile: 'tour-i6.png', alt: 'Memory photo 6' },
    { localFile: 'tour-i8.png', alt: 'Memory photo 7' },
    { localFile: 'tour-i9.png', alt: 'Memory photo 8' },
  ],
  primaryCta: { label: 'START NOW!', url: '#apply' },
  secondaryLink: { label: 'See all photos', url: '/gallery' },
}

const DEFAULT_BENEFITS_SHOWCASE_TITLE = 'AN AMAZING\nEXPERIENCE AND\nYET YOU WILL GET'

// ─── work-and-travel ──────────────────────────────────────────────────────

export const WORK_AND_TRAVEL_CONTENT: ProgramDetailContentData = {
  hero: {
    tag: 'SUMMER',
    subtitle: "BACHELOR & MASTER'S DEGREE STUDENTS",
    note: 'Program only to USA.',
    imageUrl: `${DO}/work_and_travel-hero_Ul9fA9V.jpg`,
  },
  // Bundled-in-repo fallbacks so admin shows the same images the
  // public page does — editors aren't faced with empty slots.
  photoMiddleLocalFile: 'photo2.webp',
  pictureYourselfLocalFile: 'photo3.webp',
  intro: {
    eyebrow:
      "Embark on a Summer Adventure with Levntura's USA Work & Travel Program.",
    body:
      "Calling all university students ready for a summer that blends adventure, cultural discovery, and real-world experience! If you're eager to improve your English, meet new friends from around the globe, and gain professional growth along the way, the USA Work & Travel Program, officially designated by the U.S. Department of State, is your gateway to a truly unforgettable season.",
  },
  whatIs: {
    title: 'What is the\nSummer Work\nand Travel\nProgram?',
    body:
      "**The Summer Work and Travel Program** allows university students to spend their summer working and exploring the United States. It's a unique opportunity for **cultural exchange, language improvement, and hands-on work experience** within real American communities. Participants engage in seasonal jobs, discover new cities, and build lifelong friendships while immersing themselves in U.S. culture and everyday life.",
  },
  pictureYourself: {
    eyebrow: 'Why You Should Participate',
    body:
      "meeting friends from every corner of the world, discovering new places, and gaining hands-on experience under the summer sun. The USA Work & Travel Program isn't just a seasonal job; it's your ticket to a life-changing adventure. By joining, you'll grow personally and professionally while enjoying a perfect mix of cultural exchange, language improvement, and unforgettable joy.",
    circleHeading: 'unforgettable journey',
    circleBody:
      "Join the USA Work and Travel Program and make this summer the one you'll always remember. Embrace the thrill, enhance your skills, and create memories that will last a lifetime.",
  },
  whyParticipate: {
    body:
      "Immerse yourself in a once-in-a-lifetime journey that blends work experience, cultural discovery, and language growth, all wrapped in the excitement of an American summer. It's more than a program; it's a season of new friendships, freedom, and unforgettable moments.",
    benefits: [
      { title: 'Meet New\nFriends', description: 'Forge connections with people from diverse backgrounds. The program brings together individuals with a shared sense of adventure, creating friendships that can last a lifetime.', localFile: 'meet-new-friends-photo.svg' },
      { title: 'Travel Around the USA', description: 'Beyond the workplace, take advantage of your time in the USA to explore its rich landscapes, iconic landmarks, and vibrant cities. From coast to coast, this is your chance to discover the beauty of the United States.', localFile: 'travel-around-photo.webp' },
      { title: 'Cultural Exchange', description: 'Immerse yourself in the diverse tapestry of American culture. Engage with locals, understand their traditions, and share your own experiences. This exchange is a two-way street, offering you a deeper understanding of the world.', imageUrl: `${DO}/about-us_camp_dRkOpqL.jpg` },
      { title: 'Discover Yourself', description: "Challenge yourself in new environments, overcome obstacles, and uncover hidden strengths. The program isn't just about working; it's an opportunity for personal growth and self-discovery.", localFile: 'discover-yourself-photo.svg' },
      { title: 'Professional Growth', description: 'Gain hands-on work experience in the USA, adding an international flair to your resume. Whether you choose to work in hospitality, tourism, or a variety of other sectors, this program opens doors to new opportunities.', localFile: 'professional-growth-photo.svg' },
      { title: 'Language Improvement', description: 'Enhance your English language skills in real-life situations. Engage with locals, overcome language barriers, and return home with newfound confidence in your language abilities.', imageUrl: `${DO}/work-and-travel_language-improvement_iEsA3rg.jpg` },
    ],
  },
  jobs: {
    body:
      "The Summer Work & Travel Program opens doors to exciting seasonal jobs across the U.S., from theme parks and beach resorts to national landmarks and city cafés. Choose a role that matches your interests, sharpen your skills, and experience what it's like to work and live in a new culture, all while making the most of your American summer.",
    items: [
      { title: 'LIFEGUARD',         imageUrl: `${DO}/work_and_travel-life_guard_YtXoOkg.jpeg` },
      { title: 'PHOTOGRAPHY',       imageUrl: `${DO}/work_and_travel-photography_DyGSsld.JPG` },
      { title: 'RIDE OPERATOR',     imageUrl: `${DO}/work_and_travel-ride_operator_rgyjmjB.jpg` },
      { title: 'HOUSE KEEPING',     imageUrl: `${DO}/work_and_travel-housekeeping_zbxeFeJ.JPG` },
      { title: 'WAITER',            imageUrl: `${DO}/work_and_travel-waiter_YCfRw4y.jpg` },
      { title: 'CHEF',              imageUrl: `${DO}/work_and_travel-cook_sAoQyNF.jpg` },
      { title: 'FOOD RUNNER',       imageUrl: `${DO}/work_and_travel-food_runner_bYW0DTZ.JPG` },
      { title: 'WATER PARK WORKER', imageUrl: `${DO}/work_and_travel-water-worker_O8y836C.JPG` },
      { title: 'CASHIER',           imageUrl: `${DO}/work_and_travel-cashier_p0PnC4b.jpg` },
      { title: 'RECEPTIONIST',      imageUrl: `${DO}/work_and_travel-receptionist_QIgteOq.jpeg` },
      { title: 'FOOD SERVICE',      imageUrl: `${DO}/work_and_travel-food_worker_JQcbMCU.jpg` },
      { title: 'DISH WASHER',       imageUrl: `${DO}/work_and_travel-dishwasher_CRD54CX.jpg` },
      { title: 'BARISTA',           imageUrl: `${DO}/work_and_travel-barista_EjX8hKw.jpg` },
    ],
  },
  destinations: {
    leadText:
      'Discover your next summer adventure! Explore top employers and destinations across the U.S. through the Work & Travel Program, where every job brings new skills, friendships, and unforgettable memories.',
    items: [
      { area: 'Cedar Point',                country: 'Ohio',                       localFile: 'cedar-point-photo.svg' },
      { area: 'Yellowstone National Park',  country: 'Montana, Idaho, Wyoming',    localFile: 'national-park-photo.svg' },
      { area: 'Grand Canyon National Park', country: 'Arizona',                    localFile: 'grand-canyon-photo.svg' },
      { area: 'Six Flags Great America',    country: 'Arizona',                    localFile: 'great-america-photo.svg' },
      { area: 'Continental Pool',           country: 'Maryland', imageUrl: `${DO}/about-us_culture-exchange_vF9hqNc.jpeg` },
      { area: 'Smugglers Notch Resort',     country: 'Vermont',  imageUrl: `${DO}/work-and-travel_next-destination_smugglers-notch_resort_iNwhxF4.jpg` },
      { area: 'Food Lion',                  country: 'Maryland', imageUrl: `${DO}/work-and-travel_next-destination_food-lion_UkqwzVL.jpg` },
      { area: 'Fun City',                   country: 'Colorado', imageUrl: `${DO}/work-and-travel_next-destination_fun-city_AQoTxNt.webp` },
      { area: 'Aramark-Kauffman Stadium',   country: 'Missouri', imageUrl: `${DO}/work-and-travel_next-destination_aramark-kauffman-stadium_N5OiFuF.jpg` },
      { area: 'Kalahari Resort',            country: 'Ohio',     imageUrl: `${DO}/work-and-travel_next-destination_kalahari-resort_0zxFCfG.jpg` },
      { area: 'Point Sebago',               country: 'Maine',    imageUrl: `${DO}/work_and_travel-next_destination-point_sebago_xr9kC0v.jpg` },
    ],
  },
  benefitsShowcase: {
    title: DEFAULT_BENEFITS_SHOWCASE_TITLE,
    items: [
      '30-day travel period after your program ends',
      'Comfortable housing accommodation',
      'Comprehensive health insurance coverage',
      'Paid Job placement in your preferred field',
      'Official work permit "DS-2019"',
      'U.S. Social Security number',
      'Sponsorship & Visa Assistance',
    ],
  },
  requirements: DEFAULT_REQUIREMENTS,
  memories: DEFAULT_MEMORIES,
  features: DEFAULT_FEATURES,
}

// ─── camp-counselor ───────────────────────────────────────────────────────

export const CAMP_COUNSELOR_CONTENT: ProgramDetailContentData = {
  hero: {
    tag: 'SUMMER',
    subtitle: "BACHELOR & MASTER'S DEGREE STUDENTS OR GRADUATES",
    note: 'Program only to USA.',
    imageUrl: `${DO}/camp_counselor-hero_cnNHDpN.jpg`,
  },
  photoMiddleLocalFile: 'photo2.webp',
  pictureYourselfLocalFile: 'photo3.webp',
  intro: {
    eyebrow:
      "Embark on a Meaningful Summer Journey with Levntura's Camp Counselor Program.",
    body:
      "Calling all students and graduates passionate about leadership, adventure, and cultural exchange! If you're looking for a summer that combines personal growth, outdoor fun, and global friendships, the Camp Counsellor Program with Levntura is your gateway to an unforgettable experience in the USA, proudly supported by the U.S. Department of State.",
  },
  whatIs: {
    title: 'What is the\nCamp Counselor\nProgram?',
    body:
      "The Camp Counselor Program offers university students and graduates the chance to work in U.S. summer camps, guiding and inspiring young campers while experiencing life in the great outdoors. It's an exchange opportunity that blends **leadership, teamwork, and cultural discovery**. Participants gain valuable experience, improve their English, and build friendships from around the world while creating unforgettable memories in one of America's most authentic summer traditions.",
  },
  pictureYourself: {
    eyebrow: 'Why You Should Participate',
    body:
      "mentoring campers from around the world, building leadership and teamwork skills, and enjoying nature every single day. The Camp Counselor Program isn't just a summer job—it's a journey of growth and discovery.",
    circleHeading: 'unforgettable journey',
    circleBody:
      "Join the Camp Counselor Program and make this summer one to remember. Live the adventure, inspire young campers, and grow every single day.",
  },
  whyParticipate: {
    body:
      "Immerse yourself in a rewarding blend of leadership, teamwork, and cultural exchange. Experience personal growth, enhance your communication skills, and enjoy the beauty of nature every day.",
    benefits: [
      { title: 'Meet New\nFriends', description: 'Forge connections with people from diverse backgrounds. The program brings together individuals with a shared sense of adventure, creating friendships that can last a lifetime.', localFile: 'meet-new-friends-photo.svg' },
      { title: 'Travel Around the USA', description: 'Beyond the workplace, take advantage of your time in the USA to explore its rich landscapes, iconic landmarks, and vibrant cities.', localFile: 'travel-around-photo.webp' },
      { title: 'Cultural Exchange', description: 'Immerse yourself in the diverse tapestry of American culture. Engage with locals, understand their traditions, and share your own experiences.', imageUrl: `${DO}/about-us_camp_dRkOpqL.jpg` },
      { title: 'Discover Yourself', description: "Challenge yourself in new environments, overcome obstacles, and uncover hidden strengths.", localFile: 'discover-yourself-photo.svg' },
      { title: 'Professional Growth', description: 'Gain hands-on work experience in the USA, adding an international flair to your resume.', localFile: 'professional-growth-photo.svg' },
      { title: 'Language Improvement', description: 'Enhance your English language skills in real-life situations.', imageUrl: `${DO}/work-and-travel_language-improvement_iEsA3rg.jpg` },
    ],
  },
  jobs: {
    body:
      "The Camp Counselor Program gives you the chance to spend your summer guiding and inspiring campers in American summer camps. You'll lead activities, organize games, and help create an unforgettable experience for children and youth.",
    items: [
      { title: 'LIFEGUARD',                imageUrl: `${DO}/camp_counselor-lifeguard_z2MWzHi.jpg` },
      { title: 'PHOTOGRAPHY',              imageUrl: `${DO}/camp_counselor-photography_37o6vfj.jpg` },
      { title: 'Horse Counselor',          imageUrl: `${DO}/about-us_camp_dRkOpqL.jpg` },
      { title: 'Activity Counselor',       imageUrl: `${DO}/camp_counselor-activity_EqM1nXd.jpg` },
      { title: 'Cabin Counselor',          imageUrl: `${DO}/camp_counselor-cabin_u9tjvCT.jpg` },
      { title: 'Waterfront Counselor',     imageUrl: `${DO}/camp_counselor-waterfront_KaBDbki.jpg` },
      { title: 'Arts and Crafts Counselor', imageUrl: `${DO}/camp_counselor-art_and_carfts_9NjfP5B.jpg` },
      { title: 'Sports Counselor',         imageUrl: `${DO}/camp_counselor-sports_Piz40rf.jpg` },
    ],
  },
  destinations: {
    leadText:
      'Discover your next summer journey: Explore top camps and locations across the USA with the Camp Counselor Program! Experience leadership, adventure, and cultural exchange all in one unforgettable summer.',
    items: [
      { area: 'Continental Pool',         country: 'Maryland', imageUrl: `${DO}/about-us_culture-exchange_vF9hqNc.jpeg` },
      { area: 'Smugglers Notch Resort',   country: 'Vermont',  imageUrl: `${DO}/work-and-travel_next-destination_smugglers-notch_resort_iNwhxF4.jpg` },
      { area: 'Food Lion',                country: 'Maryland', imageUrl: `${DO}/work-and-travel_next-destination_food-lion_UkqwzVL.jpg` },
      { area: 'Fun City',                 country: 'Colorado', imageUrl: `${DO}/work-and-travel_next-destination_fun-city_AQoTxNt.webp` },
      { area: 'Aramark-Kauffman Stadium', country: 'Missouri', imageUrl: `${DO}/work-and-travel_next-destination_aramark-kauffman-stadium_N5OiFuF.jpg` },
      { area: 'Kalahari Resort',          country: 'Ohio',     imageUrl: `${DO}/work-and-travel_next-destination_kalahari-resort_0zxFCfG.jpg` },
      { area: 'Point Sebago',             country: 'Maine',    imageUrl: `${DO}/work_and_travel-next_destination-point_sebago_xr9kC0v.jpg` },
    ],
  },
  benefitsShowcase: {
    title: DEFAULT_BENEFITS_SHOWCASE_TITLE,
    items: [
      'Compensation ($2000-$4000)',
      'Free accommodation & meals',
      'Work permit "DS-2019"',
      'Health insurance coverage',
      'Cultural exchange opportunity',
      '30-day travel time after program ends',
      'Airport Pick-Up',
      'U.S. Social Security number',
      'Sponsorship & Visa Assistance',
    ],
  },
  requirements: DEFAULT_REQUIREMENTS,
  memories: DEFAULT_MEMORIES,
  features: DEFAULT_FEATURES,
}

// ─── internship ───────────────────────────────────────────────────────────

export const INTERNSHIP_CONTENT: ProgramDetailContentData = {
  hero: {
    tag: '',
    subtitle: 'FOR UNIVERSITY STUDENTS & RECENT GRADUATES',
    note: 'Program available only in the USA',
    imageUrl: `${DO}/camp_counselor-hero_cnNHDpN.jpg`,
  },
  intro: {
    eyebrow:
      "Start Your Professional Journey with Levntura's Internship & Trainee Program",
    body:
      "Calling all ambitious university students and recent graduates eager to take their careers global! If you're seeking a unique blend of professional experience, cultural exchange, personal growth, and real-world learning, Levntura's Internship & Trainee Program in the USA is your next step toward success.",
  },
  whatIs: {
    title: 'What is the\nInternship & Trainee\nProgram?',
    body:
      'The Internship & Trainee Program gives university students and recent graduates the opportunity to gain **hands-on professional experience** in the United States. It promotes **cultural exchange, career development,** and **global networking,** allowing participants to train in real U.S. companies while exploring American culture and lifestyle.',
  },
  pictureYourself: {
    eyebrow: 'Why You Should Participate',
    body:
      "collaborating with professionals from around the world, gaining real-world experience, and building your future with confidence, all while exploring life in the U.S. The Internship & Trainee Program isn't just professional training; it's an inspiring journey of growth.",
    circleHeading: 'unforgettable journey',
    circleBody:
      'Join the Internship & Trainee Program and make this experience the highlight of your career journey.',
  },
  whyParticipate: {
    body:
      'Immerse yourself in a unique blend of professional growth, cultural exchange, and unforgettable experiences.',
    benefits: [
      { title: 'Paid Training',           imageUrl: `${DO}/internship-paid_training_mhopSxM.jpg` },
      { title: 'Professional Training',   imageUrl: `${DO}/internship-professional_training_SqmqHW9.JPG` },
      { title: 'Language Advancement',    imageUrl: `${DO}/internship-language_tOTfZ04.jpg` },
      { title: 'Strengthen Your Passport', imageUrl: `${DO}/home_our-program_work-and-travel_24LYy63.jpg` },
      { title: 'Cultural Exchange',       imageUrl: `${DO}/programs_study-abroad_fEhPXO1.JPG` },
      { title: 'Resume Power',            imageUrl: `${DO}/left-work-and-travel_Prn1fcB.jpg` },
      { title: 'Personal Development',    imageUrl: `${DO}/internship-personal_development_Fc3gKRH.jpg` },
      { title: 'Explore the United States', imageUrl: `${DO}/internship-explore_usa_QLE3RKu.jpg` },
    ],
  },
  jobs: {
    body:
      "The Internship & Trainee Program offers a wide range of professional opportunities across multiple industries in the United States.",
    items: [
      { title: 'HOSPITALITY & TOURISM',              imageUrl: `${DO}/work_and_travel-cook_sAoQyNF.jpg` },
      { title: 'BUSINESS & MANAGEMENT',              imageUrl: `${DO}/work_and_travel-waiter_YCfRw4y.jpg` },
      { title: 'ENGINEERING & ARCHITECTURE',         imageUrl: `${DO}/camp_counselor-art_and_carfts_9NjfP5B.jpg` },
      { title: 'INFORMATION & MEDIA',                imageUrl: `${DO}/internship-jobs-information_and_media_YLWqAKa.jpg` },
      { title: 'EDUCATION & PUBLIC ADMINISTRATION',  imageUrl: `${DO}/internship-jobs-education_administration_CY66omg.jpg` },
      { title: 'AGRICULTURE & ENVIRONMENTAL STUDIES', imageUrl: `${DO}/internship-jobs-agriculture_studies_XKoMVTN.jpg` },
    ],
  },
  destinations: {
    leadText:
      'Discover where your professional journey begins. From world-class business hubs to culturally rich cities, each destination offers unique opportunities to learn, grow, and explore.',
    items: [
      { area: 'The Ritz Carton',           country: 'Lake Tahoe, California',     imageUrl: `${DO}/internship-destination-ritz_carton_p1s2aa6.webp` },
      { area: 'Spruce Restaurant',         country: 'San Francisco, California',  imageUrl: `${DO}/internship-destination-spruce_restaurant_7n2W30r.webp` },
      { area: 'Perry Lane Hotel',          country: 'Savannah, Georgia',          imageUrl: `${DO}/internship-destination-perry_lane_XTH6zkj.jpg` },
      { area: 'Stanly Ranch',              country: 'Napa, California',           imageUrl: `${DO}/internship-destination-stanly_ra_w5DMjzz.jpg` },
      { area: 'Mourad',                    country: 'San Francisco, California',  imageUrl: `${DO}/internship-destination-mourad_iTw5Z7c.webp` },
      { area: 'Grand Pacific Carlsbad Hotel', country: 'Carlsbad, California',    imageUrl: `${DO}/internship-destination-grand_pacific_IXlli5L.jpg` },
    ],
  },
  benefitsShowcase: {
    title: DEFAULT_BENEFITS_SHOWCASE_TITLE,
    items: [
      'Paid Internship (USD 2,000-3,000 / Month)',
      'Work permit "DS-2019"',
      'Sponsorship & Visa Assistance',
      'U.S. Social Security number',
      'Health insurance coverage',
      'Housing Assistance',
      '30-day travel time after program ends',
    ],
  },
  requirements: [
    { iconKey: 'passport', title: 'Passport', description: 'Valid Passport' },
    { iconKey: 'college',  title: 'Education', description: 'Relevant Education' },
    { iconKey: 'language', title: 'Language', description: 'English Language Proficiency' },
    { iconKey: 'diploma',  title: 'Letter',   description: 'Experience Letter (if applicable)' },
  ],
  memories: DEFAULT_MEMORIES,
  features: DEFAULT_FEATURES,
}

// ─── study-abroad ─────────────────────────────────────────────────────────
// No legacy config existed — minimal default so the page renders cleanly.

export const STUDY_ABROAD_CONTENT: ProgramDetailContentData = {
  hero: {
    tag: '',
    subtitle: 'IMMERSIVE ACADEMIC PROGRAMS',
    note: 'Programs available worldwide.',
  },
  intro: {
    eyebrow: 'Expand your horizons with Levntura Study Abroad.',
    body:
      'Short, immersive study programs that combine academics with cultural exploration. Earn credits, build your network, and see the world.',
  },
  whatIs: {
    title: 'What is\nStudy Abroad?',
    body:
      'Study Abroad lets you spend a semester or summer at a partner university overseas, earning academic credit while immersing yourself in a new culture and language.',
  },
  benefitsShowcase: {
    title: DEFAULT_BENEFITS_SHOWCASE_TITLE,
    items: [
      'Academic credit transfer',
      'Cultural immersion',
      'Network of global alumni',
      'Personalized program advising',
    ],
  },
  requirements: DEFAULT_REQUIREMENTS.slice(0, 4),
  memories: DEFAULT_MEMORIES,
  features: DEFAULT_FEATURES,
}

// ─── volunteering ─────────────────────────────────────────────────────────
// No legacy config — minimal default.

export const VOLUNTEERING_CONTENT: ProgramDetailContentData = {
  hero: {
    tag: '',
    subtitle: 'GIVE BACK WHILE YOU GROW',
    note: 'Programs available worldwide.',
  },
  intro: {
    eyebrow: 'Volunteer abroad with Levntura.',
    body:
      'Combine service and discovery. Volunteer abroad, build cross-cultural skills, and find what drives you while making a real difference.',
  },
  whatIs: {
    title: 'What is\nVolunteering Abroad?',
    body:
      'Spend weeks or months supporting community projects overseas — from teaching English to conservation. Gain perspective, skills, and lifelong stories.',
  },
  benefitsShowcase: {
    title: DEFAULT_BENEFITS_SHOWCASE_TITLE,
    items: [
      'Meaningful community impact',
      'Cross-cultural skill-building',
      'Pre-departure training',
      'In-country support team',
    ],
  },
  requirements: DEFAULT_REQUIREMENTS.slice(0, 4),
  memories: DEFAULT_MEMORIES,
  features: DEFAULT_FEATURES,
}

export const PROGRAM_DETAIL_BY_SLUG: Record<string, ProgramDetailContentData> = {
  'work-and-travel': WORK_AND_TRAVEL_CONTENT,
  'camp-counselor': CAMP_COUNSELOR_CONTENT,
  internship: INTERNSHIP_CONTENT,
  'study-abroad': STUDY_ABROAD_CONTENT,
  volunteering: VOLUNTEERING_CONTENT,
}
