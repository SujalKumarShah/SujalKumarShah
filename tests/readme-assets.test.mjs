import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";
const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root));
test("README animation has one compact canvas with multiple frames and a static fallback", async () => {
  const gif = await read("assets/readme/header@3x.gif");
  assert.equal(gif.readUInt16LE(6), 2640);
  assert.equal(gif.readUInt16LE(8), 630, "frames must not become one tall image");
  const metadata = await sharp(gif, { animated: true }).metadata();
  assert.ok(metadata.pages > 1);
  assert.equal(metadata.pageHeight, 630);
  const fallback = await sharp(await read("assets/readme/header-static@3x.png")).metadata();
  assert.equal(fallback.width, 2640); assert.equal(fallback.height, 630);
  const readme = (await read("README.md")).toString();
  assert.match(readme, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(readme, /priyanshu|sujalkumarshah\.com/i);
  for (const [, path] of readme.matchAll(/(?:src|srcset)="(assets\/[^\"]+)"/g)) await read(path);
});
test("statistics regeneration preserves every other README section", async () => {
  const before = (await read("README.md")).toString();
  await promisify(execFile)(process.execPath, ["scripts/update-readme-activity.mjs", "--render-only"], { cwd: root });
  const after = (await read("README.md")).toString();
  const surrounding = value => value.replace(/<!-- activity:start -->[\s\S]*?<!-- activity:end -->/, "ACTIVITY");
  assert.equal(surrounding(before), surrounding(after));
  assert.equal(after, before, "rendering the same snapshot is idempotent");
});
test("a failed public refresh preserves the README and last successful snapshot", async () => {
  const beforeREADME = await read("README.md");
  const beforeSnapshot = await read("assets/readme/activity.json");
  const partial = { ...JSON.parse(beforeSnapshot), errors: { calendar: true, repositories: false } };
  await assert.rejects(promisify(execFile)(process.execPath, ["scripts/update-readme-activity.mjs"], {
    cwd: root,
    env: { ...process.env, ACTIVITY_SOURCE_URL: `data:application/json,${encodeURIComponent(JSON.stringify(partial))}` },
  }), /Public activity is incomplete/);
  assert.deepEqual(await read("README.md"), beforeREADME);
  assert.deepEqual(await read("assets/readme/activity.json"), beforeSnapshot);
});
