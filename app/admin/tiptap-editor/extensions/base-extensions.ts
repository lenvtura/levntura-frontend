import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import { type CommandProps, Extension, type RawCommands } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['\"]+/g, "") || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: CommandProps) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }: CommandProps) => {
          const c = chain() as unknown as {
            setMark: (
              name: string,
              attrs: Record<string, unknown>,
            ) => {
              removeEmptyTextStyle: () => { run: () => boolean };
              run: () => boolean;
            };
          };

          return c
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    } as unknown as Partial<RawCommands>;
  },
});

export const BaseExtensions = [
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
    heading: { levels: [1, 2, 3, 4, 5, 6] },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-600 underline cursor-pointer",
    },
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle.configure({}),
  FontSize,
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "border-collapse border border-gray-300",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "border border-gray-300",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "border border-gray-300 bg-gray-50 font-semibold text-left p-2",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "border border-gray-300 p-2",
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: "max-w-full h-auto rounded-lg",
    },
  }),
  Placeholder.configure({
    placeholder: "Start typing...",
  }),
  Underline,
  Subscript,
  Superscript,
  Highlight.configure({
    multicolor: true,
  }),
];
