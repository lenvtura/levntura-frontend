import { MapPinIcon } from "lucide-react";
import { SectionWrapper } from "../(home)/section-wrapper";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { ContactForm } from "./contact-form";
import { Suspense } from "react";

export function SocialAndForm() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-blue-dark"
      className="overflow-visible min-h-screen flex-col sm:flex-row items-center flex gap-4 flex-wrap"
    >
      {/* Social */}
      <div className="space-y-12 flex-1">
        <article className="">
          <h1 className="typography-EB74 text-white leading-16">
            HELLO! <br /> LETS{" "}
            <span className="text-lev-blue-light">START</span> <br /> FRESH &{" "}
            <br />
            NEW
          </h1>
        </article>

        <article className="text-white flex flex-col gap-4 ml-12 -mt-4 self-end">
          <div className="social_link_top">
            <h6 className="typography-R14">OUR SOCIALS</h6>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <SocialShareIcons variant="white-border" className="gap-4" />
          </Suspense>
        </article>
      </div>
      {/* Form */}
      <div className="flex flex-col translate-y-[200px] border-b sm:border-none sm:translate-y-0 items-center gap-12 flex-1">
        <MapPinIcon className="text-lev-blue-light" size={100} />
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
