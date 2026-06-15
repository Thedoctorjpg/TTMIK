#!/usr/bin/env node
/**
 * Boot all — heal every .skill.md, build all libraries, validate boot registry.
 * Run: node scripts/boot-all.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { healSkills, SKILLS } = require('../packages/ttmik-heal-skills/lib/heal-skills');

const ROOT = path.join(__dirname, '..');

const SKILL_MD_FILES = [
    'Melbourne_Lantern_Bard.skill.md',
    'Flame-Kissed_Bard.skill.md',
    'Lo3tus.skill.md',
    'Helen_Neighbor_Archetype.skill.md',
    'Sua_Tattoo_Artist.skill.md',
    'Asuka_Brisbane_Archetype.skill.md',
    'Heidi_Alpine_Wayfarer_Archetype.skill.md',
    'Sven_Nordic_Ranger_Archetype.skill.md',
    'Martin_Nordic_Guide_Archetype.skill.md',
    'Ronaldo_Portugal_Glory_Archetype.skill.md',
    'Mbappe_France_Attack_Archetype.skill.md',
    'Messi_Argentina_Playmaker_Archetype.skill.md',
    'Vinicus_Brasil_Samba_Archetype.skill.md',
    'Harry_Kane_England_Striker_Archetype.skill.md',
    'Neon_Evangelion_Archetype.skill.md',
    'rach3l.skill.md',
    'Ignan_Pilgrim.skill.md',
    'Ignan_Grounding.skill.md',
    'Ignan_Dalan.skill.md'
];

const LIBRARY_BOOTS = [
    'library=compose',
    'library=heal',
    'library=mexico',
    'library=canada',
    'library=usa',
    'library=ignan',
    'library=asuka',
    'library=heidi',
    'library=sven',
    'library=martin',
    'library=ronaldo',
    'library=mbappe',
    'library=messi',
    'library=vinicus',
    'library=kane',
    'library=evangelion',
    'library=melbourne-skills',
    'library=sovereign-skills',
    'boot=all'
];

const LANE_BOOTS = ['heal=all', 'heal=1', 'heal-factor=rei-mercy', 'heal-factor=cicada-attune', 'heal-factor=twitter-feed-heal', 'tweet-heal=1', 'sua=1', 'attune=1&lane=sua', 'asuka=1', 'heidi=1', 'heidi=1&sheet=1', 'sven=1', 'sven=1&sheet=1', 'martin=1', 'martin=1&sheet=1', 'ronaldo=1', 'ronaldo=1&sheet=1', 'mbappe=1', 'mbappe=1&sheet=1', 'messi=1', 'messi=1&sheet=1', 'vinicus=1', 'vinicus=1&sheet=1', 'kane=1', 'kane=1&sheet=1', 'kane=1&watch=1', 'neon=1', 'neon=1&sheet=1', 'rei=1', 'rei=1&sheet=1', 'evangelion=1', 'attune=1', 'attune=1&lane=kane', 'attune=1&lane=kane&watch=1', 'kane=1&attune=1&watch=1', 'cinema=1', 'beckham=1', 'ignan=1', 'fifa=1', 'step=4', 'step=5', 'step=6', 'step=7', 'before-match=1'];

console.log('TTMIK boot-all\n');

console.log('1. Heal library from sources');
const { healLibrary } = require('../packages/ttmik-heal-skills/lib/heal-library');
healLibrary(ROOT);
console.log('');

console.log('2. Hermes heal-skills');
const healed = healSkills(ROOT);
console.log(`   ${healed} skills healed\n`);

console.log('3. Library build');
execSync('node scripts/build-libraries.js', { cwd: ROOT, stdio: 'inherit' });

console.log('\n4. Boot registry validation');
const registrySrc = fs.readFileSync(path.join(ROOT, 'skill-library-data.js'), 'utf8');
const vm = require('vm');
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(registrySrc, sandbox, { filename: 'skill-library-data.js' });

const bootIds = sandbox.getAllSkillBootIds();
const libs = sandbox.getAllLibraryBootEntries();
const missingMd = SKILL_MD_FILES.filter((f) => !fs.existsSync(path.join(ROOT, f)));

console.log(`   Skills in registry: ${bootIds.length}`);
console.log(`   Composed libraries: ${libs.length}`);
console.log(`   Hermes SKILLS array: ${SKILLS.length}`);
if (missingMd.length) {
    console.error(`   MISSING .skill.md: ${missingMd.join(', ')}`);
    process.exit(1);
}
console.log('   All .skill.md files present');

console.log('\n5. Boot URLs (copy into browser or Hermes preload)');
console.log('   TTMIK.html?boot=all');
LIBRARY_BOOTS.forEach((b) => console.log(`   TTMIK.html?${b}`));
LANE_BOOTS.forEach((b) => console.log(`   TTMIK.html?${b}`));
bootIds.forEach((id) => {
    const url = sandbox.getSkillBootUrl(id);
    console.log(`   TTMIK.html?skill=${id}  (${url})`);
});

const preloadIds = SKILLS.map((s) => s.id);
console.log('\n6. Hermes preload (all .skill.md archetypes)');
console.log(`   hermes -s ${preloadIds.join(',')}`);
console.log('   hermes /ttmik-all  (bundle — run node scripts/preload-skills.js to create)');

console.log('\nBoot-all complete.');