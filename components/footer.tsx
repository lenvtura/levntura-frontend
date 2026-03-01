import Link from "next/link";

import { LeventuraSymbolLogo, LeventuraTextLogo } from "@/atoms/logo";
import { Routes } from "@/constants/routes";
import { Suspense } from "react";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { FooterLinks } from "./footer-link";
import { FooterWrapper } from "./footer-wrapper";

const Opportunities = [
  { label: "Travel & Work", path: Routes.home },
  { label: "Camp Counselor", path: Routes.about },
  { label: "Travel & Study", path: Routes.blogs },
  { label: "Internship", path: Routes.careers },
  { label: "Student Portal", path: Routes.careers },
];

const Addresses = [
  "Mecca st, Buld 145, office 408, Amman Jordan, 11185",
  "3 Skies Plaza, S 90th st, New Cairo, Egypt, 11835",
];

const PhoneNumbers = ["+962 79 082 2202", "+20 150 0050392"];

export function Footer() {
  return (
    <FooterWrapper>
      <div className="container-md max-sm:text-center py-12 text-white">
        <div className="w-[40px] max-sm:mx-auto ">
          <LeventuraSymbolLogo />
        </div>

        <div className="max-sm:flex max-sm:flex-col max-sm:items-center gap-14 grid grid-cols-3 mt-6 ">
          <div className="flex flex-col ">
            <FooterLinks />
          </div>

          <div className="flex flex-col whitespace-nowrap gap-2">
            {Opportunities.map((opp) => (
              <Link
                href={opp.path}
                className="hover:text-lev-yellow"
                key={opp.label}
              >
                {opp.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              {Addresses.map((add) => (
                <span key={add}>Address: {add}</span>
              ))}
            </div>

            <div className="flex flex-col mt-4">
              {PhoneNumbers.map((number) => (
                <span key={number}>{number}</span>
              ))}
            </div>

            <div className="flex max-sm:mx-auto gap-4 mt-4">
              <Suspense>
                <SocialShareIcons size="sm" variant="white-border" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blend-overlay mix-blend-overlay text-white/15 px-4">
        <LeventuraTextLogo />
      </div>
    </FooterWrapper>
  );
}
