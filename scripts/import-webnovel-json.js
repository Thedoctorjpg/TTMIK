#!/usr/bin/env node
/**
 * Import and validate webnovel.json from an external path.
 * Run: node scripts/import-webnovel-json.js [path] [--rebuild] [--copy-to downloads]
 *
 * Rejects accessibility-tree UI dumps (e.g. browser a11y export).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
    DEFAULT_JSON,
    validateWebnovelJson,
    isA11yTreeDump
} = require('./lib/webnovel-json');

const ROOT = path.join(__dirname, '..');
const DOWNLOADS_DEFAULT = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads', 'webnovel.json');

function usage() {
    console.log(`Usage: node scripts/import-webnovel-json.js [path] [options]

Options:
  --rebuild          Run build-webnovel-catalog.js after a successful import
  --copy-to <path>   Also write validated JSON to this path
  --help             Show this help

Default import target: data/webnovel.json
Default source (no args): ${DOWNLOADS_DEFAULT}`);
}

function parseArgs(argv) {
    const opts = { source: null, rebuild: false, copyTo: null };
    const positional = [];

    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--help' || arg === '-h') {
            opts.help = true;
        } else if (arg === '--rebuild') {
            opts.rebuild = true;
        } else if (arg === '--copy-to') {
            opts.copyTo = argv[++i];
        } else if (!arg.startsWith('-')) {
            positional.push(arg);
        }
    }

    opts.source = positional[0] || DOWNLOADS_DEFAULT;
    return opts;
}

function importFile(sourcePath, destPath = DEFAULT_JSON) {
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
    }

    let raw;
    try {
        raw = fs.readFileSync(sourcePath, 'utf8');
    } catch (err) {
        throw new Error(`Cannot read ${sourcePath}: ${err.message}`);
    }

    let data;
    try {
        data = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Invalid JSON in ${sourcePath}: ${err.message}`);
    }

    if (isA11yTreeDump(data)) {
        console.error('ERROR: Wrong file format — accessibility UI tree, not WebNovel catalog.');
        console.error('');
        console.error('Your file looks like a browser accessibility-tree export (button/nodeCssSelector).');
        console.error('WebNovel catalog JSON must have schema "ttmik-webnovel/v1" with packages and catalogs.');
        console.error('');
        console.error('Fix: use the repo export instead:');
        console.error('  node scripts/export-webnovel-json.js --out "%USERPROFILE%\\Downloads\\webnovel.json"');
        process.exit(1);
    }

    const validation = validateWebnovelJson(data);
    if (!validation.ok) {
        console.error(`ERROR: ${sourcePath} failed validation:`);
        validation.errors.forEach((e) => console.error(`  - ${e}`));
        console.error('');
        console.error('Generate a valid file:');
        console.error('  node scripts/export-webnovel-json.js');
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    return data;
}

const opts = parseArgs(process.argv);

if (opts.help) {
    usage();
    process.exit(0);
}

try {
    const data = importFile(opts.source, DEFAULT_JSON);
    console.log(`Imported ${opts.source} → ${DEFAULT_JSON}`);
    console.log(`  schema: ${data.schema}`);
    console.log(`  SVSSS: ${(data.catalogs.svsss || []).length} chapters`);
    console.log(`  Solo: ${(data.catalogs.soloLeveling || []).length} chapters`);

    if (opts.copyTo) {
        fs.mkdirSync(path.dirname(opts.copyTo), { recursive: true });
        fs.copyFileSync(DEFAULT_JSON, opts.copyTo);
        console.log(`Copied → ${opts.copyTo}`);
    }

    if (opts.rebuild) {
        execSync('node scripts/build-webnovel-catalog.js', { cwd: ROOT, stdio: 'inherit' });
    }
} catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
}