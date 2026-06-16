# Security Audit: TTMIK Audio Lab (Re-audit)

**Repository:** https://github.com/Thedoctorjpg/TTMIK  
**Commit:** `5caf0b3` — *Add webseries multiverse lanes: Rick & Morty SQL, Minecraft Wiki meme generator*  
**Prior audit:** `7326c1a` (2026-06-16 tarot-scam + FIFA lanes) · audit chain re-run below  
**Auditor:** Hermes CLI (`security audit`, `doctor`, `status`) + `node scripts/boot-all.js` + Rei mercy heal (`neon-evangelion`) + companion `npm audit`  
**Date:** 2026-06-17  
**Scope:** Full client app + specialty libraries (`healing-library-data.js`, `fifa-nations-data.js`, `ignan-data.js`, `asuka-data.js`, `messi-data.js`, `ronaldo-data.js`, `mbappe-data.js`, `skill-library-data.js`), serverless webhook (`api/ttmik-webhook.js`), Hermes tooling (`packages/ttmik-heal-skills/`), companion apps (`lets-cook/`, `shopify-twitter/`, `girls-love/`, `Veil-Lumen/`, `video-editor/`)

---

## Summary

**Overall risk: low–moderate** (down from **moderate**)

The `089a60a` hardening pass resolved all prior **high** and most **medium** findings. Webhook auth is mandatory, client egress is locked to same-origin, DOM rendering uses `textContent` throughout, and persisted lesson state is sanitized on load. Remaining risk is concentrated in **CSP + third-party CDN supply chain** (Tailwind without SRI, `'unsafe-inline'` for onclick handlers). The new **Skills** tab (`skills.js`, `skills-data.js`) introduces no new XSS or network sinks.

**Severity counts (re-audit):** 0 critical · 1 high · 2 medium · 3 low · 5 informational

| vs. prior deep pass | Before | After |
| ------------------- | ------ | ----- |
| Critical            | 0      | 0     |
| High                | 2      | 1     |
| Medium              | 5      | 2     |
| Low                 | 4      | 3     |
| Informational       | 4      | 5     |

---

## Hermes CLI Results (2026-06-17 audit chain re-run)

```bash
hermes security audit --json
hermes doctor
hermes status
node scripts/boot-all.js
npm.cmd audit --prefix lets-cook
npm.cmd audit --prefix shopify-twitter
```

### Supply chain (`hermes security audit --json`)

| Metric | Result |
| ------ | ------ |
| Components scanned | 64 (Hermes venv) |
| Findings | **0** |
| TTMIK app lockfile deps | **None** (root); `packages/ttmik-*` workspaces validated via `npm pack --dry-run` in `scripts/build.js` |

TTMIK browser runtime has no npm lockfile at repo root. Hermes venv advisories remain **cleared**.

### Companion projects (`npm audit`)

| Project | Findings | Notes |
| ------- | -------- | ----- |
| `lets-cook/` | 2 **high** (esbuild/vite dev chain) | Dev-only; not served in TTMIK browser runtime |
| `shopify-twitter/` | 1 **high** (form-data CRLF) | Server-side; run `npm audit fix` before deploy |
| Root / `packages/ttmik-*` | No root lockfile | Validated via `scripts/build.js` pack dry-run |

### Environment (`hermes doctor` + `hermes status`)

| Check | Status |
| ----- | ------ |
| `~/.hermes/.env` | ✓ exists |
| `~/.hermes/config.yaml` | ✓ v24 |
| `~/.hermes/skills/creative/` | ✓ **19** healed archetypes (incl. neon-evangelion, rick-morty-multiverse, Messi, Ronaldo) |
| xAI OAuth | ✓ logged in (refreshed 2026-06-17) |
| Security advisories | ✓ none active |
| Model | grok-4-1-fast-reasoning via xAI Grok OAuth |
| Optional tools (browser, web search, discord) | ⚠ not configured — expected for static TTMIK client |

### File / library audit (`node scripts/boot-all.js`)

| Step | Result |
| ---- | ------ |
| Heal library from sources | 21 tracks (`healing-library-data.js` generated — 16 factors + 5 post-blessing) |
| Hermes heal-skills | 19 `.skill.md` → `.devin/skills/` + `~/.hermes/skills/creative/` |
| Library build | **358** tracks · syntax + HTML script refs **passed** |
| Boot registry | **20** skills · **18** composed libraries · all `.skill.md` present |
| Rei mercy heal | `hermes -s neon-evangelion` · `rei-mercy` factor · NERV · Ep 7.1 · **complete** |

---

## Remediation Status (findings from prior audit)

