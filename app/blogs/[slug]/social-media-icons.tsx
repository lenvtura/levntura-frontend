import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SocialShareIcons } from "@/atoms/social-share-icons";

export function SocialMediaIcons() {
  return (
    <FadeUpAnimator transition={{ delay: 0.3 }}>
      <SocialShareIcons size="sm" />
    </FadeUpAnimator>
  );
}
