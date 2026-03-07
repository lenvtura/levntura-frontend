import { notFound } from "next/navigation";
import { PROGRAM_CONFIG } from "./program-config";
import { ProgramPage } from "./program-page";

export default async function Page({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = await params;
  const config = PROGRAM_CONFIG[programSlug];

  if (!config) notFound();

  return <ProgramPage config={config} />;
}
