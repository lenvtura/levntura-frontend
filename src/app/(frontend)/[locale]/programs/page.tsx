import { getPrograms, getProgramTypes } from "@/lib/api";
import type { Program, ProgramType } from "@/lib/types";
import { ProgramsView } from "./programs-view";
import { resolveLocale } from "@/lib/server-request";

export const revalidate = 60;

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const locale = await resolveLocale();
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  // Tolerate CMS being unreachable — render an empty listing rather than crash.
  const [programsRes, types] = await Promise.all([
    getPrograms(locale, { limit: 100, draft: isPreview }).catch(
      () => ({ docs: [] as Program[] }),
    ),
    getProgramTypes(locale, { draft: isPreview }).catch(
      () => [] as ProgramType[],
    ),
  ]);

  return (
    <ProgramsView programs={programsRes.docs} types={types} locale={locale} />
  );
}
