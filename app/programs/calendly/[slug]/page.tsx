import { notFound } from "next/navigation";

import { HEADER_HEIGHT } from "@/constants/header-height";
import { CalendlyEmbed } from "./calendly-embed";

const programs = [
  {
    slug: "summer-work-and-travel-jordan",
    label: "Summer Work & Travel",
    url: "https://calendly.com/levntura/wat-2024",
  },
  {
    slug: "summer-work-and-travel-egypt",
    label: "Summer Work & Travel",
    url: "https://calendly.com/levntura/wat-2024-jordan-clone",
  },
  {
    slug: "camp-counselor-jordan",
    label: "Camp Counselor",
    url: "https://calendly.com/levntura/camp-2024-jordan",
  },
  {
    slug: "camp-counselor-egypt",
    label: "Camp Counselor",
    url: "https://calendly.com/levntura/camp-2024-jordan-clone",
  },
];

export async function generateStaticParams() {
  return programs.map((p) => ({
    slug: p.slug,
  }));
}

export const revalidate = 3600;

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const currentProgram = programs.find((pro) => pro.slug === slug);

  if (!currentProgram) {
    notFound();
  }

  return (
    <div style={{ marginTop: HEADER_HEIGHT + 48 }} className="container">
      <div className="typography-S34 text-center text-black">
        Book appointment for {currentProgram.label}
      </div>
      <CalendlyEmbed url={currentProgram.url} label={currentProgram.label} />
    </div>
  );
}
