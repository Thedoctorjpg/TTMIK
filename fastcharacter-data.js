/**
 * Fast Character (fastcharacter.com) presets — D&D 5e PHB 2024
 * POST target: https://fastcharacter.com/results2024.php
 * Mirrors D&D Beyond class/species spread — all 12 core classes represented
 */

const FAST_CHARACTER_ENDPOINT = 'https://fastcharacter.com/results2024.php';

/** Skills with a dedicated sheet button block in skills.js (skip generic block) */
const FAST_CHARACTER_DEDICATED_UI_SKILLS = new Set([
    'heidi-alpine-wayfarer', 'sven-nordic-ranger', 'martin-nordic-guide',
    'ronaldo-portugal-glory', 'mbappe-france-attack', 'messi-argentina-playmaker',
    'vinicus-brasil-samba', 'harry-kane-england-striker', 'neon-evangelion',
    'rick-morty-multiverse', 'mika-road-dreamer', 'haley-vietbonnie'
]);

/** Heidi — German Wayfarer Bard muse · Flame-Kissed Bard companion sheet */
const FAST_CHARACTER_HEIDI = {
    id: 'heidi',
    label: 'Heidi — Alpine Wayfarer Bard',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Heidi',
    randomname: 'no',
    pcname: 'Heidi',
    pcclass: 'BardLore',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Wayfarer',
    pcgender: 'female',
    pcalignment: 'CN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'College of Lore · Level 5 · Chaotic Neutral — lantern pilgrimage ally'
};

/** Melbourne Lantern Bard — Bard Valor · scam/tsundere skit anchor */
const FAST_CHARACTER_MELBOURNE_BARD = {
    id: 'melbourne-lantern-bard',
    label: 'Melbourne Lantern Bard',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Lantern',
    randomname: 'no',
    pcname: 'Lantern',
    pcclass: 'BardValor',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Entertainer',
    pcgender: 'female',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'College of Valor · Level 5 · Chaotic Good — laneway skit · sovereign humor'
};

/** Flame-Kissed Bard — Bard Glamour · alchemy + sheet output */
const FAST_CHARACTER_FLAME_BARD = {
    id: 'flame-kissed-bard',
    label: 'Flame-Kissed Bard',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Flame',
    randomname: 'no',
    pcname: 'Flame',
    pcclass: 'BardGlamour',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Hermit',
    pcgender: 'female',
    pcalignment: 'CN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'College of Glamour · Level 5 · Chaotic Neutral — humor alchemy · character sheets'
};

/** Lo3tus — Rogue Thief · Halfling playful muse */
const FAST_CHARACTER_LO3TUS = {
    id: 'lo3tus',
    label: 'Lo3tus Muse',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Lo3tus',
    randomname: 'no',
    pcname: 'Lo3tus',
    pcclass: 'RogueThief',
    pclevel: '5',
    pcrace: 'Halfling',
    pcbkgrd: 'Charlatan',
    pcgender: 'female',
    pcalignment: 'CN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Thief · Level 5 · Halfling — deadpan dating skits · chaotic neutral spark'
};

/** Helen — Cleric Trickery · boundary teacher */
const FAST_CHARACTER_HELEN = {
    id: 'helen-neighbor',
    label: 'Helen — Boundary Teacher',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Helen',
    randomname: 'no',
    pcname: 'Helen',
    pcclass: 'ClericTrickery',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Acolyte',
    pcgender: 'female',
    pcalignment: 'LG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Trickery Domain · Level 5 · Lawful Good — 괜찮아요 boundary · cord-cut'
};

/** Sua — Monk Mercy · Tiefling shedding muse */
const FAST_CHARACTER_SUA = {
    id: 'sua-tattoo',
    label: 'Sua — Tattoo Flame',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Sua',
    randomname: 'no',
    pcname: 'Sua',
    pcclass: 'MonkMercy',
    pclevel: '5',
    pcrace: 'TieflingInfernal',
    pcbkgrd: 'Artisan',
    pcgender: 'female',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Way of Mercy · Level 5 · Tiefling Infernal — cicada shed · cord-cut'
};

