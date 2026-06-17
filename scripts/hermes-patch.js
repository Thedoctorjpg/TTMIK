#!/usr/bin/env node
/**
 * Patch ~/.hermes/config.yaml with the current TTMIK worktree path.
 * Sets terminal.cwd and skills.external_dirs so /ttmik-all can resolve the repo.
 * Run: node scripts/hermes-patch.js
 */
const path = require('path');
const { patchHermesConfig, getHermesLocalUpdateCmd, getHermesCli } = require('../packages/ttmik-heal-skills/lib/heal-skills');

const ROOT = path.join(__dirname, '..');

console.log('TTMIK Hermes worktree patch\n');

const result = patchHermesConfig(ROOT);

console.log('\nHermes local update (from patched worktree):');
console.log(`   ${getHermesLocalUpdateCmd(ROOT, getHermesCli())}`);
console.log(`\nWorktree: ${result.worktree}`);
console.log(`Manifest: ${result.manifestPath}`);
if (result.manifest?.gitHead) console.log(`Git HEAD: ${result.manifest.gitHead}`);
console.log('Patch complete.');