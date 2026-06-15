# Security Audit: TTMIK Audio Lab

**Repository:** https://github.com/Thedoctorjpg/TTMIK  
**Commit:** `9a9dad9` — *Integrate modular app architecture, Sovereign Guide, and social features*  
**Auditor:** Hermes-style static security review (Grok Build)  
**Date:** 2026-06-16  
**Scope:** Client-side app (`TTMIK.html`, `app.js`, `utils.js`, `storage.js`, `social.js`, `lesson-data.js`, `sovereign-data.js`) and serverless webhook (`api/ttmik-webhook.js`)

---

## Summary

**Overall risk: moderate**

TTMIK is a static, client-first Korean audio learning app with no backend database and no user authentication. Most user-generated content is rendered safely via `textContent`. The main risks are (1) a deployable webhook handler that can be left unauthenticated, (2) a weak Content-Security-Policy combined with third-party CDN scripts, and (3) client-side webhook configuration that can leak progress data to arbitrary URLs. No hardcoded secrets, malware, or obvious injection sinks were found in built-in lesson data.

**Severity counts (deep pass):** 0 critical · 2 high · 5 medium · 4 low · 4 informational

---

## Deep Audit Pass (`--deep`)

### Hermes `--deep` CLI

| Command | Result |
| ------- | ------ |
| `hermes skills audit --deep` | **No hub-installed skills** — AST-level Python scan skipped (nothing to audit). |
| `hermes security audit --json` | 63 components scanned (Hermes venv); 6 findings (PyJWT, pip). **TTMIK ships zero lockfile deps.** |

`--deep` does not add a repo source-code mode in Hermes. Deep coverage below is a **manual AST/data-flow pass** across all 8 application files (~1,700 LOC JS + 329 LOC HTML).

### Data-flow map (inputs → sinks)

```
[Inputs]                          [Processing]                    [Sinks]
─────────────────────────────────────────────────────────────────────────────
prompt() title/subtitle      →   createLesson()              →   textContent ✓
localStorage ttmik_lab_v1    →   JSON.parse + spread merge   →   audio.src / textarea
localStorage ttmik_webhook   →   fetch(webhookUrl)           →   network egress
file input (audio upload)    →   createObjectURL + MIME chk  →   audio.src (blob:)
SOVEREIGN_COURSE_DEFS        →   innerHTML template          →   DOM (latent XSS)
built-in lesson src paths    →   encodeURI()                 →   audio.src (relative)
tweetProgress()              →   window.open + fetch         →   Twitter intent / webhook
POST /api/ttmik-webhook      →   validatePayload()           →   Twitter API / logs
```

### Sink inventory (all DOM / execution primitives)

| Sink | Locations | User-controlled? | Verdict |
| ---- | ----------- | ---------------- | ------- |
| `innerHTML` | `app.js:153,407,526`, `utils.js:74` | 526: static data today; 153/407: static icons | **Medium** at 526 |
| `textContent` | `app.js`, `utils.js`, `storage.js` (15+ sites) | Yes (titles, notes, search) | **Safe** |
| `audio.src` | `app.js:209,299` | Yes via localStorage custom lessons | **Medium** |
| `fetch()` | `social.js:35`, `api/ttmik-webhook.js:53` | URL from localStorage / hardcoded | **Medium** |
| `JSON.parse` | `storage.js:28` | Yes (localStorage) | **Low** (no proto merge bug via spread) |
| `window.open` | `social.js:19` | Tweet text from lesson title | **Low** (intent URL, encoded) |
| `eval` / `Function` | — | — | **None found** |
| Inline `onclick` | `TTMIK.html` × **23** handlers | N/A | **Low** (CSP weakness) |

---

## Hermes CLI Results (supply chain)

`hermes security audit` was run from the repo root. TTMIK has **no Python/npm lockfile dependencies** in-repo, so the scan only reported issues in the **Hermes Agent installation venv** (not TTMIK application code):

| Severity | Package   | Advisory            | Fix        |
| -------- | --------- | ------------------- | ---------- |
| LOW      | PyJWT 2.12.1 | GHSA-fhv5-28vv-h8m8 | ≥ 2.13.0 |
| UNKNOWN  | pip 26.1.1   | PYSEC-2026-196      | ≥ 26.1.2 |
| UNKNOWN  | PyJWT 2.12.1 | PYSEC-2026-175–179  | ≥ 2.13.0 |

`hermes doctor`: Hermes installed but no `~/.hermes/.env` or model auth configured (agent chat audit not run).

