/**
 * WebNovel Package Library — canonical book/comic manifests per webnovel.com
 * SVSSS ID translation (109 ch) · Solo Leveling comic (202 ch · Completed)
 * Regenerate catalog: node scripts/build-webnovel-catalog.js
 * Audio folder: WebNovel_Package/
 */

const WEBNOVEL_PACKAGE_BASE = 'WebNovel_Package';

const WEBNOVEL_PACKAGES = {
    svsss: {
        id: 'svsss',
        type: 'book',
        bookId: '35203689408704405',
        title: "The Scum Villain's Self-Saving System (Terjemahan Indonesia)",
        originalTitle: 'Ren Zha Fanpai Zijiu Xitong (人渣反派自救系统)',
        englishTitle: "The Scum Villain's Self-Saving System",
        author: 'Mo Xiang Tong Xiu',
        translator: 'BoaHancock31',
        profileUrl: 'https://www.webnovel.com/profile/4505298931',
        genre: 'Fantasy',
        tags: ['ROMANCE', 'SYSTEM', 'COMEDY', 'TRANSMIGRATION', 'CULTIVATION'],
        language: 'id',
        chapters: 109,
        views: '219.6K',
        volume: 'Volume 1',
        status: 'Completed',
        latestChapter: 'Chapter 107 - Ekstra [ TAMAT ]',
        catalogUrl: 'https://www.webnovel.com/book/35203689408704405/catalog',
        homeUrl: 'https://www.webnovel.com/book/35203689408704405',
        readUrl: 'https://www.webnovel.com/book/35203689408704405/94532538348928087',
        synopsis: 'Shen Yuan transmigrates into trash-villain Shen Qingqiu. The System binds B-points; OOC frozen until kindness unlocks — danmei xianxia slow-burn.',
        ttmikLane: 'Ep 7.6 QING · preset 26 · b-point-guard',
        ttmikSkill: 'shen-qingqiu-svsss',
        ttmikBoot: 'svsss=1',
        libraryGroup: 'SVSSS Library'
    },
    soloLeveling: {
        id: 'solo-leveling',
        type: 'comic',
        comicId: '15227640605485101',
        title: 'Solo Leveling(Only I level up)',
        originalTitle: '나 혼자만 레벨업',
        englishTitle: 'Solo Leveling',
        publishers: ['DUBU (REDICE STUDIO)', 'Chugong', 'h-goon'],
        license: 'D&C MEDIA',
        genre: 'Magic',
        tags: ['HUNTER', 'SYSTEM', 'DUNGEON', 'LEVEL-UP'],
        language: 'en',
        chapters: 202,
        views: '150.0M',
        status: 'Completed',
        latestChapter: 'Chapter 202: Extras 21',
        catalogUrl: 'https://www.webnovel.com/comic/15227640605485101/catalog',
        homeUrl: 'https://www.webnovel.com/comic/15227640605485101',
        readUrl: 'https://www.webnovel.com/comic/15227640605485101/45196186038101142',
        synopsis: 'Sung Jinwoo — weakest E-rank hunter — receives the Player System. Gates, dungeons, Cartenon Temple.',
        ttmikLane: 'Ep 7.7 GATE · preset 27 · e-rank-pause',
        ttmikSkill: 'sung-jinwoo-solo-leveling',
        ttmikBoot: 'solo-leveling=1',
        libraryGroup: 'Solo Leveling Library'
    },
    boysLove: {
        id: 'boys-love',
        type: 'mirror',
        parentPackage: 'svsss',
        title: 'After the Bamboo',
        subtitle: 'SVSSS slow-burn mirror · Qingqiu/Binghe',
        novelApp: 'http://localhost:5191',
        chapters: 2,
        webnovelAnchor: 2,
        ttmikLane: 'Ep 7.8 BAMBOO · preset 28 · slow-burn-boundary',
        ttmikSkill: 'boys-love-qing-binghe',
        ttmikBoot: 'boys-love=1',
        libraryGroup: 'Boys Love Library'
    }
};

const WEBNOVEL_PACKAGE_CATEGORIES = [
    'SVSSS Chapter Pack',
    'Solo Leveling Chapter Pack',
    'Catalog & Synopsis'
];