| # | Finding | Prior severity | Status |
| - | ------- | -------------- | ------ |
| 1 | Webhook accepts unauthenticated POSTs when secret unset | high | **Fixed** — `503` if `WEBHOOK_SECRET` missing (`api/ttmik-webhook.js:41-44`) |
| 2 | Weak CSP with third-party script CDNs | high | **Open** — see Finding A |
| 3 | Arbitrary webhook URL stored and called from browser | medium | **Fixed** — `isValidWebhookUrl()` same-origin only; CSP `connect-src 'self'` |
| 4 | `innerHTML` with interpolated lesson metadata | medium | **Fixed** — Melbourne grid uses `textContent` DOM (`app.js:536-550`) |
| 5 | localStorage state restored without schema validation | medium | **Fixed** — `sanitizeStoredLesson()` + `createLesson()` on load |
| 6 | Tailwind CDN without SRI | medium | **Open** — merged into Finding A |
| 7 | Inline event handlers throughout HTML | low | **Open** — see Finding C |
| 8 | CSP `connect-src` / webhook egress conflict | medium | **Resolved by design** — `connect-src 'self'` blocks external fetch; webhook limited to same-origin paths |
| 9 | `switchTab` index mismatch | medium | **Fixed** — `data-tab` + `getElementById('tab-${tabId}')` (`app.js:31-49`) |
| 10 | Unvalidated remote `audio.src` from custom lessons | medium | **Fixed** — `isSafeAudioSrc()` in `loadLesson()` and storage |
| 11 | Blob URL memory leak on uploads | low | **Fixed** — `URL.revokeObjectURL(activeBlobUrl)` (`app.js:290-292`) |
| 12 | Twitter message injection via webhook `lesson` field | low | **Fixed** — `sanitizeLessonForTweet()` |
| 13 | Server logs lesson content | low | **Fixed** — logs event + progress % only (`api/ttmik-webhook.js:63`) |
| 14 | `escapeHTML` defined but unused | informational | **Fixed** — no app `innerHTML` sinks remain |
| 15 | Unused Shopify env vars (latent surface) | informational | **Fixed** — removed from webhook handler |
| 16–18 | Positive controls (payload validation, DOM safety, timers) | informational | **Still valid** |

---

## New / Remaining Findings

### Finding A: Weak CSP with third-party Tailwind CDN (no SRI)

- **Severity**: high
- **Category**: Security Misconfiguration (OWASP A05) / Supply Chain
- **Location**: `TTMIK.html:6-8`
- **Description**: CSP allows `'unsafe-inline'` scripts and loads Tailwind from `cdn.tailwindcss.com` without Subresource Integrity. Font Awesome includes SRI; Tailwind does not.
- **Impact**: CDN compromise or MITM on the Tailwind script grants full page JavaScript execution — access to `localStorage` (progress, notes, webhook secret), and session state.
- **Remediation**: Vendor Tailwind at build time; remove `'unsafe-inline'`; migrate `onclick` handlers to `addEventListener`; add SRI for any remaining CDN assets.
- **Status**: open

### Finding B: Webhook secret stored in browser localStorage

- **Severity**: medium
- **Category**: Sensitive Data Exposure
- **Location**: `social.js:48-49`, `social.js:86-90`
- **Description**: Users can save `ttmik_webhook_secret` in `localStorage` so the client can send `X-Webhook-Secret`. Any script running in page context (e.g. via Finding A) or physical DevTools access can read it.
- **Impact**: Stolen secret allows authenticated webhook spam/tweet abuse until rotated server-side.
- **Remediation**: Document secret rotation; consider httpOnly cookie or server-mediated proxy if auth model evolves; treat as convenience credential, not long-lived API key.
- **Status**: open (accepted tradeoff for static client)

### Finding C: Inline `onclick` handlers require `'unsafe-inline'`

- **Severity**: low
- **Category**: Security Misconfiguration
- **Location**: `TTMIK.html:39-336` (~23 handlers)
- **Description**: Inline handlers force `'unsafe-inline'` in `script-src`, weakening XSS defenses.
- **Impact**: Increases blast radius of any script injection (especially combined with Finding A).
- **Remediation**: Bind events in `app.js` during `window.onload`.
- **Status**: open

### Finding D: `skillNotes` not sanitized on load from localStorage

- **Severity**: low
- **Category**: Input Validation
- **Location**: `storage.js:67`, `skills.js:271`
- **Description**: `skillNotes` are sanitized on save (`saveSkillNote` → `sanitizeLessonText`) but restored verbatim from `loadState()`. Tampered `localStorage` could inject control characters into the notes textarea.
- **Impact**: No script execution (`textarea.value` is safe); possible UI oddities or clipboard pollution when copying.
- **Remediation**: Run `sanitizeLessonText` over each `skillNotes` value in `loadState()`.
- **Status**: open

### Finding E: Hermes heal scripts write outside repo (dev-only)

