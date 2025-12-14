#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate all 37 chapter images for Around the World in 80 Days
Using OpenRouter Nano Banana (Gemini 2.5 Flash Preview with image generation)
"""

import os
import sys
import requests
import time
import json
import base64
from pathlib import Path

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# OpenRouter API configuration
OPENROUTER_API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-2.5-flash-preview-05-20"  # Nano Banana - returns base64 images

# Base style for all images
BASE_STYLE = "Modern 3D animated style, Pixar-quality, soft lighting, vibrant colors, child-friendly, cinematic composition, Victorian era 1870s adventure"

# Chapter image prompts
CHAPTER_PROMPTS = [
    "Victorian gentleman in London study with pocket watch, 3D Pixar style",
    "French servant exploring grand Victorian house, marveling at precision clocks, 3D animated",
    "Victorian gentlemen at Reform Club debating over newspaper, dramatic lighting, 3D Pixar",
    "Man and servant rushing through London train station at night with carpet bag, 3D animated",
    "Victorian London newspaper headlines about world journey bet, stock exchange, 3D Pixar",
    "Detective with magnifying glass at Suez Canal watching ships, 3D animated Victorian",
    "Passport inspection at Egyptian port with ships in background, 3D Pixar style",
    "Two men talking on steamship deck, Mediterranean Sea, 3D animated",
    "Steamship sailing through Red Sea with hot sun, 3D Pixar adventure style",
    "Man losing shoes at ornate Indian temple, priests angry, 3D animated comedy",
    "Victorian travelers buying elephant in Indian market, 3D Pixar style",
    "Elephant carrying travelers through dense Indian jungle, 3D animated adventure",
    "Brave rescue of young woman from ceremony, nighttime torches, 3D Pixar dramatic",
    "Group on train with grateful young Indian woman, 3D animated",
    "Victorian courtroom in Calcutta India, dramatic lighting, 3D Pixar",
    "Ship deck conversation with beautiful woman, ocean sunset, 3D animated",
    "Steamship sailing through Straits of Malacca, tropical waters, 3D Pixar",
    "Hong Kong harbor with steamships, Victorian travelers arriving, 3D animated",
    "Detective revealing badge to surprised servant, Hong Kong street, 3D Pixar",
    "Man drugged and confused in opium den, dramatic lighting, 3D animated",
    "Small sailboat battling waves in China Sea storm, 3D Pixar dramatic",
    "Lost servant waking up confused on ship deck, 3D animated",
    "Man with long fake nose in Japanese circus, pyramid of acrobats, 3D Pixar comedy",
    "Steamship crossing vast Pacific Ocean, sunset, 3D animated",
    "Wild West San Francisco street scene 1870s, 3D Pixar adventure",
    "Steam train crossing Sierra Nevada mountains, scenic view, 3D animated",
    "Salt Lake City Utah Mormon temple in background, 3D Pixar",
    "Massive buffalo herd blocking train tracks on prairie, 3D animated",
    "Train racing across collapsing wooden bridge, dramatic moment, 3D Pixar action",
    "Brave rescue from Sioux warriors, American cavalry, 3D animated Western",
    "Wind-powered sail-sled racing across frozen plains, 3D Pixar adventure",
    "New York harbor ships, Victorian travelers searching desperately, 3D animated",
    "Victorian gentleman commanding ship, taking the wheel, 3D Pixar dramatic",
    "Ship on fire with crew burning wood to fuel engines, Atlantic Ocean, 3D animated",
    "Man in jail cell, detective with handcuffs, dramatic lighting, 3D Pixar",
    "Sad man arriving home late, clock showing past deadline, 3D animated emotional",
    "Joyful wedding celebration in Victorian London, happy ending, 3D Pixar"
]


def generate_image(prompt: str, chapter_num: int, retries: int = 3) -> str:
    """
    Generate an image using OpenRouter Nano Banana API

    Args:
        prompt: Text prompt for image generation
        chapter_num: Chapter number for context
        retries: Number of retry attempts on failure

    Returns:
        Base64 encoded image data
    """
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://book-summaries-website.github.io",
        "X-Title": "Book Summaries - 80 Days Chapter Generator"
    }

    # Combine base style with specific prompt
    full_prompt = f"{BASE_STYLE}. {prompt}"

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": full_prompt
            }
        ]
    }

    for attempt in range(retries):
        try:
            print(f"    Attempt {attempt + 1}/{retries}...")
            response = requests.post(API_URL, headers=headers, json=payload, timeout=120)

            if response.status_code != 200:
                print(f"    Response status: {response.status_code}")
                print(f"    Response body: {response.text[:500]}")

            response.raise_for_status()
            data = response.json()

            # Extract image data from Nano Banana response
            message = data.get("choices", [{}])[0].get("message", {})
            images = message.get("images", [])

            if images and len(images) > 0:
                # Extract base64 image data
                image_data = images[0].get("image_url", {}).get("url", "")

                # Check if it's base64 data
                if image_data.startswith("data:image/"):
                    print(f"    ✓ Generated base64 image ({len(image_data) // 1024} KB)")
                    return image_data
                else:
                    raise ValueError(f"Unexpected image format: {image_data[:100]}")
            else:
                raise ValueError(f"No image data found in response")

        except requests.exceptions.RequestException as e:
            print(f"    X Request failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"    Response text: {e.response.text[:500]}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 10
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise
        except (KeyError, IndexError, ValueError) as e:
            print(f"    X Failed to parse response: {e}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 10
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise

    raise RuntimeError(f"Failed to generate image for chapter {chapter_num} after {retries} attempts")


def save_base64_image(base64_data: str, output_path: Path) -> None:
    """
    Save a base64-encoded image to file

    Args:
        base64_data: Base64-encoded image data (data:image/png;base64,...)
        output_path: Path to save image
    """
    # Extract the actual base64 data (remove the data:image/png;base64, prefix)
    if "," in base64_data:
        base64_str = base64_data.split(",", 1)[1]
    else:
        base64_str = base64_data

    # Decode base64 to binary
    image_bytes = base64.b64decode(base64_str)

    # Create directory if needed and save
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(image_bytes)

    print(f"    ✓ Saved to {output_path.name} ({len(image_bytes) // 1024} KB)")


def main():
    """Main execution function"""
    script_dir = Path(__file__).parent
    chapters_dir = script_dir / "images" / "80-days" / "chapters"

    print("=" * 70)
    print("Around the World in 80 Days - Chapter Image Generator")
    print("=" * 70)
    print(f"Model: {MODEL} (Nano Banana)")
    print(f"Output: {chapters_dir}")
    print(f"Total chapters: {len(CHAPTER_PROMPTS)}")
    print(f"Base style: {BASE_STYLE}")
    print("=" * 70)
    print()

    # Create chapters directory if it doesn't exist
    chapters_dir.mkdir(parents=True, exist_ok=True)

    successful = 0
    skipped = 0
    failed = 0
    failed_chapters = []

    # Process in batches of 5 to avoid rate limits
    batch_size = 5
    total_chapters = len(CHAPTER_PROMPTS)

    for i in range(0, total_chapters, batch_size):
        batch_end = min(i + batch_size, total_chapters)
        batch_num = (i // batch_size) + 1
        total_batches = (total_chapters + batch_size - 1) // batch_size

        print(f"\n{'='*70}")
        print(f"BATCH {batch_num}/{total_batches}: Chapters {i+1}-{batch_end}")
        print(f"{'='*70}\n")

        for chapter_idx in range(i, batch_end):
            chapter_num = chapter_idx + 1
            prompt = CHAPTER_PROMPTS[chapter_idx]
            output_path = chapters_dir / f"ch-{chapter_num:02d}.png"

            print(f"[{chapter_num}/37] Chapter {chapter_num}")
            print(f"  Prompt: {prompt[:70]}...")

            # Skip if already exists
            if output_path.exists():
                print(f"    ⊙ Already exists, skipping")
                skipped += 1
                continue

            try:
                # Generate image
                image_data = generate_image(prompt, chapter_num)

                # Save base64 image
                save_base64_image(image_data, output_path)
                successful += 1

            except Exception as e:
                print(f"    ✗ ERROR: {e}")
                failed += 1
                failed_chapters.append(chapter_num)
                continue

            print()

        # Wait between batches (except after last batch)
        if batch_end < total_chapters:
            wait_time = 15
            print(f"\n{'~'*70}")
            print(f"Batch {batch_num} complete. Waiting {wait_time}s before next batch...")
            print(f"{'~'*70}")
            time.sleep(wait_time)

    # Final summary
    print("\n" + "=" * 70)
    print("GENERATION COMPLETE!")
    print("=" * 70)
    print(f"\nResults:")
    print(f"  ✓ Successful: {successful}")
    print(f"  ⊙ Skipped:    {skipped}")
    print(f"  ✗ Failed:     {failed}")
    print(f"  ━ Total:      {total_chapters}")

    if failed_chapters:
        print(f"\nFailed chapters: {', '.join(map(str, failed_chapters))}")
        print("You can re-run the script to retry failed chapters.")

    # Count actual generated files
    existing_files = sorted(chapters_dir.glob("ch-*.png"))
    print(f"\nImages in directory: {len(existing_files)}")

    if successful > 0:
        print("\n" + "=" * 70)
        print("NEXT STEPS:")
        print("=" * 70)
        print("1. Review generated images:")
        print(f"   explorer {chapters_dir}")
        print("\n2. Commit and push to GitHub:")
        print("   git add images/80-days/chapters/")
        print('   git commit -m "Add 37 chapter images for Around the World in 80 Days"')
        print("   git push origin main")


if __name__ == "__main__":
    main()