---

### Finding 1: Webhook accepts unauthenticated POSTs when secret unset

- **Severity**: high
- **Category**: Broken Authentication (OWASP A07)
- **Location**: `api/ttmik-webhook.js:29-35`
- **Description**: Authentication is only enforced when `WEBHOOK_SECRET` is set. If deployed without that env var, anyone can POST progress events.
- **Impact**: Attackers can spam the endpoint. If `TWITTER_BEARER_TOKEN` is also configured, they can trigger unauthorized tweets from the connected X account.
- **Reproduction**:
  1. Deploy `api/ttmik-webhook.js` without `WEBHOOK_SECRET`.
  2. `curl -X POST https://<deploy>/api/ttmik-webhook -H "Content-Type: application/json" -d '{"event":"ttmik_progress","lesson":"test","progress":100}'`
  3. Request succeeds with `200`.
- **Remediation**: Require `WEBHOOK_SECRET` at startup; return `503` if missing. Add rate limiting (e.g. Vercel middleware / Upstash).
- **Status**: open

### Finding 2: Weak CSP with third-party script CDNs

- **Severity**: high
- **Category**: Security Misconfiguration (OWASP A05)
- **Location**: `TTMIK.html:6-8`
- **Description**: CSP allows `'unsafe-inline'` scripts and loads Tailwind from `cdn.tailwindcss.com` without Subresource Integrity. Font Awesome has SRI; Tailwind does not.
- **Impact**: A CDN compromise or MITM on the Tailwind script grants full page JavaScript execution — access to `localStorage` notes/progress, webhook URL, and session state.
- **Reproduction**: If `cdn.tailwindcss.com` serves malicious JS, it runs in page context with no integrity check.
- **Remediation**: Vendor Tailwind at build time; remove `'unsafe-inline'`; migrate `onclick` handlers to `addEventListener` in `app.js`; add SRI for any remaining CDN assets.
- **Status**: open

### Finding 3: Arbitrary webhook URL stored and called from browser

- **Severity**: medium
- **Category**: Data Exposure / SSRF-like client behavior
- **Location**: `social.js:33-39`, `social.js:45-58`
- **Description**: Users can save any URL in `localStorage` (`ttmik_webhook_url`). `tweetProgress()` POSTs lesson title, progress %, and timestamp with no URL scheme/host validation.
- **Impact**: Social-engineering or XSS could point the webhook at an attacker server, exfiltrating learning activity. Internal network targets are generally blocked by browser mixed-content rules but attacker-controlled HTTPS endpoints work.
- **Reproduction**:
  1. Open app → Configure webhook → enter `https://attacker.example/collect`.
  2. Click Tweet Progress.
  3. Attacker receives JSON payload with lesson metadata.
- **Remediation**: Restrict to `https://` only; allowlist known hosts; send `X-Webhook-Secret` header when user provides one; document that webhook URLs are sensitive.
- **Status**: open

### Finding 4: `innerHTML` with interpolated lesson metadata

- **Severity**: medium
- **Category**: Cross-Site Scripting (OWASP A03)
- **Location**: `app.js:526`
- **Description**: Melbourne quick-start buttons use `innerHTML` with `${def.subtitle}`. Built-in subtitles in `sovereign-data.js` are static, but the pattern is unsafe if data ever comes from `localStorage` custom lessons or user input.
- **Impact**: Stored XSS if a tampered or user-supplied subtitle contains HTML/script.
- **Reproduction**: If `customLessons` in localStorage included `subtitle: '<img src=x onerror=alert(1)>'` and that path fed this renderer, script would execute. (Current code path uses `SOVEREIGN_COURSE_DEFS` only — latent risk.)
- **Remediation**: Replace `innerHTML` with `textContent` on child elements (same pattern as `renderLessons()`).
- **Status**: open

### Finding 5: localStorage state restored without schema validation

- **Severity**: medium
- **Category**: Input Validation
- **Location**: `storage.js:24-38`, `storage.js:155-159`
- **Description**: `loadState()` merges parsed JSON with defaults but does not validate types or sanitize `customLessons` fields (`src`, `title`, `transcript`).
- **Impact**: Physical access or another vulnerability writing to `localStorage` can inject malformed lesson `src` values or oversized strings, causing unexpected network requests or UI oddities.
- **Reproduction**: DevTools → Application → `ttmik_lab_v1` → set `customLessons[0].src` to `https://evil.example/track.mp3` → reload.
- **Remediation**: Validate with a schema (max lengths, `src` must be relative path or `blob:`); strip HTML from text fields on load.
- **Status**: open

