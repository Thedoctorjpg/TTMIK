/**
 * Solana token registry — pump.fun CA lanes for TTMIK meme / humor boots
 * HeavyPulp: https://pump.fun/coin/8G5ayEsJF4Q7FEWEGeF4jtnUWZBEKCqhySTFQf9Ppump
 */

const HEAVYPULP_CA = '8G5ayEsJF4Q7FEWEGeF4jtnUWZBEKCqhySTFQf9Ppump';

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
        boot: 'TTMIK.html?heavypulp=1',
        pin: 'PULP',
        english: 'One chart glance — then phone face-down.',
        korean: '차트 한 번만 — 그다음 폰은 뒤집어요.',
        note: 'Meme lane · humor without binge spiral · not financial advice'
    }
};

const TOKEN_BOOT_ANCHORS = [
    { id: 'heavypulp', label: 'HeavyPulp · Solana CA · pump.fun' }
];

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
                : t.pumpUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function copyTokenCa(tokenId) {
    const t = getToken(tokenId);
    const line = formatTokenCaLine(tokenId);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(t.ca).then(() => line);
    }
    return Promise.resolve(line);
}

function buildTokenTranscript(tokenId) {
    const t = getToken(tokenId);
    return [
        `${t.symbol} · ${t.chain}`,
        formatTokenCaLine(tokenId),
        `Pump: ${t.pumpUrl}`,
        `Dex: ${t.dexUrl}`,
        `English: ${t.english}`,
        `Korean (TTMIK): ${t.korean}`,
        t.note
    ].join('\n\n');
}