#!/usr/bin/env node
/**
 * Validate TTMIK app sources and npm workspace packages.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

const JS_FILES = [
    'app.js',
    'utils.js',
    'storage.js',
    'social.js',
    'skills.js',
    'skills-data.js',
    'webdrama-sync-data.js',
    'webdrama-edit-data.js',
    'video-editor-bridge.js',
    'lesson-data.js',
    'sovereign-data.js',
    'ignan-data.js',
    'asuka-data.js',
    'heidi-data.js',
    'sven-data.js',
    'martin-data.js',
    'ronaldo-data.js',
    'mbappe-data.js',
    'messi-data.js',
    'vinicus-data.js',
    'kane-data.js',
    'evangelion-data.js',
    'rickmorty-data.js',
    'mika-data.js',
    'haley-data.js',
    'svsss-data.js',
    'solo-leveling-data.js',
    'boys-love-data.js',
    'webnovel-catalog-data.js',
    'webnovel-package-data.js',
    'webnovel-crossover-data.js',
    'minecraft-meme-data.js',
    'minecraft-meme-generator.js',
    'fastcharacter-data.js',
    'healing-library-data.js',
    'fifa-nations-data.js',
    'skill-library-data.js',
    'api/ttmik-webhook.js',
    'scripts/heal-skills.js',
    'scripts/heal-library.js',
    'packages/ttmik-heal-skills/lib/heal-library.js',
    'scripts/build-libraries.js',
    'scripts/boot-all.js',
    'scripts/preload-skills.js',
    'scripts/hermes-patch.js',
    'scripts/lib/webnovel-json.js',
    'scripts/build-webnovel-catalog.js',
    'scripts/export-webnovel-json.js',
    'scripts/import-webnovel-json.js',
    'packages/ttmik-webhook/index.js',
    'packages/ttmik-heal-skills/lib/heal-skills.js',
    'packages/ttmik-heal-skills/bin/cli.js'
];

const HTML_SCRIPTS = [
    'utils.js',
    'lesson-data.js',
    'sovereign-data.js',
    'ignan-data.js',
    'asuka-data.js',
    'heidi-data.js',
    'sven-data.js',
    'martin-data.js',
    'ronaldo-data.js',
    'mbappe-data.js',
    'messi-data.js',
    'vinicus-data.js',
    'kane-data.js',
    'evangelion-data.js',
    'rickmorty-data.js',
    'mika-data.js',
    'haley-data.js',
    'svsss-data.js',
    'solo-leveling-data.js',
    'boys-love-data.js',
    'webnovel-catalog-data.js',
    'webnovel-package-data.js',
    'webnovel-crossover-data.js',
    'minecraft-meme-data.js',
    'minecraft-meme-generator.js',
    'fastcharacter-data.js',
    'healing-library-data.js',
    'fifa-nations-data.js',
    'skill-library-data.js',
    'storage.js',
    'social.js',
    'skills-data.js',
    'webdrama-sync-data.js',
    'webdrama-edit-data.js',
    'video-editor-bridge.js',
    'skills.js',
    'app.js'
];

function checkJsSyntax(relPath) {
    const abs = path.join(ROOT, relPath);
    if (!fs.existsSync(abs)) {
        throw new Error(`Missing file: ${relPath}`);
    }
    execSync(`node --check "${abs}"`, { stdio: 'pipe' });
    console.log(`  ok  ${relPath}`);
}

function checkHtml() {
    const htmlPath = path.join(ROOT, 'TTMIK.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    for (const script of HTML_SCRIPTS) {
        if (!html.includes(script)) {
            throw new Error(`TTMIK.html missing script reference: ${script}`);
        }
    }
    console.log('  ok  TTMIK.html script references');
}

function checkPackages() {
    execSync('npm pack --workspace ttmik-webhook --dry-run', {
        cwd: ROOT,
        stdio: 'pipe'
    });
    console.log('  ok  ttmik-webhook pack');

    execSync('npm pack --workspace ttmik-heal-skills --dry-run', {
        cwd: ROOT,
        stdio: 'pipe'
    });
    console.log('  ok  ttmik-heal-skills pack');
}

console.log('TTMIK build — syntax and package checks\n');

console.log('JavaScript:');
JS_FILES.forEach(checkJsSyntax);

console.log('\nHTML:');
checkHtml();

console.log('\nPackages:');
checkPackages();

console.log('\nBuild passed.');