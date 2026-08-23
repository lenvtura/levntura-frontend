"use client";

import { useState } from "react";

import { UploadCloud } from "lucide-react";

import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { cn } from "@/design-system/helpers";
import type { CmsForm, CmsFormField } from "@/lib/types";

// Same-origin now (frontend + Payload merged): POST to relative /api/*
// paths so the browser targets the current host — no separate CMS URL.
const CMS_URL = "";

export function DynamicForm({
  form,
  bare = false,
}: {
  form: CmsForm;
  /** Inside a modal the frame/padding is provided by the parent — drop the
   *  form's own white box and enlarge the title. */
  bare?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      // 1. Upload any file fields to Media first — Payload form-builder's
      //    upload-type fields store a Media ID, not the raw bytes, so each
      //    selected file goes through /api/media as a multipart POST and we
      //    swap the returned id into the submissionData value.
      const uploadedIds: Record<string, number> = {};
      for (const [fieldName, file] of Object.entries(files)) {
        if (!file) continue;
        const fd = new FormData();
        fd.append("file", file);
        fd.append("_payload", JSON.stringify({ alt: file.name }));
        const uploadRes = await fetch(`${CMS_URL}/api/media`, {
          method: "POST",
          body: fd,
        });
        if (!uploadRes.ok) {
          throw new Error(
            `Upload failed for ${fieldName}: ${uploadRes.status}`,
          );
        }
        const uploadJson = (await uploadRes.json()) as { doc?: { id?: number } };
        if (uploadJson.doc?.id) uploadedIds[fieldName] = uploadJson.doc.id;
      }

      // 2. Build submissionData — skip empty entries to avoid validation
      //    rejections for typed fields (upload / country / number) that
      //    won't accept an empty string. Upload fields get the Media ID
      //    from step 1 in the `value` slot (Payload accepts numeric IDs
      //    serialised as strings here). Underscore-prefixed fields are
      //    internal tracking fields (e.g. _program injected by
      //    ProgramApplyForm) — they're not rendered visibly, so we read
      //    their value from the field's `defaultValue` rather than user
      //    state.
      const submissionData = (form.fields ?? [])
        .filter((f) => f.name)
        .map((f) => {
          if (f.blockType === "upload" && uploadedIds[f.name]) {
            return { field: f.name, value: String(uploadedIds[f.name]) };
          }
          if (f.name.startsWith("_")) {
            const hidden = (f as { defaultValue?: string }).defaultValue;
            return { field: f.name, value: hidden ?? "" };
          }
          return { field: f.name, value: values[f.name] ?? "" };
        })
        .filter((entry) => entry.value !== "");

      const res = await fetch(`${CMS_URL}/api/form-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: form.id, submissionData }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Submit failed: ${res.status} — ${body.slice(0, 100)}`);
      }
      setStatus("ok");
      setValues({});
      setFiles({});
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  if (status === "ok") {
    return (
      <div className="bg-white p-6 text-lev-green-dark max-w-md w-full text-center">
        ✓{" "}
        {form.confirmationType === "message"
          ? "Thanks — we'll be in touch!"
          : "Submitted!"}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-y-4",
        bare ? "" : "max-w-2xl bg-white p-6",
      )}
    >
      {form.title && (
        <h2
          className={
            bare
              ? "typography-EB34 uppercase text-lev-green-dark mb-2"
              : "typography-S24 w-5/6"
          }
        >
          {form.title}
        </h2>
      )}
      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-3">
          {(form.fields ?? [])
            .filter((f) => !f.name?.startsWith("_"))
            .map((field, i) => {
              const colSpan = field.width === 50 ? "col-span-12 sm:col-span-6" : "col-span-12";
              return (
                <div key={`${field.name}-${i}`} className={colSpan}>
                  <FieldRenderer
                    field={field}
                    value={values[field.name] ?? ""}
                    onChange={(v) =>
                      setValues((prev) => ({ ...prev, [field.name]: v }))
                    }
                    file={files[field.name] ?? null}
                    onFileChange={(f) =>
                      setFiles((prev) => ({ ...prev, [field.name]: f }))
                    }
                  />
                </div>
              );
            })}
        </div>
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Sending..."
            : form.submitButtonLabel ?? "Submit"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-lev-red typography-R14">{errorMsg}</p>
      )}
    </div>
  );
}

// A tiny ISO-3166-1 alpha-2 subset for the form-builder `country` field.
// Editors don't typically need every country here — the seed only uses a
// handful of targets — but the dropdown gracefully shrinks if extended.
const COUNTRY_OPTIONS = [
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "EG", name: "Egypt" },
  { code: "JO", name: "Jordan" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "LB", name: "Lebanon" },
  { code: "IQ", name: "Iraq" },
  { code: "SY", name: "Syria" },
  { code: "YE", name: "Yemen" },
  { code: "PS", name: "Palestine" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "OTHER", name: "Other" },
];

function FieldRenderer({
  field,
  value,
  onChange,
  file,
  onFileChange,
}: {
  field: CmsFormField;
  value: string;
  onChange: (v: string) => void;
  file: File | null;
  onFileChange: (f: File | null) => void;
}) {
  const placeholder = field.label ?? field.name;

  switch (field.blockType) {
    case "textarea":
    case "message":
      return (
        <textarea
          required={field.required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "border-input bg-background w-full rounded-md border px-3 py-2 typography-R14",
            "focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none",
          )}
          rows={4}
        />
      );

    case "select":
      return (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-input bg-background w-full rounded-md border px-3 py-2 typography-R14"
        >
          <option value="">{placeholder}</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "country":
      // Form-builder's typed `country` field expects an ISO code as the
      // submission value. We render a select of common Levntura-target
      // countries so editors get a real dropdown instead of a blank text
      // input — submissions still validate cleanly.
      return (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-input bg-background w-full rounded-md border px-3 py-2 typography-R14"
        >
          <option value="">{placeholder}</option>
          {COUNTRY_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2 typography-R14">
          <input
            type="checkbox"
            checked={value === "true"}
            onChange={(e) => onChange(e.target.checked ? "true" : "false")}
          />
          {placeholder}
        </label>
      );

    case "email":
      return (
        <Input
          required={field.required}
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <Input
          required={field.required}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "upload":
      // Real file picker for the form-builder `upload` field type (CV upload
      // on Program Application etc.). Selected file is held in component state
      // and uploaded to /api/media on submit — the returned Media id then
      // populates the submissionData entry.
      return (
        <div className="flex flex-col gap-2">
          <label className="typography-S18 text-lev-black">{placeholder}</label>
          <label className="relative flex min-h-[170px] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-lev-blue/40 bg-lev-blue-highlighter/40 p-6 text-center transition-colors hover:border-lev-blue">
            <input
              required={field.required}
              type="file"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <UploadCloud className="h-8 w-8 text-lev-blue" />
            <span className="typography-R14 text-lev-black">
              <span className="text-lev-blue underline">Click To Upload</span>{" "}
              Or Drag And Drop
            </span>
            {file && (
              <span className="typography-R12 text-lev-gray">
                ✓ {file.name} ({Math.round(file.size / 1024)} KB)
              </span>
            )}
          </label>
        </div>
      );

    case "text":
    default:
      return (
        <Input
          required={field.required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
