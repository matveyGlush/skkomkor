# AppHeader Specification

## Overview
- **Target file:** `src/components/AppHeader.tsx`
- **Interaction model:** scroll-driven theme switching via mix-blend-mode
- **Position:** fixed top, z-index 1000

## Structure
```
<header class="AppHeader AppHeader--light">
  <div class="AppHeader-logo">        ← SVG wordmark, spans full width
  <div class="AppHeader-navDivider">  ← 0.78px horizontal rule
  <nav class="AppHeader-nav">
    <div class="AppHeader-navMain">   ← left: Agency, Projects, Immersion, Contact
    <div class="AppHeader-navSecondary"> ← right: News, Socials, EN
```

## Computed Styles

### Header Container
- position: absolute (at top of page), then becomes fixed on scroll
- top: 0
- left: 0
- right: 0
- padding: 15.75px
- z-index: 1000
- mix-blend-mode: difference  ← KEY: makes text invert against any background
- backgroundColor: transparent
- transition: all (for theme changes)

### AppHeader-logo (SVG wordmark)
- height: 136px
- width: 100% (fills from left padding to right padding)
- padding-bottom: 7.875px
- The SVG inside: viewBox="0 0 1880 159", fills the container width
- SVG fill: currentColor (inherits from header color)

### AppHeader-navDivider
- height: 0.78px
- width: 100%
- backgroundColor: currentColor (white when blend-mode inverts on dark bg)

### AppHeader-nav (NAV element)
- display: flex
- justify-content: space-between
- height: 35px
- align-items: center

### AppHeader-navItem (nav links)
- font-family: "Maison Neue", sans-serif
- font-size: 18.9px
- font-weight: 500
- color: inherit (from header)
- text-decoration: none
- Each item has a `+` prefix character before the text

### AppHeader-navMain and AppHeader-navSecondary
- display: flex
- gap: approximately 100-130px between items

## Logo SVG — 9 paths (ARCHIDOMO), viewBox="0 0 1880 159"
```svg
<svg viewBox="0 0 1880 159" fill="currentColor">
  <!-- A -->
  <path d="M62.1916 2.65186H84.799L146.991 155.858H118.838L106.639 125.27H40.4374L28.2379 155.858H0L62.1916 2.65186ZM98.2781 102.638L73.538 40.2241L48.7978 102.638H98.3634H98.2781Z"/>
  <!-- R -->
  <path d="M250.389 2.65186H308.229C334.676 2.65186 356.515 23.5155 356.515 51.1864C356.515 71.4312 345.425 87.8746 329.387 94.6818L365.473 155.77H335.358L303.537 101.224H277.091V155.77H250.389V2.65186ZM305.5 76.6471C320.002 76.6471 330.069 66.3037 330.069 51.6284C330.069 36.9531 320.429 27.4938 307.632 27.4938H277.091V76.7355H305.5V76.6471Z"/>
  <!-- C -->
  <path d="M518.777 0C542.493 0 563.224 10.5202 577.726 27.4941L559.555 43.4954C549.488 31.8259 535.242 24.8419 518.777 24.8419C488.918 24.8419 466.225 48.0925 466.225 79.388C466.225 110.683 488.832 133.669 518.777 133.669C535.242 133.669 550 126.685 559.982 114.573L577.897 130.575C563.565 147.902 542.408 158.511 518.691 158.511C474.927 158.511 439.693 125.094 439.693 79.388C439.693 33.6824 475.012 0 518.777 0Z"/>
  <!-- H -->
  <path d="M662.951 2.65186H689.653V62.4139H761.229V2.65186H787.676V155.858H761.229V87.3442H689.653V155.858H662.951V2.65186Z"/>
  <!-- I -->
  <path d="M895.162 2.65186H921.864V155.858H895.162V2.65186Z"/>
  <!-- D -->
  <path d="M1031.32 2.65186H1084.47C1134.89 2.65186 1162.62 34.743 1162.62 79.5645C1162.62 124.386 1135.06 155.77 1084.64 155.77H1031.24V2.65186H1031.32ZM1082.85 130.928C1121.92 130.928 1136 108.738 1136 79.4761C1136 50.2139 1121.92 27.4053 1082.6 27.4053H1058.03V130.928H1082.77H1082.85Z"/>
  <!-- O -->
  <path d="M1315.58 0C1359.34 0 1394.41 34.4781 1394.41 79.5648C1394.41 124.651 1359.34 158.864 1315.58 158.864C1271.81 158.864 1237.01 124.563 1237.01 79.5648C1237.01 34.5665 1272.07 0 1315.58 0ZM1315.58 134.022C1345.27 134.022 1367.87 110.241 1367.87 79.5648C1367.87 48.8881 1345.27 24.8419 1315.58 24.8419C1285.89 24.8419 1263.28 48.7997 1263.28 79.5648C1263.28 110.33 1285.89 134.022 1315.58 134.022Z"/>
  <!-- M -->
  <path d="M1482.36 2.65186H1505.23L1558.63 88.5818L1611.78 2.65186H1634.39V155.858H1609.22V52.0704L1558.63 132.961L1507.62 52.3357V155.858H1482.45V2.65186H1482.36Z"/>
  <!-- O -->
  <path d="M1801.17 0C1844.94 0 1880 34.4781 1880 79.5648C1880 124.651 1844.94 158.864 1801.17 158.864C1757.41 158.864 1722.6 124.563 1722.6 79.5648C1722.6 34.5665 1757.66 0 1801.17 0ZM1801.17 134.022C1830.86 134.022 1853.47 110.241 1853.47 79.5648C1853.47 48.8881 1830.86 24.8419 1801.17 24.8419C1771.48 24.8419 1748.88 48.7997 1748.88 79.5648C1748.88 110.33 1771.48 134.022 1801.17 134.022Z"/>
</svg>
```

## Nav Content (verbatim)
- Left side: `+ Agency`, `+ Projects`, `+ Immersion`, `+ Contact`
- Right side: `+ News`, `+ Socials`, `+ EN`

## Scroll Behavior
When page scrolls past hero (scroll > 759px):
- Header transitions from blending over dark hero background
- to sitting on top of white sections (appears dark text automatically via mix-blend-mode: difference)
- No explicit JS needed — CSS mix-blend-mode: difference handles it

## Responsive Behavior
- Desktop (1440px): full nav visible
- Mobile (390px): hamburger menu, mobile overlay appears
