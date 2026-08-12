import type { Block } from "@/lib/types";
import { cn } from "@/design-system/helpers";
import { RICH_TEXT_STATE_CSS } from "@/lib/richTextState";

interface RichTextBlockProps {
  block: {
    content: unknown;
    width?: string;
    blockType?: string;
  };
}

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  url?: string;
  listType?: "number" | "bullet" | "check";
  children?: LexicalNode[];
  // Inline text-state (color / size) applied to a selection — Payload stores
  // it under `$` on the text node.
  $?: Record<string, string>;
};

const hyphenToCamel = (s: string) =>
  s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

// Turn a text node's `$` state (e.g. { color: 'red', size: '20' }) into an
// inline React style using the shared RICH_TEXT_STATE_CSS map.
function stateStyle(node: LexicalNode): React.CSSProperties | undefined {
  const state = node.$;
  if (!state) return undefined;
  const style: Record<string, string> = {};
  for (const [stateKey, value] of Object.entries(state)) {
    const css = RICH_TEXT_STATE_CSS[stateKey]?.[value];
    if (css) {
      for (const [k, v] of Object.entries(css)) style[hyphenToCamel(k)] = v;
    }
  }
  return Object.keys(style).length ? (style as React.CSSProperties) : undefined;
}

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

/** Flatten a Lexical rich-text document to plain text (used for FAQ search). */
export function lexicalToText(content: unknown): string {
  const root = (content as { root?: LexicalNode } | undefined)?.root;
  if (!root?.children) return "";
  return root.children.map(extractText).join(" ");
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
  return (
    <span key={key} style={stateStyle(node)}>
      {content}
    </span>
  );
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
      const isCheck = node.listType === "check";
      return (
        <Tag
          key={key}
          className={
            isCheck
              ? "mb-6 typography-R16 text-lev-black space-y-3 list-none ps-0 [&>li]:relative [&>li]:ps-7 [&>li]:leading-relaxed [&>li]:before:absolute [&>li]:before:start-0 [&>li]:before:content-['✓'] [&>li]:before:font-bold [&>li]:before:text-lev-green"
              : "list-disc pl-6 mb-6 typography-R16 text-lev-black space-y-3 [&>li]:leading-relaxed"
          }
        >
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
    <div
      className={cn(
        // `[&_p]:leading-relaxed` wins over the paragraph's built-in
        // typography line-height (which otherwise renders body text cramped).
        "mx-auto px-4 [&_p]:leading-relaxed",
        widthClass,
      )}
    >
      <RichTextContent content={block.content} />
    </div>
  );
}
