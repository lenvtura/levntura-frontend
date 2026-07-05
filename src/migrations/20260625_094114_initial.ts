import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'seo', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum_pages_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum_hero_action_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_hero_variant" AS ENUM('centered', 'splitRight', 'splitLeft', 'fullBackground');
  CREATE TYPE "public"."enum_hero_highlight" AS ENUM('lev-orange', 'lev-red', 'lev-green', 'lev-green-light', 'lev-blue', 'lev-blue-light', 'lev-yellow');
  CREATE TYPE "public"."enum_hero_bg_color" AS ENUM('none', 'lev-yellow', 'lev-yellow-light', 'lev-blue', 'lev-blue-light', 'lev-blue-dark', 'lev-green', 'lev-green-light', 'lev-green-dark', 'lev-red', 'lev-red-dark', 'lev-orange', 'lev-pink', 'lev-black', 'white');
  CREATE TYPE "public"."enum_hero_text_color" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum_pages_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum_pages_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum_pages_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_partners_highlight" AS ENUM('none', 'lev-orange', 'lev-red', 'lev-red-dark', 'lev-blue', 'lev-blue-dark', 'lev-green', 'lev-green-dark', 'lev-yellow');
  CREATE TYPE "public"."enum_partners_heading" AS ENUM('lev-blue-dark', 'lev-red-dark', 'lev-green-dark', 'lev-black', 'white');
  CREATE TYPE "public"."enum_partners_bg" AS ENUM('none', 'white', 'lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink');
  CREATE TYPE "public"."enum_fc_card_panel_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-blue-dark', 'lev-orange', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-green-dark', 'lev-red', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_fc_card_text_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-blue-dark', 'lev-orange', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-green-dark', 'lev-red', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_fc_bg_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-blue-dark', 'lev-orange', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-green-dark', 'lev-red', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_alt_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_pages_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum_pages_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum_pages_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_ms_bg_color" AS ENUM('lev-orange', 'lev-red', 'lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-black');
  CREATE TYPE "public"."enum_ms_value_color" AS ENUM('lev-yellow', 'lev-orange', 'lev-green-light', 'lev-blue-light', 'white');
  CREATE TYPE "public"."enum_vl_bg_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-pink', 'lev-blue-light', 'lev-green-light', 'white');
  CREATE TYPE "public"."enum_map_bg_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-pink', 'lev-blue-light', 'lev-green-light', 'white');
  CREATE TYPE "public"."enum_cf_bg_color" AS ENUM('lev-blue-dark', 'lev-black', 'lev-green-dark', 'lev-red-dark');
  CREATE TYPE "public"."enum_al_bg_color" AS ENUM('gray-light', 'lev-yellow-light', 'lev-blue-light', 'white');
  CREATE TYPE "public"."enum_higrid_highlight" AS ENUM('lev-green-light', 'lev-yellow', 'lev-orange', 'lev-red', 'lev-blue-light');
  CREATE TYPE "public"."enum_higrid_bg_color" AS ENUM('lev-green-dark', 'lev-blue-dark', 'lev-black', 'lev-red-dark', 'lev-orange');
  CREATE TYPE "public"."enum_memories_grid_bg" AS ENUM('none', 'lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_edu_stats_bg" AS ENUM('none', 'white', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink');
  CREATE TYPE "public"."enum_edu_stats_heading" AS ENUM('lev-red-dark', 'lev-blue-dark', 'lev-green-dark', 'lev-black');
  CREATE TYPE "public"."enum_edu_stats_value" AS ENUM('lev-orange', 'lev-red', 'lev-blue', 'lev-green', 'lev-yellow');
  CREATE TYPE "public"."enum_venture_bg" AS ENUM('none', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_venture_heading" AS ENUM('lev-blue-dark', 'lev-red-dark', 'lev-green-dark', 'lev-black');
  CREATE TYPE "public"."enum_photo_grid_bg" AS ENUM('white', 'none', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink');
  CREATE TYPE "public"."enum_gallery_hero_bg" AS ENUM('none', 'white', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink');
  CREATE TYPE "public"."enum_gallery_cta_highlight" AS ENUM('none', 'lev-red', 'lev-red-dark', 'lev-orange', 'lev-blue', 'lev-green', 'lev-yellow');
  CREATE TYPE "public"."enum_gallery_cta_heading" AS ENUM('lev-red-dark', 'lev-blue-dark', 'lev-green-dark', 'lev-black');
  CREATE TYPE "public"."enum_ri_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_ri_bg_color" AS ENUM('lev-green-dark', 'lev-blue-dark', 'lev-black', 'lev-yellow-light', 'white');
  CREATE TYPE "public"."enum_pages_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum__pages_v_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum__pages_v_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum__pages_v_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__pages_v_version_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('page', 'external', 'path');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_program_types_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum_program_types_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum_program_types_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum_program_types_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_program_types_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_program_types_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_program_types_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum_program_types_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum_program_types_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum_program_types_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_program_types_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_program_types_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_program_types_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum_program_types_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum_program_types_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_pl_filters_by_country" AS ENUM('US', 'UK', 'CA', 'DE', 'FR', 'ES', 'IT', 'AU', 'IE', 'ZA', 'EG', 'JO', 'SA', 'AE', 'multi');
  CREATE TYPE "public"."enum_pl_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pl_filters_sort_by" AS ENUM('newest', 'oldest', 'titleAZ');
  CREATE TYPE "public"."enum_pl_layout_cards_per_row" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pl_layout_card_style" AS ENUM('default', 'compact', 'featured');
  CREATE TYPE "public"."enum_program_types_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum_program_types_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__program_types_v_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum__program_types_v_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum__program_types_v_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum__program_types_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__program_types_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__program_types_v_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__program_types_v_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum__program_types_v_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum__program_types_v_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum__program_types_v_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__program_types_v_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__program_types_v_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__program_types_v_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum__program_types_v_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum__program_types_v_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__pl_v_filters_by_country" AS ENUM('US', 'UK', 'CA', 'DE', 'FR', 'ES', 'IT', 'AU', 'IE', 'ZA', 'EG', 'JO', 'SA', 'AE', 'multi');
  CREATE TYPE "public"."enum__pl_v_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pl_v_filters_sort_by" AS ENUM('newest', 'oldest', 'titleAZ');
  CREATE TYPE "public"."enum__pl_v_layout_cards_per_row" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pl_v_layout_card_style" AS ENUM('default', 'compact', 'featured');
  CREATE TYPE "public"."enum__program_types_v_version_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum__program_types_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__program_types_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_prog_req_icon" AS ENUM('passport', 'college', 'language', 'age', 'diploma');
  CREATE TYPE "public"."enum_prog_feat_icon" AS ENUM('star', 'bag', 'hand', 'people', 'face', 'check');
  CREATE TYPE "public"."enum_programs_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum_programs_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum_programs_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum_programs_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_programs_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_programs_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_programs_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum_programs_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum_programs_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum_programs_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_programs_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_programs_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_programs_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum_programs_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum_programs_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum_programs_country" AS ENUM('US', 'UK', 'CA', 'DE', 'FR', 'ES', 'IT', 'AU', 'IE', 'ZA', 'EG', 'JO', 'SA', 'AE', 'multi');
  CREATE TYPE "public"."enum_programs_course_educational_level" AS ENUM('Beginner', 'Intermediate', 'Advanced');
  CREATE TYPE "public"."enum_programs_course_course_mode" AS ENUM('online', 'onsite', 'blended');
  CREATE TYPE "public"."enum_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programs_v_blocks_hero_home_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum__programs_v_blocks_hero_home_background_color" AS ENUM('lev-blue', 'lev-blue-dark', 'lev-green-dark', 'lev-green', 'lev-red', 'lev-orange', 'lev-yellow', 'lev-black');
  CREATE TYPE "public"."enum__programs_v_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum__programs_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__programs_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__programs_v_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__programs_v_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum__programs_v_blocks_image_feature_background_color" AS ENUM('lev-yellow', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'lev-gray-light', 'white');
  CREATE TYPE "public"."enum__programs_v_blocks_media_showcase_aspect_ratio" AS ENUM('portrait', 'square', 'landscape', 'wide', 'natural');
  CREATE TYPE "public"."enum__programs_v_blocks_decorated_c_t_a_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__programs_v_blocks_blog_posts_list_display_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__programs_v_blocks_blog_posts_list_background_color" AS ENUM('lev-yellow-light', 'lev-yellow', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__programs_v_blocks_social_feed_stats_number_color" AS ENUM('lev-blue-light', 'lev-blue', 'lev-yellow', 'lev-yellow-light', 'lev-green', 'lev-green-light', 'lev-orange', 'lev-red', 'lev-pink');
  CREATE TYPE "public"."enum__programs_v_blocks_social_feed_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TYPE "public"."enum__programs_v_blocks_program_showcase_background_color" AS ENUM('tealLight', 'lev-yellow-light', 'lev-blue-light', 'lev-green-light', 'lev-pink', 'white');
  CREATE TYPE "public"."enum__programs_v_version_country" AS ENUM('US', 'UK', 'CA', 'DE', 'FR', 'ES', 'IT', 'AU', 'IE', 'ZA', 'EG', 'JO', 'SA', 'AE', 'multi');
  CREATE TYPE "public"."enum__programs_v_version_course_educational_level" AS ENUM('Beginner', 'Intermediate', 'Advanced');
  CREATE TYPE "public"."enum__programs_v_version_course_course_mode" AS ENUM('online', 'onsite', 'blended');
  CREATE TYPE "public"."enum__programs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programs_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_blog_categories_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum_blog_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_categories_v_version_structured_data_type" AS ENUM('auto', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage');
  CREATE TYPE "public"."enum__blog_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_categories_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_blog_blocks_hero_blog_post_variant" AS ENUM('centered', 'split-right', 'split-left', 'full-background');
  CREATE TYPE "public"."enum_blog_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum_blog_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_blog_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_blog_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_blog_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_blocks_hero_blog_post_variant" AS ENUM('centered', 'split-right', 'split-left', 'full-background');
  CREATE TYPE "public"."enum__blog_v_blocks_rich_text_width" AS ENUM('narrow', 'normal', 'wide');
  CREATE TYPE "public"."enum__blog_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__blog_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__blog_v_blocks_cta_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__blog_v_blocks_cta_background" AS ENUM('default', 'brand', 'dark', 'image');
  CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_forms_blocks_upload_upload_collection" AS ENUM('media');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('pending', 'read', 'replied', 'archived');
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum_site_settings_integrations_webhooks_events" AS ENUM('form_submission');
  CREATE TYPE "public"."enum_header_navigation_type" AS ENUM('page', 'external');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('whatsapp', 'instagram', 'linkedin', 'facebook', 'youtube', 'twitter', 'tiktok', 'telegram');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum_pages_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum_pages_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"block_name" varchar
  );
  
  CREATE TABLE "tdsts_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "tdsts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_pages_blocks_cta_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum_pages_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum_pages_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum_pages_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum_pages_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left'
  );
  
  CREATE TABLE "pages_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum_pages_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum_pages_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum_pages_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar
  );
  
  CREATE TABLE "pages_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum_pages_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_pages_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar
  );
  
  CREATE TABLE "pages_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"meta_no_follow" boolean DEFAULT false,
  	"open_graph_image_id" integer,
  	"sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"structured_data_enabled" boolean DEFAULT true,
  	"structured_data_type" "enum_pages_structured_data_type" DEFAULT 'auto',
  	"show_header" boolean DEFAULT true,
  	"show_footer" boolean DEFAULT true,
  	"parent_id" integer,
  	"slug" varchar,
  	"full_path" varchar,
  	"translation_complete" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"date_modified" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"open_graph_title" varchar,
  	"open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"blog_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum__pages_v_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum__pages_v_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tdsts_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tdsts_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__pages_v_blocks_cta_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum__pages_v_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum__pages_v_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum__pages_v_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum__pages_v_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum__pages_v_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum__pages_v_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum__pages_v_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum__pages_v_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_meta_image_id" integer,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_meta_no_follow" boolean DEFAULT false,
  	"version_open_graph_image_id" integer,
  	"version_sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"version_structured_data_enabled" boolean DEFAULT true,
  	"version_structured_data_type" "enum__pages_v_version_structured_data_type" DEFAULT 'auto',
  	"version_show_header" boolean DEFAULT true,
  	"version_show_footer" boolean DEFAULT true,
  	"version_parent_id" integer,
  	"version_slug" varchar,
  	"version_full_path" varchar,
  	"version_translation_complete" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_date_modified" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"version_open_graph_title" varchar,
  	"version_open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"blog_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'page',
  	"to_page_id" integer,
  	"to_external_u_r_l" varchar,
  	"to_custom_path" varchar,
  	"type" "enum_redirects_type" DEFAULT '301',
  	"enabled" boolean DEFAULT true,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "program_types_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "program_types_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "program_types_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum_program_types_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum_program_types_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_program_types_blocks_rich_text_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_program_types_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "program_types_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "program_types_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_program_types_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "program_types_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_program_types_blocks_cta_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "program_types_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum_program_types_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum_program_types_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "program_types_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum_program_types_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "program_types_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "program_types_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum_program_types_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "program_types_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar
  );
  
  CREATE TABLE "program_types_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left'
  );
  
  CREATE TABLE "program_types_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum_program_types_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum_program_types_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "program_types_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum_program_types_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar
  );
  
  CREATE TABLE "program_types_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum_program_types_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "program_types_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "program_types_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_program_types_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "program_types_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "program_types_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "program_types_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "program_types_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer
  );
  
  CREATE TABLE "program_types_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "program_types_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "program_types_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar
  );
  
  CREATE TABLE "program_types_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "program_types_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "program_types_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "program_types_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "program_types_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pl_filters_by_country" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pl_filters_by_country",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"display_mode" "enum_pl_display_mode" DEFAULT 'auto',
  	"filters_only_open" boolean DEFAULT false,
  	"filters_limit" numeric DEFAULT 6,
  	"filters_sort_by" "enum_pl_filters_sort_by" DEFAULT 'newest',
  	"layout_cards_per_row" "enum_pl_layout_cards_per_row" DEFAULT '3',
  	"layout_card_style" "enum_pl_layout_card_style" DEFAULT 'default',
  	"layout_show_country" boolean DEFAULT true,
  	"layout_show_duration" boolean DEFAULT true,
  	"layout_show_deadline" boolean DEFAULT false,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_label" varchar DEFAULT 'View all programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"empty_message" varchar DEFAULT 'No programs available right now.',
  	"block_name" varchar
  );
  
  CREATE TABLE "program_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"application_form_id" integer,
  	"icon_id" integer,
  	"featured_image_id" integer,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"meta_no_follow" boolean DEFAULT false,
  	"open_graph_image_id" integer,
  	"sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"structured_data_enabled" boolean DEFAULT true,
  	"structured_data_type" "enum_program_types_structured_data_type" DEFAULT 'auto',
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"translation_complete" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"date_modified" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_program_types_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "program_types_locales" (
  	"name" varchar,
  	"short_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"open_graph_title" varchar,
  	"open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "program_types_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"blog_id" integer,
  	"media_id" integer,
  	"programs_id" integer,
  	"program_types_id" integer
  );
  
  CREATE TABLE "_program_types_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum__program_types_v_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum__program_types_v_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__program_types_v_blocks_rich_text_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__program_types_v_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__program_types_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__program_types_v_blocks_cta_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum__program_types_v_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum__program_types_v_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum__program_types_v_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum__program_types_v_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum__program_types_v_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum__program_types_v_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum__program_types_v_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum__program_types_v_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum__program_types_v_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pl_v_filters_by_country" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pl_v_filters_by_country",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pl_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"display_mode" "enum__pl_v_display_mode" DEFAULT 'auto',
  	"filters_only_open" boolean DEFAULT false,
  	"filters_limit" numeric DEFAULT 6,
  	"filters_sort_by" "enum__pl_v_filters_sort_by" DEFAULT 'newest',
  	"layout_cards_per_row" "enum__pl_v_layout_cards_per_row" DEFAULT '3',
  	"layout_card_style" "enum__pl_v_layout_card_style" DEFAULT 'default',
  	"layout_show_country" boolean DEFAULT true,
  	"layout_show_duration" boolean DEFAULT true,
  	"layout_show_deadline" boolean DEFAULT false,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_label" varchar DEFAULT 'View all programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"empty_message" varchar DEFAULT 'No programs available right now.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_program_types_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_application_form_id" integer,
  	"version_icon_id" integer,
  	"version_featured_image_id" integer,
  	"version_meta_image_id" integer,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_meta_no_follow" boolean DEFAULT false,
  	"version_open_graph_image_id" integer,
  	"version_sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"version_structured_data_enabled" boolean DEFAULT true,
  	"version_structured_data_type" "enum__program_types_v_version_structured_data_type" DEFAULT 'auto',
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_translation_complete" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_date_modified" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__program_types_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__program_types_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_program_types_v_locales" (
  	"version_name" varchar,
  	"version_short_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"version_open_graph_title" varchar,
  	"version_open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_program_types_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"blog_id" integer,
  	"media_id" integer,
  	"programs_id" integer,
  	"program_types_id" integer
  );
  
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
  
  CREATE TABLE "programs_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "programs_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "programs_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum_programs_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum_programs_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_programs_blocks_rich_text_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_programs_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "programs_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "programs_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_programs_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "programs_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_programs_blocks_cta_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "programs_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum_programs_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum_programs_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "programs_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum_programs_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "programs_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "programs_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum_programs_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "programs_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar
  );
  
  CREATE TABLE "programs_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left'
  );
  
  CREATE TABLE "programs_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum_programs_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum_programs_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "programs_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum_programs_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar
  );
  
  CREATE TABLE "programs_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum_programs_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "programs_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "programs_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_programs_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "programs_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programs_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "programs_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programs_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer
  );
  
  CREATE TABLE "programs_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programs_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "programs_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar
  );
  
  CREATE TABLE "programs_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "programs_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "programs_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programs_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "programs_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"country" "enum_programs_country",
  	"application_form_id" integer,
  	"featured_image_id" integer,
  	"is_open" boolean DEFAULT true,
  	"calendly_u_r_l" varchar,
  	"detail_hero_image_id" integer,
  	"detail_photo_middle_id" integer,
  	"detail_picture_yourself_photo_id" integer,
  	"detail_memories_primary_cta_url" varchar,
  	"detail_memories_secondary_link_url" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"meta_no_follow" boolean DEFAULT false,
  	"open_graph_image_id" integer,
  	"sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"course_course_code" varchar,
  	"course_educational_level" "enum_programs_course_educational_level",
  	"course_course_mode" "enum_programs_course_course_mode",
  	"course_duration" varchar,
  	"course_start_date" timestamp(3) with time zone,
  	"course_end_date" timestamp(3) with time zone,
  	"slug" varchar,
  	"translation_complete" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"date_modified" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_programs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "programs_locales" (
  	"title" varchar,
  	"duration" varchar,
  	"short_description" varchar,
  	"detail_hero_tag" varchar,
  	"detail_hero_subtitle" varchar,
  	"detail_hero_note" varchar,
  	"detail_intro_eyebrow" varchar,
  	"detail_intro_body" varchar,
  	"detail_what_is_title" varchar,
  	"detail_what_is_body" varchar,
  	"detail_picture_yourself_eyebrow" varchar,
  	"detail_picture_yourself_body" varchar,
  	"detail_picture_yourself_circle_heading" varchar,
  	"detail_picture_yourself_circle_body" varchar,
  	"detail_why_participate_body" varchar,
  	"detail_jobs_body" varchar,
  	"detail_destinations_lead_text" varchar,
  	"detail_benefits_showcase_title" varchar,
  	"detail_memories_title" varchar,
  	"detail_memories_primary_cta_label" varchar,
  	"detail_memories_secondary_link_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"open_graph_title" varchar,
  	"open_graph_description" varchar,
  	"course_provider" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"program_types_id" integer,
  	"blog_id" integer,
  	"media_id" integer
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
  
  CREATE TABLE "_programs_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_hero_action_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum_hero_variant" DEFAULT 'splitRight',
  	"eyebrow" varchar DEFAULT 'DISCOVER LEVNTURA',
  	"heading" varchar DEFAULT 'WHERE JOURNEYS
  BEGIN',
  	"highlighted_word" varchar DEFAULT 'BEGIN',
  	"highlight_color" "enum_hero_highlight" DEFAULT 'lev-orange',
  	"subheading" varchar,
  	"media_id" integer,
  	"background_color" "enum_hero_bg_color" DEFAULT 'lev-yellow',
  	"text_color" "enum_hero_text_color" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_hero_home_opportunities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar DEFAULT 'Explore with Levntura!',
  	"subheadline" varchar DEFAULT 'Where Learning Meets Adventure',
  	"background_type" "enum__programs_v_blocks_hero_home_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum__programs_v_blocks_hero_home_background_color" DEFAULT 'lev-blue',
  	"cta_label" varchar DEFAULT 'Start Your Global Experience',
  	"cta_url" varchar DEFAULT '/contact',
  	"show_social_icons" boolean DEFAULT true,
  	"intro_heading" varchar DEFAULT 'Empowering Youth to Lead,
  Learn, and Explore
  the World',
  	"intro_paragraph1" varchar DEFAULT 'Levntura isn''t just about travel or study—it''s about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.',
  	"intro_paragraph2" varchar DEFAULT 'From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it''s about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__programs_v_blocks_rich_text_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__programs_v_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__programs_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__programs_v_blocks_cta_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum__programs_v_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_image_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Campus life',
  	"heading" varchar DEFAULT 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
  	"paragraph" varchar DEFAULT 'University life isn''t just about lectures and exams—it''s where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you''ll carry forever.',
  	"image_id" integer,
  	"background_color" "enum__programs_v_blocks_image_feature_background_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_media_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Publication & Media',
  	"description" varchar DEFAULT 'Step into the stories that shaped Levntura''s journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.',
  	"aspect_ratio" "enum__programs_v_blocks_media_showcase_aspect_ratio" DEFAULT 'portrait',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_delay" numeric DEFAULT 2000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_decorated_c_t_a_top_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_decorated_c_t_a_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_decorated_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Start Your Global Journey?',
  	"description" varchar DEFAULT 'Join thousands of ambitious students shaping their future through Levntura''s programs. Let''s build your next adventure together.',
  	"cta_label" varchar DEFAULT 'Start Now!',
  	"cta_url" varchar DEFAULT '/contact',
  	"background_color" "enum__programs_v_blocks_decorated_c_t_a_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_partners_carousel_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_partners_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Who We Are',
  	"highlighted_word" varchar,
  	"highlight_color" "enum_partners_highlight" DEFAULT 'none',
  	"heading_color" "enum_partners_heading" DEFAULT 'lev-blue-dark',
  	"paragraph1" varchar DEFAULT 'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
  	"paragraph2" varchar DEFAULT 'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
  	"story_image_id" integer,
  	"cta_label" varchar DEFAULT 'About us',
  	"cta_url" varchar DEFAULT '/about',
  	"background_color" "enum_partners_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"panel_color" "enum_fc_card_panel_color" DEFAULT 'lev-blue-light',
  	"overlay_text_color" "enum_fc_card_text_color" DEFAULT 'lev-blue-light',
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'work & travel',
  	"description" varchar DEFAULT 'Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you''ll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.',
  	"section_cta_label" varchar DEFAULT 'Explore all programs',
  	"section_cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_fc_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_alternating_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"image_id" integer,
  	"image_position" "enum_alt_image_position" DEFAULT 'left',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_alternating_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'venture',
  	"heading" varchar DEFAULT 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
  	"intro_paragraph" varchar DEFAULT 'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_blog_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'KNOWLEDGE',
  	"heading" varchar DEFAULT 'MORE TO READ, BETTER TO KNOW.',
  	"description" varchar DEFAULT 'Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here''s where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.',
  	"display_mode" "enum__programs_v_blocks_blog_posts_list_display_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 3,
  	"cta_label" varchar DEFAULT 'Blogs',
  	"cta_url" varchar DEFAULT '/blogs',
  	"background_color" "enum__programs_v_blocks_blog_posts_list_background_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_video_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_video_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'our students are already sharing',
  	"subheading" varchar DEFAULT 'Never before
  Freedom to choose',
  	"description" varchar DEFAULT 'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
  	"cta_label" varchar DEFAULT 'See More',
  	"cta_url" varchar DEFAULT '/blogs',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_social_feed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"number_color" "enum__programs_v_blocks_social_feed_stats_number_color" DEFAULT 'lev-blue-light',
  	"category" varchar,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_social_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"community_heading" varchar DEFAULT 'JOIN OUR
  FACEBOOK COMMUNITY',
  	"community_description" varchar DEFAULT 'Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who''ve already lived the adventure.',
  	"platform" "enum__programs_v_blocks_social_feed_platform" DEFAULT 'facebook',
  	"background_image_id" integer,
  	"cta_label" varchar DEFAULT 'Join now!',
  	"cta_url" varchar DEFAULT 'https://www.facebook.com/levntura',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_program_showcase_program_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_program_showcase_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_program_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Programs',
  	"cta_label" varchar DEFAULT 'Explore Our Programs',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum__programs_v_blocks_program_showcase_background_color" DEFAULT 'tealLight',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_founders_carousel_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"description" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_founders_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar DEFAULT 'Contact Us',
  	"cta_url" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_mission_stats_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_mission_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_mission_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'WHAT IS OUR
  MISSION',
  	"background_color" "enum_ms_bg_color" DEFAULT 'lev-orange',
  	"stat_value_color" "enum_ms_value_color" DEFAULT 'lev-yellow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_values_list_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Values We
  Live By',
  	"background_color" "enum_vl_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_text_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"role" varchar DEFAULT 'Student',
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_text_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'testimonial',
  	"heading_faded" varchar DEFAULT 'STUDENTS',
  	"heading_solid" varchar DEFAULT 'FEEDBACK',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_map_embed_supporting_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'vision',
  	"heading" varchar DEFAULT 'Our sights
  are set on
  big goals',
  	"map_image_id" integer,
  	"map_link" varchar,
  	"stat_value" varchar DEFAULT '20+',
  	"stat_label" varchar DEFAULT 'COUNTRIES',
  	"stat_description" varchar DEFAULT 'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
  	"background_color" "enum_map_bg_color" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO!
  LETS START
  FRESH &
  NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"socials_label" varchar DEFAULT 'OUR SOCIALS',
  	"show_socials" boolean DEFAULT true,
  	"form_id" integer,
  	"background_color" "enum_cf_bg_color" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_address_list_offices_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_address_list_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"address" varchar,
  	"directions_label" varchar DEFAULT 'DIRECTIONS',
  	"directions_u_r_l" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_address_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_al_bg_color" DEFAULT 'gray-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_hero_with_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_hero_with_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FROM LEVNTURA',
  	"heading" varchar DEFAULT 'JOIN THE BEST TEAM IN THE WORLD',
  	"highlighted_word" varchar DEFAULT 'THE BEST',
  	"highlight_color" "enum_higrid_highlight" DEFAULT 'lev-green-light',
  	"description" varchar DEFAULT 'At Levntura, we''re here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we''d love to hear from you. Get in touch with us using any of the following methods:',
  	"background_color" "enum_higrid_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_prompt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'SUGGEST NEW
  OPPORTUNITIES',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'APPLY',
  	"cta_url" varchar DEFAULT '/careers/suggest',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_related_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_related_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Related Programs',
  	"section_label" varchar DEFAULT 'Programs',
  	"view_all_label" varchar DEFAULT 'View All',
  	"view_all_url" varchar DEFAULT '/programs',
  	"columns" "enum_ri_columns" DEFAULT '4',
  	"background_color" "enum_ri_bg_color" DEFAULT 'lev-green-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_memories_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'We are creating memories, are you joining?',
  	"primary_cta_label" varchar DEFAULT 'Start now!',
  	"primary_cta_url" varchar DEFAULT '/contact',
  	"secondary_link_label" varchar DEFAULT 'See all photos',
  	"secondary_link_url" varchar DEFAULT '/gallery',
  	"background_color" "enum_memories_grid_bg" DEFAULT 'lev-yellow-light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_education_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_education_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HIGHER EDUCATION
  GREATER IMPACT',
  	"paragraph" varchar DEFAULT 'At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world''s classrooms, industries, and cultures—unlocking a future without limits.',
  	"cta_label" varchar DEFAULT 'PROGRAMS',
  	"cta_url" varchar DEFAULT '/programs',
  	"background_color" "enum_edu_stats_bg" DEFAULT 'none',
  	"heading_color" "enum_edu_stats_heading" DEFAULT 'lev-red-dark',
  	"stat_value_color" "enum_edu_stats_value" DEFAULT 'lev-orange',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_venture_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_venture_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Designed
  for Global
  AdventureS',
  	"subtitle" varchar DEFAULT 'Venture',
  	"paragraph1" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"paragraph2" varchar DEFAULT 'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
  	"background_color" "enum_venture_bg" DEFAULT 'lev-yellow-light',
  	"heading_color" "enum_venture_heading" DEFAULT 'lev-blue-dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"initial_count" numeric DEFAULT 12,
  	"batch_size" numeric DEFAULT 12,
  	"show_more_label" varchar DEFAULT 'Show more',
  	"background_color" "enum_photo_grid_bg" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_gallery_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar DEFAULT 'At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we''re proud to create together—moments that remind us that every journey starts with a single step',
  	"background_color" "enum_gallery_hero_bg" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_gallery_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'HELLO! LETS START FRESH & NEW',
  	"highlighted_word" varchar DEFAULT 'START',
  	"highlight_color" "enum_gallery_cta_highlight" DEFAULT 'lev-red',
  	"heading_color" "enum_gallery_cta_heading" DEFAULT 'lev-red-dark',
  	"form_title" varchar DEFAULT 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
  	"form_id" integer,
  	"contact_link_label" varchar DEFAULT 'CONTACT US',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"show_dot_pattern" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_programs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_country" "enum__programs_v_version_country",
  	"version_application_form_id" integer,
  	"version_featured_image_id" integer,
  	"version_is_open" boolean DEFAULT true,
  	"version_calendly_u_r_l" varchar,
  	"version_detail_hero_image_id" integer,
  	"version_detail_photo_middle_id" integer,
  	"version_detail_picture_yourself_photo_id" integer,
  	"version_detail_memories_primary_cta_url" varchar,
  	"version_detail_memories_secondary_link_url" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_meta_no_follow" boolean DEFAULT false,
  	"version_open_graph_image_id" integer,
  	"version_sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"version_course_course_code" varchar,
  	"version_course_educational_level" "enum__programs_v_version_course_educational_level",
  	"version_course_course_mode" "enum__programs_v_version_course_course_mode",
  	"version_course_duration" varchar,
  	"version_course_start_date" timestamp(3) with time zone,
  	"version_course_end_date" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_translation_complete" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_date_modified" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__programs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__programs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_programs_v_locales" (
  	"version_title" varchar,
  	"version_duration" varchar,
  	"version_short_description" varchar,
  	"version_detail_hero_tag" varchar,
  	"version_detail_hero_subtitle" varchar,
  	"version_detail_hero_note" varchar,
  	"version_detail_intro_eyebrow" varchar,
  	"version_detail_intro_body" varchar,
  	"version_detail_what_is_title" varchar,
  	"version_detail_what_is_body" varchar,
  	"version_detail_picture_yourself_eyebrow" varchar,
  	"version_detail_picture_yourself_body" varchar,
  	"version_detail_picture_yourself_circle_heading" varchar,
  	"version_detail_picture_yourself_circle_body" varchar,
  	"version_detail_why_participate_body" varchar,
  	"version_detail_jobs_body" varchar,
  	"version_detail_destinations_lead_text" varchar,
  	"version_detail_benefits_showcase_title" varchar,
  	"version_detail_memories_title" varchar,
  	"version_detail_memories_primary_cta_label" varchar,
  	"version_detail_memories_secondary_link_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"version_open_graph_title" varchar,
  	"version_open_graph_description" varchar,
  	"version_course_provider" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_programs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"program_types_id" integer,
  	"blog_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"color" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"meta_no_follow" boolean DEFAULT false,
  	"open_graph_image_id" integer,
  	"sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"structured_data_enabled" boolean DEFAULT true,
  	"structured_data_type" "enum_blog_categories_structured_data_type" DEFAULT 'auto',
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"translation_complete" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"date_modified" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_categories_locales" (
  	"name" varchar,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"open_graph_title" varchar,
  	"open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_image_id" integer,
  	"version_color" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_meta_no_follow" boolean DEFAULT false,
  	"version_open_graph_image_id" integer,
  	"version_sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"version_structured_data_enabled" boolean DEFAULT true,
  	"version_structured_data_type" "enum__blog_categories_v_version_structured_data_type" DEFAULT 'auto',
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_translation_complete" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_date_modified" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_categories_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_categories_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"version_open_graph_title" varchar,
  	"version_open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_hero_blog_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_blog_blocks_hero_blog_post_variant" DEFAULT 'centered',
  	"eyebrow" varchar,
  	"show_author" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_reading_time" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum_blog_blocks_rich_text_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_blog_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "blog_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "blog_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_blog_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "blog_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_blog_blocks_cta_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "blog_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum_blog_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_image_id" integer,
  	"category_id" integer,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"meta_no_follow" boolean DEFAULT false,
  	"open_graph_image_id" integer,
  	"sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"slug" varchar,
  	"author_id" integer,
  	"translation_complete" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"date_modified" timestamp(3) with time zone,
  	"reading_time" numeric,
  	"word_count" numeric,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"open_graph_title" varchar,
  	"open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_id" integer
  );
  
  CREATE TABLE "_blog_v_blocks_hero_blog_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__blog_v_blocks_hero_blog_post_variant" DEFAULT 'centered',
  	"eyebrow" varchar,
  	"show_author" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_reading_time" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"width" "enum__blog_v_blocks_rich_text_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__blog_v_blocks_content_columns_size" DEFAULT 'full',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__blog_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"enable_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__blog_v_blocks_cta_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background" "enum__blog_v_blocks_cta_background" DEFAULT 'default',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_featured_image_id" integer,
  	"version_category_id" integer,
  	"version_meta_image_id" integer,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_meta_no_follow" boolean DEFAULT false,
  	"version_open_graph_image_id" integer,
  	"version_sitemap_exclude_from_sitemap" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_author_id" integer,
  	"version_translation_complete" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_date_modified" timestamp(3) with time zone,
  	"version_reading_time" numeric,
  	"version_word_count" numeric,
  	"version_is_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"version_open_graph_title" varchar,
  	"version_open_graph_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_upload_mime_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mime_type" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_upload" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"upload_collection" "enum_forms_blocks_upload_upload_collection" NOT NULL,
  	"width" numeric,
  	"max_file_size" numeric,
  	"required" boolean,
  	"multiple" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_upload_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_uploads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"status" "enum_form_submissions_status" DEFAULT 'pending',
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_integrations_webhooks_events" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_site_settings_integrations_webhooks_events",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_integrations_webhooks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"secret" varchar,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_light_id" integer,
  	"favicon_id" integer,
  	"title_template" varchar DEFAULT '%s | Levntura',
  	"default_o_g_image_id" integer,
  	"email_enabled" boolean DEFAULT false,
  	"email_from_address" varchar,
  	"email_from_name" varchar DEFAULT 'Levntura',
  	"email_notification_email" varchar,
  	"email_smtp_host" varchar,
  	"email_smtp_port" numeric DEFAULT 587,
  	"email_smtp_secure" boolean DEFAULT false,
  	"email_smtp_user" varchar,
  	"email_smtp_password" varchar,
  	"head_code" varchar,
  	"body_code" varchar,
  	"robots_txt" varchar,
  	"maintenance_mode" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar DEFAULT 'Levntura' NOT NULL,
  	"default_title" varchar,
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_navigation_submenu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE "header_navigation_submenu_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_navigation_type" DEFAULT 'page',
  	"page_id" integer,
  	"external_u_r_l" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_addresses_locales" (
  	"label" varchar,
  	"address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "footer_phones_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"show_logo" boolean DEFAULT true,
  	"show_watermark" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_locales" ADD CONSTRAINT "users_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home_opportunities" ADD CONSTRAINT "pages_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home" ADD CONSTRAINT "pages_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home" ADD CONSTRAINT "pages_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tdsts_images" ADD CONSTRAINT "tdsts_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tdsts_images" ADD CONSTRAINT "tdsts_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tdsts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tdsts" ADD CONSTRAINT "tdsts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_actions" ADD CONSTRAINT "pages_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_feature" ADD CONSTRAINT "pages_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_feature" ADD CONSTRAINT "pages_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_items" ADD CONSTRAINT "pages_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_items" ADD CONSTRAINT "pages_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase" ADD CONSTRAINT "pages_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "pages_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "pages_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "pages_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "pages_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_decorated_c_t_a" ADD CONSTRAINT "pages_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_carousel_partners" ADD CONSTRAINT "pages_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_carousel_partners" ADD CONSTRAINT "pages_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_carousel" ADD CONSTRAINT "pages_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_carousel" ADD CONSTRAINT "pages_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alternating_content_rows" ADD CONSTRAINT "pages_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_alternating_content_rows" ADD CONSTRAINT "pages_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alternating_content" ADD CONSTRAINT "pages_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_posts_list" ADD CONSTRAINT "pages_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonials_videos" ADD CONSTRAINT "pages_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonials_videos" ADD CONSTRAINT "pages_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonials" ADD CONSTRAINT "pages_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_feed_stats" ADD CONSTRAINT "pages_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_feed" ADD CONSTRAINT "pages_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_feed" ADD CONSTRAINT "pages_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_program_showcase_program_types" ADD CONSTRAINT "pages_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_program_showcase_programs" ADD CONSTRAINT "pages_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_program_showcase_programs" ADD CONSTRAINT "pages_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_program_showcase" ADD CONSTRAINT "pages_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founders_carousel_founders" ADD CONSTRAINT "pages_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founders_carousel_founders" ADD CONSTRAINT "pages_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founders_carousel" ADD CONSTRAINT "pages_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_stats_paragraphs" ADD CONSTRAINT "pages_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_stats_stats" ADD CONSTRAINT "pages_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_stats" ADD CONSTRAINT "pages_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_list_values" ADD CONSTRAINT "pages_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_list" ADD CONSTRAINT "pages_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_testimonials" ADD CONSTRAINT "pages_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "pages_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_embed" ADD CONSTRAINT "pages_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_embed" ADD CONSTRAINT "pages_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_address_list_offices_phones" ADD CONSTRAINT "pages_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_address_list_offices" ADD CONSTRAINT "pages_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_address_list" ADD CONSTRAINT "pages_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_image_grid_images" ADD CONSTRAINT "pages_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_image_grid_images" ADD CONSTRAINT "pages_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_image_grid" ADD CONSTRAINT "pages_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_memories_grid" ADD CONSTRAINT "pages_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_stats_stats" ADD CONSTRAINT "pages_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_stats" ADD CONSTRAINT "pages_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_venture_grid_cards" ADD CONSTRAINT "pages_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_venture_grid_cards" ADD CONSTRAINT "pages_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_venture_grid" ADD CONSTRAINT "pages_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_grid" ADD CONSTRAINT "pages_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_hero" ADD CONSTRAINT "pages_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_cta" ADD CONSTRAINT "pages_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_cta" ADD CONSTRAINT "pages_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prompt_c_t_a" ADD CONSTRAINT "pages_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_prompt_c_t_a" ADD CONSTRAINT "pages_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_items_items" ADD CONSTRAINT "pages_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_items_items" ADD CONSTRAINT "pages_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_items" ADD CONSTRAINT "pages_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_home_opportunities" ADD CONSTRAINT "_pages_v_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_home" ADD CONSTRAINT "_pages_v_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_home" ADD CONSTRAINT "_pages_v_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tdsts_v_images" ADD CONSTRAINT "_tdsts_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tdsts_v_images" ADD CONSTRAINT "_tdsts_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tdsts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tdsts_v" ADD CONSTRAINT "_tdsts_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_actions" ADD CONSTRAINT "_pages_v_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_feature" ADD CONSTRAINT "_pages_v_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_feature" ADD CONSTRAINT "_pages_v_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_items" ADD CONSTRAINT "_pages_v_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_items" ADD CONSTRAINT "_pages_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD CONSTRAINT "_pages_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_pages_v_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_pages_v_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_pages_v_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_pages_v_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_decorated_c_t_a" ADD CONSTRAINT "_pages_v_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_pages_v_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_pages_v_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_carousel" ADD CONSTRAINT "_pages_v_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_carousel" ADD CONSTRAINT "_pages_v_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alternating_content_rows" ADD CONSTRAINT "_pages_v_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alternating_content_rows" ADD CONSTRAINT "_pages_v_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alternating_content" ADD CONSTRAINT "_pages_v_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_posts_list" ADD CONSTRAINT "_pages_v_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_pages_v_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_pages_v_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonials" ADD CONSTRAINT "_pages_v_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_feed_stats" ADD CONSTRAINT "_pages_v_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_feed" ADD CONSTRAINT "_pages_v_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_feed" ADD CONSTRAINT "_pages_v_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_program_showcase_program_types" ADD CONSTRAINT "_pages_v_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_program_showcase_programs" ADD CONSTRAINT "_pages_v_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_program_showcase_programs" ADD CONSTRAINT "_pages_v_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_program_showcase" ADD CONSTRAINT "_pages_v_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_pages_v_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_pages_v_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founders_carousel" ADD CONSTRAINT "_pages_v_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_stats_paragraphs" ADD CONSTRAINT "_pages_v_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_stats_stats" ADD CONSTRAINT "_pages_v_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_stats" ADD CONSTRAINT "_pages_v_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_list_values" ADD CONSTRAINT "_pages_v_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_list" ADD CONSTRAINT "_pages_v_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_testimonials" ADD CONSTRAINT "_pages_v_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "_pages_v_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_embed" ADD CONSTRAINT "_pages_v_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_embed" ADD CONSTRAINT "_pages_v_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_address_list_offices_phones" ADD CONSTRAINT "_pages_v_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_address_list_offices" ADD CONSTRAINT "_pages_v_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_address_list" ADD CONSTRAINT "_pages_v_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_image_grid" ADD CONSTRAINT "_pages_v_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_memories_grid" ADD CONSTRAINT "_pages_v_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_education_stats_stats" ADD CONSTRAINT "_pages_v_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_education_stats" ADD CONSTRAINT "_pages_v_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_venture_grid_cards" ADD CONSTRAINT "_pages_v_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_venture_grid_cards" ADD CONSTRAINT "_pages_v_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_venture_grid" ADD CONSTRAINT "_pages_v_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_grid" ADD CONSTRAINT "_pages_v_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_hero" ADD CONSTRAINT "_pages_v_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_cta" ADD CONSTRAINT "_pages_v_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_cta" ADD CONSTRAINT "_pages_v_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_pages_v_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_pages_v_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_related_items_items" ADD CONSTRAINT "_pages_v_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_related_items_items" ADD CONSTRAINT "_pages_v_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_related_items" ADD CONSTRAINT "_pages_v_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects" ADD CONSTRAINT "redirects_to_page_id_pages_id_fk" FOREIGN KEY ("to_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_actions" ADD CONSTRAINT "program_types_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero" ADD CONSTRAINT "program_types_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero" ADD CONSTRAINT "program_types_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_home_opportunities" ADD CONSTRAINT "program_types_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_home" ADD CONSTRAINT "program_types_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_home" ADD CONSTRAINT "program_types_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_rich_text" ADD CONSTRAINT "program_types_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_content_columns" ADD CONSTRAINT "program_types_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_content" ADD CONSTRAINT "program_types_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery_images" ADD CONSTRAINT "program_types_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery_images" ADD CONSTRAINT "program_types_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery" ADD CONSTRAINT "program_types_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_faq_items" ADD CONSTRAINT "program_types_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_faq" ADD CONSTRAINT "program_types_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_cta_actions" ADD CONSTRAINT "program_types_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_cta" ADD CONSTRAINT "program_types_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_cta" ADD CONSTRAINT "program_types_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_image_feature" ADD CONSTRAINT "program_types_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_image_feature" ADD CONSTRAINT "program_types_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_media_showcase_items" ADD CONSTRAINT "program_types_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_media_showcase_items" ADD CONSTRAINT "program_types_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_media_showcase" ADD CONSTRAINT "program_types_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "program_types_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "program_types_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "program_types_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "program_types_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_decorated_c_t_a" ADD CONSTRAINT "program_types_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_partners_carousel_partners" ADD CONSTRAINT "program_types_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_partners_carousel_partners" ADD CONSTRAINT "program_types_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_partners_carousel" ADD CONSTRAINT "program_types_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_partners_carousel" ADD CONSTRAINT "program_types_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_feature_cards_cards" ADD CONSTRAINT "program_types_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_feature_cards_cards" ADD CONSTRAINT "program_types_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_feature_cards" ADD CONSTRAINT "program_types_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_alternating_content_rows" ADD CONSTRAINT "program_types_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_alternating_content_rows" ADD CONSTRAINT "program_types_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_alternating_content" ADD CONSTRAINT "program_types_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_blog_posts_list" ADD CONSTRAINT "program_types_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_video_testimonials_videos" ADD CONSTRAINT "program_types_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_video_testimonials_videos" ADD CONSTRAINT "program_types_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_video_testimonials" ADD CONSTRAINT "program_types_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_social_feed_stats" ADD CONSTRAINT "program_types_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_social_feed" ADD CONSTRAINT "program_types_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_social_feed" ADD CONSTRAINT "program_types_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_program_showcase_program_types" ADD CONSTRAINT "program_types_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_program_showcase_programs" ADD CONSTRAINT "program_types_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_program_showcase_programs" ADD CONSTRAINT "program_types_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_program_showcase" ADD CONSTRAINT "program_types_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_founders_carousel_founders" ADD CONSTRAINT "program_types_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_founders_carousel_founders" ADD CONSTRAINT "program_types_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_founders_carousel" ADD CONSTRAINT "program_types_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_mission_stats_paragraphs" ADD CONSTRAINT "program_types_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_mission_stats_stats" ADD CONSTRAINT "program_types_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_mission_stats" ADD CONSTRAINT "program_types_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_values_list_values" ADD CONSTRAINT "program_types_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_values_list" ADD CONSTRAINT "program_types_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_text_testimonials_testimonials" ADD CONSTRAINT "program_types_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_text_testimonials_testimonials" ADD CONSTRAINT "program_types_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_text_testimonials" ADD CONSTRAINT "program_types_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "program_types_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_map_embed" ADD CONSTRAINT "program_types_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_map_embed" ADD CONSTRAINT "program_types_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_contact_form" ADD CONSTRAINT "program_types_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_contact_form" ADD CONSTRAINT "program_types_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_address_list_offices_phones" ADD CONSTRAINT "program_types_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_address_list_offices" ADD CONSTRAINT "program_types_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_address_list" ADD CONSTRAINT "program_types_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_with_image_grid_images" ADD CONSTRAINT "program_types_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_with_image_grid_images" ADD CONSTRAINT "program_types_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_hero_with_image_grid" ADD CONSTRAINT "program_types_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_prompt_c_t_a" ADD CONSTRAINT "program_types_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_prompt_c_t_a" ADD CONSTRAINT "program_types_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_related_items_items" ADD CONSTRAINT "program_types_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_related_items_items" ADD CONSTRAINT "program_types_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_related_items" ADD CONSTRAINT "program_types_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_memories_grid" ADD CONSTRAINT "program_types_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_education_stats_stats" ADD CONSTRAINT "program_types_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_education_stats" ADD CONSTRAINT "program_types_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_venture_grid_cards" ADD CONSTRAINT "program_types_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_venture_grid_cards" ADD CONSTRAINT "program_types_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_venture_grid" ADD CONSTRAINT "program_types_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_photo_grid" ADD CONSTRAINT "program_types_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery_hero" ADD CONSTRAINT "program_types_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery_cta" ADD CONSTRAINT "program_types_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_gallery_cta" ADD CONSTRAINT "program_types_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_blocks_form_block" ADD CONSTRAINT "program_types_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_blocks_form_block" ADD CONSTRAINT "program_types_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pl_filters_by_country" ADD CONSTRAINT "pl_filters_by_country_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pl"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pl" ADD CONSTRAINT "pl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types" ADD CONSTRAINT "program_types_application_form_id_forms_id_fk" FOREIGN KEY ("application_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types" ADD CONSTRAINT "program_types_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types" ADD CONSTRAINT "program_types_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types" ADD CONSTRAINT "program_types_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types" ADD CONSTRAINT "program_types_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_types_locales" ADD CONSTRAINT "program_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_rels" ADD CONSTRAINT "program_types_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_rels" ADD CONSTRAINT "program_types_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_rels" ADD CONSTRAINT "program_types_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_rels" ADD CONSTRAINT "program_types_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_types_rels" ADD CONSTRAINT "program_types_rels_program_types_fk" FOREIGN KEY ("program_types_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_actions" ADD CONSTRAINT "_program_types_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero" ADD CONSTRAINT "_program_types_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero" ADD CONSTRAINT "_program_types_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_home_opportunities" ADD CONSTRAINT "_program_types_v_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_home" ADD CONSTRAINT "_program_types_v_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_home" ADD CONSTRAINT "_program_types_v_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_rich_text" ADD CONSTRAINT "_program_types_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_content_columns" ADD CONSTRAINT "_program_types_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_content" ADD CONSTRAINT "_program_types_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery_images" ADD CONSTRAINT "_program_types_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery_images" ADD CONSTRAINT "_program_types_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery" ADD CONSTRAINT "_program_types_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_faq_items" ADD CONSTRAINT "_program_types_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_faq" ADD CONSTRAINT "_program_types_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_cta_actions" ADD CONSTRAINT "_program_types_v_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_cta" ADD CONSTRAINT "_program_types_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_cta" ADD CONSTRAINT "_program_types_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_image_feature" ADD CONSTRAINT "_program_types_v_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_image_feature" ADD CONSTRAINT "_program_types_v_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_media_showcase_items" ADD CONSTRAINT "_program_types_v_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_media_showcase_items" ADD CONSTRAINT "_program_types_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_media_showcase" ADD CONSTRAINT "_program_types_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_program_types_v_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_program_types_v_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_program_types_v_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_program_types_v_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_decorated_c_t_a" ADD CONSTRAINT "_program_types_v_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_program_types_v_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_program_types_v_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_partners_carousel" ADD CONSTRAINT "_program_types_v_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_partners_carousel" ADD CONSTRAINT "_program_types_v_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_feature_cards_cards" ADD CONSTRAINT "_program_types_v_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_feature_cards_cards" ADD CONSTRAINT "_program_types_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_feature_cards" ADD CONSTRAINT "_program_types_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_alternating_content_rows" ADD CONSTRAINT "_program_types_v_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_alternating_content_rows" ADD CONSTRAINT "_program_types_v_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_alternating_content" ADD CONSTRAINT "_program_types_v_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_blog_posts_list" ADD CONSTRAINT "_program_types_v_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_program_types_v_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_program_types_v_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_video_testimonials" ADD CONSTRAINT "_program_types_v_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_social_feed_stats" ADD CONSTRAINT "_program_types_v_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_social_feed" ADD CONSTRAINT "_program_types_v_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_social_feed" ADD CONSTRAINT "_program_types_v_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_program_showcase_program_types" ADD CONSTRAINT "_program_types_v_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_program_showcase_programs" ADD CONSTRAINT "_program_types_v_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_program_showcase_programs" ADD CONSTRAINT "_program_types_v_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_program_showcase" ADD CONSTRAINT "_program_types_v_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_program_types_v_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_program_types_v_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_founders_carousel" ADD CONSTRAINT "_program_types_v_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_mission_stats_paragraphs" ADD CONSTRAINT "_program_types_v_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_mission_stats_stats" ADD CONSTRAINT "_program_types_v_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_mission_stats" ADD CONSTRAINT "_program_types_v_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_values_list_values" ADD CONSTRAINT "_program_types_v_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_values_list" ADD CONSTRAINT "_program_types_v_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_program_types_v_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_program_types_v_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_text_testimonials" ADD CONSTRAINT "_program_types_v_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "_program_types_v_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_map_embed" ADD CONSTRAINT "_program_types_v_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_map_embed" ADD CONSTRAINT "_program_types_v_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_contact_form" ADD CONSTRAINT "_program_types_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_contact_form" ADD CONSTRAINT "_program_types_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_address_list_offices_phones" ADD CONSTRAINT "_program_types_v_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_address_list_offices" ADD CONSTRAINT "_program_types_v_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_address_list" ADD CONSTRAINT "_program_types_v_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_program_types_v_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_program_types_v_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_hero_with_image_grid" ADD CONSTRAINT "_program_types_v_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_program_types_v_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_program_types_v_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_related_items_items" ADD CONSTRAINT "_program_types_v_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_related_items_items" ADD CONSTRAINT "_program_types_v_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_related_items" ADD CONSTRAINT "_program_types_v_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_memories_grid" ADD CONSTRAINT "_program_types_v_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_education_stats_stats" ADD CONSTRAINT "_program_types_v_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_education_stats" ADD CONSTRAINT "_program_types_v_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_venture_grid_cards" ADD CONSTRAINT "_program_types_v_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_venture_grid_cards" ADD CONSTRAINT "_program_types_v_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_venture_grid" ADD CONSTRAINT "_program_types_v_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_photo_grid" ADD CONSTRAINT "_program_types_v_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery_hero" ADD CONSTRAINT "_program_types_v_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery_cta" ADD CONSTRAINT "_program_types_v_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_gallery_cta" ADD CONSTRAINT "_program_types_v_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_form_block" ADD CONSTRAINT "_program_types_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_blocks_form_block" ADD CONSTRAINT "_program_types_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pl_v_filters_by_country" ADD CONSTRAINT "_pl_v_filters_by_country_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pl_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pl_v" ADD CONSTRAINT "_pl_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_parent_id_program_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."program_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_version_application_form_id_forms_id_fk" FOREIGN KEY ("version_application_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_version_icon_id_media_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v" ADD CONSTRAINT "_program_types_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_types_v_locales" ADD CONSTRAINT "_program_types_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_rels" ADD CONSTRAINT "_program_types_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_program_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_rels" ADD CONSTRAINT "_program_types_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_rels" ADD CONSTRAINT "_program_types_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_rels" ADD CONSTRAINT "_program_types_v_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_program_types_v_rels" ADD CONSTRAINT "_program_types_v_rels_program_types_fk" FOREIGN KEY ("program_types_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "programs_blocks_hero_actions" ADD CONSTRAINT "programs_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero" ADD CONSTRAINT "programs_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero" ADD CONSTRAINT "programs_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_home_opportunities" ADD CONSTRAINT "programs_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_home" ADD CONSTRAINT "programs_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_home" ADD CONSTRAINT "programs_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_rich_text" ADD CONSTRAINT "programs_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_content_columns" ADD CONSTRAINT "programs_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_content" ADD CONSTRAINT "programs_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery_images" ADD CONSTRAINT "programs_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery_images" ADD CONSTRAINT "programs_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery" ADD CONSTRAINT "programs_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_faq_items" ADD CONSTRAINT "programs_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_faq" ADD CONSTRAINT "programs_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_cta_actions" ADD CONSTRAINT "programs_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_cta" ADD CONSTRAINT "programs_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_cta" ADD CONSTRAINT "programs_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_image_feature" ADD CONSTRAINT "programs_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_image_feature" ADD CONSTRAINT "programs_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_media_showcase_items" ADD CONSTRAINT "programs_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_media_showcase_items" ADD CONSTRAINT "programs_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_media_showcase" ADD CONSTRAINT "programs_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "programs_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "programs_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "programs_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "programs_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_decorated_c_t_a" ADD CONSTRAINT "programs_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_partners_carousel_partners" ADD CONSTRAINT "programs_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_partners_carousel_partners" ADD CONSTRAINT "programs_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_partners_carousel" ADD CONSTRAINT "programs_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_partners_carousel" ADD CONSTRAINT "programs_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_feature_cards_cards" ADD CONSTRAINT "programs_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_feature_cards_cards" ADD CONSTRAINT "programs_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_feature_cards" ADD CONSTRAINT "programs_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_alternating_content_rows" ADD CONSTRAINT "programs_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_alternating_content_rows" ADD CONSTRAINT "programs_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_alternating_content" ADD CONSTRAINT "programs_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_blog_posts_list" ADD CONSTRAINT "programs_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_video_testimonials_videos" ADD CONSTRAINT "programs_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_video_testimonials_videos" ADD CONSTRAINT "programs_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_video_testimonials" ADD CONSTRAINT "programs_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_social_feed_stats" ADD CONSTRAINT "programs_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_social_feed" ADD CONSTRAINT "programs_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_social_feed" ADD CONSTRAINT "programs_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_program_showcase_program_types" ADD CONSTRAINT "programs_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_program_showcase_programs" ADD CONSTRAINT "programs_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_program_showcase_programs" ADD CONSTRAINT "programs_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_program_showcase" ADD CONSTRAINT "programs_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_founders_carousel_founders" ADD CONSTRAINT "programs_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_founders_carousel_founders" ADD CONSTRAINT "programs_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_founders_carousel" ADD CONSTRAINT "programs_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_mission_stats_paragraphs" ADD CONSTRAINT "programs_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_mission_stats_stats" ADD CONSTRAINT "programs_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_mission_stats" ADD CONSTRAINT "programs_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_values_list_values" ADD CONSTRAINT "programs_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_values_list" ADD CONSTRAINT "programs_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_text_testimonials_testimonials" ADD CONSTRAINT "programs_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_text_testimonials_testimonials" ADD CONSTRAINT "programs_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_text_testimonials" ADD CONSTRAINT "programs_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "programs_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_map_embed" ADD CONSTRAINT "programs_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_map_embed" ADD CONSTRAINT "programs_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_contact_form" ADD CONSTRAINT "programs_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_contact_form" ADD CONSTRAINT "programs_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_address_list_offices_phones" ADD CONSTRAINT "programs_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_address_list_offices" ADD CONSTRAINT "programs_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_address_list" ADD CONSTRAINT "programs_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_with_image_grid_images" ADD CONSTRAINT "programs_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_with_image_grid_images" ADD CONSTRAINT "programs_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero_with_image_grid" ADD CONSTRAINT "programs_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_prompt_c_t_a" ADD CONSTRAINT "programs_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_prompt_c_t_a" ADD CONSTRAINT "programs_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_related_items_items" ADD CONSTRAINT "programs_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_related_items_items" ADD CONSTRAINT "programs_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_related_items" ADD CONSTRAINT "programs_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_memories_grid" ADD CONSTRAINT "programs_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_education_stats_stats" ADD CONSTRAINT "programs_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_education_stats" ADD CONSTRAINT "programs_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_venture_grid_cards" ADD CONSTRAINT "programs_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_venture_grid_cards" ADD CONSTRAINT "programs_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_venture_grid" ADD CONSTRAINT "programs_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_photo_grid" ADD CONSTRAINT "programs_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery_hero" ADD CONSTRAINT "programs_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery_cta" ADD CONSTRAINT "programs_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_gallery_cta" ADD CONSTRAINT "programs_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_form_block" ADD CONSTRAINT "programs_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_blocks_form_block" ADD CONSTRAINT "programs_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_application_form_id_forms_id_fk" FOREIGN KEY ("application_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_hero_image_id_media_id_fk" FOREIGN KEY ("detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_photo_middle_id_media_id_fk" FOREIGN KEY ("detail_photo_middle_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_detail_picture_yourself_photo_id_media_id_fk" FOREIGN KEY ("detail_picture_yourself_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_locales" ADD CONSTRAINT "programs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_program_types_fk" FOREIGN KEY ("program_types_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_programs_v_blocks_hero_actions" ADD CONSTRAINT "_programs_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero" ADD CONSTRAINT "_programs_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero" ADD CONSTRAINT "_programs_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_home_opportunities" ADD CONSTRAINT "_programs_v_blocks_hero_home_opportunities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_home" ADD CONSTRAINT "_programs_v_blocks_hero_home_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_home" ADD CONSTRAINT "_programs_v_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_rich_text" ADD CONSTRAINT "_programs_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_content_columns" ADD CONSTRAINT "_programs_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_content" ADD CONSTRAINT "_programs_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery_images" ADD CONSTRAINT "_programs_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery_images" ADD CONSTRAINT "_programs_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery" ADD CONSTRAINT "_programs_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_faq_items" ADD CONSTRAINT "_programs_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_faq" ADD CONSTRAINT "_programs_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_cta_actions" ADD CONSTRAINT "_programs_v_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_cta" ADD CONSTRAINT "_programs_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_cta" ADD CONSTRAINT "_programs_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_image_feature" ADD CONSTRAINT "_programs_v_blocks_image_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_image_feature" ADD CONSTRAINT "_programs_v_blocks_image_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_media_showcase_items" ADD CONSTRAINT "_programs_v_blocks_media_showcase_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_media_showcase_items" ADD CONSTRAINT "_programs_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_media_showcase" ADD CONSTRAINT "_programs_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_programs_v_blocks_decorated_c_t_a_top_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a_top_images" ADD CONSTRAINT "_programs_v_blocks_decorated_c_t_a_top_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_programs_v_blocks_decorated_c_t_a_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a_bottom_images" ADD CONSTRAINT "_programs_v_blocks_decorated_c_t_a_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_decorated_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_decorated_c_t_a" ADD CONSTRAINT "_programs_v_blocks_decorated_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_programs_v_blocks_partners_carousel_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_partners_carousel_partners" ADD CONSTRAINT "_programs_v_blocks_partners_carousel_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_partners_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_partners_carousel" ADD CONSTRAINT "_programs_v_blocks_partners_carousel_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_partners_carousel" ADD CONSTRAINT "_programs_v_blocks_partners_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_feature_cards_cards" ADD CONSTRAINT "_programs_v_blocks_feature_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_feature_cards_cards" ADD CONSTRAINT "_programs_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_feature_cards" ADD CONSTRAINT "_programs_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_alternating_content_rows" ADD CONSTRAINT "_programs_v_blocks_alternating_content_rows_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_alternating_content_rows" ADD CONSTRAINT "_programs_v_blocks_alternating_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_alternating_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_alternating_content" ADD CONSTRAINT "_programs_v_blocks_alternating_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_blog_posts_list" ADD CONSTRAINT "_programs_v_blocks_blog_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_programs_v_blocks_video_testimonials_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_video_testimonials_videos" ADD CONSTRAINT "_programs_v_blocks_video_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_video_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_video_testimonials" ADD CONSTRAINT "_programs_v_blocks_video_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_social_feed_stats" ADD CONSTRAINT "_programs_v_blocks_social_feed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_social_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_social_feed" ADD CONSTRAINT "_programs_v_blocks_social_feed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_social_feed" ADD CONSTRAINT "_programs_v_blocks_social_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_program_showcase_program_types" ADD CONSTRAINT "_programs_v_blocks_program_showcase_program_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_program_showcase_programs" ADD CONSTRAINT "_programs_v_blocks_program_showcase_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_program_showcase_programs" ADD CONSTRAINT "_programs_v_blocks_program_showcase_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_program_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_program_showcase" ADD CONSTRAINT "_programs_v_blocks_program_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_programs_v_blocks_founders_carousel_founders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_founders_carousel_founders" ADD CONSTRAINT "_programs_v_blocks_founders_carousel_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_founders_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_founders_carousel" ADD CONSTRAINT "_programs_v_blocks_founders_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_mission_stats_paragraphs" ADD CONSTRAINT "_programs_v_blocks_mission_stats_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_mission_stats_stats" ADD CONSTRAINT "_programs_v_blocks_mission_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_mission_stats" ADD CONSTRAINT "_programs_v_blocks_mission_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_values_list_values" ADD CONSTRAINT "_programs_v_blocks_values_list_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_values_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_values_list" ADD CONSTRAINT "_programs_v_blocks_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_programs_v_blocks_text_testimonials_testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_text_testimonials_testimonials" ADD CONSTRAINT "_programs_v_blocks_text_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_text_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_text_testimonials" ADD CONSTRAINT "_programs_v_blocks_text_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_map_embed_supporting_paragraphs" ADD CONSTRAINT "_programs_v_blocks_map_embed_supporting_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_map_embed" ADD CONSTRAINT "_programs_v_blocks_map_embed_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_map_embed" ADD CONSTRAINT "_programs_v_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_contact_form" ADD CONSTRAINT "_programs_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_contact_form" ADD CONSTRAINT "_programs_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_address_list_offices_phones" ADD CONSTRAINT "_programs_v_blocks_address_list_offices_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_address_list_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_address_list_offices" ADD CONSTRAINT "_programs_v_blocks_address_list_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_address_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_address_list" ADD CONSTRAINT "_programs_v_blocks_address_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_programs_v_blocks_hero_with_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid_images" ADD CONSTRAINT "_programs_v_blocks_hero_with_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_hero_with_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_hero_with_image_grid" ADD CONSTRAINT "_programs_v_blocks_hero_with_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_programs_v_blocks_prompt_c_t_a_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_prompt_c_t_a" ADD CONSTRAINT "_programs_v_blocks_prompt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_related_items_items" ADD CONSTRAINT "_programs_v_blocks_related_items_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_related_items_items" ADD CONSTRAINT "_programs_v_blocks_related_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_related_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_related_items" ADD CONSTRAINT "_programs_v_blocks_related_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_memories_grid" ADD CONSTRAINT "_programs_v_blocks_memories_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_education_stats_stats" ADD CONSTRAINT "_programs_v_blocks_education_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_education_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_education_stats" ADD CONSTRAINT "_programs_v_blocks_education_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_venture_grid_cards" ADD CONSTRAINT "_programs_v_blocks_venture_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_venture_grid_cards" ADD CONSTRAINT "_programs_v_blocks_venture_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v_blocks_venture_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_venture_grid" ADD CONSTRAINT "_programs_v_blocks_venture_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_photo_grid" ADD CONSTRAINT "_programs_v_blocks_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery_hero" ADD CONSTRAINT "_programs_v_blocks_gallery_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery_cta" ADD CONSTRAINT "_programs_v_blocks_gallery_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_gallery_cta" ADD CONSTRAINT "_programs_v_blocks_gallery_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_form_block" ADD CONSTRAINT "_programs_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_blocks_form_block" ADD CONSTRAINT "_programs_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_parent_id_programs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_application_form_id_forms_id_fk" FOREIGN KEY ("version_application_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_hero_image_id_media_id_fk" FOREIGN KEY ("version_detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_photo_middle_id_media_id_fk" FOREIGN KEY ("version_detail_photo_middle_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_detail_picture_yourself_photo_id_media_id_fk" FOREIGN KEY ("version_detail_picture_yourself_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_locales" ADD CONSTRAINT "_programs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_program_types_fk" FOREIGN KEY ("program_types_id") REFERENCES "public"."program_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_categories_locales" ADD CONSTRAINT "blog_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_categories_v" ADD CONSTRAINT "_blog_categories_v_parent_id_blog_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_categories_v" ADD CONSTRAINT "_blog_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_categories_v" ADD CONSTRAINT "_blog_categories_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_categories_v" ADD CONSTRAINT "_blog_categories_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_categories_v_locales" ADD CONSTRAINT "_blog_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_hero_blog_post" ADD CONSTRAINT "blog_blocks_hero_blog_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_rich_text" ADD CONSTRAINT "blog_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_content_columns" ADD CONSTRAINT "blog_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_content" ADD CONSTRAINT "blog_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_gallery_images" ADD CONSTRAINT "blog_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_gallery_images" ADD CONSTRAINT "blog_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_gallery" ADD CONSTRAINT "blog_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_faq_items" ADD CONSTRAINT "blog_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_faq" ADD CONSTRAINT "blog_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_cta_actions" ADD CONSTRAINT "blog_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_cta" ADD CONSTRAINT "blog_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_cta" ADD CONSTRAINT "blog_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_locales" ADD CONSTRAINT "blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_hero_blog_post" ADD CONSTRAINT "_blog_v_blocks_hero_blog_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_rich_text" ADD CONSTRAINT "_blog_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_content_columns" ADD CONSTRAINT "_blog_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_content" ADD CONSTRAINT "_blog_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_gallery_images" ADD CONSTRAINT "_blog_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_gallery_images" ADD CONSTRAINT "_blog_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_gallery" ADD CONSTRAINT "_blog_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_faq_items" ADD CONSTRAINT "_blog_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_faq" ADD CONSTRAINT "_blog_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_cta_actions" ADD CONSTRAINT "_blog_v_blocks_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_cta" ADD CONSTRAINT "_blog_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_cta" ADD CONSTRAINT "_blog_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_version_tags" ADD CONSTRAINT "_blog_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_category_id_blog_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_locales" ADD CONSTRAINT "_blog_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload_mime_types" ADD CONSTRAINT "forms_blocks_upload_mime_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_upload"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload" ADD CONSTRAINT "forms_blocks_upload_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload_locales" ADD CONSTRAINT "forms_blocks_upload_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_upload"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_uploads" ADD CONSTRAINT "form_submissions_submission_uploads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_integrations_webhooks_events" ADD CONSTRAINT "site_settings_integrations_webhooks_events_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings_integrations_webhooks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_integrations_webhooks" ADD CONSTRAINT "site_settings_integrations_webhooks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_o_g_image_id_media_id_fk" FOREIGN KEY ("default_o_g_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_submenu" ADD CONSTRAINT "header_navigation_submenu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_submenu" ADD CONSTRAINT "header_navigation_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_submenu_locales" ADD CONSTRAINT "header_navigation_submenu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_submenu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_addresses" ADD CONSTRAINT "footer_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_addresses_locales" ADD CONSTRAINT "footer_addresses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_phones" ADD CONSTRAINT "footer_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_phones_locales" ADD CONSTRAINT "footer_phones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_phones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links_locales" ADD CONSTRAINT "footer_bottom_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_bottom_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "users_locales_locale_parent_id_unique" ON "users_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_home_opportunities_order_idx" ON "pages_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_home_opportunities_parent_id_idx" ON "pages_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_home_opportunities_locale_idx" ON "pages_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_home_order_idx" ON "pages_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_home_parent_id_idx" ON "pages_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_home_path_idx" ON "pages_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_home_locale_idx" ON "pages_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_home_background_image_idx" ON "pages_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "tdsts_images_order_idx" ON "tdsts_images" USING btree ("_order");
  CREATE INDEX "tdsts_images_parent_id_idx" ON "tdsts_images" USING btree ("_parent_id");
  CREATE INDEX "tdsts_images_locale_idx" ON "tdsts_images" USING btree ("_locale");
  CREATE INDEX "tdsts_images_image_idx" ON "tdsts_images" USING btree ("image_id");
  CREATE INDEX "tdsts_order_idx" ON "tdsts" USING btree ("_order");
  CREATE INDEX "tdsts_parent_id_idx" ON "tdsts" USING btree ("_parent_id");
  CREATE INDEX "tdsts_path_idx" ON "tdsts" USING btree ("_path");
  CREATE INDEX "tdsts_locale_idx" ON "tdsts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_actions_locale_idx" ON "pages_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_locale_idx" ON "pages_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_locale_idx" ON "pages_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_actions_order_idx" ON "pages_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_actions_parent_id_idx" ON "pages_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_actions_locale_idx" ON "pages_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_image_feature_order_idx" ON "pages_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_feature_parent_id_idx" ON "pages_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_feature_path_idx" ON "pages_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_feature_locale_idx" ON "pages_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_feature_image_idx" ON "pages_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "pages_blocks_media_showcase_items_order_idx" ON "pages_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_items_parent_id_idx" ON "pages_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_items_locale_idx" ON "pages_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_showcase_items_image_idx" ON "pages_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_media_showcase_order_idx" ON "pages_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_parent_id_idx" ON "pages_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_path_idx" ON "pages_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_showcase_locale_idx" ON "pages_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "pages_blocks_decorated_c_t_a_top_images_order_idx" ON "pages_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "pages_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_decorated_c_t_a_top_images_locale_idx" ON "pages_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_decorated_c_t_a_top_images_image_idx" ON "pages_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_decorated_c_t_a_bottom_images_order_idx" ON "pages_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "pages_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "pages_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_decorated_c_t_a_bottom_images_image_idx" ON "pages_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_decorated_c_t_a_order_idx" ON "pages_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_decorated_c_t_a_parent_id_idx" ON "pages_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_decorated_c_t_a_path_idx" ON "pages_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_decorated_c_t_a_locale_idx" ON "pages_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_partners_carousel_partners_order_idx" ON "pages_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_carousel_partners_parent_id_idx" ON "pages_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_carousel_partners_locale_idx" ON "pages_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "pages_blocks_partners_carousel_partners_logo_idx" ON "pages_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_partners_carousel_order_idx" ON "pages_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_carousel_parent_id_idx" ON "pages_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_carousel_path_idx" ON "pages_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_partners_carousel_locale_idx" ON "pages_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_partners_carousel_story_image_idx" ON "pages_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_order_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_parent_id_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_locale_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_cards_cards_image_idx" ON "pages_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_cards_locale_idx" ON "pages_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_alternating_content_rows_order_idx" ON "pages_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_alternating_content_rows_parent_id_idx" ON "pages_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alternating_content_rows_locale_idx" ON "pages_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "pages_blocks_alternating_content_rows_image_idx" ON "pages_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "pages_blocks_alternating_content_order_idx" ON "pages_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_alternating_content_parent_id_idx" ON "pages_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alternating_content_path_idx" ON "pages_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_alternating_content_locale_idx" ON "pages_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_blog_posts_list_order_idx" ON "pages_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_posts_list_parent_id_idx" ON "pages_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_posts_list_path_idx" ON "pages_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_posts_list_locale_idx" ON "pages_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_testimonials_videos_order_idx" ON "pages_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_testimonials_videos_parent_id_idx" ON "pages_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_testimonials_videos_locale_idx" ON "pages_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_testimonials_videos_video_idx" ON "pages_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_testimonials_order_idx" ON "pages_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_testimonials_parent_id_idx" ON "pages_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_testimonials_path_idx" ON "pages_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_testimonials_locale_idx" ON "pages_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_social_feed_stats_order_idx" ON "pages_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_feed_stats_parent_id_idx" ON "pages_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_feed_stats_locale_idx" ON "pages_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_social_feed_order_idx" ON "pages_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_feed_parent_id_idx" ON "pages_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_feed_path_idx" ON "pages_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_social_feed_locale_idx" ON "pages_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "pages_blocks_social_feed_background_image_idx" ON "pages_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_program_showcase_program_types_order_idx" ON "pages_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_program_showcase_program_types_parent_id_idx" ON "pages_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_program_showcase_program_types_locale_idx" ON "pages_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "pages_blocks_program_showcase_programs_order_idx" ON "pages_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "pages_blocks_program_showcase_programs_parent_id_idx" ON "pages_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_program_showcase_programs_locale_idx" ON "pages_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_program_showcase_programs_image_idx" ON "pages_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "pages_blocks_program_showcase_order_idx" ON "pages_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_program_showcase_parent_id_idx" ON "pages_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_program_showcase_path_idx" ON "pages_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_program_showcase_locale_idx" ON "pages_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founders_carousel_founders_order_idx" ON "pages_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "pages_blocks_founders_carousel_founders_parent_id_idx" ON "pages_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founders_carousel_founders_locale_idx" ON "pages_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founders_carousel_founders_photo_idx" ON "pages_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_founders_carousel_order_idx" ON "pages_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_founders_carousel_parent_id_idx" ON "pages_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founders_carousel_path_idx" ON "pages_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_founders_carousel_locale_idx" ON "pages_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_mission_stats_paragraphs_order_idx" ON "pages_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_stats_paragraphs_parent_id_idx" ON "pages_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_stats_paragraphs_locale_idx" ON "pages_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_mission_stats_stats_order_idx" ON "pages_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_stats_stats_parent_id_idx" ON "pages_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_stats_stats_locale_idx" ON "pages_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_mission_stats_order_idx" ON "pages_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_stats_parent_id_idx" ON "pages_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_stats_path_idx" ON "pages_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_mission_stats_locale_idx" ON "pages_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_values_list_values_order_idx" ON "pages_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_list_values_parent_id_idx" ON "pages_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_list_values_locale_idx" ON "pages_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "pages_blocks_values_list_order_idx" ON "pages_blocks_values_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_list_parent_id_idx" ON "pages_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_list_path_idx" ON "pages_blocks_values_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_list_locale_idx" ON "pages_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_text_testimonials_testimonials_order_idx" ON "pages_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_testimonials_testimonials_parent_id_idx" ON "pages_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_testimonials_testimonials_locale_idx" ON "pages_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_text_testimonials_testimonials_photo_idx" ON "pages_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_text_testimonials_order_idx" ON "pages_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_testimonials_parent_id_idx" ON "pages_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_testimonials_path_idx" ON "pages_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_testimonials_locale_idx" ON "pages_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_map_embed_supporting_paragraphs_order_idx" ON "pages_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "pages_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_embed_supporting_paragraphs_locale_idx" ON "pages_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_map_embed_order_idx" ON "pages_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_embed_parent_id_idx" ON "pages_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_embed_path_idx" ON "pages_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_embed_locale_idx" ON "pages_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "pages_blocks_map_embed_map_image_idx" ON "pages_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_form_idx" ON "pages_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "pages_blocks_address_list_offices_phones_order_idx" ON "pages_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "pages_blocks_address_list_offices_phones_parent_id_idx" ON "pages_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_address_list_offices_phones_locale_idx" ON "pages_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "pages_blocks_address_list_offices_order_idx" ON "pages_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_address_list_offices_parent_id_idx" ON "pages_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_address_list_offices_locale_idx" ON "pages_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "pages_blocks_address_list_order_idx" ON "pages_blocks_address_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_address_list_parent_id_idx" ON "pages_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_address_list_path_idx" ON "pages_blocks_address_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_address_list_locale_idx" ON "pages_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_with_image_grid_images_order_idx" ON "pages_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_with_image_grid_images_parent_id_idx" ON "pages_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_with_image_grid_images_locale_idx" ON "pages_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_with_image_grid_images_image_idx" ON "pages_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_with_image_grid_order_idx" ON "pages_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_with_image_grid_parent_id_idx" ON "pages_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_with_image_grid_path_idx" ON "pages_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_with_image_grid_locale_idx" ON "pages_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_memories_grid_order_idx" ON "pages_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_memories_grid_parent_id_idx" ON "pages_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_memories_grid_path_idx" ON "pages_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_memories_grid_locale_idx" ON "pages_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_education_stats_stats_order_idx" ON "pages_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_stats_stats_parent_id_idx" ON "pages_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_education_stats_stats_locale_idx" ON "pages_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_education_stats_order_idx" ON "pages_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_stats_parent_id_idx" ON "pages_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_education_stats_path_idx" ON "pages_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_education_stats_locale_idx" ON "pages_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_venture_grid_cards_order_idx" ON "pages_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_venture_grid_cards_parent_id_idx" ON "pages_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_venture_grid_cards_locale_idx" ON "pages_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_venture_grid_cards_image_idx" ON "pages_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_venture_grid_order_idx" ON "pages_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_venture_grid_parent_id_idx" ON "pages_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_venture_grid_path_idx" ON "pages_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_venture_grid_locale_idx" ON "pages_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_photo_grid_order_idx" ON "pages_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_grid_parent_id_idx" ON "pages_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_grid_path_idx" ON "pages_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_photo_grid_locale_idx" ON "pages_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_hero_order_idx" ON "pages_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_hero_parent_id_idx" ON "pages_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_hero_path_idx" ON "pages_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_hero_locale_idx" ON "pages_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_cta_order_idx" ON "pages_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_cta_parent_id_idx" ON "pages_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_cta_path_idx" ON "pages_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_cta_locale_idx" ON "pages_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_cta_form_idx" ON "pages_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_locale_idx" ON "pages_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_prompt_c_t_a_order_idx" ON "pages_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_prompt_c_t_a_parent_id_idx" ON "pages_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prompt_c_t_a_path_idx" ON "pages_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_prompt_c_t_a_locale_idx" ON "pages_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_prompt_c_t_a_image_idx" ON "pages_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "pages_blocks_related_items_items_order_idx" ON "pages_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_items_items_parent_id_idx" ON "pages_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_items_items_locale_idx" ON "pages_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_related_items_items_image_idx" ON "pages_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_related_items_order_idx" ON "pages_blocks_related_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_items_parent_id_idx" ON "pages_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_items_path_idx" ON "pages_blocks_related_items" USING btree ("_path");
  CREATE INDEX "pages_blocks_related_items_locale_idx" ON "pages_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_open_graph_open_graph_image_idx" ON "pages" USING btree ("open_graph_image_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_full_path_idx" ON "pages" USING btree ("full_path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_blog_id_idx" ON "pages_rels" USING btree ("blog_id","locale");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id","locale");
  CREATE INDEX "_pages_v_blocks_hero_home_opportunities_order_idx" ON "_pages_v_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_home_opportunities_parent_id_idx" ON "_pages_v_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_home_opportunities_locale_idx" ON "_pages_v_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_home_order_idx" ON "_pages_v_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_home_parent_id_idx" ON "_pages_v_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_home_path_idx" ON "_pages_v_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_home_locale_idx" ON "_pages_v_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_home_background_image_idx" ON "_pages_v_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "_tdsts_v_images_order_idx" ON "_tdsts_v_images" USING btree ("_order");
  CREATE INDEX "_tdsts_v_images_parent_id_idx" ON "_tdsts_v_images" USING btree ("_parent_id");
  CREATE INDEX "_tdsts_v_images_locale_idx" ON "_tdsts_v_images" USING btree ("_locale");
  CREATE INDEX "_tdsts_v_images_image_idx" ON "_tdsts_v_images" USING btree ("image_id");
  CREATE INDEX "_tdsts_v_order_idx" ON "_tdsts_v" USING btree ("_order");
  CREATE INDEX "_tdsts_v_parent_id_idx" ON "_tdsts_v" USING btree ("_parent_id");
  CREATE INDEX "_tdsts_v_path_idx" ON "_tdsts_v" USING btree ("_path");
  CREATE INDEX "_tdsts_v_locale_idx" ON "_tdsts_v" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_actions_order_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_actions_parent_id_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_locale_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_locale_idx" ON "_pages_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_locale_idx" ON "_pages_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_locale_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_actions_order_idx" ON "_pages_v_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_actions_parent_id_idx" ON "_pages_v_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_actions_locale_idx" ON "_pages_v_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_background_image_idx" ON "_pages_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_image_feature_order_idx" ON "_pages_v_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_feature_parent_id_idx" ON "_pages_v_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_feature_path_idx" ON "_pages_v_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_feature_locale_idx" ON "_pages_v_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_feature_image_idx" ON "_pages_v_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_order_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_parent_id_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_locale_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_image_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_order_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_parent_id_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_path_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_showcase_locale_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_top_images_order_idx" ON "_pages_v_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "_pages_v_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_top_images_locale_idx" ON "_pages_v_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_top_images_image_idx" ON "_pages_v_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_bottom_images_order_idx" ON "_pages_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "_pages_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "_pages_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_bottom_images_image_idx" ON "_pages_v_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_order_idx" ON "_pages_v_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_parent_id_idx" ON "_pages_v_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_path_idx" ON "_pages_v_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_decorated_c_t_a_locale_idx" ON "_pages_v_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_partners_carousel_partners_order_idx" ON "_pages_v_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_carousel_partners_parent_id_idx" ON "_pages_v_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_carousel_partners_locale_idx" ON "_pages_v_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_partners_carousel_partners_logo_idx" ON "_pages_v_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_partners_carousel_order_idx" ON "_pages_v_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_carousel_parent_id_idx" ON "_pages_v_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_carousel_path_idx" ON "_pages_v_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partners_carousel_locale_idx" ON "_pages_v_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_partners_carousel_story_image_idx" ON "_pages_v_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_order_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_locale_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_image_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_order_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_path_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_cards_locale_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_alternating_content_rows_order_idx" ON "_pages_v_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alternating_content_rows_parent_id_idx" ON "_pages_v_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alternating_content_rows_locale_idx" ON "_pages_v_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_alternating_content_rows_image_idx" ON "_pages_v_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_alternating_content_order_idx" ON "_pages_v_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alternating_content_parent_id_idx" ON "_pages_v_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alternating_content_path_idx" ON "_pages_v_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_alternating_content_locale_idx" ON "_pages_v_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_blog_posts_list_order_idx" ON "_pages_v_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_posts_list_parent_id_idx" ON "_pages_v_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_posts_list_path_idx" ON "_pages_v_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_posts_list_locale_idx" ON "_pages_v_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_testimonials_videos_order_idx" ON "_pages_v_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_testimonials_videos_parent_id_idx" ON "_pages_v_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_testimonials_videos_locale_idx" ON "_pages_v_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_testimonials_videos_video_idx" ON "_pages_v_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_testimonials_order_idx" ON "_pages_v_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_testimonials_parent_id_idx" ON "_pages_v_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_testimonials_path_idx" ON "_pages_v_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_testimonials_locale_idx" ON "_pages_v_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_social_feed_stats_order_idx" ON "_pages_v_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_feed_stats_parent_id_idx" ON "_pages_v_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_feed_stats_locale_idx" ON "_pages_v_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_social_feed_order_idx" ON "_pages_v_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_feed_parent_id_idx" ON "_pages_v_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_feed_path_idx" ON "_pages_v_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_social_feed_locale_idx" ON "_pages_v_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_social_feed_background_image_idx" ON "_pages_v_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_program_showcase_program_types_order_idx" ON "_pages_v_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_program_showcase_program_types_parent_id_idx" ON "_pages_v_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_program_showcase_program_types_locale_idx" ON "_pages_v_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_program_showcase_programs_order_idx" ON "_pages_v_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_program_showcase_programs_parent_id_idx" ON "_pages_v_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_program_showcase_programs_locale_idx" ON "_pages_v_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_program_showcase_programs_image_idx" ON "_pages_v_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_program_showcase_order_idx" ON "_pages_v_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_program_showcase_parent_id_idx" ON "_pages_v_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_program_showcase_path_idx" ON "_pages_v_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_program_showcase_locale_idx" ON "_pages_v_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_founders_carousel_founders_order_idx" ON "_pages_v_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founders_carousel_founders_parent_id_idx" ON "_pages_v_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founders_carousel_founders_locale_idx" ON "_pages_v_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_founders_carousel_founders_photo_idx" ON "_pages_v_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_founders_carousel_order_idx" ON "_pages_v_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founders_carousel_parent_id_idx" ON "_pages_v_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founders_carousel_path_idx" ON "_pages_v_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founders_carousel_locale_idx" ON "_pages_v_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_mission_stats_paragraphs_order_idx" ON "_pages_v_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_stats_paragraphs_parent_id_idx" ON "_pages_v_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_stats_paragraphs_locale_idx" ON "_pages_v_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_mission_stats_stats_order_idx" ON "_pages_v_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_stats_stats_parent_id_idx" ON "_pages_v_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_stats_stats_locale_idx" ON "_pages_v_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_mission_stats_order_idx" ON "_pages_v_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_stats_parent_id_idx" ON "_pages_v_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_stats_path_idx" ON "_pages_v_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_mission_stats_locale_idx" ON "_pages_v_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_values_list_values_order_idx" ON "_pages_v_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_list_values_parent_id_idx" ON "_pages_v_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_list_values_locale_idx" ON "_pages_v_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_values_list_order_idx" ON "_pages_v_blocks_values_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_list_parent_id_idx" ON "_pages_v_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_list_path_idx" ON "_pages_v_blocks_values_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_list_locale_idx" ON "_pages_v_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_text_testimonials_testimonials_order_idx" ON "_pages_v_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_testimonials_testimonials_locale_idx" ON "_pages_v_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_text_testimonials_testimonials_photo_idx" ON "_pages_v_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_text_testimonials_order_idx" ON "_pages_v_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_testimonials_parent_id_idx" ON "_pages_v_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_testimonials_path_idx" ON "_pages_v_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_testimonials_locale_idx" ON "_pages_v_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_map_embed_supporting_paragraphs_order_idx" ON "_pages_v_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "_pages_v_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_embed_supporting_paragraphs_locale_idx" ON "_pages_v_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_map_embed_order_idx" ON "_pages_v_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_embed_parent_id_idx" ON "_pages_v_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_embed_path_idx" ON "_pages_v_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_embed_locale_idx" ON "_pages_v_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_map_embed_map_image_idx" ON "_pages_v_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_locale_idx" ON "_pages_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_form_idx" ON "_pages_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_address_list_offices_phones_order_idx" ON "_pages_v_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_address_list_offices_phones_parent_id_idx" ON "_pages_v_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_address_list_offices_phones_locale_idx" ON "_pages_v_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_address_list_offices_order_idx" ON "_pages_v_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_address_list_offices_parent_id_idx" ON "_pages_v_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_address_list_offices_locale_idx" ON "_pages_v_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_address_list_order_idx" ON "_pages_v_blocks_address_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_address_list_parent_id_idx" ON "_pages_v_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_address_list_path_idx" ON "_pages_v_blocks_address_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_address_list_locale_idx" ON "_pages_v_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_images_order_idx" ON "_pages_v_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_images_parent_id_idx" ON "_pages_v_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_images_locale_idx" ON "_pages_v_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_images_image_idx" ON "_pages_v_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_order_idx" ON "_pages_v_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_parent_id_idx" ON "_pages_v_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_path_idx" ON "_pages_v_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_with_image_grid_locale_idx" ON "_pages_v_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_memories_grid_order_idx" ON "_pages_v_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_memories_grid_parent_id_idx" ON "_pages_v_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_memories_grid_path_idx" ON "_pages_v_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_memories_grid_locale_idx" ON "_pages_v_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_education_stats_stats_order_idx" ON "_pages_v_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_education_stats_stats_parent_id_idx" ON "_pages_v_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_education_stats_stats_locale_idx" ON "_pages_v_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_education_stats_order_idx" ON "_pages_v_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_education_stats_parent_id_idx" ON "_pages_v_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_education_stats_path_idx" ON "_pages_v_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_education_stats_locale_idx" ON "_pages_v_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_venture_grid_cards_order_idx" ON "_pages_v_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_venture_grid_cards_parent_id_idx" ON "_pages_v_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_venture_grid_cards_locale_idx" ON "_pages_v_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_venture_grid_cards_image_idx" ON "_pages_v_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_venture_grid_order_idx" ON "_pages_v_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_venture_grid_parent_id_idx" ON "_pages_v_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_venture_grid_path_idx" ON "_pages_v_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_venture_grid_locale_idx" ON "_pages_v_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_photo_grid_order_idx" ON "_pages_v_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_grid_parent_id_idx" ON "_pages_v_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_grid_path_idx" ON "_pages_v_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_photo_grid_locale_idx" ON "_pages_v_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_hero_order_idx" ON "_pages_v_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_hero_parent_id_idx" ON "_pages_v_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_hero_path_idx" ON "_pages_v_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_hero_locale_idx" ON "_pages_v_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_cta_order_idx" ON "_pages_v_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_cta_parent_id_idx" ON "_pages_v_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_cta_path_idx" ON "_pages_v_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_cta_locale_idx" ON "_pages_v_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_cta_form_idx" ON "_pages_v_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_locale_idx" ON "_pages_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_prompt_c_t_a_order_idx" ON "_pages_v_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prompt_c_t_a_parent_id_idx" ON "_pages_v_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prompt_c_t_a_path_idx" ON "_pages_v_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_prompt_c_t_a_locale_idx" ON "_pages_v_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_prompt_c_t_a_image_idx" ON "_pages_v_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_related_items_items_order_idx" ON "_pages_v_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_related_items_items_parent_id_idx" ON "_pages_v_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_related_items_items_locale_idx" ON "_pages_v_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_related_items_items_image_idx" ON "_pages_v_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_related_items_order_idx" ON "_pages_v_blocks_related_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_related_items_parent_id_idx" ON "_pages_v_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_related_items_path_idx" ON "_pages_v_blocks_related_items" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_related_items_locale_idx" ON "_pages_v_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_open_graph_version_open_graph_image_idx" ON "_pages_v" USING btree ("version_open_graph_image_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_full_path_idx" ON "_pages_v" USING btree ("version_full_path");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_blog_id_idx" ON "_pages_v_rels" USING btree ("blog_id","locale");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id","locale");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_to_to_page_idx" ON "redirects" USING btree ("to_page_id");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "program_types_blocks_hero_actions_order_idx" ON "program_types_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_actions_parent_id_idx" ON "program_types_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_actions_locale_idx" ON "program_types_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_order_idx" ON "program_types_blocks_hero" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_parent_id_idx" ON "program_types_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_path_idx" ON "program_types_blocks_hero" USING btree ("_path");
  CREATE INDEX "program_types_blocks_hero_locale_idx" ON "program_types_blocks_hero" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_media_idx" ON "program_types_blocks_hero" USING btree ("media_id");
  CREATE INDEX "program_types_blocks_hero_home_opportunities_order_idx" ON "program_types_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_home_opportunities_parent_id_idx" ON "program_types_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_home_opportunities_locale_idx" ON "program_types_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_home_order_idx" ON "program_types_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_home_parent_id_idx" ON "program_types_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_home_path_idx" ON "program_types_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "program_types_blocks_hero_home_locale_idx" ON "program_types_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_home_background_image_idx" ON "program_types_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "program_types_blocks_rich_text_order_idx" ON "program_types_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "program_types_blocks_rich_text_parent_id_idx" ON "program_types_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_rich_text_path_idx" ON "program_types_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "program_types_blocks_rich_text_locale_idx" ON "program_types_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_content_columns_order_idx" ON "program_types_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "program_types_blocks_content_columns_parent_id_idx" ON "program_types_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_content_columns_locale_idx" ON "program_types_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_content_order_idx" ON "program_types_blocks_content" USING btree ("_order");
  CREATE INDEX "program_types_blocks_content_parent_id_idx" ON "program_types_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_content_path_idx" ON "program_types_blocks_content" USING btree ("_path");
  CREATE INDEX "program_types_blocks_content_locale_idx" ON "program_types_blocks_content" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_gallery_images_order_idx" ON "program_types_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "program_types_blocks_gallery_images_parent_id_idx" ON "program_types_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_gallery_images_locale_idx" ON "program_types_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_gallery_images_image_idx" ON "program_types_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_gallery_order_idx" ON "program_types_blocks_gallery" USING btree ("_order");
  CREATE INDEX "program_types_blocks_gallery_parent_id_idx" ON "program_types_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_gallery_path_idx" ON "program_types_blocks_gallery" USING btree ("_path");
  CREATE INDEX "program_types_blocks_gallery_locale_idx" ON "program_types_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_faq_items_order_idx" ON "program_types_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "program_types_blocks_faq_items_parent_id_idx" ON "program_types_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_faq_items_locale_idx" ON "program_types_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_faq_order_idx" ON "program_types_blocks_faq" USING btree ("_order");
  CREATE INDEX "program_types_blocks_faq_parent_id_idx" ON "program_types_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_faq_path_idx" ON "program_types_blocks_faq" USING btree ("_path");
  CREATE INDEX "program_types_blocks_faq_locale_idx" ON "program_types_blocks_faq" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_cta_actions_order_idx" ON "program_types_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "program_types_blocks_cta_actions_parent_id_idx" ON "program_types_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_cta_actions_locale_idx" ON "program_types_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_cta_order_idx" ON "program_types_blocks_cta" USING btree ("_order");
  CREATE INDEX "program_types_blocks_cta_parent_id_idx" ON "program_types_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_cta_path_idx" ON "program_types_blocks_cta" USING btree ("_path");
  CREATE INDEX "program_types_blocks_cta_locale_idx" ON "program_types_blocks_cta" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_cta_background_image_idx" ON "program_types_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "program_types_blocks_image_feature_order_idx" ON "program_types_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "program_types_blocks_image_feature_parent_id_idx" ON "program_types_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_image_feature_path_idx" ON "program_types_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "program_types_blocks_image_feature_locale_idx" ON "program_types_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_image_feature_image_idx" ON "program_types_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_media_showcase_items_order_idx" ON "program_types_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "program_types_blocks_media_showcase_items_parent_id_idx" ON "program_types_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_media_showcase_items_locale_idx" ON "program_types_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_media_showcase_items_image_idx" ON "program_types_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_media_showcase_order_idx" ON "program_types_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "program_types_blocks_media_showcase_parent_id_idx" ON "program_types_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_media_showcase_path_idx" ON "program_types_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "program_types_blocks_media_showcase_locale_idx" ON "program_types_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_top_images_order_idx" ON "program_types_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "program_types_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_top_images_locale_idx" ON "program_types_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_top_images_image_idx" ON "program_types_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_bottom_images_order_idx" ON "program_types_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "program_types_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "program_types_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_bottom_images_image_idx" ON "program_types_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_order_idx" ON "program_types_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_parent_id_idx" ON "program_types_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_path_idx" ON "program_types_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "program_types_blocks_decorated_c_t_a_locale_idx" ON "program_types_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_partners_carousel_partners_order_idx" ON "program_types_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "program_types_blocks_partners_carousel_partners_parent_id_idx" ON "program_types_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_partners_carousel_partners_locale_idx" ON "program_types_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_partners_carousel_partners_logo_idx" ON "program_types_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "program_types_blocks_partners_carousel_order_idx" ON "program_types_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "program_types_blocks_partners_carousel_parent_id_idx" ON "program_types_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_partners_carousel_path_idx" ON "program_types_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "program_types_blocks_partners_carousel_locale_idx" ON "program_types_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_partners_carousel_story_image_idx" ON "program_types_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "program_types_blocks_feature_cards_cards_order_idx" ON "program_types_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "program_types_blocks_feature_cards_cards_parent_id_idx" ON "program_types_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_feature_cards_cards_locale_idx" ON "program_types_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_feature_cards_cards_image_idx" ON "program_types_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_feature_cards_order_idx" ON "program_types_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "program_types_blocks_feature_cards_parent_id_idx" ON "program_types_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_feature_cards_path_idx" ON "program_types_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "program_types_blocks_feature_cards_locale_idx" ON "program_types_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_alternating_content_rows_order_idx" ON "program_types_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "program_types_blocks_alternating_content_rows_parent_id_idx" ON "program_types_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_alternating_content_rows_locale_idx" ON "program_types_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_alternating_content_rows_image_idx" ON "program_types_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_alternating_content_order_idx" ON "program_types_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "program_types_blocks_alternating_content_parent_id_idx" ON "program_types_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_alternating_content_path_idx" ON "program_types_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "program_types_blocks_alternating_content_locale_idx" ON "program_types_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_blog_posts_list_order_idx" ON "program_types_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "program_types_blocks_blog_posts_list_parent_id_idx" ON "program_types_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_blog_posts_list_path_idx" ON "program_types_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "program_types_blocks_blog_posts_list_locale_idx" ON "program_types_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_video_testimonials_videos_order_idx" ON "program_types_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "program_types_blocks_video_testimonials_videos_parent_id_idx" ON "program_types_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_video_testimonials_videos_locale_idx" ON "program_types_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_video_testimonials_videos_video_idx" ON "program_types_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "program_types_blocks_video_testimonials_order_idx" ON "program_types_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "program_types_blocks_video_testimonials_parent_id_idx" ON "program_types_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_video_testimonials_path_idx" ON "program_types_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "program_types_blocks_video_testimonials_locale_idx" ON "program_types_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_social_feed_stats_order_idx" ON "program_types_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "program_types_blocks_social_feed_stats_parent_id_idx" ON "program_types_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_social_feed_stats_locale_idx" ON "program_types_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_social_feed_order_idx" ON "program_types_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "program_types_blocks_social_feed_parent_id_idx" ON "program_types_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_social_feed_path_idx" ON "program_types_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "program_types_blocks_social_feed_locale_idx" ON "program_types_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_social_feed_background_image_idx" ON "program_types_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "program_types_blocks_program_showcase_program_types_order_idx" ON "program_types_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "program_types_blocks_program_showcase_program_types_parent_id_idx" ON "program_types_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_program_showcase_program_types_locale_idx" ON "program_types_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_program_showcase_programs_order_idx" ON "program_types_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "program_types_blocks_program_showcase_programs_parent_id_idx" ON "program_types_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_program_showcase_programs_locale_idx" ON "program_types_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_program_showcase_programs_image_idx" ON "program_types_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_program_showcase_order_idx" ON "program_types_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "program_types_blocks_program_showcase_parent_id_idx" ON "program_types_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_program_showcase_path_idx" ON "program_types_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "program_types_blocks_program_showcase_locale_idx" ON "program_types_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_founders_carousel_founders_order_idx" ON "program_types_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "program_types_blocks_founders_carousel_founders_parent_id_idx" ON "program_types_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_founders_carousel_founders_locale_idx" ON "program_types_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_founders_carousel_founders_photo_idx" ON "program_types_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "program_types_blocks_founders_carousel_order_idx" ON "program_types_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "program_types_blocks_founders_carousel_parent_id_idx" ON "program_types_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_founders_carousel_path_idx" ON "program_types_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "program_types_blocks_founders_carousel_locale_idx" ON "program_types_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_mission_stats_paragraphs_order_idx" ON "program_types_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "program_types_blocks_mission_stats_paragraphs_parent_id_idx" ON "program_types_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_mission_stats_paragraphs_locale_idx" ON "program_types_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_mission_stats_stats_order_idx" ON "program_types_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "program_types_blocks_mission_stats_stats_parent_id_idx" ON "program_types_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_mission_stats_stats_locale_idx" ON "program_types_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_mission_stats_order_idx" ON "program_types_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "program_types_blocks_mission_stats_parent_id_idx" ON "program_types_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_mission_stats_path_idx" ON "program_types_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "program_types_blocks_mission_stats_locale_idx" ON "program_types_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_values_list_values_order_idx" ON "program_types_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "program_types_blocks_values_list_values_parent_id_idx" ON "program_types_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_values_list_values_locale_idx" ON "program_types_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_values_list_order_idx" ON "program_types_blocks_values_list" USING btree ("_order");
  CREATE INDEX "program_types_blocks_values_list_parent_id_idx" ON "program_types_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_values_list_path_idx" ON "program_types_blocks_values_list" USING btree ("_path");
  CREATE INDEX "program_types_blocks_values_list_locale_idx" ON "program_types_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_text_testimonials_testimonials_order_idx" ON "program_types_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "program_types_blocks_text_testimonials_testimonials_parent_id_idx" ON "program_types_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_text_testimonials_testimonials_locale_idx" ON "program_types_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_text_testimonials_testimonials_phot_idx" ON "program_types_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "program_types_blocks_text_testimonials_order_idx" ON "program_types_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "program_types_blocks_text_testimonials_parent_id_idx" ON "program_types_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_text_testimonials_path_idx" ON "program_types_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "program_types_blocks_text_testimonials_locale_idx" ON "program_types_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_map_embed_supporting_paragraphs_order_idx" ON "program_types_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "program_types_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "program_types_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_map_embed_supporting_paragraphs_locale_idx" ON "program_types_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_map_embed_order_idx" ON "program_types_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "program_types_blocks_map_embed_parent_id_idx" ON "program_types_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_map_embed_path_idx" ON "program_types_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "program_types_blocks_map_embed_locale_idx" ON "program_types_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_map_embed_map_image_idx" ON "program_types_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "program_types_blocks_contact_form_order_idx" ON "program_types_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "program_types_blocks_contact_form_parent_id_idx" ON "program_types_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_contact_form_path_idx" ON "program_types_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "program_types_blocks_contact_form_locale_idx" ON "program_types_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_contact_form_form_idx" ON "program_types_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "program_types_blocks_address_list_offices_phones_order_idx" ON "program_types_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "program_types_blocks_address_list_offices_phones_parent_id_idx" ON "program_types_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_address_list_offices_phones_locale_idx" ON "program_types_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_address_list_offices_order_idx" ON "program_types_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "program_types_blocks_address_list_offices_parent_id_idx" ON "program_types_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_address_list_offices_locale_idx" ON "program_types_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_address_list_order_idx" ON "program_types_blocks_address_list" USING btree ("_order");
  CREATE INDEX "program_types_blocks_address_list_parent_id_idx" ON "program_types_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_address_list_path_idx" ON "program_types_blocks_address_list" USING btree ("_path");
  CREATE INDEX "program_types_blocks_address_list_locale_idx" ON "program_types_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_images_order_idx" ON "program_types_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_images_parent_id_idx" ON "program_types_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_images_locale_idx" ON "program_types_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_images_image_idx" ON "program_types_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_order_idx" ON "program_types_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_parent_id_idx" ON "program_types_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_path_idx" ON "program_types_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "program_types_blocks_hero_with_image_grid_locale_idx" ON "program_types_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_prompt_c_t_a_order_idx" ON "program_types_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "program_types_blocks_prompt_c_t_a_parent_id_idx" ON "program_types_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_prompt_c_t_a_path_idx" ON "program_types_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "program_types_blocks_prompt_c_t_a_locale_idx" ON "program_types_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_prompt_c_t_a_image_idx" ON "program_types_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_related_items_items_order_idx" ON "program_types_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "program_types_blocks_related_items_items_parent_id_idx" ON "program_types_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_related_items_items_locale_idx" ON "program_types_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_related_items_items_image_idx" ON "program_types_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_related_items_order_idx" ON "program_types_blocks_related_items" USING btree ("_order");
  CREATE INDEX "program_types_blocks_related_items_parent_id_idx" ON "program_types_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_related_items_path_idx" ON "program_types_blocks_related_items" USING btree ("_path");
  CREATE INDEX "program_types_blocks_related_items_locale_idx" ON "program_types_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_memories_grid_order_idx" ON "program_types_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "program_types_blocks_memories_grid_parent_id_idx" ON "program_types_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_memories_grid_path_idx" ON "program_types_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "program_types_blocks_memories_grid_locale_idx" ON "program_types_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_education_stats_stats_order_idx" ON "program_types_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "program_types_blocks_education_stats_stats_parent_id_idx" ON "program_types_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_education_stats_stats_locale_idx" ON "program_types_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_education_stats_order_idx" ON "program_types_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "program_types_blocks_education_stats_parent_id_idx" ON "program_types_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_education_stats_path_idx" ON "program_types_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "program_types_blocks_education_stats_locale_idx" ON "program_types_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_venture_grid_cards_order_idx" ON "program_types_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "program_types_blocks_venture_grid_cards_parent_id_idx" ON "program_types_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_venture_grid_cards_locale_idx" ON "program_types_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_venture_grid_cards_image_idx" ON "program_types_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "program_types_blocks_venture_grid_order_idx" ON "program_types_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "program_types_blocks_venture_grid_parent_id_idx" ON "program_types_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_venture_grid_path_idx" ON "program_types_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "program_types_blocks_venture_grid_locale_idx" ON "program_types_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_photo_grid_order_idx" ON "program_types_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "program_types_blocks_photo_grid_parent_id_idx" ON "program_types_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_photo_grid_path_idx" ON "program_types_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "program_types_blocks_photo_grid_locale_idx" ON "program_types_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_gallery_hero_order_idx" ON "program_types_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "program_types_blocks_gallery_hero_parent_id_idx" ON "program_types_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_gallery_hero_path_idx" ON "program_types_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "program_types_blocks_gallery_hero_locale_idx" ON "program_types_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_gallery_cta_order_idx" ON "program_types_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "program_types_blocks_gallery_cta_parent_id_idx" ON "program_types_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_gallery_cta_path_idx" ON "program_types_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "program_types_blocks_gallery_cta_locale_idx" ON "program_types_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_gallery_cta_form_idx" ON "program_types_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "program_types_blocks_form_block_order_idx" ON "program_types_blocks_form_block" USING btree ("_order");
  CREATE INDEX "program_types_blocks_form_block_parent_id_idx" ON "program_types_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "program_types_blocks_form_block_path_idx" ON "program_types_blocks_form_block" USING btree ("_path");
  CREATE INDEX "program_types_blocks_form_block_locale_idx" ON "program_types_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "program_types_blocks_form_block_form_idx" ON "program_types_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pl_filters_by_country_order_idx" ON "pl_filters_by_country" USING btree ("order");
  CREATE INDEX "pl_filters_by_country_parent_idx" ON "pl_filters_by_country" USING btree ("parent_id");
  CREATE INDEX "pl_filters_by_country_locale_idx" ON "pl_filters_by_country" USING btree ("locale");
  CREATE INDEX "pl_order_idx" ON "pl" USING btree ("_order");
  CREATE INDEX "pl_parent_id_idx" ON "pl" USING btree ("_parent_id");
  CREATE INDEX "pl_path_idx" ON "pl" USING btree ("_path");
  CREATE INDEX "pl_locale_idx" ON "pl" USING btree ("_locale");
  CREATE INDEX "program_types_application_form_idx" ON "program_types" USING btree ("application_form_id");
  CREATE INDEX "program_types_icon_idx" ON "program_types" USING btree ("icon_id");
  CREATE INDEX "program_types_featured_image_idx" ON "program_types" USING btree ("featured_image_id");
  CREATE INDEX "program_types_meta_meta_image_idx" ON "program_types" USING btree ("meta_image_id");
  CREATE INDEX "program_types_open_graph_open_graph_image_idx" ON "program_types" USING btree ("open_graph_image_id");
  CREATE UNIQUE INDEX "program_types_slug_idx" ON "program_types" USING btree ("slug");
  CREATE INDEX "program_types_updated_at_idx" ON "program_types" USING btree ("updated_at");
  CREATE INDEX "program_types_created_at_idx" ON "program_types" USING btree ("created_at");
  CREATE INDEX "program_types__status_idx" ON "program_types" USING btree ("_status");
  CREATE UNIQUE INDEX "program_types_locales_locale_parent_id_unique" ON "program_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "program_types_rels_order_idx" ON "program_types_rels" USING btree ("order");
  CREATE INDEX "program_types_rels_parent_idx" ON "program_types_rels" USING btree ("parent_id");
  CREATE INDEX "program_types_rels_path_idx" ON "program_types_rels" USING btree ("path");
  CREATE INDEX "program_types_rels_locale_idx" ON "program_types_rels" USING btree ("locale");
  CREATE INDEX "program_types_rels_blog_id_idx" ON "program_types_rels" USING btree ("blog_id","locale");
  CREATE INDEX "program_types_rels_media_id_idx" ON "program_types_rels" USING btree ("media_id","locale");
  CREATE INDEX "program_types_rels_programs_id_idx" ON "program_types_rels" USING btree ("programs_id","locale");
  CREATE INDEX "program_types_rels_program_types_id_idx" ON "program_types_rels" USING btree ("program_types_id","locale");
  CREATE INDEX "_program_types_v_blocks_hero_actions_order_idx" ON "_program_types_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_actions_parent_id_idx" ON "_program_types_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_actions_locale_idx" ON "_program_types_v_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_order_idx" ON "_program_types_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_parent_id_idx" ON "_program_types_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_path_idx" ON "_program_types_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_hero_locale_idx" ON "_program_types_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_media_idx" ON "_program_types_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_program_types_v_blocks_hero_home_opportunities_order_idx" ON "_program_types_v_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_home_opportunities_parent_id_idx" ON "_program_types_v_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_home_opportunities_locale_idx" ON "_program_types_v_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_home_order_idx" ON "_program_types_v_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_home_parent_id_idx" ON "_program_types_v_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_home_path_idx" ON "_program_types_v_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_hero_home_locale_idx" ON "_program_types_v_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_home_background_image_idx" ON "_program_types_v_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "_program_types_v_blocks_rich_text_order_idx" ON "_program_types_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_rich_text_parent_id_idx" ON "_program_types_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_rich_text_path_idx" ON "_program_types_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_rich_text_locale_idx" ON "_program_types_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_content_columns_order_idx" ON "_program_types_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_content_columns_parent_id_idx" ON "_program_types_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_content_columns_locale_idx" ON "_program_types_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_content_order_idx" ON "_program_types_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_content_parent_id_idx" ON "_program_types_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_content_path_idx" ON "_program_types_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_content_locale_idx" ON "_program_types_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_gallery_images_order_idx" ON "_program_types_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_gallery_images_parent_id_idx" ON "_program_types_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_gallery_images_locale_idx" ON "_program_types_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_gallery_images_image_idx" ON "_program_types_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_gallery_order_idx" ON "_program_types_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_gallery_parent_id_idx" ON "_program_types_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_gallery_path_idx" ON "_program_types_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_gallery_locale_idx" ON "_program_types_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_faq_items_order_idx" ON "_program_types_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_faq_items_parent_id_idx" ON "_program_types_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_faq_items_locale_idx" ON "_program_types_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_faq_order_idx" ON "_program_types_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_faq_parent_id_idx" ON "_program_types_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_faq_path_idx" ON "_program_types_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_faq_locale_idx" ON "_program_types_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_cta_actions_order_idx" ON "_program_types_v_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_cta_actions_parent_id_idx" ON "_program_types_v_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_cta_actions_locale_idx" ON "_program_types_v_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_cta_order_idx" ON "_program_types_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_cta_parent_id_idx" ON "_program_types_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_cta_path_idx" ON "_program_types_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_cta_locale_idx" ON "_program_types_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_cta_background_image_idx" ON "_program_types_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_program_types_v_blocks_image_feature_order_idx" ON "_program_types_v_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_image_feature_parent_id_idx" ON "_program_types_v_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_image_feature_path_idx" ON "_program_types_v_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_image_feature_locale_idx" ON "_program_types_v_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_image_feature_image_idx" ON "_program_types_v_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_media_showcase_items_order_idx" ON "_program_types_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_media_showcase_items_parent_id_idx" ON "_program_types_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_media_showcase_items_locale_idx" ON "_program_types_v_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_media_showcase_items_image_idx" ON "_program_types_v_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_media_showcase_order_idx" ON "_program_types_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_media_showcase_parent_id_idx" ON "_program_types_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_media_showcase_path_idx" ON "_program_types_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_media_showcase_locale_idx" ON "_program_types_v_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_top_images_order_idx" ON "_program_types_v_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "_program_types_v_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_top_images_locale_idx" ON "_program_types_v_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_top_images_image_idx" ON "_program_types_v_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_bottom_images_order_idx" ON "_program_types_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "_program_types_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "_program_types_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_bottom_images_im_idx" ON "_program_types_v_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_order_idx" ON "_program_types_v_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_parent_id_idx" ON "_program_types_v_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_path_idx" ON "_program_types_v_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_decorated_c_t_a_locale_idx" ON "_program_types_v_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_partners_order_idx" ON "_program_types_v_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_partners_parent_id_idx" ON "_program_types_v_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_partners_locale_idx" ON "_program_types_v_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_partners_logo_idx" ON "_program_types_v_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_order_idx" ON "_program_types_v_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_parent_id_idx" ON "_program_types_v_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_path_idx" ON "_program_types_v_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_locale_idx" ON "_program_types_v_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_partners_carousel_story_image_idx" ON "_program_types_v_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "_program_types_v_blocks_feature_cards_cards_order_idx" ON "_program_types_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_feature_cards_cards_parent_id_idx" ON "_program_types_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_feature_cards_cards_locale_idx" ON "_program_types_v_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_feature_cards_cards_image_idx" ON "_program_types_v_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_feature_cards_order_idx" ON "_program_types_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_feature_cards_parent_id_idx" ON "_program_types_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_feature_cards_path_idx" ON "_program_types_v_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_feature_cards_locale_idx" ON "_program_types_v_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_alternating_content_rows_order_idx" ON "_program_types_v_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_alternating_content_rows_parent_id_idx" ON "_program_types_v_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_alternating_content_rows_locale_idx" ON "_program_types_v_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_alternating_content_rows_image_idx" ON "_program_types_v_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_alternating_content_order_idx" ON "_program_types_v_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_alternating_content_parent_id_idx" ON "_program_types_v_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_alternating_content_path_idx" ON "_program_types_v_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_alternating_content_locale_idx" ON "_program_types_v_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_blog_posts_list_order_idx" ON "_program_types_v_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_blog_posts_list_parent_id_idx" ON "_program_types_v_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_blog_posts_list_path_idx" ON "_program_types_v_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_blog_posts_list_locale_idx" ON "_program_types_v_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_videos_order_idx" ON "_program_types_v_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_videos_parent_id_idx" ON "_program_types_v_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_videos_locale_idx" ON "_program_types_v_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_videos_video_idx" ON "_program_types_v_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_order_idx" ON "_program_types_v_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_parent_id_idx" ON "_program_types_v_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_path_idx" ON "_program_types_v_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_video_testimonials_locale_idx" ON "_program_types_v_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_social_feed_stats_order_idx" ON "_program_types_v_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_social_feed_stats_parent_id_idx" ON "_program_types_v_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_social_feed_stats_locale_idx" ON "_program_types_v_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_social_feed_order_idx" ON "_program_types_v_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_social_feed_parent_id_idx" ON "_program_types_v_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_social_feed_path_idx" ON "_program_types_v_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_social_feed_locale_idx" ON "_program_types_v_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_social_feed_background_image_idx" ON "_program_types_v_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "_program_types_v_blocks_program_showcase_program_types_order_idx" ON "_program_types_v_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_program_showcase_program_types_parent_id_idx" ON "_program_types_v_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_program_showcase_program_types_locale_idx" ON "_program_types_v_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_program_showcase_programs_order_idx" ON "_program_types_v_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_program_showcase_programs_parent_id_idx" ON "_program_types_v_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_program_showcase_programs_locale_idx" ON "_program_types_v_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_program_showcase_programs_image_idx" ON "_program_types_v_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_program_showcase_order_idx" ON "_program_types_v_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_program_showcase_parent_id_idx" ON "_program_types_v_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_program_showcase_path_idx" ON "_program_types_v_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_program_showcase_locale_idx" ON "_program_types_v_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_founders_order_idx" ON "_program_types_v_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_founders_parent_id_idx" ON "_program_types_v_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_founders_locale_idx" ON "_program_types_v_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_founders_photo_idx" ON "_program_types_v_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_order_idx" ON "_program_types_v_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_parent_id_idx" ON "_program_types_v_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_path_idx" ON "_program_types_v_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_founders_carousel_locale_idx" ON "_program_types_v_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_mission_stats_paragraphs_order_idx" ON "_program_types_v_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_mission_stats_paragraphs_parent_id_idx" ON "_program_types_v_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_mission_stats_paragraphs_locale_idx" ON "_program_types_v_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_mission_stats_stats_order_idx" ON "_program_types_v_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_mission_stats_stats_parent_id_idx" ON "_program_types_v_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_mission_stats_stats_locale_idx" ON "_program_types_v_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_mission_stats_order_idx" ON "_program_types_v_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_mission_stats_parent_id_idx" ON "_program_types_v_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_mission_stats_path_idx" ON "_program_types_v_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_mission_stats_locale_idx" ON "_program_types_v_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_values_list_values_order_idx" ON "_program_types_v_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_values_list_values_parent_id_idx" ON "_program_types_v_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_values_list_values_locale_idx" ON "_program_types_v_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_values_list_order_idx" ON "_program_types_v_blocks_values_list" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_values_list_parent_id_idx" ON "_program_types_v_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_values_list_path_idx" ON "_program_types_v_blocks_values_list" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_values_list_locale_idx" ON "_program_types_v_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_testimonials_order_idx" ON "_program_types_v_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_testimonials_parent_id_idx" ON "_program_types_v_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_testimonials_locale_idx" ON "_program_types_v_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_testimonials_p_idx" ON "_program_types_v_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_order_idx" ON "_program_types_v_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_parent_id_idx" ON "_program_types_v_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_path_idx" ON "_program_types_v_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_text_testimonials_locale_idx" ON "_program_types_v_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_map_embed_supporting_paragraphs_order_idx" ON "_program_types_v_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "_program_types_v_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_map_embed_supporting_paragraphs_locale_idx" ON "_program_types_v_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_map_embed_order_idx" ON "_program_types_v_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_map_embed_parent_id_idx" ON "_program_types_v_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_map_embed_path_idx" ON "_program_types_v_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_map_embed_locale_idx" ON "_program_types_v_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_map_embed_map_image_idx" ON "_program_types_v_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "_program_types_v_blocks_contact_form_order_idx" ON "_program_types_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_contact_form_parent_id_idx" ON "_program_types_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_contact_form_path_idx" ON "_program_types_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_contact_form_locale_idx" ON "_program_types_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_contact_form_form_idx" ON "_program_types_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_phones_order_idx" ON "_program_types_v_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_phones_parent_id_idx" ON "_program_types_v_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_phones_locale_idx" ON "_program_types_v_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_order_idx" ON "_program_types_v_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_parent_id_idx" ON "_program_types_v_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_address_list_offices_locale_idx" ON "_program_types_v_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_address_list_order_idx" ON "_program_types_v_blocks_address_list" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_address_list_parent_id_idx" ON "_program_types_v_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_address_list_path_idx" ON "_program_types_v_blocks_address_list" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_address_list_locale_idx" ON "_program_types_v_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_images_order_idx" ON "_program_types_v_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_images_parent_id_idx" ON "_program_types_v_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_images_locale_idx" ON "_program_types_v_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_images_imag_idx" ON "_program_types_v_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_order_idx" ON "_program_types_v_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_parent_id_idx" ON "_program_types_v_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_path_idx" ON "_program_types_v_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_hero_with_image_grid_locale_idx" ON "_program_types_v_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_prompt_c_t_a_order_idx" ON "_program_types_v_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_prompt_c_t_a_parent_id_idx" ON "_program_types_v_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_prompt_c_t_a_path_idx" ON "_program_types_v_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_prompt_c_t_a_locale_idx" ON "_program_types_v_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_prompt_c_t_a_image_idx" ON "_program_types_v_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_related_items_items_order_idx" ON "_program_types_v_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_related_items_items_parent_id_idx" ON "_program_types_v_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_related_items_items_locale_idx" ON "_program_types_v_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_related_items_items_image_idx" ON "_program_types_v_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_related_items_order_idx" ON "_program_types_v_blocks_related_items" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_related_items_parent_id_idx" ON "_program_types_v_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_related_items_path_idx" ON "_program_types_v_blocks_related_items" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_related_items_locale_idx" ON "_program_types_v_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_memories_grid_order_idx" ON "_program_types_v_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_memories_grid_parent_id_idx" ON "_program_types_v_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_memories_grid_path_idx" ON "_program_types_v_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_memories_grid_locale_idx" ON "_program_types_v_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_education_stats_stats_order_idx" ON "_program_types_v_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_education_stats_stats_parent_id_idx" ON "_program_types_v_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_education_stats_stats_locale_idx" ON "_program_types_v_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_education_stats_order_idx" ON "_program_types_v_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_education_stats_parent_id_idx" ON "_program_types_v_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_education_stats_path_idx" ON "_program_types_v_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_education_stats_locale_idx" ON "_program_types_v_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_venture_grid_cards_order_idx" ON "_program_types_v_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_venture_grid_cards_parent_id_idx" ON "_program_types_v_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_venture_grid_cards_locale_idx" ON "_program_types_v_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_venture_grid_cards_image_idx" ON "_program_types_v_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "_program_types_v_blocks_venture_grid_order_idx" ON "_program_types_v_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_venture_grid_parent_id_idx" ON "_program_types_v_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_venture_grid_path_idx" ON "_program_types_v_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_venture_grid_locale_idx" ON "_program_types_v_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_photo_grid_order_idx" ON "_program_types_v_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_photo_grid_parent_id_idx" ON "_program_types_v_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_photo_grid_path_idx" ON "_program_types_v_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_photo_grid_locale_idx" ON "_program_types_v_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_gallery_hero_order_idx" ON "_program_types_v_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_gallery_hero_parent_id_idx" ON "_program_types_v_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_gallery_hero_path_idx" ON "_program_types_v_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_gallery_hero_locale_idx" ON "_program_types_v_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_gallery_cta_order_idx" ON "_program_types_v_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_gallery_cta_parent_id_idx" ON "_program_types_v_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_gallery_cta_path_idx" ON "_program_types_v_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_gallery_cta_locale_idx" ON "_program_types_v_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_gallery_cta_form_idx" ON "_program_types_v_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "_program_types_v_blocks_form_block_order_idx" ON "_program_types_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_program_types_v_blocks_form_block_parent_id_idx" ON "_program_types_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_program_types_v_blocks_form_block_path_idx" ON "_program_types_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_program_types_v_blocks_form_block_locale_idx" ON "_program_types_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_program_types_v_blocks_form_block_form_idx" ON "_program_types_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pl_v_filters_by_country_order_idx" ON "_pl_v_filters_by_country" USING btree ("order");
  CREATE INDEX "_pl_v_filters_by_country_parent_idx" ON "_pl_v_filters_by_country" USING btree ("parent_id");
  CREATE INDEX "_pl_v_filters_by_country_locale_idx" ON "_pl_v_filters_by_country" USING btree ("locale");
  CREATE INDEX "_pl_v_order_idx" ON "_pl_v" USING btree ("_order");
  CREATE INDEX "_pl_v_parent_id_idx" ON "_pl_v" USING btree ("_parent_id");
  CREATE INDEX "_pl_v_path_idx" ON "_pl_v" USING btree ("_path");
  CREATE INDEX "_pl_v_locale_idx" ON "_pl_v" USING btree ("_locale");
  CREATE INDEX "_program_types_v_parent_idx" ON "_program_types_v" USING btree ("parent_id");
  CREATE INDEX "_program_types_v_version_version_application_form_idx" ON "_program_types_v" USING btree ("version_application_form_id");
  CREATE INDEX "_program_types_v_version_version_icon_idx" ON "_program_types_v" USING btree ("version_icon_id");
  CREATE INDEX "_program_types_v_version_version_featured_image_idx" ON "_program_types_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_program_types_v_version_meta_version_meta_image_idx" ON "_program_types_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_program_types_v_version_open_graph_version_open_graph_i_idx" ON "_program_types_v" USING btree ("version_open_graph_image_id");
  CREATE INDEX "_program_types_v_version_version_slug_idx" ON "_program_types_v" USING btree ("version_slug");
  CREATE INDEX "_program_types_v_version_version_updated_at_idx" ON "_program_types_v" USING btree ("version_updated_at");
  CREATE INDEX "_program_types_v_version_version_created_at_idx" ON "_program_types_v" USING btree ("version_created_at");
  CREATE INDEX "_program_types_v_version_version__status_idx" ON "_program_types_v" USING btree ("version__status");
  CREATE INDEX "_program_types_v_created_at_idx" ON "_program_types_v" USING btree ("created_at");
  CREATE INDEX "_program_types_v_updated_at_idx" ON "_program_types_v" USING btree ("updated_at");
  CREATE INDEX "_program_types_v_snapshot_idx" ON "_program_types_v" USING btree ("snapshot");
  CREATE INDEX "_program_types_v_published_locale_idx" ON "_program_types_v" USING btree ("published_locale");
  CREATE INDEX "_program_types_v_latest_idx" ON "_program_types_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_program_types_v_locales_locale_parent_id_unique" ON "_program_types_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_program_types_v_rels_order_idx" ON "_program_types_v_rels" USING btree ("order");
  CREATE INDEX "_program_types_v_rels_parent_idx" ON "_program_types_v_rels" USING btree ("parent_id");
  CREATE INDEX "_program_types_v_rels_path_idx" ON "_program_types_v_rels" USING btree ("path");
  CREATE INDEX "_program_types_v_rels_locale_idx" ON "_program_types_v_rels" USING btree ("locale");
  CREATE INDEX "_program_types_v_rels_blog_id_idx" ON "_program_types_v_rels" USING btree ("blog_id","locale");
  CREATE INDEX "_program_types_v_rels_media_id_idx" ON "_program_types_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "_program_types_v_rels_programs_id_idx" ON "_program_types_v_rels" USING btree ("programs_id","locale");
  CREATE INDEX "_program_types_v_rels_program_types_id_idx" ON "_program_types_v_rels" USING btree ("program_types_id","locale");
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
  CREATE INDEX "programs_blocks_hero_actions_order_idx" ON "programs_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_actions_parent_id_idx" ON "programs_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_actions_locale_idx" ON "programs_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_order_idx" ON "programs_blocks_hero" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_parent_id_idx" ON "programs_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_path_idx" ON "programs_blocks_hero" USING btree ("_path");
  CREATE INDEX "programs_blocks_hero_locale_idx" ON "programs_blocks_hero" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_media_idx" ON "programs_blocks_hero" USING btree ("media_id");
  CREATE INDEX "programs_blocks_hero_home_opportunities_order_idx" ON "programs_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_home_opportunities_parent_id_idx" ON "programs_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_home_opportunities_locale_idx" ON "programs_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_home_order_idx" ON "programs_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_home_parent_id_idx" ON "programs_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_home_path_idx" ON "programs_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "programs_blocks_hero_home_locale_idx" ON "programs_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_home_background_image_idx" ON "programs_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "programs_blocks_rich_text_order_idx" ON "programs_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "programs_blocks_rich_text_parent_id_idx" ON "programs_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_rich_text_path_idx" ON "programs_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "programs_blocks_rich_text_locale_idx" ON "programs_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "programs_blocks_content_columns_order_idx" ON "programs_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "programs_blocks_content_columns_parent_id_idx" ON "programs_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_content_columns_locale_idx" ON "programs_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "programs_blocks_content_order_idx" ON "programs_blocks_content" USING btree ("_order");
  CREATE INDEX "programs_blocks_content_parent_id_idx" ON "programs_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_content_path_idx" ON "programs_blocks_content" USING btree ("_path");
  CREATE INDEX "programs_blocks_content_locale_idx" ON "programs_blocks_content" USING btree ("_locale");
  CREATE INDEX "programs_blocks_gallery_images_order_idx" ON "programs_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "programs_blocks_gallery_images_parent_id_idx" ON "programs_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_gallery_images_locale_idx" ON "programs_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "programs_blocks_gallery_images_image_idx" ON "programs_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "programs_blocks_gallery_order_idx" ON "programs_blocks_gallery" USING btree ("_order");
  CREATE INDEX "programs_blocks_gallery_parent_id_idx" ON "programs_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_gallery_path_idx" ON "programs_blocks_gallery" USING btree ("_path");
  CREATE INDEX "programs_blocks_gallery_locale_idx" ON "programs_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "programs_blocks_faq_items_order_idx" ON "programs_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "programs_blocks_faq_items_parent_id_idx" ON "programs_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_faq_items_locale_idx" ON "programs_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "programs_blocks_faq_order_idx" ON "programs_blocks_faq" USING btree ("_order");
  CREATE INDEX "programs_blocks_faq_parent_id_idx" ON "programs_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_faq_path_idx" ON "programs_blocks_faq" USING btree ("_path");
  CREATE INDEX "programs_blocks_faq_locale_idx" ON "programs_blocks_faq" USING btree ("_locale");
  CREATE INDEX "programs_blocks_cta_actions_order_idx" ON "programs_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "programs_blocks_cta_actions_parent_id_idx" ON "programs_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_cta_actions_locale_idx" ON "programs_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "programs_blocks_cta_order_idx" ON "programs_blocks_cta" USING btree ("_order");
  CREATE INDEX "programs_blocks_cta_parent_id_idx" ON "programs_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_cta_path_idx" ON "programs_blocks_cta" USING btree ("_path");
  CREATE INDEX "programs_blocks_cta_locale_idx" ON "programs_blocks_cta" USING btree ("_locale");
  CREATE INDEX "programs_blocks_cta_background_image_idx" ON "programs_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "programs_blocks_image_feature_order_idx" ON "programs_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "programs_blocks_image_feature_parent_id_idx" ON "programs_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_image_feature_path_idx" ON "programs_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "programs_blocks_image_feature_locale_idx" ON "programs_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "programs_blocks_image_feature_image_idx" ON "programs_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "programs_blocks_media_showcase_items_order_idx" ON "programs_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "programs_blocks_media_showcase_items_parent_id_idx" ON "programs_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_media_showcase_items_locale_idx" ON "programs_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "programs_blocks_media_showcase_items_image_idx" ON "programs_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "programs_blocks_media_showcase_order_idx" ON "programs_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "programs_blocks_media_showcase_parent_id_idx" ON "programs_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_media_showcase_path_idx" ON "programs_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "programs_blocks_media_showcase_locale_idx" ON "programs_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "programs_blocks_decorated_c_t_a_top_images_order_idx" ON "programs_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "programs_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "programs_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_decorated_c_t_a_top_images_locale_idx" ON "programs_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "programs_blocks_decorated_c_t_a_top_images_image_idx" ON "programs_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "programs_blocks_decorated_c_t_a_bottom_images_order_idx" ON "programs_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "programs_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "programs_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "programs_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "programs_blocks_decorated_c_t_a_bottom_images_image_idx" ON "programs_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "programs_blocks_decorated_c_t_a_order_idx" ON "programs_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "programs_blocks_decorated_c_t_a_parent_id_idx" ON "programs_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_decorated_c_t_a_path_idx" ON "programs_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "programs_blocks_decorated_c_t_a_locale_idx" ON "programs_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "programs_blocks_partners_carousel_partners_order_idx" ON "programs_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "programs_blocks_partners_carousel_partners_parent_id_idx" ON "programs_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_partners_carousel_partners_locale_idx" ON "programs_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "programs_blocks_partners_carousel_partners_logo_idx" ON "programs_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "programs_blocks_partners_carousel_order_idx" ON "programs_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "programs_blocks_partners_carousel_parent_id_idx" ON "programs_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_partners_carousel_path_idx" ON "programs_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "programs_blocks_partners_carousel_locale_idx" ON "programs_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "programs_blocks_partners_carousel_story_image_idx" ON "programs_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "programs_blocks_feature_cards_cards_order_idx" ON "programs_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "programs_blocks_feature_cards_cards_parent_id_idx" ON "programs_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_feature_cards_cards_locale_idx" ON "programs_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "programs_blocks_feature_cards_cards_image_idx" ON "programs_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "programs_blocks_feature_cards_order_idx" ON "programs_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "programs_blocks_feature_cards_parent_id_idx" ON "programs_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_feature_cards_path_idx" ON "programs_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "programs_blocks_feature_cards_locale_idx" ON "programs_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "programs_blocks_alternating_content_rows_order_idx" ON "programs_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "programs_blocks_alternating_content_rows_parent_id_idx" ON "programs_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_alternating_content_rows_locale_idx" ON "programs_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "programs_blocks_alternating_content_rows_image_idx" ON "programs_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "programs_blocks_alternating_content_order_idx" ON "programs_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "programs_blocks_alternating_content_parent_id_idx" ON "programs_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_alternating_content_path_idx" ON "programs_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "programs_blocks_alternating_content_locale_idx" ON "programs_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "programs_blocks_blog_posts_list_order_idx" ON "programs_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "programs_blocks_blog_posts_list_parent_id_idx" ON "programs_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_blog_posts_list_path_idx" ON "programs_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "programs_blocks_blog_posts_list_locale_idx" ON "programs_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "programs_blocks_video_testimonials_videos_order_idx" ON "programs_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "programs_blocks_video_testimonials_videos_parent_id_idx" ON "programs_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_video_testimonials_videos_locale_idx" ON "programs_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "programs_blocks_video_testimonials_videos_video_idx" ON "programs_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "programs_blocks_video_testimonials_order_idx" ON "programs_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "programs_blocks_video_testimonials_parent_id_idx" ON "programs_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_video_testimonials_path_idx" ON "programs_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "programs_blocks_video_testimonials_locale_idx" ON "programs_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "programs_blocks_social_feed_stats_order_idx" ON "programs_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "programs_blocks_social_feed_stats_parent_id_idx" ON "programs_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_social_feed_stats_locale_idx" ON "programs_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "programs_blocks_social_feed_order_idx" ON "programs_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "programs_blocks_social_feed_parent_id_idx" ON "programs_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_social_feed_path_idx" ON "programs_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "programs_blocks_social_feed_locale_idx" ON "programs_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "programs_blocks_social_feed_background_image_idx" ON "programs_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "programs_blocks_program_showcase_program_types_order_idx" ON "programs_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "programs_blocks_program_showcase_program_types_parent_id_idx" ON "programs_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_program_showcase_program_types_locale_idx" ON "programs_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "programs_blocks_program_showcase_programs_order_idx" ON "programs_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "programs_blocks_program_showcase_programs_parent_id_idx" ON "programs_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_program_showcase_programs_locale_idx" ON "programs_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "programs_blocks_program_showcase_programs_image_idx" ON "programs_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "programs_blocks_program_showcase_order_idx" ON "programs_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "programs_blocks_program_showcase_parent_id_idx" ON "programs_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_program_showcase_path_idx" ON "programs_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "programs_blocks_program_showcase_locale_idx" ON "programs_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "programs_blocks_founders_carousel_founders_order_idx" ON "programs_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "programs_blocks_founders_carousel_founders_parent_id_idx" ON "programs_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_founders_carousel_founders_locale_idx" ON "programs_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "programs_blocks_founders_carousel_founders_photo_idx" ON "programs_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "programs_blocks_founders_carousel_order_idx" ON "programs_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "programs_blocks_founders_carousel_parent_id_idx" ON "programs_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_founders_carousel_path_idx" ON "programs_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "programs_blocks_founders_carousel_locale_idx" ON "programs_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "programs_blocks_mission_stats_paragraphs_order_idx" ON "programs_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "programs_blocks_mission_stats_paragraphs_parent_id_idx" ON "programs_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_mission_stats_paragraphs_locale_idx" ON "programs_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "programs_blocks_mission_stats_stats_order_idx" ON "programs_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "programs_blocks_mission_stats_stats_parent_id_idx" ON "programs_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_mission_stats_stats_locale_idx" ON "programs_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "programs_blocks_mission_stats_order_idx" ON "programs_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "programs_blocks_mission_stats_parent_id_idx" ON "programs_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_mission_stats_path_idx" ON "programs_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "programs_blocks_mission_stats_locale_idx" ON "programs_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "programs_blocks_values_list_values_order_idx" ON "programs_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "programs_blocks_values_list_values_parent_id_idx" ON "programs_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_values_list_values_locale_idx" ON "programs_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "programs_blocks_values_list_order_idx" ON "programs_blocks_values_list" USING btree ("_order");
  CREATE INDEX "programs_blocks_values_list_parent_id_idx" ON "programs_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_values_list_path_idx" ON "programs_blocks_values_list" USING btree ("_path");
  CREATE INDEX "programs_blocks_values_list_locale_idx" ON "programs_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "programs_blocks_text_testimonials_testimonials_order_idx" ON "programs_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "programs_blocks_text_testimonials_testimonials_parent_id_idx" ON "programs_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_text_testimonials_testimonials_locale_idx" ON "programs_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "programs_blocks_text_testimonials_testimonials_photo_idx" ON "programs_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "programs_blocks_text_testimonials_order_idx" ON "programs_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "programs_blocks_text_testimonials_parent_id_idx" ON "programs_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_text_testimonials_path_idx" ON "programs_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "programs_blocks_text_testimonials_locale_idx" ON "programs_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "programs_blocks_map_embed_supporting_paragraphs_order_idx" ON "programs_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "programs_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "programs_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_map_embed_supporting_paragraphs_locale_idx" ON "programs_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "programs_blocks_map_embed_order_idx" ON "programs_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "programs_blocks_map_embed_parent_id_idx" ON "programs_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_map_embed_path_idx" ON "programs_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "programs_blocks_map_embed_locale_idx" ON "programs_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "programs_blocks_map_embed_map_image_idx" ON "programs_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "programs_blocks_contact_form_order_idx" ON "programs_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "programs_blocks_contact_form_parent_id_idx" ON "programs_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_contact_form_path_idx" ON "programs_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "programs_blocks_contact_form_locale_idx" ON "programs_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "programs_blocks_contact_form_form_idx" ON "programs_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "programs_blocks_address_list_offices_phones_order_idx" ON "programs_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "programs_blocks_address_list_offices_phones_parent_id_idx" ON "programs_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_address_list_offices_phones_locale_idx" ON "programs_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "programs_blocks_address_list_offices_order_idx" ON "programs_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "programs_blocks_address_list_offices_parent_id_idx" ON "programs_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_address_list_offices_locale_idx" ON "programs_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "programs_blocks_address_list_order_idx" ON "programs_blocks_address_list" USING btree ("_order");
  CREATE INDEX "programs_blocks_address_list_parent_id_idx" ON "programs_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_address_list_path_idx" ON "programs_blocks_address_list" USING btree ("_path");
  CREATE INDEX "programs_blocks_address_list_locale_idx" ON "programs_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_with_image_grid_images_order_idx" ON "programs_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_with_image_grid_images_parent_id_idx" ON "programs_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_with_image_grid_images_locale_idx" ON "programs_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "programs_blocks_hero_with_image_grid_images_image_idx" ON "programs_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "programs_blocks_hero_with_image_grid_order_idx" ON "programs_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_with_image_grid_parent_id_idx" ON "programs_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_with_image_grid_path_idx" ON "programs_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "programs_blocks_hero_with_image_grid_locale_idx" ON "programs_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "programs_blocks_prompt_c_t_a_order_idx" ON "programs_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "programs_blocks_prompt_c_t_a_parent_id_idx" ON "programs_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_prompt_c_t_a_path_idx" ON "programs_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "programs_blocks_prompt_c_t_a_locale_idx" ON "programs_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "programs_blocks_prompt_c_t_a_image_idx" ON "programs_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "programs_blocks_related_items_items_order_idx" ON "programs_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "programs_blocks_related_items_items_parent_id_idx" ON "programs_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_related_items_items_locale_idx" ON "programs_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "programs_blocks_related_items_items_image_idx" ON "programs_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "programs_blocks_related_items_order_idx" ON "programs_blocks_related_items" USING btree ("_order");
  CREATE INDEX "programs_blocks_related_items_parent_id_idx" ON "programs_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_related_items_path_idx" ON "programs_blocks_related_items" USING btree ("_path");
  CREATE INDEX "programs_blocks_related_items_locale_idx" ON "programs_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "programs_blocks_memories_grid_order_idx" ON "programs_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "programs_blocks_memories_grid_parent_id_idx" ON "programs_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_memories_grid_path_idx" ON "programs_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "programs_blocks_memories_grid_locale_idx" ON "programs_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "programs_blocks_education_stats_stats_order_idx" ON "programs_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "programs_blocks_education_stats_stats_parent_id_idx" ON "programs_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_education_stats_stats_locale_idx" ON "programs_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "programs_blocks_education_stats_order_idx" ON "programs_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "programs_blocks_education_stats_parent_id_idx" ON "programs_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_education_stats_path_idx" ON "programs_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "programs_blocks_education_stats_locale_idx" ON "programs_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "programs_blocks_venture_grid_cards_order_idx" ON "programs_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "programs_blocks_venture_grid_cards_parent_id_idx" ON "programs_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_venture_grid_cards_locale_idx" ON "programs_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "programs_blocks_venture_grid_cards_image_idx" ON "programs_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "programs_blocks_venture_grid_order_idx" ON "programs_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "programs_blocks_venture_grid_parent_id_idx" ON "programs_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_venture_grid_path_idx" ON "programs_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "programs_blocks_venture_grid_locale_idx" ON "programs_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "programs_blocks_photo_grid_order_idx" ON "programs_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "programs_blocks_photo_grid_parent_id_idx" ON "programs_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_photo_grid_path_idx" ON "programs_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "programs_blocks_photo_grid_locale_idx" ON "programs_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "programs_blocks_gallery_hero_order_idx" ON "programs_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "programs_blocks_gallery_hero_parent_id_idx" ON "programs_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_gallery_hero_path_idx" ON "programs_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "programs_blocks_gallery_hero_locale_idx" ON "programs_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "programs_blocks_gallery_cta_order_idx" ON "programs_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "programs_blocks_gallery_cta_parent_id_idx" ON "programs_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_gallery_cta_path_idx" ON "programs_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "programs_blocks_gallery_cta_locale_idx" ON "programs_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "programs_blocks_gallery_cta_form_idx" ON "programs_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "programs_blocks_form_block_order_idx" ON "programs_blocks_form_block" USING btree ("_order");
  CREATE INDEX "programs_blocks_form_block_parent_id_idx" ON "programs_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_form_block_path_idx" ON "programs_blocks_form_block" USING btree ("_path");
  CREATE INDEX "programs_blocks_form_block_locale_idx" ON "programs_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "programs_blocks_form_block_form_idx" ON "programs_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "programs_application_form_idx" ON "programs" USING btree ("application_form_id");
  CREATE INDEX "programs_featured_image_idx" ON "programs" USING btree ("featured_image_id");
  CREATE INDEX "programs_detail_hero_detail_hero_image_idx" ON "programs" USING btree ("detail_hero_image_id");
  CREATE INDEX "programs_detail_photo_middle_idx" ON "programs" USING btree ("detail_photo_middle_id");
  CREATE INDEX "programs_detail_picture_yourself_detail_picture_yourself_idx" ON "programs" USING btree ("detail_picture_yourself_photo_id");
  CREATE INDEX "programs_meta_meta_image_idx" ON "programs" USING btree ("meta_image_id");
  CREATE INDEX "programs_open_graph_open_graph_image_idx" ON "programs" USING btree ("open_graph_image_id");
  CREATE UNIQUE INDEX "programs_slug_idx" ON "programs" USING btree ("slug");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "programs__status_idx" ON "programs" USING btree ("_status");
  CREATE UNIQUE INDEX "programs_locales_locale_parent_id_unique" ON "programs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "programs_rels_order_idx" ON "programs_rels" USING btree ("order");
  CREATE INDEX "programs_rels_parent_idx" ON "programs_rels" USING btree ("parent_id");
  CREATE INDEX "programs_rels_path_idx" ON "programs_rels" USING btree ("path");
  CREATE INDEX "programs_rels_locale_idx" ON "programs_rels" USING btree ("locale");
  CREATE INDEX "programs_rels_program_types_id_idx" ON "programs_rels" USING btree ("program_types_id","locale");
  CREATE INDEX "programs_rels_blog_id_idx" ON "programs_rels" USING btree ("blog_id","locale");
  CREATE INDEX "programs_rels_media_id_idx" ON "programs_rels" USING btree ("media_id","locale");
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
  CREATE INDEX "_programs_v_blocks_hero_actions_order_idx" ON "_programs_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_actions_parent_id_idx" ON "_programs_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_actions_locale_idx" ON "_programs_v_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_order_idx" ON "_programs_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_parent_id_idx" ON "_programs_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_path_idx" ON "_programs_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_hero_locale_idx" ON "_programs_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_media_idx" ON "_programs_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_programs_v_blocks_hero_home_opportunities_order_idx" ON "_programs_v_blocks_hero_home_opportunities" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_home_opportunities_parent_id_idx" ON "_programs_v_blocks_hero_home_opportunities" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_home_opportunities_locale_idx" ON "_programs_v_blocks_hero_home_opportunities" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_home_order_idx" ON "_programs_v_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_home_parent_id_idx" ON "_programs_v_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_home_path_idx" ON "_programs_v_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_hero_home_locale_idx" ON "_programs_v_blocks_hero_home" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_home_background_image_idx" ON "_programs_v_blocks_hero_home" USING btree ("background_image_id");
  CREATE INDEX "_programs_v_blocks_rich_text_order_idx" ON "_programs_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_rich_text_parent_id_idx" ON "_programs_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_rich_text_path_idx" ON "_programs_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_rich_text_locale_idx" ON "_programs_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_content_columns_order_idx" ON "_programs_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_content_columns_parent_id_idx" ON "_programs_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_content_columns_locale_idx" ON "_programs_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_content_order_idx" ON "_programs_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_content_parent_id_idx" ON "_programs_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_content_path_idx" ON "_programs_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_content_locale_idx" ON "_programs_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_gallery_images_order_idx" ON "_programs_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_gallery_images_parent_id_idx" ON "_programs_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_gallery_images_locale_idx" ON "_programs_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_gallery_images_image_idx" ON "_programs_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_gallery_order_idx" ON "_programs_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_gallery_parent_id_idx" ON "_programs_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_gallery_path_idx" ON "_programs_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_gallery_locale_idx" ON "_programs_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_faq_items_order_idx" ON "_programs_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_faq_items_parent_id_idx" ON "_programs_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_faq_items_locale_idx" ON "_programs_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_faq_order_idx" ON "_programs_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_faq_parent_id_idx" ON "_programs_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_faq_path_idx" ON "_programs_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_faq_locale_idx" ON "_programs_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_cta_actions_order_idx" ON "_programs_v_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_cta_actions_parent_id_idx" ON "_programs_v_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_cta_actions_locale_idx" ON "_programs_v_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_cta_order_idx" ON "_programs_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_cta_parent_id_idx" ON "_programs_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_cta_path_idx" ON "_programs_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_cta_locale_idx" ON "_programs_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_cta_background_image_idx" ON "_programs_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_programs_v_blocks_image_feature_order_idx" ON "_programs_v_blocks_image_feature" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_image_feature_parent_id_idx" ON "_programs_v_blocks_image_feature" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_image_feature_path_idx" ON "_programs_v_blocks_image_feature" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_image_feature_locale_idx" ON "_programs_v_blocks_image_feature" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_image_feature_image_idx" ON "_programs_v_blocks_image_feature" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_media_showcase_items_order_idx" ON "_programs_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_media_showcase_items_parent_id_idx" ON "_programs_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_media_showcase_items_locale_idx" ON "_programs_v_blocks_media_showcase_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_media_showcase_items_image_idx" ON "_programs_v_blocks_media_showcase_items" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_media_showcase_order_idx" ON "_programs_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_media_showcase_parent_id_idx" ON "_programs_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_media_showcase_path_idx" ON "_programs_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_media_showcase_locale_idx" ON "_programs_v_blocks_media_showcase" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_top_images_order_idx" ON "_programs_v_blocks_decorated_c_t_a_top_images" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_top_images_parent_id_idx" ON "_programs_v_blocks_decorated_c_t_a_top_images" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_top_images_locale_idx" ON "_programs_v_blocks_decorated_c_t_a_top_images" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_top_images_image_idx" ON "_programs_v_blocks_decorated_c_t_a_top_images" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_bottom_images_order_idx" ON "_programs_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_bottom_images_parent_id_idx" ON "_programs_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_bottom_images_locale_idx" ON "_programs_v_blocks_decorated_c_t_a_bottom_images" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_bottom_images_image_idx" ON "_programs_v_blocks_decorated_c_t_a_bottom_images" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_order_idx" ON "_programs_v_blocks_decorated_c_t_a" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_parent_id_idx" ON "_programs_v_blocks_decorated_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_path_idx" ON "_programs_v_blocks_decorated_c_t_a" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_decorated_c_t_a_locale_idx" ON "_programs_v_blocks_decorated_c_t_a" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_partners_carousel_partners_order_idx" ON "_programs_v_blocks_partners_carousel_partners" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_partners_carousel_partners_parent_id_idx" ON "_programs_v_blocks_partners_carousel_partners" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_partners_carousel_partners_locale_idx" ON "_programs_v_blocks_partners_carousel_partners" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_partners_carousel_partners_logo_idx" ON "_programs_v_blocks_partners_carousel_partners" USING btree ("logo_id");
  CREATE INDEX "_programs_v_blocks_partners_carousel_order_idx" ON "_programs_v_blocks_partners_carousel" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_partners_carousel_parent_id_idx" ON "_programs_v_blocks_partners_carousel" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_partners_carousel_path_idx" ON "_programs_v_blocks_partners_carousel" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_partners_carousel_locale_idx" ON "_programs_v_blocks_partners_carousel" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_partners_carousel_story_image_idx" ON "_programs_v_blocks_partners_carousel" USING btree ("story_image_id");
  CREATE INDEX "_programs_v_blocks_feature_cards_cards_order_idx" ON "_programs_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_feature_cards_cards_parent_id_idx" ON "_programs_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_feature_cards_cards_locale_idx" ON "_programs_v_blocks_feature_cards_cards" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_feature_cards_cards_image_idx" ON "_programs_v_blocks_feature_cards_cards" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_feature_cards_order_idx" ON "_programs_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_feature_cards_parent_id_idx" ON "_programs_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_feature_cards_path_idx" ON "_programs_v_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_feature_cards_locale_idx" ON "_programs_v_blocks_feature_cards" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_alternating_content_rows_order_idx" ON "_programs_v_blocks_alternating_content_rows" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_alternating_content_rows_parent_id_idx" ON "_programs_v_blocks_alternating_content_rows" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_alternating_content_rows_locale_idx" ON "_programs_v_blocks_alternating_content_rows" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_alternating_content_rows_image_idx" ON "_programs_v_blocks_alternating_content_rows" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_alternating_content_order_idx" ON "_programs_v_blocks_alternating_content" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_alternating_content_parent_id_idx" ON "_programs_v_blocks_alternating_content" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_alternating_content_path_idx" ON "_programs_v_blocks_alternating_content" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_alternating_content_locale_idx" ON "_programs_v_blocks_alternating_content" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_blog_posts_list_order_idx" ON "_programs_v_blocks_blog_posts_list" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_blog_posts_list_parent_id_idx" ON "_programs_v_blocks_blog_posts_list" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_blog_posts_list_path_idx" ON "_programs_v_blocks_blog_posts_list" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_blog_posts_list_locale_idx" ON "_programs_v_blocks_blog_posts_list" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_video_testimonials_videos_order_idx" ON "_programs_v_blocks_video_testimonials_videos" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_video_testimonials_videos_parent_id_idx" ON "_programs_v_blocks_video_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_video_testimonials_videos_locale_idx" ON "_programs_v_blocks_video_testimonials_videos" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_video_testimonials_videos_video_idx" ON "_programs_v_blocks_video_testimonials_videos" USING btree ("video_id");
  CREATE INDEX "_programs_v_blocks_video_testimonials_order_idx" ON "_programs_v_blocks_video_testimonials" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_video_testimonials_parent_id_idx" ON "_programs_v_blocks_video_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_video_testimonials_path_idx" ON "_programs_v_blocks_video_testimonials" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_video_testimonials_locale_idx" ON "_programs_v_blocks_video_testimonials" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_social_feed_stats_order_idx" ON "_programs_v_blocks_social_feed_stats" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_social_feed_stats_parent_id_idx" ON "_programs_v_blocks_social_feed_stats" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_social_feed_stats_locale_idx" ON "_programs_v_blocks_social_feed_stats" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_social_feed_order_idx" ON "_programs_v_blocks_social_feed" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_social_feed_parent_id_idx" ON "_programs_v_blocks_social_feed" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_social_feed_path_idx" ON "_programs_v_blocks_social_feed" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_social_feed_locale_idx" ON "_programs_v_blocks_social_feed" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_social_feed_background_image_idx" ON "_programs_v_blocks_social_feed" USING btree ("background_image_id");
  CREATE INDEX "_programs_v_blocks_program_showcase_program_types_order_idx" ON "_programs_v_blocks_program_showcase_program_types" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_program_showcase_program_types_parent_id_idx" ON "_programs_v_blocks_program_showcase_program_types" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_program_showcase_program_types_locale_idx" ON "_programs_v_blocks_program_showcase_program_types" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_program_showcase_programs_order_idx" ON "_programs_v_blocks_program_showcase_programs" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_program_showcase_programs_parent_id_idx" ON "_programs_v_blocks_program_showcase_programs" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_program_showcase_programs_locale_idx" ON "_programs_v_blocks_program_showcase_programs" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_program_showcase_programs_image_idx" ON "_programs_v_blocks_program_showcase_programs" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_program_showcase_order_idx" ON "_programs_v_blocks_program_showcase" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_program_showcase_parent_id_idx" ON "_programs_v_blocks_program_showcase" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_program_showcase_path_idx" ON "_programs_v_blocks_program_showcase" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_program_showcase_locale_idx" ON "_programs_v_blocks_program_showcase" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_founders_carousel_founders_order_idx" ON "_programs_v_blocks_founders_carousel_founders" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_founders_carousel_founders_parent_id_idx" ON "_programs_v_blocks_founders_carousel_founders" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_founders_carousel_founders_locale_idx" ON "_programs_v_blocks_founders_carousel_founders" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_founders_carousel_founders_photo_idx" ON "_programs_v_blocks_founders_carousel_founders" USING btree ("photo_id");
  CREATE INDEX "_programs_v_blocks_founders_carousel_order_idx" ON "_programs_v_blocks_founders_carousel" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_founders_carousel_parent_id_idx" ON "_programs_v_blocks_founders_carousel" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_founders_carousel_path_idx" ON "_programs_v_blocks_founders_carousel" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_founders_carousel_locale_idx" ON "_programs_v_blocks_founders_carousel" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_mission_stats_paragraphs_order_idx" ON "_programs_v_blocks_mission_stats_paragraphs" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_mission_stats_paragraphs_parent_id_idx" ON "_programs_v_blocks_mission_stats_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_mission_stats_paragraphs_locale_idx" ON "_programs_v_blocks_mission_stats_paragraphs" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_mission_stats_stats_order_idx" ON "_programs_v_blocks_mission_stats_stats" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_mission_stats_stats_parent_id_idx" ON "_programs_v_blocks_mission_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_mission_stats_stats_locale_idx" ON "_programs_v_blocks_mission_stats_stats" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_mission_stats_order_idx" ON "_programs_v_blocks_mission_stats" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_mission_stats_parent_id_idx" ON "_programs_v_blocks_mission_stats" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_mission_stats_path_idx" ON "_programs_v_blocks_mission_stats" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_mission_stats_locale_idx" ON "_programs_v_blocks_mission_stats" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_values_list_values_order_idx" ON "_programs_v_blocks_values_list_values" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_values_list_values_parent_id_idx" ON "_programs_v_blocks_values_list_values" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_values_list_values_locale_idx" ON "_programs_v_blocks_values_list_values" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_values_list_order_idx" ON "_programs_v_blocks_values_list" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_values_list_parent_id_idx" ON "_programs_v_blocks_values_list" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_values_list_path_idx" ON "_programs_v_blocks_values_list" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_values_list_locale_idx" ON "_programs_v_blocks_values_list" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_text_testimonials_testimonials_order_idx" ON "_programs_v_blocks_text_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_text_testimonials_testimonials_parent_id_idx" ON "_programs_v_blocks_text_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_text_testimonials_testimonials_locale_idx" ON "_programs_v_blocks_text_testimonials_testimonials" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_text_testimonials_testimonials_photo_idx" ON "_programs_v_blocks_text_testimonials_testimonials" USING btree ("photo_id");
  CREATE INDEX "_programs_v_blocks_text_testimonials_order_idx" ON "_programs_v_blocks_text_testimonials" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_text_testimonials_parent_id_idx" ON "_programs_v_blocks_text_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_text_testimonials_path_idx" ON "_programs_v_blocks_text_testimonials" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_text_testimonials_locale_idx" ON "_programs_v_blocks_text_testimonials" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_map_embed_supporting_paragraphs_order_idx" ON "_programs_v_blocks_map_embed_supporting_paragraphs" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_map_embed_supporting_paragraphs_parent_id_idx" ON "_programs_v_blocks_map_embed_supporting_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_map_embed_supporting_paragraphs_locale_idx" ON "_programs_v_blocks_map_embed_supporting_paragraphs" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_map_embed_order_idx" ON "_programs_v_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_map_embed_parent_id_idx" ON "_programs_v_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_map_embed_path_idx" ON "_programs_v_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_map_embed_locale_idx" ON "_programs_v_blocks_map_embed" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_map_embed_map_image_idx" ON "_programs_v_blocks_map_embed" USING btree ("map_image_id");
  CREATE INDEX "_programs_v_blocks_contact_form_order_idx" ON "_programs_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_contact_form_parent_id_idx" ON "_programs_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_contact_form_path_idx" ON "_programs_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_contact_form_locale_idx" ON "_programs_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_contact_form_form_idx" ON "_programs_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_programs_v_blocks_address_list_offices_phones_order_idx" ON "_programs_v_blocks_address_list_offices_phones" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_address_list_offices_phones_parent_id_idx" ON "_programs_v_blocks_address_list_offices_phones" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_address_list_offices_phones_locale_idx" ON "_programs_v_blocks_address_list_offices_phones" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_address_list_offices_order_idx" ON "_programs_v_blocks_address_list_offices" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_address_list_offices_parent_id_idx" ON "_programs_v_blocks_address_list_offices" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_address_list_offices_locale_idx" ON "_programs_v_blocks_address_list_offices" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_address_list_order_idx" ON "_programs_v_blocks_address_list" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_address_list_parent_id_idx" ON "_programs_v_blocks_address_list" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_address_list_path_idx" ON "_programs_v_blocks_address_list" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_address_list_locale_idx" ON "_programs_v_blocks_address_list" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_images_order_idx" ON "_programs_v_blocks_hero_with_image_grid_images" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_images_parent_id_idx" ON "_programs_v_blocks_hero_with_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_images_locale_idx" ON "_programs_v_blocks_hero_with_image_grid_images" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_images_image_idx" ON "_programs_v_blocks_hero_with_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_order_idx" ON "_programs_v_blocks_hero_with_image_grid" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_parent_id_idx" ON "_programs_v_blocks_hero_with_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_path_idx" ON "_programs_v_blocks_hero_with_image_grid" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_hero_with_image_grid_locale_idx" ON "_programs_v_blocks_hero_with_image_grid" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_prompt_c_t_a_order_idx" ON "_programs_v_blocks_prompt_c_t_a" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_prompt_c_t_a_parent_id_idx" ON "_programs_v_blocks_prompt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_prompt_c_t_a_path_idx" ON "_programs_v_blocks_prompt_c_t_a" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_prompt_c_t_a_locale_idx" ON "_programs_v_blocks_prompt_c_t_a" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_prompt_c_t_a_image_idx" ON "_programs_v_blocks_prompt_c_t_a" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_related_items_items_order_idx" ON "_programs_v_blocks_related_items_items" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_related_items_items_parent_id_idx" ON "_programs_v_blocks_related_items_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_related_items_items_locale_idx" ON "_programs_v_blocks_related_items_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_related_items_items_image_idx" ON "_programs_v_blocks_related_items_items" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_related_items_order_idx" ON "_programs_v_blocks_related_items" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_related_items_parent_id_idx" ON "_programs_v_blocks_related_items" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_related_items_path_idx" ON "_programs_v_blocks_related_items" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_related_items_locale_idx" ON "_programs_v_blocks_related_items" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_memories_grid_order_idx" ON "_programs_v_blocks_memories_grid" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_memories_grid_parent_id_idx" ON "_programs_v_blocks_memories_grid" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_memories_grid_path_idx" ON "_programs_v_blocks_memories_grid" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_memories_grid_locale_idx" ON "_programs_v_blocks_memories_grid" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_education_stats_stats_order_idx" ON "_programs_v_blocks_education_stats_stats" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_education_stats_stats_parent_id_idx" ON "_programs_v_blocks_education_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_education_stats_stats_locale_idx" ON "_programs_v_blocks_education_stats_stats" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_education_stats_order_idx" ON "_programs_v_blocks_education_stats" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_education_stats_parent_id_idx" ON "_programs_v_blocks_education_stats" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_education_stats_path_idx" ON "_programs_v_blocks_education_stats" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_education_stats_locale_idx" ON "_programs_v_blocks_education_stats" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_venture_grid_cards_order_idx" ON "_programs_v_blocks_venture_grid_cards" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_venture_grid_cards_parent_id_idx" ON "_programs_v_blocks_venture_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_venture_grid_cards_locale_idx" ON "_programs_v_blocks_venture_grid_cards" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_venture_grid_cards_image_idx" ON "_programs_v_blocks_venture_grid_cards" USING btree ("image_id");
  CREATE INDEX "_programs_v_blocks_venture_grid_order_idx" ON "_programs_v_blocks_venture_grid" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_venture_grid_parent_id_idx" ON "_programs_v_blocks_venture_grid" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_venture_grid_path_idx" ON "_programs_v_blocks_venture_grid" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_venture_grid_locale_idx" ON "_programs_v_blocks_venture_grid" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_photo_grid_order_idx" ON "_programs_v_blocks_photo_grid" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_photo_grid_parent_id_idx" ON "_programs_v_blocks_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_photo_grid_path_idx" ON "_programs_v_blocks_photo_grid" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_photo_grid_locale_idx" ON "_programs_v_blocks_photo_grid" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_gallery_hero_order_idx" ON "_programs_v_blocks_gallery_hero" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_gallery_hero_parent_id_idx" ON "_programs_v_blocks_gallery_hero" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_gallery_hero_path_idx" ON "_programs_v_blocks_gallery_hero" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_gallery_hero_locale_idx" ON "_programs_v_blocks_gallery_hero" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_gallery_cta_order_idx" ON "_programs_v_blocks_gallery_cta" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_gallery_cta_parent_id_idx" ON "_programs_v_blocks_gallery_cta" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_gallery_cta_path_idx" ON "_programs_v_blocks_gallery_cta" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_gallery_cta_locale_idx" ON "_programs_v_blocks_gallery_cta" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_gallery_cta_form_idx" ON "_programs_v_blocks_gallery_cta" USING btree ("form_id");
  CREATE INDEX "_programs_v_blocks_form_block_order_idx" ON "_programs_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_programs_v_blocks_form_block_parent_id_idx" ON "_programs_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_blocks_form_block_path_idx" ON "_programs_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_programs_v_blocks_form_block_locale_idx" ON "_programs_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_programs_v_blocks_form_block_form_idx" ON "_programs_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_programs_v_parent_idx" ON "_programs_v" USING btree ("parent_id");
  CREATE INDEX "_programs_v_version_version_application_form_idx" ON "_programs_v" USING btree ("version_application_form_id");
  CREATE INDEX "_programs_v_version_version_featured_image_idx" ON "_programs_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_programs_v_version_detail_hero_version_detail_hero_imag_idx" ON "_programs_v" USING btree ("version_detail_hero_image_id");
  CREATE INDEX "_programs_v_version_version_detail_photo_middle_idx" ON "_programs_v" USING btree ("version_detail_photo_middle_id");
  CREATE INDEX "_programs_v_version_detail_picture_yourself_version_deta_idx" ON "_programs_v" USING btree ("version_detail_picture_yourself_photo_id");
  CREATE INDEX "_programs_v_version_meta_version_meta_image_idx" ON "_programs_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_programs_v_version_open_graph_version_open_graph_image_idx" ON "_programs_v" USING btree ("version_open_graph_image_id");
  CREATE INDEX "_programs_v_version_version_slug_idx" ON "_programs_v" USING btree ("version_slug");
  CREATE INDEX "_programs_v_version_version_updated_at_idx" ON "_programs_v" USING btree ("version_updated_at");
  CREATE INDEX "_programs_v_version_version_created_at_idx" ON "_programs_v" USING btree ("version_created_at");
  CREATE INDEX "_programs_v_version_version__status_idx" ON "_programs_v" USING btree ("version__status");
  CREATE INDEX "_programs_v_created_at_idx" ON "_programs_v" USING btree ("created_at");
  CREATE INDEX "_programs_v_updated_at_idx" ON "_programs_v" USING btree ("updated_at");
  CREATE INDEX "_programs_v_snapshot_idx" ON "_programs_v" USING btree ("snapshot");
  CREATE INDEX "_programs_v_published_locale_idx" ON "_programs_v" USING btree ("published_locale");
  CREATE INDEX "_programs_v_latest_idx" ON "_programs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_programs_v_locales_locale_parent_id_unique" ON "_programs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_programs_v_rels_order_idx" ON "_programs_v_rels" USING btree ("order");
  CREATE INDEX "_programs_v_rels_parent_idx" ON "_programs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programs_v_rels_path_idx" ON "_programs_v_rels" USING btree ("path");
  CREATE INDEX "_programs_v_rels_locale_idx" ON "_programs_v_rels" USING btree ("locale");
  CREATE INDEX "_programs_v_rels_program_types_id_idx" ON "_programs_v_rels" USING btree ("program_types_id","locale");
  CREATE INDEX "_programs_v_rels_blog_id_idx" ON "_programs_v_rels" USING btree ("blog_id","locale");
  CREATE INDEX "_programs_v_rels_media_id_idx" ON "_programs_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "blog_categories_image_idx" ON "blog_categories" USING btree ("image_id");
  CREATE INDEX "blog_categories_meta_meta_image_idx" ON "blog_categories" USING btree ("meta_image_id");
  CREATE INDEX "blog_categories_open_graph_open_graph_image_idx" ON "blog_categories" USING btree ("open_graph_image_id");
  CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "blog_categories" USING btree ("slug");
  CREATE INDEX "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE INDEX "blog_categories__status_idx" ON "blog_categories" USING btree ("_status");
  CREATE UNIQUE INDEX "blog_categories_locales_locale_parent_id_unique" ON "blog_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_categories_v_parent_idx" ON "_blog_categories_v" USING btree ("parent_id");
  CREATE INDEX "_blog_categories_v_version_version_image_idx" ON "_blog_categories_v" USING btree ("version_image_id");
  CREATE INDEX "_blog_categories_v_version_meta_version_meta_image_idx" ON "_blog_categories_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_categories_v_version_open_graph_version_open_graph_idx" ON "_blog_categories_v" USING btree ("version_open_graph_image_id");
  CREATE INDEX "_blog_categories_v_version_version_slug_idx" ON "_blog_categories_v" USING btree ("version_slug");
  CREATE INDEX "_blog_categories_v_version_version_updated_at_idx" ON "_blog_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_categories_v_version_version_created_at_idx" ON "_blog_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_categories_v_version_version__status_idx" ON "_blog_categories_v" USING btree ("version__status");
  CREATE INDEX "_blog_categories_v_created_at_idx" ON "_blog_categories_v" USING btree ("created_at");
  CREATE INDEX "_blog_categories_v_updated_at_idx" ON "_blog_categories_v" USING btree ("updated_at");
  CREATE INDEX "_blog_categories_v_snapshot_idx" ON "_blog_categories_v" USING btree ("snapshot");
  CREATE INDEX "_blog_categories_v_published_locale_idx" ON "_blog_categories_v" USING btree ("published_locale");
  CREATE INDEX "_blog_categories_v_latest_idx" ON "_blog_categories_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_blog_categories_v_locales_locale_parent_id_unique" ON "_blog_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_hero_blog_post_order_idx" ON "blog_blocks_hero_blog_post" USING btree ("_order");
  CREATE INDEX "blog_blocks_hero_blog_post_parent_id_idx" ON "blog_blocks_hero_blog_post" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_hero_blog_post_path_idx" ON "blog_blocks_hero_blog_post" USING btree ("_path");
  CREATE INDEX "blog_blocks_hero_blog_post_locale_idx" ON "blog_blocks_hero_blog_post" USING btree ("_locale");
  CREATE INDEX "blog_blocks_rich_text_order_idx" ON "blog_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "blog_blocks_rich_text_parent_id_idx" ON "blog_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_rich_text_path_idx" ON "blog_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "blog_blocks_rich_text_locale_idx" ON "blog_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "blog_blocks_content_columns_order_idx" ON "blog_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "blog_blocks_content_columns_parent_id_idx" ON "blog_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_content_columns_locale_idx" ON "blog_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "blog_blocks_content_order_idx" ON "blog_blocks_content" USING btree ("_order");
  CREATE INDEX "blog_blocks_content_parent_id_idx" ON "blog_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_content_path_idx" ON "blog_blocks_content" USING btree ("_path");
  CREATE INDEX "blog_blocks_content_locale_idx" ON "blog_blocks_content" USING btree ("_locale");
  CREATE INDEX "blog_blocks_gallery_images_order_idx" ON "blog_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "blog_blocks_gallery_images_parent_id_idx" ON "blog_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_gallery_images_locale_idx" ON "blog_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "blog_blocks_gallery_images_image_idx" ON "blog_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "blog_blocks_gallery_order_idx" ON "blog_blocks_gallery" USING btree ("_order");
  CREATE INDEX "blog_blocks_gallery_parent_id_idx" ON "blog_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_gallery_path_idx" ON "blog_blocks_gallery" USING btree ("_path");
  CREATE INDEX "blog_blocks_gallery_locale_idx" ON "blog_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "blog_blocks_faq_items_order_idx" ON "blog_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "blog_blocks_faq_items_parent_id_idx" ON "blog_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_faq_items_locale_idx" ON "blog_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "blog_blocks_faq_order_idx" ON "blog_blocks_faq" USING btree ("_order");
  CREATE INDEX "blog_blocks_faq_parent_id_idx" ON "blog_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_faq_path_idx" ON "blog_blocks_faq" USING btree ("_path");
  CREATE INDEX "blog_blocks_faq_locale_idx" ON "blog_blocks_faq" USING btree ("_locale");
  CREATE INDEX "blog_blocks_cta_actions_order_idx" ON "blog_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "blog_blocks_cta_actions_parent_id_idx" ON "blog_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_cta_actions_locale_idx" ON "blog_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "blog_blocks_cta_order_idx" ON "blog_blocks_cta" USING btree ("_order");
  CREATE INDEX "blog_blocks_cta_parent_id_idx" ON "blog_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_cta_path_idx" ON "blog_blocks_cta" USING btree ("_path");
  CREATE INDEX "blog_blocks_cta_locale_idx" ON "blog_blocks_cta" USING btree ("_locale");
  CREATE INDEX "blog_blocks_cta_background_image_idx" ON "blog_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "blog_tags_order_idx" ON "blog_tags" USING btree ("_order");
  CREATE INDEX "blog_tags_parent_id_idx" ON "blog_tags" USING btree ("_parent_id");
  CREATE INDEX "blog_featured_image_idx" ON "blog" USING btree ("featured_image_id");
  CREATE INDEX "blog_category_idx" ON "blog" USING btree ("category_id");
  CREATE INDEX "blog_meta_meta_image_idx" ON "blog" USING btree ("meta_image_id");
  CREATE INDEX "blog_open_graph_open_graph_image_idx" ON "blog" USING btree ("open_graph_image_id");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_author_idx" ON "blog" USING btree ("author_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "blog__status_idx" ON "blog" USING btree ("_status");
  CREATE UNIQUE INDEX "blog_locales_locale_parent_id_unique" ON "blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_rels_order_idx" ON "blog_rels" USING btree ("order");
  CREATE INDEX "blog_rels_parent_idx" ON "blog_rels" USING btree ("parent_id");
  CREATE INDEX "blog_rels_path_idx" ON "blog_rels" USING btree ("path");
  CREATE INDEX "blog_rels_blog_id_idx" ON "blog_rels" USING btree ("blog_id");
  CREATE INDEX "_blog_v_blocks_hero_blog_post_order_idx" ON "_blog_v_blocks_hero_blog_post" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_hero_blog_post_parent_id_idx" ON "_blog_v_blocks_hero_blog_post" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_hero_blog_post_path_idx" ON "_blog_v_blocks_hero_blog_post" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_hero_blog_post_locale_idx" ON "_blog_v_blocks_hero_blog_post" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_rich_text_order_idx" ON "_blog_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_rich_text_parent_id_idx" ON "_blog_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_rich_text_path_idx" ON "_blog_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_rich_text_locale_idx" ON "_blog_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_content_columns_order_idx" ON "_blog_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_content_columns_parent_id_idx" ON "_blog_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_content_columns_locale_idx" ON "_blog_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_content_order_idx" ON "_blog_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_content_parent_id_idx" ON "_blog_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_content_path_idx" ON "_blog_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_content_locale_idx" ON "_blog_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_gallery_images_order_idx" ON "_blog_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_gallery_images_parent_id_idx" ON "_blog_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_gallery_images_locale_idx" ON "_blog_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_gallery_images_image_idx" ON "_blog_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_blog_v_blocks_gallery_order_idx" ON "_blog_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_gallery_parent_id_idx" ON "_blog_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_gallery_path_idx" ON "_blog_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_gallery_locale_idx" ON "_blog_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_faq_items_order_idx" ON "_blog_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_faq_items_parent_id_idx" ON "_blog_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_faq_items_locale_idx" ON "_blog_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_faq_order_idx" ON "_blog_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_faq_parent_id_idx" ON "_blog_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_faq_path_idx" ON "_blog_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_faq_locale_idx" ON "_blog_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_cta_actions_order_idx" ON "_blog_v_blocks_cta_actions" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_cta_actions_parent_id_idx" ON "_blog_v_blocks_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_cta_actions_locale_idx" ON "_blog_v_blocks_cta_actions" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_cta_order_idx" ON "_blog_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_cta_parent_id_idx" ON "_blog_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_cta_path_idx" ON "_blog_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_cta_locale_idx" ON "_blog_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_blog_v_blocks_cta_background_image_idx" ON "_blog_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_blog_v_version_tags_order_idx" ON "_blog_v_version_tags" USING btree ("_order");
  CREATE INDEX "_blog_v_version_tags_parent_id_idx" ON "_blog_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_parent_idx" ON "_blog_v" USING btree ("parent_id");
  CREATE INDEX "_blog_v_version_version_featured_image_idx" ON "_blog_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_v_version_version_category_idx" ON "_blog_v" USING btree ("version_category_id");
  CREATE INDEX "_blog_v_version_meta_version_meta_image_idx" ON "_blog_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_v_version_open_graph_version_open_graph_image_idx" ON "_blog_v" USING btree ("version_open_graph_image_id");
  CREATE INDEX "_blog_v_version_version_slug_idx" ON "_blog_v" USING btree ("version_slug");
  CREATE INDEX "_blog_v_version_version_author_idx" ON "_blog_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_v_version_version_updated_at_idx" ON "_blog_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_v_version_version_created_at_idx" ON "_blog_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");
  CREATE INDEX "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");
  CREATE INDEX "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");
  CREATE INDEX "_blog_v_snapshot_idx" ON "_blog_v" USING btree ("snapshot");
  CREATE INDEX "_blog_v_published_locale_idx" ON "_blog_v" USING btree ("published_locale");
  CREATE INDEX "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_blog_v_locales_locale_parent_id_unique" ON "_blog_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_rels_order_idx" ON "_blog_v_rels" USING btree ("order");
  CREATE INDEX "_blog_v_rels_parent_idx" ON "_blog_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_v_rels_path_idx" ON "_blog_v_rels" USING btree ("path");
  CREATE INDEX "_blog_v_rels_blog_id_idx" ON "_blog_v_rels" USING btree ("blog_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_upload_mime_types_order_idx" ON "forms_blocks_upload_mime_types" USING btree ("_order");
  CREATE INDEX "forms_blocks_upload_mime_types_parent_id_idx" ON "forms_blocks_upload_mime_types" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_upload_order_idx" ON "forms_blocks_upload" USING btree ("_order");
  CREATE INDEX "forms_blocks_upload_parent_id_idx" ON "forms_blocks_upload" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_upload_path_idx" ON "forms_blocks_upload" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_upload_locales_locale_parent_id_unique" ON "forms_blocks_upload_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_submission_uploads_order_idx" ON "form_submissions_submission_uploads" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_uploads_parent_id_idx" ON "form_submissions_submission_uploads" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_media_id_idx" ON "form_submissions_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_integrations_webhooks_events_order_idx" ON "site_settings_integrations_webhooks_events" USING btree ("order");
  CREATE INDEX "site_settings_integrations_webhooks_events_parent_idx" ON "site_settings_integrations_webhooks_events" USING btree ("parent_id");
  CREATE INDEX "site_settings_integrations_webhooks_order_idx" ON "site_settings_integrations_webhooks" USING btree ("_order");
  CREATE INDEX "site_settings_integrations_webhooks_parent_id_idx" ON "site_settings_integrations_webhooks" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_o_g_image_idx" ON "site_settings" USING btree ("default_o_g_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_submenu_order_idx" ON "header_navigation_submenu" USING btree ("_order");
  CREATE INDEX "header_navigation_submenu_parent_id_idx" ON "header_navigation_submenu" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_submenu_page_idx" ON "header_navigation_submenu" USING btree ("page_id");
  CREATE UNIQUE INDEX "header_navigation_submenu_locales_locale_parent_id_unique" ON "header_navigation_submenu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_order_idx" ON "header_navigation" USING btree ("_order");
  CREATE INDEX "header_navigation_parent_id_idx" ON "header_navigation" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_page_idx" ON "header_navigation" USING btree ("page_id");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_addresses_order_idx" ON "footer_addresses" USING btree ("_order");
  CREATE INDEX "footer_addresses_parent_id_idx" ON "footer_addresses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_addresses_locales_locale_parent_id_unique" ON "footer_addresses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_phones_order_idx" ON "footer_phones" USING btree ("_order");
  CREATE INDEX "footer_phones_parent_id_idx" ON "footer_phones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_phones_locales_locale_parent_id_unique" ON "footer_phones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_bottom_links_locales_locale_parent_id_unique" ON "footer_bottom_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "pages_blocks_hero_home" CASCADE;
  DROP TABLE "tdsts_images" CASCADE;
  DROP TABLE "tdsts" CASCADE;
  DROP TABLE "pages_blocks_hero_actions" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_cta_actions" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_image_feature" CASCADE;
  DROP TABLE "pages_blocks_media_showcase_items" CASCADE;
  DROP TABLE "pages_blocks_media_showcase" CASCADE;
  DROP TABLE "pages_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "pages_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "pages_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "pages_blocks_partners_carousel" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards" CASCADE;
  DROP TABLE "pages_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "pages_blocks_alternating_content" CASCADE;
  DROP TABLE "pages_blocks_blog_posts_list" CASCADE;
  DROP TABLE "pages_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "pages_blocks_video_testimonials" CASCADE;
  DROP TABLE "pages_blocks_social_feed_stats" CASCADE;
  DROP TABLE "pages_blocks_social_feed" CASCADE;
  DROP TABLE "pages_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "pages_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "pages_blocks_program_showcase" CASCADE;
  DROP TABLE "pages_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "pages_blocks_founders_carousel" CASCADE;
  DROP TABLE "pages_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_mission_stats" CASCADE;
  DROP TABLE "pages_blocks_values_list_values" CASCADE;
  DROP TABLE "pages_blocks_values_list" CASCADE;
  DROP TABLE "pages_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_text_testimonials" CASCADE;
  DROP TABLE "pages_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_map_embed" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "pages_blocks_address_list_offices" CASCADE;
  DROP TABLE "pages_blocks_address_list" CASCADE;
  DROP TABLE "pages_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "pages_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "pages_blocks_memories_grid" CASCADE;
  DROP TABLE "pages_blocks_education_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_education_stats" CASCADE;
  DROP TABLE "pages_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_venture_grid" CASCADE;
  DROP TABLE "pages_blocks_photo_grid" CASCADE;
  DROP TABLE "pages_blocks_gallery_hero" CASCADE;
  DROP TABLE "pages_blocks_gallery_cta" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_related_items_items" CASCADE;
  DROP TABLE "pages_blocks_related_items" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_home" CASCADE;
  DROP TABLE "_tdsts_v_images" CASCADE;
  DROP TABLE "_tdsts_v" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_image_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "_pages_v_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "_pages_v_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_alternating_content" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_posts_list" CASCADE;
  DROP TABLE "_pages_v_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "_pages_v_blocks_video_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_social_feed_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_social_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "_pages_v_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "_pages_v_blocks_program_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "_pages_v_blocks_founders_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_values_list_values" CASCADE;
  DROP TABLE "_pages_v_blocks_values_list" CASCADE;
  DROP TABLE "_pages_v_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_text_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_map_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "_pages_v_blocks_address_list_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_address_list" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_memories_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_education_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_education_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_venture_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_related_items_items" CASCADE;
  DROP TABLE "_pages_v_blocks_related_items" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "program_types_blocks_hero_actions" CASCADE;
  DROP TABLE "program_types_blocks_hero" CASCADE;
  DROP TABLE "program_types_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "program_types_blocks_hero_home" CASCADE;
  DROP TABLE "program_types_blocks_rich_text" CASCADE;
  DROP TABLE "program_types_blocks_content_columns" CASCADE;
  DROP TABLE "program_types_blocks_content" CASCADE;
  DROP TABLE "program_types_blocks_gallery_images" CASCADE;
  DROP TABLE "program_types_blocks_gallery" CASCADE;
  DROP TABLE "program_types_blocks_faq_items" CASCADE;
  DROP TABLE "program_types_blocks_faq" CASCADE;
  DROP TABLE "program_types_blocks_cta_actions" CASCADE;
  DROP TABLE "program_types_blocks_cta" CASCADE;
  DROP TABLE "program_types_blocks_image_feature" CASCADE;
  DROP TABLE "program_types_blocks_media_showcase_items" CASCADE;
  DROP TABLE "program_types_blocks_media_showcase" CASCADE;
  DROP TABLE "program_types_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "program_types_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "program_types_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "program_types_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "program_types_blocks_partners_carousel" CASCADE;
  DROP TABLE "program_types_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "program_types_blocks_feature_cards" CASCADE;
  DROP TABLE "program_types_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "program_types_blocks_alternating_content" CASCADE;
  DROP TABLE "program_types_blocks_blog_posts_list" CASCADE;
  DROP TABLE "program_types_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "program_types_blocks_video_testimonials" CASCADE;
  DROP TABLE "program_types_blocks_social_feed_stats" CASCADE;
  DROP TABLE "program_types_blocks_social_feed" CASCADE;
  DROP TABLE "program_types_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "program_types_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "program_types_blocks_program_showcase" CASCADE;
  DROP TABLE "program_types_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "program_types_blocks_founders_carousel" CASCADE;
  DROP TABLE "program_types_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "program_types_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "program_types_blocks_mission_stats" CASCADE;
  DROP TABLE "program_types_blocks_values_list_values" CASCADE;
  DROP TABLE "program_types_blocks_values_list" CASCADE;
  DROP TABLE "program_types_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "program_types_blocks_text_testimonials" CASCADE;
  DROP TABLE "program_types_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "program_types_blocks_map_embed" CASCADE;
  DROP TABLE "program_types_blocks_contact_form" CASCADE;
  DROP TABLE "program_types_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "program_types_blocks_address_list_offices" CASCADE;
  DROP TABLE "program_types_blocks_address_list" CASCADE;
  DROP TABLE "program_types_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "program_types_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "program_types_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "program_types_blocks_related_items_items" CASCADE;
  DROP TABLE "program_types_blocks_related_items" CASCADE;
  DROP TABLE "program_types_blocks_memories_grid" CASCADE;
  DROP TABLE "program_types_blocks_education_stats_stats" CASCADE;
  DROP TABLE "program_types_blocks_education_stats" CASCADE;
  DROP TABLE "program_types_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "program_types_blocks_venture_grid" CASCADE;
  DROP TABLE "program_types_blocks_photo_grid" CASCADE;
  DROP TABLE "program_types_blocks_gallery_hero" CASCADE;
  DROP TABLE "program_types_blocks_gallery_cta" CASCADE;
  DROP TABLE "program_types_blocks_form_block" CASCADE;
  DROP TABLE "pl_filters_by_country" CASCADE;
  DROP TABLE "pl" CASCADE;
  DROP TABLE "program_types" CASCADE;
  DROP TABLE "program_types_locales" CASCADE;
  DROP TABLE "program_types_rels" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero_home" CASCADE;
  DROP TABLE "_program_types_v_blocks_rich_text" CASCADE;
  DROP TABLE "_program_types_v_blocks_content_columns" CASCADE;
  DROP TABLE "_program_types_v_blocks_content" CASCADE;
  DROP TABLE "_program_types_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_program_types_v_blocks_gallery" CASCADE;
  DROP TABLE "_program_types_v_blocks_faq_items" CASCADE;
  DROP TABLE "_program_types_v_blocks_faq" CASCADE;
  DROP TABLE "_program_types_v_blocks_cta_actions" CASCADE;
  DROP TABLE "_program_types_v_blocks_cta" CASCADE;
  DROP TABLE "_program_types_v_blocks_image_feature" CASCADE;
  DROP TABLE "_program_types_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_program_types_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_program_types_v_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "_program_types_v_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "_program_types_v_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "_program_types_v_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "_program_types_v_blocks_partners_carousel" CASCADE;
  DROP TABLE "_program_types_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_program_types_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_program_types_v_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "_program_types_v_blocks_alternating_content" CASCADE;
  DROP TABLE "_program_types_v_blocks_blog_posts_list" CASCADE;
  DROP TABLE "_program_types_v_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "_program_types_v_blocks_video_testimonials" CASCADE;
  DROP TABLE "_program_types_v_blocks_social_feed_stats" CASCADE;
  DROP TABLE "_program_types_v_blocks_social_feed" CASCADE;
  DROP TABLE "_program_types_v_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "_program_types_v_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "_program_types_v_blocks_program_showcase" CASCADE;
  DROP TABLE "_program_types_v_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "_program_types_v_blocks_founders_carousel" CASCADE;
  DROP TABLE "_program_types_v_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "_program_types_v_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "_program_types_v_blocks_mission_stats" CASCADE;
  DROP TABLE "_program_types_v_blocks_values_list_values" CASCADE;
  DROP TABLE "_program_types_v_blocks_values_list" CASCADE;
  DROP TABLE "_program_types_v_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "_program_types_v_blocks_text_testimonials" CASCADE;
  DROP TABLE "_program_types_v_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "_program_types_v_blocks_map_embed" CASCADE;
  DROP TABLE "_program_types_v_blocks_contact_form" CASCADE;
  DROP TABLE "_program_types_v_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "_program_types_v_blocks_address_list_offices" CASCADE;
  DROP TABLE "_program_types_v_blocks_address_list" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "_program_types_v_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "_program_types_v_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "_program_types_v_blocks_related_items_items" CASCADE;
  DROP TABLE "_program_types_v_blocks_related_items" CASCADE;
  DROP TABLE "_program_types_v_blocks_memories_grid" CASCADE;
  DROP TABLE "_program_types_v_blocks_education_stats_stats" CASCADE;
  DROP TABLE "_program_types_v_blocks_education_stats" CASCADE;
  DROP TABLE "_program_types_v_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "_program_types_v_blocks_venture_grid" CASCADE;
  DROP TABLE "_program_types_v_blocks_photo_grid" CASCADE;
  DROP TABLE "_program_types_v_blocks_gallery_hero" CASCADE;
  DROP TABLE "_program_types_v_blocks_gallery_cta" CASCADE;
  DROP TABLE "_program_types_v_blocks_form_block" CASCADE;
  DROP TABLE "_pl_v_filters_by_country" CASCADE;
  DROP TABLE "_pl_v" CASCADE;
  DROP TABLE "_program_types_v" CASCADE;
  DROP TABLE "_program_types_v_locales" CASCADE;
  DROP TABLE "_program_types_v_rels" CASCADE;
  DROP TABLE "programs_detail_why_participate_benefits" CASCADE;
  DROP TABLE "programs_detail_jobs_items" CASCADE;
  DROP TABLE "programs_detail_destinations_items" CASCADE;
  DROP TABLE "programs_detail_benefits_showcase_items" CASCADE;
  DROP TABLE "programs_detail_requirements" CASCADE;
  DROP TABLE "programs_detail_memories_images" CASCADE;
  DROP TABLE "programs_detail_features" CASCADE;
  DROP TABLE "programs_blocks_hero_actions" CASCADE;
  DROP TABLE "programs_blocks_hero" CASCADE;
  DROP TABLE "programs_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "programs_blocks_hero_home" CASCADE;
  DROP TABLE "programs_blocks_rich_text" CASCADE;
  DROP TABLE "programs_blocks_content_columns" CASCADE;
  DROP TABLE "programs_blocks_content" CASCADE;
  DROP TABLE "programs_blocks_gallery_images" CASCADE;
  DROP TABLE "programs_blocks_gallery" CASCADE;
  DROP TABLE "programs_blocks_faq_items" CASCADE;
  DROP TABLE "programs_blocks_faq" CASCADE;
  DROP TABLE "programs_blocks_cta_actions" CASCADE;
  DROP TABLE "programs_blocks_cta" CASCADE;
  DROP TABLE "programs_blocks_image_feature" CASCADE;
  DROP TABLE "programs_blocks_media_showcase_items" CASCADE;
  DROP TABLE "programs_blocks_media_showcase" CASCADE;
  DROP TABLE "programs_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "programs_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "programs_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "programs_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "programs_blocks_partners_carousel" CASCADE;
  DROP TABLE "programs_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "programs_blocks_feature_cards" CASCADE;
  DROP TABLE "programs_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "programs_blocks_alternating_content" CASCADE;
  DROP TABLE "programs_blocks_blog_posts_list" CASCADE;
  DROP TABLE "programs_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "programs_blocks_video_testimonials" CASCADE;
  DROP TABLE "programs_blocks_social_feed_stats" CASCADE;
  DROP TABLE "programs_blocks_social_feed" CASCADE;
  DROP TABLE "programs_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "programs_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "programs_blocks_program_showcase" CASCADE;
  DROP TABLE "programs_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "programs_blocks_founders_carousel" CASCADE;
  DROP TABLE "programs_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "programs_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "programs_blocks_mission_stats" CASCADE;
  DROP TABLE "programs_blocks_values_list_values" CASCADE;
  DROP TABLE "programs_blocks_values_list" CASCADE;
  DROP TABLE "programs_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "programs_blocks_text_testimonials" CASCADE;
  DROP TABLE "programs_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "programs_blocks_map_embed" CASCADE;
  DROP TABLE "programs_blocks_contact_form" CASCADE;
  DROP TABLE "programs_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "programs_blocks_address_list_offices" CASCADE;
  DROP TABLE "programs_blocks_address_list" CASCADE;
  DROP TABLE "programs_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "programs_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "programs_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "programs_blocks_related_items_items" CASCADE;
  DROP TABLE "programs_blocks_related_items" CASCADE;
  DROP TABLE "programs_blocks_memories_grid" CASCADE;
  DROP TABLE "programs_blocks_education_stats_stats" CASCADE;
  DROP TABLE "programs_blocks_education_stats" CASCADE;
  DROP TABLE "programs_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "programs_blocks_venture_grid" CASCADE;
  DROP TABLE "programs_blocks_photo_grid" CASCADE;
  DROP TABLE "programs_blocks_gallery_hero" CASCADE;
  DROP TABLE "programs_blocks_gallery_cta" CASCADE;
  DROP TABLE "programs_blocks_form_block" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "programs_locales" CASCADE;
  DROP TABLE "programs_rels" CASCADE;
  DROP TABLE "_programs_v_version_detail_why_participate_benefits" CASCADE;
  DROP TABLE "_programs_v_version_detail_jobs_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_destinations_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_benefits_showcase_items" CASCADE;
  DROP TABLE "_programs_v_version_detail_requirements" CASCADE;
  DROP TABLE "_programs_v_version_detail_memories_images" CASCADE;
  DROP TABLE "_programs_v_version_detail_features" CASCADE;
  DROP TABLE "_programs_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_programs_v_blocks_hero" CASCADE;
  DROP TABLE "_programs_v_blocks_hero_home_opportunities" CASCADE;
  DROP TABLE "_programs_v_blocks_hero_home" CASCADE;
  DROP TABLE "_programs_v_blocks_rich_text" CASCADE;
  DROP TABLE "_programs_v_blocks_content_columns" CASCADE;
  DROP TABLE "_programs_v_blocks_content" CASCADE;
  DROP TABLE "_programs_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_programs_v_blocks_gallery" CASCADE;
  DROP TABLE "_programs_v_blocks_faq_items" CASCADE;
  DROP TABLE "_programs_v_blocks_faq" CASCADE;
  DROP TABLE "_programs_v_blocks_cta_actions" CASCADE;
  DROP TABLE "_programs_v_blocks_cta" CASCADE;
  DROP TABLE "_programs_v_blocks_image_feature" CASCADE;
  DROP TABLE "_programs_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_programs_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_programs_v_blocks_decorated_c_t_a_top_images" CASCADE;
  DROP TABLE "_programs_v_blocks_decorated_c_t_a_bottom_images" CASCADE;
  DROP TABLE "_programs_v_blocks_decorated_c_t_a" CASCADE;
  DROP TABLE "_programs_v_blocks_partners_carousel_partners" CASCADE;
  DROP TABLE "_programs_v_blocks_partners_carousel" CASCADE;
  DROP TABLE "_programs_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_programs_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_programs_v_blocks_alternating_content_rows" CASCADE;
  DROP TABLE "_programs_v_blocks_alternating_content" CASCADE;
  DROP TABLE "_programs_v_blocks_blog_posts_list" CASCADE;
  DROP TABLE "_programs_v_blocks_video_testimonials_videos" CASCADE;
  DROP TABLE "_programs_v_blocks_video_testimonials" CASCADE;
  DROP TABLE "_programs_v_blocks_social_feed_stats" CASCADE;
  DROP TABLE "_programs_v_blocks_social_feed" CASCADE;
  DROP TABLE "_programs_v_blocks_program_showcase_program_types" CASCADE;
  DROP TABLE "_programs_v_blocks_program_showcase_programs" CASCADE;
  DROP TABLE "_programs_v_blocks_program_showcase" CASCADE;
  DROP TABLE "_programs_v_blocks_founders_carousel_founders" CASCADE;
  DROP TABLE "_programs_v_blocks_founders_carousel" CASCADE;
  DROP TABLE "_programs_v_blocks_mission_stats_paragraphs" CASCADE;
  DROP TABLE "_programs_v_blocks_mission_stats_stats" CASCADE;
  DROP TABLE "_programs_v_blocks_mission_stats" CASCADE;
  DROP TABLE "_programs_v_blocks_values_list_values" CASCADE;
  DROP TABLE "_programs_v_blocks_values_list" CASCADE;
  DROP TABLE "_programs_v_blocks_text_testimonials_testimonials" CASCADE;
  DROP TABLE "_programs_v_blocks_text_testimonials" CASCADE;
  DROP TABLE "_programs_v_blocks_map_embed_supporting_paragraphs" CASCADE;
  DROP TABLE "_programs_v_blocks_map_embed" CASCADE;
  DROP TABLE "_programs_v_blocks_contact_form" CASCADE;
  DROP TABLE "_programs_v_blocks_address_list_offices_phones" CASCADE;
  DROP TABLE "_programs_v_blocks_address_list_offices" CASCADE;
  DROP TABLE "_programs_v_blocks_address_list" CASCADE;
  DROP TABLE "_programs_v_blocks_hero_with_image_grid_images" CASCADE;
  DROP TABLE "_programs_v_blocks_hero_with_image_grid" CASCADE;
  DROP TABLE "_programs_v_blocks_prompt_c_t_a" CASCADE;
  DROP TABLE "_programs_v_blocks_related_items_items" CASCADE;
  DROP TABLE "_programs_v_blocks_related_items" CASCADE;
  DROP TABLE "_programs_v_blocks_memories_grid" CASCADE;
  DROP TABLE "_programs_v_blocks_education_stats_stats" CASCADE;
  DROP TABLE "_programs_v_blocks_education_stats" CASCADE;
  DROP TABLE "_programs_v_blocks_venture_grid_cards" CASCADE;
  DROP TABLE "_programs_v_blocks_venture_grid" CASCADE;
  DROP TABLE "_programs_v_blocks_photo_grid" CASCADE;
  DROP TABLE "_programs_v_blocks_gallery_hero" CASCADE;
  DROP TABLE "_programs_v_blocks_gallery_cta" CASCADE;
  DROP TABLE "_programs_v_blocks_form_block" CASCADE;
  DROP TABLE "_programs_v" CASCADE;
  DROP TABLE "_programs_v_locales" CASCADE;
  DROP TABLE "_programs_v_rels" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "blog_categories_locales" CASCADE;
  DROP TABLE "_blog_categories_v" CASCADE;
  DROP TABLE "_blog_categories_v_locales" CASCADE;
  DROP TABLE "blog_blocks_hero_blog_post" CASCADE;
  DROP TABLE "blog_blocks_rich_text" CASCADE;
  DROP TABLE "blog_blocks_content_columns" CASCADE;
  DROP TABLE "blog_blocks_content" CASCADE;
  DROP TABLE "blog_blocks_gallery_images" CASCADE;
  DROP TABLE "blog_blocks_gallery" CASCADE;
  DROP TABLE "blog_blocks_faq_items" CASCADE;
  DROP TABLE "blog_blocks_faq" CASCADE;
  DROP TABLE "blog_blocks_cta_actions" CASCADE;
  DROP TABLE "blog_blocks_cta" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "blog_locales" CASCADE;
  DROP TABLE "blog_rels" CASCADE;
  DROP TABLE "_blog_v_blocks_hero_blog_post" CASCADE;
  DROP TABLE "_blog_v_blocks_rich_text" CASCADE;
  DROP TABLE "_blog_v_blocks_content_columns" CASCADE;
  DROP TABLE "_blog_v_blocks_content" CASCADE;
  DROP TABLE "_blog_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_blog_v_blocks_gallery" CASCADE;
  DROP TABLE "_blog_v_blocks_faq_items" CASCADE;
  DROP TABLE "_blog_v_blocks_faq" CASCADE;
  DROP TABLE "_blog_v_blocks_cta_actions" CASCADE;
  DROP TABLE "_blog_v_blocks_cta" CASCADE;
  DROP TABLE "_blog_v_version_tags" CASCADE;
  DROP TABLE "_blog_v" CASCADE;
  DROP TABLE "_blog_v_locales" CASCADE;
  DROP TABLE "_blog_v_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_blocks_upload_mime_types" CASCADE;
  DROP TABLE "forms_blocks_upload" CASCADE;
  DROP TABLE "forms_blocks_upload_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions_submission_uploads" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings_integrations_webhooks_events" CASCADE;
  DROP TABLE "site_settings_integrations_webhooks" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_navigation_submenu" CASCADE;
  DROP TABLE "header_navigation_submenu_locales" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_addresses" CASCADE;
  DROP TABLE "footer_addresses_locales" CASCADE;
  DROP TABLE "footer_phones" CASCADE;
  DROP TABLE "footer_phones_locales" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer_bottom_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_home_background_type";
  DROP TYPE "public"."enum_pages_blocks_hero_home_background_color";
  DROP TYPE "public"."enum_hero_action_style";
  DROP TYPE "public"."enum_hero_variant";
  DROP TYPE "public"."enum_hero_highlight";
  DROP TYPE "public"."enum_hero_bg_color";
  DROP TYPE "public"."enum_hero_text_color";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_cta_actions_style";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_blocks_image_feature_background_color";
  DROP TYPE "public"."enum_pages_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum_partners_highlight";
  DROP TYPE "public"."enum_partners_heading";
  DROP TYPE "public"."enum_partners_bg";
  DROP TYPE "public"."enum_fc_card_panel_color";
  DROP TYPE "public"."enum_fc_card_text_color";
  DROP TYPE "public"."enum_fc_bg_color";
  DROP TYPE "public"."enum_alt_image_position";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum_pages_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum_pages_blocks_social_feed_platform";
  DROP TYPE "public"."enum_pages_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum_ms_bg_color";
  DROP TYPE "public"."enum_ms_value_color";
  DROP TYPE "public"."enum_vl_bg_color";
  DROP TYPE "public"."enum_map_bg_color";
  DROP TYPE "public"."enum_cf_bg_color";
  DROP TYPE "public"."enum_al_bg_color";
  DROP TYPE "public"."enum_higrid_highlight";
  DROP TYPE "public"."enum_higrid_bg_color";
  DROP TYPE "public"."enum_memories_grid_bg";
  DROP TYPE "public"."enum_edu_stats_bg";
  DROP TYPE "public"."enum_edu_stats_heading";
  DROP TYPE "public"."enum_edu_stats_value";
  DROP TYPE "public"."enum_venture_bg";
  DROP TYPE "public"."enum_venture_heading";
  DROP TYPE "public"."enum_photo_grid_bg";
  DROP TYPE "public"."enum_gallery_hero_bg";
  DROP TYPE "public"."enum_gallery_cta_highlight";
  DROP TYPE "public"."enum_gallery_cta_heading";
  DROP TYPE "public"."enum_ri_columns";
  DROP TYPE "public"."enum_ri_bg_color";
  DROP TYPE "public"."enum_pages_structured_data_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_home_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_home_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cta_actions_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background";
  DROP TYPE "public"."enum__pages_v_blocks_image_feature_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum__pages_v_blocks_social_feed_platform";
  DROP TYPE "public"."enum__pages_v_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum__pages_v_version_structured_data_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_program_types_blocks_hero_home_background_type";
  DROP TYPE "public"."enum_program_types_blocks_hero_home_background_color";
  DROP TYPE "public"."enum_program_types_blocks_rich_text_width";
  DROP TYPE "public"."enum_program_types_blocks_content_columns_size";
  DROP TYPE "public"."enum_program_types_blocks_gallery_layout";
  DROP TYPE "public"."enum_program_types_blocks_cta_actions_style";
  DROP TYPE "public"."enum_program_types_blocks_cta_background";
  DROP TYPE "public"."enum_program_types_blocks_image_feature_background_color";
  DROP TYPE "public"."enum_program_types_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum_program_types_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum_program_types_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum_program_types_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum_program_types_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum_program_types_blocks_social_feed_platform";
  DROP TYPE "public"."enum_program_types_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum_pl_filters_by_country";
  DROP TYPE "public"."enum_pl_display_mode";
  DROP TYPE "public"."enum_pl_filters_sort_by";
  DROP TYPE "public"."enum_pl_layout_cards_per_row";
  DROP TYPE "public"."enum_pl_layout_card_style";
  DROP TYPE "public"."enum_program_types_structured_data_type";
  DROP TYPE "public"."enum_program_types_status";
  DROP TYPE "public"."enum__program_types_v_blocks_hero_home_background_type";
  DROP TYPE "public"."enum__program_types_v_blocks_hero_home_background_color";
  DROP TYPE "public"."enum__program_types_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__program_types_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__program_types_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__program_types_v_blocks_cta_actions_style";
  DROP TYPE "public"."enum__program_types_v_blocks_cta_background";
  DROP TYPE "public"."enum__program_types_v_blocks_image_feature_background_color";
  DROP TYPE "public"."enum__program_types_v_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum__program_types_v_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum__program_types_v_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum__program_types_v_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum__program_types_v_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum__program_types_v_blocks_social_feed_platform";
  DROP TYPE "public"."enum__program_types_v_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum__pl_v_filters_by_country";
  DROP TYPE "public"."enum__pl_v_display_mode";
  DROP TYPE "public"."enum__pl_v_filters_sort_by";
  DROP TYPE "public"."enum__pl_v_layout_cards_per_row";
  DROP TYPE "public"."enum__pl_v_layout_card_style";
  DROP TYPE "public"."enum__program_types_v_version_structured_data_type";
  DROP TYPE "public"."enum__program_types_v_version_status";
  DROP TYPE "public"."enum__program_types_v_published_locale";
  DROP TYPE "public"."enum_prog_req_icon";
  DROP TYPE "public"."enum_prog_feat_icon";
  DROP TYPE "public"."enum_programs_blocks_hero_home_background_type";
  DROP TYPE "public"."enum_programs_blocks_hero_home_background_color";
  DROP TYPE "public"."enum_programs_blocks_rich_text_width";
  DROP TYPE "public"."enum_programs_blocks_content_columns_size";
  DROP TYPE "public"."enum_programs_blocks_gallery_layout";
  DROP TYPE "public"."enum_programs_blocks_cta_actions_style";
  DROP TYPE "public"."enum_programs_blocks_cta_background";
  DROP TYPE "public"."enum_programs_blocks_image_feature_background_color";
  DROP TYPE "public"."enum_programs_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum_programs_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum_programs_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum_programs_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum_programs_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum_programs_blocks_social_feed_platform";
  DROP TYPE "public"."enum_programs_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum_programs_country";
  DROP TYPE "public"."enum_programs_course_educational_level";
  DROP TYPE "public"."enum_programs_course_course_mode";
  DROP TYPE "public"."enum_programs_status";
  DROP TYPE "public"."enum__programs_v_blocks_hero_home_background_type";
  DROP TYPE "public"."enum__programs_v_blocks_hero_home_background_color";
  DROP TYPE "public"."enum__programs_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__programs_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__programs_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__programs_v_blocks_cta_actions_style";
  DROP TYPE "public"."enum__programs_v_blocks_cta_background";
  DROP TYPE "public"."enum__programs_v_blocks_image_feature_background_color";
  DROP TYPE "public"."enum__programs_v_blocks_media_showcase_aspect_ratio";
  DROP TYPE "public"."enum__programs_v_blocks_decorated_c_t_a_background_color";
  DROP TYPE "public"."enum__programs_v_blocks_blog_posts_list_display_mode";
  DROP TYPE "public"."enum__programs_v_blocks_blog_posts_list_background_color";
  DROP TYPE "public"."enum__programs_v_blocks_social_feed_stats_number_color";
  DROP TYPE "public"."enum__programs_v_blocks_social_feed_platform";
  DROP TYPE "public"."enum__programs_v_blocks_program_showcase_background_color";
  DROP TYPE "public"."enum__programs_v_version_country";
  DROP TYPE "public"."enum__programs_v_version_course_educational_level";
  DROP TYPE "public"."enum__programs_v_version_course_course_mode";
  DROP TYPE "public"."enum__programs_v_version_status";
  DROP TYPE "public"."enum__programs_v_published_locale";
  DROP TYPE "public"."enum_blog_categories_structured_data_type";
  DROP TYPE "public"."enum_blog_categories_status";
  DROP TYPE "public"."enum__blog_categories_v_version_structured_data_type";
  DROP TYPE "public"."enum__blog_categories_v_version_status";
  DROP TYPE "public"."enum__blog_categories_v_published_locale";
  DROP TYPE "public"."enum_blog_blocks_hero_blog_post_variant";
  DROP TYPE "public"."enum_blog_blocks_rich_text_width";
  DROP TYPE "public"."enum_blog_blocks_content_columns_size";
  DROP TYPE "public"."enum_blog_blocks_gallery_layout";
  DROP TYPE "public"."enum_blog_blocks_cta_actions_style";
  DROP TYPE "public"."enum_blog_blocks_cta_background";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum__blog_v_blocks_hero_blog_post_variant";
  DROP TYPE "public"."enum__blog_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__blog_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__blog_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__blog_v_blocks_cta_actions_style";
  DROP TYPE "public"."enum__blog_v_blocks_cta_background";
  DROP TYPE "public"."enum__blog_v_version_status";
  DROP TYPE "public"."enum__blog_v_published_locale";
  DROP TYPE "public"."enum_forms_blocks_upload_upload_collection";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_redirect_type";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_site_settings_socials_platform";
  DROP TYPE "public"."enum_site_settings_integrations_webhooks_events";
  DROP TYPE "public"."enum_header_navigation_type";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
