/**
 * Melbourne Lantern webdrama ↔ TTMIK sync map
 * Pins, episodes, and reels → skills, lesson categories, shadowing, quest objectives
 * Bardic inspiration unifies TTMIK · lets-cook · girls-love · Veil-Lumen · RTDB · video-editor
 */

/** Cross-app pipeline — shoot order pulls optimised times from lets-cook transportSchedule */
const PIPELINE_SOURCES = {
    ttmik: {
        label: 'TTMIK Skills & Quest',
        paths: ['skills-data.js', 'Melbourne_Lantern_Bard.skill.md'],
        url: 'TTMIK.html',
        role: 'Shadowing · RED FLAGS · pilgrimage quest'
    },
    letsCook: {
        label: 'lets-cook · Date Night',
        paths: ['lets-cook/src/data/dateNightCookOff.js', 'lets-cook/src/data/transportSchedule.js'],
        url: 'http://localhost:5173/date-night',
        role: 'Degraves outing · 45 min cook-off · RTDB schedule phase 0'
    },
    girlsLove: {
        label: 'girls-love · After the Date',
        paths: ['girls-love/data/afterTheDate.js'],
        url: 'http://localhost:5190',
        role: 'Ch.1–4 novel beats · dawn Degraves · post-score dishes'
    },
    veilLumen: {
        label: 'Veil-Lumen · mesh & softbody',
        paths: ['Veil-Lumen/js/skills-data.js'],
        url: 'http://localhost:5181',
        role: 'Bardic ritual · skill veil outputs · essay assembly'
    },
    creativeCorner: {
        label: 'Creative Corner · X for creatives',
        paths: ['creative-corner-twitter/index.html'],
        url: 'http://localhost:5180',
        role: 'Portfolio · one-click X posts · @adhdloganberry webhook'
    },
    rtdb: {
        label: 'RTDB-Auckland',
        paths: ['RTDB-Auckland/rtdb-config.json', 'lets-cook/src/data/rtdb-config.json'],
        role: 'Waitemata / Britomart depart · 30s refresh · 45s rotation before AKL leg'
    },
    videoEditor: {
        label: 'video-editor · Multiformat',
        paths: ['webdrama-edit-data.js', 'video-editor/melbourne-lantern-edits.json'],
        url: 'http://localhost:8000',
        role: 'Reel A/B · Ep 2.5 DIB · date-night-cookoff · after-the-date exports'
    },
    audit: {
        label: 'Tarot-scam audit',
        paths: ['audit/tarot-scam-avoidance-audit.md'],
        role: 'Scam PSA · divine insight · RED FLAG inventory'
    },
    rickmortySql: {
        label: 'Rick & Morty SQL multiverse',
        paths: ['rickmorty-sql/README.md', 'rickmorty-data.js'],
        url: 'TTMIK.html?rickmorty=1',
        role: 'PostgreSQL rickmorty schema · Ep 7.2 Citadel · dimension index'
    },
    minecraftWikiMeme: {
        label: 'Minecraft Wiki meme generator',
        paths: ['minecraft-meme-data.js', 'minecraft-meme-generator.js'],
        url: 'TTMIK.html?minecraft-meme=1',
        role: 'Hipposgrumm parody articles · humor alchemy · minecraft.wiki'
    },
    mikaOpenRoad: {
        label: 'Mika open-road dreamer',
        paths: ['mika-data.js', 'Mika_Road_Dreamer_Archetype.skill.md'],
        url: 'TTMIK.html?mika=1',
        role: 'Ep 7.4 OPEN highway pause · crew loyalty · dream-teleport heal'
    },
    haleyJustice: {
        label: 'Haley Boba justice seek',
        paths: ['haley-data.js', 'Haley_Vietbonnie_Archetype.skill.md'],
        url: 'TTMIK.html?haley=1',
        role: 'Ep 7.5 CAMPUS · @vietbonnie · Medea Caster skills · NCII report boundary · no re-share'
    },
    svsssWebnovel: {
        label: 'SVSSS System bound · WebNovel Ch.1',
        paths: ['svsss-data.js', 'Shen_Qingqiu_SVSSS_Archetype.skill.md'],
        url: 'TTMIK.html?svsss=1',
        role: 'Ep 7.6 QING · Indonesian ID translation · B-point guard · OOC frozen'
    },
    soloLevelingComic: {
        label: 'Solo Leveling · WebNovel comic Ch.1',
        paths: ['solo-leveling-data.js', 'Sung_Jinwoo_Solo_Leveling_Archetype.skill.md'],
        url: 'TTMIK.html?solo-leveling=1',
        role: 'Ep 7.7 GATE · E-rank dungeon · Cartenon Temple · e-rank-pause'
    },
    boysLove: {
        label: 'boys-love · After the Bamboo',
        paths: ['boys-love/data/afterTheBamboo.js', 'boys-love-data.js', 'Boys_Love_Qing_Binghe_Archetype.skill.md'],
        url: 'http://localhost:5191',
        role: 'Ep 7.8 BAMBOO · Qingqiu/Binghe slow-burn · disciple-not-rescue · woodshed truce'
    },
    webnovelCrossover: {
        label: 'Webnovel crossover · SVSSS · Solo · BL',
        paths: ['webnovel-crossover-data.js', 'svsss-data.js', 'solo-leveling-data.js', 'boys-love-data.js'],
        url: 'TTMIK.html?library=webnovel-crossover',
        role: 'Ep 7.9 CROSS · three-lane handoff · one breath · no binge spiral'
    },
    webnovelPackage: {
        label: 'WebNovel Package · canonical catalog',
        paths: ['webnovel-catalog-data.js', 'webnovel-package-data.js', 'scripts/build-webnovel-catalog.js'],
        url: 'TTMIK.html?library=webnovel-package',
        role: 'webnovel.com TOC — SVSSS 109 ch ID · Solo 202 ch comic · chapter packs'
    }
};

