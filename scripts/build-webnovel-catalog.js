#!/usr/bin/env node
/**
 * Build webnovel-catalog-data.js from WebNovel TOC (book + comic).
 * Run: node scripts/build-webnovel-catalog.js
 * Source: https://www.webnovel.com/book/35203689408704405
 *         https://www.webnovel.com/comic/15227640605485101
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'webnovel-catalog-data.js');

const SVSSS_BOOK_ID = '35203689408704405';

/** WebNovel SVSSS ID translation — Volume 1 · 109 chapters (synced 2026-06-18) */
const SVSSS_CHAPTERS = [
    ['94532538348928087', 'Chapter 1', false],
    ['94532556736753619', 'Chapter 2', false],
    ['94547624689985181', 'Chapter 3', false],
    ['94547638648624112', 'Chapter 4', false],
    ['94532612705535485', 'Chapter 5', false],
    ['94547797025548533', 'Chapter 6', false],
    ['94547805481264437', 'Chapter 7', false],
    ['94547820513643513', 'Chapter 8', false],
    ['94554640921720675', 'Chapter 9', false],
    ['94554649914308233', 'Chapter 10', false],
    ['94554655685663867', 'Chapter 11', false],
    ['94556072488006707', 'Chapter 12', false],
    ['94556082017464455', 'Chapter 13', false],
    ['94556202947635716', 'Chapter 14', false],
    ['94556214356143944', 'Chapter 15', false],
    ['94556272069759193', 'Chapter 16', false],
    ['94556356358498733', 'Chapter 17', false],
    ['94556396892253349', 'Chapter 18', false],
    ['94556572314824598', 'Chapter 19', false],
    ['94556403603143751', 'Chapter 20', false],
    ['94595690340087800', 'Chapter 21', false],
    ['94595722820774450', 'Chapter 22', false],
    ['94595767381059792', 'Chapter 23', false],
    ['94595779326434336', 'Chapter 24', false],
    ['94765046135055500', 'Chapter 25', false],
    ['94768110459996684', 'Chapter 26', false],
    ['94781389022486877', 'Chapter 27', false],
    ['94782337673384866', 'Chapter 28', false],
    ['94595801203926381', 'Chapter 29', false],
    ['94595811941348440', 'Chapter 30', false],
    ['94672806343670775', 'Chapter 31', false],
    ['94672822181351824', 'Chapter 32', false],
    ['94824222597116206', 'Chapter 33', false],
    ['94672910093969182', 'Chapter 34', false],
    ['94825892668297196', 'Chapter 35', false],
    ['94672951164592366', 'Chapter 36', false],
    ['94834984845638416', 'Chapter 37', false],
    ['94672985121679991', 'Chapter 38', false],
    ['94835657813320277', 'Chapter 39', false],
    ['94673085382320868', 'Chapter 40', false],
    ['94869637312865431', 'Chapter 41', false],
    ['94909898202073305', 'Chapter 42', false],
    ['94673106320279113', 'Chapter 43', false],
    ['94915528367327816', 'Chapter 44', false],
    ['94673110749463508', 'Chapter 45', false],
    ['94673111152126538', 'Chapter 46', false],
    ['94935204954697720', 'Chapter 47', false],
    ['94673129271520409', 'Chapter 48', false],
    ['94673129942602343', 'Chapter 49', false],
    ['94686903365858754', 'Chapter 50', false],
    ['94686909808298985', 'Chapter 51', false],
    ['94949728386612874', 'Chapter 52', false],
    ['94686909674087953', 'Chapter 53', false],
    ['94970774129007011', 'Chapter 54', false],
    ['94686960676828731', 'Chapter 55', false],
    ['94686962019006460', 'Chapter 56', false],
    ['95042099442929491', 'Chapter 57', false],
    ['95042285602914815', 'Chapter 58', false],
    ['94691878817028960', 'Chapter 59', false],
    ['94691910223973874', 'Chapter 60', false],
    ['95055951249329686', 'Chapter 61', false],
    ['95056143180684586', 'Chapter 62', false],
    ['94763974406494416', 'Chapter 63', false],
    ['94764004739699162', 'Chapter 64', false],
    ['95079880928051984', 'Chapter 65', false],
    ['95084832756919286', 'Chapter 66', false],
    ['95105436117691519', 'Chapter 67', false],
    ['95105549665888385', 'Chapter 68', false],
    ['95105587649507994', 'Chapter 69', false],
    ['95106070028009576', 'Chapter 70', false],
    ['94764067956256161', 'Chapter 71', false],
    ['95105956211387875', 'Chapter 72', false],
    ['94764107818921163', 'Chapter 73', false],
    ['95134450903475639', 'Chapter 74', false],
    ['95134683905455581', 'Chapter 75', false],
    ['95134706454024397', 'Chapter 76', false],
    ['95134753296020152', 'Chapter 77', false],
    ['95134771683845615', 'Chapter 78', false],
    ['95135659936770034', 'Chapter 79', false],
    ['95135690269971760', 'Chapter 80', false],
    ['95135729193110115', 'Chapter 81 - Ekstra', true],
    ['95313253076360881', 'Chapter 82 - Ekstra', true],
    ['95313382059591733', 'Chapter 83 - Ekstra', true],
    ['95135757378843530', 'Chapter 84 - Ekstra', true],
    ['95135780464285759', 'Chapter 85 - Ekstra', true],
    ['95135795765111699', 'Chapter 86 - Ekstra', true],
    ['95314114888395024', 'Chapter 86.2 - Ekstra', true],
    ['95135843680835163', 'Chapter 86.3 - Ekstra', true],
    ['95136475846336843', 'Chapter 87 - Ekstra', true],
    ['95315236411732971', 'Chapter 88 - Ekstra', true],
    ['95136519467105891', 'Chapter 89 - Ekstra', true],
    ['95315728990782221', 'Chapter 90 - Ekstra', true],
    ['95315336940798577', 'Chapter 91 - Ekstra', true],
    ['95315544844063080', 'Chapter 92 - Ekstra', true],
    ['95315984809782386', 'Chapter 93 - Ekstra', true],
    ['95316025343528183', 'Chapter 94 - Ekstra', true],
    ['95854856505445481', 'Chapter 95 - Ekstra', true],
    ['95854897710288417', 'Chapter 96 - Ekstra', true],
    ['95854943344326945', 'Chapter 97 - Ekstra', true],
    ['95854969114120186', 'Chapter 98 - Ekstra', true],
    ['95854989380998639', 'Chapter 99 - Ekstra', true],
    ['95854996897193753', 'Chapter 100 - Ekstra', true],
    ['95855055416121377', 'Chapter 101 - Ekstra', true],
    ['95855080380624327', 'Chapter 102 - Ekstra', true],
    ['95855097292062193', 'Chapter 103 - Ekstra', true],
    ['95855119572193407', 'Chapter 104 - Ekstra', true],
    ['95855147623696393', 'Chapter 105 - Ekstra', true],
    ['95855170306490894', 'Chapter 106 - Ekstra', true],
    ['95855179433298815', 'Chapter 107 - Ekstra [ TAMAT ]', true]
];

