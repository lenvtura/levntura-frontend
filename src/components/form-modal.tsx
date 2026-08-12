"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import type { CmsForm } from "@/lib/types";
import { LevunturaFullLogo } from "@/atoms/logo";
import { DynamicForm } from "./blocks/contact-form-client";

interface FormModalProps {
  form: CmsForm;
  /** The element that opens the modal (e.g. the APPLY NOW button). */
  trigger: ReactNode;
  /** Heading shown above the form. Falls back to the form's own title. */
  title?: string;
  /**
   * Optional hidden field appended to the submission so admins can tell where
   * it came from (e.g. which job). Mirrors the program-apply `_program` field.
   */
  contextField?: { name: string; label: string; value: string };
}

export function FormModal({ form, trigger, title, contextField }: FormModalProps) {
  const formToRender: CmsForm = contextField
    ? {
        ...form,
        fields: [
          ...(form.fields ?? []),
          {
            blockType: "text",
            name: contextField.name,
            label: contextField.label,
            required: false,
            defaultValue: contextField.value,
          },
        ],
      }
    : form;

  const heading = title ?? form.title;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100001] bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100002] flex max-h-[90vh] w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-white shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          {/* Fixed header — logo (left) + close (right). Stays put while the
              form scrolls; same on every form. */}
          <div className="flex shrink-0 items-center justify-between border-b border-lev-gray-light px-8 py-5">
            <LevunturaFullLogo className="h-8 w-auto" />
            <Dialog.Close className="text-lev-black transition-colors hover:text-lev-red">
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* The visible heading is the form's own (editable) title, rendered by
              DynamicForm — so this one is screen-reader-only to avoid a
              duplicate. */}
          <Dialog.Title className="sr-only">{heading}</Dialog.Title>

          <div className="overflow-y-auto px-8 py-8">
            <DynamicForm form={formToRender} bare />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