/** Bardic inspiration — theme thread across all pipeline sources */
const BARDIC_INSPIRATION = {
    theme: 'I create from flame, not from lack.',
    mantra: 'Not a date. Not a rescue. Lantern lit.',
    hostLine: 'This is NOT a date. It\'s a cook-off.',
    korean: '멜버른 골목이 정말 예뻐요',
    shootLanes: ['morning-block', 'date-night', 'dawn-after'],
    dateNightWindow: {
        outingStart: '17:00',
        ingredientCapEnd: '17:15',
        flatWhiteBy: '17:25',
        kitchenStart: '18:15',
        scoreStart: '19:15',
        homeBy: '20:10',
        dawnBeat: '06:12'
    },
    rtdbCadence: 'Refresh every 30s · rotate boards every 45s before Auckland airport leg',
    pipeline: PIPELINE_SOURCES,
    beforeMatchAttune: {
        label: 'Attune before match — Federation pause',
        duration: '60s',
        pin: 'FED',
        skillId: 'melbourne-lantern-bard',
        questId: 'side-fifa-celebrate',
        shadowIndex: 0,
        activation: 'Attune before the match — one breath, one cheer.',
        shadowPhrase: { en: 'One breath before the cheer.', ko: '응원 전에 한 숨.' },
        steps: [
            'Phone face-down · GoPro off · one breath',
            'Pause OK — 잠시 쉬어도 괜찮아요',
            'Attune: I cheer my way — no drama',
            'Korean shadow: 내 방식으로 응원해요 — 드라마 없이',
            'Open lane when ready — no performance invoice'
        ],
        lanes: {
            kane: { boot: 'kane=1', label: 'Kane England · WEMBLEY' },
            neon: { boot: 'neon=1', label: 'Neon Evangelion · NERV' },
            vinicus: { boot: 'vinicus=1', label: 'Vinicus Brasil · SAMBA' },
            messi: { boot: 'messi=1', label: 'Messi Argentina · BOCA' },
            mbappe: { boot: 'mbappe=1', label: 'Mbappé France · STADE' },
            ronaldo: { boot: 'ronaldo=1', label: 'Ronaldo Portugal · CANTINA' },
            fifa: { boot: 'fifa=1', label: 'Mari FIFA cantina' },
            sua: { boot: 'sua=1', label: 'Sua cicada attune · shedding pause' },
            rickmorty: { boot: 'rickmorty=1', label: 'Rick & Morty multiverse · CITADEL SQL' },
            minecraftMeme: { boot: 'minecraft-meme=1', label: 'Minecraft Wiki meme · CRAFT humor' },
            mikaRoad: { boot: 'mika=1', label: 'Mika open-road dreamer · OPEN crew loyalty' },
            haleyJustice: { boot: 'haley=1', label: 'Haley Boba · @vietbonnie · Medea Caster justice' },
            svsssSystem: { boot: 'svsss=1', label: 'SVSSS System bound · QING WebNovel Ch.1' },
            soloLeveling: { boot: 'solo-leveling=1', label: 'Solo Leveling · GATE dungeon comic Ch.1' },
            boysLoveBamboo: { boot: 'boys-love=1', label: 'Boys Love · BAMBOO After the Bamboo' },
            webnovelCrossover: { boot: 'library=webnovel-crossover', label: 'Webnovel crossover · three-lane handoff' }
        }
    },
    boysLoveBamboo: {
        label: 'After the Bamboo — slow-burn boundary without rescue invoice',
        duration: '60s',
        pin: 'BAMBOO',
        skillId: 'boys-love-qing-binghe',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: 'Not a rescue mission — I like you slowly, on purpose.',
        shadowPhrase: {
            en: 'Not a rescue mission.',
            ko: '구출 임무가 아니에요.'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at woodshed door',
            'English: Not a rescue mission — disciple, not beloved',
            'Woodshed truce — water, bandage, silence · one knot loosens',
            'Korean shadow: 구출 임무가 아니에요 · 좋아해요. 천천히. 의도적으로.',
            'Close: tea before feelings · boys-love :5191 · preset 28'
        ],
        webnovelUrl: 'https://www.webnovel.com/book/35203689408704405/94532538348928087'
    },
    webnovelCrossover: {
        label: 'Webnovel crossover — three lanes · one boundary',
        duration: '60s',
        pin: 'CROSS',
        skillId: 'boys-love-qing-binghe',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: 'One breath — B-points above zero, gate ahead.',
        shadowPhrase: {
            en: 'One breath — B-points above zero, gate ahead.',
            ko: '한 숨 — B 포인트는 0 위, 게이트는 앞에.'
        },
        steps: [
            'SVSSS QING — B-point guard · stay in character',
            'Solo GATE — E-rank pause · I\'m used to it',
            'Boys Love BAMBOO — slow-burn boundary · not a rescue mission',
            'Korean shadow: 한 경계 · 세 레인 · 알고리즘 부끄 없이',
            'Close: phone face-down · one pass · no WebNovel binge spiral'
        ]
    },
    soloLevelingGate: {
        label: 'Solo Leveling gate — E-rank without weakness spiral',
        duration: '60s',
        pin: 'GATE',
        skillId: 'sung-jinwoo-solo-leveling',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: "I'm used to it — one breath before the gate.",
        shadowPhrase: {
            en: "I'm used to it.",
            ko: '익숙해요.',
            kr: '익숙해.'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at dungeon gate',
            'English: I\'m used to it — no shame spiral · family breadwinner context',
            'Korean shadow: 익숙해요 · 제가 약해서 그래요',
            'Double dungeon vote — observe danger · Please, be afraid',
            'Close: duck phrase boundary · no comic binge spiral · preset 27'
        ],
        webnovelUrl: 'https://www.webnovel.com/comic/15227640605485101/45196186038101142'
    },
    svsssSystemBound: {
        label: 'SVSSS System bound — B-point guard without OOC spiral',
        duration: '60s',
        pin: 'QING',
        skillId: 'shen-qingqiu-svsss',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: 'Penulis tolol, novel tolol! — B-points stay above zero.',
        shadowPhrase: {
            id: 'Penulis tolol, novel tolol!',
            ko: '바보 작가, 바보 소설!',
            en: 'Stupid author, stupid novel!'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at Qing Jing Peak wake',
            'Indonesian: Penulis tolol, novel tolol! — activation curse, not revenge spiral',
            'System motto: YOU CAN YOU UP, NO CAN NO BB — observe trash-novel rage',
            'Korean shadow: B 포인트는 0 아래로 내려가면 안 돼요 · 캐릭터에서 벗어나면 안 돼요',
            'Close: woodshed beat observed · no WebNovel binge spiral · preset 26'
        ],
        webnovelUrl: 'https://www.webnovel.com/book/35203689408704405/94532538348928087'
    },
    haleyJustice: {
        label: 'Haley Boba — justice seek without re-share',
        duration: '60s',
        pin: 'CAMPUS',
        skillId: 'haley-vietbonnie',
        questId: 'side-boundary',
        shadowIndex: 0,
        activation: 'My consent, my case — justice, not a revenge spiral.',
        shadowPhrase: {
            en: 'My body, my consent — my case.',
            ko: '내 몸, 내 동의 — 내 사건이에요.',
            vi: 'Cơ thể tôi, sự đồng ý của tôi — vụ việc của tôi.'
        },
        steps: [
            'Territory Creation — CAMPUS library temple · phone face-down · GoPro off',
            'English + Vietnamese: My body, my consent — my case',
            'Item Construction + Rule Breaker — document once · report · no re-share',
            'Korean shadow: 유출됐다고 공유 권한은 없어요 · 기록하고 신고해요',
            'Teachings of Circe close — observe headline · cord-cut timeline · preset 25'
        ],
        abilities: [
            'Territory Creation [A]',
            'Item Construction [A]',
            'High-Speed Divine Words [A]',
            'Rule Breaker [C]',
            'Argon Coin [EX]',
            'Teachings of Circe [A]',
            'Witch of Colchis [A]'
        ],
        parameters: { strength: 'E', endurance: 'D', agility: 'C', mana: 'A+', luck: 'B', np: 'C' }
    },
    mikaRoadDream: {
        label: 'Mika open road — crew loyalty without rescue',
        duration: '60s',
        pin: 'OPEN',
        skillId: 'mika-road-dreamer',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: "The open road is my yes — if you're in my crew, I've got you.",
        shadowPhrase: {
            en: 'The open road is my yes.',
            ko: '길이 제 예예요.'
        },
        steps: [
            'Phone face-down · GoPro off · one heartbeat breath at highway pause',
            'English: The open road is my yes — direct, warm, no performance invoice',
            'Korean shadow: 길이 제 예예요 · 우리 편이면 내가 있을게요',
            'Optional dream-teleport: name one imaginary stop — observe without absorbing',
            'Close: momentum without absorption spiral · preset 24'
        ],
        abilities: ['Soundtrack', 'Heartbeat', 'Visual control', 'Dreamer']
    },
    minecraftWikiMeme: {
        label: 'Minecraft Wiki meme — humor without absorbing',
        duration: '45s',
        pin: 'CRAFT',
        skillId: 'melbourne-lantern-bard',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: '유머로 풀어낼게요 — one wiki meme, then phone face-down.',
        shadowPhrase: {
            en: 'I meme from flame — not from lack.',
            ko: '밈도 불꽃에서 — 부족함에서가 아니에요.'
        },
        steps: [
            'Open minecraft.wiki Hipposgrumm memes navbox',
            'Pick template — Bean Block · Lantern Block · RED FLAG Block',
            'Generate parody article · copy markdown',
            'Korean shadow: 유머로 풀어낼게요',
            'Post or discard — no scroll spiral'
        ],
        wikiUrl: 'https://minecraft.wiki/w/User:Hipposgrumm/Memes',
        template: 'Template:User-Hipposgrumm/Memes'
    },
    multiverseSql: {
        label: 'Rick & Morty multiverse — index without absorbing',
        duration: '60s',
        pin: 'CITADEL',
        skillId: 'rick-morty-multiverse',
        questId: 'side-humor',
        shadowIndex: 0,
        activation: 'Melbourne is my dimension — I index, I do not absorb.',
        shadowPhrase: {
            en: 'Wubba Lubba dub-dub — but I index, I do not absorb.',
            ko: '우바 루바 더브 더브 — 색인만 하고 흡수하지 않아요.'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at Citadel portal',
            'English: Melbourne is my dimension — not your adventure invoice',
            'Korean shadow: 멜버른이 제 차원이에요',
            'Optional: rickmorty-sql schema · parameterized SELECT only',
            'Return to Melbourne dimension — no nihilism spiral'
        ],
        wikiUrl: 'https://rickandmorty.fandom.com/it/wiki/Rick_and_Morty_Wiki',
        schema: 'rickmorty'
    },
    cicadaAttune: {
        label: 'Sua cicada attune — shed before you cheer',
        duration: '60s',
        pin: 'FED',
        skillId: 'sua-tattoo',
        questId: 'side-boundary',
        shadowIndex: 2,
        activation: "One breath before I shed my old skin — Sua's flame taught me release.",
        shadowPhrase: {
            en: 'I will shed my old skin.',
            ko: '새 껍질을 벗을게요.'
        },
        attunePhrase: {
            en: 'One breath before the cheer.',
            ko: '응원 전에 한 숨.'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at Federation pause',
            'Attune: 응원 전에 한 숨 — one breath before the shed',
            'Sua cicada: acknowledge the flame · release with gratitude',
            'Korean shadow: 새 껍질을 벗을게요 — I will shed my old skin',
            'Anchor: 나만의 불꽃이면 충분해요 — my own creative fire is enough',
            'Open lane when ready — shed the skin, not the self'
        ]
    },
    reiMercyHeal: {
        label: 'Rei mercy heal — observe without absorbing',
        duration: '60s',
        pin: 'NERV',
        episode: '7.1',
        skillId: 'neon-evangelion',
        questId: 'side-humor',
        shadowIndex: 1,
        activation: 'Observe without absorbing — neon is my boundary.',
        shadowPhrase: {
            ja: '観測するだけ。吸収しない。',
            ko: '관찰만 하고 흡수하지 않을게요.',
            en: 'I observe without absorbing.'
        },
        steps: [
            'Phone face-down · GoPro off · one breath at NERV pause',
            'Japanese native: 観測するだけ。吸収しない。',
            'Rei mercy: observe the storm — do not absorb it',
            'Korean shadow: 관찰만 하고 흡수하지 않을게요',
            'installNeonEvangelionLook() — Veil neon · NERV background',
            'Close: lighter finish — no scroll spiral'
        ]
    },
    twitterFeedHeal: {
        label: 'Twitter feed heal — @adhdloganberry cord-cut',
        duration: '45s',
        pin: 'HOME',
        skillId: 'melbourne-lantern-bard',
        questId: 'side-boundary',
        shadowIndex: 3,
        handle: 'adhdloganberry',
        activation: 'The feed can rest — observe without absorbing.',
        shadowPhrase: {
            ko: '피드는 쉬어도 괜찮아요.',
            en: 'The feed can rest.'
        },
        healTweet: '괜찮아요, 괜찮아요 — feed rest OK. 관찰만 하고 흡수하지 않을게요. One breath · one boundary · no re-watch spiral. #HealTheFeed #TTMIK #LearnKorean',
        steps: [
            'Phone face-down · close the scroll tab · one breath',
            'Helen boundary: 괜찮아요, 괜찮아요 — you do not owe the algorithm a reply',
            'Rei mercy: 관찰만 하고 흡수하지 않을게요 — observe without absorbing',
            'Cord-cut: I choose my own timeline and energy field',
            'Post heal tweet to x.com/adhdloganberry — humor tends the wound',
            'Close: no re-watch spiral · feed healed'
        ]
    },
    afterBlessingHeal: {
        label: 'Quiet reflection after Divine Insight Blessing',
        duration: '45s',
        pin: 'HOTEL',
        skillId: 'helen-neighbor',
        questId: 'side-dib-heal',
        shadowIndex: 2,
        shadowPhrase: { ko: '괜찮아요, 괜찮아요.', en: "It's okay, it's okay." },
        steps: [
            'GoPro off · phone face-down · one breath',
            'Name what the skit released — no re-watch spiral',
            'Helen cord-cut: "I choose my own timeline and energy field"',
            'Whisper boundary phrase · 괜찮아요, 괜찮아요',
            'Close: humor tended the wound — you do not owe the algorithm a reply'
        ]
    }
};

