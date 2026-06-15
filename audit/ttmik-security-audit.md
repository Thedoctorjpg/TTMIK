# Security Audit: TTMIK Audio Lab (Re-audit)

**Repository:** https://github.com/Thedoctorjpg/TTMIK  
**Commit:** `39cb3d9` — *Add Skills tab and heal archetype skills for Hermes*  
**Prior audit:** `9a9dad9` (2026-06-16 deep pass) · remediated in `089a60a`  
**Auditor:** Hermes CLI + static code review (Grok Build)  
**Date:** 2026-06-16  
**Scope:** Full client app (`TTMIK.html`, `app.js`, `utils.js`, `storage.js`, `social.js`, `skills.js`, `skills-data.js`, `lesson-data.js`, `sovereign-data.js`), serverless webhook (`api/ttmik-webhook.js`), dev tooling (`scripts/heal-skills.js`)

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

## Hermes CLI Results (supply chain)

```bash
hermes security audit --json
```

| Metric | Result |
| ------ | ------ |
| Components scanned | 64 (Hermes venv only) |
| Findings | 6 (PyJWT 2.12.1 ×5, pip 26.1.1 ×1) |
| TTMIK app lockfile deps | **None** |

TTMIK ships no `package.json`, `requirements.txt`, or lockfile. Supply-chain findings apply to the **Hermes Agent installation**, not application runtime.

| Severity | Package | Advisory | Fix |
| -------- | ------- | -------- | --- |
| LOW | PyJWT 2.12.1 | GHSA-fhv5-28vv-h8m8 | ≥ 2.13.0 |
| UNKNOWN | pip 26.1.1 | PYSEC-2026-196 | ≥ 26.1.2 |
| UNKNOWN | PyJWT 2.12.1 | PYSEC-2026-175–179 | ≥ 2.13.0 |

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

### Finding E: `heal-skills.js` writes outside repo (dev-only)

- **Severity**: informational
- **Category**: Tooling / Supply Chain
- **Location**: `scripts/heal-skills.js:281-304`
- **Description**: Dev script writes SKILL.md files to `~/.hermes/skills/creative/` and may append to `~/.hermes/config.yaml`. Not invoked at runtime by the web app.
- **Impact**: Running the script on an untrusted machine could overwrite Hermes config; no browser exposure.
- **Remediation**: Document that heal script is maintainer-only; run only from trusted checkout.
- **Status**: open (informational)

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
| `sovereign-data.js` | Static lesson metadata |
| `lesson-data.js` | TTMIK course definitions |