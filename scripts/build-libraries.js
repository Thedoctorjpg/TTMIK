#!/usr/bin/env node
/**
 * Build all TTMIK specialty libraries + Hermes heal-skills output.
 * Run: node scripts/build-libraries.js
 */
const path = require('path');
const { execSync } = require('child_process');
const { healSkills, SKILLS, HEALING_FACTOR_BY_SKILL } = require('../packages/ttmik-heal-skills/lib/heal-skills');

const ROOT = path.join(__dirname, '..');

const LIBRARY_GROUPS = [
    { label: 'TTMIK Courses', group: 'ttmik', source: 'lesson-data.js (COURSE_DEFS)' },
    { label: 'Sovereign Guide', group: 'sovereign', source: 'sovereign-data.js' },
    { label: 'Melbourne Journey', group: 'melbourne', source: 'sovereign-data.js' },
    { label: 'Healing Factors Library', group: 'heal', source: 'heal-library.js → healing-library-data.js' },
    { label: 'Mexico Library', group: 'mexico', source: 'fifa-nations-data.js' },
    { label: 'Canada Library', group: 'canada', source: 'fifa-nations-data.js' },
    { label: 'USA Library', group: 'usa', source: 'fifa-nations-data.js' },
    { label: 'Ignan Library', group: 'ignan', source: 'ignan-data.js' },
    { label: 'Asuka Library', group: 'asuka', source: 'asuka-data.js' },
    { label: 'Heidi Library', group: 'heidi', source: 'heidi-data.js' },
    { label: 'Sven Library', group: 'sven', source: 'sven-data.js' },
    { label: 'Martin Library', group: 'martin', source: 'martin-data.js' },
    { label: 'Ronaldo Library', group: 'ronaldo', source: 'ronaldo-data.js' },
    { label: 'Mbappé Library', group: 'mbappe', source: 'mbappe-data.js' },
    { label: 'Messi Library', group: 'messi', source: 'messi-data.js' },
    { label: 'Vinicus Library', group: 'vinicus', source: 'vinicus-data.js' },
    { label: 'Kane Library', group: 'kane', source: 'kane-data.js' },
    { label: 'Evangelion Library', group: 'evangelion', source: 'evangelion-data.js' },
    { label: 'Rick & Morty Multiverse Library', group: 'rickmorty', source: 'rickmorty-data.js' },
    { label: 'Mika Library', group: 'mika', source: 'mika-data.js' },
    { label: 'Haley Library', group: 'haley', source: 'haley-data.js' },
    { label: 'SVSSS Library', group: 'svsss', source: 'svsss-data.js' },
    { label: 'Solo Leveling Library', group: 'solo-leveling', source: 'solo-leveling-data.js' }
];

function getLibraryCounts() {
    const vm = require('vm');
    const fs = require('fs');
    const sources = ['utils.js', 'sovereign-data.js', 'ignan-data.js', 'asuka-data.js', 'heidi-data.js', 'sven-data.js', 'martin-data.js', 'ronaldo-data.js', 'mbappe-data.js', 'messi-data.js', 'vinicus-data.js', 'kane-data.js', 'evangelion-data.js', 'rickmorty-data.js', 'mika-data.js', 'haley-data.js', 'svsss-data.js', 'solo-leveling-data.js', 'healing-library-data.js', 'fifa-nations-data.js']
        .map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8'))
        .join('\n');
    const code = `${sources}
;({
    sovereign: SOVEREIGN_COURSE_DEFS.filter((d) => d.group === 'sovereign')
        .reduce((sum, d) => sum + d.tracks.length, 0),
    melbourne: SOVEREIGN_COURSE_DEFS.filter((d) => d.group === 'melbourne')
        .reduce((sum, d) => sum + d.tracks.length, 0),
    heal: generateHealingLibraryLessons(1).length,
    mexico: generateMexicoLibraryLessons(1).length,
    canada: generateCanadaLibraryLessons(1).length,
    usa: generateUsaLibraryLessons(1).length,
    ignan: generateIgnanLibraryLessons(1).length,
    asuka: generateAsukaLibraryLessons(1).length,
    heidi: generateHeidiLibraryLessons(1).length,
    sven: generateSvenLibraryLessons(1).length,
    martin: generateMartinLibraryLessons(1).length,
    ronaldo: generateRonaldoLibraryLessons(1).length,
    mbappe: generateMbappeLibraryLessons(1).length,
    messi: generateMessiLibraryLessons(1).length,
    vinicus: generateVinicusLibraryLessons(1).length,
    kane: generateKaneLibraryLessons(1).length,
    evangelion: generateEvangelionLibraryLessons(1).length,
    rickmorty: generateRickMortyLibraryLessons(1).length,
    mika: generateMikaLibraryLessons(1).length,
    haley: generateHaleyLibraryLessons(1).length
});`;
    const sandbox = { console };
    vm.createContext(sandbox);
    const counts = vm.runInContext(code, sandbox);
    return { ttmik: 150, ...counts };
}

console.log('TTMIK library build\n');

console.log('Heal library from sources:');
const { healLibrary } = require('../packages/ttmik-heal-skills/lib/heal-library');
healLibrary(ROOT);
console.log('');

console.log('Hermes heal-skills:');
const healed = healSkills(ROOT);
console.log(`  ${healed} skills written to .devin/skills, repo root, ~/.hermes/skills/creative/\n`);

const libraryCounts = getLibraryCounts();

console.log('Library track counts:');
let total = 0;
LIBRARY_GROUPS.forEach(({ label, group, source }) => {
    const count = libraryCounts[group] || 0;
    total += count;
    console.log(`  ${label.padEnd(28)} ${String(count).padStart(3)} tracks  (${source})`);
});
console.log(`  ${'All libraries'.padEnd(28)} ${String(total).padStart(3)} tracks\n`);

console.log('Healing factors per skill:');
Object.entries(HEALING_FACTOR_BY_SKILL).forEach(([skillId, factors]) => {
    console.log(`  ${skillId}: ${factors.join(', ')}`);
});

console.log(`\nSkills with healing factors: ${Object.keys(HEALING_FACTOR_BY_SKILL).length}`);
console.log(`Hermes archetypes healed: ${SKILLS.length}`);

console.log('\nRunning syntax checks...');
execSync('node scripts/build.js', { cwd: ROOT, stdio: 'inherit' });

console.log('\nAll libraries built.');