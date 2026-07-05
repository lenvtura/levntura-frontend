import { Suspense } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import { LeventuraSymbolLogo, LeventuraTextLogo } from "@/atoms/logo";
import { YoutubeIcon } from "@/assets/icons/youtube";
import { cn } from "@/design-system/helpers";
import { getFooter, getHeader } from "@/lib/api";
import { resolveNav } from "@/lib/nav";
import { resolveLocale } from "@/lib/server-request";
import type {
  FooterGlobal,
  FooterSocialLink,
  SocialPlatform,
} from "@/lib/types";

import { Link } from "@/i18n/navigation";
import { FooterLinks } from "./footer-link";
import { FooterWrapper } from "./footer-wrapper";
import { LocaleToggle } from "./locale-toggle";

// Fallback content — used only when CMS Footer is empty (e.g. before seed runs).
const FALLBACK: FooterGlobal = {
  columns: [
    {
      title: "",
      links: [
        { label: "Travel & Work", url: "/" },
        { label: "Camp Counselor", url: "/about" },
        { label: "Travel & Study", url: "/blogs" },
        { label: "Internship", url: "/careers" },
        { label: "Student Portal", url: "/careers" },
      ],
    },
  ],
  addresses: [
    { address: "Mecca st, Buld 145, office 408, Amman Jordan, 11185" },
    { address: "3 Skies Plaza, S 90th st, New Cairo, Egypt, 11835" },
  ],
  phones: [{ number: "+962 79 082 2202" }, { number: "+20 150 0050392" }],
  socialLinks: [
    {
      platform: "whatsapp",
      url: "https://api.whatsapp.com/send/?phone=962790922202",
    },
    { platform: "instagram", url: "https://www.instagram.com/levntura.jo/" },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/levntura/",
    },
    { platform: "facebook", url: "https://www.facebook.com/levntura" },
    { platform: "youtube", url: "https://www.youtube.com/@Levntura" },
  ],
  showLogo: true,
  showWatermark: true,
};

const SOCIAL_ICON_MAP: Record<
  SocialPlatform,
  { Icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  whatsapp: { Icon: FaWhatsapp, label: "WhatsApp" },
  instagram: { Icon: FaInstagram, label: "Instagram" },
  linkedin: { Icon: FaLinkedinIn, label: "LinkedIn" },
  facebook: { Icon: FaFacebook, label: "Facebook" },
  youtube: { Icon: YoutubeIcon, label: "YouTube" },
  twitter: { Icon: FaTwitter, label: "Twitter" },
  tiktok: { Icon: FaTiktok, label: "TikTok" },
  telegram: { Icon: FaTelegram, label: "Telegram" },
};

function SocialIconsFromCMS({ links }: { links: FooterSocialLink[] }) {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const config = SOCIAL_ICON_MAP[link.platform];
        if (!config) return null;
        const { Icon, label } = config;
        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${label}`}
            className="group/social-share-icon border border-white p-1.5 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
          >
            <Icon className="w-5 h-5 text-white group-hover/social-share-icon:text-lev-blue" />
          </a>
        );
      })}
    </div>
  );
}

export async function Footer() {
  const locale = await resolveLocale();

  const [cms, header] = await Promise.all([
    getFooter(locale),
    getHeader(locale),
  ]);
  const data = cms ?? FALLBACK;
  const navItems = resolveNav(header, locale);

  const columns = data.columns?.filter((c) => (c.links?.length ?? 0) > 0) ?? [];
  const addresses = data.addresses ?? [];
  const phones = data.phones ?? [];
  const socialLinks = data.socialLinks ?? [];
  const showLogo = data.showLogo ?? true;
  const copyright = data.copyright;
  const bottomLinks = data.bottomLinks ?? [];
  const tagline = data.tagline;

  // Total visible columns in the main grid:
  //   - 1 fixed for nav links (always present, sourced from header nav)
  //   - columns.length extra CMS columns (Opportunities, etc.)
  //   - 1 fixed for the contact column (addresses + phones + socials)
  const totalCols = 2 + columns.length;
  const gridColsClass =
    totalCols >= 4
      ? "grid-cols-4"
      : totalCols === 3
        ? "grid-cols-3"
        : "grid-cols-2";

  // Address label prefix per locale
  const addressPrefix = locale === "ar" ? "العنوان" : "Address";

  return (
    <FooterWrapper>
      <div className="container-md max-sm:text-center py-12 text-white">
        {showLogo && (
          <div className="w-[40px] max-sm:mx-auto ">
            <LeventuraSymbolLogo />
          </div>
        )}

        {tagline && (
          <p className="mt-3 text-white/80 typography-S14 max-w-md max-sm:mx-auto">
            {tagline}
          </p>
        )}

        <div
          className={cn(
            "max-sm:flex max-sm:flex-col max-sm:items-center gap-14 grid mt-6",
            gridColsClass,
          )}
        >
          {/* Nav links column — always rendered, sources from FooterLinks
              which mirrors the header nav from CMS. */}
          <div className="flex flex-col ">
            <Suspense fallback={null}>
              <FooterLinks items={navItems} />
            </Suspense>
          </div>

          {/* Optional extra link columns from CMS */}
          {columns.map((col, idx) => (
            <div
              key={col.id ?? `col-${idx}`}
              className="flex flex-col whitespace-nowrap gap-2"
            >
              {col.title && (
                <span className="typography-S14 font-semibold mb-2 opacity-80">
                  {col.title}
                </span>
              )}
              {col.links?.map((link, linkIdx) => (
                <Link
                  key={link.id ?? `link-${linkIdx}`}
                  href={link.url}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className="hover:text-lev-yellow"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact column */}
          <div className="flex flex-col">
            {addresses.length > 0 && (
              <div className="flex flex-col gap-4">
                {addresses.map((addr, idx) => (
                  <span key={addr.id ?? `addr-${idx}`}>
                    {addressPrefix}: {addr.address}
                  </span>
                ))}
              </div>
            )}

            {phones.length > 0 && (
              <div className="flex flex-col mt-4">
                {phones.map((phone, idx) => (
                  <a
                    key={phone.id ?? `phone-${idx}`}
                    href={`tel:${phone.number.replace(/\s+/g, "")}`}
                    className="hover:text-lev-yellow"
                  >
                    {phone.number}
                  </a>
                ))}
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap max-sm:justify-center items-center gap-4 mt-4">
                <SocialIconsFromCMS links={socialLinks} />
                <LocaleToggle />
              </div>
            )}
            {socialLinks.length === 0 && (
              <div className="flex max-sm:justify-center mt-4">
                <LocaleToggle />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Static wordmark — kept out of CMS control by request. */}
      <div className="bg-blend-overlay mix-blend-overlay text-white/15 px-4">
        <LeventuraTextLogo />
      </div>

      {/* Bottom legal bar — sits below the wordmark per design. */}
      {(copyright || bottomLinks.length > 0) && (
        <div className="container-md py-4 flex flex-wrap items-center justify-between gap-4 typography-S14 text-white/70 max-sm:justify-center max-sm:text-center">
          {copyright && <span>{copyright}</span>}
          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {bottomLinks.map((link, idx) => (
                <Link
                  key={link.id ?? `bot-${idx}`}
                  href={link.url}
                  className="hover:text-lev-yellow"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </FooterWrapper>
  );
}
