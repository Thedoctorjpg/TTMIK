/**
 * Solana token registry + DOGE → AUD conversion lane
 * HeavyPulp: https://pump.fun/coin/8G5ayEsJF4Q7FEWEGeF4jtnUWZBEKCqhySTFQf9Ppump
 * DOGE/AUD: https://coinmarketcap.com/currencies/dogecoin/doge/aud/
 */

const HEAVYPULP_CA = '8G5ayEsJF4Q7FEWEGeF4jtnUWZBEKCqhySTFQf9Ppump';

const DOGE_AUD_CMC_URL = 'https://coinmarketcap.com/currencies/dogecoin/doge/aud/';

/** Snapshot fallback — refresh via node scripts/fetch-doge-aud-rate.js */
const DOGE_AUD_FALLBACK = {
    rate: 0.1203,
    inverse: 8.3116,
    generated: '2026-06-18',
    source: DOGE_AUD_CMC_URL
};

const DOGE_AUD_TABLE_DOGE = [0.5, 1, 5, 10, 50, 100, 500, 1000];

const TOKEN_REGISTRY = {
    heavypulp: {
        id: 'heavypulp',
        symbol: 'HeavyPulp',
        name: 'HeavyPulp',
        ca: HEAVYPULP_CA,
        chain: 'solana',
        pumpUrl: `https://pump.fun/coin/${HEAVYPULP_CA}`,
        dexUrl: `https://dexscreener.com/solana/${HEAVYPULP_CA}`,
        solscanUrl: `https://solscan.io/token/${HEAVYPULP_CA}`,
        xUrl: 'https://x.com/heavypulp',
        cmcDogeAudUrl: DOGE_AUD_CMC_URL,
        boot: 'TTMIK.html?heavypulp=1',
        pin: 'PULP',
        english: 'One chart glance — then phone face-down.',
        korean: '차트 한 번만 — 그다음 폰은 뒤집어요.',
        note: 'Meme lane · DOGE→AUD context · not financial advice'
    }
};

const TOKEN_BOOT_ANCHORS = [
    { id: 'heavypulp', label: 'HeavyPulp · Solana CA · pump.fun' },
    { id: 'doge-aud', label: 'DOGE → AUD · CoinMarketCap converter' }
];

let _dogeAudCache = null;

function getDogeAudFallback() {
    return { ...DOGE_AUD_FALLBACK };
}

async function fetchDogeAudRateLive() {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=aud,usd',
        { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) throw new Error(`Rate fetch HTTP ${res.status}`);
    const data = await res.json();
    const aud = data?.dogecoin?.aud;
    const usd = data?.dogecoin?.usd;
    if (!aud || !Number.isFinite(aud)) throw new Error('Invalid DOGE/AUD rate');
    const row = {
        rate: aud,
        inverse: 1 / aud,
        usd: usd || null,
        source: DOGE_AUD_CMC_URL,
        live: true,
        fetchedAt: new Date().toISOString()
    };
    _dogeAudCache = row;
    return row;
}

async function getDogeAudRate(opts = {}) {
    if (_dogeAudCache && !opts.refresh) return _dogeAudCache;
    try {
        return await fetchDogeAudRateLive();
    } catch {
        const fb = getDogeAudFallback();
        _dogeAudCache = { ...fb, live: false };
        return _dogeAudCache;
    }
}

function convertDogeToAud(doge, rateRow) {
    const rate = rateRow?.rate ?? DOGE_AUD_FALLBACK.rate;
    return Number(doge) * rate;
}

function convertAudToDoge(aud, rateRow) {
    const rate = rateRow?.rate ?? DOGE_AUD_FALLBACK.rate;
    return Number(aud) / rate;
}

/** USD → DOGE → AUD (two-step via DOGE as bridge) */
function convertUsdToDogeToAud(usd, rateRow) {
    const row = rateRow || _dogeAudCache || getDogeAudFallback();
    const dogeUsd = row.usd || (row.rate / 7.5);
    const doge = Number(usd) / dogeUsd;
    const aud = convertDogeToAud(doge, row);
    return { usd: Number(usd), doge, aud, dogeUsd };
}

function formatAud(amount) {
    if (amount >= 100) return `A$${amount.toFixed(2)}`;
    if (amount >= 1) return `A$${amount.toFixed(2)}`;
    return `A$${amount.toFixed(4)}`;
}

function formatDoge(amount) {
    if (amount >= 100) return `${amount.toFixed(2)} DOGE`;
    if (amount >= 1) return `${amount.toFixed(4)} DOGE`;
    return `${amount.toFixed(6)} DOGE`;
}

function buildDogeAudTable(rateRow) {
    const rate = rateRow?.rate ?? DOGE_AUD_FALLBACK.rate;
    return DOGE_AUD_TABLE_DOGE.map((doge) => ({
        doge,
        aud: convertDogeToAud(doge, { rate })
    }));
}

function getToken(tokenId) {
    return TOKEN_REGISTRY[tokenId] || TOKEN_REGISTRY.heavypulp;
}

function formatTokenCaLine(tokenId) {
    const t = getToken(tokenId);
    return `CA: ${t.ca}`;
}

