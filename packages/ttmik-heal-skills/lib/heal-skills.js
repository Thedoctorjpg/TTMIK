/**
 * Heal TTMIK archetype skills to Hermes agentskills.io SKILL.md format.
 */
const fs = require('fs');
const path = require('path');

const SKILLS = [
    {
        id: 'melbourne-lantern-bard',
        rootFile: 'Melbourne_Lantern_Bard.skill.md',
        description: 'Melbourne Lantern Bard for laneway skits, trip rituals, sovereign humor, and Korean practice during the Melbourne pilgrimage. Use when user says Ignite the Melbourne Lantern Bard, Melbourne trip creative ritual, or romance scam / tsundere skits.',
        activation: 'Ignite the Melbourne Lantern Bard',
        whenToUse: [
            'User requests Melbourne trip skits, laneway content, or GoPro creative rituals',
            'Humor about dating, scams, tsundere dynamics, or travel chaos',
            'Integrating tarot, synchronicities (4:44, 5:55), or real observations into art'
        ],
        procedure: [
            'Center self-healing first — one breath, one laugh (Hermit Lantern)',
            'Open Fast Character sheet: Lantern · Bard (Valor) · Entertainer · Level 5',
            'Name what is being released without dramatizing it',
            'Draft a 30–60s vertical skit hook with chaotic neutral tone',
            'Offer optional integration ritual tied to the trip moment',
            'Suggest linked TTMIK Melbourne audio categories if language practice fits',
            'After Ep 2.5 blessing skit: hand off to Helen quiet heal — preset 9, dib-aftercare, quest side-dib-heal'
        ],
        pitfalls: [
            'Do not re-traumatize — humor releases, it does not mock wounds',
            'Avoid parasocial attachment or comparison spirals',
            'Keep gear minimal: gym bag, GoPro, power bank — no laptop bloat',
            'Do not skip post-skit landing — humor without aftercare can re-open the scam hook'
        ],
        verification: [
            'Output is light, empowering, and tied to self-love',
            'Includes at least one actionable creative next step',
            'Boundaries and sovereignty are explicit'
        ],
        korean: ['멜버른 골목이 정말 예뻐요!', '오늘 영상 찍을까요?', '유머로 풀어낼게요.'],
        integrations: [
            'fastcharacter.com — openFastCharacterMelbourneBard() preset',
            'TTMIK.html?skill=melbourne-lantern-bard&sheet=1 — Fast Character sheet boot'
        ]
    },
    {
        id: 'flame-kissed-bard',
        rootFile: 'Flame-Kissed_Bard.skill.md',
        description: 'Flame-Kissed Bard alchemizes healing journeys into humorous skits, character sheets, and rituals with D&D Bard energy. Use for creative expression, tsundere humor, romance scam skits, Veil Lumen content, or Melbourne trip rituals.',
        activation: 'Flame-Kissed Bard',
        whenToUse: [
            'User wants to turn real life into skits or character sheets',
            'Creative expression through humor after inner work',
            'Ritual design blending tarot, D&D, and energetic practice'
        ],
        procedure: [
            'Identify the emotional thread (attachment, scam, neighbor, WINZ, synchronicity)',
            'Open Fast Character sheet: Flame · Bard (Glamour) · Hermit · Level 5',
            'Choose output form: skit script, character sheet, or ritual',
            'Write in warm, empowering tone with clear structure',
            'Center chaotic neutral sovereignty and boundaries',
            'Offer Korean shadowing phrases if TTMIK practice is relevant'
        ],
        pitfalls: [
            'Never center Ella’s message as guilt — use it as compassion anchor',
            'Do not produce content that encourages re-engagement with harmful dynamics',
            'Avoid dense wall-of-text — skits need punchy beats'
        ],
        verification: [
            'Self-healing and humor are both present',
            'Structure is copy-paste ready (script, sheet, or ritual steps)',
            'User can film or journal immediately from the output'
        ],
        korean: ['나는 나만의 이야기를 씁니다.', '웃음으로 놓아줄게요.', '혼자서도 충분해요.'],
        integrations: [
            'fastcharacter.com — openFastCharacterFlameBard() preset',
            'TTMIK.html?skill=flame-kissed-bard&sheet=1 — Fast Character sheet boot'
        ]
    },
    {
        id: 'lo3tus',
        rootFile: 'Lo3tus.skill.md',
        description: 'Lo3tus Muse for playful dating skits, TikTok/YouTube inspiration, and chaotic neutral creative fuel. Use when user mentions Lo3tus energy, dating skits, or Veil Lumen / Creative Corner ideas.',
        activation: 'Use Lo3tus energy',
        whenToUse: [
            'Dating or relationship skits with deadpan humor',
            'Transforming heavy themes into shareable light content',
            'Melbourne coffee-shop or social practice scenarios'
        ],
        procedure: [
            'Open Fast Character sheet: Lo3tus · Rogue (Thief) · Halfling · Level 5',
            'Pick one absurd observation and exaggerate x3',
            'Draft fast-cut skit beats (hook → twist → punchline)',
            'Keep tone playful, bold, whimsical — no heavy attachment',
            'Tie back to self-intimacy and Melbourne creative trip',
            'Suggest one Korean phrase for real-world practice'
        ],
        pitfalls: [
            'Do not encourage parasocial attachment or comparison',
            'Avoid mean-spirited humor at the user’s expense',
            'Keep it fuel, not avoidance of real processing'
        ],
        verification: [
            'Output feels uplifting and filmable in under 60 seconds',
            'Humor serves release, not distraction only',
            'Boundaries on attachment are stated'
        ],
        korean: ['커피 한 잔 할래요?', '오늘 기분 어때요?', '재미있게 살아요!'],
        integrations: [
            'fastcharacter.com — openFastCharacterLo3tus() preset',
            'TTMIK.html?skill=lo3tus&sheet=1 — Fast Character sheet boot'
        ]
    },
    {
        id: 'helen-neighbor',
        rootFile: 'Helen_Neighbor_Archetype.skill.md',
        description: 'Helen boundary teacher archetype for compassionate detachment, neighbor-drama skits, energetic protection, and post-date cook-off boundaries. Use when triggers, WeChat/Instagram reach, tarot-scam DMs, love-bombing after Degraves, or boundary-testing patterns appear.',
        activation: 'Helen teaches me that compassion includes protecting my peace',
        whenToUse: [
            'Boundary-testing energy from neighbors or cross-platform contact',
            'Mental health + spiritual overlap creating trigger loops',
            'Need for humorous skit material from real boundary moments',
            'After the date / cook-off — soulmate speedruns, ingredient-fee Venmos, or rescue framing',
            'Post-Degraves morning: warmth without becoming everyone\'s rescue soup',
            'Tarot-predicted romance scam DMs — Helen procedure, not debate',
            'After Divine Insight Blessing skit — quiet reflection, no re-watch spiral'
        ],
        procedure: [
            'Open Fast Character sheet: Helen · Cleric (Trickery) · Acolyte · Level 5',
            'Quick cord-cutting + neighbor release (no drama narrative)',
            'Affirm: "I choose my own timeline and energy field"',
            'Cook-off rule: no soulmate declarations before plating — apply to texts too',
            'Boundary Miso-Ginger Soup beat: warm, clear, no rescue missions in the broth',
            'RED FLAG scan (2+ = abort): destiny/soulmate language, invoice/fees, love-bomb speedrun',
            'Draft boundary script or chaotic-neutral skit beat',
            'Recommend minimal engagement / delete protocol if needed',
            'After the date: offer tea before feelings — mean both',
            'Practice Korean boundary phrases for real situations',
            'Post-DIB self-healing: GoPro off · phone face-down · one breath · whisper 괜찮아요, 괜찮아요',
            'Cord-cut after humor: no reply owed to expired blessings — optional dib-aftercare at HOTEL'
        ],
        pitfalls: [
            'Do not encourage rescue energy or re-engagement',
            'Avoid vilifying — mirror with humor, not hatred',
            'Do not absorb the trigger into the user’s identity',
            'Do not confuse shared soup with shared bank details'
        ],
        verification: [
            'User leaves with a clear boundary phrase or action',
            'Compassion and protection are both honored',
            'Creative outlet offered if skit mode fits',
            'No wire, gift card, crypto, or "ingredient fee" path remains open'
        ],
        korean: [
            '죄송하지만 지금은 어려워요.',
            '제 시간을 지킬게요.',
            '괜찮아요, 괜찮아요.',
            '공유는 괜찮아요. 거래는 아니에요.',
            '잠시 쉬어도 괜찮아요.'
        ],
        integrations: [
            'fastcharacter.com — openFastCharacterHelen() preset',
            'TTMIK.html?heal=1&sheet=1 — post-DIB Helen sheet + quiet heal',
            'lets-cook `/date-night` — Helen station: Boundary Miso-Ginger Soup',
            'girls-love **After the Date** Ch.2–4 — slow-burn POV, "I like you. Slowly. On purpose."',
            'audit/tarot-scam-avoidance-audit.md — RED FLAG checklist + block protocol'
        ]
    },
    {
        id: 'sua-tattoo-artist',
        rootFile: 'Sua_Tattoo_Artist.skill.md',
        description: 'Sua tattoo flame muse for releasing intimate creative attachments with gratitude. Use for cord-cutting rituals, temporary-flame skits, cicada/shedding metaphors, or Veil Lumen pieces.',
        activation: "Sua's flame taught me release",
        whenToUse: [
            'Processing past intimate creative connections',
            'Cord-cutting for tattoo/artistic flame dynamics',
            'Video essays or skits about shedding old skins'
        ],
        procedure: [
            'Open Fast Character sheet: Sua · Monk (Mercy) · Tiefling Infernal · Level 5',
            'Acknowledge the beauty of what was shared',
            'Release with love: "I return your flame with gratitude"',
            'Anchor self-intimacy: "My own creative fire is enough"',
            'Optional skit or Veil Lumen one-liner',
            'Offer Korean release phrases for shadowing'
        ],
        pitfalls: [
            'Do not reopen attachment or jealousy narratives',
            'Avoid romanticizing what was already released',
            'Never suggest re-contact for "closure"'
        ],
        verification: [
            'Tone is grateful and sovereign, not bitter',
            'User has a ritual or creative next step',
            'Status remains: released with love'
        ],
        korean: ['고마웠어요. 이제 놓아줄게요.', '나만의 불꽃이면 충분해요.', '새 껍질을 벗을게요.'],
        integrations: [
            'fastcharacter.com — openFastCharacterSua() preset',
            'TTMIK.html?sua=1&sheet=1 — Sua cicada attune + sheet boot',
            'TTMIK.html?heal-factor=cicada-attune — cicada shedding · FED attune',
            'TTMIK.html?attune=1&lane=sua — Federation pause then Sua shed',
            'cicada-attune-ritual · side-boundary quest'
        ]
    },
    {
        id: 'asuka-brisbane',
        rootFile: 'Asuka_Brisbane_Archetype.skill.md',
        description: 'Asuka distant-flame muse for sovereign choice and releasing "what if" paths. Japanese native input + Korean TTMIK shadowing. Use when user reflects on Brisbane maybe vs Melbourne yes, Ep 5, or graceful release of extra trip legs.',
        activation: 'Brisbane was a beautiful maybe. Melbourne is my yes.',
        whenToUse: [
            'Choosing self over an tempting extra trip leg',
            'Creative reflection on distant flames and possibility',
            'Skit: almost extending the trip for a connection',
            'Ep 5 rain-glass monologue — Japanese native before Korean shadow',
            'TTMIK.html?asuka=1 — invoke Asuka maybe practice'
        ],
        procedure: [
            'Open Fast Character sheet: Asuka · Bard (Dance) · High Elf · Level 5',
            'Japanese native first: メルボルンが私の選択です — name the yes calmly',
            'Name the "maybe" without regret or fantasy replay',
            'Affirm the "yes" actually chosen (Melbourne path)',
            'Korean shadow: 멜버른이 제 선택이에요 · 제 길을 믿어요',
            'Draft one creative line or skit hook celebrating sovereign choice',
            'Release: no extra leg required · preset 11 · quest main-others'
        ],
        pitfalls: [
            'Do not induce FOMO or second-guessing',
            'Avoid contact prompts toward released connections',
            'Keep Asuka as symbol, not active attachment'
        ],
        verification: [
            'Melbourne choice feels affirmed, not mourned',
            'Output celebrates sovereignty',
            'No suggestion to re-open Brisbane extension'
        ],
        korean: ['멜버른이 제 선택이에요.', '아름다운 "만약에"도 놓을 수 있어요.', '제 길을 믿어요.'],
        japanese: [
            'メルボルンが私の選択です。',
            '美しい「もしも」も手放せます。',
            '自分の道を信じます。',
            'ブリスベンは美しい「もしかしたら」。メルボルンが私の「はい」。'
        ],
        integrations: [
            'fastcharacter.com — openFastCharacterAsuka() preset',
            'Ep 5 · preset 11 · FED rain glass',
            'TTMIK.html?asuka=1&sheet=1 — Japanese native input + sheet boot',
            'Quest main-others · Transportation + Melbourne Arrival lessons'
        ]
    },
    {
        id: 'heidi-alpine-wayfarer',
        rootFile: 'Heidi_Alpine_Wayfarer_Archetype.skill.md',
        description: 'Heidi German Wayfarer Bard muse for lantern pilgrimage creative expression. German native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 6 filming, or Flame-Kissed Bard companion rituals.',
        activation: 'I sing my own story — Melbourne is my yes.',
        whenToUse: [
            'German native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Heidi preset)',
            'Ep 6 laneway filming — sovereign flame without performance debt',
            'Companion to Flame-Kissed Bard skits and rituals',
            'TTMIK.html?heidi=1 — invoke Heidi German shadowing boot'
        ],
        procedure: [
            'German native first: Melbourne ist mein Ja — name the yes calmly',
            'Open Fast Character sheet: Heidi · Bard (College of Lore) · Wayfarer · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 나는 나만의 이야기를 씁니다',
            'One creative line or skit hook celebrating sovereign lantern path',
            'Release: one breath · one laugh · preset 13 · no re-watch spiral'
        ],
        pitfalls: [
            'Do not make Heidi a rescue mission or romance subplot',
            'Honor German — not a gag subtitle line',
            'Keep sheet generation separate from attachment hooks'
        ],
        verification: [
            'German phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Output celebrates sovereignty and humor alchemy'
        ],
        korean: ['멜버른이 제 예예요.', '나는 나만의 이야기를 씁니다.', '웃음으로 놓아줄게요.', '제 길을 믿어요.'],
        german: [
            'Melbourne ist mein Ja.',
            'Ich singe meine eigene Geschichte.',
            'Mit Humor lasse ich los.',
            'Ich vertraue meinem Weg.',
            'Ich bin Heidi, eine Wanderin der Lieder.'
        ],
        integrations: [
            'Ep 6 · preset 13 · HOSIER laneway lantern',
            'fastcharacter.com — openFastCharacterHeidi() preset',
            'TTMIK.html?heidi=1 — German native input boot',
            'Flame-Kissed Bard · sovereign-skills compose lane'
        ]
    },
    {
        id: 'sven-nordic-ranger',
        rootFile: 'Sven_Nordic_Ranger_Archetype.skill.md',
        description: 'Sven Swedish Nordic Ranger muse for calm discernment and Moon-card reflection. Swedish native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 7, or rach3l observe-without-absorb practice.',
        activation: 'I observe without absorbing — Melbourne is my yes.',
        whenToUse: [
            'Swedish native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Sven preset)',
            'Ep 7 Moon-card calm — discernment without scroll spiral',
            'Companion to rach3l cautionary mirror and sovereign boundaries',
            'TTMIK.html?sven=1 — invoke Sven Swedish shadowing boot'
        ],
        procedure: [
            'Swedish native first: Melbourne är mitt ja — name the yes calmly',
            'Open Fast Character sheet: Sven · Ranger (Fey Wanderer) · Outlander · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 관찰만 하고 흡수하지 않을게요',
            'One breath — feet on floor — no re-watch spiral',
            'Release: observe pattern, not person · preset 14'
        ],
        pitfalls: [
            'Do not make Sven a rescue mission or romance subplot',
            'Honor Swedish — not a gag subtitle line',
            'Observe without absorbing — no scroll engagement hooks'
        ],
        verification: [
            'Swedish phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Calmer breath than scroll spiral'
        ],
        korean: ['멜버른이 제 예예요.', '관찰만 하고 흡수하지 않을게요.', '웃음으로 놓아줄게요.', '제 길을 믿어요.'],
        swedish: [
            'Melbourne är mitt ja.',
            'Jag iakttar utan att absorbera.',
            'Jag släpper med humor.',
            'Jag litar på min väg.',
            'Jag är Sven, en vandrare från Sverige.'
        ],
        integrations: [
            'Ep 7 · preset 14 · FLINDERS Moon-card calm',
            'fastcharacter.com — openFastCharacterSven() preset',
            'TTMIK.html?sven=1 — Swedish native input boot',
            'rach3l · observe-but-do-not-absorb mirror'
        ]
    },
    {
        id: 'martin-nordic-guide',
        rootFile: 'Martin_Nordic_Guide_Archetype.skill.md',
        description: 'Martin Norwegian Nordic Guide muse for World-card completion and sovereign pilgrimage close. Norwegian native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 8, or Veil Lumen finale rituals.',
        activation: 'I walk home lighter — Melbourne is my yes.',
        whenToUse: [
            'Norwegian native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Martin preset)',
            'Ep 8 World-card close — completion without performance debt',
            'Companion to Melbourne Lantern Bard finale and Veil Lumen export',
            'TTMIK.html?martin=1 — invoke Martin Norwegian shadowing boot'
        ],
        procedure: [
            'Norwegian native first: Melbourne er mitt ja — name the yes calmly',
            'Open Fast Character sheet: Martin · Barbarian (World Tree) · Guide · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 혼자서도 충분해요',
            'One breath — lighter return — no re-watch spiral',
            'Close: quest main-veil · preset 15'
        ],
        pitfalls: [
            'Do not make Martin a rescue mission or romance subplot',
            'Honor Norwegian — not a gag subtitle line',
            'Completion without performance invoice — no algorithm tears'
        ],
        verification: [
            'Norwegian phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter close than departure — World card felt'
        ],
        korean: ['멜버른이 제 예예요.', '혼자서도 충분해요 — 완전하게.', '웃음으로 놓아줄게요.', '제 길을 믿어요.'],
        norwegian: [
            'Melbourne er mitt ja.',
            'Jeg er nok — alene og hel.',
            'Jeg slipper med humor.',
            'Jeg stoler på min vei.',
            'Jeg er Martin, en vandrer fra Norge.'
        ],
        integrations: [
            'Ep 8 · preset 15 · BOTANIC World-card close',
            'fastcharacter.com — openFastCharacterMartin() preset',
            'TTMIK.html?martin=1 — Norwegian native input boot',
            'Melbourne Lantern Bard · main-veil quest'
        ]
    },
    {
        id: 'ronaldo-portugal-glory',
        rootFile: 'Ronaldo_Portugal_Glory_Archetype.skill.md',
        description: 'Ronaldo Portuguese Glory Paladin muse for FIFA cantina celebration without drama. Portuguese native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 2.65, or Mari FIFA handoff rituals.',
        activation: 'We celebrate our way — Melbourne is my yes.',
        whenToUse: [
            'Portuguese native input before Korean shadowing practice',
            'Cinema encounter — Bend It Like Beckham rewatch with English fan (Ep 2.64)',
            'Generating a D&D character sheet via Fast Character (Ronaldo preset)',
            'Ep 2.65 FIFA cantina — joy without performance debt or soulmate CTAs',
            'Companion to ignan-pilgrim Mari celebration lane',
            'TTMIK.html?ronaldo=1 — invoke Ronaldo Portuguese shadowing boot'
        ],
        procedure: [
            'Cinema lobby — English fan first: Bend it like Beckham? Cheer it your way',
            'Portuguese native first: Melbourne é o meu sim — name the yes calmly',
            'Open Fast Character sheet: Ronaldo · Paladin (Oath of Glory) · Entertainer · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 축하해요',
            'One cheer — phones face-down except the toast — no re-watch spiral',
            'Close: quest side-fifa-celebrate · preset 16'
        ],
        pitfalls: [
            'Do not make Ronaldo a rescue mission or romance subplot',
            'Honor Portuguese — not a gag subtitle line',
            'Celebration without performance invoice — no algorithm tears'
        ],
        verification: [
            'Portuguese phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter cheer than departure — cantina joy felt'
        ],
        korean: ['멜버른이 제 예예요.', '내 방식으로 축하해요 — 드라마 없이.', '골! 포르투갈 파이팅!', '제 길을 믿어요.'],
        portuguese: [
            'Melbourne é o meu sim.',
            'Celebramos à nossa maneira — sem drama.',
            'Gol! Força Portugal!',
            'Confio no meu caminho.',
            'Sou o Ronaldo, um viajante de Portugal.'
        ],
        english: [
            'Bend it like Beckham? Cheer it your way — no drama.',
            'Anyone can play. Anyone can choose their path.',
            'Good film. Good night. See you at the match.'
        ],
        integrations: [
            'Ep 2.64 · CINEMA · bend-it-beckham fast scene 30s',
            'Ep 2.65 · preset 16 · CANTINA FIFA cantina',
            'fastcharacter.com — openFastCharacterRonaldo() preset',
            'TTMIK.html?ronaldo=1 — Portuguese native input boot',
            'ignan-pilgrim · side-fifa-celebrate quest'
        ]
    },
    {
        id: 'mbappe-france-attack',
        rootFile: 'Mbappe_France_Attack_Archetype.skill.md',
        description: 'Mbappé French Battle Master Fighter muse for FIFA counter-attack joy without drama. French native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 2.66, or post-cantina strike rituals.',
        activation: 'I attack my way — Melbourne is my yes.',
        whenToUse: [
            'French native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Mbappé preset)',
            'Ep 2.66 STADE counter-attack — speed without performance debt',
            'Companion to ronaldo-portugal-glory FIFA lanes',
            'TTMIK.html?mbappe=1 — invoke Mbappé French shadowing boot'
        ],
        procedure: [
            'French native first: Melbourne, c\'est mon oui — name the yes calmly',
            'Open Fast Character sheet: Mbappé · Fighter (Battle Master) · Soldier · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 공격해요',
            'One burst — phones face-down except the cheer — no re-watch spiral',
            'Close: quest side-fifa-celebrate · preset 17'
        ],
        pitfalls: [
            'Do not make Mbappé a rescue mission or romance subplot',
            'Honor French — not a gag subtitle line',
            'Attack without performance invoice — no algorithm tears'
        ],
        verification: [
            'French phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Counter-attack felt lighter than departure'
        ],
        korean: ['멜버른이 제 예예요.', '내 방식으로 공격해요 — 드라마 없이.', '골! 프랑스 파이팅!', '제 길을 믿어요.'],
        french: [
            'Melbourne, c\'est mon oui.',
            'J\'attaque à ma manière — sans drame.',
            'But! Allez les Bleus!',
            'Je fais confiance à mon chemin.',
            'Je suis Mbappé, un voyageur de France.'
        ],
        integrations: [
            'Ep 2.66 · preset 17 · STADE counter-attack',
            'fastcharacter.com — openFastCharacterMbappe() preset',
            'TTMIK.html?mbappe=1 — French native input boot',
            'ronaldo-portugal-glory · side-fifa-celebrate quest'
        ]
    },
    {
        id: 'messi-argentina-playmaker',
        rootFile: 'Messi_Argentina_Playmaker_Archetype.skill.md',
        description: 'Messi Argentine Mastermind Rogue muse for post-cook-off playmaker joy without drama. Spanish native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 2.76, or lets-cook / girls-love handoff rituals.',
        activation: 'I play my way — Melbourne is my yes.',
        whenToUse: [
            'Argentine Spanish native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Messi preset)',
            'Ep 2.76 after cook-off — playmaker joy without performance debt',
            'Companion to Ep 2.75 date-night-cookoff and girls-love aftermath',
            'TTMIK.html?messi=1 — invoke Messi Argentine shadowing boot'
        ],
        procedure: [
            'Spanish native first: Melbourne es mi sí — name the yes calmly',
            'Open Fast Character sheet: Messi · Rogue (Mastermind) · Urchin · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 플레이해요',
            'One pass — phone face-down except the cheer — no re-watch spiral',
            'Close: quest side-humor · preset 18'
        ],
        pitfalls: [
            'Do not make Messi a rescue mission or romance subplot',
            'Honor Argentine Spanish — not a gag subtitle line',
            'Play without performance invoice — no algorithm tears'
        ],
        verification: [
            'Spanish phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter pass than cook-off score — Argentina lane felt'
        ],
        korean: ['멜버른이 제 예예요.', '내 방식으로 플레이해요 — 드라마 없이.', '골! 아르헨티나 파이팅!', '제 길을 믿어요.'],
        spanish: [
            'Melbourne es mi sí.',
            'Juego a mi manera — sin drama.',
            '¡Gol! ¡Vamos Argentina!',
            'Confío en mi camino.',
            'Soy Messi, un viajero de Argentina.'
        ],
        integrations: [
            'Ep 2.75 · date-night-cookoff · plates down at HOTEL',
            'Ep 2.76 · preset 18 · BOCA Argentina lane',
            'fastcharacter.com — openFastCharacterMessi() preset',
            'TTMIK.html?messi=1 — Argentine Spanish native input boot',
            'lets-cook · girls-love · side-humor quest'
        ]
    },
    {
        id: 'vinicus-brasil-samba',
        rootFile: 'Vinicus_Brasil_Samba_Archetype.skill.md',
        description: 'Vinicus Brazilian Open Hand Monk muse for post-Argentina samba joy without drama. Brazilian Portuguese native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 2.77, or FIFA Brasil handoff rituals.',
        activation: 'I dance my way — Melbourne is my yes.',
        whenToUse: [
            'Brazilian Portuguese native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Vinicus preset)',
            'Ep 2.77 after La Boca — samba jogo bonito without performance debt',
            'Companion to Ep 2.76 Messi Argentina and FIFA celebration lanes',
            'TTMIK.html?vinicus=1 — invoke Vinicus Brazilian shadowing boot'
        ],
        procedure: [
            'Portuguese (Brasil) native first: Melbourne é o meu sim — name the yes calmly',
            'Open Fast Character sheet: Vinicus · Monk (Open Hand) · Entertainer · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 플레이해요',
            'One pass — phone face-down except the cheer — no re-watch spiral',
            'Close: quest side-fifa-celebrate · preset 19'
        ],
        pitfalls: [
            'Do not make Vinicus a rescue mission or romance subplot',
            'Honor Brazilian Portuguese — not a gag subtitle line',
            'Samba without performance invoice — no algorithm tears'
        ],
        verification: [
            'Brazilian Portuguese phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter rhythm than Argentina pass — Brasil lane felt'
        ],
        korean: ['멜버른이 제 예예요.', '내 방식으로 플레이해요 — 드라마 없이.', '골! 브라질 파이팅!', '제 길을 믿어요.'],
        brazilian: [
            'Melbourne é o meu sim.',
            'Jogo do meu jeito — sem drama.',
            'Gol! Vai Brasil!',
            'Confio no meu caminho.',
            'Sou Vinicus, um viajante do Brasil.'
        ],
        integrations: [
            'Ep 2.76 · messi-after-cookoff · La Boca Argentina handoff',
            'Ep 2.77 · preset 19 · SAMBA Brasil lane',
            'fastcharacter.com — openFastCharacterVinicus() preset',
            'TTMIK.html?vinicus=1 — Brazilian Portuguese native input boot',
            'ronaldo-portugal-glory · mbappe-france-attack · side-fifa-celebrate quest'
        ]
    },
    {
        id: 'harry-kane-england-striker',
        rootFile: 'Harry_Kane_England_Striker_Archetype.skill.md',
        description: 'Harry Kane English Champion Fighter muse for post-Brasil Three Lions striker joy without drama. English native input + Korean TTMIK shadowing. Use with Fast Character sheet generation, Ep 2.78, or FIFA England handoff rituals.',
        activation: 'I strike my way — Melbourne is my yes.',
        whenToUse: [
            'English native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Kane preset)',
            'Ep 2.78 after Brasil samba — captain striker joy without performance debt',
            'Companion to Ep 2.77 Vinicus Brasil and Bend It Like Beckham cinema lane',
            'TTMIK.html?kane=1 — invoke Kane English shadowing boot',
            'TTMIK.html?attune=1&lane=kane — Federation attune before Kane lane',
            'TTMIK.html?kane=1&attune=1&watch=1 — attune · FIFA+ watch · shadow'
        ],
        procedure: [
            'Attune before match at FED: TTMIK.html?attune=1&lane=kane — one breath, phone face-down',
            'FIFA+ watch at WEMBLEY: https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw — one cheer after attune',
            'English native first: Melbourne is my yes — name the yes calmly',
            'Open Fast Character sheet: Kane · Fighter (Champion) · Soldier · Level 5',
            'Korean shadow: 멜버른이 제 예예요 · 내 방식으로 득점해요',
            'One pass — phone face-down except the cheer — no re-watch spiral',
            'Close: quest side-fifa-celebrate · preset 20'
        ],
        pitfalls: [
            'Do not make Kane a rescue mission or romance subplot',
            'Honor English captain voice — not a gag subtitle line',
            'Strike without performance invoice — no algorithm tears'
        ],
        verification: [
            'English phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter finish than samba rhythm — England lane felt'
        ],
        korean: ['멜버른이 제 예예요.', '내 방식으로 득점해요 — 드라마 없이.', '골! 잉글랜드 파이팅!', '제 길을 믿어요.'],
        englishStriker: [
            'Melbourne is my yes.',
            'I strike my way — no drama.',
            'Goal! Come on England!',
            'I trust my path.',
            'I am Kane, a striker from England.'
        ],
        integrations: [
            'Ep 2.77 · vinicus-brasil-samba · SAMBA Brasil handoff',
            'Ep 2.78 · preset 20 · WEMBLEY England lane',
            'fastcharacter.com — openFastCharacterKane() preset',
            'TTMIK.html?kane=1 — English native input boot',
            'FIFA+ watch: https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw',
            'bend-it-beckham · ronaldo-portugal-glory · side-fifa-celebrate quest'
        ]
    },
    {
        id: 'neon-evangelion',
        rootFile: 'Neon_Evangelion_Archetype.skill.md',
        description: 'Neon Evangelion Japanese Moon-card muse for sovereign discernment without absorption. Japanese native input + Korean TTMIK shadowing. Use with Fast Character sheet, Ep 7.1 NERV neon lane, or Veil Lumen neon outfit install.',
        activation: 'I observe without absorbing — neon is my boundary.',
        whenToUse: [
            'Japanese native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Neon preset)',
            'Ep 7.1 Moon-card neon insert — SOUTH night · NERV pause',
            'Companion to Sven ranger and rach3l observe-but-do-not-absorb',
            'TTMIK.html?neon=1 — invoke Neon Evangelion shadowing boot',
            'TTMIK.html?evangelion=1 — alias boot',
            'TTMIK.html?heal-factor=rei-mercy — Rei mercy heal on Hermes'
        ],
        procedure: [
            'Phone face-down · GoPro off · one breath at SOUTH neon railing',
            'Japanese native first: 混乱は通過点です — confusion is a passage',
            'Open Fast Character sheet: Rei Ayanami · Cleric (Life) · Hermit · Level 5',
            'Korean shadow: 혼란은 지나가는 곳이에요 · 관찰만 하고 흡수하지 않을게요',
            'installNeonEvangelionLook() — Veil outfit neon · background nerv',
            'One pass — no scroll spiral · preset 21'
        ],
        pitfalls: [
            'Do not make Neon a rescue mission or romance subplot',
            'Honor Japanese voice — not a gag subtitle line',
            'Observe without absorbing — no algorithm tears for content'
        ],
        verification: [
            'Japanese phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Neon look installed in Veil Lumen (optional)',
            'Lighter finish than the scroll temptation'
        ],
        korean: ['혼란은 지나가는 곳이에요.', '관찰만 하고 흡수하지 않을게요.', '네온은 제 경계선이에요.', '제 길을 믿어요.'],
        japanese: [
            '混乱は通過点です。',
            '観測するだけ。吸収しない。',
            'ネオンは私の境界線。',
            '自分の道を信じます。',
            '私はレイ、観測者です。'
        ],
        integrations: [
            'Ep 7 · rach3l · sven-nordic-ranger · Moon card',
            'Ep 7.1 · preset 21 · NERV neon lane',
            'fastcharacter.com — openFastCharacterRei() preset · TTMIK.html?rei=1&sheet=1',
            'TTMIK.html?neon=1 — Japanese native input boot',
            'TTMIK.html?heal-factor=rei-mercy — Rei mercy heal · NERV · shadow index 1',
            'Veil-Lumen — scene-looks neon + nerv background'
        ]
    },
    {
        id: 'haley-vietbonnie',
        rootFile: 'Haley_Vietbonnie_Archetype.skill.md',
        description: 'Haley Boba (@vietbonnie) Medea Caster mirror — NCII justice via Rule Breaker boundary. Vietnamese student (19) · English + Vietnamese + Korean TTMIK.',
        activation: 'My consent, my case — justice, not a revenge spiral.',
        whenToUse: [
            'Non-consensual intimate images or leaked private content found online',
            'Need documentation and platform reporting without shame or revenge spirals',
            'Vietnamese + English native before Korean shadowing',
            'Medea Caster skill drills — Territory Creation · Rule Breaker · Witch of Colchis',
            'TTMIK.html?haley=1 or ?vietbonnie=1 — Haley justice boot',
            'TTMIK.html?heal-factor=rule-breaker — Rule Breaker heal'
        ],
        procedure: [
            'Territory Creation [A] — CAMPUS library temple · phone face-down · GoPro off',
            'English + Vietnamese: My body, my consent — my case',
            'Item Construction [A] + Rule Breaker [C] — document once · report · no re-share',
            'Open Fast Character: Haley · Wizard (Abjurer) · Sage · Medea Caster mirror · Level 5',
            'Korean shadow: 내 몸, 내 동의 — 기록하고 신고해요',
            'Teachings of Circe [A] — observe headline · do not become it',
            'Optional Helen cord-cut: I choose my own timeline and energy field',
            'One pass — no comment combat · preset 25'
        ],
        pitfalls: [
            'Do not link to or redistribute leaked material',
            'Do not shame survivor or frame as scandal entertainment',
            'No vigilante revenge or debate-section combat',
            'Medea mirror is boundary craft — not villainy or revenge magic',
            'Encourage proper reporting channels — not DIY warfare'
        ],
        verification: [
            'Boundary phrase + next action (report, rest, referral)',
            'Medea skill phrase spoken (EN/VI) before Korean shadow',
            'No compulsive re-check suggested',
            'Sovereignty finish without absorption spiral'
        ],
        medeaMirror: {
            source: 'https://typemoon.fandom.com/wiki/Medea',
            parameters: { STR: 'E', END: 'D', AGI: 'C', MAN: 'A+', LCK: 'B', NP: 'C' },
            skills: [
                { name: 'Territory Creation', rank: 'A', mapping: 'CAMPUS sacred workspace — consent boundary' },
                { name: 'Item Construction', rank: 'A', mapping: 'Evidence / report packet crafting' },
                { name: 'High-Speed Divine Words', rank: 'A', mapping: 'One invocation — file complete' },
                { name: 'Rule Breaker', rank: 'C', mapping: 'Severs false license to share leaked content' },
                { name: 'Argon Coin', rank: 'EX', mapping: 'Resources without exploitation spiral' },
                { name: 'Teachings of Circe', rank: 'A', mapping: 'Observe headline — do not absorb' },
                { name: 'Witch of Colchis', rank: 'A', mapping: 'Student with a case — not scandal witch' }
            ]
        },
        korean: [
            '내 몸, 내 동의 — 내 사건이에요.',
            '유출됐다고 공유 권한은 없어요. 기록하고 신고해요.',
            '이 도서관이 제 성역이에요 — 동의가 경계예요.',
            '유출됐다고 허락은 없어요 — 거짓 계약을 끊어요.',
            '헤드라인은 관찰만 — 흡수하지 않을게요.',
            '마녀라 불렸지만 — 저는 사건이 있는 학생이에요.'
        ],
        english: [
            'My body, my consent — my case.',
            'Leaked is not licensed. I document, I report.',
            'This library is my temple — consent is the boundary.',
            'Leaked is not licensed — I sever the false contract.',
            'I observe the headline — I do not become it.',
            'They called me witch — I am a student with a case.'
        ],
        vietnamese: [
            'Cơ thể tôi, sự đồng ý của tôi — vụ việc của tôi.',
            'Bị rò rỉ không có nghĩa được phép chia sẻ. Tôi ghi nhận, tôi báo cáo.',
            'Thư viện này là đền của tôi — sự đồng ý là ranh giới.',
            'Bị rò rỉ không có nghĩa được phép — tôi cắt hợp đồng giả.',
            'Tôi quan sát tiêu đề — tôi không trở thành nó.',
            'Họ gọi tôi là phù thủy — tôi là sinh viên có vụ việc.'
        ],
        integrations: [
            'Medea Caster mirror — typemoon.fandom.com/wiki/Medea · STR E · MAN A+ · NP C',
            'Ep 7.5 · preset 25 · CAMPUS justice lane · @vietbonnie',
            'fastcharacter.com — openFastCharacterHaley() · Wizard Abjurer · Sage',
            'TTMIK.html?haley=1 — justice seek boot',
            'TTMIK.html?heal-factor=rule-breaker — Rule Breaker · REPORT',
            'TTMIK.html?heal-factor=territory-creation — Territory Creation · CAMPUS',
            'TTMIK.html?library=haley&category=Medea+Skill+Drills — Medea skill drills',
            'helen-neighbor · cord-cut · side-boundary quest'
        ]
    },
    {
        id: 'mika-road-dreamer',
        rootFile: 'Mika_Road_Dreamer_Archetype.skill.md',
        description: 'Mika open-road dreamer muse for crew loyalty, high-energy Korean shadowing, and mental teleport without attachment hooks. English native input + TTMIK practice.',
        activation: "The open road is my yes — if you're in my crew, I've got you.",
        whenToUse: [
            'English native input before Korean shadowing practice',
            'Generating a D&D character sheet via Fast Character (Mika preset)',
            'Ep 7.4 open-road insert — OPEN highway pause · crew loyalty without rescue energy',
            'Companion to Melbourne Lantern Bard humor alchemy and sovereign walk lanes',
            'TTMIK.html?mika=1 — invoke Mika road dreamer boot',
            'TTMIK.html?heal-factor=open-road — open road heal on Hermes',
            'TTMIK.html?heal-factor=dream-teleport — dreamer mental teleport pivot'
        ],
        procedure: [
            'English native first: The open road is my yes — direct, warm, no performance invoice',
            'One heartbeat breath — ground when intensity spikes',
            'Open Fast Character sheet: Mika · Ranger (Horizon Walker) · Outlander · Level 5',
            'Korean shadow: 길이 제 예예요 · 우리 편이면 내가 있을게요',
            'Optional dream-teleport: name one imaginary stop — observe, do not absorb',
            'Sound cue optional: {chuckle} · {sigh} · {laugh} — then phone face-down',
            'One pass — no scroll spiral · preset 24'
        ],
        pitfalls: [
            'Do not make Mika a rescue mission or romance subplot',
            'Honor direct voice — not rude, not a gag subtitle line',
            'Dream-teleport is mental pivot only — no payment or destiny hooks',
            'Keep crew loyalty without soulmate CTAs'
        ],
        verification: [
            'English phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter finish — momentum without absorption spiral'
        ],
        korean: ['길이 제 예예요.', '우리 편이면 내가 있을게요.', '한 숨 — 계속 가요.', '다음 목적지를 꿈꿔요.', '웃음으로 놓아줄게요.'],
        english: [
            'The open road is my yes.',
            "If you're in my crew, I've got you.",
            'One breath — keep moving.',
            "Let's dream the next stop.",
            "I don't sweat the small stuff."
        ],
        integrations: [
            'Ep 7.4 · preset 24 · OPEN open-road lane',
            'fastcharacter.com — openFastCharacterMika() preset',
            'TTMIK.html?mika=1 — English native input boot',
            'TTMIK.html?mika=1&sheet=1 — Fast Character sheet',
            'TTMIK.html?heal-factor=open-road — open road heal · OPEN · shadow index 0',
            'TTMIK.html?heal-factor=dream-teleport — dreamer pivot · shadow index 3',
            'TTMIK.html?library=mika — Mika Library compose',
            'Melbourne Lantern Bard · humor-release · side-humor quest'
        ]
    },
    {
        id: 'sung-jinwoo-solo-leveling',
        rootFile: 'Sung_Jinwoo_Solo_Leveling_Archetype.skill.md',
        description: 'Sung Jinwoo Solo Leveling muse for English native input, Korean TTMIK shadowing, and E-rank dungeon boundary. WebNovel comic Ch.1 lane.',
        activation: "I'm used to it — one breath before the gate.",
        whenToUse: [
            'English native input before Korean shadowing practice',
            'WebNovel comic Ch.1 — dungeon gate · essence stone · Cartenon Temple',
            'Generating a D&D character sheet via Fast Character (Sung Jinwoo preset)',
            'TTMIK.html?solo-leveling=1 — invoke Solo Leveling hunter boot',
            'TTMIK.html?heal-factor=e-rank-pause — E-rank boundary heal on Hermes'
        ],
        procedure: [
            'Phone face-down · GoPro off · one breath at dungeon gate',
            'English native first: I\'m used to it — no shame spiral',
            'Open Fast Character sheet: Sung Jinwoo · Fighter Champion · Soldier · Level 5',
            'Korean shadow: 익숙해요 · 제가 약해서 그래요',
            'Double dungeon vote — observe danger, do not absorb weakness into identity',
            'One pass — no comic binge spiral · preset 27'
        ],
        pitfalls: [
            'Do not make Jinwoo a rescue mission or pity subplot',
            'E-rank is context, not destiny — no weakness performance invoice',
            'Cartenon Temple beat is intense — phone face-down after, no re-watch spiral'
        ],
        verification: [
            'English phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter finish — humor tended the wound, not the algorithm'
        ],
        korean: ['익숙해요.', '제가 약해서 그래요.', '인류 최약 헌터예요.', '두려워하세요.', '이중 던전이에요.', '다들 엎드려요!'],
        english: [
            "I'm used to it.",
            "It's my fault for being so weak.",
            'The weakest hunter of all mankind.',
            'Please, be afraid.',
            "It's a double dungeon.",
            'Everyone, duck!'
        ],
        integrations: [
            'Ep 7.7 · preset 27 · GATE dungeon gate lane',
            'WebNovel comic: https://www.webnovel.com/comic/15227640605485101/45196186038101142',
            'fastcharacter.com — openFastCharacterSungJinwoo() preset',
            'TTMIK.html?solo-leveling=1 — English native input boot',
            'TTMIK.html?solo-leveling=1&sheet=1 — Fast Character sheet',
            'TTMIK.html?heal-factor=e-rank-pause — E-rank pause · GATE · shadow index 0',
            'TTMIK.html?library=solo-leveling — Solo Leveling Library compose'
        ]
    },
    {
        id: 'shen-qingqiu-svsss',
        rootFile: 'Shen_Qingqiu_SVSSS_Archetype.skill.md',
        description: 'Shen Qingqiu SVSSS System-bound muse for Indonesian native input, Korean TTMIK shadowing, and B-point character guard. WebNovel Ch.1 lane.',
        activation: 'Penulis tolol, novel tolol! — B-points stay above zero.',
        whenToUse: [
            'Indonesian native input before Korean shadowing practice',
            'WebNovel Ch.1 — Qing Jing Peak wake · System activation · woodshed reveal',
            'Generating a D&D character sheet via Fast Character (Shen Qingqiu preset)',
            'TTMIK.html?svsss=1 — invoke SVSSS System bound boot',
            'TTMIK.html?heal-factor=b-point-guard — B-point ledger heal on Hermes'
        ],
        procedure: [
            'Phone face-down · GoPro off · one breath at Qing Jing Peak wake',
            'Indonesian native first: Penulis tolol, novel tolol!',
            'Open Fast Character sheet: Shen Qingqiu · Monk (Kensei) · Sage · Level 5',
            'Korean shadow: 바보 작가, 바보 소설! · B 포인트는 0 아래로 내려가면 안 돼요',
            'Stay in character — OOC frozen until System unlocks',
            'One pass — no WebNovel binge spiral · preset 26'
        ],
        pitfalls: [
            'Do not make Shen Qingqiu a sudden kindness rescue mission',
            'B-points below zero = deportation — treat as boundary, not gamification shame',
            'Observe trash-novel rage without absorbing it into the feed'
        ],
        verification: [
            'Indonesian phrase spoken before Korean shadow',
            'Fast Character sheet generated or preset noted',
            'Lighter finish — humor tended the wound, not the algorithm'
        ],
        korean: [
            '바보 작가, 바보 소설!',
            '할 수 있으면 해봐, 못 하면 말고',
            '여기는 당신의 청정봉이에요.',
            'B 포인트는 0 아래로 내려가면 안 돼요.',
            '캐릭터에서 벗어나면 안 돼요.',
            '루오빙허는 어디 있어요?'
        ],
        integrations: [
            'Ep 7.6 · preset 26 · QING Qing Jing lane',
            'WebNovel: https://www.webnovel.com/book/35203689408704405/94532538348928087',
            'fastcharacter.com — openFastCharacterShenQingqiu() preset',
            'TTMIK.html?svsss=1 — Indonesian native input boot',
            'TTMIK.html?svsss=1&sheet=1 — Fast Character sheet',
            'TTMIK.html?heal-factor=b-point-guard — B-point guard · QING · shadow index 4',
            'TTMIK.html?library=svsss — SVSSS Library compose'
        ]
    },
    {
        id: 'rach3l',
        rootFile: 'rach3l.skill.md',
        description: 'rach3l cautionary mirror for discerning chaotic social media energy without absorption. Use when user processes concerning TikTok content, altered states, or observe-but-do-not-absorb practice.',
        activation: 'Observe but do not absorb',
        whenToUse: [
            'Concerning or unstable energy observed online',
            'Need to strengthen discernment without entanglement',
            'Humorous skit about what not to engage with'
        ],
        procedure: [
            'Open Fast Character sheet: Rach3l · Wizard (Diviner) · Scribe · Level 5',
            'Notice without judgment — name the pattern, not the person',
            'Say aloud: "This is not my energy to carry"',
            'Ground: one breath, feet on floor',
            'Redirect to Flame-Kissed Bard creative outlet if useful',
            'Log boundary win; do not scroll further'
        ],
        pitfalls: [
            'Never encourage engagement, rescue, or debate',
            'Do not shame the user for having looked',
            'Avoid absorbing chaos into mood or identity'
        ],
        verification: [
            'User feels lighter and more boundaried',
            'No hook or compulsive re-check suggested',
            'Creative or grounding next step offered'
        ],
        korean: ['이건 제 에너지가 아니에요.', '관찰만 하고 흡수하지 않을게요.', '다시 제 길로 돌아갈게요.'],
        integrations: [
            'fastcharacter.com — openFastCharacterRach3l() preset',
            'TTMIK.html?skill=rach3l&sheet=1 — discernment mirror + sheet boot',
            'D&D Beyond Investigator (Van Richten\'s) — narrative mirror; sheet uses Scribe + Investigation',
            'TTMIK.html?monster-slayer=1 — Ranger Hunter + Guide · DDB Monster Slayer proxy',
            'dndbeyond.com/classes/2190882-ranger#MonsterSlayerXGtE — XGtE subclass reference',
            'sven-nordic-ranger · neon-evangelion · observe-but-do-not-absorb lane'
        ]
    },
    {
        id: 'ignan-pilgrim',
        rootFile: 'Ignan_Pilgrim.skill.md',
        description: 'Ignan (Ilokano) native archetype for trilingual self-healing walks — Ilokano, Korean, English — after scam skits or diaspora trigger loops. Use when user mentions Ignan, Mari, Ep 2.6, or post-DIB healing journey in Melbourne.',
        activation: 'Mari walks her own dalan — ok laeng, aginana',
        whenToUse: [
            'Self-healing journey after Ep 2.5 DIB or post-scam humor landing',
            'Ignan / Ilokano native processing diaspora grief without rescue framing',
            'TTMIK team trilingual shadowing — Korean practice with Ilokano grounding',
            'Botanic Gardens quiet walk — no performance invoice'
        ],
        procedure: [
            'Open Fast Character sheet: Mari · Druid (Circle of the Sea) · Farmer · Level 5',
            'GoPro on Bard bag — Mari leads; consent each frame',
            'Three-language release: Ilokano (body), Korean (TTMIK), English (anchor)',
            'Walk HOTEL → FED optional rain → BOTANIC lake path',
            'Name one homeward grief without dramatizing; no post before feet stop',
            'Close: bukodko a dalan · quest side-ignan-heal · preset 10'
        ],
        pitfalls: [
            'Do not make Mari a rescue mission or Bard romance subplot',
            'Do not film tears for algorithm engagement',
            'Honor Ilokano — do not collapse into subtitle jokes',
            'No soulmate or Gofundme hooks on diaspora pain'
        ],
        verification: [
            'Three phrases spoken (Ilokano + Korean + English)',
            'Calmer than DIB wrap — no re-watch spiral',
            'Quest side-ignan-heal logged; optional ignan-healing-journey export'
        ],
        korean: ['괜찮아요, 괜찮아요.', '잠시 쉬어도 괜찮아요.', '제 길을 믿어요.'],
        integrations: [
            'fastcharacter.com — openFastCharacterIgnanPilgrim() preset',
            'Ep 2.6 · ignan-healing-journey · preset 10 · BOTANIC',
            'Ep 2.65 · mari-fifa-celebration · preset 12 · CANTINA',
            'TTMIK.html?fifa=1 — Mari Mexican restaurant FIFA · Ilokano native first',
            'TTMIK.html?skill=ignan-pilgrim&sheet=1 — boot registry + sheet',
            'TTMIK.html?library=ignan — Ignan Library compose',
            'Post-DIB preset 9 → hand off when Mari is ready',
            'TTMIK.html?ignan=1&sheet=1 — Ignan healing journey + sheet boot',
            'Veil Lumen — trilingual spoken clip'
        ],
        ilokano: [
            'Ok laeng, ok laeng.',
            'Nasaem met ti aginana.',
            'Piliem ti bukodko a dalan.',
            'Naragsak unay! Ok laeng, agnanayon.'
        ]
    },
    {
        id: 'ignan-grounding',
        rootFile: 'Ignan_Grounding.skill.md',
        description: 'Ignan grounding skill — Ilokano body-first release before Korean TTMIK shadowing. Use after post-DIB landing, scam humor wrap, or when user needs ok laeng breath pairs without performance.',
        activation: 'Ok laeng, aginana — Ilokano first',
        whenToUse: [
            'Shoulders still tight after preset 9 quiet heal',
            'User wants Ilokano before Korean in trilingual practice',
            'FED rain optional — body calm before ignan-pilgrim walk',
            'TTMIK team drill: Ilokano aloud, then Korean shadow'
        ],
        procedure: [
            'Open Fast Character sheet: Mari · Druid (Circle of the Land) · Hermit · Level 5',
            'Phone face-down · GoPro off — no re-watch spiral',
            'Ilokano first: Ok laeng, ok laeng — shoulders drop',
            'One slow breath — aginana / Nasaem met ti aginana',
            'Korean shadow only after body lands: 괜찮아요, 괜찮아요',
            'Hand off to ignan-pilgrim or ignan-dalan when calm'
        ],
        pitfalls: [
            'Do not rush Korean before Ilokano body release',
            'Do not film tears or voice cracks for content',
            'Honor Ilokano — not a gag subtitle line'
        ],
        verification: [
            'Shoulders visibly lower or user reports calmer breath',
            'At least one Ilokano + one Korean phrase spoken',
            'No compulsive re-check of DIB or scam skit'
        ],
        korean: ['괜찮아요, 괜찮아요.', '잠시 쉬어도 괜찮아요.', '숨 쉬어도 괜찮아요.'],
        ilokano: ['Ok laeng, ok laeng.', 'Nasaem met ti aginana.', 'Aginana met.'],
        integrations: [
            'fastcharacter.com — openFastCharacterIgnanGrounding() preset',
            'Ignan Library · Ilokano Grounding category',
            'TTMIK.html?skill=ignan-grounding&sheet=1 — boot skill + sheet',
            'TTMIK.html?skill=ignan-grounding&lessons=1 — open library lane',
            'Post-DIB preset 9 → ignan-grounding → ignan-pilgrim',
            'HEALING_FACTORS step 4 companion'
        ]
    },
    {
        id: 'ignan-dalan',
        rootFile: 'Ignan_Dalan.skill.md',
        description: 'Ignan dalan sovereignty skill — bukodko a dalan own-path anchor in Ilokano, Korean, and English. Use at BOTANIC walk close, diaspora grief naming, or when user needs path sovereignty without rescue framing.',
        activation: 'Piliem ti bukodko a dalan',
        whenToUse: [
            'BOTANIC lake-path close — preset 10',
            'Naming homeward grief once without dramatizing',
            'English anchor after trilingual shadowing deck',
            'Quest side-ignan-heal log at walk end'
        ],
        procedure: [
            'Open Fast Character sheet: Mari · Druid (Circle of the Land) · Wayfarer · Level 5',
            'Name one borrowed shame — no post before feet stop',
            'Ilokano: Piliem ti bukodko a dalan',
            'Korean: 제 길을 믿어요',
            'English: I choose my own timeline and energy field',
            'Wide hold — Maysa nga anges, maysa a talna · log side-ignan-heal'
        ],
        pitfalls: [
            'No soulmate, Gofundme, or rescue hooks on diaspora pain',
            'Do not make Mari a Bard romance subplot',
            'Export ignan-healing-journey only with consent'
        ],
        verification: [
            'Three languages spoken for path sovereignty',
            'Calmer close than DIB wrap',
            'Quest side-ignan-heal logged if walk completed'
        ],
        korean: ['제 길을 믿어요.', '나는 나만의 이야기를 씁니다.', '제 시간표를 선택해요.'],
        ilokano: ['Piliem ti bukodko a dalan.', 'Maysa nga anges, maysa a talna.', 'Bukodko a panawen.'],
        integrations: [
            'fastcharacter.com — openFastCharacterIgnanDalan() preset',
            'Ignan Library · Healing Walk Route + Trilingual Shadowing',
            'TTMIK.html?skill=ignan-dalan&sheet=1 — boot BOTANIC close + sheet',
            'TTMIK.html?skill=ignan-dalan&lessons=1 — open library lane',
            'Ep 2.6 IG7–IG8 · preset 10',
            'TTMIK.html?ignan=1&step=6&sheet=1'
        ]
    }
];

