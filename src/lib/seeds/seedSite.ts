/**
 * One-shot orchestrator: forms → pages → programs.
 *
 * Runs `seedForms` first (Contact + Application forms), then `seedPages`
 * with the form IDs threaded through so the contact / gallery-cta blocks
 * are wired up automatically. Finally `seedPrograms` creates the 4 default
 * ProgramTypes and the sample Programs — each built in one step with its
 * full page (sections blocks) and images, exactly like Pages.
 *
 * Idempotent throughout — safe to re-run, won't blow away editor edits.
 */

import type { Payload } from 'payload'

import { seedForms, type SeedFormsResult } from './seedForms'
import { seedPages, type SeedPagesResult } from './seedPages'
import { seedPrograms, type SeedProgramsResult } from './seedPrograms'

export interface SeedSiteResult {
  ok: boolean
  message: string
  forms: SeedFormsResult
  pages: SeedPagesResult
  programs: SeedProgramsResult
}

export async function seedSite(payload: Payload): Promise<SeedSiteResult> {
  const forms = await seedForms(payload)

  const pages = await seedPages(payload, {
    forms: forms.forms,
    publish: true,
  })

  // Creates the ProgramTypes + Programs. Each program is built in one step
  // with its full page (sections blocks) resolved from its detail content —
  // downloads its images on first run, deduped by filename after.
  const programs = await seedPrograms(payload, {
    applicationFormId: forms.forms.applicationFormId,
    publish: true,
  })

  const totalErrors =
    forms.errors.length + pages.errors.length + programs.errors.length
  const ok = totalErrors === 0

  return {
    ok,
    message: `Site seed done. ${forms.message} ${pages.message} ${programs.message}`,
    forms,
    pages,
    programs,
  }
}