/** Asuka — Bard Dance · High Elf distant flame */
const FAST_CHARACTER_ASUKA = {
    id: 'asuka-brisbane',
    label: 'Asuka — Distant Flame',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Asuka',
    randomname: 'no',
    pcname: 'Asuka',
    pcclass: 'BardDance',
    pclevel: '5',
    pcrace: 'ElfHigh',
    pcbkgrd: 'Entertainer',
    pcgender: 'female',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'College of Dance · Level 5 · High Elf — Brisbane maybe · Melbourne is my yes'
};

/** Rach3l — Wizard Diviner · observe without absorbing */
const FAST_CHARACTER_RACH3L = {
    id: 'rach3l',
    label: 'Rach3l — Sovereign Observer',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Rach3l',
    randomname: 'no',
    pcname: 'Rach3l',
    pcclass: 'WizardDiviner',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Scribe',
    pcgender: 'female',
    pcalignment: 'TN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Diviner · Scribe · DDB Investigator (VRGtR) narrative mirror · discernment · no absorption spiral'
};

/** Mari Ignan pilgrim — Druid Circle of the Sea */
const FAST_CHARACTER_IGNAN_PILGRIM = {
    id: 'ignan-pilgrim',
    label: 'Mari — Ignan Pilgrim',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Ignan',
    randomname: 'no',
    pcname: 'Mari',
    pcclass: 'DruidCircleSea',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Farmer',
    pcgender: 'female',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Circle of the Sea · Level 5 · Neutral Good — trilingual healing walk · BOTANIC'
};

/** Ignan grounding — Druid Circle of the Land */
const FAST_CHARACTER_IGNAN_GROUNDING = {
    id: 'ignan-grounding',
    label: 'Mari — Ignan Grounding',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Ground',
    randomname: 'no',
    pcname: 'Mari',
    pcclass: 'DruidCircleLand',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Hermit',
    pcgender: 'female',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Circle of the Land · Level 5 — post-DIB HOTEL landing · Ilokano grounding'
};

/** Ignan dalan — Druid Land · own-path walk */
const FAST_CHARACTER_IGNAN_DALAN = {
    id: 'ignan-dalan',
    label: 'Mari — Own-Path Dalan',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Dalan',
    randomname: 'no',
    pcname: 'Mari',
    pcclass: 'DruidCircleLand',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Wayfarer',
    pcgender: 'female',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Circle of the Land · Wayfarer — own dalan · aginana walk'
};

/** Spellfire anchor — Sorcerer Draconic · Dragonborn */
const FAST_CHARACTER_SORCERER = {
    id: 'sorcerer',
    label: 'Spellfire Sorcery',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Sorcerer',
    randomname: 'no',
    pcname: 'Spellfire',
    pcclass: 'SorcererDraconic',
    pclevel: '5',
    pcrace: 'DragonbornGold',
    pcbkgrd: 'Entertainer',
    pcgender: 'female',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Draconic Bloodline · Level 5 · Gold Dragonborn — DDB Spellfire Sorcery build'
};

/** Citadel cousin — Warlock Great Old One */
const FAST_CHARACTER_WARLOCK = {
    id: 'warlock',
    label: 'Multiverse Warlock',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Warlock',
    randomname: 'no',
    pcname: 'Citadel',
    pcclass: 'WarlockGreatOldOne',
    pclevel: '5',
    pcrace: 'TieflingChthonic',
    pcbkgrd: 'Sage',
    pcgender: 'neutral',
    pcalignment: 'CN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Great Old One · Level 5 · Tiefling Chthonic — multiverse pact · observe don\'t absorb'
};

