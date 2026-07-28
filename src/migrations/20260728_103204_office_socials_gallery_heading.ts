import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_al_office_social" AS ENUM('whatsapp', 'instagram', 'facebook', 'linkedin', 'youtube', 'twitter', 'tiktok', 'telegram');
  CREATE TABLE "pages_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "program_types_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "programs_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_address_list_offices_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum_al_office_social",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "pages_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "_pages_v_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "_pages_v_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "program_types_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "program_types_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "_program_types_v_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "_program_types_v_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "programs_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "programs_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "_programs_v_blocks_gallery_hero" ADD COLUMN "heading" varchar DEFAULT 'WE ARE CREATING
  MEMORIES, ARE
  YOU JOINING?';
  ALTER TABLE "_programs_v_blocks_gallery_hero" ADD COLUMN "highlighted_words" varchar DEFAULT 'CREATING MEMORIES,';
  ALTER TABLE "pages_blocks_address_list_offices_socials" ADD CONSTRAINT "pages_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_address_list_offices_socials" ADD CONSTRAINT "_pages_v_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_address_list_offices_socials" ADD CONSTRAINT "program_types_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_address_list_offices_socials" ADD CONSTRAINT "_program_types_v_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_address_list_offices_socials" ADD CONSTRAINT "programs_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_address_list_offices_socials" ADD CONSTRAINT "_programs_v_blocks_address_list_offices_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_address_list_offices_socials_order_idx" ON "pages_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "pages_blocks_address_list_offices_socials_parent_id_idx" ON "pages_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_address_list_offices_socials_locale_idx" ON "pages_blocks_address_list_offices_socials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_address_list_offices_socials_order_idx" ON "_pages_v_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_address_list_offices_socials_parent_id_idx" ON "_pages_v_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_address_list_offices_socials_locale_idx" ON "_pages_v_blocks_address_list_offices_socials" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_address_list_offices_socials_order_idx" ON "program_types_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "program_types_blocks_address_list_offices_socials_parent_id_idx" ON "program_types_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_address_list_offices_socials_locale_idx" ON "program_types_blocks_address_list_offices_socials" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_socials_order_idx" ON "_program_types_v_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_socials_parent_id_idx" ON "_program_types_v_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_socials_locale_idx" ON "_program_types_v_blocks_address_list_offices_socials" USING btree ("_locale");
  CREATE INDEX "programs_blocks_address_list_offices_socials_order_idx" ON "programs_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "programs_blocks_address_list_offices_socials_parent_id_idx" ON "programs_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_address_list_offices_socials_locale_idx" ON "programs_blocks_address_list_offices_socials" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_address_list_offices_socials_order_idx" ON "_programs_v_blocks_address_list_offices_socials" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_address_list_offices_socials_parent_id_idx" ON "_programs_v_blocks_address_list_offices_socials" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_address_list_offices_socials_locale_idx" ON "_programs_v_blocks_address_list_offices_socials" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_address_list_offices_socials" CASCADE;
  DROP TABLE "_pages_v_blocks_address_list_offices_socials" CASCADE;
  DROP TABLE "program_types_blocks_address_list_offices_socials" CASCADE;
  DROP TABLE "_program_types_v_blocks_address_list_offices_socials" CASCADE;
  DROP TABLE "programs_blocks_address_list_offices_socials" CASCADE;
  DROP TABLE "_programs_v_blocks_address_list_offices_socials" CASCADE;
  ALTER TABLE "pages_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  ALTER TABLE "_pages_v_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  ALTER TABLE "program_types_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "program_types_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  ALTER TABLE "_program_types_v_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "_program_types_v_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  ALTER TABLE "programs_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "programs_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  ALTER TABLE "_programs_v_blocks_gallery_hero" DROP COLUMN "heading";
  ALTER TABLE "_programs_v_blocks_gallery_hero" DROP COLUMN "highlighted_words";
  DROP TYPE "public"."enum_al_office_social";`)
}
