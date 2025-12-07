"use client";

import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { YoutubeIcon } from "@/assets/icons/youtube";
import { cn } from "@/design-system/helpers";
import { ComponentProps } from "react";

export type SocialPlatform =
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "youtube";

interface SocialShareIconsProps extends ComponentProps<"div"> {
  platforms?: SocialPlatform[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white-border";
  iconClassName?: string;
  containerClassName?: string;
  hrefs?: Partial<Record<SocialPlatform, string>>;
}

const platforms = [
  {
    icon: FaWhatsapp,
    label: "Share on WhatsApp",
    href: "https://wa.me/?text=Check out this post!",
  },
  {
    icon: FaInstagram,
    label: "Share on Instagram",
    href: "https://www.instagram.com/levntura",
  },
  {
    icon: FaLinkedinIn,
    label: "Share on LinkedIn",
    href: "https://www.linkedin.com/company/levntura/",
  },
  {
    icon: FaFacebook,
    label: "Share on Facebook",
    href: "https://www.facebook.com/levntura",
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

export function SocialShareIcons({
  size = "md",
  variant = "default",
  iconClassName,
  containerClassName,
  className,
  ...props
}: SocialShareIconsProps) {
  const sizeStyles = sizeConfig[size];

  const baseContainerClass =
    variant === "default"
      ? "rounded-full border border-lev-blue bg-white flex items-center justify-center hover:bg-lev-blue hover:text-white transition-colors"
      : "border border-white p-1.5 rounded-full flex items-center justify-center";

  const baseIconClass =
    variant === "default"
      ? "text-lev-blue group-hover/social-share-icon:text-white"
      : "text-white group-hover/social-share-icon:text-lev-blue";

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {platforms.map((platform) => {
        return (
          <a
            key={platform.label}
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
