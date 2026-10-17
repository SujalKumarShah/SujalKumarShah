import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import sharp from "sharp";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  SiGithub, SiLinkedin, SiGmail, SiLeetcode, SiCplusplus,
  SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiLinux, SiGit, SiCodechef,
} from "react-icons/si";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "assets/readme");
// Keep the compact displayed size, with three source pixels per CSS pixel.
const rasterDensity = 216;
await mkdir(output, { recursive: true });
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const icon = (component) => renderToStaticMarkup(React.createElement(component, { size: 18, color: "#fafafa" }));
const rulers = Array.from({ length: 21 }, (_, i) => {
  const length = i % 5 === 0 ? 14 : 6;
  return `<path d="M${28 - length} ${i * 10}h${length}M852 ${i * 10}h${length}"/>`;
}).join("");
function header(caption) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="210" viewBox="0 0 880 210">
  <rect width="880" height="210" rx="12" fill="#09090b"/>
  <g stroke="#242429" stroke-width="1"><path d="M28 0v210M852 0v210M28 48h824M28 160h824"/>${rulers}</g>
  <g font-family="Arial,sans-serif">
    <text x="60" y="31" fill="#ededf0" font-size="13" font-weight="600">@code by SUJAL</text>
    <circle cx="647" cy="26" r="3" fill="#22c55e"/>
    <text x="661" y="30" fill="#b0b0bb" font-size="10" letter-spacing="1.1">OPEN TO INTERNSHIPS</text>
    <text x="60" y="106" fill="#fafafa" font-size="46" font-weight="700" letter-spacing="-1.5">Sujal Kumar Shah</text>
    <text x="60" y="143" fill="#fafafa" font-size="25" font-weight="700" letter-spacing="-.5">I build &amp; solve.</text>
    <text x="310" y="141" fill="#b0b0bb" font-size="15">Software Developer &amp; Systems Engineer</text>
  </g>
  <text x="60" y="190" font-family="monospace" font-size="12" fill="#22c55e">$</text>
  <text x="77" y="190" font-family="monospace" font-size="12" fill="#b0b0bb">${escape(caption)}<tspan fill="#fafafa"> _</tspan></text>
  </svg>`;
}
await sharp(Buffer.from(header("understand first. build second.")), { density: rasterDensity }).png().toFile(join(output, "header-static@3x.png"));
const captions = ["C++ / data structures / algorithms", "Linux / systems / shell tooling", "Next.js / React / TypeScript"];
const timeline = [];
for (const caption of captions) {
  for (let i = 0; i < caption.length; i += 3) timeline.push(caption.slice(0, i + 3));
  for (let i = 0; i < 8; i++) timeline.push(caption);
}
// pageHeight belongs to the raw INPUT. Without it, GIF encodes one tall image.
const frameBuffers = [];
for (const caption of timeline) {
  frameBuffers.push(await sharp(Buffer.from(header(caption)), { density: rasterDensity }).raw().toBuffer({ resolveWithObject: true }));
}
const { width, height, channels } = frameBuffers[0].info;
await sharp(Buffer.concat(frameBuffers.map(frame => frame.data)), {
  raw: { width, height: height * frameBuffers.length, channels, pageHeight: height },
}).gif({ loop: 0, delay: timeline.map(() => 140), colours: 256 })
  .toFile(join(output, "header@3x.gif"));
const animation = await sharp(join(output, "header@3x.gif"), { animated: true }).metadata();
if (animation.width !== 2640 || animation.pageHeight !== 630 || animation.pages < 2)
  throw new Error("README banner must be a compact multi-frame animation");
const links = [
  ["portfolio", "PORTFOLIO", "VISIT", SiNextdotjs],
  ["linkedin", "LINKEDIN", "CONNECT", SiLinkedin],
  ["email", "GMAIL", "EMAIL", SiGmail],
  ["leetcode", "LEETCODE", "PROFILE", SiLeetcode],
  ["github", "GITHUB", "FOLLOW", SiGithub],
  ["codechef", "CODECHEF", "PROFILE", SiCodechef],
];
for (const [name, label, action, component] of links) {
  const left = 46 + label.length * 8.5;
  const right = 28 + action.length * 8;
  const width = left + right;
  const graphic = name === "portfolio" ? '<svg width="18" height="18" viewBox="0 0 32 32"><path d="M23 8h-5c-.5-2-2-3-5-3-4 0-6 2-6 5 0 3 2 4 6 5l3 1c2 .5 3 1 3 3 0 2-2 3-5 3s-5-1-5-3H4c0 5 4 8 10 8s10-3 10-8c0-4-3-6-7-7l-3-1c-2-.5-3-1-3-2 0-1 1-2 3-2s3 1 3 2h6z" fill="#fafafa"/></svg>' : icon(component);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40"><rect x=".5" y=".5" width="${width - 1}" height="39" rx="9" fill="#18181b" stroke="#3f3f46"/><path d="M${left} 1h${right - 9}q8 0 8 8v22q0 8-8 8h-${right - 9}z" fill="#303036"/><g transform="translate(14 11)">${graphic}</g><text x="40" y="25" font-family="monospace" font-size="12" fill="#e4e4e7" letter-spacing="1.2">${label}</text><text x="${left + right / 2}" y="25" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#fafafa" letter-spacing="1.2">${action}</text></svg>`;
  await writeFile(join(output, `link-${name}.svg`), svg);
}
for (const [name, label, component] of [
  ["cpp", "C++", SiCplusplus], ["typescript", "TypeScript", SiTypescript],
  ["javascript", "JavaScript", SiJavascript], ["react", "React", SiReact],
  ["nextjs", "Next.js", SiNextdotjs], ["tailwind", "Tailwind CSS", SiTailwindcss],
  ["linux", "Linux", SiLinux], ["git", "Git", SiGit],
]) {
  const width = 43 + label.length * 7.3;
  await writeFile(join(output, `stack-${name}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="32"><rect x=".5" y=".5" width="${width - 1}" height="31" rx="8" fill="#18181b" stroke="#303036"/><g transform="translate(9 7)">${icon(component)}</g><text x="34" y="21" fill="#e4e4e7" font-family="Arial,sans-serif" font-size="12">${label}</text></svg>`);
}
console.log("Created local README visuals and a verified 2640 × 630 animation.");
