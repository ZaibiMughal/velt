# Wispr Flow (wisprflow.ai) — Visual Design Analysis

Research notes for adopting a similar "2D" visual style on another site. This document describes wisprflow.ai only — no assumptions about the target site are made here.

Pages/tabs covered: Homepage, `/features`, `/pricing`, `/business`, `/developers`, `/case-study/clay`, `/about`, plus nav-dropdown contents for Product, Individuals, Resources, Company (inspected via DOM, not fully page-visited). Cross-referenced against 51 chronological frames from a user screen recording of the same site.

---

## 1. Overview & brand tone

Wispr Flow ("Flow") is a voice-to-text/dictation AI product — a menu-bar app for Mac/Windows plus iOS/Android apps that transcribes speech into polished, formatted text in any application. Audience is broad "professional power users": developers, sales reps, executives, lawyers, students, customer support agents, writers — the marketing consistently pushes a "voice is faster than typing" productivity angle (headline stat: "4x faster than typing," "220 wpm vs 45 wpm").

Visual personality: warm, editorial, and hand-crafted rather than corporate-SaaS. It reads like a boutique print magazine or a indie-designer product launch page crossed with a children's-book illustration style, not like a typical dark-glass fintech/AI dashboard. Confident oversized serif typography, a cream/parchment base (not white, not dark), saturated flat accent colors, sticker-style illustrated characters, and constant hand-drawn decorative linework (squiggles, spirals, radiating sparkle lines, dotted orbit paths) run through every page. It intentionally looks "paper and ink" rather than "glass and glow."

---

## 2. What makes it "2D"

This is the crux of the research. Concrete, comparable-to-typical-dark-SaaS characteristics observed:

- **No soft shadows anywhere.** Computed styles on every card, button, and pricing tier returned `box-shadow: none`. Zero blurred drop shadows, zero glassmorphism, zero glow effects. Depth is communicated only by flat color blocking and hard 2px outlines, never by blur.
- **Hard 2px solid outlines, not soft borders.** Cards, buttons, and pills consistently use `border: 2px solid` in either a low-contrast tan (`#E4E4D0`) or full black (`#1A1A1A`) for emphasis — never a 1px hairline, never `rgba` translucency tricks. The outline itself is a deliberate graphic element, like a pen stroke.
- **Flat solid color fills, no gradients.** Every background — section bands, buttons, badges, pills — is a single flat color. No color-to-color gradients were found anywhere on text, buttons, or backgrounds (the one exception is realistic photography, which is unavoidably continuous-tone, but even photos get flattened by a hard-edged rounded-rect crop, never a gradient mask/vignette fade).
- **Sticker-style illustration with a die-cut outline.** Illustrated characters and objects (people, laptops, speech bubbles) are drawn with thick black inking, flat 1-2 color fills per shape, and — critically — an extra cream/off-white **stroke outline traced around the entire silhouette**, exactly like a vinyl sticker peeled off a sheet. This is what most reads as "2D" rather than "flat illustration" generically: the outline gives every character a cut-out, layered-paper quality instead of blending into the background.
- **Flat 2D perspective, no isometric or 3D rendering.** All illustrated scenes (person with binoculars, people at desks, laptop with speech bubbles) are drawn front-on or side-on with no perspective depth, no isometric grid, no faux-3D bevels. Screenshots/mockups of the product UI are the only things with any depth cue, and even those are flat rectangles with rounded corners, not angled/perspective device mockups.
- **Warm light background, not dark mode.** Base background is a pale cream/parchment (`#FFFFEB`), not white and not black. Dark sections exist (near-black `#1A1A1A`-toned bands, dark teal `#034F46` bands) but they're used as alternating "panels" within an otherwise light page, not as the site's default mode — the opposite structure of a typical dark-mode-default AI SaaS site.
- **Oversized serif display type with hand-inked irregularity.** Headlines use a classic serif (EB Garamond) at very large sizes with tight negative tracking, and individual words are frequently swapped into an italic/script treatment mid-sentence ("just *speak*," "Do more with *your* voice," "Work better *together*") — this typographic mixing feels closer to a printed poster or book title than a product UI.
- **Hand-drawn decorative linework used as connective tissue.** Wavy freehand-style lines, spiral/orbit paths, radiating "sparkle burst" lines around headings, dotted trailing paths, and circular text baths are used repeatedly to fill negative space and connect ideas — these read as pen/marker sketches, reinforcing the paper-craft feel rather than a polished vector-perfect look.
- **No skeuomorphism, no glass blur, no neumorphism.** Nothing looks pressed-in, frosted, or reflective. Everything is opaque and flat.

