import * as migration_20260625_094114_initial from './20260625_094114_initial';
import * as migration_20260728_103204_office_socials_gallery_heading from './20260728_103204_office_socials_gallery_heading';
import * as migration_20260806_122240 from './20260806_122240';
import * as migration_20260823_000000_media_image_sizes from './20260823_000000_media_image_sizes';

export const migrations = [
  {
    up: migration_20260625_094114_initial.up,
    down: migration_20260625_094114_initial.down,
    name: '20260625_094114_initial',
  },
  {
    up: migration_20260728_103204_office_socials_gallery_heading.up,
    down: migration_20260728_103204_office_socials_gallery_heading.down,
    name: '20260728_103204_office_socials_gallery_heading',
  },
  {
    up: migration_20260806_122240.up,
    down: migration_20260806_122240.down,
    name: '20260806_122240'
  },
  {
    up: migration_20260823_000000_media_image_sizes.up,
    down: migration_20260823_000000_media_image_sizes.down,
    name: '20260823_000000_media_image_sizes',
  },
];
