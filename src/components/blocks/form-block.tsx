import type { CmsForm } from "@/lib/types";

import { DynamicForm } from "./contact-form-client";
import { RichTextContent } from "./rich-text";

export interface FormBlockData {
  form?: CmsForm | string | number | null;
  enableIntro?: boolean;
  introContent?: unknown;
}

/**
 * FormBlock — renders a form picked from the Forms collection (form-builder
 * plugin) with an optional rich-text intro above it. Submissions land in
 * `form-submissions`, same as Contact / Apply. The `form` relationship comes
 * back populated (depth >= 1) so we can hand it straight to DynamicForm.
 */
export function FormBlock({ block }: { block: FormBlockData }) {
  const form =
    block.form && typeof block.form === "object"
      ? (block.form as CmsForm)
      : null;

  if (!form) return null;

  return (
    <div className="container-md mx-auto px-4 py-12 lg:py-16">
      {block.enableIntro && block.introContent ? (
        <div className="mb-8">
          <RichTextContent content={block.introContent} />
        </div>
      ) : null}
      <DynamicForm form={form} />
    </div>
  );
}
