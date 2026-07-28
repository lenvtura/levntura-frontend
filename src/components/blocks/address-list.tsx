import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { YoutubeIcon } from "@/assets/icons/youtube";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import type {
  AddressListBgColor,
  AddressListBlock as AddressListBlockData,
  SocialPlatform,
} from "@/lib/types";

const SOCIAL_ICON_MAP: Record<
  SocialPlatform,
  { Icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  whatsapp: { Icon: FaWhatsapp, label: "WhatsApp" },
  instagram: { Icon: FaInstagram, label: "Instagram" },
  facebook: { Icon: FaFacebook, label: "Facebook" },
  linkedin: { Icon: FaLinkedinIn, label: "LinkedIn" },
  youtube: { Icon: YoutubeIcon, label: "YouTube" },
  twitter: { Icon: FaXTwitter, label: "X" },
  tiktok: { Icon: FaTiktok, label: "TikTok" },
  telegram: { Icon: FaTelegram, label: "Telegram" },
};

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

              {office.socials && office.socials.length > 0 && (
                <div className="flex gap-x-8 mt-5">
                  {office.socials.map((social, k) => {
                    const cfg = SOCIAL_ICON_MAP[social.platform];
                    if (!cfg || !social.url) return null;
                    const { Icon, label } = cfg;
                    return (
                      <a
                        key={social.id ?? `soc-${k}`}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="hover:text-lev-red transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </FadeUpAnimator>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