Net effect: the site looks like a well-art-directed print piece or a picture book, not like a glossy dark dashboard product tour. The "2D" quality is really the combination of (a) hard outlines + zero shadow, (b) flat sticker illustration with a paper-cutout stroke, and (c) light/warm base with saturated flat accent blocks used as panels.

---

## 3. Color palette

Sampled via `getComputedStyle` where noted; otherwise visually estimated from screenshots.

| Hex | Role | Notes |
|---|---|---|
| `#FFFFEB` | Primary page background (cream/parchment) | `rgb(255,255,235)` — computed from `body`. This is the default canvas color, not white. |
| `#FFFDF9` | Secondary near-white surface | `rgb(255,253,249)` — used for the emphasized/"secondary" pricing card and some inset panels; barely distinguishable from the cream but slightly whiter/warmer. |
| `#E4E4D0` | Low-contrast border / muted card border | `rgb(228,228,208)` — 2px card borders on non-emphasized elements, tab-menu border. |
| `#1A1A1A` | Primary text color + near-black section backgrounds + emphasis borders | `rgb(26,26,26)` — true near-black, not pure `#000`. Doubles as body text color and as the background fill for dark inverted sections (nav text, headings, illustrated-character sections). |
| `#034F46` | Dark forest/teal green — secondary dark section background | `rgb(3,79,70)` — used for the "Used by professionals" logo-marquee band, testimonial case-study cards, "Calculate your savings" pricing panel, and dictionary word-pills. |
| `#F0D7FF` | Primary accent — lavender/light purple | `rgb(240,215,255)` — fill color for primary CTA buttons ("Download for macOS"), used consistently as *the* call-to-action color site-wide. |
| `#FFA946` | Secondary accent — orange | `rgb(255,169,70)` — used sparingly for annotation/callout elements: "Removed filler" badge, arrow/cursor icons, sparkle-burst decoration around "AI Auto Edits," submit-arrow buttons inside text-editor mockups. |
| Pale lavender block | Full-section background (lighter/more washed than the button lavender, roughly in the `#ECDCFA`–`#F0E3FC` range) | Used as a full-bleed section background for "Flow, wherever you work" — a lighter tint of the button lavender used as a large color field, not just a small button. |
| — | Red/coral `✕` mark | Small red "not included" cross-marks in the pricing comparison table (functional, not brand color). |

Text/border logic: black (`#1A1A1A`) text sits on the cream background; on dark sections (near-black or teal), text and headings flip to the cream color, making cream double as both "background" and "text-on-dark" color depending on context — a simple two-tone inversion rather than a large palette.

---

## 4. Typography

Two typeface families, used with a strict display/body split.

**Display / headings — EB Garamond** (serif)
- Computed `font-family: "Eb garamond", Arial, sans-serif` (the Arial/sans-serif entries are just the fallback stack; the font actually renders as EB Garamond, a classic serif).
- `font-weight: 400` (regular weight only — no bold serif headings observed; emphasis is done via italic and size, not weight).
- Sizes scale dramatically by heading level: H1 hero ≈ `120px` / `letter-spacing: -6px` / `line-height: 102px`; H2 ≈ `64px` / `-1.92px` tracking / `60.8px` line-height; H3 ≈ `32px` / `-0.96px` tracking / `41.6px` line-height. Tracking is consistently negative and roughly proportional to size (~‑5% of font size), giving tightly-set, poster-like headlines.
- Frequent **mid-sentence italic/script swaps**: individual words within an otherwise upright serif heading render in a cursive italic cut ("just *speak*", "*your* voice", "*anywhere* you work", "Work better *together*", "*adapts* to you"). This is a deliberate emphasis device used on nearly every page's hero, not a one-off.
- Occasional hand-drawn underline/squiggle beneath a heading or emphasized word, drawn in the lavender accent color, looks marker-sketched rather than a straight rule.

