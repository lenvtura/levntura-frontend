/**
 * Minimal **bold** marker → <strong>. Lets editors mark important phrases in
 * a plain textarea without a full rich-text field. Shared by the program
 * blocks that were ported from the fixed program-detail layout.
 */
export function RichTextish({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) return <strong key={i}>{m[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
