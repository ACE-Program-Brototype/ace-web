---
name: Academic Excellence System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#47464a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#78767b'
  outline-variant: '#c8c5ca'
  surface-tint: '#5f5e60'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1d'
  on-primary-container: '#858386'
  inverse-primary: '#c8c6c8'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1e'
  on-tertiary-container: '#838487'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e1e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1c1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#e2e2e5'
  tertiary-fixed-dim: '#c6c6c9'
  on-tertiary-fixed: '#1a1c1e'
  on-tertiary-fixed-variant: '#454749'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 96px
---

## Brand & Style

The design system is rooted in the "Editorial Minimalist" aesthetic, blending the precision of high-end developer tools with the timeless sophistication of academic journals. It targets a high-achieving audience that values clarity, intellectual rigor, and focus.

The visual language is defined by:
- **Architectural Typography:** Large, high-contrast serif headlines paired with systematic sans-serif utility text.
- **Extreme Negative Space:** Layouts use white space as a structural element to reduce cognitive load and emphasize content priority.
- **Monochromatic Discipline:** A strictly limited palette ensures that user content and data remain the focal point.
- **Tactile Digitalism:** Subtle borders and micro-shadows create a sense of physical layering, reminiscent of stacked premium paper or high-end stationary.

## Colors

The palette is a study in grayscale, utilizing slight temperature shifts to maintain a premium feel.

- **Surface (Primary):** `#FFFFFF` is used for the main content area. `#FAFAFA` acts as the primary background to soften the screen's glare.
- **Text (Primary):** `#09090B` (Charcoal Black) provides maximum legibility and an authoritative tone.
- **Text (Secondary):** `#71717A` (Slate Gray) is used for meta-data, descriptions, and supporting information.
- **Borders & Dividers:** A consistent `1px` stroke using `#E4E4E7` (Zinc).
- **Accents/Patterns:** `#F4F4F5` is reserved for subtle UI backgrounds like code blocks, table headers, or light grid-line overlays.

## Typography

This design system employs a "Serif-Display, Sans-Utility" model. 

- **Headlines:** Use Playfair Display. It should be typeset with tight tracking (-1% to -2%) for large sizes to maintain an editorial "locked-in" look.
- **Body & UI:** Use Geist. Its technical, low-contrast forms provide a neutral counterpoint to the expressive serif.
- **Scaling:** For mobile, reduce display sizes aggressively. A 64px display heading should scale down to 32px or 36px to avoid excessive line-breaking.
- **Hierarchy:** Use weight and color (Secondary Slate) rather than just size to differentiate between sub-headers and body text.

## Layout & Spacing

The layout philosophy follows a **Strict Editorial Grid**. 

- **Grid System:** A 12-column grid for desktop with 24px gutters. Content should often be centered in a 10-column or 8-column span to increase the surrounding white space (the "margin of focus").
- **Vertical Rhythm:** A base unit of 4px. All margins and paddings should be multiples of 8px (8, 16, 24, 32, 48, 64, 96).
- **Responsive Behavior:** 
  - **Desktop (1024px+):** 48px side margins.
  - **Tablet (768px - 1023px):** 32px side margins.
  - **Mobile (<767px):** 16px side margins. 1-column stack.
- **Sectioning:** Use 96px or 128px gaps between major sections to emphasize the premium, unhurried pace of the brand.

## Elevation & Depth

In this design system, depth is communicated through light and shadow rather than color.

- **Surface Layers:** The default state is a flat 1px border (`#E4E4E7`). 
- **Elevation Shadows:** When an element needs to "float" (e.g., a dropdown or a modal), use a dual-shadow approach:
  - Shadow A: `0 1px 2px rgba(0,0,0,0.05)` (Sharp definition).
  - Shadow B: `0 8px 16px rgba(0,0,0,0.03)` (Soft ambient diffusion).
- **Interactivity:** On hover, buttons or cards should not move or grow. Instead, the border color should darken to `#09090B` or a very subtle background shift to `#F4F4F5` should occur.

## Shapes

The shape language is "Soft-Sharp." It avoids the playfulness of fully rounded corners in favor of a precision-engineered look.

- **Standard Elements (Buttons, Inputs):** 4px (`0.25rem`) corner radius.
- **Large Elements (Cards, Containers):** 8px (`0.5rem`) corner radius.
- **Iconography:** Use linear, 1.5px stroke icons with sharp or slightly rounded caps to match the typography.

## Components

- **Buttons:**
  - **Primary:** Solid `#09090B` with white text. No gradients. 4px radius.
  - **Secondary:** White background with a `1px` border of `#E4E4E7`. 
- **Input Fields:** Minimalist design with a `1px` bottom border only, or a full thin border that darkens on focus. Labels should be `label-sm` (Geist, uppercase) placed above the field.
- **Cards:** White background, `1px` Zinc border. No shadows in static state. Editorial cards should use large Serif headlines and 24px-32px padding.
- **Chips/Badges:** Small, Geist-based text with a `#F4F4F5` background and no border. Used for categories or tags.
- **Lists:** Clean, horizontal dividers only. Use significant vertical padding (16px+) between list items to maintain the editorial feel.
- **Imagery:** All photography must be monochromatic or desaturated with a slight grain. Frames should have 0px or 4px corner radius.