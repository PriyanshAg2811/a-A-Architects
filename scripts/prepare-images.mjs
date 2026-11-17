import sharp from 'sharp';
import fs from 'node:fs/promises';

// Deterministic derivatives only. Keep the source artwork for future exports.
for (const theme of ['light', 'dark']) {
  // The tall mobile cover crop still needs the original width to avoid upscaling.
  for (const width of [1672]) {
    const file = `public/images/hero/hero-${theme}-${width}.webp`;
    await sharp(`public/images/hero/hero-${theme}.png`).resize({ width, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile(file);
    console.log(file, (await fs.stat(file)).size);
  }
}

// Rasterize the existing decorative noise once instead of filtering a form-sized SVG on every paint.
const noise = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="6" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="0.15"/><feFuncG type="linear" slope="0.15"/><feFuncB type="linear" slope="0.15"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#noise)" opacity="0.6"/></svg>`;
await sharp(Buffer.from(noise)).webp({ lossless: true }).toFile('public/images/noise.webp');