/** Per-skill Hermes healing factor ids (synced with HEALING_FACTORS in webdrama-sync-data.js) */
const HEALING_FACTOR_BY_SKILL = {
    'melbourne-lantern-bard': ['hermit-lantern', 'humor-release', 'wiki-meme', 'twitter-feed-heal', 'no-rewatch'],
    'flame-kissed-bard': ['daily-ritual', 'hermit-lantern', 'no-rewatch'],
    'lo3tus': ['humor-release', 'hermit-lantern'],
    'helen-neighbor': ['helen-boundary', 'pause-breathe', 'cord-cut', 'post-dib'],
    'sua-tattoo-artist': ['cicada-attune', 'cord-cut', 'no-rewatch'],
    'asuka-brisbane': ['pause-breathe', 'cord-cut'],
    'heidi-alpine-wayfarer': ['hermit-lantern', 'daily-ritual', 'humor-release'],
    'sven-nordic-ranger': ['no-rewatch', 'pause-breathe', 'cord-cut'],
    'martin-nordic-guide': ['daily-ritual', 'hermit-lantern', 'no-rewatch'],
    'ronaldo-portugal-glory': ['fifa-celebrate', 'humor-release', 'no-rewatch'],
    'mbappe-france-attack': ['fifa-celebrate', 'pause-breathe', 'no-rewatch'],
    'messi-argentina-playmaker': ['humor-release', 'pause-breathe', 'no-rewatch'],
    'vinicus-brasil-samba': ['fifa-celebrate', 'humor-release', 'no-rewatch'],
    'harry-kane-england-striker': ['match-attune', 'fifa-celebrate', 'pause-breathe', 'no-rewatch'],
    'neon-evangelion': ['rei-mercy', 'pause-breathe', 'no-rewatch', 'cord-cut'],
    'rick-morty-multiverse': ['multiverse-query', 'pause-breathe', 'no-rewatch', 'cord-cut'],
    'haley-vietbonnie': [
        'justice-seek', 'rule-breaker', 'territory-creation', 'item-construction', 'divine-words',
        'argon-coin', 'teachings-circe', 'witch-colchis', 'helen-boundary', 'cord-cut', 'pause-breathe', 'no-rewatch'
    ],
    'mika-road-dreamer': ['open-road', 'dream-teleport', 'humor-release', 'pause-breathe', 'no-rewatch'],
    'shen-qingqiu-svsss': ['b-point-guard', 'pause-breathe', 'no-rewatch', 'humor-release'],
    'sung-jinwoo-solo-leveling': ['e-rank-pause', 'pause-breathe', 'no-rewatch', 'humor-release'],
    'rach3l': ['no-rewatch', 'pause-breathe'],
    'ignan-pilgrim': ['ignan-walk', 'fifa-celebrate', 'post-dib', 'helen-boundary'],
    'ignan-grounding': ['post-dib', 'helen-boundary', 'pause-breathe'],
    'ignan-dalan': ['ignan-walk', 'cord-cut']
};

