import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prog_block_req_icon" AS ENUM('passport', 'college', 'language', 'age', 'diploma');
  CREATE TYPE "public"."enum_prog_block_feat_icon" AS ENUM('star', 'bag', 'hand', 'people', 'face', 'check');
  CREATE TABLE "pgm_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"tag" varchar DEFAULT 'SUMMER',
  	"heading" varchar DEFAULT 'PROGRAM NAME',
  	"subtitle" varchar DEFAULT 'BACHELOR & MASTER''S DEGREE STUDENTS',
  	"note" varchar DEFAULT 'Program only to USA.',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"eyebrow" varchar DEFAULT 'ABOUT THE PROGRAM',
  	"body" varchar DEFAULT 'A short, welcoming introduction to the program goes here.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_wi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"title" varchar DEFAULT 'WHAT IS
  THE PROGRAM?',
  	"highlighted_words" varchar,
  	"body" varchar DEFAULT 'Describe what the program is about here.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_pb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_py" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"eyebrow" varchar DEFAULT 'IMAGINE',
  	"body" varchar DEFAULT 'Picture yourself living this experience.',
  	"circle_heading" varchar,
  	"circle_body" varchar,
  	"photo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_wp_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar DEFAULT 'BENEFIT',
  	"description" varchar
  );
  
  CREATE TABLE "pgm_wp" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'WHY YOU
  SHOULD
  PARTICIPATE?',
  	"highlighted_words" varchar DEFAULT 'PARTICIPATE?',
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_jobs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar DEFAULT 'Job title'
  );
  
  CREATE TABLE "pgm_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'What you will
  be doing',
  	"highlighted_words" varchar DEFAULT 'be doing',
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_dst_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"area" varchar DEFAULT 'DESTINATION',
  	"country" varchar
  );
  
  CREATE TABLE "pgm_dst" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"lead_text" varchar,
  	"heading" varchar DEFAULT 'CHOOSE YOUR
  NEXT ADVENTURE',
  	"highlighted_words" varchar DEFAULT 'NEXT ADVENTURE',
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_req_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_block_req_icon" DEFAULT 'passport',
  	"title" varchar DEFAULT 'Requirement',
  	"description" varchar
  );
  
  CREATE TABLE "pgm_req" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Required',
  	"highlighted_words" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_bs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'Checklist item'
  );
  
  CREATE TABLE "pgm_bs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"title" varchar DEFAULT 'AN AMAZING
  EXPERIENCE',
  	"highlighted_words" varchar DEFAULT 'AMAZING EXPERIENCE',
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_wc_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_block_feat_icon" DEFAULT 'star',
  	"title" varchar DEFAULT 'Feature',
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pgm_wc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Why Choose
  Levntura?',
  	"highlighted_words" varchar DEFAULT 'Levntura?',
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_apply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"form_id" integer,
  	"heading" varchar DEFAULT 'Are You
  Ready to
  Change
  Your
  World?',
  	"highlighted_words" varchar DEFAULT 'Change',
  	"photo_top_left_id" integer,
  	"photo_top_right_id" integer,
  	"photo_bottom_left_id" integer,
  	"photo_bottom_right_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pgm_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Share this program',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_hero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"tag" varchar DEFAULT 'SUMMER',
  	"heading" varchar DEFAULT 'PROGRAM NAME',
  	"subtitle" varchar DEFAULT 'BACHELOR & MASTER''S DEGREE STUDENTS',
  	"note" varchar DEFAULT 'Program only to USA.',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_intro_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"eyebrow" varchar DEFAULT 'ABOUT THE PROGRAM',
  	"body" varchar DEFAULT 'A short, welcoming introduction to the program goes here.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_wi_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"title" varchar DEFAULT 'WHAT IS
  THE PROGRAM?',
  	"highlighted_words" varchar,
  	"body" varchar DEFAULT 'Describe what the program is about here.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_pb_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_py_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"eyebrow" varchar DEFAULT 'IMAGINE',
  	"body" varchar DEFAULT 'Picture yourself living this experience.',
  	"circle_heading" varchar,
  	"circle_body" varchar,
  	"photo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_wp_v_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar DEFAULT 'BENEFIT',
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_wp_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'WHY YOU
  SHOULD
  PARTICIPATE?',
  	"highlighted_words" varchar DEFAULT 'PARTICIPATE?',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_jobs_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar DEFAULT 'Job title',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_jobs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'What you will
  be doing',
  	"highlighted_words" varchar DEFAULT 'be doing',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_dst_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"area" varchar DEFAULT 'DESTINATION',
  	"country" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_dst_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"lead_text" varchar,
  	"heading" varchar DEFAULT 'CHOOSE YOUR
  NEXT ADVENTURE',
  	"highlighted_words" varchar DEFAULT 'NEXT ADVENTURE',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_req_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_block_req_icon" DEFAULT 'passport',
  	"title" varchar DEFAULT 'Requirement',
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_req_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Required',
  	"highlighted_words" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_bs_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'Checklist item',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_bs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"title" varchar DEFAULT 'AN AMAZING
  EXPERIENCE',
  	"highlighted_words" varchar DEFAULT 'AMAZING EXPERIENCE',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_wc_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_block_feat_icon" DEFAULT 'star',
  	"title" varchar DEFAULT 'Feature',
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pgm_wc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Why Choose
  Levntura?',
  	"highlighted_words" varchar DEFAULT 'Levntura?',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_apply_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"form_id" integer,
  	"heading" varchar DEFAULT 'Are You
  Ready to
  Change
  Your
  World?',
  	"highlighted_words" varchar DEFAULT 'Change',
  	"photo_top_left_id" integer,
  	"photo_top_right_id" integer,
  	"photo_bottom_left_id" integer,
  	"photo_bottom_right_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pgm_share_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"sync_key" varchar,
  	"heading" varchar DEFAULT 'Share this program',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_program_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Share this program',
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_program_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Share this program',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "programs_detail_why_participate_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_jobs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_destinations_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_benefits_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_memories_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_detail_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_why_participate_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_jobs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_destinations_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_benefits_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_memories_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programs_v_version_detail_features" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programs_detail_why_participate_benefits" CASCADE;
  DROP TABLE "programs_detail_jobs_items" CASCADE;
  DROP TABLE "programs_detail_destinations_items" CASCADE;
  DROP TABLE "programs_detail_benefits_showcase_items" CASCADE;
  DROP TABLE "programs_detail_requirements" CASCADE;
  DROP TABLE "programs_detail_memories_images" CASCADE;
  DROP TABLE "programs_detail_features" CASCADE;
  DROP TABLE "_programs_v_version_detail_why_participate_benefits" CASCADE;
  DROP TABLE "_programs_v_version_detail_jobs_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_destinations_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_benefits_showcase_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_requirements" CASCADE;
  DROP TABLE "_programs_v_version_detail_memories_images" CASCADE;
  DROP TABLE "_programs_v_version_detail_features" CASCADE;
  ALTER TABLE "programs" DROP CONSTRAINT "programs_detail_hero_image_id_media_id_fk";
  
  ALTER TABLE "programs" DROP CONSTRAINT "programs_detail_photo_middle_id_media_id_fk";
  
  ALTER TABLE "programs" DROP CONSTRAINT "programs_detail_picture_yourself_photo_id_media_id_fk";
  
  ALTER TABLE "_programs_v" DROP CONSTRAINT "_programs_v_version_detail_hero_image_id_media_id_fk";
  
  ALTER TABLE "_programs_v" DROP CONSTRAINT "_programs_v_version_detail_photo_middle_id_media_id_fk";
  
  ALTER TABLE "_programs_v" DROP CONSTRAINT "_programs_v_version_detail_picture_yourself_photo_id_media_id_fk";
  
  DROP INDEX "programs_detail_hero_detail_hero_image_idx";
  DROP INDEX "programs_detail_photo_middle_idx";
  DROP INDEX "programs_detail_picture_yourself_detail_picture_yourself_idx";
  DROP INDEX "_programs_v_version_detail_hero_version_detail_hero_imag_idx";
  DROP INDEX "_programs_v_version_version_detail_photo_middle_idx";
  DROP INDEX "_programs_v_version_detail_picture_yourself_version_deta_idx";
  ALTER TABLE "pages_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "tdsts" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "tdsts" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pages_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_tdsts_v" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_tdsts_v" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pages_v_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "program_types_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "program_types_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pl" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pl" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_program_types_v_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_program_types_v_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_pl_v" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pl_v" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "programs_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "programs_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_hero_home" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_hero_home" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_rich_text" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_gallery" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_gallery" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_faq" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_faq" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_image_feature" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_image_feature" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_media_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_media_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_partners_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_partners_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_feature_cards" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_feature_cards" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_alternating_content" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_alternating_content" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_blog_posts_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_blog_posts_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_video_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_video_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_social_feed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_social_feed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_program_showcase" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_program_showcase" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_founders_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_founders_carousel" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_mission_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_mission_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_values_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_values_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_text_testimonials" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_text_testimonials" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_map_embed" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_map_embed" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_contact_form" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_contact_form" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_address_list" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_address_list" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_related_items" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_related_items" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_memories_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_memories_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_education_stats" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_education_stats" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_venture_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_venture_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_photo_grid" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_photo_grid" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_gallery_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_gallery_hero" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_gallery_cta" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_gallery_cta" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "_programs_v_blocks_form_block" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_programs_v_blocks_form_block" ADD COLUMN "sync_key" varchar;
  ALTER TABLE "pgm_hero" ADD CONSTRAINT "pgm_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_hero" ADD CONSTRAINT "pgm_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_intro" ADD CONSTRAINT "pgm_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_wi" ADD CONSTRAINT "pgm_wi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_pb" ADD CONSTRAINT "pgm_pb_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_pb" ADD CONSTRAINT "pgm_pb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_py" ADD CONSTRAINT "pgm_py_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_py" ADD CONSTRAINT "pgm_py_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_wp_benefits" ADD CONSTRAINT "pgm_wp_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_wp_benefits" ADD CONSTRAINT "pgm_wp_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_wp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_wp" ADD CONSTRAINT "pgm_wp_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_jobs_items" ADD CONSTRAINT "pgm_jobs_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_jobs_items" ADD CONSTRAINT "pgm_jobs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_jobs" ADD CONSTRAINT "pgm_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_dst_items" ADD CONSTRAINT "pgm_dst_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_dst_items" ADD CONSTRAINT "pgm_dst_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_dst"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_dst" ADD CONSTRAINT "pgm_dst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_req_items" ADD CONSTRAINT "pgm_req_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_req"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_req" ADD CONSTRAINT "pgm_req_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_bs_items" ADD CONSTRAINT "pgm_bs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_bs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_bs" ADD CONSTRAINT "pgm_bs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_wc_features" ADD CONSTRAINT "pgm_wc_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_wc_features" ADD CONSTRAINT "pgm_wc_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pgm_wc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_wc" ADD CONSTRAINT "pgm_wc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_photo_top_left_id_media_id_fk" FOREIGN KEY ("photo_top_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_photo_top_right_id_media_id_fk" FOREIGN KEY ("photo_top_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_photo_bottom_left_id_media_id_fk" FOREIGN KEY ("photo_bottom_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_photo_bottom_right_id_media_id_fk" FOREIGN KEY ("photo_bottom_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pgm_apply" ADD CONSTRAINT "pgm_apply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pgm_share" ADD CONSTRAINT "pgm_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_hero_v" ADD CONSTRAINT "_pgm_hero_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_hero_v" ADD CONSTRAINT "_pgm_hero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_intro_v" ADD CONSTRAINT "_pgm_intro_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_wi_v" ADD CONSTRAINT "_pgm_wi_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_pb_v" ADD CONSTRAINT "_pgm_pb_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_pb_v" ADD CONSTRAINT "_pgm_pb_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_py_v" ADD CONSTRAINT "_pgm_py_v_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_py_v" ADD CONSTRAINT "_pgm_py_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_wp_v_benefits" ADD CONSTRAINT "_pgm_wp_v_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_wp_v_benefits" ADD CONSTRAINT "_pgm_wp_v_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_wp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_wp_v" ADD CONSTRAINT "_pgm_wp_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_jobs_v_items" ADD CONSTRAINT "_pgm_jobs_v_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_jobs_v_items" ADD CONSTRAINT "_pgm_jobs_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_jobs_v" ADD CONSTRAINT "_pgm_jobs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_dst_v_items" ADD CONSTRAINT "_pgm_dst_v_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_dst_v_items" ADD CONSTRAINT "_pgm_dst_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_dst_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_dst_v" ADD CONSTRAINT "_pgm_dst_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_req_v_items" ADD CONSTRAINT "_pgm_req_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_req_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_req_v" ADD CONSTRAINT "_pgm_req_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_bs_v_items" ADD CONSTRAINT "_pgm_bs_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_bs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_bs_v" ADD CONSTRAINT "_pgm_bs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_wc_v_features" ADD CONSTRAINT "_pgm_wc_v_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_wc_v_features" ADD CONSTRAINT "_pgm_wc_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pgm_wc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_wc_v" ADD CONSTRAINT "_pgm_wc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_photo_top_left_id_media_id_fk" FOREIGN KEY ("photo_top_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_photo_top_right_id_media_id_fk" FOREIGN KEY ("photo_top_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_photo_bottom_left_id_media_id_fk" FOREIGN KEY ("photo_bottom_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_photo_bottom_right_id_media_id_fk" FOREIGN KEY ("photo_bottom_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pgm_apply_v" ADD CONSTRAINT "_pgm_apply_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pgm_share_v" ADD CONSTRAINT "_pgm_share_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_program_share" ADD CONSTRAINT "blog_blocks_program_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_program_share" ADD CONSTRAINT "_blog_v_blocks_program_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pgm_hero_order_idx" ON "pgm_hero" USING btree ("_order");
  CREATE INDEX "pgm_hero_parent_id_idx" ON "pgm_hero" USING btree ("_parent_id");
  CREATE INDEX "pgm_hero_path_idx" ON "pgm_hero" USING btree ("_path");
  CREATE INDEX "pgm_hero_locale_idx" ON "pgm_hero" USING btree ("_locale");
  CREATE INDEX "pgm_hero_image_idx" ON "pgm_hero" USING btree ("image_id");
  CREATE INDEX "pgm_intro_order_idx" ON "pgm_intro" USING btree ("_order");
  CREATE INDEX "pgm_intro_parent_id_idx" ON "pgm_intro" USING btree ("_parent_id");
  CREATE INDEX "pgm_intro_path_idx" ON "pgm_intro" USING btree ("_path");
  CREATE INDEX "pgm_intro_locale_idx" ON "pgm_intro" USING btree ("_locale");
  CREATE INDEX "pgm_wi_order_idx" ON "pgm_wi" USING btree ("_order");
  CREATE INDEX "pgm_wi_parent_id_idx" ON "pgm_wi" USING btree ("_parent_id");
  CREATE INDEX "pgm_wi_path_idx" ON "pgm_wi" USING btree ("_path");
  CREATE INDEX "pgm_wi_locale_idx" ON "pgm_wi" USING btree ("_locale");
  CREATE INDEX "pgm_pb_order_idx" ON "pgm_pb" USING btree ("_order");
  CREATE INDEX "pgm_pb_parent_id_idx" ON "pgm_pb" USING btree ("_parent_id");
  CREATE INDEX "pgm_pb_path_idx" ON "pgm_pb" USING btree ("_path");
  CREATE INDEX "pgm_pb_locale_idx" ON "pgm_pb" USING btree ("_locale");
  CREATE INDEX "pgm_pb_image_idx" ON "pgm_pb" USING btree ("image_id");
  CREATE INDEX "pgm_py_order_idx" ON "pgm_py" USING btree ("_order");
  CREATE INDEX "pgm_py_parent_id_idx" ON "pgm_py" USING btree ("_parent_id");
  CREATE INDEX "pgm_py_path_idx" ON "pgm_py" USING btree ("_path");
  CREATE INDEX "pgm_py_locale_idx" ON "pgm_py" USING btree ("_locale");
  CREATE INDEX "pgm_py_photo_idx" ON "pgm_py" USING btree ("photo_id");
  CREATE INDEX "pgm_wp_benefits_order_idx" ON "pgm_wp_benefits" USING btree ("_order");
  CREATE INDEX "pgm_wp_benefits_parent_id_idx" ON "pgm_wp_benefits" USING btree ("_parent_id");
  CREATE INDEX "pgm_wp_benefits_locale_idx" ON "pgm_wp_benefits" USING btree ("_locale");
  CREATE INDEX "pgm_wp_benefits_image_idx" ON "pgm_wp_benefits" USING btree ("image_id");
  CREATE INDEX "pgm_wp_order_idx" ON "pgm_wp" USING btree ("_order");
  CREATE INDEX "pgm_wp_parent_id_idx" ON "pgm_wp" USING btree ("_parent_id");
  CREATE INDEX "pgm_wp_path_idx" ON "pgm_wp" USING btree ("_path");
  CREATE INDEX "pgm_wp_locale_idx" ON "pgm_wp" USING btree ("_locale");
  CREATE INDEX "pgm_jobs_items_order_idx" ON "pgm_jobs_items" USING btree ("_order");
  CREATE INDEX "pgm_jobs_items_parent_id_idx" ON "pgm_jobs_items" USING btree ("_parent_id");
  CREATE INDEX "pgm_jobs_items_locale_idx" ON "pgm_jobs_items" USING btree ("_locale");
  CREATE INDEX "pgm_jobs_items_image_idx" ON "pgm_jobs_items" USING btree ("image_id");
  CREATE INDEX "pgm_jobs_order_idx" ON "pgm_jobs" USING btree ("_order");
  CREATE INDEX "pgm_jobs_parent_id_idx" ON "pgm_jobs" USING btree ("_parent_id");
  CREATE INDEX "pgm_jobs_path_idx" ON "pgm_jobs" USING btree ("_path");
  CREATE INDEX "pgm_jobs_locale_idx" ON "pgm_jobs" USING btree ("_locale");
  CREATE INDEX "pgm_dst_items_order_idx" ON "pgm_dst_items" USING btree ("_order");
  CREATE INDEX "pgm_dst_items_parent_id_idx" ON "pgm_dst_items" USING btree ("_parent_id");
  CREATE INDEX "pgm_dst_items_locale_idx" ON "pgm_dst_items" USING btree ("_locale");
  CREATE INDEX "pgm_dst_items_image_idx" ON "pgm_dst_items" USING btree ("image_id");
  CREATE INDEX "pgm_dst_order_idx" ON "pgm_dst" USING btree ("_order");
  CREATE INDEX "pgm_dst_parent_id_idx" ON "pgm_dst" USING btree ("_parent_id");
  CREATE INDEX "pgm_dst_path_idx" ON "pgm_dst" USING btree ("_path");
  CREATE INDEX "pgm_dst_locale_idx" ON "pgm_dst" USING btree ("_locale");
  CREATE INDEX "pgm_req_items_order_idx" ON "pgm_req_items" USING btree ("_order");
  CREATE INDEX "pgm_req_items_parent_id_idx" ON "pgm_req_items" USING btree ("_parent_id");
  CREATE INDEX "pgm_req_items_locale_idx" ON "pgm_req_items" USING btree ("_locale");
  CREATE INDEX "pgm_req_order_idx" ON "pgm_req" USING btree ("_order");
  CREATE INDEX "pgm_req_parent_id_idx" ON "pgm_req" USING btree ("_parent_id");
  CREATE INDEX "pgm_req_path_idx" ON "pgm_req" USING btree ("_path");
  CREATE INDEX "pgm_req_locale_idx" ON "pgm_req" USING btree ("_locale");
  CREATE INDEX "pgm_bs_items_order_idx" ON "pgm_bs_items" USING btree ("_order");
  CREATE INDEX "pgm_bs_items_parent_id_idx" ON "pgm_bs_items" USING btree ("_parent_id");
  CREATE INDEX "pgm_bs_items_locale_idx" ON "pgm_bs_items" USING btree ("_locale");
  CREATE INDEX "pgm_bs_order_idx" ON "pgm_bs" USING btree ("_order");
  CREATE INDEX "pgm_bs_parent_id_idx" ON "pgm_bs" USING btree ("_parent_id");
  CREATE INDEX "pgm_bs_path_idx" ON "pgm_bs" USING btree ("_path");
  CREATE INDEX "pgm_bs_locale_idx" ON "pgm_bs" USING btree ("_locale");
  CREATE INDEX "pgm_wc_features_order_idx" ON "pgm_wc_features" USING btree ("_order");
  CREATE INDEX "pgm_wc_features_parent_id_idx" ON "pgm_wc_features" USING btree ("_parent_id");
  CREATE INDEX "pgm_wc_features_locale_idx" ON "pgm_wc_features" USING btree ("_locale");
  CREATE INDEX "pgm_wc_features_image_idx" ON "pgm_wc_features" USING btree ("image_id");
  CREATE INDEX "pgm_wc_order_idx" ON "pgm_wc" USING btree ("_order");
  CREATE INDEX "pgm_wc_parent_id_idx" ON "pgm_wc" USING btree ("_parent_id");
  CREATE INDEX "pgm_wc_path_idx" ON "pgm_wc" USING btree ("_path");
  CREATE INDEX "pgm_wc_locale_idx" ON "pgm_wc" USING btree ("_locale");
  CREATE INDEX "pgm_apply_order_idx" ON "pgm_apply" USING btree ("_order");
  CREATE INDEX "pgm_apply_parent_id_idx" ON "pgm_apply" USING btree ("_parent_id");
  CREATE INDEX "pgm_apply_path_idx" ON "pgm_apply" USING btree ("_path");
  CREATE INDEX "pgm_apply_locale_idx" ON "pgm_apply" USING btree ("_locale");
  CREATE INDEX "pgm_apply_form_idx" ON "pgm_apply" USING btree ("form_id");
  CREATE INDEX "pgm_apply_photo_top_left_idx" ON "pgm_apply" USING btree ("photo_top_left_id");
  CREATE INDEX "pgm_apply_photo_top_right_idx" ON "pgm_apply" USING btree ("photo_top_right_id");
  CREATE INDEX "pgm_apply_photo_bottom_left_idx" ON "pgm_apply" USING btree ("photo_bottom_left_id");
  CREATE INDEX "pgm_apply_photo_bottom_right_idx" ON "pgm_apply" USING btree ("photo_bottom_right_id");
  CREATE INDEX "pgm_share_order_idx" ON "pgm_share" USING btree ("_order");
  CREATE INDEX "pgm_share_parent_id_idx" ON "pgm_share" USING btree ("_parent_id");
  CREATE INDEX "pgm_share_path_idx" ON "pgm_share" USING btree ("_path");
  CREATE INDEX "pgm_share_locale_idx" ON "pgm_share" USING btree ("_locale");
  CREATE INDEX "_pgm_hero_v_order_idx" ON "_pgm_hero_v" USING btree ("_order");
  CREATE INDEX "_pgm_hero_v_parent_id_idx" ON "_pgm_hero_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_hero_v_path_idx" ON "_pgm_hero_v" USING btree ("_path");
  CREATE INDEX "_pgm_hero_v_locale_idx" ON "_pgm_hero_v" USING btree ("_locale");
  CREATE INDEX "_pgm_hero_v_image_idx" ON "_pgm_hero_v" USING btree ("image_id");
  CREATE INDEX "_pgm_intro_v_order_idx" ON "_pgm_intro_v" USING btree ("_order");
  CREATE INDEX "_pgm_intro_v_parent_id_idx" ON "_pgm_intro_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_intro_v_path_idx" ON "_pgm_intro_v" USING btree ("_path");
  CREATE INDEX "_pgm_intro_v_locale_idx" ON "_pgm_intro_v" USING btree ("_locale");
  CREATE INDEX "_pgm_wi_v_order_idx" ON "_pgm_wi_v" USING btree ("_order");
  CREATE INDEX "_pgm_wi_v_parent_id_idx" ON "_pgm_wi_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_wi_v_path_idx" ON "_pgm_wi_v" USING btree ("_path");
  CREATE INDEX "_pgm_wi_v_locale_idx" ON "_pgm_wi_v" USING btree ("_locale");
  CREATE INDEX "_pgm_pb_v_order_idx" ON "_pgm_pb_v" USING btree ("_order");
  CREATE INDEX "_pgm_pb_v_parent_id_idx" ON "_pgm_pb_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_pb_v_path_idx" ON "_pgm_pb_v" USING btree ("_path");
  CREATE INDEX "_pgm_pb_v_locale_idx" ON "_pgm_pb_v" USING btree ("_locale");
  CREATE INDEX "_pgm_pb_v_image_idx" ON "_pgm_pb_v" USING btree ("image_id");
  CREATE INDEX "_pgm_py_v_order_idx" ON "_pgm_py_v" USING btree ("_order");
  CREATE INDEX "_pgm_py_v_parent_id_idx" ON "_pgm_py_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_py_v_path_idx" ON "_pgm_py_v" USING btree ("_path");
  CREATE INDEX "_pgm_py_v_locale_idx" ON "_pgm_py_v" USING btree ("_locale");
  CREATE INDEX "_pgm_py_v_photo_idx" ON "_pgm_py_v" USING btree ("photo_id");
  CREATE INDEX "_pgm_wp_v_benefits_order_idx" ON "_pgm_wp_v_benefits" USING btree ("_order");
  CREATE INDEX "_pgm_wp_v_benefits_parent_id_idx" ON "_pgm_wp_v_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pgm_wp_v_benefits_locale_idx" ON "_pgm_wp_v_benefits" USING btree ("_locale");
  CREATE INDEX "_pgm_wp_v_benefits_image_idx" ON "_pgm_wp_v_benefits" USING btree ("image_id");
  CREATE INDEX "_pgm_wp_v_order_idx" ON "_pgm_wp_v" USING btree ("_order");
  CREATE INDEX "_pgm_wp_v_parent_id_idx" ON "_pgm_wp_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_wp_v_path_idx" ON "_pgm_wp_v" USING btree ("_path");
  CREATE INDEX "_pgm_wp_v_locale_idx" ON "_pgm_wp_v" USING btree ("_locale");
  CREATE INDEX "_pgm_jobs_v_items_order_idx" ON "_pgm_jobs_v_items" USING btree ("_order");
  CREATE INDEX "_pgm_jobs_v_items_parent_id_idx" ON "_pgm_jobs_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pgm_jobs_v_items_locale_idx" ON "_pgm_jobs_v_items" USING btree ("_locale");
  CREATE INDEX "_pgm_jobs_v_items_image_idx" ON "_pgm_jobs_v_items" USING btree ("image_id");
  CREATE INDEX "_pgm_jobs_v_order_idx" ON "_pgm_jobs_v" USING btree ("_order");
  CREATE INDEX "_pgm_jobs_v_parent_id_idx" ON "_pgm_jobs_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_jobs_v_path_idx" ON "_pgm_jobs_v" USING btree ("_path");
  CREATE INDEX "_pgm_jobs_v_locale_idx" ON "_pgm_jobs_v" USING btree ("_locale");
  CREATE INDEX "_pgm_dst_v_items_order_idx" ON "_pgm_dst_v_items" USING btree ("_order");
  CREATE INDEX "_pgm_dst_v_items_parent_id_idx" ON "_pgm_dst_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pgm_dst_v_items_locale_idx" ON "_pgm_dst_v_items" USING btree ("_locale");
  CREATE INDEX "_pgm_dst_v_items_image_idx" ON "_pgm_dst_v_items" USING btree ("image_id");
  CREATE INDEX "_pgm_dst_v_order_idx" ON "_pgm_dst_v" USING btree ("_order");
  CREATE INDEX "_pgm_dst_v_parent_id_idx" ON "_pgm_dst_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_dst_v_path_idx" ON "_pgm_dst_v" USING btree ("_path");
  CREATE INDEX "_pgm_dst_v_locale_idx" ON "_pgm_dst_v" USING btree ("_locale");
  CREATE INDEX "_pgm_req_v_items_order_idx" ON "_pgm_req_v_items" USING btree ("_order");
  CREATE INDEX "_pgm_req_v_items_parent_id_idx" ON "_pgm_req_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pgm_req_v_items_locale_idx" ON "_pgm_req_v_items" USING btree ("_locale");
  CREATE INDEX "_pgm_req_v_order_idx" ON "_pgm_req_v" USING btree ("_order");
  CREATE INDEX "_pgm_req_v_parent_id_idx" ON "_pgm_req_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_req_v_path_idx" ON "_pgm_req_v" USING btree ("_path");
  CREATE INDEX "_pgm_req_v_locale_idx" ON "_pgm_req_v" USING btree ("_locale");
  CREATE INDEX "_pgm_bs_v_items_order_idx" ON "_pgm_bs_v_items" USING btree ("_order");
  CREATE INDEX "_pgm_bs_v_items_parent_id_idx" ON "_pgm_bs_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pgm_bs_v_items_locale_idx" ON "_pgm_bs_v_items" USING btree ("_locale");
  CREATE INDEX "_pgm_bs_v_order_idx" ON "_pgm_bs_v" USING btree ("_order");
  CREATE INDEX "_pgm_bs_v_parent_id_idx" ON "_pgm_bs_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_bs_v_path_idx" ON "_pgm_bs_v" USING btree ("_path");
  CREATE INDEX "_pgm_bs_v_locale_idx" ON "_pgm_bs_v" USING btree ("_locale");
  CREATE INDEX "_pgm_wc_v_features_order_idx" ON "_pgm_wc_v_features" USING btree ("_order");
  CREATE INDEX "_pgm_wc_v_features_parent_id_idx" ON "_pgm_wc_v_features" USING btree ("_parent_id");
  CREATE INDEX "_pgm_wc_v_features_locale_idx" ON "_pgm_wc_v_features" USING btree ("_locale");
  CREATE INDEX "_pgm_wc_v_features_image_idx" ON "_pgm_wc_v_features" USING btree ("image_id");
  CREATE INDEX "_pgm_wc_v_order_idx" ON "_pgm_wc_v" USING btree ("_order");
  CREATE INDEX "_pgm_wc_v_parent_id_idx" ON "_pgm_wc_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_wc_v_path_idx" ON "_pgm_wc_v" USING btree ("_path");
  CREATE INDEX "_pgm_wc_v_locale_idx" ON "_pgm_wc_v" USING btree ("_locale");
  CREATE INDEX "_pgm_apply_v_order_idx" ON "_pgm_apply_v" USING btree ("_order");
  CREATE INDEX "_pgm_apply_v_parent_id_idx" ON "_pgm_apply_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_apply_v_path_idx" ON "_pgm_apply_v" USING btree ("_path");
  CREATE INDEX "_pgm_apply_v_locale_idx" ON "_pgm_apply_v" USING btree ("_locale");
  CREATE INDEX "_pgm_apply_v_form_idx" ON "_pgm_apply_v" USING btree ("form_id");
  CREATE INDEX "_pgm_apply_v_photo_top_left_idx" ON "_pgm_apply_v" USING btree ("photo_top_left_id");
  CREATE INDEX "_pgm_apply_v_photo_top_right_idx" ON "_pgm_apply_v" USING btree ("photo_top_right_id");
  CREATE INDEX "_pgm_apply_v_photo_bottom_left_idx" ON "_pgm_apply_v" USING btree ("photo_bottom_left_id");
  CREATE INDEX "_pgm_apply_v_photo_bottom_right_idx" ON "_pgm_apply_v" USING btree ("photo_bottom_right_id");
  CREATE INDEX "_pgm_share_v_order_idx" ON "_pgm_share_v" USING btree ("_order");
  CREATE INDEX "_pgm_share_v_parent_id_idx" ON "_pgm_share_v" USING btree ("_parent_id");
  CREATE INDEX "_pgm_share_v_path_idx" ON "_pgm_share_v" USING btree ("_path");
  CREATE INDEX "_pgm_share_v_locale_idx" ON "_pgm_share_v" USING btree ("_locale");
  CREATE INDEX "blog_blocks_program_share_order_idx" ON "blog_blocks_program_share" USING btree ("_order");
  CREATE INDEX "blog_blocks_program_share_parent_id_idx" ON "blog_blocks_program_share" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_program_share_path_idx" ON "blog_blocks_program_share" USING btree ("_path");
  CREATE INDEX "blog_blocks_program_share_locale_idx" ON "blog_blocks_program_share" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_program_share_order_idx" ON "_blog_v_blocks_program_share" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_program_share_parent_id_idx" ON "_blog_v_blocks_program_share" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_program_share_path_idx" ON "_blog_v_blocks_program_share" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_program_share_locale_idx" ON "_blog_v_blocks_program_share" USING btree ("_locale");
  ALTER TABLE "programs" DROP COLUMN "detail_hero_image_id";
  ALTER TABLE "programs" DROP COLUMN "detail_photo_middle_id";
  ALTER TABLE "programs" DROP COLUMN "detail_picture_yourself_photo_id";
  ALTER TABLE "programs" DROP COLUMN "detail_memories_primary_cta_url";
  ALTER TABLE "programs" DROP COLUMN "detail_memories_secondary_link_url";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_hero_tag";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_hero_subtitle";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_hero_note";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_intro_eyebrow";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_intro_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_what_is_title";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_what_is_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_picture_yourself_eyebrow";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_picture_yourself_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_picture_yourself_circle_heading";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_picture_yourself_circle_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_why_participate_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_jobs_body";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_destinations_lead_text";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_benefits_showcase_title";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_memories_title";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_memories_primary_cta_label";
  ALTER TABLE "programs_locales" DROP COLUMN "detail_memories_secondary_link_label";
  ALTER TABLE "_programs_v" DROP COLUMN "version_detail_hero_image_id";
  ALTER TABLE "_programs_v" DROP COLUMN "version_detail_photo_middle_id";
  ALTER TABLE "_programs_v" DROP COLUMN "version_detail_picture_yourself_photo_id";
  ALTER TABLE "_programs_v" DROP COLUMN "version_detail_memories_primary_cta_url";
  ALTER TABLE "_programs_v" DROP COLUMN "version_detail_memories_secondary_link_url";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_hero_tag";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_hero_subtitle";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_hero_note";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_intro_eyebrow";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_intro_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_what_is_title";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_what_is_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_picture_yourself_eyebrow";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_picture_yourself_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_picture_yourself_circle_heading";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_picture_yourself_circle_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_why_participate_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_jobs_body";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_destinations_lead_text";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_benefits_showcase_title";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_memories_title";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_memories_primary_cta_label";
  ALTER TABLE "_programs_v_locales" DROP COLUMN "version_detail_memories_secondary_link_label";
  DROP TYPE "public"."enum_prog_req_icon";
  DROP TYPE "public"."enum_prog_feat_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prog_req_icon" AS ENUM('passport', 'college', 'language', 'age', 'diploma');
  CREATE TYPE "public"."enum_prog_feat_icon" AS ENUM('star', 'bag', 'hand', 'people', 'face', 'check');
  CREATE TABLE "programs_detail_why_participate_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programs_detail_jobs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE "programs_detail_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"area" varchar,
  	"country" varchar
  );
  
  CREATE TABLE "programs_detail_benefits_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programs_detail_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_req_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programs_detail_memories_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "programs_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_feat_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_why_participate_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_jobs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"area" varchar,
  	"country" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_benefits_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_req_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_memories_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_detail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum_prog_feat_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pgm_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_wi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_pb" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_py" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_wp_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_wp" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_jobs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_dst_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_dst" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_req_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_req" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_bs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_bs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_wc_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_wc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_apply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pgm_share" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_hero_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_intro_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_wi_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_pb_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_py_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_wp_v_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_wp_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_jobs_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_jobs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_dst_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_dst_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_req_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_req_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_bs_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_bs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_wc_v_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_wc_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_apply_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pgm_share_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_blocks_program_share" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_blocks_program_share" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pgm_hero" CASCADE;
  DROP TABLE "pgm_intro" CASCADE;
  DROP TABLE "pgm_wi" CASCADE;
  DROP TABLE "pgm_pb" CASCADE;
  DROP TABLE "pgm_py" CASCADE;
  DROP TABLE "pgm_wp_benefits" CASCADE;
  DROP TABLE "pgm_wp" CASCADE;
  DROP TABLE "pgm_jobs_items" CASCADE;
  DROP TABLE "pgm_jobs" CASCADE;
  DROP TABLE "pgm_dst_items" CASCADE;
  DROP TABLE "pgm_dst" CASCADE;
  DROP TABLE "pgm_req_items" CASCADE;
  DROP TABLE "pgm_req" CASCADE;
  DROP TABLE "pgm_bs_items" CASCADE;
  DROP TABLE "pgm_bs" CASCADE;
  DROP TABLE "pgm_wc_features" CASCADE;
  DROP TABLE "pgm_wc" CASCADE;
  DROP TABLE "pgm_apply" CASCADE;
  DROP TABLE "pgm_share" CASCADE;
  DROP TABLE "_pgm_hero_v" CASCADE;
  DROP TABLE "_pgm_intro_v" CASCADE;
  DROP TABLE "_pgm_wi_v" CASCADE;
  DROP TABLE "_pgm_pb_v" CASCADE;
  DROP TABLE "_pgm_py_v" CASCADE;
  DROP TABLE "_pgm_wp_v_benefits" CASCADE;
  DROP TABLE "_pgm_wp_v" CASCADE;
  DROP TABLE "_pgm_jobs_v_items" CASCADE;
  DROP TABLE "_pgm_jobs_v" CASCADE;
  DROP TABLE "_pgm_dst_v_items" CASCADE;
  DROP TABLE "_pgm_dst_v" CASCADE;
  DROP TABLE "_pgm_req_v_items" CASCADE;
  DROP TABLE "_pgm_req_v" CASCADE;
  DROP TABLE "_pgm_bs_v_items" CASCADE;
  DROP TABLE "_pgm_bs_v" CASCADE;
  DROP TABLE "_pgm_wc_v_features" CASCADE;
  DROP TABLE "_pgm_wc_v" CASCADE;
  DROP TABLE "_pgm_apply_v" CASCADE;
  DROP TABLE "_pgm_share_v" CASCADE;
  DROP TABLE "blog_blocks_program_share" CASCADE;
  DROP TABLE "_blog_v_blocks_program_share" CASCADE;
  ALTER TABLE "programs" ADD COLUMN "detail_hero_image_id" integer;
  ALTER TABLE "programs" ADD COLUMN "detail_photo_middle_id" integer;
  ALTER TABLE "programs" ADD COLUMN "detail_picture_yourself_photo_id" integer;
  ALTER TABLE "programs" ADD COLUMN "detail_memories_primary_cta_url" varchar;
  ALTER TABLE "programs" ADD COLUMN "detail_memories_secondary_link_url" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_hero_tag" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_hero_subtitle" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_hero_note" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_intro_eyebrow" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_intro_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_what_is_title" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_what_is_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_picture_yourself_eyebrow" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_picture_yourself_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_picture_yourself_circle_heading" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_picture_yourself_circle_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_why_participate_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_jobs_body" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_destinations_lead_text" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_benefits_showcase_title" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_memories_title" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_memories_primary_cta_label" varchar;
  ALTER TABLE "programs_locales" ADD COLUMN "detail_memories_secondary_link_label" varchar;
  ALTER TABLE "_programs_v" ADD COLUMN "version_detail_hero_image_id" integer;
  ALTER TABLE "_programs_v" ADD COLUMN "version_detail_photo_middle_id" integer;
  ALTER TABLE "_programs_v" ADD COLUMN "version_detail_picture_yourself_photo_id" integer;
  ALTER TABLE "_programs_v" ADD COLUMN "version_detail_memories_primary_cta_url" varchar;
  ALTER TABLE "_programs_v" ADD COLUMN "version_detail_memories_secondary_link_url" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_hero_tag" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_hero_subtitle" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_hero_note" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_intro_eyebrow" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_intro_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_what_is_title" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_what_is_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_picture_yourself_eyebrow" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_picture_yourself_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_picture_yourself_circle_heading" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_picture_yourself_circle_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_why_participate_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_jobs_body" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_destinations_lead_text" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_benefits_showcase_title" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_memories_title" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_memories_primary_cta_label" varchar;
  ALTER TABLE "_programs_v_locales" ADD COLUMN "version_detail_memories_secondary_link_label" varchar;
  ALTER TABLE "programs_detail_why_participate_benefits" ADD CONSTRAINT "programs_detail_why_participate_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_detail_why_participate_benefits" ADD CONSTRAINT "programs_detail_why_participate_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_jobs_items" ADD CONSTRAINT "programs_detail_jobs_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_detail_jobs_items" ADD CONSTRAINT "programs_detail_jobs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_destinations_items" ADD CONSTRAINT "programs_detail_destinations_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_detail_destinations_items" ADD CONSTRAINT "programs_detail_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_benefits_showcase_items" ADD CONSTRAINT "programs_detail_benefits_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_requirements" ADD CONSTRAINT "programs_detail_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_memories_images" ADD CONSTRAINT "programs_detail_memories_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_detail_memories_images" ADD CONSTRAINT "programs_detail_memories_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_detail_features" ADD CONSTRAINT "programs_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_why_participate_benefits" ADD CONSTRAINT "_programs_v_version_detail_why_participate_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_why_participate_benefits" ADD CONSTRAINT "_programs_v_version_detail_why_participate_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_jobs_items" ADD CONSTRAINT "_programs_v_version_detail_jobs_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_jobs_items" ADD CONSTRAINT "_programs_v_version_detail_jobs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_destinations_items" ADD CONSTRAINT "_programs_v_version_detail_destinations_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_destinations_items" ADD CONSTRAINT "_programs_v_version_detail_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_benefits_showcase_items" ADD CONSTRAINT "_programs_v_version_detail_benefits_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_requirements" ADD CONSTRAINT "_programs_v_version_detail_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_memories_images" ADD CONSTRAINT "_programs_v_version_detail_memories_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_memories_images" ADD CONSTRAINT "_programs_v_version_detail_memories_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_detail_features" ADD CONSTRAINT "_programs_v_version_detail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "programs_detail_why_participate_benefits_order_idx" ON "programs_detail_why_participate_benefits" USING btree ("_order");
  CREATE INDEX "programs_detail_why_participate_benefits_parent_id_idx" ON "programs_detail_why_participate_benefits" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_why_participate_benefits_locale_idx" ON "programs_detail_why_participate_benefits" USING btree ("_locale");
  CREATE INDEX "programs_detail_why_participate_benefits_image_idx" ON "programs_detail_why_participate_benefits" USING btree ("image_id");
  CREATE INDEX "programs_detail_jobs_items_order_idx" ON "programs_detail_jobs_items" USING btree ("_order");
  CREATE INDEX "programs_detail_jobs_items_parent_id_idx" ON "programs_detail_jobs_items" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_jobs_items_locale_idx" ON "programs_detail_jobs_items" USING btree ("_locale");
  CREATE INDEX "programs_detail_jobs_items_image_idx" ON "programs_detail_jobs_items" USING btree ("image_id");
  CREATE INDEX "programs_detail_destinations_items_order_idx" ON "programs_detail_destinations_items" USING btree ("_order");
  CREATE INDEX "programs_detail_destinations_items_parent_id_idx" ON "programs_detail_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_destinations_items_locale_idx" ON "programs_detail_destinations_items" USING btree ("_locale");
  CREATE INDEX "programs_detail_destinations_items_image_idx" ON "programs_detail_destinations_items" USING btree ("image_id");
  CREATE INDEX "programs_detail_benefits_showcase_items_order_idx" ON "programs_detail_benefits_showcase_items" USING btree ("_order");
  CREATE INDEX "programs_detail_benefits_showcase_items_parent_id_idx" ON "programs_detail_benefits_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_benefits_showcase_items_locale_idx" ON "programs_detail_benefits_showcase_items" USING btree ("_locale");
  CREATE INDEX "programs_detail_requirements_order_idx" ON "programs_detail_requirements" USING btree ("_order");
  CREATE INDEX "programs_detail_requirements_parent_id_idx" ON "programs_detail_requirements" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_requirements_locale_idx" ON "programs_detail_requirements" USING btree ("_locale");
  CREATE INDEX "programs_detail_memories_images_order_idx" ON "programs_detail_memories_images" USING btree ("_order");
  CREATE INDEX "programs_detail_memories_images_parent_id_idx" ON "programs_detail_memories_images" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_memories_images_locale_idx" ON "programs_detail_memories_images" USING btree ("_locale");
  CREATE INDEX "programs_detail_memories_images_image_idx" ON "programs_detail_memories_images" USING btree ("image_id");
  CREATE INDEX "programs_detail_features_order_idx" ON "programs_detail_features" USING btree ("_order");
  CREATE INDEX "programs_detail_features_parent_id_idx" ON "programs_detail_features" USING btree ("_parent_id");
  CREATE INDEX "programs_detail_features_locale_idx" ON "programs_detail_features" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_why_participate_benefits_order_idx" ON "_programs_v_version_detail_why_participate_benefits" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_why_participate_benefits_parent_id_idx" ON "_programs_v_version_detail_why_participate_benefits" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_why_participate_benefits_locale_idx" ON "_programs_v_version_detail_why_participate_benefits" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_why_participate_benefits_imag_idx" ON "_programs_v_version_detail_why_participate_benefits" USING btree ("image_id");
  CREATE INDEX "_programs_v_version_detail_jobs_items_order_idx" ON "_programs_v_version_detail_jobs_items" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_jobs_items_parent_id_idx" ON "_programs_v_version_detail_jobs_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_jobs_items_locale_idx" ON "_programs_v_version_detail_jobs_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_jobs_items_image_idx" ON "_programs_v_version_detail_jobs_items" USING btree ("image_id");
  CREATE INDEX "_programs_v_version_detail_destinations_items_order_idx" ON "_programs_v_version_detail_destinations_items" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_destinations_items_parent_id_idx" ON "_programs_v_version_detail_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_destinations_items_locale_idx" ON "_programs_v_version_detail_destinations_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_destinations_items_image_idx" ON "_programs_v_version_detail_destinations_items" USING btree ("image_id");
  CREATE INDEX "_programs_v_version_detail_benefits_showcase_items_order_idx" ON "_programs_v_version_detail_benefits_showcase_items" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_benefits_showcase_items_parent_id_idx" ON "_programs_v_version_detail_benefits_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_benefits_showcase_items_locale_idx" ON "_programs_v_version_detail_benefits_showcase_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_requirements_order_idx" ON "_programs_v_version_detail_requirements" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_requirements_parent_id_idx" ON "_programs_v_version_detail_requirements" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_requirements_locale_idx" ON "_programs_v_version_detail_requirements" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_memories_images_order_idx" ON "_programs_v_version_detail_memories_images" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_memories_images_parent_id_idx" ON "_programs_v_version_detail_memories_images" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_memories_images_locale_idx" ON "_programs_v_version_detail_memories_images" USING btree ("_locale");
  CREATE INDEX "_programs_v_version_detail_memories_images_image_idx" ON "_programs_v_version_detail_memories_images" USING btree ("image_id");
  CREATE INDEX "_programs_v_version_detail_features_order_idx" ON "_programs_v_version_detail_features" USING btree ("_order");
  CREATE INDEX "_programs_v_version_detail_features_parent_id_idx" ON "_programs_v_version_detail_features" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_detail_features_locale_idx" ON "_programs_v_version_detail_features" USING btree ("_locale");
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_hero_image_id_media_id_fk" FOREIGN KEY ("detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_photo_middle_id_media_id_fk" FOREIGN KEY ("detail_photo_middle_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_picture_yourself_photo_id_media_id_fk" FOREIGN KEY ("detail_picture_yourself_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_hero_image_id_media_id_fk" FOREIGN KEY ("version_detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_photo_middle_id_media_id_fk" FOREIGN KEY ("version_detail_photo_middle_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_picture_yourself_photo_id_media_id_fk" FOREIGN KEY ("version_detail_picture_yourself_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "programs_detail_hero_detail_hero_image_idx" ON "programs" USING btree ("detail_hero_image_id");
  CREATE INDEX "programs_detail_photo_middle_idx" ON "programs" USING btree ("detail_photo_middle_id");
  CREATE INDEX "programs_detail_picture_yourself_detail_picture_yourself_idx" ON "programs" USING btree ("detail_picture_yourself_photo_id");
  CREATE INDEX "_programs_v_version_detail_hero_version_detail_hero_imag_idx" ON "_programs_v" USING btree ("version_detail_hero_image_id");
  CREATE INDEX "_programs_v_version_version_detail_photo_middle_idx" ON "_programs_v" USING btree ("version_detail_photo_middle_id");
  CREATE INDEX "_programs_v_version_detail_picture_yourself_version_deta_idx" ON "_programs_v" USING btree ("version_detail_picture_yourself_photo_id");
  ALTER TABLE "pages_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "tdsts" DROP COLUMN "hidden";
  ALTER TABLE "tdsts" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "pages_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "_tdsts_v" DROP COLUMN "hidden";
  ALTER TABLE "_tdsts_v" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_pages_v_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "program_types_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "program_types_blocks_form_block" DROP COLUMN "sync_key";
  ALTER TABLE "pl" DROP COLUMN "hidden";
  ALTER TABLE "pl" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_program_types_v_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "_program_types_v_blocks_form_block" DROP COLUMN "sync_key";
  ALTER TABLE "_pl_v" DROP COLUMN "hidden";
  ALTER TABLE "_pl_v" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "programs_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "programs_blocks_form_block" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_hero_home" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_hero_home" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_rich_text" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_content" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_content" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_gallery" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_gallery" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_faq" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_faq" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_cta" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_image_feature" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_image_feature" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_media_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_media_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_partners_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_partners_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_feature_cards" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_feature_cards" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_alternating_content" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_alternating_content" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_blog_posts_list" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_blog_posts_list" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_video_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_video_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_social_feed" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_social_feed" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_program_showcase" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_program_showcase" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_founders_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_founders_carousel" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_mission_stats" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_mission_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_values_list" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_values_list" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_text_testimonials" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_text_testimonials" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_map_embed" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_map_embed" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_contact_form" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_contact_form" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_address_list" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_address_list" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_related_items" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_related_items" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_memories_grid" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_memories_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_education_stats" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_education_stats" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_venture_grid" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_venture_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_photo_grid" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_photo_grid" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_gallery_hero" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_gallery_hero" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_gallery_cta" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_gallery_cta" DROP COLUMN "sync_key";
  ALTER TABLE "_programs_v_blocks_form_block" DROP COLUMN "hidden";
  ALTER TABLE "_programs_v_blocks_form_block" DROP COLUMN "sync_key";
  DROP TYPE "public"."enum_prog_block_req_icon";
  DROP TYPE "public"."enum_prog_block_feat_icon";`)
}
