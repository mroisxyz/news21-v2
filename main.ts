import { mkdirSync, copyFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Front page: a Saturday 21 November 2026 broadsheet-style news infographic.
// Masthead and dateline sit above a strip of COP31, missile, quake and market stat tiles.
// Three lead columns cover the climate summit, Houthi missiles over Saudi Arabia and a Peru quake.
// A grid of numbered story cards, a world map and a "Date check" panel fill the lower page.
// All 35 stories are dated to the day, with source labels and a "how to read" key at the foot.

function describeOutput(outDir: string, size: number): void {
  process.stderr.write(`Output directory: ${outDir}\n`);
  process.stderr.write(`entry.png size: ${size} bytes\n`);
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = join(scriptDir, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const destination = join(outDir, "entry.png");
copyFileSync(source, destination);

const size = statSync(destination).size;
process.stderr.write(`Copied entry.png to ${destination} (${size} bytes)\n`);
describeOutput(outDir, size);
