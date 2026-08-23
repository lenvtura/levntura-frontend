"use client";

// Self-gated: returns null on public visits so it can be mounted once
// in the root layout. Triggers router.refresh() on admin postMessage.

import { RefreshRouteOnSave as PayloadRefresh } from "@payloadcms/live-preview-react";
import { useRouter, useSearchParams } from "next/navigation";

// Same origin as the Payload admin now — validate the live-preview
// postMessage against our own origin instead of a separate CMS host.
const CMS_URL =
  typeof window !== "undefined" ? window.location.origin : "";

export function LivePreviewRefresh() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview =
    searchParams.get("preview") === "true" ||
    searchParams.get("draft") === "true";

  if (!isPreview) return null;

  return (
    <PayloadRefresh
      refresh={() => router.refresh()}
      serverURL={CMS_URL}
    />
  );
}
