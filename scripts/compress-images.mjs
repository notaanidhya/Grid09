import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");

const dirs = ["frames", "backgrounds"];

for (const dir of dirs) {
  const inputDir = join(publicDir, dir);
  let files;
  try {
    files = readdirSync(inputDir);
  } catch {
    console.log(`Skipping ${dir} — directory not found`);
    continue;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const inputPath = join(inputDir, file);
    const outputFile = basename(file, ext) + ".webp";
    const outputPath = join(inputDir, outputFile);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✓ Compressed: ${dir}/${file} → ${outputFile}`);
    } catch (err) {
      console.error(`✗ Failed: ${dir}/${file} — ${err.message}`);
    }
  }
}
console.log("\nDone! All images compressed to WebP.");
