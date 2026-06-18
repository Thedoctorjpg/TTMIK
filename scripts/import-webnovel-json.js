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
    SCHEMA,
    validateWebnovelJson,
    isA11yTreeDump,
    isInkstoneHtmlDump,
    isWebnovelCatalogHtml,
    parseWebnovelCatalogHtml,
    readWebnovelJson
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

    if (isInkstoneHtmlDump(raw)) {
        console.error('ERROR: Wrong file format — Inkstone author app shell (HTML), not WebNovel catalog.');
        console.error('');
        console.error('This is the empty React page from inkstone.webnovel.com / yueimg.com/inkstone.');
        console.error('It contains HiBridge JS only — no book or chapter data.');
        console.error('');
        console.error('Fix — pick one:');
        console.error('  node scripts/fetch-webnovel-catalog.js --rebuild');
        console.error('  node scripts/export-webnovel-json.js --out "%USERPROFILE%\\Downloads\\webnovel.json"');
        process.exit(1);
    }

    let data;
    try {
        data = JSON.parse(raw);
    } catch (err) {
        if (isWebnovelCatalogHtml(raw)) {
            const base = readWebnovelJson(DEFAULT_JSON);
            const svsss = parseWebnovelCatalogHtml(raw, 'book');
            if (svsss.length) {
                base.catalogs.svsss = svsss;
                base.generated = new Date().toISOString().slice(0, 10);
                data = base;
                console.log(`Parsed WebNovel catalog HTML → ${svsss.length} SVSSS chapters`);
            } else {
                throw new Error(`WebNovel catalog HTML found but no chapters parsed in ${sourcePath}`);
            }
        } else if (raw.trimStart().startsWith('<')) {
            console.error('ERROR: HTML file is not a recognized WebNovel catalog page.');
            console.error('Save the catalog TOC from https://www.webnovel.com/book/.../catalog as .html,');
            console.error('or run: node scripts/fetch-webnovel-catalog.js --rebuild');
            process.exit(1);
        } else {
            throw new Error(`Invalid JSON in ${sourcePath}: ${err.message}`);
        }
    }

    if (isA11yTreeDump(data)) {
        console.error('ERROR: Wrong file format — accessibility UI tree, not WebNovel catalog.');
        console.error('');
        console.error('Your file looks like a browser accessibility-tree export (button/nodeCssSelector).');
        console.error(`WebNovel catalog JSON must have schema "${SCHEMA}" with packages and catalogs.`);
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