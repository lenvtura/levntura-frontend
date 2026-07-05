import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import type {
  AddressListBgColor,
  AddressListBlock as AddressListBlockData,
} from "@/lib/types";

const BG_CLASS: Record<AddressListBgColor, string> = {
  "gray-light": "bg-[#f5f6f7]",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  white: "bg-white",
};

interface AddressListBlockProps {
  block: AddressListBlockData;
}

export function AddressListBlock({ block }: AddressListBlockProps) {
  const bgClass = BG_CLASS[block.backgroundColor ?? "gray-light"];
  const offices = block.offices ?? [];

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="flex flex-col gap-y-20 pt-[150px] sm:pt-0"
    >
      {block.intro && (
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <div className="md:max-w-1/3">
            <p className="typography-R16 leading-5 text-lev-black opacity-50">
              {block.intro}
            </p>
          </div>
        </FadeUpAnimator>
      )}

      {offices.length > 0 && (
        <div className="lg:flex items-center space-y-8 gap-[15%]">
          {offices.map((office, i) => (
            <FadeUpAnimator
              key={office.id ?? `office-${i}`}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h1 className="typography-EB74 uppercase leading-16">
                {office.code}
              </h1>

              <address
                className={cn(
                  "typography-R14 opacity-50 mt-3.5 mb-2.5 leading-4 not-italic",
                  "w-3/4",
                )}
              >
                {office.address}
              </address>

              {office.phones && office.phones.length > 0 && (
                <div>
                  {office.phones.map((phone, j) => (
                    <p
                      key={phone.id ?? `ph-${j}`}
                      className="typography-R14 leading-5 text-lev-black opacity-50"
                    >
                      {phone.number}
                    </p>
                  ))}
                </div>
              )}

              {office.directionsURL && (
                <a
                  href={office.directionsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h6 className="typography-B14 mt-4 hover:text-lev-red transition-colors">
                    {office.directionsLabel ?? "DIRECTIONS"}
                  </h6>
                </a>
              )}

              <div className="flex gap-x-8 mt-5">
                <a href="#" aria-label="Instagram">
                  <InstagramIcon size={16} />
                </a>
                <a href="#" aria-label="Twitter">
                  <TwitterIcon size={16} />
                </a>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon size={16} />
                </a>
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
