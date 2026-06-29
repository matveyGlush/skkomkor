# Page Topology — archidomo.fr/en/

## Overall Structure
- **Framework**: Nuxt/Vue (class-based, Sanity CMS backend)
- **Scroll**: Lenis smooth scroll (`<html class="lenis">`)
- **Total height**: ~11,000px
- **Font**: Maison Neue (primary sans), Canela (serif headings)

## Fixed Overlays (z-index layers)
1. `<header class="AppHeader AppHeader--light --blend-mode">` — z-index 1000, position: fixed (or absolute at top)
   - Uses `mix-blend-mode: difference` to show white on dark, black on light automatically
   - Becomes `AppHeader--dark` and `AppHeader--light` based on scroll position

## Main Sections (top → bottom)

| Order | Class | offsetTop | Height | Description |
|---|---|---|---|---|
| 1 | `SliceHomeHero` | 0 | 759px (100vh) | Full-viewport hero with ARCHIDOMO wordmark SVG |
| 2 | `SliceHomeAgency` | 759 | 2187px | Agency intro with office photos and sketches |
| 3 | `SliceHomeProjects` | 2946 | 1868px | Featured project + project list |
| 4 | `SliceMediaFullscreen` | 4814 | 851px | Full-bleed property photograph |
| 5 | `SliceHomeVision` | 5665 | 1691px | Vision/philosophy section with serif heading |
| 6 | `SliceHomeInspiration` | 7356 | 2899px | Inspiration gallery on warm taupe background |
| 7 | `<footer class="AppFooter AppFooter--dark">` | ~10255 | ~720px | Footer with addresses and nav |

## Page Intro Animation
The page has a loading animation (`AppLoaderLogo` / `SliceHomeHero-loaderLogo`):
1. Phase 1: ARCHIDOMO in large outlined white letters on white background
2. Phase 2: Letters fill in (black on white, or white on dark)
3. Phase 3: Hero image carousel fades in behind
