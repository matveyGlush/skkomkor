# ProjectsSection (SliceHomeProjects) Specification

## Overview
- **Target file:** `src/components/ProjectsSection.tsx`
- **Interaction model:** Featured project hero + hover-reveal project list
- **Height:** ~1868px
- **Background:** white (#FFFFFF) outer, beige/cream for featured project area

## Structure
```
<section class="SliceHomeProjects">
  <div class="SliceHomeProjects-wrapper">
    <div class="SliceHomeProjects-image">     ← large hero image (right ~60% width)
    <div class="SliceHomeProjects-content">
      <div class="SliceHomeProjects-featured">
        <div class="SliceHomeProjects-featuredCaption"> ← "Villa Elektra" info
        <div class="SliceHomeProjects-featuredCTA">     ← "SEE PROJECT"
      <div class="SliceHomeProjects-list">    ← project rows
        <a>Chalets Twin and brother | 800 M² | COURCHEVEL ↗
        <a>Villa Akila | 480 M² | LAC D'ANNECY ↗
        ... (10 more)
        <a>OUR PROJECTS ↗
```

## Featured Project Area
Background: warm cream/beige `rgb(240, 236, 228)` approx
Left portion of viewport, ~40% width

### Featured Caption Text
```
Villa Elektra
[ 1150 M² ]
[ LAKE GENEVA ]
[ 2025 ]
```
Font: Maison Neue, heading ~32-40px, details ~14px mono

### Featured Description
```
WITH VILLA ELEKTRA,
ARCHIDOMO PERFORMS A
MAJESTIC SLEIGHT OF HAND.
```
Font: Maison Neue Mono, uppercase, ~11px

### "SEE PROJECT" CTA
- Font: Maison Neue 500, ~16px
- Text: "SEE PROJECT" with arrow

### Featured Image
- `public/images/project-villa-elektra.jpg`
- Sanity CDN: `https://cdn.sanity.io/images/1mishw3b/production/55a9b6f3cd80c40ef3574765da79ee6d13e02638-5906x3937.jpg`
- right half of the section, full height

## Project List (10 items + link)
Each row has:
- Project name (left, ~22px Maison Neue Medium)
- Size (center, ~13px mono, uppercase)
- Location (center, ~13px mono, uppercase)
- Arrow icon ↗ (right)

### All Projects (verbatim):
1. Chalets Twin and brother | 800 M² | COURCHEVEL
2. Villa Akila | 480 M² | LAC D'ANNECY
3. Chalet Ultima | 2100 M² | COURCHEVEL
4. Villa Gibson | 620 M² | CANNES
5. Chalets NØR + SNØ | 420 M² | COURCHEVEL
6. Villa Restanque | 450 M² | NICE
7. Villa Verdi | 380 M² | AIX EN PROVENCE
8. Chalet Haven | 310 M² | MEGÈVE
9. Villa Mirador | 350 M² | LAC DE GENÈVE
10. Chalet Arka | 320 M² | MEGÈVE
11. Villa Seren | 360 M² | LAC D'ANNECY
→ OUR PROJECTS (link to all projects)

## Hover Behavior
- INTERACTION MODEL: hover-driven
- When hovering a project row, a photo of that project appears (right side panel)
- Arrow icons on the right: `↗` (northeast arrow, diagonal)
- Row has a thin bottom border separator

## Computed Styles

### Section
- backgroundColor: white
- padding-top: ~60-80px

### List Item Row
- display: flex
- justify-content: space-between
- align-items: center
- padding: 16-20px 0
- border-bottom: 1px solid rgba(11, 8, 13, 0.15)
- cursor: pointer

### Project Name
- font-family: "Maison Neue", sans-serif
- font-size: ~22-26px
- font-weight: 500

### Size/Location labels
- font-family: "Maison Neue Mono", monospace
- font-size: ~12-13px
- text-transform: uppercase
- letter-spacing: 0.05em

## Responsive
- Desktop: 2-column layout (featured + list)
- Mobile: stacked, featured first
