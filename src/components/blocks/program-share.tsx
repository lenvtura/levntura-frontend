import { FaWhatsapp, FaFacebook, FaLinkedinIn, FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { YoutubeIcon } from "@/assets/icons/youtube";
import { cn } from "@/design-system/helpers";

// Levntura profile links for platforms that can't share an arbitrary URL.
const INSTAGRAM_PROFILE = "https://www.instagram.com/levntura.jo/";
const YOUTUBE_PROFILE = "https://www.youtube.com/@Levntura";

interface ProgramShareBlockData {
  heading?: string;
}

/**
 * "Share this program" block — buttons that share the CURRENT page URL to each
 * platform (real share intents, not profile links). `shareUrl` is the page's
 * canonical URL, passed down by the program page through BlockRenderer.
 *
 * Only platforms with a real web-share URL are shown (Instagram/YouTube don't
 * support sharing an arbitrary link, so they're intentionally omitted).
 */
export function ProgramShareBlock({
  block,
  shareUrl,
}: {
  block: ProgramShareBlockData;
  shareUrl?: string;
}) {
  const url = encodeURIComponent(shareUrl ?? "");

  const targets = [
    { label: "WhatsApp", Icon: FaWhatsapp, href: `https://api.whatsapp.com/send?text=${url}` },
    // Instagram/YouTube can't share a link — link to the Levntura profiles.
    { label: "Instagram", Icon: FaInstagram, href: INSTAGRAM_PROFILE },
    { label: "LinkedIn", Icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "Facebook", Icon: FaFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: "YouTube", Icon: YoutubeIcon, href: YOUTUBE_PROFILE },
    { label: "X", Icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${url}` },
    { label: "Telegram", Icon: FaTelegram, href: `https://t.me/share/url?url=${url}` },
  ];

  return (
    <div className="container-md mt-12 flex flex-col items-center justify-center pb-24">
      {block.heading && (
        <p className="typography-M18 text-lev-gray mb-4">{block.heading}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {targets.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className={cn(
              "group/share w-14 h-14 rounded-full border border-lev-blue bg-white",
              "flex items-center justify-center hover:bg-lev-blue transition-colors",
            )}
          >
            <Icon className="w-7 h-7 text-lev-blue group-hover/share:text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}
