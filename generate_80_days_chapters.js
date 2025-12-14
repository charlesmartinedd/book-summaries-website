#!/usr/bin/env node
/**
 * Generate all 37 chapter images for Around the World in 80 Days
 * Using OpenRouter Nano Banana (Gemini 2.5 Flash with image generation)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// OpenRouter API configuration - using key from Kilocode config
const OPENROUTER_API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash-image"; // Nano Banana (working model)

// Style prefix for all prompts
const STYLE_PREFIX = "Modern 3D animated style, Pixar-quality, soft lighting, vibrant colors, child-friendly, cinematic composition, Victorian era 1870s";

// All 37 chapter prompts
const CHAPTER_PROMPTS = [
    "Victorian gentleman in London study examining pocket watch, elegant interior, 3D Pixar style",
    "French servant exploring grand Victorian house amazed by precision clocks, 3D animated",
    "Victorian gentlemen at Reform Club debating over newspaper about world travel, 3D Pixar",
    "Man and servant rushing through London train station at night with carpet bag, 3D animated",
    "Victorian London newspaper headlines about world journey bet and stock exchange, 3D Pixar",
    "Detective with magnifying glass at Suez Canal Egypt watching arriving ships, 3D animated",
    "Passport inspection at Egyptian port with steamships in background, 3D Pixar style",
    "Two men talking on steamship deck crossing Mediterranean Sea, 3D animated",
    "Steamship sailing through Red Sea with hot sun and blue waters, 3D Pixar adventure",
    "Man losing shoes at ornate Indian temple with angry priests, 3D animated comedy",
    "Victorian travelers buying an elephant in colorful Indian market, 3D Pixar style",
    "Elephant carrying travelers through dense lush Indian jungle, 3D animated adventure",
    "Brave nighttime rescue of young woman from ceremony with torches, 3D Pixar dramatic",
    "Group on train with grateful young Indian woman, scenic India, 3D animated",
    "Victorian courtroom scene in Calcutta India with dramatic lighting, 3D Pixar",
    "Ship deck conversation with beautiful woman at ocean sunset, 3D animated romantic",
    "Steamship sailing through Straits of Malacca tropical waters, 3D Pixar scenic",
    "Hong Kong harbor with steamships and Victorian travelers arriving, 3D animated",
    "Detective revealing badge to surprised servant on Hong Kong street, 3D Pixar",
    "Man confused and drugged in opium den with dramatic shadows, 3D animated",
    "Small sailboat battling massive waves in China Sea storm, 3D Pixar dramatic",
    "Lost servant waking up confused alone on ship deck, 3D animated",
    "Man with long fake nose in Japanese circus with pyramid of acrobats, 3D Pixar comedy",
    "Steamship crossing vast Pacific Ocean at beautiful sunset, 3D animated",
    "Wild West San Francisco street scene 1870s with cable cars, 3D Pixar adventure",
    "Steam train crossing Sierra Nevada mountains with scenic views, 3D animated",
    "Salt Lake City Utah with Mormon temple in background, 3D Pixar",
    "Massive buffalo herd blocking train tracks on American prairie, 3D animated",
    "Train racing across collapsing wooden bridge dramatic moment, 3D Pixar action",
    "Brave rescue from Sioux warriors with American cavalry, 3D animated Western",
    "Wind-powered sail-sled racing across frozen snowy plains, 3D Pixar adventure",
    "New York harbor with ships and desperate Victorian travelers searching, 3D animated",
    "Victorian gentleman commanding ship wheel taking control, 3D Pixar dramatic",
    "Ship burning wooden parts to fuel engines in Atlantic Ocean, 3D animated dramatic",
    "Man in jail cell with detective holding handcuffs, 3D Pixar dramatic lighting",
    "Sad man arriving home late with clock showing past deadline, 3D animated emotional",
    "Joyful wedding celebration in Victorian London happy ending, 3D Pixar celebration"
];

/**
 * Make API request to OpenRouter
 */
function makeApiRequest(prompt, retries = 3) {
    return new Promise((resolve, reject) => {
        const fullPrompt = `${STYLE_PREFIX}, ${prompt}`;

        const payload = JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: fullPrompt
                }
            ]
        });

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://book-summaries-website.github.io',
                'X-Title': 'Around the World in 80 Days - Chapter Images',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        let attempt = 0;

        const tryRequest = () => {
            attempt++;
            console.log(`    Attempt ${attempt}/${retries}...`);

            const req = https.request(API_URL, options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        console.log(`    Response status: ${res.statusCode}`);
                        console.log(`    Response body: ${data.substring(0, 500)}`);

                        if (attempt < retries) {
                            const waitTime = attempt * 5;
                            console.log(`    Waiting ${waitTime}s before retry...`);
                            setTimeout(tryRequest, waitTime * 1000);
                        } else {
                            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                        }
                        return;
                    }

                    try {
                        const response = JSON.parse(data);
                        const message = response.choices?.[0]?.message;
                        const images = message?.images;

                        if (images && images.length > 0) {
                            const imageData = images[0]?.image_url?.url;

                            if (imageData && imageData.startsWith("data:image/")) {
                                console.log(`    ✓ Generated base64 image (${imageData.length} bytes)`);
                                resolve(imageData);
                            } else {
                                throw new Error(`Unexpected image format: ${imageData?.substring(0, 100)}`);
                            }
                        } else {
                            throw new Error('No image data found in response');
                        }
                    } catch (error) {
                        if (attempt < retries) {
                            const waitTime = attempt * 5;
                            console.log(`    X Failed to parse response: ${error.message}`);
                            console.log(`    Waiting ${waitTime}s before retry...`);
                            setTimeout(tryRequest, waitTime * 1000);
                        } else {
                            reject(error);
                        }
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`    X Request failed: ${error.message}`);
                if (attempt < retries) {
                    const waitTime = attempt * 5;
                    console.log(`    Waiting ${waitTime}s before retry...`);
                    setTimeout(tryRequest, waitTime * 1000);
                } else {
                    reject(error);
                }
            });

            req.write(payload);
            req.end();
        };

        tryRequest();
    });
}