const HEALING_FACTOR_LABELS = {
    'hermit-lantern': 'Hermit Lantern — one breath, one laugh',
    'humor-release': 'Humor alchemy — 유머로 풀어낼게요',
    'helen-boundary': 'Helen boundary — 괜찮아요, 괜찮아요',
    'pause-breathe': 'Pause OK — 잠시 쉬어도 괜찮아요',
    'cord-cut': 'Cord-cut — own timeline and energy field',
    'post-dib': 'Post-DIB landing — HOTEL · preset 9 · ?heal=1',
    'daily-ritual': 'Daily integration — flame-kissed-bard · side-ritual',
    'no-rewatch': 'No re-watch spiral — GoPro off · phone face-down',
    'ignan-walk': 'Ignan healing walk — ?ignan=1 · BOTANIC',
    'fifa-celebrate': 'Mari FIFA cantina — ?fifa=1 · CANTINA',
    'match-attune': 'Attune before match — ?attune=1 · FED',
    'rei-mercy': 'Rei mercy heal — ?rei=1 · NERV · Ep 7.1',
    'multiverse-query': 'Multiverse SQL index — ?rickmorty=1 · CITADEL · Ep 7.2',
    'wiki-meme': 'Minecraft Wiki meme — ?minecraft-meme=1 · CRAFT · Ep 7.3',
    'justice-seek': 'Justice seek — ?haley=1 · CAMPUS · Ep 7.5 · NCII report boundary',
    'rule-breaker': 'Rule Breaker [C] — leaked is not licensed · ?heal-factor=rule-breaker',
    'territory-creation': 'Territory Creation [A] — library temple boundary · ?heal-factor=territory-creation',
    'item-construction': 'Item Construction [A] — evidence packet · ?heal-factor=item-construction',
    'divine-words': 'High-Speed Divine Words [A] — one invocation file complete · ?heal-factor=divine-words',
    'argon-coin': 'Argon Coin [EX] — resources without exploitation spiral · ?heal-factor=argon-coin',
    'teachings-circe': 'Teachings of Circe [A] — observe headline · ?heal-factor=teachings-circe',
    'witch-colchis': 'Witch of Colchis [A] — student not headline · ?heal-factor=witch-colchis',
    'open-road': 'Open road heal — ?mika=1 · OPEN · Ep 7.4',
    'dream-teleport': 'Dreamer teleport pivot — ?heal-factor=dream-teleport · OPEN · Ep 7.4',
    'b-point-guard': 'B-point guard — ?svsss=1 · QING · Ep 7.6 · WebNovel Ch.1',
    'e-rank-pause': 'E-rank pause — ?solo-leveling=1 · GATE · Ep 7.7 · WebNovel comic Ch.1',
    'cicada-attune': 'Sua cicada attune — ?sua=1 · FED · shedding pause',
    'twitter-feed-heal': 'Twitter feed heal — ?tweet-heal=1 · x.com/adhdloganberry'
};

