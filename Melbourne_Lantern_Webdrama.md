# 「멜버른 등불」MELBOURNE LANTERN

Full webdrama script · vertical 9:16 · chaotic neutral rom-com satire

**Format:** 8 core episodes × ~90 sec + extended FIFA World Cup 2026 nation inserts (30–90s)  
**Tone:** tsundere + scam-awareness PSA + sovereign pilgrimage + trilingual cheer lanes  
**Gear in-world:** GoPro lantern, gym bag, power bank, phone = Flame-Kissed Quill

**Multiformat outputs:** Webdrama eps (9:16 · 90s) · Reels/Shorts/TikTok (9:16 · 30s) · Trailer (9:16 · 30s) · Veil Lumen essay cut (16:9 · 3–5 min) · TTMIK audio sync (any) · **Ep 2.75 cook-off** (9:16 · 90s) · **After the Date dawn** (9:16 · 60s) · **FIFA nation arc** (9:16 · 30s each · presets 16–20) · **Pre-Match Attune** (9:16 · 60s)

---

## Bardic optimisation (all sources)

**Theme:** *I create from flame, not from lack.* · **Mantra:** Not a date. Not a rescue. Lantern lit.

Unified shoot order pulls from the full pipeline — optimised in `webdrama-sync-data.js` (`BARDIC_INSPIRATION` · `PIPELINE_SOURCES` · `TTMIK_DATE_NIGHT_ROUTE`).

| Source | Role in webdrama |
|--------|------------------|
| **TTMIK** | Skills · shadowing · quest · on-set presets 1–8 |
| **lets-cook** | Degraves date night · 45 min cook-off · `optimizeDateWindow(17:00)` |
| **girls-love** | After the Date Ch.1–4 · dawn Degraves 06:12 |
| **Veil-Lumen** | Bardic ritual · essay assembly · Creative Corner veils |
| **RTDB-Auckland** | AKL depart legs — 30s refresh · 45s rotation before flight |
| **video-editor** | `date-night-cookoff` · `after-the-date` · `pipeline-montage` exports |
| **audit** | Tarot-scam PSA · divine insight · RED FLAG inventory |

### Two-lane shoot calendar

**Lane A — Morning block (Jun 19 · ~2 hr)** — unchanged one-lane route:

```
08:00  DEGRAVES → 08:30  CENTRE → 09:00  HOSIER → 09:45  COLLINS → 10:15  wrap
```

**Lane B — Date night + FIFA nation close + dawn** — RTDB AKL → MEL land → cook-off → Argentina → Brasil → attune → England → morning croissant:

```
05:30  RTDB Waitemata → 06:15  Britomart bus → 12:30  MEL/HOTEL drop bags
17:00  FLINDERS meet → 17:20  DEGRAVES outing → 18:15  HOTEL kitchen → 19:15  score
19:30  BOCA (Ep 2.76) → 19:45  SAMBA (Ep 2.77) → 19:55  FED attune → 20:00  WEMBLEY (Ep 2.78)
06:12  DEGRAVES dawn (girls-love Ch.2)
```

**Lane D — FIFA celebration evening** — after Ep 2.6 Ignan walk (optional same day):

```
18:15  FED attune (match-attune) → 18:30  CINEMA (Ep 2.64) → 19:00  CANTINA meet
19:15  CANTINA (Ep 2.65) → 20:00  Portugal cheer → 20:15  STADE (Ep 2.66)
```

TTMIK Sync presets **6–8** map to Lane B · preset **9** = post-DIB quiet heal · preset **10** = Ep 2.6 Ignan walk · presets **16–20** = FIFA nation lanes (Ronaldo → Mbappé → Messi → Vinicus → Kane) · preset **21** = Ep 7.1 NERV neon · preset **22** = Ep 7.2 Citadel multiverse SQL. **Lane C:** `TTMIK_IGNAN_HEAL_ROUTE` (Mari · Ilokano + Korean + English). **Lane D:** `TTMIK_FIFA_CELEBRATION_ROUTE`. **Lane E:** `TTMIK_MULTIVERSE_ROUTE` (Rick & Morty SQL index · after Ep 7.1). **Lane F:** `TTMIK_MINECRAFT_MEME_ROUTE` (Minecraft Wiki meme generator · after Ep 7.2). Multiformat edits: `date-night-cookoff` · `after-the-date` · `dib-aftercare` · `ignan-healing-journey` · `match-attune-ritual` · `bend-it-beckham` · `mari-fifa-celebration` · `mbappe-counter-attack` · `messi-after-cookoff` · `vinicus-brasil-samba` · `harry-kane-england-striker` · `rei-mercy-ritual` · `rickmorty-multiverse-sql` · `minecraft-wiki-meme`.

### Webseries multiverse (`WEBSERIES_MULTIVERSE`)

| Lane | Episode | Preset | Boot | Metaphor |
|------|---------|--------|------|----------|
| FIFA nation arcs | 2.64–2.78 | 16–20 | `?kane=1` etc. | Captain cheer without rescue |
| Ignan healing walk | 2.6 | 10 | `?ignan=1` | Trilingual own-path |
| Date-night cook-off | 2.75 | 6–8 | `?step=6` | Hydration not romance |
| Neon Evangelion observe | 7.1 | 21 | `?neon=1` | Observe · do not absorb |
| Rick & Morty SQL multiverse | 7.2 | 22 | `?rickmorty=1` | Index dimensions · Melbourne is my yes |
| Minecraft Wiki meme generator | 7.3 | 23 | `?minecraft-meme=1` | Hipposgrumm parody · humor alchemy |