/** Monster Slayer proxy — Ranger Hunter + Guide (DDB XGtE Monster Slayer not in Fast Character 2024) */
const FAST_CHARACTER_MONSTER_SLAYER = {
    id: 'monster-slayer',
    label: 'Monster Slayer — Hunter',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Slayer',
    randomname: 'no',
    pcname: 'Slayer',
    pcclass: 'RangerHunter',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Guide',
    pcgender: 'female',
    pcalignment: 'LN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Hunter (Colossus Slayer) + Guide · DDB Monster Slayer mirror · scam/tarot boundary hunt'
};

/** Sven — Swedish Nordic Ranger muse · rach3l discernment companion */
const FAST_CHARACTER_SVEN = {
    id: 'sven',
    label: 'Sven — Nordic Ranger',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Sven',
    randomname: 'no',
    pcname: 'Sven',
    pcclass: 'RangerFeyWanderer',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Outlander',
    pcgender: 'male',
    pcalignment: 'TN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Fey Wanderer · Level 5 · True Neutral — Moon-card calm ally'
};

/** Martin — Goliath Nordic Guide · World Tree */
const FAST_CHARACTER_MARTIN = {
    id: 'martin',
    label: 'Martin — Nordic Guide',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Martin',
    randomname: 'no',
    pcname: 'Martin',
    pcclass: 'BarbarianWorldTree',
    pclevel: '5',
    pcrace: 'GoliathHill',
    pcbkgrd: 'Guide',
    pcgender: 'male',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'World Tree · Level 5 · Goliath Hill — fjord pilgrimage guide'
};

/** Rei Ayanami — Cleric Life · High Elf observer */
const FAST_CHARACTER_REI = {
    id: 'rei',
    label: 'Rei Ayanami — Evangelion Observer',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Rei',
    randomname: 'no',
    pcname: 'Rei',
    pcclass: 'ClericLife',
    pclevel: '5',
    pcrace: 'ElfHigh',
    pcbkgrd: 'Hermit',
    pcgender: 'female',
    pcalignment: 'LN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Life Domain · Level 5 · High Elf — NERV Moon-card neon ally'
};

/** @deprecated alias — use FAST_CHARACTER_REI */
const FAST_CHARACTER_NEON = FAST_CHARACTER_REI;

const FAST_CHARACTER_KANE = {
    id: 'kane',
    label: 'Kane — England Striker',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Kane',
    randomname: 'no',
    pcname: 'Kane',
    pcclass: 'FighterChampion',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Soldier',
    pcgender: 'male',
    pcalignment: 'LG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Champion · Level 5 · Lawful Good — Three Lions captain striker ally'
};

/** Vinicus — Brazilian Open Hand Monk muse · samba jogo bonito after La Boca */
const FAST_CHARACTER_VINICUS = {
    id: 'vinicus',
    label: 'Vinicus — Brasil Samba',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Vinicus',
    randomname: 'no',
    pcname: 'Vinicus',
    pcclass: 'MonkOpenHand',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Entertainer',
    pcgender: 'male',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Open Hand · Level 5 · Chaotic Good — samba jogo bonito Brasil ally'
};

/** Messi — Argentine Mastermind Rogue muse · post cook-off playmaker */
const FAST_CHARACTER_MESSI = {
    id: 'messi',
    label: 'Messi — Argentina Playmaker',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Messi',
    randomname: 'no',
    pcname: 'Messi',
    pcclass: 'RogueMastermind',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Urchin',
    pcgender: 'male',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Mastermind · Level 5 · Neutral Good — post cook-off Argentina ally'
};

/** Haley Boba (@vietbonnie) — Medea Caster mirror · Wizard Abjurer */
const FAST_CHARACTER_HALEY = {
    id: 'haley',
    label: 'Haley Boba — Medea Caster Mirror',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Haley',
    randomname: 'no',
    pcname: 'Haley',
    pcclass: 'WizardAbjurer',
    pclevel: '5',
    pcrace: 'TieflingChthonic',
    pcbkgrd: 'Sage',
    pcgender: 'female',
    pcalignment: 'LG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Abjurer · Level 5 · Tiefling Chthonic — Medea Caster mirror · vietbonnie'
};