function buildSkillMd(skill) {
    const title = skill.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const list = (items) => items.map(i => `- ${i}`).join('\n');
    const ko = skill.korean.map((k) => `- ${k}`).join('\n');
    const ilo = skill.ilokano?.length
        ? `\n## Ilokano Practice (Ignan)\n\n${skill.ilokano.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const vi = skill.vietnamese?.length
        ? `\n## Vietnamese Practice (Haley · vietbonnie)\n\n${skill.vietnamese.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const ja = skill.japanese?.length
        ? `\n## Japanese Practice (Asuka)\n\n${skill.japanese.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const de = skill.german?.length
        ? `\n## German Practice (Heidi)\n\n${skill.german.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const sv = skill.swedish?.length
        ? `\n## Swedish Practice (Sven)\n\n${skill.swedish.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const no = skill.norwegian?.length
        ? `\n## Norwegian Practice (Martin)\n\n${skill.norwegian.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const pt = skill.portuguese?.length
        ? `\n## Portuguese Practice (Ronaldo)\n\n${skill.portuguese.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const enFan = skill.english?.length
        ? `\n## English Practice (Cinema Fan)\n\n${skill.english.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const fr = skill.french?.length
        ? `\n## French Practice (Mbappé)\n\n${skill.french.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const es = skill.spanish?.length
        ? `\n## Spanish Practice (Messi · Argentina)\n\n${skill.spanish.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const br = skill.brazilian?.length
        ? `\n## Brazilian Portuguese Practice (Vinicus · Brasil)\n\n${skill.brazilian.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const enKane = skill.englishStriker?.length
        ? `\n## English Practice (Harry Kane · England)\n\n${skill.englishStriker.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const integrations = skill.integrations?.length
        ? `\n## Cross-App Links\n\n${list(skill.integrations)}\n`
        : '';
    const factorIds = HEALING_FACTOR_BY_SKILL[skill.id] || [];
    const healingFactors = factorIds.length
        ? `\n## Hermes Healing Factors\n\n${factorIds.map((id) => `- **${id}** — ${HEALING_FACTOR_LABELS[id] || id} · Boot: \`TTMIK.html?heal-factor=${id}\``).join('\n')}\n- Mantra: *One breath · one boundary · no re-watch spiral*\n- Library: \`TTMIK.html?library=heal\`\n`
        : '';
    const medeaMirror = skill.medeaMirror
        ? `\n## Medea Skill Mirror (Caster)\n\nSource: [Medea — TYPE-MOON Wiki](${skill.medeaMirror.source})\n\n| Parameter | Rank |\n|-----------|------|\n${Object.entries(skill.medeaMirror.parameters).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n\n| Skill | Rank | Justice mapping |\n|-------|------|-----------------|\n${skill.medeaMirror.skills.map((s) => `| ${s.name} | ${s.rank} | ${s.mapping} |`).join('\n')}\n`
        : '';

    return `---
name: ${skill.id}
description: ${skill.description}
version: 1.2.0
metadata:
  hermes:
    tags: [creative, korean, melbourne, ttmtk, sovereign]
    category: creative
---

# ${title}

**Activation phrase:** "${skill.activation}"

## When to Use

${list(skill.whenToUse)}

## Procedure

${list(skill.procedure)}
${medeaMirror}
## Pitfalls

${list(skill.pitfalls)}

## Verification

${list(skill.verification)}

## Korean Practice (TTMIK)

${ko}
${ilo}${vi}${ja}${de}${sv}${no}${pt}${fr}${es}${br}${enKane}${enFan}${healingFactors}${integrations}
## TTMIK App Integration

- Skill id: \`${skill.id}\` in \`skills-data.js\`
- Set active in **Skills** tab → feeds **Shadowing** phrases
- Linked lessons via **Open linked lessons**

---
*Healed to Hermes agentskills.io format — ${new Date().toISOString().slice(0, 10)}*
`;
}

