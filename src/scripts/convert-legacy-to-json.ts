/**
 * One-off helper: imports each legacy-blog-data/*.ts file via tsx and
 * writes the same data out as JSON next to it. The JSON variants can be
 * imported with `await import('./foo.json')` from production Node, which
 * doesn't support dynamic imports of .ts files.
 *
 * Run once locally:
 *   pnpm tsx src/scripts/convert-legacy-to-json.ts
 *
 * After it writes the .json files, the seed endpoint can read them in any
 * runtime (Railway, Vercel, etc.) without needing tsx at runtime.
 */

import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface Entry {
  file: string
  exportName: string
}

const ENTRIES: Entry[] = [
  { file: 'study-abroad-agencies-in-ksa.ts', exportName: 'studyAbroadAgenciesInKsa' },
  { file: 'j1-agencies-in-ksa.ts', exportName: 'j1AgenciesInKsa' },
  { file: 'scholarships-for-saudi-students-to-study-abroad.ts', exportName: 'scholarshipsForSaudiStudentsToStudyAbroad' },
  { file: 'work-and-travel.ts', exportName: 'workAndTravel' },
  { file: 'scholarships-in-germany-for-saudi-students.ts', exportName: 'scholarshipsInGermanyForSaudiStudents' },
  { file: 'student-exchange-programs-in-ksa.ts', exportName: 'studentExchangeProgramsInKsa' },
]

const DATA_DIR = path.resolve(__dirname, 'legacy-blog-data')

const run = async () => {
  for (const entry of ENTRIES) {
    const tsPath = path.join(DATA_DIR, entry.file)
    const fileUrl = pathToFileURL(tsPath).href
    const mod = await import(fileUrl)
    const data = mod[entry.exportName]
    if (!data) {
      process.stderr.write(`✗ export "${entry.exportName}" missing in ${entry.file}\n`)
      continue
    }
    const jsonPath = tsPath.replace(/\.ts$/, '.json')
    writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8')
    process.stdout.write(`✓ wrote ${path.basename(jsonPath)}\n`)
  }
}

run().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).message}\n`)
  process.exit(1)
})