/** Mika — Ranger Horizon Walker muse · Ep 7.4 open-road dreamer */
const FAST_CHARACTER_MIKA = {
    id: 'mika',
    label: 'Mika — Open Road Dreamer',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Mika',
    randomname: 'no',
    pcname: 'Mika',
    pcclass: 'RangerHorizonWalker',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Outlander',
    pcgender: 'female',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Horizon Walker · Level 5 · Chaotic Good — open-road crew loyalty ally'
};

/** Sung Jinwoo — Fighter Champion muse · Ep 7.7 Solo Leveling dungeon gate */
const FAST_CHARACTER_SUNG_JINWOO = {
    id: 'sung-jinwoo-solo-leveling',
    label: 'Sung Jinwoo — Solo Leveling Hunter',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-SL',
    randomname: 'no',
    pcname: 'Sung Jinwoo',
    pcclass: 'FighterChampion',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Soldier',
    pcgender: 'male',
    pcalignment: 'LN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Champion · Level 5 · E-rank proxy — family breadwinner · dagger better than nothing'
};

/** Shen Qingqiu — Monk Kensei muse · Ep 7.6 SVSSS System bound */
const FAST_CHARACTER_SHEN_QINGQIU = {
    id: 'shen-qingqiu-svsss',
    label: 'Shen Qingqiu — SVSSS System Bound',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-SVQ',
    randomname: 'no',
    pcname: 'Shen Qingqiu',
    pcclass: 'MonkKensei',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Sage',
    pcgender: 'male',
    pcalignment: 'LN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Kensei · Level 5 · Pedang Xiu Ya — trash-villain facade · B-point guard'
};

/** Rick — Artificer Sage muse · Ep 7.2 Citadel multiverse SQL */
const FAST_CHARACTER_RICK = {
    id: 'rick',
    label: 'Rick — Multiverse Artificer',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Rick',
    randomname: 'no',
    pcname: 'Rick',
    pcclass: 'Artificer',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Sage',
    pcgender: 'male',
    pcalignment: 'CN',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Artificer · Level 5 · Chaotic Neutral — Citadel portal SQL index ally'
};

/** Mbappé — French Battle Master Fighter muse · FIFA counter-attack */
const FAST_CHARACTER_MBAPPE = {
    id: 'mbappe',
    label: 'Mbappé — France Attack',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Mbappe',
    randomname: 'no',
    pcname: 'Mbappe',
    pcclass: 'FighterBattleMaster',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Soldier',
    pcgender: 'male',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Battle Master · Level 5 · Chaotic Good — counter-attack FIFA ally'
};

/** Ronaldo — Portuguese Glory Paladin muse · FIFA cantina celebration */
const FAST_CHARACTER_RONALDO = {
    id: 'ronaldo',
    label: 'Ronaldo — Portugal Glory',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Ronaldo',
    randomname: 'no',
    pcname: 'Ronaldo',
    pcclass: 'PaladinGlory',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Entertainer',
    pcgender: 'male',
    pcalignment: 'CG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'Oath of Glory · Level 5 · Chaotic Good — FIFA cantina ally'
};

