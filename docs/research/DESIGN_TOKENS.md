# Design Tokens — archidomo.fr/en/

## Typography

### Fonts
| Name | Weight | File | Usage |
|---|---|---|---|
| Maison Neue | 400 Regular | `/fonts/maison-neue-regular.woff2` | Body text, nav, labels |
| Maison Neue | 500 Medium | `/fonts/maison-neue-medium.woff2` | Nav links, headings |
| Maison Neue Mono | 400 | `/fonts/maison-neue-mono-regular.woff2` | Mono labels (project sizes, uppercase captions) |
| Canela | 300 Light | `/fonts/canela-light.woff2` | Large serif headings ("Our agency", "The vision") |

### Font Sizes (scaled — base 7.875px at 1512px viewport)
Note: The site uses a viewport-scaled root font size. All rem/em values scale proportionally.
At 1440px viewport width, base font appears to be ~7.5px (16px base × 0.47 scale factor).
This means all sizes in the site are expressed as large visual sizes through viewport-relative units.

**Actual visual sizes (from computed styles):**
- Nav links: `18.9px`, weight 500
- Body paragraph text: ~18-21px (visual)
- H2 section headings (Canela): ~60-80px (visual)
- Hero tagline: ~24-28px (visual)
- Project list items: ~22-26px (visual)
- Uppercase captions (mono): ~11-13px (visual), letter-spacing wide

## Colors

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#0B080D` / `rgb(11, 8, 13)` | Primary text, near-black |
| `--color-white` | `#FFFFFF` | Background (most sections) |
| `--color-taupe` | `#BCB5A3` / `rgb(188, 181, 163)` | Inspiration section background |
| `--color-beige` | `#F0ECE4` | Projects section inner background (soft cream) |
| `--color-footer-bg` | `#1A1A1A` approx | Footer dark background |
| `--color-divider` | `rgba(255,255,255,0.3)` | Nav divider line |

## Spacing
- Page padding: `15.75px` (all sides on header)
- Section padding (typical): `80-120px` vertical
- Nav gap between items: ~100-140px

## Border Radius
- Buttons/images: 0 (sharp corners)
- Circular decorative element: 100% (outline circle)

## Shadows
- None visible — clean flat design

## Key Layout Values
- Max content width: 1512px (full viewport on 1440px screens)  
- Header height (at top of hero): ~170px (logo 136px + divider 1px + nav 35px + padding)
- Nav divider: 0.78px height, `rgb(255, 255, 255)` (shows white via mix-blend-mode)
