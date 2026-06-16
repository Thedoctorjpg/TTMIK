/**
 * Minecraft Wiki meme generator — Hipposgrumm parody article format
 * Source navbox: https://minecraft.wiki/w/Template:User-Hipposgrumm/Memes/content
 * Hub: https://minecraft.wiki/w/User:Hipposgrumm/Memes
 * Melbourne Bardic overlay · humor-release · side-humor quest
 */

const MINECRAFT_WIKI_BASE = 'https://minecraft.wiki';
const MINECRAFT_MEME_HUB = `${MINECRAFT_WIKI_BASE}/w/User:Hipposgrumm/Memes`;
const MINECRAFT_MEME_API = `${MINECRAFT_WIKI_BASE}/api.php`;

const MINECRAFT_MEME_META = {
    author: 'Hipposgrumm',
    template: 'Template:User-Hipposgrumm/Memes',
    license: 'CC BY-NC-SA 3.0 (wiki content · parody)',
    bardicTheme: 'Humor alchemy — 유머로 풀어낼게요',
    boot: 'TTMIK.html?minecraft-meme=1'
};

/** Curated from minecraft.wiki Hipposgrumm navbox + Melbourne Lantern pins */
const MINECRAFT_MEME_TEMPLATES = [
    {
        id: 'bean-block',
        title: 'Bean Block',
        version: '1.17',
        versionLabel: 'Caves & Cliffs · Goats and Beans',
        sprite: 'BlockSprite_block-of-raw-gold.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/Bean_Block',
        identifier: 'bean_block',
        removed: true,
        renewable: 'Yes',
        stackable: 'Yes',
        blastResistance: 6,
        hardness: 5,
        lore: 'Bean Blocks are unobtainable and used for decoration only. They are not consumable.',
        english: 'I stack beans — not rescue invoices.',
        korean: '콩은 쌓아요 — 구조 청구서는 아니에요.',
        note: 'Classic Hipposgrumm meme · raw gold texture swap'
    },
    {
        id: 'milk-block',
        title: 'Milk Block',
        version: '1.17',
        versionLabel: 'Caves & Cliffs',
        sprite: 'ItemSprite_milk-bucket.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/Milk_Block',
        identifier: 'milk_block',
        renewable: 'Yes',
        stackable: 'Yes',
        blastResistance: 3,
        hardness: 2,
        lore: 'Milk Blocks cancel status effects and boundary spirals when placed with consent.',
        english: 'One milk block — no love-bomb speedrun.',
        korean: '우유 블록 하나 — 러브폭탄 스피드런 없이.',
        note: 'Helen boundary echo · post-DIB optional'
    },
    {
        id: 'bucketolotl',
        title: 'Bucketolotl',
        version: '1.17',
        versionLabel: 'Caves & Cliffs',
        sprite: 'EntitySprite_axolotl.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/Bucketolotl',
        identifier: 'bucketolotl',
        renewable: 'Yes',
        stackable: 'No',
        blastResistance: 0,
        hardness: 0,
        lore: 'Bucketolotls are passive mobs that observe chaos without absorbing it into the feed.',
        english: 'Observe the axolotl — do not absorb the drama.',
        korean: '아홀로틀은 관찰해요 — 드라마는 흡수하지 않아요.',
        note: 'rach3l observe line · Moon-card cousin'
    },
    {
        id: 'warden-heart',
        title: "Warden's Heart",
        version: '1.19',
        versionLabel: 'The Wild Update · Deep Dark',
        sprite: 'ItemSprite_diamond.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/DeepDark/Warden/Heart',
        identifier: 'wardens_heart',
        renewable: 'No',
        stackable: 'No',
        blastResistance: 10,
        hardness: 8,
        lore: 'Dropped when the Warden is observed from a safe distance. Cannot be invoiced to strangers.',
        english: 'I hear the warden — I do not carry its fear.',
        korean: '워든 소리는 들어요 — 그 공포는 안 짊어져요.',
        note: 'Deep Dark · scroll trigger inverse'
    },
    {
        id: 'copper-golem',
        title: 'Copper Golem',
        version: '1.19',
        versionLabel: 'The Wild Update',
        sprite: 'EntitySprite_copper-golem.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/Copper_Golem',
        identifier: 'copper_golem',
        renewable: 'Yes',
        stackable: 'No',
        blastResistance: 4,
        hardness: 3,
        lore: 'Oxidizes over time unless waxed. Presses copper buttons without performance debt.',
        english: 'I press my button — not your soulmate CTA.',
        korean: '제 버튼만 눌러요 — 당신 소울메이트 CTA는 아니에요.',
        note: 'FED attune handoff · preset humor'
    },
    {
        id: 'sniffer',
        title: 'Sniffer',
        version: '1.20',
        versionLabel: 'The Decoration Update',
        sprite: 'EntitySprite_sniffer.png',
        wikiPath: '/w/User:Hipposgrumm/Memes/Sniffer',
        identifier: 'sniffer',
        renewable: 'Yes',
        stackable: 'No',
        blastResistance: 0,
        hardness: 0,
        lore: 'Sniffs ancient seeds and laneway beauty without insisting it is a date.',
        english: 'I sniff seeds — Melbourne is not your rescue quest.',
        korean: '씨앗 냄새 맡아요 — 멜버른은 구조 퀘스트가 아니에요.',
        note: 'Degraves stroll · tsundere footage'
    },
    {
        id: 'lantern-block',
        title: 'Lantern Block',
        version: '1.21',
        versionLabel: 'Melbourne Bardic Adventure',
        sprite: 'BlockSprite_lantern.png',
        wikiPath: null,
        identifier: 'lantern_block',
        renewable: 'Yes',
        stackable: 'Yes',
        blastResistance: 3.5,
        hardness: 3.5,
        lore: 'Emits light from flame, not from lack. Cannot be love-bombed into a rescue mission.',
        english: 'I create from flame — not from lack.',
        korean: '부족함이 아니라 불꽃에서 만들어요.',
        note: 'Melbourne Lantern original · quest mantra block',
        melbourne: true
    },
    {
        id: 'red-flag-block',
        title: 'RED FLAG Block',
        version: '1.21',
        versionLabel: 'Melbourne Bardic Adventure',
        sprite: 'BlockSprite_redstone-block.png',
        wikiPath: null,
        identifier: 'red_flag_block',
        renewable: 'No',
        stackable: 'Yes (inventory full by Ep 4)',
        blastResistance: 9,
        hardness: 7,
        lore: 'Collected like items when scam UI appears. Blocking is an act of self-love.',
        english: 'Inventory full — block the algorithm.',
        korean: '인벤토리 가득 — 알고리즘은 차단해요.',
        note: 'Ep 3–4 scam PSA · Helen VO',
        melbourne: true
    },
    {
        id: 'scam-invoice-block',
        title: 'Scam Invoice Block',
        version: '1.21',
        versionLabel: 'Melbourne Bardic Adventure',
        sprite: 'BlockSprite_gold-block.png',
        wikiPath: null,
        identifier: 'scam_invoice_block',
        removed: true,
        renewable: 'No',
        stackable: 'No',
        blastResistance: 0,
        hardness: 0,
        lore: 'Removed in favor of sovereign boundaries. Cannot be mined with romance urgency.',
        english: 'Not a date. Not a rescue. Lantern lit.',
        korean: '데이트 아니에요. 구조 아니에요. 등불 켰어요.',
        note: 'Cook-off host line · lets-cook sync',
        melbourne: true
    }
];

