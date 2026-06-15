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

const FAST_CHARACTER_PRESETS = {
    heidi: FAST_CHARACTER_HEIDI,
    sven: FAST_CHARACTER_SVEN,
    martin: FAST_CHARACTER_MARTIN
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