/** TTMIK-integrated chapters — shadow phrases mapped to WebNovel TOC */
const WEBNOVEL_INTEGRATED_CHAPTERS = {
    svsss: [
        {
            n: 1,
            chapterId: '94532538348928087',
            title: 'Chapter 1',
            pins: ['QING', 'SYSTEM'],
            phrases: [
                { id: 'Penulis tolol, novel tolol!', ko: '바보 작가, 바보 소설!' },
                { id: 'Ini adalah Puncak Qing Jing milikmu.', ko: '여기는 당신의 청정봉이에요.' },
                { id: 'Poin B tidak boleh di bawah nol.', ko: 'B 포인트는 0 아래로 내려가면 안 돼요.' }
            ],
            note: 'System bound · Qing Jing wake · 100 B-points'
        },
        {
            n: 2,
            chapterId: '94532556736753619',
            title: 'Chapter 2',
            pins: ['SHED', 'BAMBOO'],
            phrases: [
                { id: 'Peringatan! Peringatan OOC!', ko: 'OOC 경고! OOC 경고!' },
                { id: 'Bawa Binghe ke sini.', ko: '빙허를 데려와요.' },
                { id: 'Ini obat.', ko: '이건 약이에요.' },
                { id: 'Terima kasih atas obatnya, Shizun.', ko: '약 감사합니다, 스승님.' }
            ],
            note: 'OOC warning · Ming Fan · medicine bottle · boys-love mirror'
        }
    ],
    soloLeveling: [
        {
            n: 0,
            index: 0,
            chapterId: '45196186038101142',
            title: '000 Only I Level Up',
            pins: ['GATE'],
            phrases: [
                { en: "I'm used to it.", ko: '익숙해요.' },
                { en: 'The weakest hunter of all mankind.', ko: '인류 최약 헌터예요.' },
                { en: 'Gates opened ten years ago.', ko: '십 년 전에 게이트가 열렸어요.' }
            ],
            note: 'E-rank intro · construction site gate'
        },
        {
            n: 1,
            index: 1,
            chapterId: '45196190333068497',
            title: '001 The Weakest Hunter',
            pins: ['STONE'],
            phrases: [
                { en: "It's my fault for being so weak.", ko: '제가 약해서 그래요.' },
                { en: 'Better than nothing.', ko: '없는 것보단 나아요.' }
            ],
            note: 'Goblin raid · essence stone · Joohee heal'
        },
        {
            n: 2,
            index: 2,
            chapterId: '45196193805954613',
            title: '002 Double Dungeon',
            pins: ['TEMPLE', 'VOTE'],
            phrases: [
                { en: "It's a double dungeon.", ko: '이중 던전이에요.' },
                { en: 'I need the money for my family.', ko: '가족을 위해 돈이 필요해요.' },
                { en: 'The door shut behind us.', ko: '문이 뒤에서 닫혔어요.' }
            ],
            note: 'Cartenon Temple vote · family breadwinner'
        },
        {
            n: 3,
            index: 3,
            chapterId: '45196197043954998',
            title: '003 Statue',
            pins: ['TEMPLE'],
            phrases: [
                { en: 'Everyone, duck!', ko: '다들 엎드려요!' },
                { en: 'Please, be afraid.', ko: '두려워하세요.' }
            ],
            note: 'Statue of God · heat vision · phone face-down after'
        }
    ]
};

function getWebnovelPackage(packageId) {
    return WEBNOVEL_PACKAGES[packageId] || WEBNOVEL_PACKAGES.svsss;
}

function getWebnovelCatalog(packageId) {
    if (packageId === 'svsss' || packageId === 'boys-love') {
        return typeof WEBNOVEL_SVSSS_CATALOG !== 'undefined' ? WEBNOVEL_SVSSS_CATALOG : [];
    }
    if (packageId === 'solo-leveling') {
        return typeof WEBNOVEL_SOLO_LEVELING_CATALOG !== 'undefined' ? WEBNOVEL_SOLO_LEVELING_CATALOG : [];
    }
    return [];
}

function getWebnovelChapterEntry(packageId, chapterN) {
    const catalog = getWebnovelCatalog(packageId);
    return catalog.find((c) => c.n === chapterN) || null;
}

function buildWebnovelPackageTranscript(parts) {
    const pkg = parts.packageId ? getWebnovelPackage(parts.packageId) : null;
    const lines = [];
    if (pkg) lines.push(`WebNovel ${pkg.type}: ${pkg.title}`);
    if (parts.chapterTitle) lines.push(`Chapter: ${parts.chapterTitle}`);
    if (parts.url) lines.push(`Read: ${parts.url}`);
    if (parts.id) lines.push(`Indonesian (SVSSS): ${parts.id}`);
    if (parts.en) lines.push(`English: ${parts.en}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.phrases) {
        lines.push('\nIntegrated phrases:');
        parts.phrases.forEach((p) => {
            const native = p.id || p.en || '';
            lines.push(`- ${native} → ${p.ko}`);
        });
    }
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    if (pkg?.catalogUrl) lines.push(`\nCatalog: ${pkg.catalogUrl}`);
    if (pkg?.ttmikBoot) lines.push(`TTMIK: TTMIK.html?${pkg.ttmikBoot}`);
    return lines.join('\n\n');
}

function buildWebnovelSvsssChapterLessons(startId) {
    const pkg = WEBNOVEL_PACKAGES.svsss;
    return WEBNOVEL_INTEGRATED_CHAPTERS.svsss.map((ch, i) => {
        const n = String(i + 1).padStart(2, '0');
        const url = `https://www.webnovel.com/book/${pkg.bookId}/${ch.chapterId}`;
        return createLesson({
            id: startId + i,
            title: `Vol 1 · ${ch.title} — ${ch.pins.join(' · ')}`,
            subtitle: 'SVSSS Chapter Pack',
            duration: '01:00',
            src: `${WEBNOVEL_PACKAGE_BASE}/SVSSS_Chapter_Pack/Ch_${String(ch.n).padStart(2, '0')}.mp3`,
            transcript: buildWebnovelPackageTranscript({
                packageId: 'svsss',
                chapterTitle: ch.title,
                url,
                phrases: ch.phrases,
                note: ch.note,
                pin: ch.pins[0]
            }),
            vocab: ch.phrases.map((p) => ({ ko: p.ko, en: p.id || p.en })),
            group: 'webnovel-package'
        });
    });
}

