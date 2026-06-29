# InspirationSection (SliceHomeInspiration) + Footer Specification

## InspirationSection Overview
- **Target file:** `src/components/InspirationSection.tsx`
- **Interaction model:** click-driven tabs with image gallery
- **Height:** ~2899px
- **Background:** `rgb(188, 181, 163)` = `#BCB5A3` (warm taupe)

## Text Content

### Heading
"Inspiration" — Canela Light serif, large

### Subheading
"Grandeur finds its true measure in precision and in the surprises it reveals."
Font: Maison Neue, ~20-24px

### Body Paragraphs
```
Materials that converse with their surroundings.
Unobstructed views that quite simply take your breath
away. Sunlit immersions experienced in panoramic
perspective.
```

### Categories / Tabs
1. Showroom
2. Architecture — "WHEN LINES SHAPE SPACE AND CELEBRATE CHARACTER"
3. Views — "A 360° TRIBUTE TO THOSE WHO KNOW HOW TO ASTONISH US, DAY AFTER DAY"
4. Pools & Outdoor Spaces — "POOLS AND [OUTDOOR]..."

## Images
- Each category has multiple large photographs
- Gallery of luxury architecture photography

## AppFooter Specification
- **Target file:** included in same component or separate `Footer.tsx`
- **Background:** dark (~`#1A1A1A` or `rgb(18,18,18)`)
- **Text color:** `#BCB5A3` (taupe/warm gray) for body text, near-white for headings

## Footer Structure
```
<footer class="AppFooter AppFooter--dark">
  <div>ARCHIDOMO (wordmark SVG, large, fills full width)</div>
  <div class="footer-grid">
    Col 1 (left, with + icon):
      Agency
      Projects
      Immersion
      Contact
    Col 2:
      Contact:
        +33 (0)4 50 46 06 24
        INFOS@ARCHIDOMO.FR
      Socials:
        + INSTAGRAM
        + LINKEDIN
    Col 3:
      Annecy - Showroom
      2 LE THORON – RD 909A
      TALLOIRES-MONTMIN 74290
      
      Cannes
      230, ROUTE DES DOLINES
      SOPHIA ANTIPOLIS 06560
    Col 4:
      Lyon
      PLACE DU CHANGE
      LYON 69005
  <div class="footer-bottom">
    © 2018 - ALL RIGHTS RESERVED     LEGALS   PRIVACY POLICY
```

## Footer Computed Styles

### ARCHIDOMO wordmark
- Same SVG as header but large, filling full width
- Color: `#BCB5A3` (taupe, to match bg subtly) OR white

### Footer body text
- font-family: "Maison Neue Mono", monospace
- font-size: ~11-13px
- text-transform: uppercase
- letter-spacing: 0.05em
- color: approx `#BCB5A3` or rgba(white, 0.6)

### Footer nav links
- font-family: "Maison Neue", sans-serif
- font-size: ~20-24px
- font-weight: 400
- color: white/near-white

### Copyright line
- font-family: "Maison Neue Mono"
- font-size: ~11px
- text-transform: uppercase
- color: rgba(255,255,255,0.4)
