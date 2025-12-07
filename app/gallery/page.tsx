import { GalleryHero } from "./gallery-hero";
import { PhotoGrid } from "./photo-grid";
import { GalleryCTASection } from "./gallery-cta-section";
import { GALLERY_GRID_1 } from "./gallery-data";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <GalleryHero />
      <PhotoGrid images={GALLERY_GRID_1} />
      <GalleryCTASection />
    </div>
  );
}
