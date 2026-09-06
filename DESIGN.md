# Design

**Status:** The direction and principles in this document are approved. Exact layouts, artifacts, and optional interactions remain provisional until Cyan approves a prototype.

## Thesis

Cyanistic's Home translates the design grammar of Cyan's real Hyprland, Eww, and terminal setup into honest website functions. It does not copy unrelated desktop widgets or apply a generic terminal aesthetic.

The site should feel as if the same person designed both the website and the desktop. It should not feel like a desktop copied into a browser.

## Authority

When design sources disagree, use this order:

1. Cyan's explicit decisions
2. This document
3. `PRODUCT.md`
4. Cyan's real desktop and dotfiles
5. The current site on `main`
6. Research reports
7. Prototype branches

Research and prototypes are evidence. They do not become approved direction without Cyan's decision.

## Core principles

### Translate the grammar

Use the desktop's relationships rather than its inventory of widgets:

- compact modules with clear state;
- uneven Dwindle-like hierarchy;
- titleless content regions;
- narrow, consistent gaps;
- quiet inactive boundaries and unmistakable focus;
- dense information without cramped text;
- selective disclosure of supporting detail;
- quick, responsive motion.

A desktop-inspired control must perform a real website task. Purely expressive details such as wallpaper, color, and bar geometry do not need invented functionality.

### Show the work

Real projects, interfaces, code, output, writing, and approved environment details establish Cyan's identity. Biography and summary copy support that evidence instead of replacing it.

The homepage lead artifact is intentionally undecided. Project logos can mark temporary prototype content, but they are not proof of behavior. Do not invent screenshots, terminal output, code, configuration, or product claims to fill a layout.

### Author the hierarchy

Start with a deliberate static composition. Dwindle informs the relationship between content regions; it does not require a split-tree engine.

Pane dragging, resizing, global keybindings, layout persistence, command palettes, and a special workspace are deferred experiments. Add one only after a static design succeeds and the interaction improves a real visitor task.

### Keep the website direct

Routes remain normal links with normal browser history. Content remains readable and navigable without JavaScript. Visitors never need terminal commands, desktop knowledge, or a shortcut sheet to use the site.

## Desktop-to-web translation

| Desktop concept | Website translation |
| --- | --- |
| Workspace | Named site route |
| Active workspace | Current site section |
| Focused window | Real keyboard focus within a content region |
| Dwindle split | Authored editorial hierarchy |
| Eww revealer | Optional supporting detail disclosed by an explicit control; hover may supplement it |
| File or project explorer | A catalog only when selecting an item reveals substantial material |
| Workspace motion | A restrained continuity cue between related states |
| Window movement and resizing | Deferred until a content task earns them |
| Special workspace | Deferred until it has a necessary purpose |
| Computer telemetry | Desktop-only; omit from the website |

Current route, selected content, visual emphasis, and keyboard focus are different states. Do not represent all four with the same glowing border.

## Visual grammar

### Bar

Preserve the recognizable character of Cyan's Eww bar:

- a compact rounded capsule;
- angled divisions between module groups;
- clear active state;
- tightly grouped controls;
- restrained reveal of supplementary information.

Translate its contents to the web. Workspace modules link to named routes. Other modules can link to real destinations such as GitHub or RSS. Do not reproduce Wi-Fi, memory, volume, cryptocurrency, or other computer-only readings.

Essential navigation names remain visible. Icons may support meaning but cannot carry it alone. The current section stays identifiable on nested routes such as individual articles.

### Surfaces and boundaries

Use dark Foot-derived surfaces over subdued wallpaper atmosphere. Content regions are titleless and share seams like a Dwindle layout rather than appearing as unrelated cards.

Inactive boundaries recede. Keyboard focus is precise and clearly visible. A focused containing region may echo Cyan's cyan-to-pale-blue active border, but the control itself still needs its own focus indicator.

Rounded forms belong to the system, but content regions should not become generic bento cards. The bar can be more rounded than the content it governs.

### Typography

JetBrains Mono carries navigation, metadata, configuration, code, and compact interface text. Remove the current page-wide semibold treatment.

Long-form reading typography remains an explicit prototype comparison: regular-weight JetBrains Mono versus Atkinson for prose. Reading comfort decides; neither choice may erase the site's terminal-native identity.

### Color reference

The real configuration establishes this family:

- bar base: `#0f0f17`;
- module surface: `#262639`;
- terminal surface: `#1a1b26`;
- primary text: `#d8dee9`;
- default blue: `#6ba2bc`;
- focused cyan: `#1da0ca`;
- active-border companion: `#a4d5e8`;
- inactive boundary: `#595959` with reduced opacity;
- muted Nord-derived green, yellow, red, purple, and blue accents.

These values are references, not automatic acceptance criteria. Contrast, wallpaper crop, stacking, and browser rendering can require adjustment. Define separate tokens for surfaces, text, boundaries, focus, and accents; do not pass hex tokens through `rgb()` or `rgba()`.

### Space, opacity, and motion

The desktop uses 3px inner gaps, 5px outer gaps, 3px borders, 10px window rounding, and roughly 80% terminal opacity. Preserve the compact relationships, not necessarily the literal numbers.

