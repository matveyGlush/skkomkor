# AgencySection (SliceHomeAgency) Specification

## Overview
- **Target file:** `src/components/AgencySection.tsx`
- **Interaction model:** static with scroll-driven entrance animations
- **Height:** ~2187px (very tall — contains multiple sub-layouts)
- **Background:** white (#FFFFFF)

## DOM Structure
```
<section class="SliceHomeAgency">
  <div class="SliceHomeAgency-header">        ← "Our agency" + description
  <div class="SliceHomeAgency-images">        ← office photo (right half) + large sketch
    - Photo of architects working in studio (mountain backdrop through window)
  <div class="SliceHomeAgency-sketches">      ← 2 architectural hand-sketches side-by-side
  <div class="SliceHomeAgency-ctas">          ← decorative circle + CTA link
  <div class="SliceHomeAgency-quotes">        ← uppercase mono-font quotes
```

## Sub-sections

### Header Area
- Left: "Our agency" in Canela Light serif, ~60-70px
- Right: body paragraph in Maison Neue ~18-20px
- Layout: 2-column, text starts at ~40% from left
- `+` button/icon on far left (appears to be expand link)

### Agency Description Text
```
The studio creates extraordinary
contemporary spaces, perfectly rooted in unique settings: on
the shores of Lake Annecy, atop the peaks of Courchevel, or
facing the ocean in Biarritz… In breathtaking environments
where nature defines the exceptional, technique supports
inspiration to imagine the impossible.
```

### Uppercase Captions (Maison Neue Mono)
```
AN INTENTIONALLY INTIMATE
AGENCY, FOUNDED IN ANNECY BY
ARCHITECTS CAROLE AND
FABRICE GIBERT.
```
```
TO TURN THE OPPORTUNITY OF A
PLACE INTO A LIVING
EXPERIENCE UNLIKE ANY OTHER.
```

### Images
1. **Office photo**: architects working at desk, floor-to-ceiling mountain view
   - Large format, right-aligned
   - `public/images/agency-office.jpg`
2. **Architectural sketch 1**: hand-drawn elevation of modern villa
   - Left side, black & white pencil/ink
   - `public/images/agency-sketch-1.jpg`
3. **Project rendering**: colored architectural render
   - Right side
   - `public/images/agency-render-1.jpg`

### Decorative Circle
- Large outlined circle (stroke only, no fill)
- Positioned right side, partially off-screen
- Color: very light gray stroke (`rgba(0,0,0,0.08)` approx)

## Computed Styles

### Section Container
- backgroundColor: rgb(255, 255, 255)
- padding: 80px 15.75px

### "Our agency" heading
- font-family: "Canela", serif
- font-weight: 300 (Light)
- font-size: ~60-72px
- color: #0B080D
- line-height: 1.1

### Body paragraph
- font-family: "Maison Neue", sans-serif
- font-size: ~18-21px
- font-weight: 400
- color: #0B080D
- line-height: 1.5
- max-width: ~500px

### Uppercase mono captions
- font-family: "Maison Neue Mono", monospace
- font-size: ~11-13px
- text-transform: uppercase
- letter-spacing: 0.05-0.1em
- color: #0B080D

## CTA Link
- Text: `+ Agency` (with plus prefix)
- Font: Maison Neue 500
- No underline, hover state unknown

## Responsive Behavior
- Desktop: 2-column layout for text+image pairs
- Mobile: stacks to single column
