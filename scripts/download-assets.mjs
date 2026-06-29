/**
 * Downloads fonts and images from archidomo.fr for local use.
 * Run: node scripts/download-assets.mjs
 */
import { createWriteStream, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    mkdirSync(dirname(dest), { recursive: true });
    const file = createWriteStream(dest);
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      })
      .on("error", (err) => { file.close(); reject(err); });
  });
}

async function downloadAll(assets, concurrency = 4) {
  const queue = [...assets];
  const workers = Array(concurrency).fill(null).map(async () => {
    while (queue.length > 0) {
      const asset = queue.shift();
      try {
        console.log(`⬇  ${asset.dest}`);
        await download(asset.url, join(ROOT, asset.dest));
        console.log(`✓  ${asset.dest}`);
      } catch (e) {
        console.error(`✗  ${asset.dest}: ${e.message}`);
      }
    }
  });
  await Promise.all(workers);
}

const fonts = [
  { url: "https://www.archidomo.fr/fonts/maison-neue-regular.woff2",    dest: "public/fonts/maison-neue-regular.woff2" },
  { url: "https://www.archidomo.fr/fonts/maison-neue-medium.woff2",     dest: "public/fonts/maison-neue-medium.woff2" },
  { url: "https://www.archidomo.fr/fonts/maison-neue-mono-regular.woff2", dest: "public/fonts/maison-neue-mono-regular.woff2" },
  { url: "https://www.archidomo.fr/fonts/canela-light.woff2",           dest: "public/fonts/canela-light.woff2" },
];

// Sanity CDN images — base URL without query params for full resolution
const SANITY = "https://cdn.sanity.io/images/1mishw3b/production";
const images = [
  // Hero carousel
  { url: `${SANITY}/14869c13efded1dd7c96f9380427f9a4706c0ed3-3842x1896.jpg?w=1920&q=85&fit=crop&auto=format`, dest: "public/images/hero-1.jpg" },
  { url: `${SANITY}/55a9b6f3cd80c40ef3574765da79ee6d13e02638-5906x3937.jpg?w=1920&q=85&fit=crop&auto=format`, dest: "public/images/hero-2.jpg" },
];

console.log("Downloading fonts...");
await downloadAll(fonts, 4);

console.log("\nDownloading images...");
await downloadAll(images, 4);

console.log("\nAll done.");
