"use client";

import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface BlogTiptapSectionProps {
  id: string;
  title: string;
  content: string; // This should be HTML for Tiptap
  image?: StaticImageData | string;
  imagePosition?: "left" | "right" | "full";
}

export function BlogTiptapSection({
  id,
  title,
  content,
  image,
  imagePosition = "full",
}: BlogTiptapSectionProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false, // Set to true if you want it to be an editor
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
  });

  // Update content if it changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <section id={id} className="scroll-mt-24 mb-16 lg:mb-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 capitalize text-lev-black mb-6">
          {title}
        </h2>
      </FadeUpAnimator>

      {image && imagePosition === "full" && (
        <FadeUpAnimator transition={{ delay: 0.2 }} className="mb-8">
          <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-sm">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </FadeUpAnimator>
      )}

      {image && imagePosition === "right" ? (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <div className="text-lev-black leading-relaxed tiptap-content">
              <EditorContent editor={editor} />
            </div>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.4 }}>
            <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-sm">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </FadeUpAnimator>
        </div>
      ) : (
        <FadeUpAnimator transition={{ delay: 0.3 }}>
          <div className="text-lev-gray typography-R18 mb-10 tiptap-content">
            <EditorContent editor={editor} />
          </div>
        </FadeUpAnimator>
      )}

      <style jsx global>{`
        .tiptap-content .ProseMirror {
          outline: none;
        }
        .tiptap-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          color: #000;
        }
        .tiptap-content p {
          margin-bottom: 1.25rem;
          line-height: 1.625;
        }

        .tiptap-content a {
          color: var(--color-lev-blue);
        }

        .tiptap-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .tiptap-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .tiptap-content li {
          margin-bottom: 0.5rem;
        }
        .tiptap-content strong {
          font-weight: 700;
          color: #000;
        }
      `}</style>
    </section>
  );
}