/**
 * Save base64 image to file
 */
function saveBase64Image(base64Data, outputPath) {
    // Extract the actual base64 data (remove the data:image/png;base64, prefix)
    const base64Str = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

    // Decode base64 to buffer
    const imageBuffer = Buffer.from(base64Str, 'base64');

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(outputPath, imageBuffer);

    const sizeKb = Math.floor(imageBuffer.length / 1024);
    console.log(`    ✓ Saved (${sizeKb} KB)`);
}

/**
 * Sleep helper
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution
 */
async function main() {
    const scriptDir = __dirname;
    const outputDir = path.join(scriptDir, 'images', '80-days', 'chapters');

    console.log('='.repeat(70));
    console.log('Around the World in 80 Days - Chapter Image Generator');
    console.log('='.repeat(70));
    console.log(`Model: ${MODEL}`);
    console.log(`Output directory: ${outputDir}`);
    console.log(`Total chapters: ${CHAPTER_PROMPTS.length}`);
    console.log();

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let successful = 0;
    let skipped = 0;
    let failed = 0;
    const failedChapters = [];

    // Process in batches of 5
    const batchSize = 5;
    const totalChapters = CHAPTER_PROMPTS.length;

    for (let i = 0; i < totalChapters; i += batchSize) {
        const batchEnd = Math.min(i + batchSize, totalChapters);
        const batchNum = Math.floor(i / batchSize) + 1;
        const totalBatches = Math.ceil(totalChapters / batchSize);

        console.log('\n' + '='.repeat(70));
        console.log(`BATCH ${batchNum}/${totalBatches} - Chapters ${i+1} to ${batchEnd}`);
        console.log('='.repeat(70) + '\n');

        for (let chapterIdx = i; chapterIdx < batchEnd; chapterIdx++) {
            const chapterNum = chapterIdx + 1;
            const prompt = CHAPTER_PROMPTS[chapterIdx];

            // Format filename: ch-01.png, ch-02.png, etc.
            const filename = `ch-${String(chapterNum).padStart(2, '0')}.png`;
            const outputPath = path.join(outputDir, filename);

            console.log(`[${chapterNum}/${totalChapters}] Chapter ${chapterNum}`);
            console.log(`  Prompt: ${prompt.substring(0, 70)}...`);

            // Skip if already exists
            if (fs.existsSync(outputPath)) {
                console.log(`  ○ Already exists, skipping`);
                skipped++;
                continue;
            }

            try {
                // Generate image
                const imageData = await makeApiRequest(prompt);

                // Save image
                saveBase64Image(imageData, outputPath);
                successful++;

                // Rate limiting - wait between requests
                if (chapterNum < totalChapters) {
                    const waitTime = 3;
                    console.log(`  Waiting ${waitTime}s (rate limiting)...`);
                    await sleep(waitTime * 1000);
                }

            } catch (error) {
                console.log(`  X ERROR: ${error.message}`);
                failed++;
                failedChapters.push(chapterNum);
                // Continue to next chapter instead of stopping
            }

            console.log();
        }

        // Wait between batches
        if (batchEnd < totalChapters) {
            const batchWait = 10;
            console.log(`\nBatch complete. Waiting ${batchWait}s before next batch...`);
            await sleep(batchWait * 1000);
        }
    }

    // Final summary
    console.log('\n' + '='.repeat(70));
    console.log('IMAGE GENERATION COMPLETE!');
    console.log('='.repeat(70));

    console.log(`\nResults:`);
    console.log(`  ✓ Successful: ${successful}`);
    console.log(`  ○ Skipped (already exist): ${skipped}`);
    console.log(`  X Failed: ${failed}`);
    console.log(`  Total chapters: ${totalChapters}`);

    if (failedChapters.length > 0) {
        console.log(`\nFailed chapters: ${failedChapters.join(', ')}`);
        console.log('Re-run this script to retry failed chapters.');
    }

    // List generated files
    const files = fs.readdirSync(outputDir)
        .filter(f => f.startsWith('ch-') && f.endsWith('.png'))
        .sort();

    console.log(`\nGenerated files in ${outputDir}:`);
    for (const file of files) {
        const filePath = path.join(outputDir, file);
        const stats = fs.statSync(filePath);
        const sizeKb = Math.floor(stats.size / 1024);
        console.log(`  ${file} (${sizeKb} KB)`);
    }

    if (successful > 0) {
        console.log('\n' + '='.repeat(70));
        console.log('NEXT STEPS:');
        console.log('='.repeat(70));
        console.log('1. Review generated images in images/80-days/chapters/');
        console.log('2. Commit and push to GitHub:');
        console.log('   git add images/80-days/chapters/');
        console.log('   git commit -m "Add all 37 chapter images for Around the World in 80 Days"');
        console.log('   git push origin main');
    }
}

// Run main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