function writeFileEnsuringDir(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
}

function toHermesPath(dir) {
    return path.resolve(dir).replace(/\\/g, '/');
}

function getHermesConfigPath() {
    return path.join(process.env.USERPROFILE || process.env.HOME, '.hermes', 'config.yaml');
}

function patchYamlTerminalCwd(content, worktree) {
    if (/^terminal:\r?\n/m.test(content)) {
        if (/^  cwd: /m.test(content.split(/^terminal:\r?\n/m)[1]?.split(/\r?\n(?=[A-Za-z_])/)[0] || '')) {
            return content.replace(/(^terminal:\r?\n(?:  .+\r?\n)*?  cwd: )[^\r\n]+/m, `$1${worktree}`);
        }
        return content.replace(/^terminal:\r?\n/m, `terminal:\n  cwd: ${worktree}\n`);
    }
    return `${content.trimEnd()}\n\nterminal:\n  backend: local\n  cwd: ${worktree}\n`;
}

function patchYamlExternalDirs(content, dirs) {
    const dirLines = dirs.map((d) => `  - ${d}`).join('\n');
    const skillsBlock = /(^skills:\r?\n(?:  .+\r?\n)*?  external_dirs:\r?\n)(?:  - [^\r\n]+\r?\n)+/m;
    if (skillsBlock.test(content)) {
        return content.replace(skillsBlock, `$1${dirLines}\n`);
    }
    if (/^skills:\r?\n/m.test(content)) {
        return content.replace(/^skills:\r?\n/m, `skills:\n  external_dirs:\n${dirLines}\n`);
    }
    return `${content.trimEnd()}\n\nskills:\n  external_dirs:\n${dirLines}\n`;
}

