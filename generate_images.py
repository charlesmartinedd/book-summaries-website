#!/usr/bin/env python3
"""
Generate AI images for book summary website using OpenRouter DALL-E 3 API
"""

import os
import requests
import time
from pathlib import Path

# OpenRouter API configuration
OPENROUTER_API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "openai/dall-e-3"

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

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ],
        "max_tokens": 1000
    }

    for attempt in range(retries):
        try:
            print(f"  Attempt {attempt + 1}/{retries}...")
            response = requests.post(API_URL, headers=headers, json=payload, timeout=120)
            response.raise_for_status()

            data = response.json()

            # Extract image URL from response
            # DALL-E 3 returns the image URL in the content
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "")

            # The content might contain markdown with image URL
            if "![" in content and "](" in content:
                # Extract URL from markdown format
                start = content.index("](") + 2
                end = content.index(")", start)
                image_url = content[start:end]
            else:
                # Try to find URL in content
                lines = content.split('\n')
                for line in lines:
                    if line.startswith('http'):
                        image_url = line.strip()
                        break
                else:
                    raise ValueError(f"No image URL found in response: {content}")

            print(f"  ✓ Generated: {image_url[:50]}...")
            return image_url

        except requests.exceptions.RequestException as e:
            print(f"  ✗ Request failed: {e}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 5
                print(f"  Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise
        except (KeyError, IndexError, ValueError) as e:
            print(f"  ✗ Failed to parse response: {e}")
            if attempt < retries - 1:
                wait_time = (attempt + 1) * 5
                print(f"  Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
            else:
                raise


def download_image(url: str, output_path: Path) -> None:
    """
    Download an image from URL and save to file

    Args:
        url: Image URL
        output_path: Path to save image
    """
    print(f"  Downloading to {output_path.name}...")

    response = requests.get(url, timeout=60)
    response.raise_for_status()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(response.content)

    print(f"  ✓ Saved ({len(response.content) // 1024} KB)")


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
                print(f"  ⊙ Already exists, skipping")
                continue

            try:
                # Generate image
                image_url = generate_image(prompt)

                # Download and save
                download_image(image_url, output_path)

                # Rate limiting - wait between requests
                if current_image < total_images:
                    wait_time = 3
                    print(f"  Waiting {wait_time}s (rate limiting)...")
                    time.sleep(wait_time)

            except Exception as e:
                print(f"  ✗ ERROR: {e}")
                print(f"  Skipping {image_name}")
                continue

            print()

    print("\n" + "=" * 60)
    print("Image generation complete!")
    print("=" * 60)

    # Summary
    print("\nGenerated images:")
    for book_id in PROMPTS.keys():
        book_dir = images_dir / book_id
        if book_dir.exists():
            png_files = list(book_dir.rglob("*.png"))
            print(f"  {book_id}: {len(png_files)} images")

    print("\nNext steps:")
    print("  1. Review generated images in images/ directory")
    print("  2. Commit and push to GitHub:")
    print("     git add images/")
    print('     git commit -m "Add AI-generated book images"')
    print("     git push origin main")


if __name__ == "__main__":
    main()