### Finding 6: Tailwind CDN loaded without integrity attribute

- **Severity**: medium
- **Category**: Supply Chain / Subresource Integrity
- **Location**: `TTMIK.html:8`
- **Description**: `<script src="https://cdn.tailwindcss.com">` has no `integrity` hash unlike Font Awesome on line 9.
- **Impact**: CDN supply-chain attack surface (see Finding 2).
- **Remediation**: Self-host or pin with SRI; prefer compiled CSS.
- **Status**: open

### Finding 7: Inline event handlers throughout HTML

- **Severity**: low
- **Category**: Security Misconfiguration
- **Location**: `TTMIK.html:39-173` (multiple `onclick` attributes)
- **Description**: Inline handlers require `'unsafe-inline'` in CSP, weakening XSS defenses.
- **Impact**: Increases blast radius of any script injection.
- **Remediation**: Bind events in `app.js` during `window.onload`.
- **Status**: open

### Finding 8: CSP `default-src 'self'` blocks external webhook `fetch` (feature/security conflict)

- **Severity**: medium
- **Category**: Security Misconfiguration / Defense in Depth
- **Location**: `TTMIK.html:6`, `social.js:35-39`
- **Description**: CSP has no `connect-src` directive, so it inherits `default-src 'self'`. Browser `fetch(webhookUrl)` to any external HTTPS endpoint is **blocked** when the app is served from a normal origin. Webhook egress only works under relaxed contexts (e.g. some `file://` loads) or if CSP is weakened later.
- **Impact**: Adding `connect-src https://*` to fix webhooks would **open arbitrary egress** from the page — the inverse of Finding 3. Today the policy accidentally constrains exfil in hosted deployments.
- **Remediation**: Add explicit `connect-src 'self' https://<your-webhook-host>'`; never use `connect-src *`.
- **Status**: open

### Finding 9: `switchTab` index mismatch — Progress nav broken, Journey highlights wrong link

- **Severity**: medium
- **Category**: Logic / Integrity (deep trace)
- **Location**: `TTMIK.html:51-55`, `app.js:30-50`
- **Description**: Five nav links call `switchTab(0,1,2,4,5)` but `tabLinks` is a 0–4 array. `switchTab(5)` fails the bounds check (`n >= tabLinks.length`) so **Progress is unreachable** from the sidebar. `switchTab(4)` shows Journey content but highlights `tabLinks[4]` (the Progress link).
- **Impact**: Broken UX; progress/stats UI hidden from users. Not exploitable, but indicates insufficient regression testing after tab expansion.
- **Reproduction**: Click **Progress** in sidebar → console error `index 5 is out of range`; Journey tab highlights Progress nav item.
- **Remediation**: Decouple nav index from tab ID — e.g. `data-tab="5"` on links, or use contiguous indices 0–4.
- **Status**: open

### Finding 10: Unvalidated remote `audio.src` from persisted custom lessons

- **Severity**: medium
- **Category**: Data Handling / Privacy
- **Location**: `storage.js:141-159`, `app.js:207-209`
- **Description**: `restoreCustomLessons()` rehydrates `src` from localStorage without scheme validation. `loadLesson()` sets `audio.src = encodeURI(lesson.src)` with no restriction to relative/`blob:` paths.
- **Impact**: Tampered state can point the player at attacker-controlled HTTPS audio URLs, leaking Referer/User-Agent on request. `encodeURI` does not block `https://` absolute URLs.
- **Reproduction**: Set `customLessons[0].src = "https://attacker.example/beacon.mp3"` in DevTools → reload → play lesson → attacker sees HTTP hit.
- **Remediation**: Allow only relative paths matching `^[\w ./-]+\.mp3$` or `blob:` URLs.
- **Status**: open

### Finding 11: Blob URL memory leak on repeated uploads

- **Severity**: low
- **Category**: Resource Exhaustion
- **Location**: `app.js:290-309`
- **Description**: `URL.createObjectURL(file)` is never paired with `URL.revokeObjectURL()`. Each upload allocates a persistent blob reference.
- **Impact**: Long sessions with many uploads can grow memory without bound (local DoS).
- **Remediation**: Revoke previous blob URL before assigning a new one.
- **Status**: open

### Finding 12: Twitter message injection via webhook `lesson` field

