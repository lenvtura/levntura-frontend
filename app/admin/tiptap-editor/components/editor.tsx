import { EditorContent, useEditor } from "@tiptap/react";
import { TiptapToolbar } from "./tiptap-toolbar";
import { BaseExtensions } from "../extensions/base-extensions";
import { cn } from "@/design-system/helpers";

import { useEffect } from "react";
import { type ComponentProps } from "react";

interface TiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  editorProps?:
    | ComponentProps<typeof EditorContent>
    | React.HTMLAttributes<HTMLElement>;
  contentClassName?: string;
}

const Tiptap: React.FC<TiptapProps> = ({
  content = "",
  onChange,
  placeholder = "Start typing...",
  editable = true,
  editorProps,
  contentClassName,
}) => {
  const editor = useEditor({
    extensions: [...BaseExtensions],
    content,
    immediatelyRender: false,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.isEmpty ? "" : editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl max-w-none focus:outline-none",
          "min-h-[300px] p-6",
        ),
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.isEmpty ? "" : editor.getHTML();
    const newContent = content || "";

    if (currentContent !== newContent) {
      editor.commands.setContent(newContent, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm",
        "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
        contentClassName,
      )}
      role="editor"
    >
      {editor && editable && <TiptapToolbar editor={editor} />}

      <div className="relative">
        {editor ? (
          <EditorContent
            disabled={!editable}
            editor={editor}
            placeholder={placeholder}
            className={cn(
              "ProseMirror min-h-[300px] max-h-[600px] overflow-y-auto p-6",
              "focus:outline-none",
              editorProps?.className,
            )}
            {...editorProps}
          />
        ) : (
          <div className="min-h-[300px] p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        )}
      </div>

      {/* Custom styles for enhanced content rendering */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          line-height: 1.6;
        }

        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .ProseMirror h2 {
          font-size: 1.875rem;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .ProseMirror h5 {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .ProseMirror h6 {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ProseMirror p {
          color: #374151;
        }

        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: #374151;
        }

        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: #374151;
        }

        .ProseMirror li {
          margin-bottom: 0.5rem;
        }

        .ProseMirror li p {
          margin-bottom: 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          color: #111827;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: "Courier New", monospace;
        }

        .ProseMirror pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .ProseMirror pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .ProseMirror a:hover {
          color: #1d4ed8;
        }

        .ProseMirror strong {
          font-weight: 600;
          color: #111827;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror s {
          text-decoration: line-through;
          color: #6b7280;
        }

        .ProseMirror u {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .ProseMirror mark {
          background-color: #fef08a;
          color: #78350f;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }

        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
        }

        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
        }

        .ProseMirror th {
          background-color: #f9fafb;
          font-weight: 600;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .ProseMirror .ProseMirror-selectednode {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }

        .ProseMirror .ProseMirror-focused {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};
export { Tiptap, type TiptapProps };
