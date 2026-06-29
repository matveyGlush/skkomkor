# Behaviors — archidomo.fr/en/

## Scroll Behaviors

### Lenis Smooth Scroll
- Active: `<html class="lenis">` class present
- All scrolling is intercepted by Lenis for smooth momentum
- Install: `npm install lenis`

### AppHeader Theme Switching
- **Trigger**: scroll position changes section backgrounds
- **State A (at hero)**: `AppHeader--light`, white text via mix-blend-mode: difference
- **State B (on white section)**: `AppHeader--light`, text appears dark
- **Implementation**: `mix-blend-mode: difference` on the header means it automatically inverts — white on dark bg, black on light bg
- Header position: `absolute` at top, stays in flow initially

### Hero Carousel Auto-play
- Background images cycle automatically
- Multiple SanityImage containers pre-loaded as slides
- Cross-fade transition between slides

## Entrance Animations
- Sections animate into view with fade/slide-up as they enter viewport
- Uses IntersectionObserver (`--in-view` class added on `.Slice` elements)
- `.Slice.--in-view` activates the animation

## Intro Loading Animation
- `AppLoaderLogo` plays on page load
- ARCHIDOMO outlined letters appear → fill in → hero image fades in
- Duration: ~4-6 seconds
- Implementation: CSS `@keyframes` on the h1 SVG stroke-dashoffset

## Hero Wordmark Layout
- `SliceHomeHero-title` h1: absolutely positioned, very large text (SVG-based)
- Logo SVG spans full viewport width: viewBox "0 0 1880 159"
- The SVG is sized to fill 100vw

## Projects List Hover
- INTERACTION MODEL: hover-driven
- Project list items reveal image on hover (right side shows corresponding project photo)
- Arrow (↗) icons on the right of each row

## Navigation Behavior
- `+` prefix on nav items (displayed before link text)
- `AppHeader-navMain`: Agency, Projects, Immersion, Contact (left side)
- `AppHeader-navSecondary`: News, Socials, EN (right side)
- Mobile menu: separate mobile nav overlay (`AppHeader-mobileMenu`)

## Inspiration Section Tabs
- Categories: Architecture, Views, Pools & Outdoor Spaces, Showroom
- Likely click-driven tab switching with image gallery
- Background color: `rgb(188, 181, 163)` — warm taupe
