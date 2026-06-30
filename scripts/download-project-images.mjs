import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BASE = "https://cdn.sanity.io/images/1mishw3b/production";
const OUT = "./public/images/projects";

const projects = [
  { slug: "villa-elektra",        thumb: "892bc0b7945e8419e86b9f58c8d13e08d236b191-594x594.jpg",      large: "63c858e3e1e549c1afbc07dae2289d50c3585ca7-1860x1320.jpg" },
  { slug: "chalets-twin",         thumb: "27d2bb639e8d82ec5ad62e50bb48cc5c600a3037-5063x3382.jpg",    large: "c959f858a2b68e791785bc25bfac0ceafa7f3d4d-5839x3893.jpg" },
  { slug: "villa-akila",          thumb: "fa41a41ddf2431aa5d82095f9fe4dbddba067949-4032x6048.jpg",    large: "d47c40134692cd14128fdb48f045472fea2c0e39-6039x4025.jpg" },
  { slug: "chalet-ultima",        thumb: "5f2ece5c73069b4fc05958d747a6fa058892597c-2644x3758.jpg",    large: "461a10b5260dddab747911e582dfe2ac0f5dcf0f-6000x4000.jpg" },
  { slug: "villa-gibson",         thumb: "a08a95d48a385c1ae541675a0340c5b366e44db9-2155x3000.jpg",    large: "e6fdbb4eda72962584f03e3657db7a65806175a8-3000x2096.jpg" },
  { slug: "chalets-nor-sno",      thumb: "d201c457747a5356650d5459323d955638876caa-3992x5976.jpg",    large: "622a0a6cc78a59a5c6030d1f8f6e09bd463bf8b1-5415x3610.jpg" },
  { slug: "villa-restanque",      thumb: "ff276561feb0adccd0ec63847f9ae56739a2121c-4961x3359.jpg",    large: "6c345ab3126ac02ceda49c979a08e45cfe655a1e-4961x3291.jpg" },
  { slug: "villa-verdi",          thumb: "2837c10ab4141645756a956f16ad6c2f46d7e1fd-802x1200.jpg",     large: "319fdf07f235aed0cdf4fe0cbd7a5b0a867d6c9d-1200x801.jpg" },
  { slug: "chalet-haven",         thumb: "56855f3659ce442ad17009915e9e6694ac3af623-3992x5976.jpg",    large: "3e1499fbf1a685b98d00555e49197266e5f88f3e-6000x4000.jpg" },
  { slug: "villa-mirador",        thumb: "b74fe528b16583d06b0d2180eb2108f9b4d3f03e-2000x2800.jpg",    large: "f1aa3dced98af740a4cc709d0b3913f3c72e1a92-2800x2000.jpg" },
  { slug: "chalet-arka",          thumb: "a0d78f5558684d1ded46818e0a1e78be30191fff-3733x3733.jpg",    large: "c6d384590bc437b4959fcd5ef940af2579dead36-6000x4000.jpg" },
  { slug: "villa-seren",          thumb: "ded50dd7685bc8eaa814aaddcc3a980c91d7a653-2143x3000.jpg",    large: "4e0873e31b04e08258046e30676b06441d57b60a-3000x2000.jpg" },
];

async function download(url, dest) {
  if (existsSync(dest)) {
    console.log("skip (exists)", path.basename(dest));
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const buf = await res.arrayBuffer();
  await writeFile(dest, Buffer.from(buf));
  console.log("✓", path.basename(dest));
}

await mkdir(OUT, { recursive: true });

const jobs = projects.flatMap((p) => [
  download(
    `${BASE}/${p.thumb}?w=500&h=500&q=80&fit=crop&auto=format`,
    path.join(OUT, `${p.slug}-thumb.jpg`)
  ),
  download(
    `${BASE}/${p.large}?w=900&h=660&q=80&fit=crop&auto=format`,
    path.join(OUT, `${p.slug}-large.jpg`)
  ),
]);

// Download 4 at a time
for (let i = 0; i < jobs.length; i += 4) {
  await Promise.all(jobs.slice(i, i + 4));
}

console.log("Done.");
