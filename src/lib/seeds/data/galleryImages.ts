/**
 * Gallery photo URLs ported from the legacy static
 * `app/gallery/gallery-data.ts` (30 photos on DO Spaces).
 *
 * Used by `seedPages.ts` to populate the Gallery page's PhotoGrid block
 * with real Media records instead of relying on the frontend's packaged
 * fallback set — so the editor sees actual uploads in admin and can
 * swap individual photos without rebuilding the whole grid.
 */

const DO = 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images'

export interface GalleryPhotoUrl {
  url: string
  /** Local filename used as the Media dedup key (stable across re-runs). */
  filename: string
  alt: string
}

export const GALLERY_PHOTOS: GalleryPhotoUrl[] = [
  { url: `${DO}/gallary-1.jpg`,   filename: 'gallery-01.jpg',  alt: 'Gallery photo 1' },
  { url: `${DO}/gallary-2.JPG`,   filename: 'gallery-02.jpg',  alt: 'Gallery photo 2' },
  { url: `${DO}/gallary-3.JPG`,   filename: 'gallery-03.jpg',  alt: 'Gallery photo 3' },
  { url: `${DO}/gallary-4.jpg`,   filename: 'gallery-04.jpg',  alt: 'Gallery photo 4' },
  { url: `${DO}/gallary-5.jpeg`,  filename: 'gallery-05.jpeg', alt: 'Gallery photo 5' },
  { url: `${DO}/gallary-6.jpg`,   filename: 'gallery-06.jpg',  alt: 'Gallery photo 6' },
  { url: `${DO}/gallary-7.jpg`,   filename: 'gallery-07.jpg',  alt: 'Gallery photo 7' },
  { url: `${DO}/gallary-8.jpg`,   filename: 'gallery-08.jpg',  alt: 'Gallery photo 8' },
  { url: `${DO}/gallary-9.jpg`,   filename: 'gallery-09.jpg',  alt: 'Gallery photo 9' },
  { url: `${DO}/gallary-10.jpg`,  filename: 'gallery-10.jpg',  alt: 'Gallery photo 10' },
  { url: `${DO}/gallary-11.jpeg`, filename: 'gallery-11.jpeg', alt: 'Gallery photo 11' },
  { url: `${DO}/gallary-21.JPG`,  filename: 'gallery-21.jpg',  alt: 'Gallery photo 12' },
  { url: `${DO}/gallary-13.jpg`,  filename: 'gallery-13.jpg',  alt: 'Gallery photo 13' },
  { url: `${DO}/gallary-14.jpg`,  filename: 'gallery-14.jpg',  alt: 'Gallery photo 14' },
  { url: `${DO}/gallary-15.jpg`,  filename: 'gallery-15.jpg',  alt: 'Gallery photo 15' },
  { url: `${DO}/gallary-16.jpg`,  filename: 'gallery-16.jpg',  alt: 'Gallery photo 16' },
  { url: `${DO}/gallary-17.JPG`,  filename: 'gallery-17.jpg',  alt: 'Gallery photo 17' },
  { url: `${DO}/gallary-18.jpg`,  filename: 'gallery-18.jpg',  alt: 'Gallery photo 18' },
  { url: `${DO}/gallary-19.JPG`,  filename: 'gallery-19.jpg',  alt: 'Gallery photo 19' },
  { url: `${DO}/gallary-20.JPG`,  filename: 'gallery-20.jpg',  alt: 'Gallery photo 20' },
  { url: `${DO}/gallary-12.jpeg`, filename: 'gallery-12.jpeg', alt: 'Gallery photo 21' },
  { url: `${DO}/gallary-22.JPG`,  filename: 'gallery-22.jpg',  alt: 'Gallery photo 22' },
  { url: `${DO}/gallary-23.JPG`,  filename: 'gallery-23.jpg',  alt: 'Gallery photo 23' },
  { url: `${DO}/gallary-24.JPG`,  filename: 'gallery-24.jpg',  alt: 'Gallery photo 24' },
  { url: `${DO}/gallary-25.JPG`,  filename: 'gallery-25.jpg',  alt: 'Gallery photo 25' },
  { url: `${DO}/gallary-26.jpg`,  filename: 'gallery-26.jpg',  alt: 'Gallery photo 26' },
  { url: `${DO}/gallary-27.jpg`,  filename: 'gallery-27.jpg',  alt: 'Gallery photo 27' },
  { url: `${DO}/gallary-28.jpg`,  filename: 'gallery-28.jpg',  alt: 'Gallery photo 28' },
  { url: `${DO}/gallary-29.jpg`,  filename: 'gallery-29.jpg',  alt: 'Gallery photo 29' },
  { url: `${DO}/gallary-30.jpg`,  filename: 'gallery-30.jpg',  alt: 'Gallery photo 30' },
]