Use motion as state feedback. Cyan's desktop favors quick slides, fades, and slight overshoot. Browser motion should stay restrained, avoid moving whole reading surfaces without purpose, and respect `prefers-reduced-motion`.

Wallpaper supports the atmosphere. The visual system must still feel specific when the wallpaper is temporarily removed.

### Terminal decoration

Use prompts, cursors, terminal transcripts, and similar details only when the content is genuinely terminal or code material. Ordinary section headings do not pretend to be shell output.

Avoid global scanlines, decorative blinking cursors, fake commands, fake live output, and decorative macOS traffic-light dots.

## Route character

Consistency comes from the bar, surfaces, typography, boundaries, focus, and motion. Each route uses the composition that fits its job.

### Home

Identify Cyan briefly, then show one substantial artifact. A recommended composition places one dominant artifact beside two supporting regions for writing and environment context. Compare this Dwindle composition with a simpler editorial control before approval.

On desktop, the first screen can read as a complete workspace. Additional material continues through normal document scrolling rather than trapping the whole page inside independently scrolling windows.

### Projects

Present the five existing projects as a compact catalog with their motivations and explicit repository destinations. A list-detail explorer is justified only when the selected project has substantial material to reveal. Do not assume project-detail routes exist.

### Software

Treat software choices as personal evidence. Prefer Cyan's approved reasons and configuration details over generic product descriptions.

### Writing index

Give the two existing articles enough space for their different titles, dates, and tones. Do not create explorer, search, or filtering machinery until the content volume requires it.

### Article

Use a quiet reading surface with controlled measure, complete code examples, and semantic headings. An outline can support a long article when useful; it should not become a permanent empty pane on short writing.

### About

Present an authored personal document rather than a skills dashboard or mock system-information command. Preserve approved facts and Cyan's own voice.

### Donate

Keep this route stable, direct, and restrained. Payment methods, addresses, ownership, and availability require verification. Do not turn trust-sensitive information into decorative terminal theater.

## Interaction vocabulary

The initial approved vocabulary is small:

1. **Workspace navigation:** normal named route links with a stable current-section marker.
2. **Precise focus:** clear control focus, with an optional containing-region response.
3. **Useful disclosure:** explicit controls reveal supporting information. Hover and focus can preview the reveal, but touch and keyboard retain the same outcome.
4. **Restrained continuity:** small state or route transitions can echo workspace switching.

The interface does not copy Hyprland's `follow_mouse` behavior by moving browser focus. It does not require Cyan's personal keybindings.

## Responsive behavior

Mobile preserves priority and identity, not desktop geometry:

- use one document scroll;
- retain visible site identity;
- provide a compact named workspace row;
- place a meaningful artifact early;
- convert desktop splits into intentional source order;
- reduce redundant framing and exposed wallpaper;
- keep code scrolling inside its own block;
- use comfortable touch targets and readable text.

Density comes from removing redundant chrome, not shrinking content.

## Prototype brief

The next design prototype covers two existing surfaces:

1. the homepage, at desktop and mobile sizes;
2. the existing Irys article as a contrasting reading surface.

The homepage compares identical temporary content in two compositions:

- a dominant artifact beside two supporting Dwindle regions;
- a single editorial column with compact supporting rows.

The prototype includes working navigation, current-section behavior, focus states, reduced motion, and at most one useful disclosure. It introduces no new dependency, route, content model, persistence, or general pane system.

The lead artifact is deferred. Existing project logos may stand in as clearly temporary markers. Taggy's current repository screenshot is not approved as the homepage lead.

## Acceptance tests

The direction succeeds when:

- a peer can identify Cyan and one concrete piece of work within ten seconds;
- visitors can reach projects and writing without decoding icons or using special interactions;
- the interface still feels related to Cyan's desktop when wallpaper is hidden;
- current section, selected content, visual priority, and keyboard focus remain distinguishable;
- a meaningful artifact appears early at 390px;
- the Irys article works at 200% zoom and with reduced motion;
- disabling JavaScript leaves content and navigation usable;
- visitors remember the work rather than only the desktop metaphor.

Reject or simplify the direction when:

- it reads as a generic dark portfolio, bento dashboard, or simulated operating system;
- it needs instructions before visitors can explore;
- empty panes or invented output are required to complete the composition;
- interaction competes with reading or project evidence;
- wallpaper and monospace are the only recognizable links to Cyan's setup.

## Open decisions

- The final homepage lead artifact and any new capture
- The winning homepage composition
- Long-form article typography
- The final set of website-native Eww modules
- Whether a later content task earns pane manipulation

## References

- `PRODUCT.md` — stable product truth
- `AGENTS.md` — project decision rules
- `docs/research/cyanistic-home-redesign-2026-09.md` — research input; not authoritative, untracked local copy absent from clones
- `src/` on `main` — current implementation and content
- `~/Documents/Dotfiles/.config/hypr/hyprland.conf` — desktop relationships and motion
- `~/Documents/Dotfiles/.config/eww/bar/` — bar structure and module behavior
- `~/Documents/Dotfiles/.config/foot/foot.ini` — terminal typography and palette
- Cyan's desktop screenshot reviewed on 2026-09-05 — intentionally not stored in this repository
