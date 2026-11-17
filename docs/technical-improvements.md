# Technical improvement release

Scope: performance, technical SEO, accessibility and reliable operation. Existing portfolio artwork, project content, service descriptions, themes and enquiry options are retained. Factual questions are recorded separately in [factual-review-questions.md](factual-review-questions.md).

## Implemented

- Responsive Cloudinary derivatives at quality 80 with automatic format negotiation. Original assets remain available; galleries use their recorded intrinsic dimensions. Hover variants load on intent and thumbnails below the first row are lazy.
- Hero artwork exported at its original 1672-pixel width as quality-85 WebP, 176–209 KB per variant versus the previous 2.1–2.2 MB PNGs. The full width preserves the tall mobile cover crop without upscaling. Both light/dark originals remain in the repository. A pre-rendered noise tile replaces the form's live SVG turbulence filter.
- Project grid renders without JavaScript. All 22 detail routes are pre-generated; category back-navigation is a small client enhancement. Existing service details are server-rendered native disclosures with keyboard operation and supported-browser expansion transitions.
- Carousel animation runs only while visible, the document is active, no controls/cards have focus, and it is not paused or reduced-motion. Added named navigation/pause controls. Duplicate loop cards are excluded from sequential keyboard navigation and the accessibility tree.
- Essential text and navigation remain visible before hydration. Counters expose final existing values to assistive technology. No experience/team figures have been factually changed.
- Central theme state uses next-themes, preserves the circular transition and respects reduced-motion preference. Mobile navigation has dialog semantics, focus management, Escape and an explicit close control.
- Route-specific Open Graph/Twitter previews replace inherited placeholder cards. Generated sitemap reads the actual project list. Its material-change date is explicitly maintained rather than refreshed on every build.
- Contact labels meet the corrected contrast target; controls include autocomplete and names. A persistent live status, bounded wait and retry-safe error copy preserve entries after failure. Server input validates types/lengths, rejects honeypots and escapes HTML in mail. SMTP waits are bounded. No valid email was sent during automated testing.
- Restored TypeScript checks, ESLint and a PR quality workflow. Regression tests cover desktop/mobile navigation, themes, static content, image derivatives, filters, disclosures, reduced motion and mocked enquiry outcomes.

## Development and checks

Use Node 22.14+ and the package-manager version pinned in package.json. `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, then `pnpm exec playwright test`. On a local machine with Chrome installed, set `PLAYWRIGHT_CHANNEL=chrome`; CI installs Playwright Chromium. Dependency build policy is explicit; prebuilt Sharp binaries are used without an install script.

ESLint 9 is retained for compatibility with the installed Next 16.2 lint plugins. ESLint 10 is incompatible with their current React plugin API. Upgrade the framework/lint stack together in a separately validated maintenance change. Unused third-party packages are not assumed to contribute browser bytes merely because they are installed.

Run `pnpm images:prepare` after changing hero source artwork. Run `pnpm images:metadata` when adding/changing project imagery; this reads public image metadata and writes the checked-in dimension map. Keep image quality decisions subject to visual comparison, especially fine architectural lines.

## Measured validation (17 November 2026)

Local production builds, Lighthouse 12.8.2 simulated mobile, one run per route before/after; decimal MB. These lab measurements are directional, not real-user percentiles. The baseline predates the separately merged service-answer update; this release retains that update.

| Page | Performance score | Transfer | LCP | Total blocking time | Layout shift |
| --- | --- | --- | --- | --- | --- |
| Home | 43 → 90 | 34.83 → 0.95 MB | 19.44 → 3.56 s | 5,090 → 97 ms | 0 → 0 |
| Projects | 40 → 94 | 66.34 → 0.83 MB | 16.59 → 2.96 s | 667 → 74 ms | 0.396 → 0 |
| Asymmetrical Boxing | 58 → 99 | 10.08 → 0.46 MB | 4.25 → 2.27 s | 1,988 → 52 ms | 0 → 0 |

All three measured routes scored 100 for Lighthouse accessibility and SEO. Automated axe checks across home, projects, services, contact and the sample project in both themes, plus desktop home, found no WCAG violations. Automated checks do not establish complete accessibility or actual search indexing. Browser regression tests cover 14 desktop/mobile scenarios; successful enquiry responses are mocked to avoid sending email.

## Account-dependent follow-up

- Optional custom events and real-user LCP/CLS/INP instrumentation are ready behind `NEXT_PUBLIC_ENABLE_ANALYTICS_EVENTS=true`. Confirm the analytics plan/privacy settings before enabling. Events contain route, metric or contact channel, never enquiry text, names or phone numbers. Default pageview analytics is preserved.
- Search Console/Bing verification, actual indexing, real crawler firewall logs, conversion dashboards and business-profile settings need the corresponding account access. Robots remain open; no search visibility guarantee is made.
- Durable abuse/rate controls belong at the hosting edge or a shared store. The honeypot and bounded validation are not represented as distributed rate limiting. Real SMTP delivery still requires a separately authorized controlled send; tests intercept successful submissions.
- Current typography is retained. Referenced but unloaded font families are not silently replaced, since that would change appearance; selecting/self-hosting a different approved font is a design decision.
- Factual/statistical/award changes and expanded case studies are deferred at the owner's request.

Release flow: commit on dev; review and merge dev into prod through a pull request; check the public site's actual responses and interactions after deployment. Compare lab performance with the earlier audit using the same profile, and distinguish one-run lab scores from real-user measurements.