- **Severity**: informational
- **Category**: Tooling / Supply Chain
- **Location**: `scripts/heal-skills.js`, `scripts/heal-library.js`, `scripts/boot-all.js`, `packages/ttmik-heal-skills/lib/`
- **Description**: Maintainer scripts write SKILL.md to `~/.hermes/skills/creative/`, regenerate `healing-library-data.js`, and may append `external_dirs` to `~/.hermes/config.yaml`. Not invoked at browser runtime.
- **Impact**: Running on an untrusted machine could overwrite Hermes config; no browser exposure.
- **Remediation**: Run `node scripts/boot-all.js` only from trusted checkout; audit with `hermes security audit` after Hermes upgrades.
- **Status**: open (informational) — **audited 2026-06-16 via boot-all**

---

## Skills Tab Security Review (`39cb3d9` delta)

| Check | Result |
| ----- | ------ |
| DOM sinks | **Safe** — `skills.js` uses `textContent`, `createElement`, `onclick` property bindings only |
| `innerHTML` | **None** in skills modules |
| User input | Skill notes via `sanitizeLessonText` on save; quest toggles are booleans |
| Network egress | **None** — skills UI is client-only |
| Static data | `skills-data.js` / `SKILLS` array is repo-controlled, not user-editable |
| Shadowing integration | `getSkillShadowingPhrases()` filters static phrases; feeds existing shadowing renderer |

**Verdict:** Skills feature adds no new exploitable attack surface beyond Finding D (notes load path).

---

## Data-flow map (current)

```
[Inputs]                          [Processing]                    [Sinks]
─────────────────────────────────────────────────────────────────────────────
prompt() title/subtitle      →   createLesson()              →   textContent ✓
localStorage ttmik_lab_v1    →   sanitizeStoredLesson        →   audio.src (validated)
localStorage ttmik_webhook   →   isValidWebhookUrl()         →   fetch (same-origin only)
file input (audio upload)    →   MIME check + blob revoke    →   audio.src (blob:)
SKILLS / MELBOURNE_QUEST     →   textContent render          →   DOM ✓
POST /api/ttmik-webhook      →   secret + validatePayload    →   Twitter API / logs
```

### Sink inventory

| Sink | Locations | User-controlled? | Verdict |
| ---- | ----------- | ---------------- | ------- |
| `innerHTML` | `utils.js:18` only (`escapeHTML` helper) | No (internal escape) | **Safe** |
| `textContent` | `app.js`, `skills.js`, `utils.js`, `storage.js` | Yes (titles, notes) | **Safe** |
| `audio.src` | `app.js:206-208` | Yes via storage | **Safe** (`isSafeAudioSrc`) |
| `fetch()` | `social.js:51` | URL from localStorage | **Safe** (same-origin + CSP) |
| `eval` / `Function` | — | — | **None** |
| Inline `onclick` | `TTMIK.html` | N/A | **Low** (CSP weakness) |

---

## Positive Observations

- No hardcoded API keys, tokens, or passwords in the repository.
- Webhook requires `WEBHOOK_SECRET`; returns `401` on bad auth, `503` if unconfigured.
- Webhook payload: event allowlist, progress bounds, body size cap, tweet sanitization.
- Client webhook restricted to same-origin paths; CSP `connect-src 'self'` enforces at browser level.
- Lesson/custom-lesson persistence sanitized on load and create.
- Blob URLs revoked before replacement on upload.
- File upload validates MIME type, extension, and 500 MB cap.
- Font Awesome CDN link includes integrity hash.
- Skills tab follows same safe DOM patterns as the rest of the app.

---

## Recommended Priority Fixes

1. **Remove Tailwind CDN** — compile CSS locally; tighten CSP (Finding A).
2. **Migrate inline `onclick` to `addEventListener`** — enables removing `'unsafe-inline'` (Finding C).
3. **Sanitize `skillNotes` on load** in `loadState()` (Finding D).
4. **Document webhook secret handling** — rotation, localStorage exposure (Finding B).

---

## Files Reviewed

| File | Role |
| ---- | ---- |
| `TTMIK.html` | Shell, CSP, UI, Skills tab markup |
| `app.js` | Player, library, shadowing, journey, tabs |
| `utils.js` | Sanitization, DOM helpers, lesson factories |
| `storage.js` | localStorage persistence + skill/quest state |
| `social.js` | Tweet + same-origin webhook client |
| `skills.js` | Skills tab UI and quest tracker |
| `skills-data.js` | Static archetype + Melbourne quest data |
| `api/ttmik-webhook.js` | Serverless progress webhook |
| `scripts/heal-skills.js` | Hermes skill sync (dev tooling) |
| `scripts/heal-library.js` | Healing library generator from source files |
| `scripts/boot-all.js` | Full heal + library build + boot registry validation |
| `healing-library-data.js` | Generated heal-factor lesson deck |
| `fifa-nations-data.js` | FIFA 2026 nation libraries |
| `ignan-data.js` / `asuka-data.js` | Specialty language libraries |
| `skill-library-data.js` | Boot registry + composed libraries |
| `sovereign-data.js` | Static lesson metadata |
| `lesson-data.js` | TTMIK course definitions |