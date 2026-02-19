import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const tasks = [
    {
        input: 'images/services/drei-kunden-reviews.webp',
        outputs: [
            { suffix: '-640', width: 640 },
            { suffix: '-1024', width: 1024 }
        ]
    },
    {
        input: 'images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp',
        outputs: [
            { suffix: '-small', width: 96 }
        ]
    }
];

async function processImages() {
    for (const task of tasks) {
        const inputPath = path.join(publicDir, task.input);

        if (!fs.existsSync(inputPath)) {
            console.error(`File not found: ${inputPath}`);
            continue;
        }

        const metadata = await sharp(inputPath).metadata();
        console.log(`Processing ${task.input} (${metadata.width}x${metadata.height})`);

        for (const output of task.outputs) {
            const parsed = path.parse(inputPath);
            const outputPath = path.join(parsed.dir, `${parsed.name}${output.suffix}${parsed.ext}`);

            await sharp(inputPath)
                .resize({ width: output.width })
                .toFile(outputPath);

            console.log(`  Created ${path.basename(outputPath)} (${output.width}w)`);
        }
    }
}

processImages().catch(err => {
    console.error(err);
    process.exit(1);
});