/** Self-healing factors — post-skit landing, boundaries, Veil soft cuts */
const HEALING_FACTORS = {
    theme: 'Humor tends the wound — quiet lands the peace.',
    mantra: 'One breath · one boundary · no re-watch spiral',
    factors: [
        { id: 'hermit-lantern', label: 'Hermit Lantern', phrase: 'One breath, one laugh', skillId: 'melbourne-lantern-bard' },
        { id: 'humor-release', label: 'Humor alchemy', ko: '유머로 풀어낼게요', skillId: 'melbourne-lantern-bard', edit: 'ep-2-5-dib' },
        { id: 'helen-boundary', label: 'Helen boundary', ko: '괜찮아요, 괜찮아요', skillId: 'helen-neighbor', shadowIndex: 2 },
        { id: 'pause-breathe', label: 'Pause OK', ko: '잠시 쉬어도 괜찮아요', skillId: 'helen-neighbor', shadowIndex: 4 },
        { id: 'cord-cut', label: 'Cord-cut', phrase: 'I choose my own timeline and energy field', skillId: 'helen-neighbor' },
        { id: 'post-dib', label: 'Post-DIB landing', pin: 'HOTEL', preset: 9, edit: 'dib-aftercare', questId: 'side-dib-heal' },
        { id: 'daily-ritual', label: 'Daily integration', questId: 'side-ritual', skillId: 'flame-kissed-bard' },
        { id: 'no-rewatch', label: 'No re-watch spiral', note: 'GoPro off before mirror · phone face-down' },
        { id: 'ignan-walk', label: 'Ignan healing walk', skillId: 'ignan-pilgrim', edit: 'ignan-healing-journey', questId: 'side-ignan-heal', pin: 'BOTANIC' },
        { id: 'fifa-celebrate', label: 'Mari FIFA cantina', skillId: 'ignan-pilgrim', edit: 'mari-fifa-celebration', questId: 'side-fifa-celebrate', pin: 'CANTINA' },
        { id: 'match-attune', label: 'Attune before match', ko: '응원 전에 한 숨', skillId: 'melbourne-lantern-bard', edit: 'match-attune-ritual', questId: 'side-fifa-celebrate', pin: 'FED' },
        { id: 'rei-mercy', label: 'Rei mercy heal', ja: '観測するだけ。吸収しない。', ko: '관찰만 하고 흡수하지 않을게요', skillId: 'neon-evangelion', edit: 'rei-mercy-ritual', questId: 'side-humor', pin: 'NERV', shadowIndex: 1 },
        { id: 'cicada-attune', label: 'Sua cicada attune', ko: '새 껍질을 벗을게요', skillId: 'sua-tattoo', edit: 'cicada-attune-ritual', questId: 'side-boundary', pin: 'FED', shadowIndex: 2 },
        { id: 'twitter-feed-heal', label: 'Twitter feed heal', ko: '피드는 쉬어도 괜찮아요', skillId: 'melbourne-lantern-bard', edit: 'twitter-feed-heal-ritual', questId: 'side-boundary', pin: 'HOME', shadowIndex: 3 },
        { id: 'multiverse-query', label: 'Multiverse SQL index', ko: '차원은 색인만 해요', skillId: 'rick-morty-multiverse', edit: 'rickmorty-multiverse-sql', questId: 'side-humor', pin: 'CITADEL', shadowIndex: 0 },
        { id: 'wiki-meme', label: 'Minecraft Wiki meme', ko: '유머로 풀어낼게요', skillId: 'melbourne-lantern-bard', edit: 'minecraft-wiki-meme', questId: 'side-humor', pin: 'CRAFT', shadowIndex: 0 },
        { id: 'open-road', label: 'Open road heal', ko: '길이 제 예예요', skillId: 'mika-road-dreamer', edit: 'mika-road-ritual', questId: 'side-humor', pin: 'OPEN', shadowIndex: 0 },
        { id: 'dream-teleport', label: 'Dreamer teleport pivot', ko: '다음 목적지를 꿈꿔요', skillId: 'mika-road-dreamer', edit: 'mika-road-ritual', questId: 'side-humor', pin: 'OPEN', shadowIndex: 3 },
        { id: 'justice-seek', label: 'Justice seek', ko: '기록하고 신고해요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'CAMPUS', shadowIndex: 0 },
        { id: 'territory-creation', label: 'Territory Creation', ko: '동의가 경계예요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'CAMPUS', shadowIndex: 5 },
        { id: 'item-construction', label: 'Item Construction', ko: '신고 서류를 만들어요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'REPORT', shadowIndex: 6 },
        { id: 'divine-words', label: 'High-Speed Divine Words', ko: '한 번의 주문 — 서류 완료', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'REPORT', shadowIndex: 7 },
        { id: 'rule-breaker', label: 'Rule Breaker', ko: '거짓 계약을 끊어요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'REPORT', shadowIndex: 8 },
        { id: 'argon-coin', label: 'Argon Coin', ko: '착취 없이 자원을 써요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'CAMPUS', shadowIndex: 9 },
        { id: 'teachings-circe', label: 'Teachings of Circe', ko: '헤드라인은 관찰만', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'REST', shadowIndex: 10 },
        { id: 'witch-colchis', label: 'Witch of Colchis', ko: '마녀가 아니라 학생이에요', skillId: 'haley-vietbonnie', edit: 'haley-justice-ritual', questId: 'side-boundary', pin: 'CAMPUS', shadowIndex: 11 },
        { id: 'b-point-guard', label: 'B-point guard', ko: 'B 포인트는 0 아래로 내려가면 안 돼요', skillId: 'shen-qingqiu-svsss', edit: 'svsss-system-bound', questId: 'side-humor', pin: 'QING', shadowIndex: 4 },
        { id: 'e-rank-pause', label: 'E-rank pause', ko: '익숙해요', skillId: 'sung-jinwoo-solo-leveling', edit: 'solo-leveling-gate', questId: 'side-humor', pin: 'GATE', shadowIndex: 0 },
        { id: 'slow-burn-boundary', label: 'Slow-burn boundary', ko: '구출 임무가 아니에요', skillId: 'boys-love-qing-binghe', edit: 'boys-love-bamboo', questId: 'side-humor', pin: 'BAMBOO', shadowIndex: 0 }
    ],
    ignanJourney: {
        character: 'Mari',
        languages: ['ilo', 'ko', 'en'],
        activation: 'Mari walks her own dalan — ok laeng, aginana',
        episode: '2.6',
        preset: 10
    },
    postBlessing: null,
    urls: {
        ttmikStep4: 'TTMIK.html?step=4',
        ttmikHeal: 'TTMIK.html?heal=1',
        dibAftercare: 'http://localhost:8000/video-editor-ultimate.html?project=melbourne-lantern&format=dib-aftercare&aspect=9:16'
    }
};
HEALING_FACTORS.postBlessing = BARDIC_INSPIRATION.afterBlessingHeal;

const TTMIK_SYNC_PINS = {
    HOME: {
        label: 'Pre-trip home',
        place: 'Pack + activation ritual',
        episodes: [1],
        reels: [],
        skillId: 'flame-kissed-bard',
        categories: ['Essential Foundations'],
        questIds: ['side-gear'],
        formats: ['webdrama', 'trailer-vo']
    },
    MEL: {
        label: 'Melbourne Airport T1',
        place: 'Arrivals glass · transit cliffhanger',
        episodes: [1],
        reels: [],
        skillId: 'flame-kissed-bard',
        categories: ['Melbourne Arrival'],
        questIds: [],
        formats: ['webdrama', 'trailer']
    },
    HOSIER: {
        label: 'Hosier Lane',
        place: 'Graffiti wall mid-lane',
        episodes: [2, '2.5', 6, 8],
        reels: ['A', 'B'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Melbourne Arrival'],
        questIds: ['main-film', 'main-skit', 'side-tarot-scam'],
        formats: ['webdrama', 'reel-a', 'reel-b', 'ep-2-5-dib', 'tiktok-15', 'youtube-short']
    },
    CENTRE: {
        label: 'Centre Place',
        place: 'Narrow laneway walk-through',
        episodes: [3, 6],
        reels: ['A', 'B'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Transportation'],
        questIds: ['main-film'],
        formats: ['webdrama', 'reel-a', 'reel-b']
    },
    DEGRAVES: {
        label: 'Degraves Street',
        place: 'Café strip · coffee tsundere · cook-off score · dawn croissant',
        episodes: [2, 3, '2.75'],
        reels: ['A', 'B'],
        skillId: 'lo3tus',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-others'],
        formats: ['webdrama', 'reel-a', 'reel-b', 'date-night-cookoff', 'after-the-date'],
        pipeline: ['letsCook', 'girlsLove'],
        cookOffPhases: ['outing', 'cookoff']
    },
    FLINDERS: {
        label: 'Flinders Street Station',
        place: 'Steps / clocks · tram monologue · date meet Flinders Lane end',
        episodes: [5, 7, '2.75'],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Transportation'],
        questIds: ['main-film'],
        formats: ['webdrama', 'veil-lumen-45', 'date-night-cookoff'],
        pipeline: ['letsCook']
    },
    FED: {
        label: 'Federation Square',
        place: 'Rain on glass · maybe reflection · Ignan grief pause',
        episodes: [5, '2.6'],
        reels: [],
        skillId: 'asuka-brisbane',
        categories: ['Melbourne Arrival', 'Self-Intimacy Practice'],
        questIds: ['side-ignan-heal'],
        formats: ['webdrama', 'veil-lumen', 'ignan-healing-journey']
    },
    SOUTH: {
        label: 'Southbank Promenade',
        place: 'Yarra railing · night neon · Moon-card observe lane',
        episodes: [4, 7, '7.1'],
        reels: [],
        skillId: 'neon-evangelion',
        categories: ['Emergency Protocol', 'Tech & Connectivity'],
        questIds: ['side-boundary', 'side-humor'],
        formats: ['webdrama', 'veil-lumen', 'helen-clip-20', 'neon-evangelion-moon']
    },
    NERV: {
        label: 'NERV Command Pause',
        place: 'Southbank neon command aesthetic · observe without absorbing',
        episodes: ['7.1'],
        reels: [],
        skillId: 'neon-evangelion',
        categories: ['Japanese Shadowing', 'NERV Neon Route', 'Tech & Connectivity'],
        questIds: ['side-humor', 'side-boundary'],
        formats: ['webdrama', 'neon-evangelion-moon'],
        character: 'Neon'
    },
    CITADEL: {
        label: 'Citadel of Ricks Portal',
        place: 'Federation/ACMI portal aesthetic · PostgreSQL dimension index',
        episodes: ['7.2'],
        reels: [],
        skillId: 'rick-morty-multiverse',
        categories: ['Multiverse Shadowing', 'SQL Dimension Drills', 'Tech & Connectivity'],
        questIds: ['side-humor', 'side-boundary'],
        formats: ['webdrama', 'rickmorty-multiverse-sql'],
        character: 'Rick',
        pipeline: ['rickmortySql']
    },
    CABLE: {
        label: 'Interdimensional Cable',
        place: 'One absurd clip · observe · phone face-down',
        episodes: ['7.2'],
        reels: [],
        skillId: 'rick-morty-multiverse',
        categories: ['Multiverse Shadowing', 'GoPro & Content'],
        questIds: ['side-humor'],
        formats: ['webdrama', 'rickmorty-multiverse-sql'],
        character: 'Morty'
    },
    CRAFT: {
        label: 'Crafting Table Meme Pause',
        place: 'Hipposgrumm wiki parody · humor alchemy · observe memes without absorbing',
        episodes: ['7.3'],
        reels: [],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Humor Alchemy'],
        questIds: ['side-humor'],
        formats: ['webdrama', 'minecraft-wiki-meme'],
        character: 'Lo3tus',
        pipeline: ['minecraftWikiMeme']
    },
    OPEN: {
        label: 'Open Highway Pause',
        place: 'Handlebars not cockpit · bike momentum · crew loyalty without rescue',
        episodes: ['7.4'],
        reels: [],
        skillId: 'mika-road-dreamer',
        categories: ['English Shadowing', 'Open Road Route', 'Dreamer Drills'],
        questIds: ['side-humor', 'main-film'],
        formats: ['webdrama', 'mika-road-ritual'],
        character: 'Mika',
        pipeline: ['mikaOpenRoad']
    },
    COLLINS: {
        label: 'Collins Street',
        place: 'Business walk · invoice beat',
        episodes: [3],
        reels: ['A'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Social & Cultural'],
        questIds: ['side-humor'],
        formats: ['webdrama', 'reel-a']
    },
    PRINCES: {
        label: 'Princes Bridge',
        place: 'Dawn timelapse · finale wide',
        episodes: [7, 8],
        reels: [],
        skillId: 'melbourne-lantern-bard',
        categories: ['Cultural Sites'],
        questIds: ['main-film', 'main-veil'],
        formats: ['webdrama', 'recap-short', 'trailer']
    },
    BOTANIC: {
        label: 'Royal Botanic Gardens',
        place: 'Lake path · lantern pass · Ignan healing walk',
        episodes: [8, '2.6'],
        reels: ['B'],
        skillId: 'ignan-pilgrim',
        categories: ['Self-Intimacy Practice', 'Cultural Sites'],
        questIds: ['side-ritual', 'main-veil', 'side-ignan-heal'],
        formats: ['webdrama', 'veil-lumen-16x9', 'ignan-healing-journey']
    },
    CINEMA: {
        label: 'Cinema',
        place: 'Federation Square ACMI · Bend It Like Beckham rewatch · English fan encounter',
        episodes: ['2.64'],
        reels: [],
        skillId: 'ronaldo-portugal-glory',
        categories: ['Cinema Encounters', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        formats: ['webdrama', 'bend-it-beckham'],
        character: 'English fan'
    },
    STADE: {
        label: 'Stade Watch',
        place: 'MCG plaza screen · France counter-attack lane · Mbappé burst ritual',
        episodes: ['2.66'],
        reels: [],
        skillId: 'mbappe-france-attack',
        categories: ['French Shadowing', 'Counter Attack Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        formats: ['webdrama', 'mbappe-counter-attack'],
        character: 'Mbappé'
    },
    BOCA: {
        label: 'La Boca Screen',
        place: 'Argentina plaza watch · post cook-off playmaker · Messi pass ritual',
        episodes: ['2.76'],
        reels: [],
        skillId: 'messi-argentina-playmaker',
        categories: ['Argentine Shadowing', 'Post Cook-Off Route', 'Social & Cultural'],
        questIds: ['side-humor', 'main-others'],
        formats: ['webdrama', 'messi-after-cookoff', 'vinicus-brasil-samba'],
        character: 'Messi',
        pipeline: ['letsCook', 'girlsLove']
    },
    SAMBA: {
        label: 'Samba Screen',
        place: 'Federation samba burst · post Argentina · Vinicus jogo bonito ritual',
        episodes: ['2.77'],
        reels: [],
        skillId: 'vinicus-brasil-samba',
        categories: ['Brazilian Shadowing', 'Samba Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        formats: ['webdrama', 'vinicus-brasil-samba', 'harry-kane-england-striker'],
        character: 'Vinicus'
    },
    WEMBLEY: {
        label: 'Wembley Screen',
        place: 'Federation Three Lions burst · post Brasil · Kane striker ritual',
        episodes: ['2.78'],
        reels: [],
        skillId: 'harry-kane-england-striker',
        categories: ['English Shadowing', 'Captain Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        formats: ['webdrama', 'harry-kane-england-striker'],
        character: 'Kane',
        watchUrl: 'https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw',
        watchId: 'KpcWpp8Yj0WimV_mwGsZgw'
    },
    PUB: {
        label: 'Pub Cheer',
        place: 'Federation pub pause · England captain chant · cheer not rescue',
        episodes: ['2.78'],
        reels: [],
        skillId: 'harry-kane-england-striker',
        categories: ['Captain Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate'],
        formats: ['webdrama', 'harry-kane-england-striker'],
        character: 'Kane'
    },
    CANTINA: {
        label: 'Mexican Restaurant',
        place: 'Federation lane cantina · FIFA watch party · Mari celebration',
        episodes: ['2.65', '2.64'],
        reels: [],
        skillId: 'ignan-pilgrim',
        categories: ['Daily Life', 'Social & Cultural', 'Restaurant Dining'],
        questIds: ['side-fifa-celebrate', 'side-ignan-heal'],
        formats: ['webdrama', 'mari-fifa-celebration', 'ignan-healing-journey'],
        character: 'Mari'
    },
    HOTEL: {
        label: 'Accommodation',
        place: 'Desk / mirror · phone scenes · kitchen cook-off · post-DIB quiet heal',
        episodes: [1, 4, '2.5', '2.75'],
        reels: [],
        skillId: 'helen-neighbor',
        categories: ['Accommodation', 'Emergency Protocol', 'Self-Intimacy Practice'],
        questIds: ['side-boundary', 'side-gear', 'side-dib-heal'],
        formats: ['webdrama', 'date-night-cookoff', 'dib-aftercare'],
        pipeline: ['letsCook', 'girlsLove'],
        cookOffPhases: ['stations']
    }
};

const TTMIK_SYNC_EPISODES = {
    1: {
        title: 'Ignition',
        ko: '점화',
        pins: ['HOME', 'MEL'],
        skillId: 'flame-kissed-bard',
        categories: ['Essential Foundations', 'Melbourne Arrival'],
        questIds: ['side-gear'],
        shadowingIndex: 0
    },
    2: {
        title: 'Arrival Tsundere',
        ko: '도착',
        pins: ['HOSIER', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Melbourne Arrival', 'GoPro & Content'],
        questIds: ['main-film'],
        shadowingIndex: 0
    },
    '2.5': {
        title: 'Divine Insight Blessing',
        ko: '신성한 통찰',
        display: 'Ep 2.5',
        pins: ['HOSIER', 'HOTEL'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Self-Intimacy Practice'],
        questIds: ['side-tarot-scam', 'side-dib-heal'],
        shadowingIndex: 2,
        duration: '45s',
        formats: ['ep-2-5-dib', 'dib-aftercare'],
        aftercare: 'helen-neighbor',
        aftercareShadowIndex: 2
    },
    '2.6': {
        title: 'Ignan Healing Walk',
        ko: '치유의 걸음',
        display: 'Ep 2.6',
        pins: ['HOTEL', 'FED', 'BOTANIC'],
        skillId: 'ignan-pilgrim',
        categories: ['Self-Intimacy Practice', 'Cultural Sites', 'Daily Life'],
        questIds: ['side-ignan-heal', 'side-ritual'],
        shadowingIndex: 0,
        duration: '90s',
        formats: ['ignan-healing-journey'],
        character: 'Mari',
        languages: ['ilo', 'ko', 'en']
    },
    '2.64': {
        title: 'Cinema Encounter',
        ko: '영화관',
        display: 'Ep 2.64',
        pins: ['CINEMA', 'FED'],
        skillId: 'ronaldo-portugal-glory',
        categories: ['Cinema Encounters', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        shadowingIndex: 5,
        duration: '30s',
        formats: ['bend-it-beckham'],
        character: 'English fan',
        languages: ['en', 'pt', 'ko'],
        event: 'Bend It Like Beckham rewatch'
    },
    '2.66': {
        title: 'France Counter-Attack',
        ko: '역습',
        display: 'Ep 2.66',
        pins: ['STADE', 'FED'],
        skillId: 'mbappe-france-attack',
        categories: ['French Shadowing', 'Counter Attack Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['mbappe-counter-attack'],
        character: 'Mbappé',
        languages: ['fr', 'ko', 'en'],
        event: 'FIFA counter-attack watch'
    },
    '2.65': {
        title: 'FIFA Celebration',
        ko: '축하',
        display: 'Ep 2.65',
        pins: ['CANTINA', 'FED'],
        skillId: 'ignan-pilgrim',
        categories: ['Daily Life', 'Social & Cultural', 'Restaurant Dining'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        shadowingIndex: 4,
        duration: '60s',
        formats: ['mari-fifa-celebration'],
        character: 'Mari',
        languages: ['ilo', 'es', 'ko', 'en'],
        event: 'FIFA match watch party'
    },
    '2.76': {
        title: 'Messi Argentina',
        ko: '플레이메이커',
        display: 'Ep 2.76',
        pins: ['HOTEL', 'DEGRAVES', 'BOCA'],
        skillId: 'messi-argentina-playmaker',
        categories: ['Argentine Shadowing', 'Post Cook-Off Route', 'Social & Cultural'],
        questIds: ['side-humor', 'main-others'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['messi-after-cookoff', 'vinicus-brasil-samba'],
        character: 'Messi',
        languages: ['es', 'ko', 'en'],
        event: 'Post cook-off Argentina playmaker',
        pipeline: ['letsCook', 'girlsLove']
    },
    '2.77': {
        title: 'Vinicus Brasil',
        ko: '삼바',
        display: 'Ep 2.77',
        pins: ['SAMBA', 'FED', 'FLINDERS'],
        skillId: 'vinicus-brasil-samba',
        categories: ['Brazilian Shadowing', 'Samba Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['vinicus-brasil-samba', 'harry-kane-england-striker'],
        character: 'Vinicus',
        languages: ['pt', 'ko', 'en'],
        event: 'Post Argentina Brasil samba jogo bonito'
    },
    '2.78': {
        title: 'Harry Kane England',
        ko: '스트라이커',
        display: 'Ep 2.78',
        pins: ['WEMBLEY', 'PUB', 'COLLINS'],
        skillId: 'harry-kane-england-striker',
        categories: ['English Shadowing', 'Captain Route', 'Social & Cultural'],
        questIds: ['side-fifa-celebrate', 'side-humor'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['harry-kane-england-striker'],
        character: 'Kane',
        languages: ['en', 'ko'],
        event: 'Post Brasil England Three Lions striker',
        watchUrl: 'https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw',
        watchId: 'KpcWpp8Yj0WimV_mwGsZgw'
    },
    '7.1': {
        title: 'Neon Evangelion',
        ko: '네온',
        display: 'Ep 7.1',
        pins: ['NERV', 'SOUTH', 'FLINDERS'],
        skillId: 'neon-evangelion',
        categories: ['Japanese Shadowing', 'NERV Neon Route', 'Tech & Connectivity'],
        questIds: ['side-humor', 'side-boundary'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['neon-evangelion-moon'],
        character: 'Neon',
        languages: ['ja', 'ko', 'en'],
        event: 'Moon-card neon observe lane'
    },
    '7.2': {
        title: 'Rick & Morty Multiverse SQL',
        ko: '멀티버스',
        display: 'Ep 7.2',
        pins: ['CITADEL', 'CABLE', 'SOUTH'],
        skillId: 'rick-morty-multiverse',
        categories: ['Multiverse Shadowing', 'Citadel Portal Route', 'SQL Dimension Drills', 'Tech & Connectivity'],
        questIds: ['side-humor', 'side-boundary'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['rickmorty-multiverse-sql', 'neon-evangelion-moon'],
        character: 'Rick',
        languages: ['en', 'ko'],
        event: 'Citadel portal SQL index · observe dimensions without absorbing',
        pipeline: ['rickmortySql'],
        wikiUrl: 'https://rickandmorty.fandom.com/it/wiki/Rick_and_Morty_Wiki'
    },
    '7.3': {
        title: 'Minecraft Wiki Meme Generator',
        ko: '위키밈',
        display: 'Ep 7.3',
        pins: ['CRAFT', 'HOSIER', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Humor Alchemy'],
        questIds: ['side-humor'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['minecraft-wiki-meme'],
        character: 'Lo3tus',
        languages: ['en', 'ko'],
        event: 'Hipposgrumm parody wiki articles · humor-release lane',
        pipeline: ['minecraftWikiMeme'],
        wikiUrl: 'https://minecraft.wiki/w/User:Hipposgrumm/Memes'
    },
    '7.4': {
        title: 'Mika Open Road Dreamer',
        ko: '오픈로드',
        display: 'Ep 7.4',
        pins: ['OPEN', 'HOSIER', 'DEGRAVES'],
        skillId: 'mika-road-dreamer',
        categories: ['English Shadowing', 'Open Road Route', 'Dreamer Drills'],
        questIds: ['side-humor', 'main-film'],
        shadowingIndex: 0,
        duration: '30s',
        formats: ['mika-road-ritual'],
        character: 'Mika',
        languages: ['en', 'ko'],
        event: 'Highway pause · crew loyalty · mental dream-teleport pivot',
        pipeline: ['mikaOpenRoad']
    },
    '2.75': {
        title: 'Cook-Off Not a Date',
        ko: '요리대결',
        display: 'Ep 2.75',
        pins: ['FLINDERS', 'DEGRAVES', 'HOTEL'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-others', 'side-humor'],
        shadowingIndex: 1,
        pipeline: ['letsCook', 'girlsLove'],
        duration: '90s',
        formats: ['date-night-cookoff', 'after-the-date', 'messi-after-cookoff']
    },
    3: {
        title: 'Love Bomb Speedrun',
        ko: '러브폭탄',
        pins: ['CENTRE', 'COLLINS', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Daily Life', 'Social & Cultural'],
        questIds: ['main-skit', 'side-humor'],
        shadowingIndex: 2
    },
    4: {
        title: 'Helen Intervention',
        ko: '경계',
        pins: ['HOTEL', 'SOUTH'],
        skillId: 'helen-neighbor',
        categories: ['Emergency Protocol', 'Accommodation'],
        questIds: ['side-boundary'],
        shadowingIndex: 0
    },
    5: {
        title: 'The Maybe',
        ko: '아마도',
        pins: ['FED', 'FLINDERS', 'HOSIER'],
        skillId: 'asuka-brisbane',
        categories: ['Transportation', 'Melbourne Arrival'],
        questIds: ['main-others'],
        shadowingIndex: 0
    },
    6: {
        title: 'Action!',
        ko: '촬영',
        pins: ['HOSIER'],
        skillId: 'heidi-alpine-wayfarer',
        categories: ['GoPro & Content', 'German Shadowing'],
        questIds: ['main-skit', 'main-film'],
        shadowingIndex: 0
    },
    7: {
        title: 'The Moon Card',
        ko: '달',
        pins: ['SOUTH', 'FLINDERS', 'PRINCES'],
        skillId: 'sven-nordic-ranger',
        categories: ['Tech & Connectivity', 'Emergency Protocol', 'Swedish Shadowing'],
        questIds: ['side-humor'],
        shadowingIndex: 0
    },
    8: {
        title: 'The World',
        ko: '세계',
        pins: ['PRINCES', 'HOSIER', 'BOTANIC'],
        skillId: 'martin-nordic-guide',
        categories: ['Cultural Sites', 'Self-Intimacy Practice', 'Norwegian Shadowing'],
        questIds: ['main-veil', 'main-film'],
        shadowingIndex: 0
    }
};

const TTMIK_SYNC_REELS = {
    A: {
        label: 'Reel A · Tsundere Scam PSA',
        duration: '30s',
        pins: ['HOSIER', 'CENTRE', 'COLLINS', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['GoPro & Content', 'Social & Cultural'],
        questIds: ['main-skit'],
        formats: ['reel', 'youtube-short']
    },
    B: {
        label: 'Reel B · Not Enjoying Melbourne',
        duration: '30s',
        pins: ['HOSIER', 'CENTRE', 'DEGRAVES'],
        skillId: 'melbourne-lantern-bard',
        categories: ['Melbourne Arrival', 'Daily Life'],
        questIds: ['main-film', 'main-others'],
        formats: ['reel', 'tiktok-15']
    }
};

/** On-set quick presets — type 1–5 or ?preset=N in URL */
const TTMIK_SYNC_PRESETS = [
    {
        id: 1,
        label: 'Hosier · Ep 2 · Reel B',
        shortLabel: 'HOSIER B',
        pin: 'HOSIER',
        episode: 2,
        reel: 'B',
        note: '09:00 block — wides + Ep 2 main',
        autoShadow: true
    },
    {
        id: 2,
        label: 'Hosier · Ep 2 · Reel A',
        shortLabel: 'HOSIER A',
        pin: 'HOSIER',
        episode: 2,
        reel: 'A',
        note: 'Scam PSA pickups at graffiti wall'
    },
    {
        id: 3,
        label: 'Degraves · Ep 2 · Reel A',
        shortLabel: 'DEGRAVES',
        pin: 'DEGRAVES',
        episode: 2,
        reel: 'A',
        note: '08:00 — coffee + A7 + Ep 2 cliff'
    },
    {
        id: 4,
        label: 'Centre · Ep 2 · Reel B',
        shortLabel: 'CENTRE',
        pin: 'CENTRE',
        episode: 2,
        reel: 'B',
        note: '08:30 — A4, A10, B6, B9 rule walk'
    },
    {
        id: 5,
        label: 'Hosier · Ep 6 · Reel B',
        shortLabel: 'WRAP',
        pin: 'HOSIER',
        episode: 6,
        reel: 'B',
        note: '10:15 — shadowing + SD offload'
    },
    {
        id: 6,
        label: 'Degraves · Ep 2.75 · Outing',
        shortLabel: 'DATE OUT',
        pin: 'DEGRAVES',
        episode: '2.75',
        reel: 'B',
        note: '17:00 — meet + ingredient cap · lets-cook phase outing',
        autoShadow: true
    },
    {
        id: 7,
        label: 'Hotel · Ep 2.75 · Kitchen',
        shortLabel: 'COOK-OFF',
        pin: 'HOTEL',
        episode: '2.75',
        reel: null,
        note: '18:15 — 45 min stations · GoPro consent · Helen soup'
    },
    {
        id: 8,
        label: 'Degraves · Dawn · After the Date',
        shortLabel: 'DAWN',
        pin: 'DEGRAVES',
        episode: '2.75',
        reel: 'B',
        note: '06:12 — girls-love Ch.2 croissant run'
    },
    {
        id: 9,
        label: 'Hotel · Post-DIB quiet heal',
        shortLabel: 'HEAL',
        pin: 'HOTEL',
        episode: '2.5',
        reel: null,
        note: '09:30 — reflection after blessing skit · Helen self-healing',
        autoShadow: true,
        aftercare: true
    },
    {
        id: 10,
        label: 'Botanic · Ep 2.6 · Ignan heal',
        shortLabel: 'IGNAN',
        pin: 'BOTANIC',
        episode: '2.6',
        reel: null,
        note: '10:30 — Mari trilingual walk · Ilokano + Korean + English',
        autoShadow: true
    },
    {
        id: 11,
        label: 'FED · Ep 5 · The Maybe',
        shortLabel: 'ASUKA',
        pin: 'FED',
        episode: 5,
        reel: null,
        note: 'Rain glass · Brisbane maybe · Japanese native + Korean shadow',
        autoShadow: true
    },
    {
        id: 12,
        label: 'Cantina · Ep 2.65 · FIFA',
        shortLabel: 'FIFA',
        pin: 'CANTINA',
        episode: '2.65',
        reel: null,
        note: 'Mexican restaurant · Mari Ilokano native · FIFA joy · preset after BOTANIC walk',
        autoShadow: true
    },
    {
        id: 13,
        label: 'Hosier · Ep 6 · Heidi Wayfarer',
        shortLabel: 'HEIDI',
        pin: 'HOSIER',
        episode: 6,
        reel: null,
        note: 'Laneway lantern · German native + Korean shadow · Fast Character Bard sheet',
        autoShadow: true
    },
    {
        id: 14,
        label: 'Flinders · Ep 7 · Sven Ranger',
        shortLabel: 'SVEN',
        pin: 'FLINDERS',
        episode: 7,
        reel: null,
        note: 'Moon-card calm · Swedish native + Korean shadow · Fast Character Ranger sheet',
        autoShadow: true
    },
    {
        id: 15,
        label: 'Botanic · Ep 8 · Martin Guide',
        shortLabel: 'MARTIN',
        pin: 'BOTANIC',
        episode: 8,
        reel: null,
        note: 'World-card close · Norwegian native + Korean shadow · Fast Character Guide sheet',
        autoShadow: true
    },
    {
        id: 16,
        label: 'Cantina · Ep 2.65 · Ronaldo Portugal',
        shortLabel: 'RONALDO',
        pin: 'CANTINA',
        episode: '2.65',
        reel: null,
        note: 'FIFA cantina · Portuguese native + Korean shadow · Fast Character Glory Paladin sheet',
        autoShadow: true
    },
    {
        id: 17,
        label: 'Stade · Ep 2.66 · Mbappé France',
        shortLabel: 'MBAPPE',
        pin: 'STADE',
        episode: '2.66',
        reel: null,
        note: 'FIFA counter-attack · French native + Korean shadow · Fast Character Battle Master sheet',
        autoShadow: true
    },
    {
        id: 18,
        label: 'La Boca · Ep 2.76 · Messi Argentina',
        shortLabel: 'MESSI',
        pin: 'BOCA',
        episode: '2.76',
        reel: null,
        note: 'Post cook-off · Argentine Spanish + Korean shadow · Fast Character Mastermind Rogue sheet',
        autoShadow: true
    },
    {
        id: 19,
        label: 'Samba · Ep 2.77 · Vinicus Brasil',
        shortLabel: 'VINICUS',
        pin: 'SAMBA',
        episode: '2.77',
        reel: null,
        note: 'Post Argentina · Brazilian Portuguese + Korean shadow · Fast Character Open Hand Monk sheet',
        autoShadow: true
    },
    {
        id: 20,
        label: 'Wembley · Ep 2.78 · Harry Kane England',
        shortLabel: 'KANE',
        pin: 'WEMBLEY',
        episode: '2.78',
        reel: null,
        note: 'Post Brasil · English + Korean shadow · Fast Character Champion Fighter sheet',
        autoShadow: true
    },
    {
        id: 21,
        label: 'NERV · Ep 7.1 · Neon Evangelion',
        shortLabel: 'NEON',
        pin: 'NERV',
        episode: '7.1',
        reel: null,
        note: 'Moon-card neon · Japanese + Korean shadow · installNeonEvangelionLook() · Fast Character Monk sheet',
        autoShadow: true
    },
    {
        id: 22,
        label: 'Citadel · Ep 7.2 · Rick & Morty Multiverse',
        shortLabel: 'RICK',
        pin: 'CITADEL',
        episode: '7.2',
        reel: null,
        note: 'Citadel portal · English + Korean shadow · rickmorty SQL schema · Fast Character Artificer sheet',
        autoShadow: true
    },
    {
        id: 23,
        label: 'CRAFT · Ep 7.3 · Minecraft Wiki Meme',
        shortLabel: 'MEME',
        pin: 'CRAFT',
        episode: '7.3',
        reel: null,
        note: 'Hipposgrumm parody articles · humor alchemy · minecraft.wiki meme generator',
        autoShadow: true
    },
    {
        id: 24,
        label: 'OPEN · Ep 7.4 · Mika Road Dreamer',
        shortLabel: 'MIKA',
        pin: 'OPEN',
        episode: '7.4',
        reel: null,
        note: 'Open highway pause · English + Korean shadow · crew loyalty · Fast Character Ranger sheet',
        autoShadow: true
    },
    {
        id: 25,
        label: 'CAMPUS · Ep 7.5 · Haley Boba Justice',
        shortLabel: 'HALEY',
        pin: 'CAMPUS',
        episode: '7.5',
        reel: null,
        note: 'Library pause · @vietbonnie · Medea Caster skills · NCII boundary · Fast Character Wizard Abjurer sheet',
        autoShadow: true
    },
    {
        id: 26,
        label: 'QING · Ep 7.6 · SVSSS System Bound',
        shortLabel: 'SVSSS',
        pin: 'QING',
        episode: '7.6',
        reel: null,
        note: 'WebNovel Ch.1 · Indonesian ID native · System bound · B-point guard · Fast Character Monk Kensei sheet',
        autoShadow: true
    },
    {
        id: 27,
        label: 'GATE · Ep 7.7 · Solo Leveling Hunter',
        shortLabel: 'SOLO',
        pin: 'GATE',
        episode: '7.7',
        reel: null,
        note: 'WebNovel comic Ch.1 · English native · E-rank dungeon · Cartenon Temple · Fast Character Fighter Champion sheet',
        autoShadow: true
    },
    {
        id: 28,
        label: 'BAMBOO · Ep 7.8 · Boys Love Slow-Burn',
        shortLabel: 'BAMBOO',
        pin: 'BAMBOO',
        episode: '7.8',
        reel: null,
        note: 'After the Bamboo Ch.1–2 · Qingqiu/Binghe · woodshed truce · slow-burn boundary · Fast Character Monk Kensei sheet',
        autoShadow: true
    }
];

/** Webseries multiverse — dimension lanes across Melbourne Bardic Adventure */
const WEBSERIES_MULTIVERSE = {
    theme: 'Every dimension is a row — Melbourne is my yes.',
    mantra: 'I index, I do not absorb.',
    sqlSchema: 'rickmorty',
    wikiHub: 'https://rickandmorty.fandom.com/it/wiki/Rick_and_Morty_Wiki',
    lanes: [
        { id: 'fifa', label: 'FIFA nation arcs', episodes: ['2.64', '2.65', '2.66', '2.76', '2.77', '2.78'], presets: [16, 17, 18, 19, 20] },
        { id: 'ignan', label: 'Ignan healing walk', episode: '2.6', preset: 10 },
        { id: 'cookoff', label: 'Date-night cook-off', episode: '2.75', presets: [6, 7, 8] },
        { id: 'neon', label: 'Neon Evangelion observe', episode: '7.1', preset: 21 },
        { id: 'rickmorty', label: 'Rick & Morty SQL multiverse', episode: '7.2', preset: 22, boot: 'rickmorty=1' },
        { id: 'minecraft-meme', label: 'Minecraft Wiki meme generator', episode: '7.3', preset: 23, boot: 'minecraft-meme=1' },
        { id: 'mika-road', label: 'Mika open-road dreamer', episode: '7.4', preset: 24, boot: 'mika=1' },
        { id: 'haley-justice', label: 'Haley Boba justice seek', episode: '7.5', preset: 25, boot: 'haley=1' },
        { id: 'svsss-system', label: 'SVSSS System bound', episode: '7.6', preset: 26, boot: 'svsss=1' },
        { id: 'solo-leveling-gate', label: 'Solo Leveling dungeon gate', episode: '7.7', preset: 27, boot: 'solo-leveling=1' },
        { id: 'boys-love-bamboo', label: 'Boys Love After the Bamboo', episode: '7.8', preset: 28, boot: 'boys-love=1' },
        { id: 'webnovel-crossover', label: 'Webnovel crossover handoff', episode: '7.9', boot: 'library=webnovel-crossover' }
    ],
    handoff: {
        from: '7.7',
        to: '7.8',
        note: 'Solo Leveling gate → Boys Love bamboo — not a rescue mission · slow-burn on purpose'
    }
};

/** Lane D — Mari FIFA celebration (after Ignan walk · optional same evening) */
const TTMIK_FIFA_CELEBRATION_ROUTE = [
    { time: '18:15', pin: 'FED', note: 'Attune before match — pause · breath · no re-watch spiral · ?attune=1', sync: { pin: 'FED', episode: '2.65', reel: null } },
    { time: '18:30', pin: 'CINEMA', note: 'Bend It Like Beckham rewatch — English fan meet · fast scene 30s', presetId: 16, sync: { pin: 'CINEMA', episode: '2.64', reel: null } },
    { time: '19:00', pin: 'CANTINA', note: 'Meet after walk — Mari picks the table, Bard pays his half', presetId: 12 },
    { time: '19:15', pin: 'CANTINA', note: 'Ilokano toast first — Naragsak unay before the match replay', sync: { pin: 'CANTINA', episode: '2.65', reel: null } },
    { time: '19:45', pin: 'CANTINA', note: 'Goal cheer — Spanish salud, Korean 맛있어요, no soulmate CTAs', presetId: 12 },
    { time: '20:00', pin: 'CANTINA', note: 'Portugal cheer — Gol! Força Portugal · preset 16 · phones down except toast', presetId: 16 },
    { time: '20:15', pin: 'STADE', note: 'France counter-attack — But! Allez les Bleus · preset 17 · burst not rescue', presetId: 17, sync: { pin: 'STADE', episode: '2.66', reel: null } }
];

const TTMIK_BLOCK_ROUTE = [
    { time: '08:00', pin: 'DEGRAVES', note: 'Coffee + A7 + Ep 2 cliff', presetId: 3 },
    { time: '08:30', pin: 'CENTRE', note: 'A4, A10, B6, B9 rule walk', presetId: 4 },
    { time: '09:00', pin: 'HOSIER', note: 'Reels A+B + Ep 2.5 DIB skit', presetId: 2 },
    { time: '09:30', pin: 'HOTEL', note: 'Quiet reflection after blessing skit', presetId: 9 },
    { time: '09:45', pin: 'COLLINS', note: 'A6 invoice (optional)', sync: { pin: 'COLLINS', episode: 3, reel: 'A' } },
    { time: '10:15', pin: 'HOSIER', note: 'Shadowing + SD offload', presetId: 5 },
    { time: '10:30', pin: 'BOTANIC', note: 'Ep 2.6 Ignan healing walk with Mari', presetId: 10 }
];

/** Lane C — Ignan self-healing journey (after post-DIB · optional FED rain) */
const TTMIK_IGNAN_HEAL_ROUTE = [
    { time: '09:30', pin: 'HOTEL', note: 'Post-DIB landing — ask Mari if she wants the walk', presetId: 9 },
    { time: '10:00', pin: 'FED', note: 'Optional rain pause — name homeward grief without drama', sync: { pin: 'FED', episode: '2.6', reel: null } },
    { time: '10:30', pin: 'BOTANIC', note: 'Trilingual release · Ok laeng + 괜찮아요 + own path', presetId: 10 }
];

/** Date night lane — RTDB AKL legs + lets-cook optimiseDateWindow(17:00) */
const TTMIK_DATE_NIGHT_ROUTE = [
    { time: '05:30', pin: null, note: 'AKL Waitemata RTDB refresh — Britomart-bound train', rtdb: 'waitemata', skill: 'flame-kissed-bard' },
    { time: '06:15', pin: null, note: 'Britomart bus hub — airport connector ≤20 min wait', rtdb: 'britomart', skill: 'helen-neighbor' },
    { time: '12:30', pin: 'MEL', note: 'Land MEL → HOTEL drop bags — no love-bomb speedrun', skill: 'flame-kissed-bard' },
    { time: '17:00', pin: 'FLINDERS', note: 'Meet Flinders Lane end — 15 min silly ingredient cap', presetId: 6 },
    { time: '17:20', pin: 'DEGRAVES', note: 'Stroll + flat white — Bard: hydration not romance', presetId: 6 },
    { time: '18:15', pin: 'HOTEL', note: 'Kitchen stations · 45 min cook-off timer', presetId: 7 },
    { time: '19:15', pin: 'DEGRAVES', note: 'Score · eat · block ingredient-fee Venmos', sync: { pin: 'DEGRAVES', episode: '2.75', reel: 'B' } },
    { time: '19:30', pin: 'BOCA', note: 'After cook-off — Messi Argentina meet · ¡Vamos Argentina! · preset 18', presetId: 18, sync: { pin: 'BOCA', episode: '2.76', reel: null } },
    { time: '19:45', pin: 'SAMBA', note: 'After La Boca — Vinicus Brasil samba · Gol! Vai Brasil! · preset 19', presetId: 19, sync: { pin: 'SAMBA', episode: '2.77', reel: null } },
    { time: '19:55', pin: 'FED', note: 'Attune before match — one breath before Kane lane · ?attune=1&lane=kane', sync: { pin: 'FED', episode: '2.78', reel: null } },
    { time: '20:00', pin: 'WEMBLEY', note: 'After Brasil — Harry Kane England striker · FIFA+ watch · Goal! Come on England! · preset 20', presetId: 20, sync: { pin: 'WEMBLEY', episode: '2.78', reel: null }, watchUrl: 'https://www.fifa.com/en/watch/KpcWpp8Yj0WimV_mwGsZgw' },
    { time: '06:12', pin: 'DEGRAVES', note: 'Dawn croissant — girls-love Ch.2 · phones optional', presetId: 8 }
];

/** Lane F — Minecraft Wiki meme (after Ep 7.2 · optional late night) */
const TTMIK_MINECRAFT_MEME_ROUTE = [
    { time: '22:30', pin: 'CRAFT', note: 'Crafting table pause — Hipposgrumm meme generator · ?minecraft-meme=1 · preset 23', presetId: 23, sync: { pin: 'CRAFT', episode: '7.3', reel: null } },
    { time: '22:40', pin: 'HOSIER', note: 'One meme screenshot — graffiti bean block overlay · phone face-down', sync: { pin: 'HOSIER', episode: '7.3', reel: null } },
    { time: '22:50', pin: 'DEGRAVES', note: '유머로 풀어낼게요 — lighter walk home', sync: { pin: 'DEGRAVES', episode: '7.3', reel: null } }
];

/** Lane G — Mika open road (after Ep 7.3 · optional late night) */
const TTMIK_MIKA_OPEN_ROAD_ROUTE = [
    { time: '23:00', pin: 'OPEN', note: 'Highway pause — open road yes · ?mika=1 · preset 24', presetId: 24, sync: { pin: 'OPEN', episode: '7.4', reel: null } },
    { time: '23:10', pin: 'HOSIER', note: 'Build the crew up — {chuckle} optional · no performance invoice', sync: { pin: 'HOSIER', episode: '7.4', reel: null } },
    { time: '23:20', pin: 'DEGRAVES', note: 'Coffee dream stop — 사소한 건 신경 안 써요 · phone face-down', sync: { pin: 'DEGRAVES', episode: '7.4', reel: null } }
];

/** Lane E — Multiverse SQL (after Ep 7.1 NERV · optional same evening) */
const TTMIK_MULTIVERSE_ROUTE = [
    { time: '22:00', pin: 'CITADEL', note: 'Citadel portal — SQL index pause · ?rickmorty=1 · preset 22', presetId: 22, sync: { pin: 'CITADEL', episode: '7.2', reel: null } },
    { time: '22:10', pin: 'CABLE', note: 'One Interdimensional Cable clip — observe · phone face-down', sync: { pin: 'CABLE', episode: '7.2', reel: null } },
    { time: '22:20', pin: 'SOUTH', note: 'Return to Melbourne dimension — handoff from NERV neon', sync: { pin: 'SOUTH', episode: '7.2', reel: null } }
];

function resolveEpisodeKey(value) {
    if (value == null || value === '') return null;
    const s = String(value);
    if (s.includes('.')) return s;
    const n = typeof value === 'number' ? value : parseInt(s, 10);
    return Number.isFinite(n) ? n : s;
}

function getSyncPin(pinId) {
    return TTMIK_SYNC_PINS[pinId] || null;
}

function getSyncEpisode(epNum) {
    const key = resolveEpisodeKey(epNum);
    if (key == null) return null;
    return TTMIK_SYNC_EPISODES[key] || null;
}

function getBardicInspiration() {
    return BARDIC_INSPIRATION;
}

function getPipelineSources() {
    return PIPELINE_SOURCES;
}

function getDateNightRoute() {
    return TTMIK_DATE_NIGHT_ROUTE;
}

function getDibAftercareRitual() {
    return BARDIC_INSPIRATION.afterBlessingHeal;
}

function getMatchAttuneRitual() {
    return BARDIC_INSPIRATION.beforeMatchAttune;
}

function getReiMercyHealRitual() {
    return BARDIC_INSPIRATION.reiMercyHeal;
}

function getCicadaAttuneRitual() {
    return BARDIC_INSPIRATION.cicadaAttune;
}

function getTwitterFeedHealRitual() {
    return BARDIC_INSPIRATION.twitterFeedHeal;
}

function getMultiverseSqlRitual() {
    return BARDIC_INSPIRATION.multiverseSql;
}

function getMinecraftWikiMemeRitual() {
    return BARDIC_INSPIRATION.minecraftWikiMeme;
}

function getMikaRoadDreamRitual() {
    return BARDIC_INSPIRATION.mikaRoadDream;
}

function getSvsssSystemRitual() {
    return BARDIC_INSPIRATION.svsssSystemBound;
}

function getSoloLevelingGateRitual() {
    return BARDIC_INSPIRATION.soloLevelingGate;
}

function getBoysLoveBambooRitual() {
    return BARDIC_INSPIRATION.boysLoveBamboo;
}

function getWebnovelCrossoverRitual() {
    return BARDIC_INSPIRATION.webnovelCrossover;
}

function getWebseriesMultiverse() {
    return WEBSERIES_MULTIVERSE;
}

function getMultiverseRoute() {
    return TTMIK_MULTIVERSE_ROUTE;
}

function getMinecraftMemeRoute() {
    return TTMIK_MINECRAFT_MEME_ROUTE;
}

function getMikaOpenRoadRoute() {
    return TTMIK_MIKA_OPEN_ROAD_ROUTE;
}

function getHealingFactors() {
    return HEALING_FACTORS;
}

function getIgnanHealRoute() {
    return TTMIK_IGNAN_HEAL_ROUTE;
}

function getFifaCelebrationRoute() {
    return TTMIK_FIFA_CELEBRATION_ROUTE;
}

function getSyncReel(reelId) {
    return TTMIK_SYNC_REELS[reelId] || null;
}

function getSyncPreset(presetId) {
    const n = typeof presetId === 'number' ? presetId : parseInt(presetId, 10);
    if (!n) return null;
    return TTMIK_SYNC_PRESETS.find(p => p.id === n) || null;
}

function getShadowingPhraseForSkill(skillId, index = 0) {
    const skill = getSkillById(skillId);
    if (!skill?.shadowingPhrases?.length) return null;
    const i = Math.min(index, skill.shadowingPhrases.length - 1);
    return skill.shadowingPhrases[i];
}