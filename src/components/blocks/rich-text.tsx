import type { Block } from "@/lib/types";
import { cn } from "@/design-system/helpers";

interface RichTextBlockProps {
  block: Block & { content: unknown; width?: "narrow" | "medium" | "wide" };
}

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  url?: string;
  listType?: "number" | "bullet" | "check";
  children?: LexicalNode[];
};

function extractText(node: LexicalNode | undefined): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (!node.children) return "";
  return node.children.map(extractText).join("");
}

// Keep Arabic letters (؀-ۿ) so AR posts get readable anchors too.
function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

export interface RichTextHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

export function extractHeadingsFromLexical(content: unknown): RichTextHeading[] {
  const root = (content as { root?: LexicalNode } | undefined)?.root;
  if (!root?.children) return [];
  const seen = new Map<string, number>();
  const headings: RichTextHeading[] = [];
  for (const node of root.children) {
    if (node.type !== "heading") continue;
    const tag = node.tag;
    if (tag !== "h2" && tag !== "h3") continue;
    const text = extractText(node).trim();
    if (!text) continue;
    let id = slugifyHeading(text);
    // Disambiguate duplicate slugs with -2, -3, etc.
    const prior = seen.get(id) ?? 0;
    seen.set(id, prior + 1);
    if (prior > 0) id = `${id}-${prior + 1}`;
    headings.push({ id, level: tag === "h2" ? 2 : 3, text });
  }
  return headings;
}

// Lexical text format bitmask
const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 1 << 1;
const FORMAT_STRIKETHROUGH = 1 << 2;
const FORMAT_UNDERLINE = 1 << 3;
const FORMAT_CODE = 1 << 4;
const FORMAT_SUBSCRIPT = 1 << 5;
const FORMAT_SUPERSCRIPT = 1 << 6;

function renderText(node: LexicalNode, key: string) {
  let content: React.ReactNode = node.text ?? "";
  const f = node.format ?? 0;
  if (f & FORMAT_CODE) content = <code>{content}</code>;
  if (f & FORMAT_BOLD) content = <strong>{content}</strong>;
  if (f & FORMAT_ITALIC) content = <em>{content}</em>;
  if (f & FORMAT_UNDERLINE) content = <u>{content}</u>;
  if (f & FORMAT_STRIKETHROUGH) content = <s>{content}</s>;
  if (f & FORMAT_SUBSCRIPT) content = <sub>{content}</sub>;
  if (f & FORMAT_SUPERSCRIPT) content = <sup>{content}</sup>;
  return <span key={key}>{content}</span>;
}

function renderChildren(
  children: LexicalNode[] | undefined,
  keyPrefix: string,
  ctx?: HeadingIdContext,
): React.ReactNode {
  if (!children) return null;
  return children.map((child, i) => renderNode(child, `${keyPrefix}-${i}`, ctx));
}

interface HeadingIdContext {
  seen: Map<string, number>;
}

function renderNode(
  node: LexicalNode,
  key: string,
  ctx?: HeadingIdContext,
): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "text":
      return renderText(node, key);

    case "linebreak":
      return <br key={key} />;

    case "paragraph":
      return (
        <p key={key} className="typography-R16 lg:typography-R18 text-lev-black mb-6 leading-relaxed">
          {renderChildren(node.children, key, ctx)}
        </p>
      );

    case "heading": {
      const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      // Stable id matching `extractHeadingsFromLexical` so the TOC sidebar
      // can scrollspy into this heading.
      let id: string | undefined;
      if ((Tag === "h2" || Tag === "h3") && ctx) {
        const text = extractText(node).trim();
        if (text) {
          const base = slugifyHeading(text);
          const prior = ctx.seen.get(base) ?? 0;
          ctx.seen.set(base, prior + 1);
          id = prior > 0 ? `${base}-${prior + 1}` : base;
        }
      }
      return (
        <Tag
          id={id}
          key={key}
          className="typography-EB24 lg:typography-EB32 text-lev-green-dark mb-4 mt-8 scroll-mt-24"
        >
          {renderChildren(node.children, key, ctx)}
        </Tag>
      );
    }

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className="list-disc pl-6 mb-6 typography-R16 text-lev-black space-y-2">
          {renderChildren(node.children, key, ctx)}
        </Tag>
      );
    }

    case "listitem":
      return <li key={key}>{renderChildren(node.children, key, ctx)}</li>;

    case "link":
      return (
        <a
          key={key}
          href={node.url ?? "#"}
          className="text-lev-red underline hover:no-underline"
          target={node.url?.startsWith("http") ? "_blank" : undefined}
          rel={node.url?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {renderChildren(node.children, key, ctx)}
        </a>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-lev-red pl-4 italic mb-6 text-lev-gray"
        >
          {renderChildren(node.children, key, ctx)}
        </blockquote>
      );

    default:
      // Unknown node — just render children to avoid losing content
      return <span key={key}>{renderChildren(node.children, key, ctx)}</span>;
  }
}

export function RichTextContent({ content }: { content: unknown }) {
  const root = (content as { root?: LexicalNode } | undefined)?.root;
  if (!root) return null;
  const ctx: HeadingIdContext = { seen: new Map() };
  return <>{renderChildren(root.children, "rt", ctx)}</>;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  const widthClass =
    block.width === "narrow"
      ? "max-w-3xl"
      : block.width === "wide"
        ? "max-w-7xl"
        : "max-w-5xl";

  return (
    <div className={cn("mx-auto px-4", widthClass)}>
      <RichTextContent content={block.content} />
    </div>
  );
}