**Body / UI — Figtree** (sans-serif)
- Computed `font-family: Figtree, Arial, sans-serif`.
- Body paragraph: `font-weight: 500`, `font-size: 20px`, `line-height: 26px` for hero subheads; base body text is `16px` / `weight 400` / `line-height 20.8px`.
- Buttons/pills/nav: Figtree at `font-weight: 600`, `16px`, no letter-spacing adjustment, no uppercase transform (nav labels are title case, not all-caps, except small "GET STARTED"/"FLOW FOR"/"CASE STUDIES FOR" eyebrow labels in dropdown menus and the "STILL NOT SURE..." CTA heading which are deliberately set in uppercase for a shouty label effect).
- No monospace font was found anywhere, including in the "code editor" mockups on the Developers page — code snippets are still set in Figtree, just styled inside a dark rounded panel to *suggest* an editor.

No gradient text, no outlined/stroked text treatments, no text drop shadows were found. All type is solid-fill flat color (black on cream, cream on dark).

---

## 5. Layout & spacing

- **Section-as-card structure.** The page is built as a stack of large, distinct full-width color "panels," each with a big border-radius (visually ~40–60px) at the top and/or bottom corners, so consecutive panels appear to be rounded cards overlapping/peeking from behind one another as you scroll — cream → near-black → teal → cream → lavender-block → near-black → cream → footer. This alternating light/dark/accent rhythm is the primary structural device of the whole site, on every page.
- **Sticky floating nav bar.** The nav is a cream, pill-cornered bar (rounded ~20px), inset from the very top/sides of the viewport with visible margin around it (not edge-to-edge), with a thin border and no shadow. It stays fixed while scrolling and remains cream/light even when the section scrolling underneath it is dark, so it always reads as a floating card on top of the content rather than a bar embedded in it.
- **Centered, generous content width.** Hero copy is center-aligned within roughly a 1200–1300px content column on desktop; body sections mix centered (feature intros) and left/right split two-column layouts (copy left, device mockup or illustration right, or vice versa) — no strict single grid column count is enforced, layouts vary section to section but always keep large sections comfortably padded (~100px+ top/bottom).
- **Border radius conventions:** buttons/pills use full pill radius (fully rounded ends); cards/panels use very large radii (40px on pricing cards, similar on feature-grid cards and testimonial cards); nav pill ~20px; section-level color panels ~40–60px only at the transition edges (top of a panel curves, bottom flows into the next).
- **Border/stroke conventions:** essentially everything bordered uses a 2px solid stroke, either the muted tan (`#E4E4D0`) for default cards or full black (`#1A1A1A`) for an emphasized/"selected" state (e.g., the middle "Pro"/featured pricing tier gets a black 2px border while the other tiers get the tan border) — this border-color swap, not size or shadow, is how the design signals hierarchy/emphasis between otherwise-identical card shapes.
- **Off-grid decorative elements.** Hand-drawn lines, orbiting text paths, and sparkle bursts are positioned freely, breaking any strict grid — they're treated as illustration layered over the grid, not grid-bound content.
- **A persistent fixed circular badge** (lavender-filled circle with a dark fingerprint/scan-line icon) floats in the bottom-left corner throughout scrolling on every page — a small brand/utility element that stays present regardless of section background.

---

## 6. Iconography & illustration

