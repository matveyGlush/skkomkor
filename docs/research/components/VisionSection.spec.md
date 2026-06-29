# VisionSection (SliceHomeVision) Specification

## Overview
- **Target file:** `src/components/VisionSection.tsx`
- **Interaction model:** static scroll sections
- **Height:** ~1691px
- **Background:** white (#FFFFFF)

## Text Content (verbatim)

### Main Heading
"The vision" — Canela Light serif, large (~60-80px)

### Body Paragraph
```
Archidomo imagines spaces that deeply
connect us to what uplifts us. The beauty we celebrate is not
abstract: it engages with sensations and honors pure emotions.
Sometimes spectacular, never ostentatious, it offers a rare and
infinitely personal experience.
```

### Uppercase Caption
```
HERE OUR IDEAS ARE BORN,
INSPIRED BY THE MAJESTY OF
THE MOUNTAINS AND THE
SERENITY OF THE LAKE.
```
Font: Maison Neue Mono, uppercase, ~11-12px

### CTA Link
Text: `+ AGENCY`

### Secondary Tagline
```
Reality is not a limitation,
but possibilities to
transcend.
```
Font: Canela Light or Maison Neue, ~28-36px

## Images
- Two large images side-by-side showing luxury properties
- `public/images/vision-1.jpg` — exterior luxury residence with pool
- `public/images/vision-2.jpg` — dark/moody image (night shot or interior)

## Computed Styles

### Heading "The vision"
- font-family: "Canela", serif
- font-weight: 300
- font-size: ~60-80px
- line-height: 1.0-1.1

### Body text
- font-family: "Maison Neue", sans-serif
- font-size: ~18-21px
- font-weight: 400
- max-width: ~600px

## Responsive
- Desktop: asymmetric layout with heading left, body right
- Two images: stacked or side by side