const FAST_CHARACTER_PRESETS = {
    heidi: FAST_CHARACTER_HEIDI,
    'melbourne-lantern-bard': FAST_CHARACTER_MELBOURNE_BARD,
    'flame-kissed-bard': FAST_CHARACTER_FLAME_BARD,
    lo3tus: FAST_CHARACTER_LO3TUS,
    'helen-neighbor': FAST_CHARACTER_HELEN,
    'sua-tattoo': FAST_CHARACTER_SUA,
    'asuka-brisbane': FAST_CHARACTER_ASUKA,
    rach3l: FAST_CHARACTER_RACH3L,
    'ignan-pilgrim': FAST_CHARACTER_IGNAN_PILGRIM,
    'ignan-grounding': FAST_CHARACTER_IGNAN_GROUNDING,
    'ignan-dalan': FAST_CHARACTER_IGNAN_DALAN,
    sorcerer: FAST_CHARACTER_SORCERER,
    warlock: FAST_CHARACTER_WARLOCK,
    'monster-slayer': FAST_CHARACTER_MONSTER_SLAYER,
    sven: FAST_CHARACTER_SVEN,
    martin: FAST_CHARACTER_MARTIN,
    ronaldo: FAST_CHARACTER_RONALDO,
    mbappe: FAST_CHARACTER_MBAPPE,
    messi: FAST_CHARACTER_MESSI,
    vinicus: FAST_CHARACTER_VINICUS,
    kane: FAST_CHARACTER_KANE,
    rei: FAST_CHARACTER_REI,
    neon: FAST_CHARACTER_REI,
    mika: FAST_CHARACTER_MIKA,
    haley: FAST_CHARACTER_HALEY,
    vietbonnie: FAST_CHARACTER_HALEY,
    rick: FAST_CHARACTER_RICK,
    rickmorty: FAST_CHARACTER_RICK,
    'shen-qingqiu-svsss': FAST_CHARACTER_SHEN_QINGQIU,
    svsss: FAST_CHARACTER_SHEN_QINGQIU,
    'sung-jinwoo-solo-leveling': FAST_CHARACTER_SUNG_JINWOO,
    'solo-leveling': FAST_CHARACTER_SUNG_JINWOO,
    jinwoo: FAST_CHARACTER_SUNG_JINWOO,
    'boys-love-qing-binghe': FAST_CHARACTER_SHEN_QINGQIU,
    'boys-love': FAST_CHARACTER_SHEN_QINGQIU,
    bamboo: FAST_CHARACTER_SHEN_QINGQIU,
    qingbinghe: FAST_CHARACTER_SHEN_QINGQIU
};

function getFastCharacterPresetForSkill(skillId) {
    return FAST_CHARACTER_PRESETS[skillId] || null;
}

function formatFastCharacterSheetTitle(preset) {
    if (!preset) return 'Fast Character sheet';
    const cls = (preset.pcclass || '').replace(/([A-Z])/g, ' $1').trim();
    const race = preset.pcrace || 'human';
    return `fastcharacter.com · ${preset.pcname || 'PC'} · ${cls} · ${race} · L${preset.pclevel || '5'}`;
}

function buildFastCharacterFormData(preset) {
    const p = preset || FAST_CHARACTER_HEIDI;
    return {
        playername: p.playername || '',
        playercode: p.playercode || '',
        randomname: p.randomname || 'no',
        pcname: p.pcname || '',
        pcclass: p.pcclass || 'BardLore',
        pclevel: p.pclevel || '5',
        pcrace: p.pcrace || 'human',
        pcbkgrd: p.pcbkgrd || 'Wayfarer',
        pcgender: p.pcgender || 'female',
        pcalignment: p.pcalignment || 'CN',
        pcformat: p.pcformat || 'text',
        pcidealbondflaw: p.pcidealbondflaw || 'yes',
        pcrulescrib: p.pcrulescrib || 'yes',
        submit: 'CLICK TO CREATE CHARACTER'
    };
}

function openFastCharacterSheet(preset) {
    const data = buildFastCharacterFormData(preset);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FAST_CHARACTER_ENDPOINT;
    form.target = '_blank';
    form.rel = 'noopener noreferrer';
    Object.entries(data).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    form.remove();
}

function openFastCharacterForSkill(skillId) {
    const preset = getFastCharacterPresetForSkill(skillId);
    if (preset) openFastCharacterSheet(preset);
}

function openFastCharacterClassAnchor(anchorId) {
    const preset = FAST_CHARACTER_PRESETS[anchorId];
    if (preset) openFastCharacterSheet(preset);
}