- **Line icons:** simple, thin-stroke, single-color (lavender or black) outline icons for feature bullets (grid/apps icon, person-with-checkmark icon, globe, speaker/volume icon, people icon, laptop icon, pencil icon, eye icon, chart icon) — consistent stroke weight, no fill, minimal detail. Used in the nav mega-menu (one per "Individuals" persona: Leaders, Developers, Creators, Customer Support, Students, Lawyers, Accessibility, Sales) and in feature-card headers.
- **Sticker-style character illustrations:** the site's signature illustration mode. Flat 1–3 color fills, thick uniform black ink outlines on every internal shape (hair, clothing folds, glasses), and an additional light cream stroke traced around the whole exterior silhouette (the "die-cut sticker" effect described in §2). Recurring subjects: a curious person holding binoculars up to pink round glasses (used in the "used by professionals" logo band); a diverse cast of people working at desks/laptops with speech-bubble props (used in "Made for the way you work" and "Work better together" sections); a laptop with lavender keys flanked by two speech bubbles (one with sound-wave lines, one orange with a scribbled "eee" mumble squiggle) and a small hand holding a question mark.
- **App/tool logos:** real third-party app icons (Slack, Notion, VS Code, ChatGPT, Canva, Zoom, Google Docs, Telegram, Microsoft Teams, OneNote, Grammarly, Google Classroom, etc.) shown as their native rounded-square glyphs, arranged in a diagonal cascading row that scrolls/tilts across the "write in all your apps" section — these are the one place actual brand-color variety appears, deliberately left un-stylized/native.
- **No single recurring mascot character** — rather a small illustrated "cast" (different hairstyles/skin tones/outfits) reused across sections, all drawn in the same sticker style, functioning collectively as a loose brand motif rather than one fixed mascot.
- **Screenshots/mockups are real, not illustrated:** ChatGPT, Slack, Gmail, and the Flow app's own UI are shown as actual-looking flat rectangular screenshots (rounded corners, no device bezel most of the time; one section on `/business` uses a literal laptop-shaped frame). Annotations on top of screenshots (hand-drawn orange circle around a misspelled name, strikethrough on a filler word, an orange "Removed filler" sticker-shaped badge) are illustrated in the same sketchy/marker style as the decorative linework, bridging the illustration style into the product-demo screenshots.

---

## 7. Motion & interaction

Overall feel: snappy, sketch-like, and playful rather than smooth/cinematic easing — animations favor a "drawn in front of you" quality (curving text paths, hand-drawn lines appearing) over polished parallax/blur transitions typical of glossy SaaS sites.