const MINECRAFT_MEME_VERSION_GROUPS = [
    { version: '1.17', label: 'Goats and Beans' },
    { version: '1.19', label: 'The Wild Update' },
    { version: '1.20', label: 'The Decoration Update' },
    { version: '1.21', label: 'Melbourne Bardic Adventure' }
];

const MINECRAFT_MEME_BARDIC_DECK = [
    {
        en: 'I meme from flame — not from lack.',
        ko: '밈도 불꽃에서 — 부족함에서가 아니에요.',
        beat: 'MEME-S1',
        templateId: 'lantern-block'
    },
    {
        en: 'Wiki parody is observation — not absorption.',
        ko: '위키 패러디는 관찰이에요 — 흡수가 아니에요.',
        beat: 'MEME-CO',
        templateId: 'bucketolotl'
    },
    {
        en: 'Every block is a row — Melbourne is my yes.',
        ko: '모든 블록은 한 행이에요 — 멜버른이 제 예예요.',
        beat: 'MEME-S2',
        templateId: 'bean-block'
    },
    {
        en: '유머로 풀어낼게요 — one meme, then phone face-down.',
        ko: '유머로 풀어낼게요 — 밈 하나, 폰은 아래로.',
        beat: 'Activation',
        templateId: 'red-flag-block'
    }
];

function getMinecraftMemeTemplate(id) {
    return MINECRAFT_MEME_TEMPLATES.find(t => t.id === id) || MINECRAFT_MEME_TEMPLATES[0];
}

function minecraftWikiImageUrl(sprite) {
    return `${MINECRAFT_WIKI_BASE}/images/${sprite}`;
}

