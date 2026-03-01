import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
  Underline,
  Subscript,
  Superscript,
  Highlighter,
  Table,
  ImageIcon,
  Plus,
} from "lucide-react";

import { cn } from "@/design-system/helpers";

export interface TiptapToolbarProps {
  editor: Editor;
  className?: string;
}

const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28"];

const triggerStyles = cn(
  "size-8 flex items-center bg-transparent text-gray-900 text-sm justify-center p-0 border-none cursor-pointer transition-all rounded-md",
  "[&_svg]:size-4",
  "hover:bg-gray-100 hover:text-gray-900",
  "disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed",
  "data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700",
  "border border-transparent hover:border-gray-200",
);

const selectStyles = cn(
  "h-8 px-3 rounded-md bg-white text-gray-900 text-sm border border-gray-200",
  "hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  "cursor-pointer",
);

const dropdownStyles = cn(
  "absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50",
  "py-1 min-w-[200px]",
);

export const TiptapToolbar: React.FC<TiptapToolbarProps> = ({
  editor,
  className,
}) => {
  const [fontSize, setFontSize] = useState<string>("16");
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showInsertMenu, setShowInsertMenu] = useState(false);

  useEffect(() => {
    const update = () => {
      const attrs = editor.getAttributes("textStyle") as {
        fontSize?: string;
      };

      const size = attrs?.fontSize?.replace("px", "");
      setFontSize(size && FONT_SIZES.includes(size) ? size : "16");
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    update();

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const setAlign = (value: "left" | "center" | "right" | "justify") => {
    editor.chain().focus().setTextAlign(value).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

  const setSize = (value: string) => {
    if (!value || value === "16") {
      editor.chain().focus().unsetFontSize().run();
      setFontSize("16");
      return;
    }

    editor.chain().focus().setFontSize(`${value}px`).run();
    setFontSize(value);
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const toggleHighlight = () => {
    editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run();
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "p-3 flex flex-wrap gap-1 items-center border-b bg-gray-50",
          className,
        )}
      >
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <select
            className={selectStyles}
            value={fontSize}
            onChange={(e) => setSize(e.target.value)}
            title="Font size"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <button
            data-active={editor.isActive("bold")}
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={triggerStyles}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
          >
            <Bold />
          </button>

          <button
            data-active={editor.isActive("italic")}
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={triggerStyles}
            title="Italic (Ctrl+I)"
          >
            <Italic />
          </button>

          <button
            data-active={editor.isActive("underline")}
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={triggerStyles}
            title="Underline (Ctrl+U)"
          >
            <Underline />
          </button>

          <button
            data-active={editor.isActive("strike")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough />
          </button>

          <button
            data-active={editor.isActive("code")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            title="Code"
          >
            <Code />
          </button>

          <button
            data-active={editor.isActive("highlight")}
            className={triggerStyles}
            type="button"
            onClick={toggleHighlight}
            title="Highlight"
          >
            <Highlighter />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <select
            className={selectStyles}
            value={
              editor.isActive("heading", { level: 1 })
                ? "1"
                : editor.isActive("heading", { level: 2 })
                  ? "2"
                  : editor.isActive("heading", { level: 3 })
                    ? "3"
                    : editor.isActive("heading", { level: 4 })
                      ? "4"
                      : editor.isActive("heading", { level: 5 })
                        ? "5"
                        : editor.isActive("heading", { level: 6 })
                          ? "6"
                          : "p"
            }
            onChange={(e) => {
              const v = e.target.value;
              if (v === "p") {
                editor.chain().focus().setParagraph().run();
                return;
              }
              setHeading(Number(v) as 1 | 2 | 3 | 4 | 5 | 6);
            }}
            title="Heading"
          >
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
            <option value="6">Heading 6</option>
          </select>

          <button
            data-active={editor.isActive("subscript")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            title="Subscript"
          >
            <Subscript />
          </button>

          <button
            data-active={editor.isActive("superscript")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            title="Superscript"
          >
            <Superscript />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button
            data-active={editor.isActive({ textAlign: "left" })}
            type="button"
            onClick={() => setAlign("left")}
            className={triggerStyles}
            title="Align left"
          >
            <AlignLeft />
          </button>

          <button
            data-active={editor.isActive({ textAlign: "center" })}
            type="button"
            onClick={() => setAlign("center")}
            className={triggerStyles}
            title="Align center"
          >
            <AlignCenter />
          </button>

          <button
            data-active={editor.isActive({ textAlign: "right" })}
            type="button"
            onClick={() => setAlign("right")}
            className={triggerStyles}
            title="Align right"
          >
            <AlignRight />
          </button>

          <button
            data-active={editor.isActive({ textAlign: "justify" })}
            type="button"
            onClick={() => setAlign("justify")}
            className={triggerStyles}
            title="Justify"
          >
            <AlignJustify />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button
            data-active={editor.isActive("bulletList")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet list"
          >
            <List />
          </button>

          <button
            data-active={editor.isActive("orderedList")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Ordered list"
          >
            <ListOrdered />
          </button>

          <button
            data-active={editor.isActive("blockquote")}
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            <Quote />
          </button>
        </div>

        {/* Insert */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <div className="relative">
            <button
              className={triggerStyles}
              type="button"
              onClick={() => setShowInsertMenu(!showInsertMenu)}
              title="Insert"
            >
              <Plus />
            </button>

            {showInsertMenu && (
              <div className={dropdownStyles}>
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    addImage();
                    setShowInsertMenu(false);
                  }}
                >
                  <ImageIcon className="w-4 h-4" />
                  Image
                </button>
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    editor.chain().focus().setHorizontalRule().run();
                    setShowInsertMenu(false);
                  }}
                >
                  <Minus className="w-4 h-4" />
                  Horizontal rule
                </button>
              </div>
            )}
          </div>

          <button
            data-active={editor.isActive("link")}
            type="button"
            onClick={setLink}
            className={triggerStyles}
            title="Link"
          >
            <LinkIcon />
          </button>

          <div className="relative">
            <button
              data-active={editor.isActive("table")}
              className={triggerStyles}
              type="button"
              onClick={() => setShowTableMenu(!showTableMenu)}
              title="Table"
            >
              <Table />
            </button>

            {showTableMenu && (
              <div className={dropdownStyles}>
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                    insertTable();
                    setShowTableMenu(false);
                  }}
                >
                  Insert table
                </button>
                {editor.isActive("table") && (
                  <>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        addColumnBefore();
                        setShowTableMenu(false);
                      }}
                    >
                      Add column before
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        addColumnAfter();
                        setShowTableMenu(false);
                      }}
                    >
                      Add column after
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        deleteColumn();
                        setShowTableMenu(false);
                      }}
                    >
                      Delete column
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        addRowBefore();
                        setShowTableMenu(false);
                      }}
                    >
                      Add row before
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        addRowAfter();
                        setShowTableMenu(false);
                      }}
                    >
                      Add row after
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        deleteRow();
                        setShowTableMenu(false);
                      }}
                    >
                      Delete row
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        deleteTable();
                        setShowTableMenu(false);
                      }}
                    >
                      Delete table
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={triggerStyles}
            type="button"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 />
          </button>

          <button
            className={triggerStyles}
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 />
          </button>
        </div>
      </div>
    </div>
  );
};