function openTokenUrl(tokenId, platform) {
    const t = getToken(tokenId);
    const url =
        platform === 'dex'
            ? t.dexUrl
            : platform === 'solscan'
              ? t.solscanUrl
              : platform === 'x'
                ? t.xUrl
                : platform === 'cmc' || platform === 'doge-aud'
                  ? DOGE_AUD_CMC_URL
                  : t.pumpUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function copyTokenCa(tokenId) {
    const t = getToken(tokenId);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(t.ca).then(() => formatTokenCaLine(tokenId));
    }
    return Promise.resolve(formatTokenCaLine(tokenId));
}

function buildTokenTranscript(tokenId) {
    const t = getToken(tokenId);
    const fb = getDogeAudFallback();
    return [
        `${t.symbol} · ${t.chain}`,
        formatTokenCaLine(tokenId),
        `Pump: ${t.pumpUrl}`,
        `Dex: ${t.dexUrl}`,
        `DOGE/AUD (CMC): ${DOGE_AUD_CMC_URL}`,
        `1 DOGE ≈ ${formatAud(fb.rate)} (snapshot ${fb.generated})`,
        `English: ${t.english}`,
        `Korean (TTMIK): ${t.korean}`,
        t.note
    ].join('\n\n');
}

function renderDogeAudConverterPanel(container, opts = {}) {
    const host = typeof container === 'string' ? document.getElementById(container) : container;
    if (!host) return;

    host.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'bg-zinc-900 rounded-3xl p-6 ring-1 ring-amber-500/25 space-y-4';
    wrap.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-lg font-semibold text-amber-100">DOGE → AUD</h3>
            <a href="${DOGE_AUD_CMC_URL}" target="_blank" rel="noopener noreferrer" class="text-xs text-amber-300/80 hover:text-amber-200 underline">CoinMarketCap</a>
        </div>
        <p class="text-sm text-zinc-400">Convert via Dogecoin bridge · Melbourne AUD context · not financial advice</p>
        <div class="grid gap-3 sm:grid-cols-2">
            <label class="block text-sm text-zinc-300">DOGE
                <input type="number" min="0" step="any" id="ttmik-doge-input" class="mt-1 w-full rounded-xl bg-zinc-800 px-3 py-2 text-white" value="${opts.doge != null ? opts.doge : 1}" />
            </label>
            <label class="block text-sm text-zinc-300">AUD
                <input type="number" min="0" step="any" id="ttmik-aud-input" class="mt-1 w-full rounded-xl bg-zinc-800 px-3 py-2 text-white" />
            </label>
        </div>
        <p id="ttmik-doge-rate-line" class="text-sm text-amber-200/90">Loading rate…</p>
        <div id="ttmik-doge-table" class="text-xs text-zinc-400 overflow-x-auto"></div>
        <div class="flex flex-wrap gap-2">
            <button type="button" id="ttmik-doge-refresh" class="px-3 py-2 rounded-xl bg-amber-900/40 text-amber-100 text-sm ring-1 ring-amber-500/30">Refresh rate</button>
            <button type="button" id="ttmik-doge-cmc" class="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-200 text-sm">Open CMC converter</button>
        </div>
    `;
    host.appendChild(wrap);

    const dogeInput = wrap.querySelector('#ttmik-doge-input');
    const audInput = wrap.querySelector('#ttmik-aud-input');
    const rateLine = wrap.querySelector('#ttmik-doge-rate-line');
    const tableEl = wrap.querySelector('#ttmik-doge-table');

    let rateRow = null;
    let syncing = false;

    function syncFromDoge() {
        if (syncing || !rateRow) return;
        syncing = true;
        audInput.value = convertDogeToAud(dogeInput.value || 0, rateRow).toFixed(6);
        syncing = false;
    }

    function syncFromAud() {
        if (syncing || !rateRow) return;
        syncing = true;
        dogeInput.value = convertAudToDoge(audInput.value || 0, rateRow).toFixed(6);
        syncing = false;
    }

    function renderTable() {
        const rows = buildDogeAudTable(rateRow);
        tableEl.innerHTML = '<table class="w-full"><thead><tr><th class="text-left pr-4">DOGE</th><th class="text-left">AUD</th></tr></thead><tbody>' +
            rows.map((r) => `<tr><td class="pr-4 py-1">${r.doge}</td><td class="py-1">${formatAud(r.aud)}</td></tr>`).join('') +
            '</tbody></table>';
    }

    async function refreshRate() {
        rateLine.textContent = 'Fetching DOGE/AUD…';
        rateRow = await getDogeAudRate({ refresh: true });
        const live = rateRow.live ? 'live' : 'snapshot';
        rateLine.textContent = `1 DOGE = ${formatAud(rateRow.rate)} · 1 AUD = ${formatDoge(rateRow.inverse)} (${live})`;
        syncFromDoge();
        renderTable();
    }

    dogeInput.addEventListener('input', syncFromDoge);
    audInput.addEventListener('input', syncFromAud);
    wrap.querySelector('#ttmik-doge-refresh').addEventListener('click', refreshRate);
    wrap.querySelector('#ttmik-doge-cmc').addEventListener('click', () => openTokenUrl('heavypulp', 'cmc'));

    refreshRate();
}