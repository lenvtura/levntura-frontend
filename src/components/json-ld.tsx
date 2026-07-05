/**
 * Renders a Schema.org JSON-LD block as a <script type="application/ld+json">.
 * The data is built on the server from CMS fields, so it's safe to inline.
 * Returns null when there's no data (e.g. structured data disabled for the doc).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