- **Severity**: low
- **Category**: Injection (content)
- **Location**: `api/ttmik-webhook.js:52`
- **Description**: Tweet text embeds unsanitized `lesson` inside double quotes: `` `"...${lesson.slice(0, 100)}..."` ``. Attacker-controlled POST body can inject misleading tweet content (newlines, emoji spam, fake completion claims).
- **Impact**: Reputation harm if webhook is unauthenticated (Finding 1). Not HTML injection — plain-text tweet abuse.
- **Remediation**: Strip quotes/newlines; allowlist alphanumeric + Korean chars; or hash lesson IDs server-side.
- **Status**: open

### Finding 13: Server logs lesson content

- **Severity**: low
- **Category**: Data Exposure
- **Location**: `api/ttmik-webhook.js:49`
- **Description**: `console.log` writes lesson names and progress to server logs.
- **Impact**: PII/usage data in log aggregators without retention policy.
- **Remediation**: Log hashed lesson IDs or redact in production.
- **Status**: open

### Finding 14: `escapeHTML` helper defined but unused in render paths

- **Severity**: informational
- **Category**: Defense in Depth
- **Location**: `utils.js:14-18`
- **Description**: Safe escaping exists but Melbourne grid and badge icons use `innerHTML` instead.
- **Remediation**: Use `escapeHTML` or DOM APIs consistently.
- **Status**: open

### Finding 15: Documented Shopify integration env vars are unused (latent surface)

- **Severity**: informational
- **Category**: Dead Code / Future Risk
- **Location**: `api/ttmik-webhook.js:7-8`
- **Description**: `SHOPIFY_STORE_URL` and `SHOPIFY_ACCESS_TOKEN` are documented but never referenced. Future wiring risks exposing admin tokens if added without review.
- **Status**: open

### Finding 16: Webhook payload validation is solid

- **Severity**: informational (positive)
- **Category**: Input Validation
- **Location**: `api/ttmik-webhook.js:13-22`, `api/ttmik-webhook.js:37-40`
- **Description**: Type checks, progress bounds, body size cap, and lesson length limit are implemented.
- **Status**: n/a

### Finding 17: DOM rendering largely XSS-safe for lesson UI

- **Severity**: informational (positive)
- **Category**: XSS Prevention
- **Location**: `app.js:159-166`, `utils.js:79-88`, `utils.js:91-105`
- **Description**: Lesson cards, transcripts, and vocab use `textContent`. Transcripts strip HTML tags before display.
- **Status**: n/a

### Finding 18: Shadowing timer correctly cleared (regression check)

- **Severity**: informational (positive)
- **Category**: Resource Management
- **Location**: `app.js:365-370`, `app.js:435-456`
- **Description**: `stopShadowingTimer()` runs before restart; Devin branch noted this class of leak — current modular code handles it.
- **Status**: n/a

---

## Positive Observations

- No hardcoded API keys, tokens, or passwords in the repository.
- Client file upload validates MIME type, extension, and 500 MB size cap (`app.js:276-288`).
- Audio errors are handled without leaking stack traces to the UI.
- Webhook handler rejects non-POST methods and validates JSON shape.
- Font Awesome CDN link includes integrity hash.
- `fetch` to Twitter is server-side only (token not exposed to browser).

---

## Recommended Priority Fixes

1. **Deploy webhook with mandatory `WEBHOOK_SECRET`** and rate limiting.
2. **Remove Tailwind CDN** — compile CSS locally; tighten CSP.
3. **Fix `switchTab` nav/tab ID mapping** — Progress tab is currently dead.
4. **Replace `innerHTML` at `app.js:526`** with safe DOM construction.
5. **Validate webhook URLs** in `configureWebhook()` (https-only + explicit `connect-src`).
6. **Add JSON schema validation** on `loadState()` / `restoreCustomLessons()`; restrict `audio.src` to relative/`blob:` paths.
7. **Revoke blob URLs** after upload replacement.

---

## Files Reviewed

| File | Lines | Role |
| ---- | ----- | ---- |
| `TTMIK.html` | 329 | Shell, CSP, UI |
| `app.js` | 657 | Player, library, shadowing, journey |
| `utils.js` | 107 | DOM helpers, lesson factories |
| `storage.js` | 245 | localStorage persistence |
| `social.js` | 60 | Tweet + webhook client |
| `api/ttmik-webhook.js` | 75 | Serverless progress webhook |
| `sovereign-data.js` | 199 | Static lesson metadata |
| `lesson-data.js` | ~large | TTMIK course definitions |