function openFastCharacterHeidi() { openFastCharacterSheet(FAST_CHARACTER_HEIDI); }
function openFastCharacterMelbourneBard() { openFastCharacterSheet(FAST_CHARACTER_MELBOURNE_BARD); }
function openFastCharacterFlameBard() { openFastCharacterSheet(FAST_CHARACTER_FLAME_BARD); }
function openFastCharacterLo3tus() { openFastCharacterSheet(FAST_CHARACTER_LO3TUS); }
function openFastCharacterHelen() { openFastCharacterSheet(FAST_CHARACTER_HELEN); }
function openFastCharacterSua() { openFastCharacterSheet(FAST_CHARACTER_SUA); }
function openFastCharacterAsuka() { openFastCharacterSheet(FAST_CHARACTER_ASUKA); }
function openFastCharacterRach3l() { openFastCharacterSheet(FAST_CHARACTER_RACH3L); }
function openFastCharacterIgnanPilgrim() { openFastCharacterSheet(FAST_CHARACTER_IGNAN_PILGRIM); }
function openFastCharacterIgnanGrounding() { openFastCharacterSheet(FAST_CHARACTER_IGNAN_GROUNDING); }
function openFastCharacterIgnanDalan() { openFastCharacterSheet(FAST_CHARACTER_IGNAN_DALAN); }
function openFastCharacterSorcerer() { openFastCharacterSheet(FAST_CHARACTER_SORCERER); }
function openFastCharacterWarlock() { openFastCharacterSheet(FAST_CHARACTER_WARLOCK); }
function openFastCharacterMonsterSlayer() { openFastCharacterSheet(FAST_CHARACTER_MONSTER_SLAYER); }
function openFastCharacterSven() { openFastCharacterSheet(FAST_CHARACTER_SVEN); }
function openFastCharacterMartin() { openFastCharacterSheet(FAST_CHARACTER_MARTIN); }
function openFastCharacterRonaldo() { openFastCharacterSheet(FAST_CHARACTER_RONALDO); }
function openFastCharacterMbappe() { openFastCharacterSheet(FAST_CHARACTER_MBAPPE); }
function openFastCharacterMessi() { openFastCharacterSheet(FAST_CHARACTER_MESSI); }
function openFastCharacterVinicus() { openFastCharacterSheet(FAST_CHARACTER_VINICUS); }
function openFastCharacterKane() { openFastCharacterSheet(FAST_CHARACTER_KANE); }
function openFastCharacterRei() { openFastCharacterSheet(FAST_CHARACTER_REI); }
function openFastCharacterNeon() { openFastCharacterRei(); }
function openFastCharacterMika() { openFastCharacterSheet(FAST_CHARACTER_MIKA); }
function openFastCharacterHaley() { openFastCharacterSheet(FAST_CHARACTER_HALEY); }
function openFastCharacterVietbonnie() { openFastCharacterHaley(); }
function openFastCharacterRick() { openFastCharacterSheet(FAST_CHARACTER_RICK); }
function openFastCharacterShenQingqiu() { openFastCharacterSheet(FAST_CHARACTER_SHEN_QINGQIU); }
function openFastCharacterSvsss() { openFastCharacterShenQingqiu(); }
function openFastCharacterSungJinwoo() { openFastCharacterSheet(FAST_CHARACTER_SUNG_JINWOO); }
function openFastCharacterSoloLeveling() { openFastCharacterSungJinwoo(); }

/** D&D Beyond gap-fill class anchors — not tied to a single archetype skill */
const FAST_CHARACTER_CLASS_ANCHORS = [
    { id: 'sorcerer', label: 'Sorcerer Draconic · DragonbornGold' },
    { id: 'warlock', label: 'Warlock Great Old One · TieflingChthonic' },
    { id: 'monster-slayer', label: 'Monster Slayer · Ranger Hunter + Guide (DDB XGtE proxy)' }
];