# Hexspire 2D Redesign — Transformation Plan

Companion to [`wisprflow-analysis.md`](./wisprflow-analysis.md), which documents the reference site in isolation. This document translates those findings into a concrete plan for Hexspire, section by section. **No code has been written yet** — this is the plan for review before implementation starts.

Two directional calls were asked of the user and got no response in time; I proceeded with the recommended defaults below rather than block. Both are easy to flip before implementation if wrong:

- **Base mode: full light/cream, matching Wispr Flow most closely** (rejected alternative: keep near-black as the default panel and use light/accent panels only as breaks — see "Alternate: dark-based mode" at the end if this is the wrong call).
- **Typography: add a serif display pairing** (rejected alternative: stay all-Geist and rely on outline/flat/spacing mechanics alone).

---

## 1. What we're adopting from Wispr Flow, adapted to Hexspire

The reference analysis concluded the "2D" quality is really three combined techniques, not one trick. Here's how each maps onto Hexspire specifically:

| Wispr Flow technique | Hexspire adaptation |
|---|---|
| Zero shadows/blur, hard 2px outlines | Drop all `box-shadow`, `backdrop-blur`, and glow effects. Every card/button/badge gets a deliberate 2px solid outline. Muted tan → a muted version of our border color; black → our near-black `#09090b`, used as the "emphasized" outline. |
| Flat solid fills, no gradients | Drop the indigo→violet gradients used on buttons, badges, and gradient text. Indigo (`#6366f1`) and violet (`#a78bfa`) become two distinct flat fills used separately, not blended. |
| Sticker-style illustration, die-cut cream stroke | Optional, flagged separately below (§8) — this needs actual illustration assets, which is a different kind of work than CSS/component changes. Don't block the rest of the redesign on it. |
| Warm cream base alternating with dark/accent panels | New `#FDFBF6`-family cream background as the page default. Existing `#09090b` near-black and a new flat indigo panel become the "dark band" and "accent band" used in alternation, the same role near-black/teal play on Wispr Flow. |
| Oversized serif display + sans body, mid-sentence italic swaps | New serif for H1/H2 (candidate: **Fraunces** — has a strong italic, warm/contemporary, avoids reading as a straight EB Garamond clone). Geist stays for body copy, UI labels, buttons. Headlines get one italicized word for emphasis, same device Wispr uses throughout. |
| Hand-drawn decorative linework | Freehand SVG squiggle underlines under emphasized words, wavy connecting lines in the process timeline, sparkle-burst accents around 1-2 key headings. Used sparingly, not on every section — Hexspire's copy is more restrained/enterprise than Wispr's, so this should read as a light accent, not a dominant motif. |
| Floating pill nav, no blur | Navbar becomes a cream, hard-outlined, pill-radius bar with margin from the viewport edge, fixed while scrolling. |
| Border-color swap for hierarchy (not scale/glow) | The "Most Popular" package tier gets a black/near-black 2px border where the other two get the muted outline. No more glow/scale-up treatment. |

---

## 2. New design tokens (proposed)

```
--color-bg:              #FDFBF6   (cream/parchment default page background)
--color-bg-dark:         #09090b   (existing near-black, reused as alternating dark panel)
--color-bg-accent:       #EDEBFF   (pale flat indigo tint, reused as alternating accent panel)
--color-surface-light:   #FFFFFF   (card surface on cream panels)
--color-border-muted:    #E4E1D6   (tan-adjacent, low-contrast 2px outline)
--color-border-emphasis: #09090b   (full near-black 2px outline, signals "featured"/selected)
--color-text:             #09090b  (on cream/light panels)
--color-text-inverse:     #FDFBF6  (on dark/accent panels)
--color-primary:          #6366f1  (indigo, flat fill — CTAs, primary accent)
--color-secondary:        #a78bfa  (violet, flat fill — secondary accent, used standalone not blended)
```

