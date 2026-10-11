import { readFile, writeFile } from "node:fs/promises";

const manifestPatch = "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/load-manifest.js";
const marker = 'p.endsWith("preview-props")';

const source = await readFile(manifestPatch, "utf8");

if (!source.includes(marker)) {
  const target = 'p.endsWith("prefetch-hints"))';
  if (!source.includes(target)) {
    throw new Error(`Could not find the OpenNext manifest compatibility guard in ${manifestPatch}`);
  }

  await writeFile(
    manifestPatch,
    source.replace(target, 'p.endsWith("prefetch-hints") ||\n        p.endsWith("preview-props"))'),
  );
}
