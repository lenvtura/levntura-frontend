import type { TravelDestinationsBlock as TravelDestinationsBlockData } from "@/lib/types";

import { TravelDestinationsStrip } from "./travel-destinations-strip";

interface TravelDestinationsBlockProps {
  block: TravelDestinationsBlockData;
}

export function TravelDestinationsBlock({ block }: TravelDestinationsBlockProps) {
  const images = block.images ?? [];
  if (images.length === 0) return null;
  return <TravelDestinationsStrip images={images} />;
}
