#!/usr/bin/env node
/**
 * Shared WebNovel JSON schema validation and catalog builders.
 * Schema: ttmik-webnovel/v1
 */
const fs = require('fs');
const path = require('path');

const SCHEMA = 'ttmik-webnovel/v1';
const DEFAULT_JSON = path.join(__dirname, '..', '..', 'data', 'webnovel.json');

function isA11yTreeDump(obj) {
    if (!obj || typeof obj !== 'object') return false;
    if (obj.nodeCssSelector || obj.nodeType !== undefined) return true;
    if (obj.role === 'generic' || obj.role === 'text leaf') return true;
    if (Array.isArray(obj.children) && obj.children.some((c) => c && c.nodeCssSelector)) return true;
    return false;
}

function validateWebnovelJson(data) {
    const errors = [];

    if (!data || typeof data !== 'object') {
        return { ok: false, errors: ['Root must be a JSON object.'] };
    }

    if (isA11yTreeDump(data)) {
        return {
            ok: false,
            errors: [
                'This file is an accessibility-tree UI dump, not a WebNovel catalog.',
                'Use the repo export: node scripts/export-webnovel-json.js',
                'Or import a file with schema "ttmik-webnovel/v1", packages, and catalogs.'
            ]
        };
    }

    if (data.schema !== SCHEMA) {
        errors.push(`schema must be "${SCHEMA}" (got ${JSON.stringify(data.schema)}).`);
    }

    if (!data.packages || typeof data.packages !== 'object') {
        errors.push('packages object is required.');
    }

    if (!data.catalogs || typeof data.catalogs !== 'object') {
        errors.push('catalogs object is required.');
    } else {
        for (const [key, rows] of Object.entries(data.catalogs)) {
            if (!Array.isArray(rows)) {
                errors.push(`catalogs.${key} must be an array.`);
                continue;
            }
            rows.forEach((row, i) => {
                if (!row.chapterId) errors.push(`catalogs.${key}[${i}]: chapterId required.`);
                if (!row.title) errors.push(`catalogs.${key}[${i}]: title required.`);
            });
        }
    }

    if (data.integratedChapters && typeof data.integratedChapters !== 'object') {
        errors.push('integratedChapters must be an object when present.');
    }

    return { ok: errors.length === 0, errors };
}

function readWebnovelJson(filePath = DEFAULT_JSON) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const validation = validateWebnovelJson(data);
    if (!validation.ok) {
        const msg = validation.errors.join('\n  - ');
        throw new Error(`Invalid webnovel.json (${filePath}):\n  - ${msg}`);
    }
    return data;
}

function buildChapterRows(bookId, chapters, type) {
    return chapters.map((row, i) => {
        const chapterId = row.chapterId;
        const title = row.title;
        const n = type === 'comic'
            ? (typeof row.index === 'number' ? row.index : i)
            : (typeof row.n === 'number' ? row.n : i + 1);
        const base = type === 'comic' ? 'comic' : 'book';
        const out = {
            n,
            title,
            chapterId,
            url: `https://www.webnovel.com/${base}/${bookId}/${chapterId}`
        };
        if (row.isExtra) out.isExtra = true;
        if (type === 'comic' && typeof row.index === 'number') out.index = row.index;
        return out;
    });
}

function buildCatalogFromJson(data) {
    const svsssPkg = data.packages.svsss;
    const soloPkg = data.packages.soloLeveling;

    if (!svsssPkg?.bookId) throw new Error('packages.svsss.bookId required.');
    if (!soloPkg?.comicId) throw new Error('packages.soloLeveling.comicId required.');

    const svsssRows = buildChapterRows(
        svsssPkg.bookId,
        data.catalogs.svsss || [],
        'book'
    );
    const soloRows = buildChapterRows(
        soloPkg.comicId,
        data.catalogs.soloLeveling || [],
        'comic'
    );

    return { svsssRows, soloRows, generated: data.generated || new Date().toISOString().slice(0, 10) };
}

function writeCatalogJs({ svsssRows, soloRows, generated }, outPath, ids) {
    const svsssBookId = ids.svsssBookId;
    const soloComicId = ids.soloComicId;

    const out = `/**
 * WebNovel catalog — generated from data/webnovel.json
 * Regenerate: node scripts/build-webnovel-catalog.js
 * SVSSS: https://www.webnovel.com/book/${svsssBookId}
 * Solo: https://www.webnovel.com/comic/${soloComicId}
 */
const WEBNOVEL_CATALOG_GENERATED = '${generated}';

const WEBNOVEL_SVSSS_CATALOG = ${JSON.stringify(svsssRows, null, 4)};

const WEBNOVEL_SOLO_LEVELING_CATALOG = ${JSON.stringify(soloRows, null, 4)};
`;

    fs.writeFileSync(outPath, out, 'utf8');
}

module.exports = {
    SCHEMA,
    DEFAULT_JSON,
    isA11yTreeDump,
    validateWebnovelJson,
    readWebnovelJson,
    buildChapterRows,
    buildCatalogFromJson,
    writeCatalogJs
};