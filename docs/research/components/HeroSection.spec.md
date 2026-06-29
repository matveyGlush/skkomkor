# HeroSection (SliceHomeHero) Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/hero-desktop.png`
- **Interaction model:** auto-playing image carousel behind full-viewport layout
- **Height:** 100vh (759px at 1440px viewport)

## DOM Structure
```
<section class="SliceHomeHero">
  <h1 class="SliceHomeHero-title">ARCHIDOMO</h1>   ← visually hidden (SVG in header used instead)
  <div class="SliceHomeHero-background">            ← absolute, z-index 2
    <div class="SliceHomeHero-carousel">            ← full-bleed image container
      <div class="SliceHomeHero-carouselInner">
        [slide 1..N]                                ← SanityImage slides
      <div class="SliceHomeHero-baseline">          ← tagline text, bottom-left
```

## Computed Styles

### Section Container (.SliceHomeHero)
- position: relative
- height: 100vh
- overflow: hidden
- backgroundColor: transparent (image shows through)

### Background / Carousel
- position: absolute
- top: 0, left: 0, right: 0
- height: ~88% of section (667px at 759px viewport)
- The carousel images fill this area completely
- Images use object-fit: cover

### Tagline (.SliceHomeHero-baseline or .SliceHomeHero-background bottom)
- position: absolute
- bottom: 0
- left: 15.75px (matches header padding)
- color: white
- font-family: "Maison Neue", sans-serif
- font-size: ~24px (visual)
- font-weight: 400
- line-height: 1.3
- max-width: ~400px

## Text Content (verbatim)
- h1: "ARCHIDOMO" (visually hidden, for SEO — the header SVG is the visible logo)
- Tagline: "Our architecture agency designs exceptional residences in rare locations, in France and around the world."

## Assets
- Background images: 6+ luxury property photographs from Sanity CDN
  - `https://cdn.sanity.io/images/1mishw3b/production/14869c13efded1dd7c96f9380427f9a4706c0ed3-3842x1896.jpg`
  - `https://cdn.sanity.io/images/1mishw3b/production/55a9b6f3cd80c40ef3574765da79ee6d13e02638-5906x3937.jpg`
  - Additional slides visible in carousel (pool, mountain, lake views)
- Use as: `public/images/hero-1.jpg`, `hero-2.jpg` etc.

## Carousel Behavior
- Auto-plays: next image button (`SliceHomeHero-preview`) advances carousel
- Cross-fade between images (opacity transition)
- Interval: ~4-5 seconds

## Responsive Behavior
- Desktop (1440px): full-bleed image, tagline bottom-left ~300px from bottom
- Mobile (390px): same layout, tagline wraps more

## Implementation Notes
- The visible ARCHIDOMO wordmark is in the AppHeader (SVG), not this section
- This section's h1 is `position: absolute, height: 1px` (screen-reader only)
- The background image area is ~88% height, leaving space below for tagline
- Tagline sits in the gray/white area below the image
