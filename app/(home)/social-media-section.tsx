import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import happyFriendship from "@/assets/photos/happy-friendship.png";
import { cn } from "@/design-system/helpers";
import { SectionTitle } from "./section-title";
import { Routes } from "@/constants/routes";
import { FaceboocBoxLogoSvg } from "@/assets/logos/facebooc-box-logo-svg";
import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

const SocialMediaStats = [
  {
    number: "6.5K",
    numberColor: "text-lev-blue-light",
    category: "Students",
    paragraph:
      "Join a thriving community of passionate learners who’ve turned curiosity into opportunity—gaining skills, confidence, and global experience through Levntura’s programs.",
  },
  {
    number: "1.5K",
    numberColor: "text-lev-yellow",
    category: "Universities",
    paragraph:
      "From world-renowned institutions to innovative learning centers, our academic collaborations create powerful bridges between education and real-world experience.",
  },
  {
    number: "20+",
    numberColor: "text-lev-green-light",
    category: "Countries",
    paragraph:
      "Explore the world through Levntura—from Europe’s cultural capitals to the breathtaking coasts of North America and Asia’s vibrant cities. Every destination offers a story waiting to be lived.",
  },
];

export function SocialMediaSection() {
  return (
    <div>
      <SectionWrapper>
        <div className="grid md:grid-cols-3 items-start justify-center gap-6  mb-16">
          {SocialMediaStats.map((stat, index) => (
            // <div
            //   className="relative pr-6 max-md:after:mb-6 max-md:after:bottom-0  after:mr-6 last:after:relative after:top-1/2 after:-translate-y-[50%] after:absolute after:bg-lev-blue-dark after:right-0 after:inset-y-0 after:w-[2px] after:h-[96px]  last:border-0 last:pr-0 border-lev-blue-dark"
            //   key={stat.number}
            // >
            <FadeUpAnimator
              key={stat.number}
              transition={{ delay: 0.1 + index * 0.2 }}
              className="relative pr-6 border-r-2 last:border-0 last:pr-0 border-lev-blue-dark"
            >
              <div className="flex mb-4 gap-6 items-center">
                <span className={cn("typography-EB74", stat.numberColor)}>
                  {stat.number}
                </span>
                <span className="typography-M16">{stat.category}</span>
              </div>
              <p className="text-lev-blue-dark">{stat.paragraph}</p>
            </FadeUpAnimator>
          ))}
        </div>
        <div className="relative flex flex-col justify-center p-8 max-md:h-max h-[650]">
          <div className="z-20 flex flex-col gap-6 justify-center items-start h-full relative text-white">
            <FadeUpAnimator
              transition={{ delay: 0.2 }}
              className="flex gap-4 flex-wrap"
            >
              <div className="shrink-0 ">
                <FaceboocBoxLogoSvg />
              </div>
              <p className="max-w-[350px] bg-blend-overlay mix-blend-overlay opacity-70">
                Connect with thousands of Levntura students and alumni from
                around the world. Share your experiences, ask questions, and get
                insider tips from those who’ve already lived the adventure.
              </p>
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <SectionTitle className="text-white inline-block">
                JOIN OUR <br /> FACEBOOK COMMUNITY
              </SectionTitle>
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.6 }}>
              <ButtonWithArrow
                href={
                  "https://www.facebook.com/groups/381246158916559/?ref=share&mibextid=wwXIfr&rdid=ReSHkamib4L26jsZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F17FHY4PDKQ%2F%3Fmibextid%3DwwXIfr#"
                }
                iconClassName="border-white"
              >
                Join now!
              </ButtonWithArrow>
            </FadeUpAnimator>
          </div>
          <Image
            alt=""
            src={happyFriendship}
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-y-0 min-w-3/5 bg-gradient-to-r from-black to-[rgba(0,0,0,0)] left-0" />
        </div>
      </SectionWrapper>
    </div>
  );
}