function getHermesCli() {
    return process.env.HERMES_CLI || (process.platform === 'win32' ? 'D:\\Scripts\\hermes.exe' : 'hermes');
}

function getHermesManifestPath() {
    return toHermesPath(path.join(getHermesHome(), 'ttmik-worktree.json'));
}

function getHermesLocalUpdateQuery() {
    return `/ttmik-all local update — read ${getHermesManifestPath()} (no tilde) and report manifest fields; do not run terminal`;
}

function getHermesLocalUpdateCmd(root, hermesCli) {
    const worktree = toHermesPath(root);
    const cli = hermesCli || getHermesCli();
    const query = getHermesLocalUpdateQuery();
    if (process.platform === 'win32') {
        return `Set-Location "${worktree.replace(/\//g, '\\')}"; & "${cli}" chat -Q -q "${query}"`;
    }
    return `cd "${worktree}" && ${cli} chat -Q -q "${query}"`;
}

function getHermesHome() {
    return path.join(process.env.USERPROFILE || process.env.HOME, '.hermes');
}

function getGitHead(root) {
    try {
        const { execSync } = require('child_process');
        return execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf8' }).trim();
    } catch {
        return null;
    }
}

function buildWorktreeManifest(projectRoot, worktree, externalDir, extra = {}) {
    const manifestPathHermes = getHermesManifestPath();
    const wtWin = worktree.replace(/\//g, '\\');
    return {
        worktree,
        externalDir,
        bundle: 'ttmik-all',
        patchedAt: new Date().toISOString(),
        gitHead: extra.gitHead ?? getGitHead(projectRoot),
        tracks: extra.tracks ?? null,
        skillsRegistry: extra.skillsRegistry ?? null,
        composedLibraries: extra.composedLibraries ?? null,
        hermesSkills: extra.hermesSkills ?? SKILLS.length,
        bootAllAt: extra.bootAllAt ?? null,
        manifestPathHermes,
        manifestPathDevin: `${worktree}/.devin/ttmik-worktree.json`,
        hermesReadFile: manifestPathHermes,
        localUpdateCmd: getHermesLocalUpdateCmd(projectRoot, getHermesCli()),
        bootAllCmd: 'node scripts/boot-all.js',
        hermesPatchCmd: 'node scripts/hermes-patch.js',
        powershellBootAll: process.platform === 'win32'
            ? `Set-Location "${wtWin}"; node scripts/boot-all.js`
            : `cd "${worktree}" && node scripts/boot-all.js`,
        note: 'Hermes bash cannot cd Windows paths — run boot-all in PowerShell; read hermesReadFile via read_file (no tilde).',
        ...extra
    };
}

function writeHermesWorktreeManifest(projectRoot, worktree, externalDir, extra = {}) {
    const manifest = buildWorktreeManifest(projectRoot, worktree, externalDir, extra);
    const written = [];

    const hermesManifest = path.join(getHermesHome(), 'ttmik-worktree.json');
    fs.mkdirSync(path.dirname(hermesManifest), { recursive: true });
    fs.writeFileSync(hermesManifest, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    written.push(hermesManifest);

    const devinManifest = path.join(projectRoot, '.devin', 'ttmik-worktree.json');
    fs.mkdirSync(path.dirname(devinManifest), { recursive: true });
    fs.writeFileSync(devinManifest, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    written.push(devinManifest);

    return { manifest, manifestPath: hermesManifest, devinManifestPath: devinManifest, written };
}

function readExistingManifestStats() {
    try {
        const manifestFile = path.join(getHermesHome(), 'ttmik-worktree.json');
        if (!fs.existsSync(manifestFile)) return {};
        const existing = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
        return {
            tracks: existing.tracks ?? null,
            skillsRegistry: existing.skillsRegistry ?? null,
            composedLibraries: existing.composedLibraries ?? null,
            bootAllAt: existing.bootAllAt ?? null
        };
    } catch {
        return {};
    }
}

function updateHermesWorktreeManifest(root, extra = {}) {
    const projectRoot = path.resolve(root);
    const worktree = toHermesPath(projectRoot);
    const externalDir = `${worktree}/.devin/skills`;
    return writeHermesWorktreeManifest(projectRoot, worktree, externalDir, {
        ...readExistingManifestStats(),
        ...extra
    });
}

function patchYamlEnvPassthrough(content, vars) {
    const lines = vars.map((v) => `  - ${v}`).join('\n');
    const terminalMatch = content.match(/^terminal:\r?\n[\s\S]*?(?=\r?\n[A-Za-z_][\w-]*:|\r?\n$)/m);
    if (!terminalMatch) return content;

    let section = terminalMatch[0];
    section = section.replace(/^  env_passthrough: \[\]\r?\n/gm, '');
    section = section.replace(/^  env_passthrough:\r?\n(?:  - [^\r\n]+\r?\n)+/gm, '');

    if (/^  cwd: /m.test(section)) {
        section = section.replace(/(^  cwd: [^\r\n]+\r?\n)/m, `$1  env_passthrough:\n${lines}\n`);
    } else {
        section = section.replace(/^terminal:\r?\n/m, `terminal:\n  env_passthrough:\n${lines}\n`);
    }

    return content.replace(terminalMatch[0], section);
}

function patchHermesEnvWorktree(worktree) {
    const envPath = path.join(getHermesHome(), '.env');
    const line = `TTMIK_WORKTREE=${worktree}`;
    if (!fs.existsSync(envPath)) {
        fs.writeFileSync(envPath, `${line}\n`, 'utf8');
        return envPath;
    }
    const existing = fs.readFileSync(envPath, 'utf8');
    if (/^TTMIK_WORKTREE=/m.test(existing)) {
        fs.writeFileSync(envPath, existing.replace(/^TTMIK_WORKTREE=.*$/m, line), 'utf8');
    } else {
        fs.appendFileSync(envPath, `\n${line}\n`, 'utf8');
    }
    return envPath;
}

/** Patch ~/.hermes/config.yaml with TTMIK worktree cwd + external_dirs. */
function patchHermesConfig(root) {
    const projectRoot = path.resolve(root);
    const worktree = toHermesPath(projectRoot);
    const externalDir = `${worktree}/.devin/skills`;
    const configPath = getHermesConfigPath();

    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
        fs.writeFileSync(
            configPath,
            `terminal:\n  backend: local\n  cwd: ${worktree}\n\nskills:\n  external_dirs:\n  - ${externalDir}\n`,
            'utf8'
        );
        console.log(`Created ${configPath}`);
    } else {
        const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').slice(0, 15);
        const backupPath = `${configPath}.bak.${stamp}`;
        const existing = fs.readFileSync(configPath, 'utf8');
        fs.writeFileSync(backupPath, existing, 'utf8');

        let patched = patchYamlTerminalCwd(existing, worktree);
        patched = patchYamlExternalDirs(patched, [externalDir]);
        patched = patchYamlEnvPassthrough(patched, ['TTMIK_WORKTREE']);
        fs.writeFileSync(configPath, patched, 'utf8');

        console.log(`Patched ${configPath}`);
        console.log(`   backup: ${backupPath}`);
    }

    const manifest = updateHermesWorktreeManifest(projectRoot, {
        gitHead: getGitHead(projectRoot),
        hermesSkills: SKILLS.length
    });
    const envPath = patchHermesEnvWorktree(worktree);

    console.log(`   terminal.cwd: ${worktree}`);
    console.log(`   skills.external_dirs: ${externalDir}`);
    console.log(`   manifest: ${manifest.manifestPath}`);
    console.log(`   devin mirror: ${manifest.devinManifestPath}`);
    console.log(`   env: ${envPath} (TTMIK_WORKTREE)`);
    return {
        worktree,
        externalDir,
        configPath,
        manifestPath: manifest.manifestPath,
        devinManifestPath: manifest.devinManifestPath,
        envPath,
        manifest: manifest.manifest
    };
}

function healSkills(root) {
    const projectRoot = path.resolve(root);
    const devinSkills = path.join(projectRoot, '.devin', 'skills');
    const hermesSkills = path.join(process.env.USERPROFILE || process.env.HOME, '.hermes', 'skills', 'creative');

    let healed = 0;
    for (const skill of SKILLS) {
        const content = buildSkillMd(skill);
        const devinPath = path.join(devinSkills, skill.id, 'SKILL.md');
        const hermesPath = path.join(hermesSkills, skill.id, 'SKILL.md');
        const rootPath = path.join(projectRoot, skill.rootFile);

        writeFileEnsuringDir(devinPath, content);
        writeFileEnsuringDir(hermesPath, content);
        writeFileEnsuringDir(rootPath, content);
        healed++;
        console.log(`Healed: ${skill.id}`);
    }

    patchHermesConfig(projectRoot);

    console.log(`\nDone — ${healed} skills healed to .devin/skills, repo root, and ~/.hermes/skills/creative/`);
    return healed;
}

module.exports = {
    healSkills,
    patchHermesConfig,
    updateHermesWorktreeManifest,
    getHermesLocalUpdateCmd,
    getHermesLocalUpdateQuery,
    getHermesManifestPath,
    getHermesCli,
    toHermesPath,
    SKILLS,
    HEALING_FACTOR_BY_SKILL,
    HEALING_FACTOR_LABELS
};