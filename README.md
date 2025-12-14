# Classic Book Summaries

A beautiful, interactive website featuring summaries of classic literature for 6th graders.

**Live Site:** [https://charlesmartinedd.github.io/book-summaries-website/](https://charlesmartinedd.github.io/book-summaries-website/)

## Features

- **A Christmas Carol** by Charles Dickens
  - 5 Stave summaries with images
  - Book Talk: Author bio, characters, setting, interesting passages

- **Around the World in 80 Days** by Jules Verne
  - 7 Section summary overview
  - All 37 chapter summaries
  - Book Talk: Author bio, characters, setting, interesting passages

## Design

- Apple/Microsoft-inspired minimalist aesthetic
- Non-scrollable single-page layout
- Elegant modal system with keyboard navigation
- Touch-friendly for tablets (44px minimum touch targets)
- Responsive design with reduced motion support

## Local Development

```bash
# Start local server
python serve.py

# Or use any static file server
npx serve .
```

## Testing

```bash
npm install
npx playwright test
```

## Image Generation

```bash
python generate_images.py
```

Uses OpenRouter API with DALL-E 3 to generate modern 3D animated (Pixar-style) images.

## License

Educational use only. Book content is in the public domain.