const SOLO_COMIC_ID = '15227640605485101';

/** WebNovel Solo Leveling comic — first arc + season markers (synced 2026-06-18) */
const SOLO_CHAPTERS = [
    ['45196186038101142', '000 Only I Level Up', 0],
    ['45196190333068497', '001 The Weakest Hunter', 1],
    ['45196193805954613', '002 Double Dungeon', 2],
    ['45196197043954998', '003 Statue', 3],
    ['45196200802051427', '004 "The Lord"', 4],
    ['45196206153985756', '005 The Rules of the Dungeon', 5],
    ['45196209643646729', '006 Terror', 6],
    ['45196213418518039', '007 The Thread Between Life and Death', 7],
    ['45196219860969065', '008 The Altar of Life', 8],
    ['45196223602290597', '009 The Exit is Open', 9],
    ['45196226823516103', '010 Becoming a "Player"', 10],
    ['45196909723305287', '011 The System\'s Punishment', 11],
    ['45196913229757563', '012 The Reawakening of the Weak', 12],
    ['45196916719418548', '013 Solo Against the Wolves', 13],
    ['45196920192288234', '014 Wolf Slayer', 14],
    ['45196977385821028', '015 Dungeon Boss', 15],
    ['45196981412352942', '016 Eliminate Kasaka', 16],
    ['45196985170449373', '017 A Single Strike!', 17],
    ['45196988928545833', '018 Attack Force! Set Out!', 18],
    ['45196992686642261', '019 A Bad Feeling', 19],
    ['45196996427963760', '020 Betrayal', 20],
    ['47326017622179431', 'Season 2 Arrived!', 112],
    ['45307001009390453', '110 S1 Ending-I Will Continue Pressing On', 111]
];

function buildChapterRows(bookId, chapters, type) {
    return chapters.map((row, i) => {
        const [chapterId, title, extra] = row;
        const n = type === 'comic' ? (typeof extra === 'number' ? extra : i) : i + 1;
        const isExtra = type === 'book' ? !!extra : false;
        const base = type === 'comic' ? 'comic' : 'book';
        return {
            n,
            title,
            chapterId,
            url: `https://www.webnovel.com/${base}/${bookId}/${chapterId}`,
            ...(isExtra ? { isExtra: true } : {}),
            ...(type === 'comic' && typeof extra === 'number' ? { index: extra } : {})
        };
    });
}

const svsssRows = buildChapterRows(SVSSS_BOOK_ID, SVSSS_CHAPTERS, 'book');
const soloRows = buildChapterRows(SOLO_COMIC_ID, SOLO_CHAPTERS, 'comic');

const out = `/**
 * WebNovel catalog — generated from WebNovel TOC
 * Regenerate: node scripts/build-webnovel-catalog.js
 * SVSSS: https://www.webnovel.com/book/${SVSSS_BOOK_ID}
 * Solo: https://www.webnovel.com/comic/${SOLO_COMIC_ID}
 */
const WEBNOVEL_CATALOG_GENERATED = '${new Date().toISOString().slice(0, 10)}';

const WEBNOVEL_SVSSS_CATALOG = ${JSON.stringify(svsssRows, null, 4)};

const WEBNOVEL_SOLO_LEVELING_CATALOG = ${JSON.stringify(soloRows, null, 4)};
`;

fs.writeFileSync(OUT, out, 'utf8');
console.log(`Wrote ${OUT}`);
console.log(`  SVSSS chapters: ${svsssRows.length}`);
console.log(`  Solo chapters (indexed): ${soloRows.length}`);