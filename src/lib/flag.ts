// Maps the country codes stored on programs/jobs to the flagcdn.com ISO code.
// Most already match (lowercased); only a few differ (UK → gb). flagcdn.com is
// allow-listed in next.config.ts.
const COUNTRY_FLAG_CODE: Record<string, string> = {
  US: 'us',
  USA: 'us',
  UK: 'gb',
  GB: 'gb',
}

/** flagcdn image URL for a stored country code (e.g. "US" → .../us.png). */
export function flagSrcFor(country: string): string {
  const code = COUNTRY_FLAG_CODE[country.toUpperCase()] ?? country.toLowerCase()
  return `https://flagcdn.com/w40/${code}.png`
}
