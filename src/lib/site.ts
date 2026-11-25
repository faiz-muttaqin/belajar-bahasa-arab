/** Public identity of the site, used for absolute URLs in link previews. */
export const SITE_NAME = 'Belajar Bahasa Arab';
export const SITE_ORIGIN = 'https://belajar-bahasa-arab.faizmuttaqin.com';
/** Social preview image in static/, rendered by scripts/build-brand-assets.mjs. */
export const OG_IMAGE = {
	url: `${SITE_ORIGIN}/og-image.png`,
	width: 1200,
	height: 630,
	alt: 'Belajar Bahasa Arab: dari huruf dan harakat sampai memahami kalimat, paragraf, dan dokumen pendek.'
} as const;
