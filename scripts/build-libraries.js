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
    { label: 'Healing Factors Library', group: 'heal', source: 'healing-library-data.js' },
    { label: 'Ignan Library', group: 'ignan', source: 'ignan-data.js' },
    { label: 'Asuka Library', group: 'asuka', source: 'asuka-data.js' }
];

function getLibraryCounts() {
    const vm = require('vm');
    const fs = require('fs');
    const sources = ['utils.js', 'sovereign-data.js', 'ignan-data.js', 'asuka-data.js', 'healing-library-data.js']
        .map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8'))
        .join('\n');
    const code = `${sources}
;({
    sovereign: SOVEREIGN_COURSE_DEFS.filter((d) => d.group === 'sovereign')
        .reduce((sum, d) => sum + d.tracks.length, 0),
    melbourne: SOVEREIGN_COURSE_DEFS.filter((d) => d.group === 'melbourne')
        .reduce((sum, d) => sum + d.tracks.length, 0),
    heal: generateHealingLibraryLessons(1).length,
    ignan: generateIgnanLibraryLessons(1).length,
    asuka: generateAsukaLibraryLessons(1).length
});`;
    const sandbox = { console };
    vm.createContext(sandbox);
    const counts = vm.runInContext(code, sandbox);
    return { ttmik: 150, ...counts };
}

console.log('TTMIK library build\n');

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