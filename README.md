# TTMIK

Korean language learning audio app with composed lesson libraries, archetype skills, healing lanes, and WebNovel-integrated chapter packs. Open `TTMIK.html` in a browser (or serve the repo root locally) and boot lanes via URL query params.

## Quick start

```bash
npm run build              # syntax + package checks
node scripts/boot-all.js   # heal skills, rebuild libraries, validate registry
```

Open the app:

```
TTMIK.html?boot=all
```

## Heal all

Full local refresh (Hermes skills, healing library, composed libraries, manifest):

```bash
node scripts/boot-all.js
```

Commit refreshed manifest after heal:

```bash
git add .devin/ttmik-worktree.json
git commit -m "Heal all: refresh worktree manifest"
git push origin main
```

## Composed libraries (25 · 471 tracks)

Boot any library with `TTMIK.html?library=<id>`:

| Library | Boot |
|---------|------|
| TTMIK Courses + compose | `library=compose` |
| Healing Factors | `library=heal` |
| FIFA nations | `library=mexico` · `canada` · `usa` |
| Archetype lanes | `ignan` · `asuka` · `heidi` · `sven` · `martin` · `ronaldo` · `mbappe` · `messi` · `vinicus` · `kane` · `evangelion` · `rickmorty` · `mika` · `haley` |
| Web fiction | `svsss` · `solo-leveling` · `boys-love` · `webnovel-crossover` · `webnovel-package` |
| Skill bundles | `melbourne-skills` · `sovereign-skills` |

### WebNovel package

Canonical catalog source: [`data/webnovel.json`](data/webnovel.json) (`schema: ttmik-webnovel/v1`).

- **SVSSS** — [book/35203689408704405](https://www.webnovel.com/book/35203689408704405) (109 ch · ID translation)
- **Solo Leveling** — [comic/15227640605485101](https://www.webnovel.com/comic/15227640605485101) (202 ch · D&C MEDIA)

```bash
node scripts/export-webnovel-json.js
node scripts/import-webnovel-json.js path/to/webnovel.json --rebuild
node scripts/build-webnovel-catalog.js
node scripts/fetch-webnovel-catalog.js --rebuild   # live TOC (may 403 without browser cookies)
```

Boot: `TTMIK.html?library=webnovel-package` · `?svsss=1` · `?solo-leveling=1` · `?boys-love=1`

**Note:** Inkstone author HTML and accessibility-tree JSON dumps are not valid catalog imports.

## Archetype & lane boots

| Lane | Boot |
|------|------|
| Helen boundary | `heal=1` · `heal=1&sheet=1` |
| Ignan pilgrimage | `ignan=1` · `ignan=1&sheet=1` |
| SVSSS / Shen Qingqiu | `svsss=1` · `webnovel=1` |
| Solo Leveling / Jinwoo | `solo-leveling=1` · `jinwoo=1` |
| Boys Love mirror | `boys-love=1` · `bamboo=1` |
| FIFA attune | `attune=1` · `fifa=1` · `kane=1&watch=1` |
| Any archetype skill | `skill=<skill-id>&sheet=1` |

Heal factors: `TTMIK.html?heal-factor=<id>` (e.g. `rei-mercy`, `b-point-guard`, `slow-burn-boundary`).

## Fast Character (D&D 5e sheets)

Presets in [`fastcharacter-data.js`](fastcharacter-data.js) POST to [fastcharacter.com](https://fastcharacter.com/results2024.php). Each archetype skill can open its sheet with `&sheet=1`.

Class anchors (no full archetype lane):

| Anchor | Boot |
|--------|------|
| Sorcerer Draconic | `sorcerer=1` |
| Warlock Great Old One | `warlock=1` |
| Monster Slayer (Ranger proxy) | `monster-slayer=1` |
| Fijian Indian Warrior (Fighter Champion) | `fijian-indian-warrior=1` · `fiji-warrior=1` · `fiji=1` |

## Local companion apps

| App | URL |
|-----|-----|
| Boys Love · After the Bamboo | http://localhost:5191 |
| lets-cook · Date Night | http://localhost:5173 |
| Video editor bridge | http://localhost:8000 |

## Hermes

`boot-all` heals 24 `.skill.md` archetypes into `.devin/skills`, repo root, and `~/.hermes/skills/creative/`. Worktree manifest: `.devin/ttmik-worktree.json` (mirrored to `~/.hermes/ttmik-worktree.json`).

```bash
node scripts/heal-skills.js
node scripts/hermes-patch.js
node scripts/preload-skills.js   # optional /ttmik-all bundle
```

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/build.js` | Syntax + npm workspace validation |
| `scripts/boot-all.js` | Heal all · libraries · registry · boot URL list |
| `scripts/build-libraries.js` | Rebuild composed library track counts |
| `scripts/heal-skills.js` | Hermes skill sync from `.skill.md` |
| `scripts/heal-library.js` | Healing factors library from sources |
| `scripts/export-webnovel-json.js` | Write canonical `data/webnovel.json` |
| `scripts/import-webnovel-json.js` | Validate + import external catalog JSON |
| `scripts/build-webnovel-catalog.js` | Generate `webnovel-catalog-data.js` |

## Packages

npm workspaces under `packages/`:

- **ttmik-heal-skills** — heal library + Hermes skill writer
- **ttmik-webhook** — webhook API for social/heal feeds

## License

MIT — see [package.json](package.json).