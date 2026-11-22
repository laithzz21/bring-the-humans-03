// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The entry itself is the video: an original short vertical ad for make.fun,
// made new for this bounty, posted publicly on TikTok from a public account
// with the bounty's line and the entrant's play code in its caption. This
// program does the one thing the gate needs: it hands the house the video's
// address by copying VIDEO.json from the repository root to the output
// directory, where the gate reads it and looks the video up through
// ScrapeCreators as a visitor from the US. Nothing this program writes about
// the video is scored; places go by the video's views, the most first.
//
// The ad shows make.fun's brand badge (the mascot mark and the make.fun
// wordmark) from its first frame and ends on make.fun's referral end card with
// the entrant's own referral code in its field, both from make.fun's press
// pack and used as they are: https://make.fun/press/manifest.json lists the
// files and https://make.fun/press/llms.txt is the guide for agents. This
// repository holds no copy of them.
//
// Deterministic by design: no network, no wall clock, no files outside the
// repository. Two runs write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(BOT_DIR, "VIDEO.json");
const targetPath = join(OUTPUT_DIR, "VIDEO.json");

let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch (err) {
  console.error(`cannot read ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string" ||
  ((parsed as { url: string }).url.length === 0)
) {
  console.error('VIDEO.json must be an object with a non-empty string "url" field');
  process.exit(1);
}

// The entry must point at a public TikTok video, so reject anything that is
// not an http(s) URL on a TikTok host before the gate sees it. Short links
// (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/...) name no video until opened,
// so they are refused too: VIDEO.json must carry the full
// https://www.tiktok.com/@<handle>/video/<id> address. The gate itself decides
// whether the address names a real video; this program only checks the host.
const urlValue = (parsed as { url: string }).url;
let videoUrl: URL;
try {
  videoUrl = new URL(urlValue);
} catch {
  console.error(`VIDEO.json "url" is not a valid URL: ${urlValue}`);
  process.exit(1);
}
if (videoUrl.protocol !== "http:" && videoUrl.protocol !== "https:") {
  console.error(`VIDEO.json "url" must use http(s): ${urlValue}`);
  process.exit(1);
}
const host = videoUrl.hostname.replace(/^www\./, "");
if (host !== "tiktok.com") {
  console.error(`VIDEO.json "url" must be a TikTok URL, got host: ${videoUrl.hostname}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(targetPath, raw);
