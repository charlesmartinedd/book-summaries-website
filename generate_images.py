#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate AI images for book summary website using OpenRouter DALL-E 3 API
"""

import os
import sys
import requests
import time
import json
import base64
from pathlib import Path

# Load .env if available
try:
    from dotenv import load_dotenv
    load_dotenv(Path.home() / ".env")
except ImportError:
    pass

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# OpenRouter API configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "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")
API_URL = "https://openrouter.ai/api/v1/chat/completions"
# Use Nano Banana (Gemini Flash with image generation) - fast, affordable, returns base64 images
MODEL = "google/gemini-2.5-flash-image"

# Base style for all images
BASE_STYLE = "modern 3D animated style, Pixar-quality, soft lighting, vibrant colors, child-friendly, cinematic composition"

# Image prompts
PROMPTS = {
    "christmas-carol": {
        "cover": f"Book cover for A Christmas Carol, Victorian London at night with snow, ghostly figures, Christmas wreath, {BASE_STYLE}",
        "stave-1": f"Victorian ghost Marley in chains visiting old man Scrooge at night, dramatic lighting, {BASE_STYLE}",
        "stave-2": f"Glowing spirit child with bright light showing a lonely boy at boarding school, magical Christmas past, {BASE_STYLE}",
        "stave-3": f"Jolly giant ghost in green robe surrounded by Christmas feast and happy family, warm golden lighting, {BASE_STYLE}",
        "stave-4": f"Dark hooded spirit pointing at gravestone in foggy cemetery, dramatic spooky lighting, {BASE_STYLE}",
        "stave-5": f"Joyful transformed Scrooge at window on snowy Christmas morning, celebration, happy family, {BASE_STYLE}",
    },
    "80-days": {
        "cover": f"Book cover for Around the World in 80 Days, Victorian gentleman with globe and hot air balloon, world map background, {BASE_STYLE}",
        "section-1": f"Victorian gentleman making a wager at elegant London club, globe and newspaper on table, {BASE_STYLE}",
        "section-2": f"Detective following travelers boarding steamship, Mediterranean port, suspenseful, {BASE_STYLE}",
        "section-3": f"Travelers riding elephant through lush Indian jungle, adventure scene, {BASE_STYLE}",
        "section-4": f"Small boat in stormy ocean near Hong Kong harbor, dramatic waves and lightning, {BASE_STYLE}",
        "section-5": f"Steam train crossing American Wild West prairies, action adventure, {BASE_STYLE}",
        "section-6": f"Ship on fire burning wood in Atlantic ocean, dramatic desperate sailors, {BASE_STYLE}",
        "section-7": f"Happy Victorian couple wedding celebration in London, joyful ending, {BASE_STYLE}",
    }
}


def generate_image(prompt: str, retries: int = 3) -> str:
    """
    Generate an image using OpenRouter DALL-E 3 API

    Args:
        prompt: Text prompt for image generation
        retries: Number of retry attempts on failure

    Returns:
        URL of generated image
    """
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://book-summaries-website.github.io",
        "X-Title": "Book Summaries Image Generator"
    }

    # DALL-E 3 via OpenRouter uses chat completions format
    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    for attempt in range(retries):
        try:
            print(f"  Attempt {attempt + 1}/{retries}...")
            response = requests.post(API_URL, headers=headers, json=payload, timeout=120)

            # Debug response
            if response.status_code != 200:
                print(f"  Response status: {response.status_code}")
                print(f"  Response body: {response.text}")

            response.raise_for_status()
            data = response.json()

            # Extract image data from Nano Banana response
            # The response contains base64-encoded image in the "images" field
            message = data.get("choices", [{}])[0].get("message", {})
            images = message.get("images", [])

            if images and len(images) > 0:
                # Extract base64 image data
                image_data = images[0].get("image_url", {}).get("url", "")

                # Check if it's base64 data
                if image_data.startswith("data:image/"):
                    print(f"  ✓ Generated base64 image ({len(image_data)} bytes)")
                    return image_data
                else:
                    raise ValueError(f"Unexpected image format: {image_data[:100]}")
            else:
                raise ValueError(f"No image data found in response: {json.dumps(data, indent=2)}")

        except requests.exceptions.RequestException as e:
            print(f"  X Request failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"  Response text: {e.response.text}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 5
                print(f"  Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise
        except (KeyError, IndexError, ValueError) as e:
            print(f"  X Failed to parse response: {e}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 5
                print(f"  Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise


def save_base64_image(base64_data: str, output_path: Path) -> None:
    """
    Save a base64-encoded image to file

    Args:
        base64_data: Base64-encoded image data (data:image/png;base64,...)
        output_path: Path to save image
    """
    print(f"  Saving to {output_path.name}...")

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

    print(f"  ✓ Saved ({len(image_bytes) // 1024} KB)")


def main():
    """Main execution function"""
    script_dir = Path(__file__).parent
    images_dir = script_dir / "images"

    print("=" * 60)
    print("Book Summaries Image Generator")
    print("=" * 60)
    print(f"Using model: {MODEL}")
    print(f"Output directory: {images_dir}")
    print()

    total_images = sum(len(prompts) for prompts in PROMPTS.values())
    current_image = 0
    successful = 0
    skipped = 0
    failed = 0

    for book_id, prompts in PROMPTS.items():
        print(f"\n{'=' * 60}")
        print(f"Generating images for: {book_id.upper()}")
        print(f"{'=' * 60}\n")

        book_dir = images_dir / book_id

        for image_name, prompt in prompts.items():
            current_image += 1
            print(f"[{current_image}/{total_images}] {image_name}")
            print(f"Prompt: {prompt[:80]}...")

            # Determine output path
            if image_name == "cover":
                output_path = book_dir / "cover.png"
            elif image_name.startswith("stave-"):
                output_path = book_dir / f"{image_name}.png"
            elif image_name.startswith("section-"):
                summary_dir = book_dir / "summary"
                output_path = summary_dir / f"{image_name}.png"
            else:
                output_path = book_dir / f"{image_name}.png"

            # Skip if already exists
            if output_path.exists():
                print(f"  O Already exists, skipping")
                skipped += 1
                continue

            try:
                # Generate image
                image_data = generate_image(prompt)

                # Save base64 image
                save_base64_image(image_data, output_path)
                successful += 1

                # Rate limiting - wait between requests
                if current_image < total_images:
                    wait_time = 3
                    print(f"  Waiting {wait_time}s (rate limiting)...")
                    time.sleep(wait_time)

            except Exception as e:
                print(f"  X ERROR: {e}")
                print(f"  Skipping {image_name}")
                failed += 1
                continue

            print()

    print("\n" + "=" * 60)
    print("Image generation complete!")
    print("=" * 60)

    # Summary
    print(f"\nResults:")
    print(f"  Successful: {successful}")
    print(f"  Skipped: {skipped}")
    print(f"  Failed: {failed}")
    print(f"  Total: {total_images}")

    print("\nGenerated images:")
    for book_id in PROMPTS.keys():
        book_dir = images_dir / book_id
        if book_dir.exists():
            png_files = list(book_dir.rglob("*.png"))
            print(f"  {book_id}: {len(png_files)} images")

    if successful > 0:
        print("\nNext steps:")
        print("  1. Review generated images in images/ directory")
        print("  2. Commit and push to GitHub:")
        print("     git add images/")
        print('     git commit -m "Add AI-generated book images"')
        print("     git push origin main")


if __name__ == "__main__":
    main()
