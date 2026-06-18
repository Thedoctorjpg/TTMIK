#!/usr/bin/env node
/**
 * Refresh data/doge-aud.json from live DOGE/AUD (CoinGecko proxy for CMC lane).
 * Canonical reference: https://coinmarketcap.com/currencies/dogecoin/doge/aud/
 * Run: node scripts/fetch-doge-aud-rate.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'doge-aud.json');
const CMC_URL = 'https://coinmarketcap.com/currencies/dogecoin/doge/aud/';

async function fetchRate() {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=aud',
        { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
    const data = await res.json();
    const rate = data?.dogecoin?.aud;
    if (!rate || !Number.isFinite(rate)) throw new Error('Invalid DOGE/AUD rate from API');
    return rate;
}

async function main() {
    const rate = await fetchRate();
    const doc = {
        schema: 'ttmik-doge-aud/v1',
        generated: new Date().toISOString().slice(0, 10),
        fetchedAt: new Date().toISOString(),
        source: CMC_URL,
        symbol: 'DOGE',
        quote: 'AUD',
        rate: Number(rate.toFixed(6)),
        inverse: Number((1 / rate).toFixed(4)),
        note: '1 DOGE = rate AUD · regenerate: node scripts/fetch-doge-aud-rate.js'
    };
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${OUT}`);
    console.log(`  1 DOGE = ${doc.rate} AUD`);
    console.log(`  1 AUD = ${doc.inverse} DOGE`);
    console.log(`  CMC: ${CMC_URL}`);
}

main().catch((err) => {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
});