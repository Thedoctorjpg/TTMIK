#!/usr/bin/env node
/**
 * Fetch live chapter TOC from webnovel.com and merge into data/webnovel.json.
 * Run: node scripts/fetch-webnovel-catalog.js [--rebuild] [--out path]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
    SCHEMA,
    DEFAULT_JSON,
    parseWebnovelCatalogHtml,
    readWebnovelJson,
    validateWebnovelJson
} = require('./lib/webnovel-json');

const ROOT = path.join(__dirname, '..');

const TARGETS = {
    svsss: {
        type: 'book',
        catalogUrl: 'https://www.webnovel.com/book/35203689408704405/catalog'
    },
    soloLeveling: {
        type: 'comic',
        catalogUrl: 'https://www.webnovel.com/comic/15227640605485101/catalog'
    }
};

async function fetchText(url) {
    const res = await fetch(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            Referer: 'https://www.webnovel.com/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin'
        }
    });
    if (!res.ok) {
        const hint =
            res.status === 403
                ? ' (WebNovel may block automated fetch — use node scripts/export-webnovel-json.js instead)'
                : '';
        throw new Error(`HTTP ${res.status} for ${url}${hint}`);
    }
    return res.text();
}

function parseArgs(argv) {
    const opts = { rebuild: false, out: DEFAULT_JSON };
    for (let i = 2; i < argv.length; i++) {
        if (argv[i] === '--rebuild') opts.rebuild = true;
        else if (argv[i] === '--out') opts.out = argv[++i];
    }
    return opts;
}

async function main() {
    const opts = parseArgs(process.argv);
    let base;

    if (fs.existsSync(DEFAULT_JSON)) {
        try {
            base = readWebnovelJson(DEFAULT_JSON);
        } catch {
            base = null;
        }
    }

    if (!base) {
        execSync('node scripts/export-webnovel-json.js', { cwd: ROOT, stdio: 'inherit' });
        base = readWebnovelJson(DEFAULT_JSON);
    }

    for (const [key, target] of Object.entries(TARGETS)) {
        process.stdout.write(`Fetching ${key} from ${target.catalogUrl} ... `);
        const html = await fetchText(target.catalogUrl);
        const chapters = parseWebnovelCatalogHtml(html, target.type);
        if (!chapters.length) {
            throw new Error(`No chapters parsed for ${key}`);
        }
        base.catalogs[key] = chapters;
        console.log(`${chapters.length} chapters`);
    }

    base.schema = SCHEMA;
    base.generated = new Date().toISOString().slice(0, 10);
    base.fetchedAt = new Date().toISOString();

    const validation = validateWebnovelJson(base);
    if (!validation.ok) {
        throw new Error(validation.errors.join('; '));
    }

    fs.mkdirSync(path.dirname(opts.out), { recursive: true });
    fs.writeFileSync(opts.out, JSON.stringify(base, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${opts.out}`);

    if (opts.rebuild) {
        execSync('node scripts/build-webnovel-catalog.js', { cwd: ROOT, stdio: 'inherit' });
    }
}

main().catch((err) => {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
});