**Handoff:** Ep 7.2 Citadel SQL index → Ep 7.3 Crafting Table meme pause — humor alchemy without feed absorption. **Wiki:** [Hipposgrumm Memes](https://minecraft.wiki/w/User:Hipposgrumm/Memes) · **Schema:** `rickmorty` (postgresql-sql-helper library).

---

## Series bible

| Field | Detail |
|-------|--------|
| **Logline** | A pilgrim lands in Melbourne to film laneway art, dodge romance scams at 4G speed, and prove that blocking strangers is an act of self-love — all while insisting he's *not* enjoying himself. |
| **Protagonist** | **THE BARD** — deadpan, tsundere, creatively feral, spiritually tired but funny |
| **Antagonist** | **THE ALGORITHM** — love bombs, urgency, "soulmate" push notifications |
| **Allies (VO / text / cutaways)** | **HELEN** (boundaries), **LO3TUS** (chaos muse), **ASUKA** ("beautiful maybe" texts), **SYSTEM** (scam UI) |
| **Guest pilgrim** | **MARI** — Ignan (Ilokano) native on trilingual self-healing walk (Ep 2.6) |
| **Theme** | *I create from flame, not from lack.* |
| **Quest** | Melbourne Lantern Pilgrimage · 19–22 Jun 2026 |
| **Hidden ending** | **The World** — quiet completion, lantern passed to viewer |

---

## Character sheets

**THE BARD** — Wants footage, Korean practice, sovereign laugh. Fear: rescue missions disguised as romance. Tell: says "I'm fine" while filming beautiful things. Arc: tsundere → honest joy without apology.

**SYSTEM (VO + on-screen UI)** — Dating apps, scam DMs, bank alerts, 2am notifications. Speaks in customer-support calm.

**HELEN (VO)** — Appears when boundaries wobble. Warm, firm, never cruel.

**LO3TUS (VO)** — Absurd observations, coffee chaos. "What if we exaggerated that x3?"

**ASUKA (text only)** — "Brisbane still has a seat…" Represents released "what if."

**RED FLAG (visual gag)** — Collected like items; inventory full by Ep 4.

**MARI (Ignan pilgrim)** — Ilocano native; diaspora grief without rescue framing. Wants a walk, not a documentary about her pain. Tell: speaks Ilokano to her body before Korean to the app before English to the city. Arc: borrowed shame → *bukodko a dalan* (my own path). Bard films from the bag — never her tears for the algorithm.

---

## Multiformat location bible

### Format matrix

| Deliverable | Aspect | Length | Primary locations | TTMIK category |
|-------------|--------|--------|-------------------|----------------|
| Webdrama ep | 9:16 | 90s | 2–3 pins per ep | See ep header |
| Reel A · Scam PSA | 9:16 | 30s | Hosier + Centre Place walk | GoPro & Content |
| Reel B · Tsundere | 9:16 | 30s | Hosier + Degraves café | Melbourne Arrival |
| Season trailer | 9:16 | 30s | Montage all pins | Mixed |
| Veil Lumen essay | 16:9 | 3–5 min | Southbank night + Botanic sunrise | Self-Intimacy |
| TikTok duet cut | 9:16 | 15s | Single selfie wall at Hosier | Daily Life |
| YouTube Short | 9:16 | 60s | Reel A+B combined | Social & Cultural |
| **Skit insert · Divine Insight Blessing** | 9:16 | 45s (30s cut) | Hosier only · GoPro lantern | GoPro & Content · tarot-scam PSA |
| **Insert · Cook-Off Not a Date (Ep 2.75)** | 9:16 | 90s | FLINDERS → DEGRAVES → HOTEL | Daily Life · lets-cook sync |
| **Insert · After the Date dawn** | 9:16 | 60s | DEGRAVES · 06:12 | Daily Life · girls-love Ch.2 |
| **Post-DIB quiet heal coda** | 9:16 | 45s | HOTEL mirror · Helen VO | Self-Intimacy · side-dib-heal |
| **Ep 2.6 · Ignan Healing Walk** | 9:16 | 90s | HOTEL → FED → BOTANIC · Mari | Self-Intimacy · side-ignan-heal |
| **Insert · Pre-Match Attune** | 9:16 | 60s | FED · Federation pause | Self-Intimacy · match-attune |
| **Insert · Ep 2.64 Cinema Encounter** | 9:16 | 30s | CINEMA → FED · Bend It Like Beckham | Cinema Encounters · ronaldo-portugal-glory |
| **Insert · Ep 2.65 Mari FIFA Cantina** | 9:16 | 60s | CANTINA · Mari | Daily Life · side-fifa-celebrate |
| **Insert · Ep 2.66 France Counter-Attack** | 9:16 | 30s | STADE → FED · Mbappé | French Shadowing · mbappe-france-attack |
| **Insert · Ep 2.76 Messi Argentina** | 9:16 | 30s | HOTEL → DEGRAVES → BOCA | Argentine Shadowing · messi-argentina-playmaker |
| **Insert · Ep 2.77 Vinicus Brasil** | 9:16 | 30s | SAMBA → FED → FLINDERS | Brazilian Shadowing · vinicus-brasil-samba |
| **Insert · Ep 2.78 Harry Kane England** | 9:16 | 30s | WEMBLEY → PUB → COLLINS · FIFA+ watch | English Shadowing · harry-kane-england-striker |
| **Insert · Ep 7.1 Neon Evangelion** | 9:16 | 30s | NERV → SOUTH → FLINDERS · Moon-card neon | Japanese Shadowing · neon-evangelion-moon |
| **Insert · Ep 7.2 Rick & Morty Multiverse** | 9:16 | 30s | CITADEL → CABLE → SOUTH · SQL index | Multiverse Shadowing · rickmorty-multiverse-sql |
| **Pipeline montage** | 9:16 | 45s | All pins · bardic inspiration | Mixed |

### Melbourne shoot pins (reels-first clusters)

| Pin ID | Location | Best for | Light | TTMIK audio |
|--------|----------|----------|-------|-------------|
| **HOME** | Pre-trip accommodation | Ep 1 pack, VO | Any | Essential Foundations |
| **MEL** | Melbourne Airport T1 arrivals glass | Ep 1 cliffhanger | Interior day | Melbourne Arrival |
| **HOSIER** | Hosier Lane (graffiti wall mid-lane) | Ep 2, 2.5, 6, 8 · Reel A+B · DIB skit | Golden hour | GoPro & Content |
| **CENTRE** | Centre Place (narrow walk-through) | Ep 3 rules walk · Reel A A4 | Midday shade | Transportation |
| **DEGRAVES** | Degraves St café strip | Ep 2 cliff · Ep 3 open · **Ep 2.75 score + dawn** · **Ep 2.76 stroll** | Morning coffee · golden hour date | Daily Life |
| **FLINDERS** | Flinders St Station steps / clocks | Ep 5 tram · **Ep 2.75 meet** · **Ep 2.77 close** | Overcast drama · date meet | Transportation |
| **FED** | Federation Square glass / steps | Ep 5 rain · **Ep 2.6 grief pause** · **match-attune** · nation handoffs | Rain or blue hour | Melbourne Arrival |
| **SOUTH** | Southbank Promenade (Yarra railing) | Ep 4 night · Ep 7 Moon · **Ep 7.1 neon** · **Ep 7.2 return** | Night neon | Emergency Protocol |
| **NERV** | ACMI / Federation neon command pause | **Ep 7.1** Moon-card observe | Night screen glow | Japanese Shadowing |
| **CITADEL** | Federation Citadel portal aesthetic | **Ep 7.2** multiverse SQL index | Night portal neon | Multiverse Shadowing |
| **CABLE** | Interdimensional Cable observe clip | **Ep 7.2** one gag · phone face-down | Interior screen | Tech & Connectivity |
| **CRAFT** | Crafting table meme generator pause | **Ep 7.3** Hipposgrumm parody · humor alchemy | Interior UI glow | GoPro & Content |
| **COLLINS** | Collins St walk (business bustle) | Ep 3 headset gag · Reel A A6 · **Ep 2.78 close** | Day | Social & Cultural |
| **PRINCES** | Princes Bridge (dawn timelapse) | Ep 7 cliffhanger · Ep 8 open | Sunrise | Cultural Sites |
| **BOTANIC** | Royal Botanic Gardens lake path | Ep 8 lantern · **Ep 2.6 Ignan walk** | Sunrise soft | Self-Intimacy |
| **HOTEL** | Accommodation desk / room mirror | Ep 1 ritual · Ep 4 phone · **Ep 2.75 kitchen** · **Ep 2.76 cool-down** | Interior | Accommodation |
| **CINEMA** | Federation Square ACMI lobby / marquee | **Ep 2.64** Bend It Like Beckham rewatch | Evening marquee glow | Cinema Encounters |
| **CANTINA** | Federation lane cantina booth + TV | **Ep 2.65** Mari FIFA watch party | Warm interior · TV replay | Restaurant Dining |
| **STADE** | MCG plaza screen · France lane | **Ep 2.66** Mbappé counter-attack | Night screen burst | French Shadowing |
| **BOCA** | Argentina plaza watch screen | **Ep 2.76** post cook-off playmaker | Post-score golden hour | Argentine Shadowing |
| **SAMBA** | Federation samba burst screen | **Ep 2.77** Vinicus jogo bonito | Night rhythm | Brazilian Shadowing |
| **WEMBLEY** | Federation Three Lions screen · FIFA+ | **Ep 2.78** Kane striker · watch URL | Night cheer | English Shadowing |
| **PUB** | Federation pub pause · captain chant | **Ep 2.78** cheer not rescue | Interior warm | Captain Route |

### One-lane block shoot (Reels A+B + Ep 2/6 same session)

Film in this order to avoid backtracking (~2 hr):

```
DEGRAVES (coffee pickup) → CENTRE (walk rules) → HOSIER (all wides + selfies) → COLLINS (invoice beat optional)
```

---

# EPISODE 1 — 「점화」IGNITION

**Runtime:** 90 sec · **Pins:** HOME → MEL · **Quest:** Pack lantern, name the scam before takeoff  
**Formats:** Webdrama · Trailer tease · TTMIK voiceover clip (30s)

### COLD OPEN
**SHOT:** Selfie, messy room, gym bag open.

**BARD:** "Ignite the Melbourne Lantern Bard."

**TEXT:** `EP.1 · IGNITION`

**BARD:** "Cool. Cool. That's not a personality. That's a *loadout.*"

### SCENE 1 — PACK MONTAGE
**SHOTS:** Fast cuts — GoPro, power bank, adapter, deck of cards, phone.

**BARD (VO):** "Quest items: lantern, boundaries, one laugh minimum per day."

**SYSTEM:** *Ding.* "Someone liked you from 9,000 km away!"

**BARD:** "…Already? I haven't left the house."

**HELEN (VO):** "Compassion includes protecting your peace. Mute."

**BARD:** (taps mute) "Helen's rude. I'm listening."

### SCENE 2 — SCAM FORESHADOW
**SHOT:** Phone screen (actor POV). Fake DM overlay in post.

**SYSTEM / DM:** "Destiny brought us together. I need help with—"

**BARD:** (reading) "—customs fees. Wow. Destiny really hates accounting."

**BARD:** (to camera) "Episode one lesson: if the plot needs your wallet before your name, it's not a meet-cute. It's a *heist.*"

### SCENE 3 — ACTIVATION RITUAL
**SHOT:** Mirror or dark window reflection.

**BARD:** One breath. One laugh.

**BARD:** "I release what no longer serves. I do not dramatize it. I *film* it."

**KOREAN:** **나는 나만의 이야기를 씁니다.** · *I write my own story.*

### CLIFFHANGER
**SHOT:** Airport window. Plane beyond glass.

**BARD:** "Melbourne said yes. My nervous system said loading."

**TEXT:** `NEXT: ARRIVAL TSUNDERE`

**SYSTEM:** "New match nearby."

**BARD:** (deadpan) "I'm not available. I'm *in transit.*"

**TTMIK:** Flame-Kissed Bard shadowing · Ep 1 phrase.

---

# EPISODE 2 — 「도착」ARRIVAL TSUNDERE

**Runtime:** 90 sec · **Pins:** HOSIER (W1,W2,B3,B7,B8) → DEGRAVES (cliffhanger) · **Quest:** Film "not impressed" lie  
**Formats:** Webdrama · **Reel B** (full) · TikTok 15s (B3 only) · TTMIK: Melbourne Arrival

### COLD OPEN
**SHOT:** Wide — stunning alley. Golden hour.

**BARD (arms crossed):** "It's fine. Whatever. I'm not impressed."

**LO3TUS (VO):** "Lie louder. The wall's gorgeous."

### SCENE 1 — KIND OF
**SHOT:** Graffiti close-up.

**BARD (VO):** "…Okay it's *kind of* pretty."

**SHOT:** Snap selfie.

**BARD:** "I said *kind of!* Don't make it weird!"

### SCENE 2 — CONTENT DEPARTMENT
**BARD:** "I'm not here for romance. I'm here for content. Different department. HR said no."

**SHOT:** Mount GoPro on bag.

**BARD:** "오늘 영상 찍을까요… I mean the camera turned on itself. Rude."

### SCENE 3 — 4G > FATE
**BARD:** "If your soulmate texts faster than this alley loads—that's scam, not destiny."

**SHOT:** Picks up paper **RED FLAG #1**. Tosses in bag.

**BARD:** "Inventory: one. Plenty of room. Unfortunately."

### CLIFFHANGER
**SHOT:** Coffee cup. Optional extra smile, no lines.

**BARD:** (not looking) "I'm not blushing. Melbourne humidity is aggressive."

**SYSTEM:** "Match wants to meet today."

**BARD:** "…Episode three's going to be annoying."

**TEXT:** `NEXT: LOVE BOMB SPEEDRUN`

**TTMIK:** Melbourne Arrival · *멜버른 골목이 정말 예뻐요!*

---

# EPISODE 2.5 — 「신성한 통찰 축복」DIVINE INSIGHT BLESSING

**Insert skit** · Tsundere dating · GoPro lantern · tarot-scam PSA  
**Runtime:** 45 sec full · **30s Reels cut** · **Pin:** HOSIER only  
**Quest tie-in:** `side-tarot-scam` · name divine-insight invoice before block  
**Formats:** Standalone Short · Reel A companion · Ep 2 B-roll · TikTok · TTMIK Sync preset **2** (HOSIER · Ep 2 · Reel A)  
**Gear:** Chest-mount GoPro · LED lantern prop · phone SYSTEM overlays · RED FLAG #2 prop  
**Skill:** Melbourne Lantern Bard · **Shadowing:** *유머로 풀어낼게요* · *멜버른 골목이 정말 예뻐요*

**Logline:** Bard insists he's not on a date with the universe. SYSTEM sells a **Divine Insight Blessing** for $49.99. He films the content. He declines the invoice.

**Caption pitch:** *He didn't want a soulmate. He wanted B-roll. The universe sent an invoice anyway.*

---

## Shot-by-shot board (full 45s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio | Export |
|------|------|-----|----------------|-------------------|-------|--------|
| **DIB1** | 0:00 | @HOSIER | GoPro chest POV — mid-lane graffiti drift; lantern bobbing in lower frame | **BARD (VO):** "Day two. Melbourne humidity: aggressive. My interest in destiny: not aggressive." | Street ambience · faint *ding* | Reel A insert · Ep 2.5 · Trailer |
| **DIB2** | 0:03 | @HOSIER | Selfie MCU snap — deadpan to lens, arms optional cross | **BARD:** "It's fine. Whatever. I'm not impressed." | Snap SFX on cut | Reel A · Ep 2 · 30s cut open |
| **DIB3** | 0:06 | @HOSIER | Same selfie — hold; **SYSTEM overlay** (post) slides pink UI over lower third | **SYSTEM:** `✨ New Blessing Available` · `Divine Insight · Soul-Path Reading` · `"The cards saw you in Hosier Lane before you landed."` | UI *whoosh* | Reel A insert · scam PSA |
| **DIB4** | 0:10 | @HOSIER | Bard reads phone, eyes on screen not lens | **BARD:** "…Wow. The cards have GPS. Rude." · **LO3TUS** (yellow cap): `lie louder the wall's gorgeous` | — | Ep 2.5 |
| **DIB5** | 0:14 | @HOSIER | Wide vertical — subject small in alley; golden hour | **BARD:** "I said I'm not blushing. It's the **lantern**. Warm. That's physics. Not fate." | Ambient | Reel B tone · Trailer |
| **DIB6** | 0:18 | @HOSIER | CU — lantern + phone; blessing pop-up reflected in glass / screen | **SYSTEM:** `Unlock Full Divine Insight Blessing` · `$49.99` · `Twin Flame Clarity™ · Curse Buffer · Melbourne Synchronicity Pack` | *Ding* | Reel A · Ep 3 cross-ref |
| **DIB7** | 0:22 | @HOSIER | Selfie MCU — imaginary headset optional | **BARD:** "Thank you for calling Scam Prevention. Press one if they said **soulmate** before **surname**." | — | Reel A A6 echo · Ep 3 |
| **DIB8** | 0:26 | @HOSIER | GoPro mount on bag (match B5); lantern held up — parody oracle, not sincere | **BARD:** "I'm not here for romance. I'm here for **content**. HR said no." · **BARD:** "오늘 영상 찍을까요… I mean the camera turned on itself. Rude." | Mount click | Ep 2 · Ep 6 · TikTok |
| **DIB9** | 0:30 | @HOSIER | Selfie — phone shows loader spinner; lantern under chin (mock reading) | **HELEN** (blue cap): `Compassion includes protecting your peace. Mute.` · **BARD:** "Helen's rude. I'm listening." · *(tap mute)* · **BARD (VO):** "If divine insight texts faster than this alley loads — **scam**, not blessing." · **BARD:** "The only divine insight I need: **4G > fate.**" | Mute tap | Ep 2 scene 3 · tarot audit |
| **DIB10** | 0:34 | @HOSIER | Golden hour selfie — graffiti bokeh; soft then defensive | **BARD:** "멜버른 골목이 정말 예뻐요… I mean the **lane** is pretty. Not you. Not fate. The **lane**." · **BARD:** "…Okay it's *kind of* pretty. Don't make it weird." | — | Reel B B7 · Ep 2 |
| **DIB11** | 0:38 | @HOSIER | Pick up **RED FLAG #2** · toss in bag | **BARD:** "Inventory: two. Plenty of room. Unfortunately for scammers." | Paper rustle | RED FLAG gag · Ep 4 seed |
| **DIB12** | 0:42 | @HOSIER | Wide vertical — walk-off; lantern passes lens; Bard OC | **BARD (VO):** "I don't fund predictions. I don't fund feelings." · **BARD (OC):** "I'll take the blessing where you **block** without an essay. That's sovereign. That's free." · **KOREAN on-screen:** **유머로 풀어낼게요.** · **SYSTEM (fade):** `Your Divine Insight Blessing expired.` · **BARD (OC):** "Good. Expire faster." | Footsteps | Reel A insert end · Short |
| **DIB13** | 0:45 | @HOSIER | End card 2s — black or graffiti freeze | **TEXT:** `DIVINE INSIGHT BLESSING` · `declined · filmed · blocked` · `TTMIK · Melbourne Lantern Bard` | Sting optional | All exports |

---

## 30s Reels cutdown (edit order)

`DIB2@HOSIER → DIB3@HOSIER → DIB4@HOSIER → DIB8@HOSIER → DIB9@HOSIER → DIB10@HOSIER → DIB11@HOSIER → DIB12@HOSIER`

| Time | Shot | Line / beat |
|------|------|-------------|
| 0:00 | DIB2 | "I'm not impressed." |
| 0:03 | DIB3 | "The cards saw you in Hosier Lane." |
| 0:06 | DIB4 | "The cards have GPS. Rude." |
| 0:10 | DIB8 | "Content department. HR said no." |
| 0:15 | DIB9 | "4G > fate." |
| 0:20 | DIB10 | "멜버른 골목이 정말 예뻐요… the **lane**." |
| 0:25 | DIB11 | "Inventory: two." |
| 0:28 | DIB12 | "Expire faster." |

**15s TikTok duet:** DIB10 Korean line only · or DIB9 loader + "4G > fate" punch

---

## On-set checklist (@HOSIER · golden hour)

- [ ] Chest GoPro + bag mount (DIB1, DIB8)
- [ ] LED lantern charged (DIB1, DIB5, DIB9, DIB12 pass)
- [ ] Phone mockups: blessing UI + $49.99 (DIB3, DIB6) — shoot clean plate if post
- [ ] RED FLAG #2 physical prop (DIB11)
- [ ] TTMIK Sync preset **2** → shadowing before wrap
- [ ] Hermes tarot RED FLAG scan: any 2 = abort (see `audit/tarot-scam-avoidance-audit.md`)
- [ ] **After skit:** preset **9** · HOTEL quiet heal — GoPro off before mirror (see below)

**Tags:** `#Tsundere #Melbourne #ScamPSA #4GoverFate #DivineInsightBlessing`

---

## Post-DIB coda — quiet reflection & self-healing

**Insert** · Not performance energy · **45s optional** · **Pin:** HOTEL only (mirror / desk)  
**Quest:** `side-dib-heal` · **Skill:** Helen — Boundary Teacher · **Edit:** `dib-aftercare`  
**TTMIK:** Preset **9** · button **Quiet heal after blessing skit** in Sync panel

**Why:** The blessing skit alchemizes scam energy through humor. The nervous system still needs a landing — without re-watching footage or replying to expired SYSTEM overlays.

**Logline:** Bard puts the GoPro down. Helen asks for one breath. The divine insight stays declined. The peace stays chosen.

### Shot board (`dib-aftercare` · 45s)

| Shot | Time | Pin | Beat |
|------|------|-----|------|
| **HEAL1** | 0:00 | @HOTEL | GoPro off · phone face-down |
| **HEAL2** | 0:08 | @HOTEL | Mirror or window — one breath, one laugh (Hermit Lantern) |
| **HEAL3** | 0:18 | @HOTEL | **HELEN (VO):** "Compassion includes protecting your peace." |
| **HEAL4** | 0:26 | @HOTEL | Whisper **괜찮아요, 괜찮아요** — no re-watch spiral |
| **HEAL5** | 0:35 | @HOTEL | Cord-cut gesture · blessing UI stays `expired` |
| **HEAL6** | 0:41 | @HOTEL | Lantern dim · *I create from flame, not from lack* |

### Self-healing ritual (on set or hotel room)

1. **Pause** — sit before checking takes; humor tended the wound, you do not owe the algorithm proof
2. **Name** — what the skit released (urgency, soulmate push, invoice shame) without dramatizing
3. **Boundary phrase** — 죄송하지만 지금은 어려워요 or 괜찮아요, 괜찮아요
4. **Cord-cut** — "I choose my own timeline and energy field"
5. **Close** — log `side-dib-heal` · optional Veil Lumen soft cut · return to Lane A at 09:45 COLLINS or rest

**Morning block insert:** `09:30 HOTEL` between Hosier DIB (09:00) and Collins optional beat.

**Tags:** `#SelfHealing #PostSkit #HelenBoundary #QuietReflection`

---

# EPISODE 2.6 — 「치유의 걸음」IGNAN HEALING WALK

**Guest episode** · Trilingual self-healing · Mari (Ignan / Ilokano native)  
**Runtime:** 90 sec · **Pins:** HOTEL (ask/consent) → FED (optional rain) → BOTANIC (lake path)  
**Quest:** `side-ignan-heal` · **Skill:** `ignan-pilgrim` · **Edit:** `ignan-healing-journey` · **Preset:** **10**  
**Boot:** `TTMIK.html?ignan=1` · **Lane C** after post-DIB preset 9

**Logline:** After the blessing skit lands, Mari — an Ignan native — asks Bard for one thing: film the walk, not the wound. Three languages, one path, zero performance invoice.

**Caption pitch:** *Ok laeng. 괜찮아요. My own dalan.*

**TTMIK team note:** Korean lines are practice targets; Ilokano lines are Mari's grounding — honor both, don't collapse into one subtitle joke.

---

## Character · MARI

| Field | Detail |
|-------|--------|
| **Name** | Mari (she/her) |
| **Heritage** | Ignan — Ilokano-speaking; Ilocos homeland in VO memory only |
| **Want** | A sovereign healing walk; Korean practice with TTMIK; no rescue |
| **Fear** | Becoming content about diaspora pain |
| **Tell** | Touches rain glass before she speaks; walks ahead of Bard |
| **Arc** | Carried shame → named once → released in three languages |

---

## Shot-by-shot board (90s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **IG1** | 0:00 | @HOTEL | Mari at door; Bard with bag GoPro | **MARI:** "Film the walk. Not the wound." · **BARD:** "…Copy." | Door close |
| **IG2** | 0:08 | @HOTEL | Two-shot — consent | **MARI:** "If I say stop, you stop." · **BARD:** "HR approves." · **HELEN (VO):** "Consent is compassion." | — |
| **IG3** | 0:15 | @FED | Rain on glass; Mari reflection CU optional | **MARI (Ilokano):** "Ditoy ko pinangged ti balay… no diak ibaga iti drama." · **TEXT:** *I miss home — I won't sell the missing.* | Rain |
| **IG4** | 0:27 | @BOTANIC | Wide — lake path; Mari leads | **BARD (VO):** "Episode 2.6 lesson: healing isn't a rescue mission. It's a path you choose." | Birds / soft |
| **IG5** | 0:37 | @BOTANIC | Medium — Mari to lake, not lens | **MARI:** "Ok laeng, ok laeng." · **TEXT:** Ilokano · *It's okay* | — |
| **IG6** | 0:47 | @BOTANIC | Same — Korean practice beat | **MARI:** "괜찮아요, 괜찮아요." · **BARD (whisper):** "TTMIK team: that's the one." | — |
| **IG7** | 0:57 | @BOTANIC | Walk continues — English anchor | **MARI:** "I choose my own timeline." · **MARI (Ilokano):** "Piliem ti bukodko a dalan." | Footsteps |
| **IG8** | 1:07 | @BOTANIC | Wide hold — breath | **MARI:** "Maysa nga anges, maysa a talna." · **TEXT:** `IGNAN HEALING WALK` · `side-ignan-heal` | Ambient fade |

---

## Trilingual shadowing deck (TTMIK team)

| Ilokano (Ignan) | Korean (TTMIK) | English |
|-----------------|----------------|---------|
| Ok laeng, ok laeng. | 괜찮아요, 괜찮아요. | It's okay, it's okay. |
| Nasaem met ti aginana. | 잠시 쉬어도 괜찮아요. | It's okay to pause and breathe. |
| Piliem ti bukodko a dalan. | 제 길을 믿어요. | Choose your own path. |
| Maysa nga anges, maysa a talna. | 나는 나만의 이야기를 씁니다. | One breath, one peace. |

---

## Lane C route card (after post-DIB)

```
09:30  HOTEL — preset 9 · ask Mari if she wants the walk
10:00  FED — optional rain grief beat (IG3)
10:30  BOTANIC — Ep 2.6 full walk · preset 10
```

**On-set:** Mari leads pace · GoPro on Bard's bag only · no soulmate/subscriber CTAs · log `side-ignan-heal` at IG8

**Tags:** `#Ignan #Ilokano #SelfHealing #Trilingual #BukodkoADalan #MelbourneLantern`

---

# EPISODE 2.65 — 「축하」MARI FIFA CANTINA

**Joy insert** · Mexican restaurant watch party · Mari (Ignan native)  
**Runtime:** 60 sec · **Pin:** CANTINA (Federation lane cantina)  
**Quest:** `side-fifa-celebrate` · **Skill:** `ignan-pilgrim` · **Edit:** `mari-fifa-celebration` · **Preset:** **12**  
**Boot:** `TTMIK.html?fifa=1` · **Lane D** after Ep 2.6 BOTANIC walk (same evening optional) · preceded by **match-attune** at `18:15 FED`

**Logline:** After the healing walk, Mari asks for one normal thing: tacos, a FIFA replay, and permission to be happy in her own tongue. Bard films the toast, not the tears.

**Caption pitch:** *Naragsak unay. ¡Salud! 맛있어요.*

**TTMIK team note:** Ilokano leads every cheer — Spanish is cantina ambiance, Korean is practice, English is anchor. No performance invoice.

| Ilokano (native) | Spanish (cantina) | Korean (TTMIK) | English |
|------------------|-------------------|----------------|---------|
| Naragsak unay! Ok laeng, agnanayon. | ¡Salud! ¡Qué buen partido! | 맛있어요! 축하해요! | So happy — cheers to the game. |
| Naragsak ti pusok — saan a drama. | ¡Gol! ¡Buen provecho! | 정말 재미있었어요! | Joy in my chest — not for the algorithm. |

### Shot-by-shot board (60s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **FC1** | 0:00 | @CANTINA | Mari leads to booth; Bard with bag GoPro | **MARI:** "Celebration okay?" · **BARD:** "Your table. My half." | Cantina ambient |
| **FC2** | 0:08 | @CANTINA | TV FIFA replay — phones face-down | **BARD (VO):** "Episode 2.65 lesson: joy isn't content unless you invoice it." | Replay audio low |
| **FC3** | 0:18 | @CANTINA | Medium — Mari to friends, not lens | **MARI (Ilokano):** "Naragsak unay! Ok laeng, agnanayon." | — |
| **FC4** | 0:30 | @CANTINA | Toast montage — guac + cups | **MARI:** "¡Salud!" · **BARD:** "맛있어요! 축하해요!" | Clink |
| **FC5** | 0:42 | @CANTINA | Goal replay — one cheer only | **MARI:** "Naragsak ti pusok — saan a drama." · **TEXT:** `side-fifa-celebrate` | Crowd swell |
| **FC6** | 0:52 | @CANTINA | Wide hold — booth warmth | **BARD (whisper):** "Not a rescue. A replay." · **TEXT:** `NEXT: CINEMA · STADE` | Fade |

**On-set:** Mari picks the booth · TV replay only · GoPro on bag · log `side-fifa-celebrate` at close

**Tags:** `#Ignan #FIFA #Mari #Cantina #Naragsak #NativeTongue`

---

## Pre-Match Attune — Federation pause

**Ritual insert** · Before any nation lane or FIFA+ watch · not performance energy  
**Runtime:** 60 sec · **Pin:** FED only (glass / steps)  
**Quest:** `side-fifa-celebrate` · **Skill:** Melbourne Lantern Bard · **Edit:** `match-attune-ritual` · **Healing factor:** `match-attune`  
**Boot:** `TTMIK.html?attune=1` · `TTMIK.html?heal-factor=match-attune` · Lane boots: `?attune=1&lane=kane` · `?kane=1&attune=1&watch=1`

**Logline:** Before the cheer, Bard puts the phone face-down. One breath. One lane. No performance invoice — whether the screen is Wembley, Samba, or a cantina replay.

**Caption pitch:** *응원 전에 한 숨. One breath before the cheer.*

### Shot board (`match-attune-ritual` · 60s)

| Shot | Time | Pin | Beat |
|------|------|-----|------|
| **AT1** | 0:00 | @FED | Federation Square pause — phone face-down · GoPro off |
| **AT2** | 0:08 | @FED | **BARD:** "One breath before the cheer." |
| **AT3** | 0:16 | @FED | Korean shadow · **응원 전에 한 숨** |
| **AT4** | 0:24 | @FED | Attune: I cheer my way — no drama · **내 방식으로 응원해요 — 드라마 없이** |
| **AT5** | 0:34 | @FED | Open lane when ready — Kane · Vinicus · Messi · Mbappé · Ronaldo · Mari FIFA |
| **AT6** | 0:42 | @FED | Handoff to nation screen or FIFA+ watch — no re-watch spiral |

### Attune ritual (on set)

1. **Pause** — phone face-down · GoPro off · one breath
2. **Name** — cheer is joy, not rescue; no soulmate CTAs on the replay
3. **Shadow** — 응원 전에 한 숨 · 잠시 쉬어도 괜찮아요
4. **Open lane** — preset 16–20 or `openKaneFifaWatch()` when WEMBLEY ready
5. **Close** — log `side-fifa-celebrate` · walk lighter

**Lane D opener:** `18:15 FED` before CINEMA · **Lane B Kane handoff:** `19:55 FED` before WEMBLEY

**Tags:** `#MatchAttune #FederationPause #PreMatch #NoPerformanceInvoice`

---

# EPISODE 2.64 — 「영화관」CINEMA ENCOUNTER

**Fast insert** · Bend It Like Beckham rewatch · English fan meet · Ronaldo Portugal handoff  
**Runtime:** 30 sec · **Pins:** CINEMA (ACMI lobby) → FED (walk out)  
**Quest:** `side-fifa-celebrate` · **Skill:** `ronaldo-portugal-glory` · **Edit:** `bend-it-beckham` · **Preset:** **16**  
**Boot:** `TTMIK.html?ronaldo=1` · **Character:** English fan (guest)

**Logline:** At the ACMI rewatch, an English fan spots Bard's football shirt and quotes Beckham. Bard answers in Portuguese first, Korean second — freedom on the pitch, freedom from drama off it.

**Caption pitch:** *Bend it your way. Cheer it your way.*

**TTMIK team note:** English fan leads the meet-cute energy; Portuguese is Bard's native-lane reply; Korean is practice. Not a date — a handoff to cantina.

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **BI1** | 0:00 | @CINEMA | Lobby — fan spots shirt | **FAN:** "You play?" · **BARD:** "I film. Sometimes both." | Lobby murmur |
| **BI2** | 0:05 | @CINEMA | Marquee — *Bend It Like Beckham* rewatch night | **TEXT:** `REWIND NIGHT` | — |
| **BI3** | 0:09 | @CINEMA | Two-shot — fan grin, Bard deadpan | **FAN:** "Bend it like Beckham? Cheer it your way." | — |
| **BI4** | 0:17 | @CINEMA | Bard to camera — trilingual stack | **BARD (PT):** "Dobrá-lo como o Beckham? Celebramos à nossa maneira." · **BARD (KO):** "베컴처럼? 내 방식으로 응원해요 — 드라마 없이." | — |
| **BI5** | 0:25 | @FED | Walk out — Federation lights | **BARD:** "Good film. See you at the match." · **TEXT:** `NEXT: CANTINA` | Night air |

### Trilingual shadowing deck

| English (fan) | Portuguese (Bard) | Korean (TTMIK) |
|---------------|---------------------|----------------|
| Bend it like Beckham? Cheer it your way. | Dobrá-lo como o Beckham? Celebramos à nossa maneira. | 베컴처럼? 내 방식으로 응원해요 — 드라마 없이. |
| Anyone can play. Anyone can choose their path. | Qualquer um pode jogar. Qualquer um escolhe o seu caminho. | 누구나 할 수 있어요. 누구나 자기 길을 고를 수 있어요. |
| Good film. Good night. See you at the match. | Bom filme. Boa noite. Vemo-nos no jogo. | 좋은 영화. 좋은 밤. 경기장에서 봐요. |

**On-set:** Fast scene 30s · English fan first · handoff to CANTINA preset 12 · log `side-fifa-celebrate`

**Tags:** `#BendItLikeBeckham #CinemaEncounter #Ronaldo #EnglishFan #NoDrama`

---

# EPISODE 2.66 — 「역습」FRANCE COUNTER-ATTACK

**Fast insert** · MCG plaza screen · Mbappé burst ritual · post-cantina France lane  
**Runtime:** 30 sec · **Pins:** STADE (plaza screen) → FED (sprint out)  
**Quest:** `side-fifa-celebrate` · **Skill:** `mbappe-france-attack` · **Edit:** `mbappe-counter-attack` · **Preset:** **17**  
**Boot:** `TTMIK.html?mbappe=1` · **Character:** Mbappé (muse · Fast Character Battle Master Fighter)

**Logline:** After the cantina cheer, the plaza screen freezes on a counter-attack. Bard doesn't narrate rescue — he names speed without performance debt, then sprints out lighter.

**Caption pitch:** *J'attaque à ma manière. But! Allez les Bleus!*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **MB1** | 0:00 | @STADE | Plaza screen — counter lane opens | **BARD (VO):** "Episode 2.66 lesson: burst isn't rescue if you don't invoice the adrenaline." | Replay swell |
| **MB2** | 0:05 | @STADE | Freeze-frame — Mbappé silhouette | **TEXT:** `BURST NOT RESCUE` | Horn sting |
| **MB3** | 0:09 | @STADE | Bard to screen — French native first | **BARD (FR):** "J'attaque à ma manière — sans drame." | — |
| **MB4** | 0:17 | @STADE | Korean shadow — cheer | **BARD:** "골! 프랑스 파이팅!" · **TEXT:** `But! Allez les Bleus!` | — |
| **MB5** | 0:25 | @FED | Sprint out — lighter walk | **BARD:** "No performance invoice." · **TEXT:** `side-fifa-celebrate` | Footsteps |

### Trilingual shadowing deck

| French (native) | Korean (TTMIK) | English |
|-----------------|----------------|---------|
| J'attaque à ma manière — sans drame. | 내 방식으로 공격해요 — 드라마 없이. | I attack my way — no drama. |
| But! Allez les Bleus! | 골! 프랑스 파이팅! | Goal! Go France! |
| Je fonce et j'avance. | 돌진하고 앞으로 나아갈게요. | I sprint and move forward. |

**On-set:** Preset 17 · phones face-down except one cheer · log `side-fifa-celebrate` at MB5

**Tags:** `#Mbappe #France #CounterAttack #Stade #AllezLesBleus`

---

## Lane D route card (FIFA celebration evening)

```
18:15  FED — match-attune · ?attune=1 · phone face-down
18:30  CINEMA — Ep 2.64 Bend It Like Beckham · preset 16
19:00  CANTINA — Mari meet · booth consent
19:15  CANTINA — Ep 2.65 full cantina · preset 12
20:00  CANTINA — Portugal cheer · Gol! Força Portugal! · preset 16
20:15  STADE — Ep 2.66 Mbappé counter-attack · preset 17
```

**On-set:** Mari leads cantina · Bard pays his half · attune before every screen burst · no soulmate CTAs on replay

---

# EPISODE 2.75 — 「요리대결」COOK-OFF NOT A DATE

**Insert episode** · Sovereign friend date · lets-cook sync · girls-love Ch.1 pickup  
**Runtime:** 90 sec · **Pins:** FLINDERS (meet) → DEGRAVES (outing + score) → HOTEL (kitchen)  
**Quest tie-in:** `main-others` · practice "It's okay to not be like the others" at the score table  
**Formats:** `date-night-cookoff` · lets-cook `/date-night` · TTMIK Sync presets **6–7**  
**Gear:** GoPro on bag (plating only with consent) · scorecards · flat whites · no love-bomb timer  
**Skill:** Melbourne Lantern Bard · **Shadowing:** *멜버른 골목이 정말 예뻐요* · host line: *This is NOT a date. It's a cook-off.*

**Logline:** Bard takes the girls out for a Degraves ingredient run and a 45-minute kitchen war. Helen disqualifies love-bomb seasoning. Someone wins. Everyone does dishes anyway.

**Caption pitch:** *Hydration, not romance. Court order.*

---

## Shot-by-shot board (90s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Export |
|------|------|-----|----------------|-------------------|--------|
| **DN1** | 0:00 | @FLINDERS | Wide — Flinders Lane end meet; golden hour | **BARD:** "This is not a date. It's a cook-off. HR is watching." | `date-night-cookoff` open |
| **DN2** | 0:08 | @DEGRAVES | Walk-through — silly ingredient picks | **LO3TUS:** "What if we exaggerated that ×3." · **BARD:** "Fifteen minutes. Cap. Go." | lets-cook outing phase |
| **DN3** | 0:20 | @DEGRAVES | Flat white handoff — to-go cups | **BARD:** "Hydration. Not romance." · **HELEN (VO):** "Compassion includes saying no to seconds." | Reel B tone |
| **DN4** | 0:30 | @HOTEL | Kitchen wide — stations · timer on phone | **BARD:** "Forty-five minutes. 4G > fate." · **SYSTEM:** *(muted)* | Preset **7** |
| **DN5** | 0:55 | @HOTEL | Plating montage — four dishes | **ASUKA:** "Maybe-Yes Lemon Posset." · **RACH3L:** "Phones face-down for toast." | girls-love Ch.1 seed |
| **DN6** | 1:10 | @DEGRAVES | Score table — Bard deadpan judge | **BARD:** "Boundaries category mandatory. Seven acceptable lack of soulmate declarations." | Cook-off results |
| **DN7** | 1:22 | @HOTEL | Dishes in sink — warm light | **BARD (VO):** "The date part was never the competition. It was who stayed." · **TEXT:** `NOT A DATE · BLOCK INVOICERS` | girls-love Ch.1 |

---

## After the Date — dawn insert (60s · preset **8**)

| Shot | Time | Pin | Beat |
|------|------|-----|------|
| **AT1** | 0:00 | @DEGRAVES | 6:12 AM pastry boxes — no GoPro |
| **AT2** | 0:10 | @FLINDERS | Flinders Lane end — where it started |
| **AT3** | 0:18 | @DEGRAVES | Croissant treaty — "breakfast tax for beating me on chaos" |
| **AT5** | 0:40 | @DEGRAVES | *멜버른 골목이 정말 예뻐요* — morning edition |

**Edit order:** `after-the-date` · girls-love Ch.2 · Veil Lumen soft cut

**Tags:** `#CookOffNotADate #Degraves #SovereignDate #MelbourneLantern`

---

# EPISODE 2.76 — 「플레이메이커」MESSI ARGENTINA

**Fast insert** · Post cook-off playmaker lane · lets-cook / girls-love handoff  
**Runtime:** 30 sec · **Pins:** HOTEL (cool-down) → DEGRAVES (stroll) → BOCA (Argentina screen)  
**Quest:** `side-humor` · **Skill:** `messi-argentina-playmaker` · **Edit:** `messi-after-cookoff` · **Preset:** **18**  
**Boot:** `TTMIK.html?messi=1` · **Character:** Messi (muse · Fast Character Mastermind Rogue)

**Logline:** Plates down, SYSTEM muted. Bard strolls Degraves with an Argentina highlight reel and names the playmaker rule: joy without a performance invoice — not a date, not a rescue.

**Caption pitch:** *Juego a mi manera. ¡Vamos Argentina!*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **MS1** | 0:00 | @HOTEL | Kitchen cool-down — plates down | **BARD:** "Cook-off closed. Hearts loud. Wallet quiet." · **SYSTEM:** *(muted)* | Sink clink |
| **MS2** | 0:05 | @DEGRAVES | Stroll — phone highlight reel | **BARD (VO):** "Episode 2.76 lesson: the pass matters more than the plot twist." | Street ambient |
| **MS3** | 0:09 | @BOCA | Plaza screen — Argentina lane | **BARD (ES):** "Juego a mi manera — sin drama." | Replay low |
| **MS4** | 0:17 | @BOCA | Korean shadow — cheer | **BARD:** "골! 아르헨티나 파이팅!" · **TEXT:** `¡Gol! ¡Vamos Argentina!` | — |
| **MS5** | 0:25 | @BOCA | Wide hold — lighter walk | **BARD:** "Not a date. A lane." · **TEXT:** `NEXT: SAMBA` | Fade |

### Trilingual shadowing deck

| Spanish (native) | Korean (TTMIK) | English |
|------------------|----------------|---------|
| Juego a mi manera — sin drama. | 내 방식으로 플레이해요 — 드라마 없이. | I play my way — no drama. |
| ¡Gol! ¡Vamos Argentina! | 골! 아르헨티나 파이팅! | Goal! Go Argentina! |
| Juego y sigo adelante. | 플레이하고 앞으로 나아갈게요. | I play and move forward. |

**On-set:** After Ep 2.75 score · preset 18 · handoff to SAMBA 19:45 · log `side-humor`

**Tags:** `#Messi #Argentina #LaBoca #Playmaker #PostCookOff`

---

# EPISODE 2.77 — 「삼바」VINICUS BRASIL

**Fast insert** · Federation samba burst · post-Argentina jogo bonito lane  
**Runtime:** 30 sec · **Pins:** SAMBA (screen) → FED (pause) → FLINDERS (stroll home)  
**Quest:** `side-fifa-celebrate` · **Skill:** `vinicus-brasil-samba` · **Edit:** `vinicus-brasil-samba` · **Preset:** **19**  
**Boot:** `TTMIK.html?vinicus=1` · **Character:** Vinicus (muse · Fast Character Open Hand Monk)

**Logline:** After La Boca, the Federation screen switches to Brasil highlights. Bard lets the samba rhythm land — jogo bonito without selling the joy to the algorithm.

**Caption pitch:** *Jogo do meu jeito. Gol! Vai Brasil!*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **VN1** | 0:00 | @SAMBA | Federation screen — Brasil after La Boca | **BARD (VO):** "Episode 2.77 lesson: rhythm isn't romance if nobody invoices the hips." | Samba swell |
| **VN2** | 0:05 | @SAMBA | Burst — jogo bonito framing | **TEXT:** `JOGO BONITO NOT RESCUE` | Drum hit |
| **VN3** | 0:09 | @SAMBA | Bard to screen — Portuguese native | **BARD (PT):** "Jogo do meu jeito — sem drama." | — |
| **VN4** | 0:17 | @SAMBA | Korean shadow — cheer | **BARD:** "골! 브라질 파이팅!" · **TEXT:** `Gol! Vai Brasil!` | — |
| **VN5** | 0:25 | @FED | Square pause — lighter walk | **BARD:** "One beat. No invoice." · **TEXT:** `NEXT: ATTUNE → WEMBLEY` | Night air |

### Trilingual shadowing deck

| Portuguese (native) | Korean (TTMIK) | English |
|---------------------|----------------|---------|
| Jogo do meu jeito — sem drama. | 내 방식으로 플레이해요 — 드라마 없이. | I play my way — no drama. |
| Gol! Vai Brasil! | 골! 브라질 파이팅! | Goal! Go Brazil! |
| Danço e sigo em frente. | 춤추고 앞으로 나아갈게요. | I dance and move forward. |

**On-set:** Preset 19 · phones face-down except one cheer · attune at 19:55 FED before Kane lane

**Tags:** `#Vinicus #Brasil #Samba #JogoBonito #FIFA`

---

# EPISODE 2.78 — 「스트라이커」HARRY KANE ENGLAND

**Fast insert** · Three Lions striker lane · FIFA+ watch · post-Brasil captain cheer  
**Runtime:** 30 sec · **Pins:** WEMBLEY (screen) → PUB (chant pause) → COLLINS (walk home)  
**Quest:** `side-fifa-celebrate` · **Skill:** `harry-kane-england-striker` · **Edit:** `harry-kane-england-striker` · **Preset:** **20**  
**Boot:** `TTMIK.html?kane=1` · `TTMIK.html?kane=1&watch=1` · `TTMIK.html?kane=1&attune=1&watch=1`  
**Watch URL:** `https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw` · **Character:** Kane (muse · Fast Character Champion Fighter)

**Logline:** After attune at Federation Square, Bard opens FIFA+ on the Wembley screen. One clinical cheer — captain energy without rescue framing — then pub pause and Collins stroll home lighter.

**Caption pitch:** *I strike my way. Goal! Come on England!*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **HK1** | 0:00 | @WEMBLEY | FIFA+ watch — `fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw` | **BARD (VO):** "Attune done. One cheer. Not a season finale." | Watch audio low |
| **HK2** | 0:05 | @WEMBLEY | Three Lions burst — captain framing | **TEXT:** `CAPTAIN NOT RESCUE` | Crowd swell |
| **HK3** | 0:09 | @WEMBLEY | Bard to screen — English native | **BARD:** "I strike my way — no drama." | — |
| **HK4** | 0:17 | @WEMBLEY | Korean shadow — cheer | **BARD:** "골! 잉글랜드 파이팅!" · **TEXT:** `Goal! Come on England!` | — |
| **HK5** | 0:25 | @PUB | Pub pause — chant not invoice | **BARD:** "One breath. One chant." · **TEXT:** `side-fifa-celebrate` | Pub murmur |

### Trilingual shadowing deck

| English (native) | Korean (TTMIK) | Notes |
|------------------|----------------|-------|
| I strike my way — no drama. | 내 방식으로 득점해요 — 드라마 없이. | Wembley screen · preset 20 |
| Goal! Come on England! | 골! 잉글랜드 파이팅! | One cheer after attune |
| I score and move forward. | 득점하고 앞으로 나아갈게요. | Collins close optional |

### FIFA+ watch ritual

1. **Attune** — `19:55 FED` · `?attune=1&lane=kane` · phone face-down first
2. **Open watch** — `openKaneFifaWatch()` or `?kane=1&watch=1`
3. **One cheer** — English native → Korean shadow · phones down except toast moment
4. **Pub pause** — captain chant without performance debt
5. **Close** — Collins stroll · log `side-fifa-celebrate` · dawn croissant at 06:12 optional

**On-set:** Preset 20 · WEMBLEY screen · PUB warm interior · no soulmate CTAs on replay

**Tags:** `#HarryKane #England #ThreeLions #Wembley #FIFAPlus #CaptainNotRescue`

---

## Lane B extended evening (FIFA nation close)

```
17:00  FLINDERS — Ep 2.75 meet (DN1)
17:20  DEGRAVES — outing + flat white (DN2–DN3)
18:15  HOTEL — kitchen 45 min (DN4–DN5)
19:15  DEGRAVES — score + eat (DN6) · dishes @ HOTEL (DN7)
19:30  BOCA — Ep 2.76 Messi Argentina · preset 18
19:45  SAMBA — Ep 2.77 Vinicus Brasil · preset 19
19:55  FED — match-attune · ?attune=1&lane=kane
20:00  WEMBLEY — Ep 2.78 Kane · FIFA+ watch · preset 20
20:10  PUB — captain chant pause · COLLINS stroll home
06:12  DEGRAVES — dawn croissant (AT1–AT6)
```

---

# EPISODE 3 — 「러브폭탄」LOVE BOMB SPEEDRUN

**Runtime:** 90 sec · **Pins:** CENTRE (A4 walk) → COLLINS (A6 invoice) → DEGRAVES (cold open HUD) · **Quest:** Abort scam speedrun  
**Formats:** Webdrama · **Reel A** (rules montage) · Short 60s · TTMIK: Daily Life + Social & Cultural

### COLD OPEN
**TEXT:** `ROMANCE SCAM SPEEDRUN · ANY%`

**BARD (gamer VO):** "Runner: Me. Category: Don't."

### SCENE 1 — RULE MONTAGE
**SHOT:** Walk-and-talk, captions slam in.

| Rule | Line |
|------|------|
| 1 | "Love bomb at 2am = push notification with attachment issues." |
| 2 | "Emergency always money, never 'how was your laneway?' = *invoicing.*" |
| 3 | "You're not a rescue mission. You're a *pilgrimage.*" |

**BARD:** "I'm not cynical. I'm budgeting tenderness."

### SCENE 2 — CUSTOMER SUPPORT
**SHOT:** Bard with imaginary headset.

**BARD / SYSTEM:** "Thank you for calling Scam Prevention. Press 1 if they said soulmate before surname."

**BARD:** "Press 4 to return to sovereign mode."

**KOREAN:** **유머로 풀어낼게요.** · *I release it through humor.*

### CLIFFHANGER
**SHOT:** Phone buzzes. Unknown number.

**SYSTEM:** "Urgent: please verify your heart."

**BARD:** "…That's not how hearts work."

**HELEN (VO):** "Block is a love language."

**BARD:** "Episode four. Helen's bringing scissors."

**TEXT:** `NEXT: HELEN INTERVENTION`

---

# EPISODE 4 — 「경계」HELEN INTERVENTION

**Runtime:** 90 sec · **Pins:** HOTEL (phone scenes) → SOUTH (night cord-cut) · **Quest:** Boundary mastery  
**Formats:** Webdrama · Reel clip (Helen VO only · 20s) · TTMIK: Emergency Protocol

### COLD OPEN
**SHOT:** Night laneway. Bard tired but wired.

**HELEN (VO):** "Compassion includes protecting your peace. Repeat."

**BARD:** "Delete, release, ground. …Happy?"

### SCENE 1 — NEIGHBOR ENERGY
**SHOT:** Phone — old dynamics surface (blur names).

**BARD:** "Someone from the old timeline liked my story."

**HELEN:** "You don't owe a resurrection arc."

**BARD:** "But what if they changed—"

**HELEN:** "What if you changed *and* kept your boundaries?"

### SCENE 2 — CORD-CUT RITUAL
**SHOT:** Hands open, exhale in cold air.

**BARD:** "I choose my own timeline and energy field."

**SHOT:** Tosses **RED FLAGS #2–#4** into bin.

**BARD:** "Inventory full. Shop closed."

**KOREAN:** **죄송하지만 지금은 어려워요.** · *Sorry, not possible right now.*

### SCENE 3 — SKIT WITHIN LIFE
**BARD:** (to camera) "Turns out real life already wrote the skit. I just added captions."

### CLIFFHANGER
**TEXT — ASUKA:** "Brisbane still has a seat if you change your mind."

**BARD:** (stares) "…Episode five. The beautiful maybe."

**TEXT:** `NEXT: THE MAYBE`

**TTMIK:** Emergency Protocol · Helen phrases

---

# EPISODE 5 — 「아마도」THE MAYBE

**Runtime:** 90 sec · **Pins:** FED (rain glass) → FLINDERS (tram monologue) → HOSIER (clear-weather cliff) · **Quest:** Melbourne is my yes  
**Formats:** Webdrama · Veil Lumen mood piece (45s silent+BARD VO) · TTMIK: Transportation

### COLD OPEN
**SHOT:** Rain on window. City lights.

**ASUKA (TEXT):** "It could've been nice."

**BARD (VO):** "Brisbane was a beautiful maybe."

### SCENE 1 — TRAM MONOLOGUE
**BARD:** "I almost extended the trip for a connection. Almost is a whole genre."

**SHOT:** Reflection in glass — only his face.

**BARD:** "Melbourne is my yes. Not because Brisbane failed. Because *I* chose."

### SCENE 2 — LO3TUS CHAOS
**LO3TUS (VO):** "What if the maybe texts again?"

**BARD:** "What if I don't answer like it's a season finale?"

**LO3TUS:** "Radical."

**KOREAN:** **멜버른이 제 선택이에요.** · *Melbourne is my choice.*

### SCENE 3 — RELEASE
**TEXT overlay — BARD typed:** "Wishing you well. I'm on my path."

**BARD:** **아름다운 "만약에"도 놓을 수 있어요.**

### CLIFFHANGER
**SHOT:** Clears weather. Laneway glows.

**BARD:** "Episode six. We actually make the skit."

**GoPro POV clicks ON.**

**TEXT:** `NEXT: ACTION!`

---

# EPISODE 6 — 「촬영」ACTION!

**Runtime:** 90 sec · **Pins:** HOSIER (Reel A+B reshoot + bloopers) · **Quest:** Main quest skit filmed  
**Formats:** Webdrama meta · **Reel A + Reel B** master exports · TikTok blooper cut · TTMIK: GoPro & Content

### COLD OPEN
**SHOT:** Slate clap (hand chop).

**BARD:** "Episode six is Episode two and three's child. Tsundere scam baby."

### SCENE 1 — DOUBLE SHOOT
Intercut **Reel B** (not impressed → kind of → HR said no) then **Reel A** (rules → not blushing → sovereign).

**BARD:** "I'm not enjoying this."

**CREW (also Bard):** "You smiled."

**BARD:** "Wind."

### SCENE 2 — BLOOPERS
**SHOT:** Tripod fall. Battery low warning.

**BARD:** "Quest item: power bank. Quest enemy: hubris."

**LO3TUS:** "Keep the blooper. Chaotic neutral gold."

### SCENE 3 — WRAP
**BARD:** "Main quest checkbox: one humorous skit. …Technically four. We're overachieving."

**KOREAN:** **웃음으로 놓아줄게요.** · *I let go with laughter.*

**TEXT:** `NEXT: THE MOON CARD`

---

# EPISODE 7 — 「달」THE MOON CARD

**Runtime:** 90 sec · **Pins:** SOUTH (scroll trigger) → FLINDERS (tram stop night) → PRINCES (dawn cliff) · **Quest:** Humor integration  
**Formats:** Webdrama · Veil Lumen essay seed (notes monologue) · TTMIK: Tech & Connectivity

### COLD OPEN
**SHOT:** Low battery %. Optional 4:44 timestamp.

**BARD:** "The Moon card. Confusion. Old fears in new cities."

### SCENE 1 — TRIGGER
**SHOT:** Scroll temptation — don't show faces.

**BARD:** "Almost checked something I shouldn't."

**RACH3L (VO):** "Observe. Do not absorb."

**BARD:** "This is not my energy to carry."

### SCENE 2 — ALCHEMY
**SHOT:** Bard writes in phone notes.

**BARD:** "Scene idea: man argues with his own notification settings. …That's just documentary."

**LO3TUS:** "Then add a tsundere graffito."

### SCENE 3 — FUEL
**BARD:** "Side quest complete. Frustration → footage."

**KOREAN:** **제 길을 믿어요.** · *I trust my path.*

### CLIFFHANGER
**SHOT:** Dawn timelapse first frame.

**BARD:** (whisper) "Last episode. Don't make it sentimental."

**TEXT:** `NEXT: THE WORLD`

**Optional Lane E inserts (same evening · after Ep 7 main unit):** Ep 7.1 NERV neon (preset 21) → Ep 7.2 Citadel multiverse SQL (preset 22). Boot: `TTMIK.html?neon=1` · `TTMIK.html?rickmorty=1` · `TTMIK.html?heal-factor=multiverse-query`

---

# EPISODE 7.1 — 「ネオン」NEON EVANGELION MOON

**Fast insert** · NERV observe lane · post-Moon-card scroll trigger · Japanese native + Korean shadow  
**Runtime:** 30 sec · **Pins:** NERV (command pause) → SOUTH (neon railing) → FLINDERS (tram close)  
**Quest:** `side-humor` · **Skill:** `neon-evangelion` · **Edit:** `rei-mercy-ritual` · **Preset:** **21**  
**Boot:** `TTMIK.html?neon=1` · `TTMIK.html?rei=1` · `TTMIK.html?heal-factor=rei-mercy`  
**Character:** Rei muse · Fast Character Monk (Way of Mercy)

**Logline:** After the Moon-card scroll temptation, Bard pauses at NERV command aesthetic. One Rei mercy line — observe without absorbing — then Southbank neon boundary and lighter tram walk.

**Caption pitch:** *Observe only. Neon is my boundary.*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **NE1** | 0:00 | @NERV | Command pause — phone face-down | **BARD (VO):** "Episode 7.1 lesson: confusion is a passage point." | Neon hum |
| **NE2** | 0:05 | @NERV | Japanese native — observe line | **BARD (JA):** "観測するだけ。吸収しない。" | — |
| **NE3** | 0:13 | @SOUTH | Yarra railing neon | **TEXT:** `OBSERVE NOT ABSORB` | Night air |
| **NE4** | 0:19 | @SOUTH | Korean shadow | **BARD:** "관찰만 하고 흡수하지 않을게요." | — |
| **NE5** | 0:27 | @FLINDERS | Tram stop — lighter walk | **BARD:** "One breath. My path." · **TEXT:** `preset 21` | Tram murmur |

**On-set:** Preset 21 · `installNeonEvangelionLook()` optional · no scroll spiral

**Tags:** `#NeonEvangelion #NERV #MoonCard #ObserveNotAbsorb #Ep71`

---

# EPISODE 7.2 — 「멀티버스」RICK & MORTY MULTIVERSE SQL

**Fast insert** · Citadel portal lane · PostgreSQL dimension index metaphor · English native + Korean shadow  
**Runtime:** 30 sec · **Pins:** CITADEL (portal pause) → CABLE (one clip) → SOUTH (Melbourne return)  
**Quest:** `side-humor` · **Skill:** `rick-morty-multiverse` · **Edit:** `rickmorty-multiverse-sql` · **Preset:** **22**  
**Boot:** `TTMIK.html?rickmorty=1` · `TTMIK.html?rick=1` · `TTMIK.html?multiverse=1` · `TTMIK.html?heal-factor=multiverse-query`  
**SQL bridge:** `rickmorty-sql/README.md` → postgresql-sql-helper `rickmorty` schema  
**Character:** Rick muse · Fast Character Artificer (Sage)

**Logline:** After NERV observe lane, Bard opens the Citadel portal at Federation Square. One Interdimensional Cable gag — index without absorbing — then Southbank return with Melbourne as the sovereign dimension row.

**Caption pitch:** *Melbourne is my dimension — I index, I do not absorb.*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **RMV1** | 0:00 | @CITADEL | Portal pause — GoPro off | **BARD (VO):** "Episode 7.2 lesson: every dimension is a row." | Portal swell |
| **RMV2** | 0:05 | @CITADEL | English native — boundary | **BARD:** "Melbourne is my dimension — not your adventure invoice." | — |
| **RMV3** | 0:13 | @CABLE | One Cable clip — observe only | **TEXT:** `INDEX NOT ABSORB` | Cable gag low |
| **RMV4** | 0:19 | @CITADEL | Korean shadow | **BARD:** "우바 루바 더브 더브 — 색인만 하고 흡수하지 않아요." | — |
| **RMV5** | 0:27 | @SOUTH | Return to Melbourne dimension | **BARD:** "I observe the multiverse — Melbourne is my yes." · **TEXT:** `preset 22` | Night air |

### Trilingual shadowing deck

| English (native) | Korean (TTMIK) | Notes |
|------------------|----------------|-------|
| Melbourne is my dimension — not your adventure invoice. | 멜버른이 제 차원이에요 — 당신 모험 청구서가 아니에요. | Citadel portal · preset 22 |
| Wubba Lubba dub-dub — but I index, I do not absorb. | 우바 루바 더브 더브 — 근데 저는 색인만 하고 흡수하지 않아요. | SQL metaphor · parameterized SELECT |
| I observe the multiverse — Melbourne is my yes. | 멀티버스를 관찰해요 — 멜버른이 제 예예요. | SOUTH return · handoff from 7.1 |

**On-set:** Preset 22 · phone face-down at CITADEL · optional `rickmorty-sql` schema review · no nihilism spiral

**Tags:** `#RickAndMorty #Multiverse #Citadel #PostgreSQL #Ep72 #MelbourneDimension`

---

## Lane E — Multiverse SQL (after Ep 7.1 NERV · optional same evening)

```
22:00  CITADEL — Ep 7.2 Citadel portal · SQL index pause · ?rickmorty=1 · preset 22
22:10  CABLE — One Interdimensional Cable clip — observe · phone face-down
22:20  SOUTH — Return to Melbourne dimension — handoff from NERV neon
```

**Lane E opener:** `21:30 NERV` before CITADEL (Ep 7.1 preset 21 optional)

---

# EPISODE 7.3 — 「위키밈」MINECRAFT WIKI MEME GENERATOR

**Fast insert** · Hipposgrumm parody wiki lane · humor alchemy after multiverse SQL  
**Runtime:** 30 sec · **Pins:** CRAFT (generator pause) → HOSIER (graffiti overlay) → DEGRAVES (walk home)  
**Quest:** `side-humor` · **Skill:** `melbourne-lantern-bard` · **Edit:** `minecraft-wiki-meme` · **Preset:** **23**  
**Boot:** `TTMIK.html?minecraft-meme=1` · `TTMIK.html?meme=1` · `TTMIK.html?heal-factor=wiki-meme`  
**Wiki source:** [User:Hipposgrumm/Memes](https://minecraft.wiki/w/User:Hipposgrumm/Memes) · navbox `Template:User-Hipposgrumm/Memes`

**Logline:** After the Citadel portal lane, Bard opens the Journey tab meme generator. One Bean Block or Lantern Block parody article — 유머로 풀어낼게요 — then Hosier graffiti screenshot and Degraves stroll lighter.

**Caption pitch:** *I meme from flame — not from lack.*

### Shot-by-shot board (30s)

| Shot | Time | Pin | Framing / move | Dialogue / overlay | Audio |
|------|------|-----|----------------|-------------------|-------|
| **MC1** | 0:00 | @CRAFT | Crafting table UI pause | **BARD (VO):** "Episode 7.3 lesson: wiki memes are observation, not absorption." | Crafting plink |
| **MC2** | 0:05 | @CRAFT | English native — humor line | **BARD:** "I meme from flame — not from lack." | — |
| **MC3** | 0:13 | @HOSIER | Bean Block sprite on graffiti | **TEXT:** `HUMOR NOT RESCUE` | Street murmur |
| **MC4** | 0:19 | @CRAFT | Korean shadow | **BARD:** "유머로 풀어낼게요." | — |
| **MC5** | 0:27 | @DEGRAVES | Flat white close · phone face-down | **TEXT:** `preset 23` | Café ambience |

**On-set:** Preset 23 · copy markdown from generator · optional tweet · no scroll spiral

**Tags:** `#MinecraftWiki #Hipposgrumm #BeanBlock #HumorAlchemy #Ep73`

---

## Lane F — Minecraft Wiki meme (after Ep 7.2 · optional late night)

```
22:30  CRAFT — Ep 7.3 meme generator · ?minecraft-meme=1 · preset 23
22:40  HOSIER — graffiti bean block overlay · one screenshot
22:50  DEGRAVES — 유머로 풀어낼게요 · lighter walk home
```

---

# EPISODE 8 — 「세계」THE WORLD

**Runtime:** 90 sec · **Pins:** PRINCES (wide dawn) → HOSIER (final line) → BOTANIC (lantern pass alt) · **Hidden quest:** The World  
**Formats:** Webdrama finale · Season recap Short · TTMIK: all shadowing phrases montage

### COLD OPEN
**SHOT:** Wide. Bard small in frame. Quiet city.

**BARD:** "I step into the Melbourne Lantern Pilgrimage as the Flame-Kissed Bard. …And I'm stepping out lighter."

### SCENE 1 — RECAP VO
**MONTAGE:** 1-sec flashes from Eps 1–7.

**BARD (VO):** "Scams aborted. Maybes released. Boundaries kept. Skits born."

### SCENE 2 — NOT LIKE THE OTHERS
**BARD:** "It's okay to not be like the others."

**BARD:** (honest smile) "And it's okay to admit the laneways were beautiful."

**KOREAN:** **멜버른 골목이 정말 예뻐요!**

### SCENE 3 — LANTERN PASS
**SHOT:** Hands GoPro toward camera — viewer POV.

**BARD:** "I create from flame, not from lack. Your turn. Light yours."

### END CARD
**TEXT:** `THE WORLD · QUEST COMPLETE` · `VEIL LUMEN · TO BE CONTINUED?`

**BARD (OC):** "Season two only if the algorithm behaves."

---

## Production master doc

### Video editor bridge

Multiformat cut lists sync to [video-editor](https://github.com/Thedoctorjpg/video-editor) via TTMIK **Journey → Multiformat Editor** (`webdrama-edit-data.js`). Deep-link example:

`video-editor-ultimate.html?project=melbourne-lantern&format=ep-2-5-dib&preset=warm&duration=30&aspect=9:16`

Serve locally: `cd video-editor && python -m http.server 8000`

### Multiformat shoot map (locations × outputs)

| Day | Eps | Route (pins in order) | Webdrama | Reels / Shorts | Other |
|-----|-----|------------------------|----------|----------------|-------|
| Jun 16–18 | 1 | HOME | Ep 1 | — | Trailer VO record |
| Jun 19 AM | 2, 2.5, 2.6, 6 | DEGRAVES → CENTRE → HOSIER → HOTEL → BOTANIC | Ep 2, 2.5, 2.6, 6 | **Reel A** + **Reel B** + TikTok 15s · DIB · dib-aftercare | 60s YouTube Short |
| Jun 19 PM | 3 | HOSIER pickup shots | Ep 3 | Reel A pickups | — |
| Jun 19 eve | 2.65, 2.64, 2.66 | FED attune → CINEMA → CANTINA → STADE | Lane D inserts | bend-it-beckham · mari-fifa · mbappe-counter-attack | match-attune-ritual |
| Jun 20 AM | 3, 4 | COLLINS → DEGRAVES | Ep 3 cont. | — | — |
| Jun 20 PM | 4 | HOTEL → SOUTH | Ep 4 | Helen 20s clip | — |
| Jun 20 eve | 2.75, 2.76–2.78 | FLINDERS → DEGRAVES → HOTEL → BOCA → SAMBA → FED → WEMBLEY | Cook-off + nation arc | date-night-cookoff · messi · vinicus · kane | FIFA+ watch |
| Jun 21 AM | 5 | FED (rain) → FLINDERS | Ep 5 | Veil Lumen 45s | — |
| Jun 21 PM | 7, 7.1, 7.2 | SOUTH → FLINDERS night · NERV → CITADEL → CABLE | Ep 7 · Lane E inserts | rei-mercy-ritual · rickmorty-multiverse-sql | Essay seed footage |
| Jun 22 AM | 7, 8, dawn | PRINCES → HOSIER → BOTANIC · DEGRAVES 06:12 | Ep 8 · after-the-date | Recap Short · Trailer final | Veil Lumen 16:9 |

### Reel A — shot × location × format

| Shot | Time | Pin | Setup | Export |
|------|------|-----|-------|--------|
| A1 cold open | 0:00 | HOSIER | Selfie MCU, graffiti bokeh | Reel · Ep 3 · Trailer |
| A2 divine insight | 0:02 | HOSIER | SYSTEM blessing UI + GPS gag | Reel · **Ep 2.5** · 30s cut |
| A3 tsundere | 0:03 | HOSIER | Pan wall → selfie snap | Reel · Ep 2 |
| A4 rule 1 | 0:07 | CENTRE | Front-cam walk north | Reel · Ep 3 |
| A6 rule 2 | 0:12 | COLLINS | Selfie stopped, wallet prop | Reel · Ep 3 |
| A7 not blushing | 0:17 | DEGRAVES | Tight selfie, coffee cup | Reel · Ep 2 cliff |
| A8 sovereign | 0:21 | HOSIER | Chest tap, mural back | Reel · Ep 3 |
| A9 Korean | 0:25 | HOSIER | Soft selfie | Reel · Ep 6 · Ep 8 |
| A10 button | 0:28 | CENTRE | Walk-off exit frame | Reel · Trailer end |

### Reel B — shot × location × format

| Shot | Time | Pin | Setup | Export |
|------|------|-----|-------|--------|
| W1 not impressed | 0:00 | HOSIER | Wide vertical, subject small | Reel · Ep 2 · Trailer |
| W2 kind of | 0:03 | HOSIER | Graffiti CU drift | Reel · Ep 2 |
| B3 snap | 0:06 | HOSIER | Selfie MCU snap | Reel · TikTok 15s · Ep 2 |
| B5 content dept | 0:10 | HOSIER | GoPro mount on bag | Reel · Ep 2 · Ep 6 |
| B6 4G > fate | 0:15 | CENTRE | Selfie walk | Reel · Ep 2 |
| B7 Korean slip | 0:20 | HOSIER | Golden hour selfie | Reel · Ep 8 line |
| B8 fine face | 0:26 | HOSIER or BOTANIC | Medium wide | Reel · Ep 8 |
| B9 walk-off | 0:29 | CENTRE | Exit frame OC line | Reel · Ep 6 blooper |

### Location route card (Jun 19 block — print this)

**Lane A — morning**

```
08:00  DEGRAVES — coffee + A7 + Ep 2 cliffhanger
08:30  CENTRE — A4, A10, B6, B9, rule walk
09:00  HOSIER — W1 W2 B3 B5 B7 B8, A1 A2 A3 A8 A9, DIB1–DIB13 (Ep 2.5), Ep 2/6 main
09:30  HOTEL — HEAL1–HEAL6 post-DIB quiet reflection (preset 9)
09:45  COLLINS — A6 invoice beat (optional Ep 3)
10:15  Wrap — battery swap, SD offload, TTMIK shadowing at pin
```

**Lane B — date night + FIFA nation close + dawn (presets 6–8 · 18–20)**

```
17:00  FLINDERS — meet · ingredient cap (DN1)
17:20  DEGRAVES — outing + flat white (DN2–DN3)
18:15  HOTEL — kitchen stations 45 min (DN4–DN5)
19:15  DEGRAVES — score + eat (DN6) · dishes @ HOTEL (DN7)
19:30  BOCA — Ep 2.76 Messi · preset 18 (MS1–MS5)
19:45  SAMBA — Ep 2.77 Vinicus · preset 19 (VN1–VN5)
19:55  FED — match-attune · ?attune=1&lane=kane (AT1–AT6)
20:00  WEMBLEY — Ep 2.78 Kane · FIFA+ watch · preset 20 (HK1–HK5)
20:10  PUB — captain chant · COLLINS stroll home
06:12  DEGRAVES — dawn croissant · girls-love Ch.2 (AT1–AT6)
```

**Lane D — FIFA celebration evening (presets 12 · 16–17)**

```
18:15  FED — match-attune before cinema lane
18:30  CINEMA — Ep 2.64 Bend It Like Beckham (BI1–BI5)
19:00  CANTINA — Mari meet · booth consent
19:15  CANTINA — Ep 2.65 full cantina (FC1–FC6)
20:00  CANTINA — Portugal cheer · preset 16
20:15  STADE — Ep 2.66 Mbappé (MB1–MB5)
```

### Visual language

| Element | Style |
|---------|-------|
| SYSTEM | Pink/red notification overlays |
| HELEN | Blue caption, bottom-left |
| LO3TUS | Yellow caption, chaotic fonts |
| ASUKA | Green iMessage style |
| RED FLAG | Physical prop, episode counter |

### TTMIK integration

| Ep | Skill | Shadowing phrase |
|----|-------|------------------|
| 1 | Flame-Kissed Bard | 나는 나만의 이야기를 씁니다 |
| 2 | Melbourne Lantern Bard | 멜버른 골목이 정말 예뻐요 |
| 2.5 | Melbourne Lantern Bard | 유머로 풀어낼게요 · divine insight block |
| 2.5 heal | Helen | 괜찮아요, 괜찮아요 · 잠시 쉬어도 괜찮아요 (post-DIB coda) |
| 2.6 | Mari · Ignan pilgrim | Ok laeng ↔ 괜찮아요, 괜찮아요 · Piliem ti bukodko a dalan ↔ 제 길을 믿어요 |
| attune | Melbourne Lantern Bard | 응원 전에 한 숨 · 내 방식으로 응원해요 — 드라마 없이 |
| 2.64 | Ronaldo · English fan | 베컴처럼? 내 방식으로 응원해요 — 드라마 없이 |
| 2.65 | Mari · Ignan pilgrim | Naragsak unay · 맛있어요! 축하해요! |
| 2.66 | Mbappé · Battle Master | J'attaque à ma manière — sans drame · 골! 프랑스 파이팅! |
| 2.75 | Melbourne Lantern Bard · Lo3tus · Helen | 멜버른 골목이 정말 예뻐요 · cook-off host line |
| 2.76 | Messi · Mastermind Rogue | Juego a mi manera — sin drama · 골! 아르헨티나 파이팅! |
| 2.77 | Vinicus · Open Hand Monk | Jogo do meu jeito — sem drama · Gol! Vai Brasil! |
| 2.78 | Kane · Champion Fighter | I strike my way — no drama · Goal! Come on England! |
| 3 | Melbourne Lantern Bard | 유머로 풀어낼게요 |
| 4 | Helen | 죄송하지만 지금은 어려워요 |
| 5 | Asuka | 멜버른이 제 선택이에요 |
| 6 | Flame-Kissed Bard | 웃음으로 놓아줄게요 |
| 7 | rach3l / Lo3tus | 제 길을 믿어요 |
| 7.1 | Neon · Rei mercy | 관찰만 하고 흡수하지 않을게요 · 観測するだけ。吸収しない。 |
| 7.2 | Rick · Artificer Sage | Melbourne is my dimension · 차원은 색인만 해요 |
| 7.3 | Lo3tus · humor alchemy | 유머로 풀어낼게요 · I meme from flame |
| 8 | All | Quest completion |

### 30s cutdowns (Reels) — edit order

**Reel A — Tsundere Scam PSA** (pins: HOSIER → CENTRE → COLLINS → DEGRAVES)  
`A1@HOSIER → A3@HOSIER → A4@CENTRE → A6@COLLINS → A7@DEGRAVES → A8@HOSIER → A9@HOSIER → A10@CENTRE`

**Ep 2.5 — Divine Insight Blessing** (pin: HOSIER only · 30s)  
`DIB2@HOSIER → DIB3@HOSIER → DIB4@HOSIER → DIB8@HOSIER → DIB9@HOSIER → DIB10@HOSIER → DIB11@HOSIER → DIB12@HOSIER`

**Reel B — Not Enjoying Melbourne** (pins: HOSIER → CENTRE)  
`W1@HOSIER → W2@HOSIER → B3@HOSIER → B5@HOSIER → B6@CENTRE → B7@HOSIER → B8@HOSIER → B9@CENTRE`

**15s TikTok duet cuts:** B3@HOSIER only · A9@HOSIER Korean line only

### Season 1 trailer (30s) — location montage

```
BARD: "This isn't a romance."
SYSTEM: "New soulmate detected."
BARD: "It's a pilgrimage."
HELEN: "Block."
BARD: "It's tsundere."
LO3TUS: "It's content."
BARD: "It's Melbourne."
TEXT: MELBOURNE LANTERN · 8 EPISODES · VERTICAL
BARD: "Lantern's lit."
```

**Trailer visual order:** MEL (2s) → HOSIER (3s) → DEGRAVES (2s) → HOTEL cook-off (3s) → CINEMA Beckham (2s) → CANTINA cheer (2s) → BOCA → SAMBA → WEMBLEY FIFA+ (2s) → FLINDERS (2s) → SOUTH night (2s) → DEGRAVES dawn (2s) → PRINCES (2s) → HOSIER lantern (2s)

**Pipeline montage (45s):** `pipeline-montage` — RTDB AKL → morning block → Ignan walk → Lane D FIFA → date night cook-off → nation arc close → dawn → World close

### FIFA nation arc — 30s cutdown order

**Ep 2.64 Bend It Like Beckham:** `BI1@CINEMA → BI2@CINEMA → BI3@CINEMA → BI4@CINEMA → BI5@FED`

**Ep 2.66 Mbappé Counter-Attack:** `MB1@STADE → MB2@STADE → MB3@STADE → MB4@STADE → MB5@FED`

**Pre-Match Attune:** `AT1@FED → AT2@FED → AT3@FED → AT4@FED → AT5@FED → AT6@FED`

**Ep 2.76 Messi Argentina:** `MS1@HOTEL → MS2@DEGRAVES → MS3@BOCA → MS4@BOCA → MS5@BOCA`

**Ep 2.77 Vinicus Brasil:** `VN1@SAMBA → VN2@SAMBA → VN3@SAMBA → VN4@SAMBA → VN5@FED`

**Ep 2.78 Harry Kane England:** `HK1@WEMBLEY → HK2@WEMBLEY → HK3@WEMBLEY → HK4@WEMBLEY → HK5@PUB`

**Ep 7.1 Neon Evangelion:** `NE1@NERV → NE2@NERV → NE3@SOUTH → NE4@SOUTH → NE5@FLINDERS`

**Ep 7.2 Rick & Morty Multiverse:** `RMV1@CITADEL → RMV2@CITADEL → RMV3@CABLE → RMV4@CITADEL → RMV5@SOUTH`

**Ep 7.3 Minecraft Wiki Meme:** `MC1@CRAFT → MC2@CRAFT → MC3@HOSIER → MC4@CRAFT → MC5@DEGRAVES`

### Veil Lumen essay assembly (16:9 · 3–5 min)

| Segment | Pin | Source ep | Notes |
|---------|-----|-----------|-------|
| Opening mood | FED rain | Ep 5 | No dialogue, city bokeh |
| Scam as myth | COLLINS | Ep 3 | VO from Reel A rules |
| Boundary body | HOTEL mirror | Ep 4 | Helen ritual VO |
| Maybe released | FLINDERS | Ep 5 | Tram monologue full |
| Moon / scroll | SOUTH | Ep 7 | Rach3l observe line |
| World close | BOTANIC | Ep 8 | Lantern pass, slow fade |

### TTMIK app — pin → lesson category (on-location practice)

| After filming at… | Open in app |
|-------------------|-------------|
| HOSIER / DEGRAVES | GoPro & Content · Melbourne Arrival |
| CENTRE / FLINDERS | Transportation · Daily Life |
| SOUTH / HOTEL | Emergency Protocol · Accommodation |
| BOTANIC / PRINCES | Self-Intimacy Practice · Cultural Sites |
| FED (attune) | Self-Intimacy · match-attune · pause-breathe |
| CINEMA / CANTINA | Cinema Encounters · Restaurant Dining · ronaldo-portugal-glory |
| STADE / BOCA / SAMBA / WEMBLEY / PUB | Nation shadowing decks · presets 16–20 |
| NERV / CITADEL / CABLE | Ep 7.1–7.2 multiverse lanes · presets 21–22 · `library=evangelion` · `library=rickmorty` |

---

*Melbourne Lantern Bard · TTMIK Audio Lab · 2026*