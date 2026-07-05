/**
 * One-shot orchestrator: forms → pages → programs.
 *
 * Runs `seedForms` first (Contact + Application forms), then `seedPages`
 * with the form IDs threaded through so the contact / gallery-cta blocks
 * are wired up automatically. Finally `seedPrograms` creates the 4 default
 * ProgramTypes and 5 sample Programs, all pointing at the Application form.
 *
 * Idempotent throughout — safe to re-run, won't blow away editor edits.
 */

import type { Payload } from 'payload'

import { seedForms, type SeedFormsResult } from './seedForms'
import { seedPages, type SeedPagesResult } from './seedPages'
import { seedPrograms, type SeedProgramsResult } from './seedPrograms'
import {
  seedProgramDetails,
  type SeedProgramDetailsResult,
} from './seedProgramDetails'

export interface SeedSiteResult {
  ok: boolean
  message: string
  forms: SeedFormsResult
  pages: SeedPagesResult
  programs: SeedProgramsResult
  programDetails: SeedProgramDetailsResult
}

export async function seedSite(payload: Payload): Promise<SeedSiteResult> {
  const forms = await seedForms(payload)

  const pages = await seedPages(payload, {
    forms: forms.forms,
    publish: true,
  })

  const programs = await seedPrograms(payload, {
    applicationFormId: forms.forms.applicationFormId,
    publish: true,
  })

  // Patch the structured detail-page fields (hero / intro / why participate /
  // jobs / destinations / requirements / features / etc.) using PROGRAM_CONFIG
  // data ported from the legacy static frontend. Downloads ~60 images on
  // first run — fast on subsequent runs thanks to filename-based dedup.
  const programDetails = await seedProgramDetails(payload, programs.programs)

  const totalErrors =
    forms.errors.length +
    pages.errors.length +
    programs.errors.length +
    programDetails.errors.length
  const ok = totalErrors === 0

  return {
    ok,
    message: `Site seed done. ${forms.message} ${pages.message} ${programs.message} ${programDetails.message}`,
    forms,
    pages,
    programs,
    programDetails,
  }
}
