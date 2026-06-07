# Post content-swap notes

State after the content swap of 2026-06-07 (the `docs/zyplux-new-content/` kit was applied
and then deleted). Copy source of truth is now `apps/web/src/content.ts` — every
user-visible string lives there; page titles/meta are duplicated in `apps/web/*.html`.

## Launch blockers

- [ ] **Form endpoint** — `FORM_ENDPOINT` in `apps/web/src/content.ts` is a placeholder.
      Create an account with a plain-POST form service (Formspree, Web3Forms, or
      equivalent — NOT an iframe-embed service like Tally/Typeform), paste the real URL,
      and name the provider in the privacy copy (`PRIVACY_PAGE`, "Where it goes."
      section). All three forms POST to the one endpoint with a hidden `form` field:
      `audit` · `agent-updates` · `insights-updates`. A honeypot field (`website`) is
      stripped client-side; the service's spam filtering does the rest (Cloudflare
      Turnstile is optional post-launch hardening).
- [ ] **hello@zyplux.ai mailbox** — being set up (Sergiy). Published in the footer and on
      the privacy page; must receive mail before launch. Interim personal contact is
      sergiy.yeskov@gmail.com — never publish the personal address.

## Verify before launch

- Privacy page says "We don't run tracking or analytics scripts." — true of the repo
  today. If Cloudflare Web Analytics (or anything else) gets enabled, update
  `PRIVACY_PAGE` accordingly.
- Form success/error microcopy in `FORM_MESSAGES` (content.ts) was written during the
  swap (behaviorally specified, not verbatim kit copy) — give it a read.
- Founder photo (`apps/web/src/assets/founder.jpg`) is the interim 400×400 LinkedIn
  export — replace with a higher-res shot when available (displayed at 160px, fine for
  now).

## Done

- [x] LinkedIn in footer: <https://www.linkedin.com/in/sergiy-yeskov-4a8534152/> (2026-06-07)
- [x] Privacy page built at `/privacy`, linked from the footer

## og:image (deferred)

The preview image platforms (LinkedIn, X, Slack, WhatsApp, iMessage, Teams) show when
zyplux.ai is shared. Without one, shares render as bare text.

- Spec: 1200×630 px (1.91:1), PNG or JPG, under ~1 MB, key content centered (edges get
  cropped on some platforms).
- Make one in Figma/Canva ("Open Graph image" templates): dark `#0d1117` background,
  Zyplux wordmark in the site's gradient, "Work that finishes itself." beneath.
- Ship: drop the file at `apps/web/public/og.png`, then in `apps/web/index.html` add
  `<meta property="og:image" content="https://zyplux.ai/og.png" />` and change
  `twitter:card` from `summary` to `summary_large_image`.

## Later (not blocking launch) — carried over from the kit

- **`/agent` showcase** — embed the web view from the totvibe-agent repo (Bun.serve +
  WebSocket, one runtime per connection) as a sandboxed read-only demo session with a
  scripted scenario, e.g. the invoice vignette from the home page played out for real.
  Visible approval moments and the audit log are the money shots — they prove the "your
  team approves / every action is logged" claims.
- **`/insights` articles**, in roughly this order:
  1. What an AI agent actually does all day — the home-page vignettes, expanded with real mechanics
  2. Why your chatbot disappointed you — names the scar tissue, explains the agent-vs-chatbot difference honestly
  3. The approval button — how an agent stays safe inside a real business; approvals, limits, audit logs
  4. One workflow first — the math of a pilot: why starting small beats an "AI strategy"
  5. Where agents fail — an honest catalogue; builds more trust than any success story
- **Booking link** — the "Prefer a conversation? Book a 20-minute call." secondary under
  the final CTA stays omitted until a calendar link exists.
- Light-theme experiment and headline A/B once traffic exists.

## Copy rules (ongoing, from the kit)

- Brand is **Zyplux** — never "Zyplux.ai" in copy, nav, or headlines. The domain appears
  only as domain, email, and footer.
- Banned words: agentic, LLM, orchestration, RAG, model, prompt, leverage, transformative
  (the sole exception is the canonical "never trains public AI models" line).
- Every claim about the platform must be true of the actual product (approvals, audit
  log, scoped access, private per-client runtime).
- Vignettes are labeled as scenarios — never passed off as client case studies. No
  invented client counts, testimonials, or results.
- Outcome and time words over technology words; mirror the buyer's own phrases.
- No public pricing — the free audit delivers the exact fixed price.

## Decisions changed after the kit

- Hero h1 is the brand **Zyplux** (shimmer gradient) again — founder preference,
  2026-06-07. "Work that finishes itself." was dropped from the hero (the subhead "We
  connect a private AI agent…" stays) but remains the `<title>` and `og:title`.
