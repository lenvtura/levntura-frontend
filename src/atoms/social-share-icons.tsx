import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { YoutubeIcon } from "@/assets/icons/youtube";
import { cn } from "@/design-system/helpers";
import { getSiteSettings } from "@/lib/api";
import { ComponentProps } from "react";
import { headers } from "next/headers";

export type SocialPlatform =
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "youtube";

// Icon per platform for CMS-managed links (SiteSettings → Social Links).
// Covers every option the admin select offers.
const CMS_ICON_MAP: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  whatsapp: { icon: FaWhatsapp, label: "WhatsApp" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  linkedin: { icon: FaLinkedinIn, label: "LinkedIn" },
  facebook: { icon: FaFacebook, label: "Facebook" },
  youtube: { icon: YoutubeIcon, label: "YouTube" },
  twitter: { icon: FaXTwitter, label: "X" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
  telegram: { icon: FaTelegram, label: "Telegram" },
};

interface SocialShareIconsProps extends ComponentProps<"div"> {
  platforms?: SocialPlatform[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white-border";
  iconClassName?: string;
  containerClassName?: string;
  hrefs?: Partial<Record<SocialPlatform, string>>;
}

const JORDAN_PLATFORMS = [
  {
    icon: FaWhatsapp,
    label: "Share on WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=962790922202&text&type=phone_number&app_absent=0",
  },
  {
    icon: FaInstagram,
    label: "Share on Instagram",
    href: "https://www.instagram.com/levntura.jo/",
  },
  {
    icon: FaLinkedinIn,
    label: "Share on LinkedIn",
    href: "https://www.linkedin.com/company/levntura/",
  },
  {
    icon: FaFacebook,
    label: "Share on Facebook",
    href: "https://www.facebook.com/levntura?mibextid=LQQJ4d",
  },
  {
    icon: YoutubeIcon,
    label: "Share on YouTube",
    href: "https://www.youtube.com/@Levntura",
  },
];

const EGYPT_PLATFORMS = [
  {
    icon: FaWhatsapp,
    label: "Share on WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=201500050392&text&type=phone_number&app_absent=0",
  },
  {
    icon: FaInstagram,
    label: "Share on Instagram",
    href: "https://www.instagram.com/levntura.eg/",
  },
  {
    icon: FaLinkedinIn,
    label: "Share on LinkedIn",
    href: "https://www.linkedin.com/company/levntura/",
  },
  {
    icon: FaFacebook,
    label: "Share on Facebook",
    href: "https://www.facebook.com/levntura.eg/",
  },
  {
    icon: YoutubeIcon,
    label: "Share on YouTube",
    href: "https://www.youtube.com/@Levntura",
  },
];

const sizeConfig = {
  sm: {
    container: "w-10 h-10",
    icon: "w-5 h-5",
  },
  md: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
  },
  lg: {
    container: "w-14 h-14",
    icon: "w-7 h-7",
  },
};

export async function SocialShareIcons({
  size = "md",
  variant = "default",
  iconClassName,
  containerClassName,
  className,
  ...props
}: SocialShareIconsProps) {
  const sizeStyles = sizeConfig[size];

  // CMS-managed links first: SiteSettings → Social Links (admin-editable).
  // Falls back to the legacy hardcoded country-aware lists only when the
  // admin hasn't configured any.
  const settings = await getSiteSettings().catch(() => null);
  const cmsSocials = (settings?.socials ?? []).filter(
    (s) => s?.platform && s?.url && CMS_ICON_MAP[s.platform],
  );

  let platforms;
  if (cmsSocials.length > 0) {
    platforms = cmsSocials.map((s) => {
      const cfg = CMS_ICON_MAP[s.platform];
      return { icon: cfg.icon, label: cfg.label, href: s.url };
    });
  } else {
    const headersList = await headers();
    const userCountry = headersList.get("user-country");
    const isFromEgypt = userCountry === "EG";
    platforms = isFromEgypt ? EGYPT_PLATFORMS : JORDAN_PLATFORMS;
  }

  const baseContainerClass =
    variant === "default"
      ? "rounded-full border border-lev-blue bg-white flex items-center justify-center hover:bg-lev-blue hover:text-white transition-colors"
      : "border border-white p-1.5 rounded-full flex items-center hover:bg-white justify-center";

  const baseIconClass =
    variant === "default"
      ? "text-lev-blue group-hover/social-share-icon:text-white"
      : "text-white group-hover/social-share-icon:text-lev-blue";

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {platforms.map((platform, i) => {
        return (
          <a
            key={`${platform.label}-${i}`}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/social-share-icon",
              baseContainerClass,
              !containerClassName && sizeStyles.container,
              containerClassName
            )}
            aria-label={platform.label}
          >
            <platform.icon
              className={cn(
                !iconClassName && sizeStyles.icon,
                "text-white",
                baseIconClass,
                iconClassName
              )}
            />
          </a>
        );
      })}
    </div>
  );
}