function buildWebnovelSoloChapterLessons(startId) {
    const pkg = WEBNOVEL_PACKAGES.soloLeveling;
    return WEBNOVEL_INTEGRATED_CHAPTERS.soloLeveling.map((ch, i) => {
        const slug = String(ch.index).padStart(3, '0');
        const url = `https://www.webnovel.com/comic/${pkg.comicId}/${ch.chapterId}`;
        return createLesson({
            id: startId + i,
            title: `${ch.title} — ${ch.pins.join(' · ')}`,
            subtitle: 'Solo Leveling Chapter Pack',
            duration: '01:00',
            src: `${WEBNOVEL_PACKAGE_BASE}/Solo_Chapter_Pack/Ch_${slug}.mp3`,
            transcript: buildWebnovelPackageTranscript({
                packageId: 'solo-leveling',
                chapterTitle: ch.title,
                url,
                phrases: ch.phrases,
                note: ch.note,
                pin: ch.pins[0]
            }),
            vocab: ch.phrases.map((p) => ({ ko: p.ko, en: p.en || p.id })),
            group: 'webnovel-package'
        });
    });
}

function buildWebnovelCatalogLessons(startId) {
    const drills = [
        {
            title: 'SVSSS — WebNovel synopsis & tags',
            packageId: 'svsss',
            en: 'B-points above zero — stay in character until OOC unlocks.',
            ko: 'B 포인트는 0 위 — OOC 풀릴 때까지 캐릭터 유지.',
            note: `${WEBNOVEL_PACKAGES.svsss.chapters} chapters · ${WEBNOVEL_PACKAGES.svsss.tags.join(' · ')} · ID translation`
        },
        {
            title: 'Solo Leveling — WebNovel comic license',
            packageId: 'solo-leveling',
            en: 'Only I level up — E-rank context, not destiny.',
            ko: '나 혼자만 레벨업 — E급은 맥락이지 운명이 아니에요.',
            note: `${WEBNOVEL_PACKAGES.soloLeveling.chapters} chapters · Completed · D&C MEDIA · ${WEBNOVEL_PACKAGES.soloLeveling.publishers.join(', ')}`
        },
        {
            title: 'After the Bamboo — SVSSS Ch.2 mirror',
            packageId: 'boys-love',
            en: 'Not a rescue mission — tea before feelings.',
            ko: '구출 임무가 아니에요 — 감정보다 차를 먼저.',
            note: `boys-love novel · WebNovel anchor Ch.2 · ${WEBNOVEL_PACKAGES.boysLove.novelApp}`
        },
        {
            title: 'WebNovel catalog browse — one pass only',
            packageId: 'svsss',
            en: 'One chapter pack · one breath · no binge spiral.',
            ko: '한 챕터 팩 · 한 숨 · 폭주 없이.',
            note: 'SVSSS catalog + Solo catalog + crossover library handoff'
        }
    ];

    return drills.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        const pkg = getWebnovelPackage(d.packageId === 'boys-love' ? 'boys-love' : d.packageId);
        const url = pkg.readUrl || pkg.homeUrl || pkg.novelApp;
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Catalog & Synopsis',
            duration: '00:45',
            src: `${WEBNOVEL_PACKAGE_BASE}/Catalog_Synopsis/Drill_${n}.mp3`,
            transcript: buildWebnovelPackageTranscript({
                packageId: d.packageId,
                url,
                en: d.en,
                ko: d.ko,
                note: d.note
            }),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'webnovel-package'
        });
    });
}

function generateWebnovelPackageLessons(startId) {
    let id = startId;
    const svsss = buildWebnovelSvsssChapterLessons(id);
    id += svsss.length;
    const solo = buildWebnovelSoloChapterLessons(id);
    id += solo.length;
    const catalog = buildWebnovelCatalogLessons(id);
    return svsss.concat(solo, catalog);
}

const WEBNOVEL_PACKAGE_COURSE_DEFS = [
    { subtitle: 'SVSSS Chapter Pack', trackCount: WEBNOVEL_INTEGRATED_CHAPTERS.svsss.length },
    { subtitle: 'Solo Leveling Chapter Pack', trackCount: WEBNOVEL_INTEGRATED_CHAPTERS.soloLeveling.length },
    { subtitle: 'Catalog & Synopsis', trackCount: 4 }
];

function getWebnovelPackageManifest() {
    return {
        generated: typeof WEBNOVEL_CATALOG_GENERATED !== 'undefined' ? WEBNOVEL_CATALOG_GENERATED : null,
        packages: WEBNOVEL_PACKAGES,
        svsssCatalogCount: getWebnovelCatalog('svsss').length,
        soloCatalogCount: getWebnovelCatalog('solo-leveling').length
    };
}