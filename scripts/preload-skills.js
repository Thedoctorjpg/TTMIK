#!/usr/bin/env node
/**
 * Heal all .skill.md files and register Hermes preload (bundle + -s command).
 * Run: node scripts/preload-skills.js
 */
const path = require('path');
const { execSync } = require('child_process');
const { healSkills, SKILLS, getHermesLocalUpdateCmd } = require('../packages/ttmik-heal-skills/lib/heal-skills');

const ROOT = path.join(__dirname, '..');
const BUNDLE = 'ttmik-all';
const HERMES = process.env.HERMES_CLI || (process.platform === 'win32' ? 'D:\\Scripts\\hermes.exe' : 'hermes');

console.log('TTMIK Hermes skill preload\n');

console.log('1. Heal all .skill.md → .devin/skills + ~/.hermes/skills/creative/');
const healed = healSkills(ROOT);
console.log(`   ${healed} skills healed\n`);

const ids = SKILLS.map((s) => s.id);
const preloadCmd = `hermes -s ${ids.join(',')}`;
const bundleCmd = `hermes /${BUNDLE}`;

console.log('2. Hermes bundle');
const bundleArgs = ids.flatMap((id) => ['--skill', id]).map((a) => `"${a}"`).join(' ');
try {
    execSync(
        `"${HERMES}" bundles create ${BUNDLE} --description "TTMIK all 16 archetype .skill.md files" --force ${bundleArgs}`,
        { stdio: 'inherit', shell: true }
    );
    console.log(`   Bundle /${BUNDLE} ready (${ids.length} skills)\n`);
} catch (err) {
    console.error(`   Bundle create failed — run manually:\n   hermes bundles create ${BUNDLE} --force ${ids.map((id) => `--skill ${id}`).join(' ')}\n`);
}

console.log('3. Preload commands (worktree patched via heal-skills)');
console.log(`   ${preloadCmd}`);
console.log(`   ${bundleCmd}`);
console.log(`   ${getHermesLocalUpdateCmd(ROOT, HERMES)}`);
console.log('\nPreload complete.');