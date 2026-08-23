/**
 * ProgramApplyForm — thin wrapper around our `DynamicForm` that handles the
 * "Apply for this program" flow.
 *
 * Form fields (name / email / phone / age / country / education / cv /
 * coverLetter / etc.) come from the Forms collection in admin — the editor
 * controls add/remove/reorder there. This component just:
 *   - Renders the form via our existing `DynamicForm` (same one used by
 *     Contact and Gallery CTA).
 *   - Appends a hidden "_program" field to the form so each submission
 *     records which program it came from. Admin can filter Submissions by
 *     this later (no schema change needed).
 *
 * Submissions land in `form-submissions` (same place as Contact / Gallery)
 * with the `status` workflow field for follow-up tracking.
 */

import type { CmsForm } from "@/lib/types";

import { DynamicForm } from "./blocks/contact-form-client";

interface ProgramApplyFormProps {
  /**
   * Resolved form to render. Caller is expected to resolve precedence:
   * `program.applicationForm ?? programType.applicationForm ?? defaultForm`.
   * If null is passed the component renders a placeholder asking the editor
   * to wire one up.
   */
  form: CmsForm | null;
  /** Program ID — appended to submissionData so admin can filter. */
  programId?: string | number;
  /** Program title — used as the hidden field's display value. */
  programTitle?: string;
}

export function ProgramApplyForm({
  form,
  programId,
  programTitle,
}: ProgramApplyFormProps) {
  if (!form) {
    return (
      <div className="bg-white p-6 text-center text-sm text-lev-black/60">
        No application form is linked to this program yet. Configure it in
        admin → Programs → Application Form.
      </div>
    );
  }

  // Inject the program identifier as an extra submission field so the editor
  // can tell which program each submission came from without changing the
  // form schema in admin.
  const formWithProgramContext: CmsForm =
    programId !== undefined
      ? {
          ...form,
          fields: [
            ...(form.fields ?? []),
            {
              blockType: "text",
              name: "_program",
              label: "Program",
              required: false,
              defaultValue: programTitle ?? String(programId),
            },
          ],
        }
      : form;

  return <DynamicForm form={formWithProgramContext} />;
}
