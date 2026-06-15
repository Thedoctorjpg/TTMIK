/**
 * Fast Character (fastcharacter.com) presets — D&D 5e PHB 2024
 * POST target: https://fastcharacter.com/results2024.php
 */

const FAST_CHARACTER_ENDPOINT = 'https://fastcharacter.com/results2024.php';

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

/** Martin — Norwegian Nordic Guide muse · Ep 8 World-card completion */
const FAST_CHARACTER_MARTIN = {
    id: 'martin',
    label: 'Martin — Nordic Guide',
    playername: 'Melbourne Lantern Pilgrimage',
    playercode: 'TTMIK-Martin',
    randomname: 'no',
    pcname: 'Martin',
    pcclass: 'BarbarianWorldTree',
    pclevel: '5',
    pcrace: 'human',
    pcbkgrd: 'Guide',
    pcgender: 'male',
    pcalignment: 'NG',
    pcformat: 'text',
    pcidealbondflaw: 'yes',
    pcrulescrib: 'yes',
    note: 'World Tree · Level 5 · Neutral Good — fjord pilgrimage guide'
};

/** Kane — English Champion Fighter muse · Three Lions striker after Brasil samba */
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
    sven: FAST_CHARACTER_SVEN,
    martin: FAST_CHARACTER_MARTIN,
    ronaldo: FAST_CHARACTER_RONALDO,
    mbappe: FAST_CHARACTER_MBAPPE,
    messi: FAST_CHARACTER_MESSI,
    vinicus: FAST_CHARACTER_VINICUS,
    kane: FAST_CHARACTER_KANE
};

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

function openFastCharacterHeidi() {
    openFastCharacterSheet(FAST_CHARACTER_HEIDI);
}

function openFastCharacterSven() {
    openFastCharacterSheet(FAST_CHARACTER_SVEN);
}

function openFastCharacterMartin() {
    openFastCharacterSheet(FAST_CHARACTER_MARTIN);
}

function openFastCharacterRonaldo() {
    openFastCharacterSheet(FAST_CHARACTER_RONALDO);
}

function openFastCharacterMbappe() {
    openFastCharacterSheet(FAST_CHARACTER_MBAPPE);
}

function openFastCharacterMessi() {
    openFastCharacterSheet(FAST_CHARACTER_MESSI);
}

function openFastCharacterVinicus() {
    openFastCharacterSheet(FAST_CHARACTER_VINICUS);
}

function openFastCharacterKane() {
    openFastCharacterSheet(FAST_CHARACTER_KANE);
}