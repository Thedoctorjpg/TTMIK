/**
 * After the Bamboo — boys-love slow-burn continuation
 * SVSSS mirror · Shen Qingqiu / Luo Binghe · Melbourne Lantern boundaries
 * Picks up after woodshed reveal (SVSSS Ch.1) · parallels girls-love After the Date
 */

export const NOVEL_META = {
    title: 'After the Bamboo',
    subtitle: 'A Qing Jing Peak slow-burn',
    tagline: 'The System bound. The woodshed cooled. Something softer waited — on purpose.',
    venue: 'Qing Jing Peak → bamboo woodshed → Cang Qiong gate',
    svsssUrl: 'https://www.webnovel.com/book/35203689408704405/94532538348928087',
    korean: '천천히, 의도적으로 — not a rescue mission.'
};

export const PAIR = [
    {
        id: 'qingqiu',
        name: 'Shen Qingqiu',
        emoji: '🎐',
        color: '#6ee7b7',
        archetype: 'Trash-villain facade',
        romanceNote: 'Fans the paper slowly while panic sorts itself behind his eyes.',
        weapon: 'Pedang Xiu Ya'
    },
    {
        id: 'binghe',
        name: 'Luo Binghe',
        emoji: '🌑',
        color: '#818cf8',
        archetype: 'Disciple, not project',
        romanceNote: 'Chains in the woodshed — still looks up like the sky owes him nothing.',
        weapon: 'Unnamed blade (yet)'
    }
];

export const BARD = {
    name: 'Melbourne Lantern Bard',
    emoji: '🏮',
    narratorLine: 'I am not narrating a danmei. I am documenting a B-point ledger. The System is watching.'
};

export const BL_TROPES = [
    { id: 'slow-burn', label: 'Slow burn', note: 'Kindness arrives late, in-character, and without invoice.' },
    { id: 'disciple-not-rescue', label: 'Disciple not rescue', note: 'Care is pedagogy — not a salvation subplot.' },
    { id: 'ooc-frozen', label: 'OOC frozen', note: 'Feelings hide behind trash-villain performance.' },
    { id: 'woodshed-truce', label: 'Woodshed truce', note: 'The shed is conflict — not where love starts.' },
    { id: 'shixiong-worry', label: 'Shixiong worry', note: 'Yue Qingyuan frets; the reader frets; nobody absorbs the feed.' }
];

export const CHAPTERS = [
    {
        id: 'ch1',
        number: 1,
        title: 'Woodshed Door, Quiet Ledger',
        time: 'Same afternoon · Qing Jing Peak',
        summary: 'Shen Qingqiu learns where Luo Binghe is. The System deducts nothing — yet.',
        scenes: {
            you: (ctx) =>
                `Yue Qingyuan's voice is still warm when he says *jangan menghukumnya lagi*. You nod like Shen Qingqiu would nod — flat, performative, correct.\n\n` +
                `In the woodshed, ${ctx.focus.name} does not look like a protagonist. ${ctx.focus.name} looks like a boy who learned early that pain is a language.\n\n` +
                `You untie one knot. Not all. Enough. B-points: 99. The System says nothing. You say, in Indonesian first, then Korean in your head: *bukan misi penyelamatan*.\n\n` +
                `멜버른 골목이 정말 예뻐요, you think absurdly — a memory from another life. Then you fan yourself and perform annoyance. In-character. On purpose.`,
            bard: (ctx) =>
                `I observe from the narrative mezzanine with popcorn I am not eating.\n\n` +
                `SYSTEM overlays *Romance flag detected*. I mute it. Some algorithms have no boundaries — and no OOC permissions.\n\n` +
                `${ctx.focus.name} looks up. Not with gratitude invoice. With assessment. I approve the pacing.`,
            qingqiu: (ctx) =>
                `I am Shen Qingqiu on the outside and Shen Yuan screaming on the inside.\n\n` +
                `If I am kind too fast, B-points die. If I am cruel too long, the plot kills me. I choose a third thing: water, bandage, silence.\n\n` +
                `"Disciple," I say. Not *beloved*. Not yet. Not ever like a rescue mission.`,
            binghe: (ctx) =>
                `Shizun's hands are cold when they touch the rope. I catalog the temperature like data — not like hope.\n\n` +
                `He does not apologize. Shen Qingqiu does not apologize. The apology arrives as action: the knot loosens.\n\n` +
                `I say nothing. Some confessions are for later chapters. Some people are for staying — slowly.`
        }
    },
    {
        id: 'ch2',
        number: 2,
        title: 'Bamboo at Dawn',
        time: '6:12 AM · next morning',
        summary: 'Tea before feelings. Parallels Degraves dawn — but peak mist instead of croissants.',
        scenes: {
            you: (ctx) =>
                `Mist on Qing Jing Peak tastes like green tea and guilt.\n\n` +
                `${ctx.focus.name} meets you at the bamboo path with a bowl of plain rice — not romance, sustenance.\n\n` +
                `"Not a date," you say, stealing Helen's boundary from a universe away. "${ctx.focus.name} snorts. The snort is worth ten B-points you do not have to spend."`,
            bard: (ctx) =>
                `Dawn on a cultivation peak is just Melbourne golden hour with more qi.\n\n` +
                `I note the body language: angled in, not trapped. HR — Heavenly Regulations — would call this healthy interpersonal spacing.`,
            qingqiu: (ctx) =>
                `I pour tea before I pour feelings. The disciple drinks. The System does not ping. Suspicious.\n\n` +
                `I like you, I think, and the thought is immediately fined. I like you slowly. On purpose. In installments the plot cannot audit.`,
            binghe: (ctx) =>
                `Shizun's tea is too hot. I wait until it is right — patience I learned without wanting to.\n\n` +
                `When our eyes meet, I look away first. Not submission. Timing.`
        }
    }
];

export function buildChapterContext({
    pairId = 'binghe',
    focusId = 'you',
    tropeId = 'slow-burn',
    chapterId = 'ch1',
    readerName = 'you'
}) {
    const pair = PAIR.find((p) => p.id === pairId) || PAIR[1];
    const focus =
        focusId === 'bard'
            ? { id: 'bard', name: BARD.name, emoji: BARD.emoji, color: '#fb923c' }
            : focusId === 'you'
                ? { id: 'you', name: readerName, emoji: '✨', color: '#a5b4fc' }
                : PAIR.find((p) => p.id === focusId) || pair;
    const trope = BL_TROPES.find((t) => t.id === tropeId)?.id || 'slow-burn';

    return { pair, focus, trope, chapterId, readerName };
}

export function renderChapter(chapter, context) {
    const pov = context.focus.id;
    const sceneFn =
        chapter.scenes[pov] ||
        chapter.scenes.you ||
        chapter.scenes[context.pair.id] ||
        Object.values(chapter.scenes)[0];
    return sceneFn(context);
}

export function allChapterText(context) {
    return CHAPTERS.map((ch) => {
        const body = renderChapter(ch, context);
        return `Chapter ${ch.number}: ${ch.title}\n${ch.time}\n\n${body}`;
    }).join('\n\n---\n\n');
}

export function buildChapter(ctx) {
    const chapter = CHAPTERS.find((c) => c.id === (ctx.chapterId || ctx.chapter?.id)) || CHAPTERS[0];
    const pov = ctx.pov || ctx.focus?.id || 'you';
    const sceneFn = chapter.scenes[pov] || chapter.scenes.you;
    return {
        meta: NOVEL_META,
        chapter,
        body: sceneFn(ctx),
        trope: BL_TROPES.find((t) => t.id === ctx.trope) || BL_TROPES[0]
    };
}