- **Signature interaction — spiral/ribbon transcript animation.** The hero (and the About page hero) shows a "before" raw, run-on speech transcript rendered in gray, curling into a tightening spiral shape (looks hand-scrawled, imperfect line spacing). As you scroll/it plays, a black rounded pill/ribbon shape sweeps in carrying the "after" — clean, corrected text — flowing along a continuously curving/undulating path (not a straight line), with a small pill-shaped audio-waveform icon riding along the ribbon like a play head. This same "text following a wavy path" technique reappears for the "45 wpm vs 220 wpm" keyboard-vs-Flow comparison (the 220wpm side's text visibly streams along a curved path across a blurred motion-photo background) and again on the About page as a full circular halo of text orbiting the hero photo.
- **Scroll-reveal is the default trigger** for most content (headings, cards, illustrations fade/slide in as sections enter view), but several elements are clearly **continuous/looping** regardless of scroll position: the trust-logo marquee (four duplicated `<ul>` lists, confirming an infinite horizontal auto-scroll), and the spiral/ribbon transcript text.
- **Hover-triggered nav mega-menus.** Each top-level nav item (Product, Individuals, Resources, Company) opens a white rounded dropdown card on hover/click, listing icon + bold label + one-line gray description per entry, with a subtle color change (link text shifts to teal) on item hover. "Business" is a plain link with no dropdown.
- **Live "AI editing" demo animations** embedded in photo/screenshot panels: a strikethrough animates onto a filler word ("uh yeah") while an orange rounded "Removed filler" tag appears pointing at it; a hand-drawn orange oval circles a corrected name in a Slack screenshot with a small curved arrow; a text cursor visibly blinks/types inside a dark rounded text-editor mockup with a bold/italic/strikethrough/list toolbar along the bottom and an orange circular arrow "submit" button.
- **Deck-of-cards stacking animation** on the "100+ languages" feature card: a stack of rounded pill tags (flag + language name) fan/cycle through as if flipping through a physical card deck.
- **Interactive slider calculator** on the pricing page ("Calculate your savings"): a draggable range slider ("I spend N hours typing a day") on a dark teal panel live-updates a results readout (`$X,XXX/mo` savings, hours spent typing, hours saved, dollar value, Flow cost) as you drag — the only fully interactive calculator-style widget found on the site.
- **Tab/pill switchers** used repeatedly for content filtering: platform tabs (Mac/Windows/iPhone/Android), the features page's process tabs (Speak/Refine/Personalize/Collaborate/Build), and the "Made for the way you work" persona tabs (Accessibility, Creators, Customer Support, Developers, Lawyers, Leaders, Sales, Students, Teams) — clicking swaps the adjacent demo panel content.
- **Accordion-style expand/collapse** for feature detail lists (e.g., "Backtrack," "Remove fillers," "Numbered lists," "Auto punctuation" under the Personalize tab; "File tagging," "Syntax awareness," "Dev jargon" on the Developers page), each row a simple label + chevron that expands inline.
- **Video embeds with a custom circular play button** (white circle, black play triangle) over a still photo thumbnail — used for testimonial/case-study videos (e.g., the Clay case study hero, the Business page customer video).
- No cursor-follow/custom-cursor effects, no 3D tilt-on-hover card effects, and no page-transition wipes were observed — interaction is comparatively restrained outside of the specific signature moments listed above.

---

## 8. Section-by-section breakdown

### Homepage (`/`)

1. **Nav** — floating cream pill bar: logo mark (small bar-chart icon + "Flow" wordmark) left; center nav "Product / Individuals / Business / Resources / Company" (first, second, fourth, fifth are dropdown triggers; Business is a direct link); right side a single lavender pill CTA "🍎 Download for macOS".
2. **Hero** — "Don't type, **just speak**" (gray "Don't type," transitioning to solid black "just speak", huge EB Garamond serif). Subhead: "The voice-to-text AI that turns speech into clear, polished writing in every app." Single lavender CTA pill + "Available on Mac, Windows, iPhone, and Android" microcopy below it. Below the fold-line of the hero: the signature spiral/ribbon transcript animation (raw gray transcript spiraling in on the left, a black ribbon of corrected text undulating across the bottom-right carrying a waveform-pill icon).
3. **"Write faster in all your apps, on any device"** — transitions to a near-black rounded panel. Platform pill-tabs (Mac/Windows/iPhone/Android) top-left; big serif heading + subhead + a cream "Watch in action" lightbox-trigger button. Right side: a phone-shaped screenshot frame showing a messaging UI with a mic/waveform control, flanked by a diagonal cascade of real app icons (Slack, Notion, VS Code, ChatGPT, Zoom, Google Docs, etc.) drifting off both edges.
4. **Trust marquee** — dark teal band, "Used by professionals everywhere to speed up their thoughts" centered heading, an infinite horizontal scroll of company wordmark logos (Groupon, Vercel, Replit, Nuuly, Warp, Rivian, Notion, Decagon, Substack, Amazon, Strava, Nvidia, Lovable, Menlo, Clay...), with the binoculars sticker-character illustration anchored bottom-left.
5. **"4x faster than typing"** — back to cream. Big serif headline underlined with a lavender hand-drawn squiggle, subhead copy, two pill buttons ("Try Flow" outline, "Download for macOS" filled lavender). Below: a side-by-side "Keyboard 45 wpm" (plain card) vs "Flow 220 wpm" (blurred motion photo with the curved-ribbon text animation) comparison.
6. **"Made for the way you work"** — near-black panel. Serif headline with italicized "you," subtext "Select one to see Flow in action," a two-row grid of persona pill-tabs (Accessibility, Creators, Customer Support, Developers, Lawyers, Leaders, Sales, Students, Teams), and a right-hand result panel ("One tool. Your workflow." + description + lavender CTA) that updates per selected tab.
7. **"AI Auto Edits"** — cream again. Left: a photo/screenshot panel showing the live filler-word-removal demo (orange "Removed filler" badge + strikethrough) transitioning into a polished-text card. Right: "AI Auto Edits" heading with a hand-drawn orange sparkle-burst radiating around it, description copy, "Try Flow" + "Download for macOS" buttons.
8. **Three-up feature grid** — "Personal dictionary" (teal pill word-tags: Robyn, Viktor, SaaS, Caltrain...), "Snippet library" (black panel "Your Snippets" list with an orange annotated example snippet + hand-drawn arrow), "100+ languages" (stacked flag-pill deck animation + embedded video iframe). Ends with an "Explore all features" outline pill link to `/features`.
9. **"Flow, wherever you work"** — full-bleed pale-lavender section. Platform pill-tabs, serif heading, description, single lavender CTA — a simple, calm closing beat before testimonials.
10. **"Love letters to Flow"** — near-black panel, serif headline with a hand-drawn radiating sparkle burst around it (echoing the AI Auto Edits treatment), horizontally scrolling marquee of cream testimonial cards (avatar photo + quote + name/role), e.g. Rahul Vohra (CEO, Superhuman): *"This is the best AI product I've used since ChatGPT."*
11. **Case-study stat cards** — 2×2 grid of dark-teal rounded cards, each with a big stat headline ("From typing to talking," "90% faster everywhere," "20% faster GTM execution," "4x faster responses"), a quote, an arrow icon (top-right, indicating it's a link), and a small avatar + name/role/company — links to `/case-study/[slug]` pages.
12. **"Start flowing"** — full-bleed real photo background (person running, motion-blurred), serif "Start flowing" heading with a dotted trailing decorative line, subhead, two CTA pills, "Available on Mac, Windows, iPhone, and Android. Free for 14 days." microcopy. This is the second, more atmospheric primary CTA moment.
13. **"Still not sure that Wispr Flow is right for you?"** — cream panel with black border, all-caps heading, subcopy, three lavender pills: "Ask ChatGPT," "Ask Claude," "Ask Perplexity" (deep-linking to each AI chat product pre-filled with a prompt about Wispr Flow) — an unusual, very 2025-AI-native trust/FAQ mechanic. Sticker illustration of the binoculars character (reused) bottom-right.
14. **Footer** — three-column link list (Company: About/Careers/Trust Center/Become an Affiliate/Media Kit; Product: What's New/Use Cases/Flow for Students/Flow for Non-Profits/Flow for Android; Resources: Workflows/Research/Vibe Coding/Talk to Support/Talk to Sales/Help Center/Bug Bounty), copyright + legal links + social icons row, and a massive black wordmark lockup (bar-chart icon glyph at true large scale + "Flow" spelled out in oversized bold sans-serif) as a closing brand moment.

### `/features`

1. **Hero** — "Do more with *your* voice" (italic "your" underlined with lavender squiggle), subhead, a 5-item pill-tab row (Speak / Refine / Personalize / Collaborate / Build) functioning as an in-page anchor nav for the sections below, single CTA pill.
2. **"Speak" section** — near-black panel, "Speak naturally. Flow writes it *perfectly*." heading, sticker illustration (arm + laptop with pink keyboard, cream die-cut outline) top-right, and a 4-card icon-led grid: "Speak into any app," "Spells names right," "100+ languages" (with sample scripts: Español, हिन्दी, 中文, 한국어, العربية), "Whisper."
3. **"Works wherever you work"** — pale-lavender full-bleed strip, platform pill-tabs, short heading/subhead, CTA.
4. **"Refine" section** — cream; ChatGPT prompt-bar screenshot mockup with a floating waveform-pill icon, paired with an accordion list of granular capabilities (Backtrack, Remove fillers, Numbered lists, Auto punctuation), each expandable.
5. **"Personalize" section** — pill-tab label "Personalize," "Flow *adapts* to you" heading (italic "adapts"), "Dictionary" sub-block with description, paired with a Slack-screenshot mockup showing a hand-drawn orange annotation circling a corrected name.
6. **"Collaborate" section** — near-black panel, "Work better *together*" heading (italic), sticker illustration of three people at a shared desk/monitor setup (die-cut outline style), presumably team/snippet-sharing copy below the fold.

### `/pricing`

1. **Hero** — "Pricing" heading under a large hand-drawn lavender wavy line arcing across the top of the section; subcopy "Download the app to **get started with 14 days of Flow Pro for free.** No credit card required."; a Monthly/Annual (20% discount) pill toggle.
2. **Three pricing cards** — Flow Basic (Free, "FOR INDIVIDUALS"), Flow Pro ($12/user/mo billed annually, "FOR INDIVIDUALS AND TEAMS," black 2px border = emphasized tier), Flow Enterprise (Contact us, "FOR TEAMS WHO NEED ADVANCED SECURITY & SUPPORT") — each a 40px-radius card with a checklist of included features (black checkmarks), the non-emphasized cards using the muted tan border and the Pro card using a full black border to signal "featured."
3. **"Start Flowing today" comparison table** — a categorized feature-by-feature row comparison (Effortless voice typing / Team & collaboration features / etc. as section headers) across Basic/Pro/Enterprise columns, checkmarks and red ✕ marks, sticky column headers with the plan CTAs repeated at the top as you scroll.
4. **"Teams move faster with Flow"** — logo marquee (Vercel, Replit, Nuuly, Warp, Rivian, Notion, Decagon...) similar to the homepage trust band.
5. **"Calculate your savings"** — dark-teal interactive panel: a labeled range slider ("I spend N hours typing a day (X words)"), a secondary inline-editable value ("my time is worth $50/hour"), and a live-updating results card ("Monthly, you'll save $X,XXX/mo" plus a breakdown: hours spent typing, hours saved monthly, time value saved, Flow Pro monthly cost). A sticker illustration of a person juggling/gesturing sits top-right.

### `/business`

1. **Hero** — "Talk instead of type, *anywhere* you work." (italic "anywhere"), subcopy about team voice-to-text with enterprise security + admin controls, single lavender "Get started" pill. Right side: a realistic laptop-device-frame mockup (unlike other pages' plain rectangular screenshots) showing a Slack-like interface mid-dictation with a live "ADDING PUNCTUATION" waveform-pill status indicator. "Trusted by teams at" logo strip below.
2. **Security/compliance feature list** — near-black panel ending in bullet copy about data handling, encryption, and a Business Associate Agreement (BAA) for HIPAA — text-only, no illustration, functional/trust-building tone.
3. **Customer video testimonial** — split layout: left a real photo (person dictating in front of a monitor showing a CRM-like contact grid, with a circular play button overlay), right a large pull-quote heading ("Learn how Flow powered 20% faster GTM execution at 🥥clay") with a supporting quote and attribution (Yash Tekriwal, Head of Education, in this instance).

### `/developers`

1. **Hero** — "FLOW FOR DEVELOPERS" eyebrow label, "Dictation built for developers" heading, subcopy "Ship 4x faster with syntax-smart dictation," lavender CTA. A thick, freehand-style teal wavy line arcs across the top of the whole section (the boldest example of the hand-drawn-line motif). Right side: a dark rounded panel mockup of an AI coding-agent prompt bar with inline code-reference chips (`@helper.swift`, `@README.md`) and an orange circular submit arrow.
2. **"Speak detailed prompts hands-free"** — photo/screenshot panel (an agent chat UI with "Agent ⌘I / Auto" controls) paired with a bullet list ("Gets developer terms, like Supabase or MongoDB," "Handles camelCase, snake_case, and acronyms," "Tags files in Cursor and Windsurf...") and a row of real tool logos (a 3D-cube icon, an orange "*" icon, GitHub, VS Code).
3. **Further accordion detail section** — "File tagging," "Syntax awareness," "Dev jargon" expandable rows plus a "Learn more" outline pill, next to a code-editor mockup with a floating waveform-pill icon over a blurred photo background.

### `/case-study/clay` (representative case-study template)

1. **Breadcrumb + hero** — "CASE STUDY › CLAY" eyebrow, Clay's own logo, headline "How Clay drove 20% faster GTM execution with Wispr Flow," a short company description, and a large video panel (real photo of a person working, white circular play button) on the right.
2. Structure implies the rest of the page (not fully scrolled) continues with a dark panel likely containing pull quotes/metrics, consistent with the homepage's case-study card content for the same company.

### `/about`

1. **Hero** — full-bleed dark, moody motion-blurred office photo (purple/blue toned) as background; large cream serif headline "The Voice Interface Company." centered; a full ring of small white text orbiting the hero (some of it deliberately upside-down at the top of the circle, readable only by tilting/rotating), reading as mission-statement fragments ("We focus on the biggest use cases that make voice dictation delightful... where we aren't stuck looking...that are both useful — so you trust them — and ubiquitous").
2. **"We care about..." values section** — near-black panel; the brand's bar-chart icon glyph centered; five short "We care about building..." statements (designing with incredible attention to detail / building magic / building intelligence that mimics humans / building experiences that feel intuitive / building software that seamlessly fits into your life) arranged in a circle around the center icon, connected by hand-drawn lavender arc/orbit lines radiating outward — directly reusing the "orbiting text" and "hand-drawn connecting line" motifs from the hero and the homepage's sparkle-burst headings.

### Nav mega-menus (Product / Individuals / Resources / Company)

- **Product**: Features ("Do more with your voice"), Pricing ("Flow Pro free for 14 days — No card required"), Android Waitlist, Privacy & Security, Web Demo ("Try Flow on browser"), Why Flow over built-in voice-to-text, Microphone guide.
- **Individuals** ("FLOW FOR"): Leaders, Developers, Creators, Customer Support, Students, Lawyers, Accessibility, Sales — each with a one-line value-prop description and a small line icon.
- **Resources**: "CASE STUDIES FOR" — Teams at Clay (NEW), Reid the Cofounder of LinkedIn, Steven Bartlett the CEO (NEW), Tijs the Marathon Maker, Dean the Founder, Gaurav the Advisor, Greg the Writer, Anthony the Creator (note the folksy "[Name] the [Role]" naming convention for case studies); then "Learn" (Blog, Use cases, AI prompting guide) and "Get help" (Help Center, Talk to support, Talk to sales).
- **Company**: About, Careers, Trust Center, Become an Affiliate, Media Kit.

---

## 9. Anything else notable

- **The "Ask ChatGPT / Ask Claude / Ask Perplexity" trust section** on the homepage is a distinctive, very-2025 mechanic: instead of (or alongside) traditional FAQ/trust badges, it deep-links directly into third-party AI chat products with a pre-filled prompt asking "why Wispr Flow is a great choice," essentially outsourcing the pitch to competitor/partner AI tools. Worth flagging as a novel trust-signal idea distinct from the visual style itself.
- **Folksy, human-first case-study naming**: "Reid the Cofounder of LinkedIn," "Steven Bartlett the CEO," "Tijs the Marathon Maker," "Dean the Founder," "Gaurav the Advisor," "Greg the Writer," "Anthony the Creator" — a consistent "[First name] the [Role/Identity]" pattern used only in the nav dropdown case-study list, giving even enterprise-grade social proof (Reid Hoffman, LinkedIn cofounder) a warm, first-name-basis tone consistent with the illustrated/handwritten visual language.
- **Copy tone is casual and benefit-first, rarely feature-jargon-heavy.** Headlines lean on punchy short claims ("4x faster than typing," "Don't type, just speak," "One tool. Your workflow.") over technical descriptions; body copy stays conversational ("Rambled thoughts become clear, perfectly formatted text, without the filler words or typos"). CTA button copy is consistently just "Download for macOS," "Try Flow," or "Get started" — no elaborate CTA copywriting.
- **The waveform/audio pill icon (rounded black or white capsule containing vertical equalizer bars) is a recurring UI motif** used as a floating "recording in progress" indicator over nearly every product screenshot and photo across the whole site — it functions almost like a secondary logo mark, reinforcing "this is a voice product" visually even when no audio is actually playing.
- **Real customer/company logos are left in native brand colors** (Vercel's black triangle, Notion's black "N," Slack's colorful icon, etc.) even though almost everything else on the site is restricted to the cream/black/teal/lavender/orange palette — brand logos are the one deliberate exception to the otherwise tightly controlled palette.
- **The fixed bottom-left fingerprint/scan-icon circular badge** persists across every single page and section background observed (cream, black, teal, lavender), always in the same lavender-filled circle — functions as a constant, unobtrusive brand anchor independent of whatever section is currently in view.