Radius conventions: pills fully rounded, cards ~32–40px radius, section-panel transitions ~40–60px at the seam (mirrors Wispr's card-stack-of-panels scroll structure).

Border convention: everything bordered gets `border: 2px solid` in either `--color-border-muted` or `--color-border-emphasis`. No 1px hairlines, no `rgba` translucency.

Shadow convention: **none**. Anywhere a shadow currently signals elevation, replace it with either a flat color-block offset (e.g. a solid-color rectangle peeking out from behind a card, offset 6px/6px, no blur) or nothing at all.

---

## 3. Global chrome

**`layout.tsx` / fonts** — Add Fraunces (`next/font/google`) alongside Geist. Fraunces for `h1`/`h2`/hero display text, Geist stays for body, nav, buttons, labels.

**`GlobalBackground.tsx`** — The starfield canvas glow directly contradicts "no soft blur/glow anywhere." Remove it. The alternating flat-color section panels (§4) replace it as the primary atmosphere device. If some ambient texture is wanted, a flat, static, low-opacity dot-grid `<pattern>` (no animation, no blur) is the 2D-appropriate substitute — optional, not required.

**`CustomCursor.tsx`** — Wispr Flow has zero custom-cursor or hover-glow effects ("interaction is comparatively restrained outside of the specific signature moments"). Recommend removing it. If kept, strip the glow/blur trail and reduce to a plain flat dot with no soft ring.

**`Navbar.tsx`** — Convert from blur-backdrop bar to a floating cream, pill-radius (~20px), 2px-outlined bar inset from the top/side edges, staying cream even when scrolled over a dark panel (exactly like Wispr's nav staying light regardless of section). CTA button becomes a flat indigo pill, no gradient.

**`Footer.tsx`** — Flat panel (near-black or cream depending on which alternation position it lands in), hard divider rules instead of soft `rgba` borders, closing with an oversized flat wordmark lockup as the last thing on the page — reuses `LogoMark`/`Wordmark` at a much larger scale as the final brand beat, matching Wispr's giant closing logo moment.

**`MobileStickyCTA.tsx`** — Flat pill bar, 2px top outline instead of blur backdrop, flat indigo CTA button.

---

## 4. Section-by-section (homepage)

Current order stays the same; only the treatment changes.

1. **Hero** — Oversized Fraunces headline, one word (e.g. *"full team"* or *"in weeks"*) set in italic, with a hand-drawn indigo squiggle underline beneath it. Subhead in Geist. Two CTA pills: primary flat indigo, secondary flat-outlined. Drop any gradient-orb/glow background. Cream base panel. If Hero currently has floating 3D mock-screens, flatten them: plain rounded-rect screenshots with 2px outline, no perspective/rotation, no drop shadow — matching Wispr's flat product-screenshot convention.

2. **Trust** *(currently orphaned/unrendered)* — This is the natural slot for the "flat accent-panel logo marquee" treatment Wispr uses right after the hero. Resurrect it: full-bleed flat indigo (or near-black) panel, infinite horizontal scroll of tech-stack/client logos left in native brand color, small flat sticker-style anchor illustration bottom-left if illustration assets exist (§8), otherwise omit the illustration and keep the marquee.

3. **Packages** — Replace the desktop 3D-fan-card animation with a flat 3-up grid (3D perspective directly contradicts "flat 2D perspective, no isometric/3D" rule). Cards get 32–40px radius, 2px outline: muted tan-adjacent for Launch MVP and SaaS Platform, full near-black outline for Growth Platform ("Most Popular") — border-color swap replaces the current glow/scale treatment. Mobile stacked-list behavior is unaffected structurally, just restyled flat. Pill tab bar keeps its function, loses blur/gradient.

4. **HowWeWork** — Timeline connecting line becomes a hand-drawn wavy/dotted SVG path instead of a straight glowing line. Step nodes flip from outlined to solid flat-indigo fill as they scroll into view (same "state change signals progress" idea, just flat instead of glow-based).

5. **WhyHexspire** — Feature cards get 2px outlines, flat single-color line icons (Wispr's icon style: thin stroke, one color, no fill) replacing any gradient icon backgrounds.

6. **Portfolio** — Case study cards keep their per-project `theme_color`, but it now drives a flat outline/badge color rather than a glow/gradient wash. Screenshot treatment moves to a plain flat rounded-rect crop (drop the `brightness(0.55) saturate(0.85)` dark-blend filter, which was specifically tuned for the old dark-card look). Add a top-right arrow icon on hover as an explicit "this links somewhere" affordance, matching Wispr's stat-card convention.

7. **Testimonials** — Marquee cards restyle to flat white/cream cards with 2px outline sitting on a dark or accent panel band (mirrors Wispr's "Love letters" section, which is a near-black panel full of light cream cards). Existing runtime-truncation-detection and read-more modal logic is unchanged functionally; modal visual gets the same flat/outlined treatment, backdrop blur dropped in favor of a flat semi-opaque scrim.

8. **FAQ** — Accordion mechanics unchanged. Rows get hard divider lines instead of soft `rgba` borders; chevron recolored to flat indigo.

9. **PaymentStructure** — 30/40/30 split becomes a 3-column flat-outlined layout on an accent-color panel band (echoes Wispr's dark-teal "Calculate your savings" panel, minus the interactive slider — see optional stretch idea below). Handover checklist keeps its current content, restyled flat.

10. **Contact** — Form card gets a 2px outline instead of glass/blur, flat indigo focus rings on inputs instead of a glow ring.

11. **GuidedBrief** — Modal visual restyles to flat/outlined (cream card, 2px border, no backdrop blur). **The `document.body` portal architecture must not change** — that's an unrelated stacking-context fix documented in CLAUDE.md, not a style choice.

12. **Partners** — Same flat-panel/native-logo-color treatment as Trust; consolidate visual language between the two so they don't compete, unless they're meant to be genuinely distinct sections (worth confirming during implementation).

13. **DeepDive** (case study pages) — Same accordion-flat treatment as FAQ for the expandable breakdown sections.

---

## 5. Motion changes

Drop: glow/blur transitions, gradient-shimmer effects, the 3D card-tilt/fan interactions, any easing that reads as "smooth/cinematic."

Adopt: scroll-reveal as the default trigger (already true today via `AnimatedSection` + Framer Motion `useInView` — keep this infrastructure, just change *what* animates: flat color-block reveals and outline-draw-in rather than blur/opacity/glow fades). Snappy, slightly springy easing rather than long smooth eases. One or two "signature" animated moments (e.g. the hand-drawn squiggle underline drawing itself in on scroll) rather than motion on every element — Wispr Flow is more animation-dense than Hexspire needs to be; borrow the *quality* of motion, not the *quantity*.

---

## 6. Copy tone

No copy rewrite is in scope here (that's a separate content decision), but noting for awareness: Wispr Flow's headline style leans on short, punchy claims and mid-sentence italic emphasis rather than full sentences. If this redesign extends to copy later, Hero/section headlines are the place that benefits most from that treatment — flagging, not proposing changes to actual wording right now.

---

## 7. What does NOT change

- Data architecture: `packages.ts`, `pricing-comparison.ts`, `case_studies` table, `deep-dives.ts` — none of this is visual, no changes needed.
- `GuidedBrief`'s body portal (stacking-context fix, unrelated to visual style).
- Signed-URL image caching setup.
- Z-index layering logic (values may need touch-ups since blur-based stacking contexts are going away, but the underlying "portal overlays nested in animated ancestors" lesson still applies).
- Content rules (no dash-as-connector, React Native/Flutter pairing, etc.) — these govern copy, not visuals, and stay in force.

---

## 8. Open item: illustration assets

Wispr Flow's sticker-style character illustrations (die-cut cream-stroke outline, flat 1–3 color fills) are one of the three pillars that make the reference site read as "2D," alongside the outline/flat-color mechanics and the alternating cream/dark panel structure. The outline + flat-color + typography changes above can ship without any new illustration and will still read as a clear "2D" shift. But without at least a small set of custom illustrations (e.g., a flat sticker-style dev-at-laptop scene for the Hero, a mobile+web device pair for Packages or Trust), the result will land closer to "flat/outlined SaaS" than "paper-craft 2D" the way Wispr Flow's does.

This needs actual illustration work (commissioned, AI-generated and art-directed, or licensed), not just a component/CSS change, so it's called out separately rather than bundled into the section plan above. Worth deciding whether to scope this in now or ship the mechanical redesign first and layer illustration in later.

---

## 9. Alternate: dark-based mode (if cream-default was the wrong call)

If a full light/cream default is too large a brand departure, the same section-by-section plan holds with one swap: `--color-bg` stays `#09090b` (current near-black) as the default/"home" panel, and the new cream tone (`#FDFBF6`) becomes the *alternating* light panel instead of the base. Packages, Trust, and PaymentStructure (the sections recommended above as accent/dark panels) would instead be the light breaks against an otherwise-dark page. Everything else in this document (outlines, flat fills, serif pairing, hand-drawn linework, motion changes) applies unchanged either way.

---

## Suggested implementation order

1. Design tokens + font setup (`layout.tsx`, a new tokens file or CSS custom properties)
2. Navbar + Footer + MobileStickyCTA (global chrome, sets the frame for everything else)
3. Hero (highest-visibility section, establishes the new typographic/illustration language)
4. Packages (most structurally different — dropping the 3D fan is the biggest single component change)
5. Remaining sections in current page order
6. GuidedBrief modal + Contact form
7. `/pricing` and `/work` pages, case study template
8. Illustration pass (if scoped in — see §8)

Recommend running this through subagent-driven-development once approved, one section/component per task, since the sections are largely independent and each has a clear before/after spec in §4 above.
