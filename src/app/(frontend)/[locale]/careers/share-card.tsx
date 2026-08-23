import { useTranslations } from "next-intl";
import {
  FaWhatsapp,
  FaFacebook,
  FaLinkedinIn,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { YoutubeIcon } from "@/assets/icons/youtube";
import { cn } from "@/design-system/helpers";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { LeventuraSymbolLogo } from "@/atoms/logo";

// Profile links for platforms that can't share an arbitrary URL.
const INSTAGRAM_PROFILE = "https://www.instagram.com/levntura.jo/";
const YOUTUBE_PROFILE = "https://www.youtube.com/@Levntura";

/**
 * "Share it with the ones you love!" section — real share intents that share
 * the CURRENT page URL (not the company profiles). i18n text via the
 * `internship` namespace.
 */
export function ShareCard({ shareUrl = "" }: { shareUrl?: string }) {
  const t = useTranslations("internship");
  const url = encodeURIComponent(shareUrl);

  const targets = [
    { label: "WhatsApp", Icon: FaWhatsapp, href: `https://api.whatsapp.com/send?text=${url}` },
    { label: "Instagram", Icon: FaInstagram, href: INSTAGRAM_PROFILE },
    { label: "LinkedIn", Icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "Facebook", Icon: FaFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: "YouTube", Icon: YoutubeIcon, href: YOUTUBE_PROFILE },
    { label: "X", Icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${url}` },
    { label: "Telegram", Icon: FaTelegram, href: `https://t.me/share/url?url=${url}` },
  ];

  return (
    <div className="relative group overflow-hidden bg-white p-8 lg:p-12">
      <LeventuraSymbolLogo className="pointer-events-none absolute -bottom-4 -end-16 text-gray-100 size-[300px]" />

      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 lg:typography-S48 text-lev-black mb-4 leading-tight">
          {t("share.title")}
        </h2>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="typography-R16 text-lev-gray max-w-md mb-10 leading-relaxed">
          {t("share.subtitle")}
        </p>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.3 }}>
        <div className="relative flex flex-wrap items-center gap-3">
          {targets.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className={cn(
                "group/share flex h-12 w-12 items-center justify-center rounded-full border border-lev-blue bg-white transition-colors hover:bg-lev-blue",
              )}
            >
              <Icon className="h-5 w-5 text-lev-blue group-hover/share:text-white" />
            </a>
          ))}
        </div>
      </FadeUpAnimator>
    </div>
  );
}
