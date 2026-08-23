import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the `sizes_*` columns backing `Media.upload.imageSizes`
 * (thumbnail / card / feature / og).
 *
 * Hand-written rather than produced by `payload migrate:create`, because at the
 * time of writing the database already carried unrelated pending drift
 * (e.g. `blog_blocks_faq.enable_search`) and the generator would have bundled
 * those ambiguous create-vs-rename decisions into this migration. Scoping it by
 * hand keeps this change to the media table only.
 *
 * Column and index names follow the adapter's own convention, verified against
 * @payloadcms/drizzle: a nested group flattens to `{prefix}_{field}` columns,
 * and `buildIndexName` emits `{parentTable}_{columnName}_idx` — hence
 * `media_sizes_card_sizes_card_filename_idx` for the `card.filename` index.
 *
 * IF NOT EXISTS / IF EXISTS throughout so this is safe to re-run against a
 * database where `push: true` (local dev) already created the columns.
 *
 * NOTE: no matching `.json` schema snapshot is committed alongside this file,
 * so the next `payload migrate:create` will diff against the previous snapshot
 * and try to re-add these columns. The guards make that harmless, but delete
 * the redundant statements from the generated migration when it happens.
 */

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_feature_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_filename" varchar;

  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_feature_sizes_feature_filename_idx" ON "media" USING btree ("sizes_feature_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_feature_sizes_feature_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_og_sizes_og_filename_idx";

  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_feature_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_filename";`)
}
