import fs from 'node:fs/promises';

// Cache intrinsic dimensions in the repository; never fetch metadata during page requests.
const source = await fs.readFile('src/lib/projects.ts', 'utf8');
const urls = [...new Set(source.match(/https:\/\/res\.cloudinary\.com\/[^"\s]+/g))];
const dimensions = {};
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(urls.slice(i, i + 4).map(async url => {
    const response = await fetch(url.replace('/upload/', '/upload/fl_getinfo/'), { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Image metadata unavailable: ${response.status} ${url}`);
    const data = await response.json();
    const { width, height } = data.input;
    dimensions[url] = { width, height };
  }));
  console.log(`${Math.min(i + 4, urls.length)}/${urls.length}`);
}
await fs.writeFile('src/lib/image-dimensions.json', JSON.stringify(Object.fromEntries(Object.entries(dimensions).sort()), null, 2) + '\n');
