#!/usr/bin/env node
/**
 * Build webnovel-catalog-data.js from data/webnovel.json (source of truth).
 * Run: node scripts/build-webnovel-catalog.js
 * Export JSON: node scripts/export-webnovel-json.js
 * Import JSON: node scripts/import-webnovel-json.js [path] --rebuild
 */
const path = require('path');
const {
    DEFAULT_JSON,
    readWebnovelJson,
    buildCatalogFromJson,
    writeCatalogJs
} = require('./lib/webnovel-json');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'webnovel-catalog-data.js');

const data = readWebnovelJson(DEFAULT_JSON);
const built = buildCatalogFromJson(data);

writeCatalogJs(built, OUT, {
    svsssBookId: data.packages.svsss.bookId,
    soloComicId: data.packages.soloLeveling.comicId
});

console.log(`Wrote ${OUT}`);
console.log(`  Source: ${DEFAULT_JSON}`);
console.log(`  SVSSS chapters: ${built.svsssRows.length}`);
console.log(`  Solo chapters (indexed): ${built.soloRows.length}`);