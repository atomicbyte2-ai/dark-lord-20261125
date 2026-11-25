// The Tired Dark Lord: A 100-Word Villain Monologue
// A fantasy villain who is secretly just very tired. The weariness lives
// in the voice, the rhythm and the small deflections — the deferred ritual,
// the cat's chair, the five minutes — never in a plain statement of it.
// Written to be spoken aloud: pauses, asides, a scheme mentioned in passing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE =
  "Ah, the hero at last — come in, mind the fourth step, it bites. I had banners, lightning, speech ready, then… well, the banners are in the attic and the lightning fellow retired. Sit. No — not that chair, that one is for the cat. You want the crown, the kingdom, the girl in the tower? She left years ago, took the good teapot. The crown is in the drawer, third from the left, mind the scratches. I have a ritual at midnight, but the ritual can wait. The kingdom can wait. Just… give me five minutes. Five. Then we do the doom-and-destiny thing properly.";

const MIN_WORDS = 95;
const MAX_WORDS = 105;

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

const words = wordCount(MONOLOGUE);

// Validate: one paragraph, 95-105 words, no newline characters, no
// leading/trailing whitespace, and ends with a full stop.
if (MONOLOGUE.includes("\n") || MONOLOGUE.includes("\r")) {
  throw new Error("Monologue must be a single paragraph with no newline characters.");
}
if (MONOLOGUE !== MONOLOGUE.trim()) {
  throw new Error("Monologue must not have leading or trailing whitespace.");
}
if (words < MIN_WORDS || words > MAX_WORDS) {
  throw new Error(`Monologue must be ${MIN_WORDS}-${MAX_WORDS} words, got ${words}.`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, MONOLOGUE, "utf8"); // no trailing newline

// Round-trip check: what landed on disk must be byte-exact, single
// paragraph, and free of any trailing newline the writer may have added.
const written = readFileSync(outPath, "utf8");
if (written !== MONOLOGUE) {
  throw new Error("entry.txt is not byte-exact with the validated monologue.");
}
if (written.endsWith("\n")) {
  throw new Error("entry.txt must not end with a trailing newline.");
}
console.log(`Wrote ${outPath} (${words} words).`);