function minecraftWikiPageUrl(path) {
    if (!path) return MINECRAFT_MEME_HUB;
    return `${MINECRAFT_WIKI_BASE}${path}`;
}

function slugifyMinecraftId(title) {
    return String(title || 'meme_block')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '') || 'meme_block';
}

function buildMinecraftMemeArticle(opts = {}) {
    const base = getMinecraftMemeTemplate(opts.templateId);
    const title = opts.title || base.title;
    const identifier = opts.identifier || base.identifier || slugifyMinecraftId(title);
    const lore = opts.lore || base.lore;
    const english = opts.english || base.english;
    const korean = opts.korean || base.korean;
    const showRemoved = opts.showRemoved != null ? opts.showRemoved : !!base.removed;
    const author = opts.author || 'The Bard · Melbourne Lantern';
    const version = opts.version || base.version;
    const versionLabel = opts.versionLabel || base.versionLabel;

    const lines = [];
    lines.push(`# ${title}`);
    lines.push('');
    lines.push(`> Minecraft Wiki meme · [Hipposgrumm Memes](${MINECRAFT_MEME_HUB}) · Melbourne Bardic overlay`);
    lines.push(`> Boot: \`${MINECRAFT_MEME_META.boot}\` · Theme: *${MINECRAFT_MEME_META.bardicTheme}*`);
    lines.push('');

    if (showRemoved) {
        lines.push('::: warning');
        lines.push('This page describes content that has been removed from the game.');
        lines.push('');
        lines.push('This feature was present in earlier versions of *Java Edition*, but has since been removed.');
        lines.push(':::');
        lines.push('');
    }

    lines.push('## Infobox');
    lines.push('');
    lines.push('| Field | Value |');
    lines.push('|-------|-------|');
    lines.push(`| Image | ![${title}](${minecraftWikiImageUrl(base.sprite)}) |`);
    lines.push(`| Renewable | ${base.renewable} |`);
    lines.push(`| Stackable | ${base.stackable} |`);
    lines.push(`| Blast resistance | ${base.blastResistance} |`);
    lines.push(`| Hardness | ${base.hardness} |`);
    lines.push(`| Identifier | \`${identifier}\` |`);
    lines.push(`| Update | ${version} · ${versionLabel} |`);
    lines.push('');

    lines.push(`A **${title.toLowerCase()}** is a compact block equivalent to nine bardic boundaries.`);
    lines.push('');

    lines.push('## Obtaining');
    lines.push('');
    lines.push('### Breaking');
    lines.push('');
    lines.push(`${title} can be mined only with an iron pickaxe or better — and a Helen boundary when scam UI appears.`);
    lines.push('');

    lines.push('## Usage');
    lines.push('');
    lines.push(lore);
    lines.push('');
    lines.push('### TTMIK shadow');
    lines.push('');
    lines.push(`| English | Korean |`);
    lines.push(`|---------|--------|`);
    lines.push(`| ${english} | ${korean} |`);
    lines.push('');

    lines.push('## History');
    lines.push('');
    lines.push(`| Version | Change |`);
    lines.push(`|---------|--------|`);
    lines.push(`| ${version} | Added ${title}. Authored for Melbourne Lantern by ${author}. |`);
    if (showRemoved) {
        lines.push(`| ${version} | Removed in favor of sovereign boundaries and lantern blocks. |`);
    }
    lines.push('');

    if (base.wikiPath) {
        lines.push(`**Source meme:** [${base.title} on Minecraft Wiki](${minecraftWikiPageUrl(base.wikiPath)})`);
    } else {
        lines.push(`**Source:** Melbourne Bardic Adventure · inspired by [Hipposgrumm Memes](${MINECRAFT_MEME_HUB})`);
    }
    lines.push('');
    lines.push(`*${base.note || ''}*`);

    return {
        title,
        identifier,
        markdown: lines.join('\n'),
        template: base,
        english,
        korean,
        spriteUrl: minecraftWikiImageUrl(base.sprite),
        wikiUrl: minecraftWikiPageUrl(base.wikiPath)
    };
}

function buildMinecraftMemeTweetText(article) {
    const t = article.title;
    return `Minecraft Wiki meme (Melbourne Lantern): "${t}" · ${article.english} · ${article.korean} #MelbourneLantern #MinecraftWiki`;
}

async function fetchMinecraftWikiMemeNavbox() {
    const url = `${MINECRAFT_MEME_API}?action=parse&page=Template:User-Hipposgrumm/Memes/content&prop=wikitext&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'TTMIK-MelbourneBardic/1.0' } });
    if (!res.ok) throw new Error(`Wiki API ${res.status}`);
    const data = await res.json();
    return data?.parse?.wikitext?.['*'] || '';
}