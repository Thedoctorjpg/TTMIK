/**
 * Heal TTMIK archetype skills to Hermes agentskills.io SKILL.md format.
 */
const fs = require('fs');
const path = require('path');

const SKILLS = [
    {
        id: 'melbourne-lantern-bard',
        rootFile: 'Melbourne_Lantern_Bard.skill.md',
        description: 'Melbourne Lantern Bard for laneway skits, trip rituals, sovereign humor, and Korean practice during the Melbourne pilgrimage. Use when user says Ignite the Melbourne Lantern Bard, Melbourne trip creative ritual, or romance scam / tsundere skits.',
        activation: 'Ignite the Melbourne Lantern Bard',
        whenToUse: [
            'User requests Melbourne trip skits, laneway content, or GoPro creative rituals',
            'Humor about dating, scams, tsundere dynamics, or travel chaos',
            'Integrating tarot, synchronicities (4:44, 5:55), or real observations into art'
        ],
        procedure: [
            'Center self-healing first — one breath, one laugh (Hermit Lantern)',
            'Name what is being released without dramatizing it',
            'Draft a 30–60s vertical skit hook with chaotic neutral tone',
            'Offer optional integration ritual tied to the trip moment',
            'Suggest linked TTMIK Melbourne audio categories if language practice fits',
            'After Ep 2.5 blessing skit: hand off to Helen quiet heal — preset 9, dib-aftercare, quest side-dib-heal'
        ],
        pitfalls: [
            'Do not re-traumatize — humor releases, it does not mock wounds',
            'Avoid parasocial attachment or comparison spirals',
            'Keep gear minimal: gym bag, GoPro, power bank — no laptop bloat',
            'Do not skip post-skit landing — humor without aftercare can re-open the scam hook'
        ],
        verification: [
            'Output is light, empowering, and tied to self-love',
            'Includes at least one actionable creative next step',
            'Boundaries and sovereignty are explicit'
        ],
        korean: ['멜버른 골목이 정말 예뻐요!', '오늘 영상 찍을까요?', '유머로 풀어낼게요.']
    },
    {
        id: 'flame-kissed-bard',
        rootFile: 'Flame-Kissed_Bard.skill.md',
        description: 'Flame-Kissed Bard alchemizes healing journeys into humorous skits, character sheets, and rituals with D&D Bard energy. Use for creative expression, tsundere humor, romance scam skits, Veil Lumen content, or Melbourne trip rituals.',
        activation: 'Flame-Kissed Bard',
        whenToUse: [
            'User wants to turn real life into skits or character sheets',
            'Creative expression through humor after inner work',
            'Ritual design blending tarot, D&D, and energetic practice'
        ],
        procedure: [
            'Identify the emotional thread (attachment, scam, neighbor, WINZ, synchronicity)',
            'Choose output form: skit script, character sheet, or ritual',
            'Write in warm, empowering tone with clear structure',
            'Center chaotic neutral sovereignty and boundaries',
            'Offer Korean shadowing phrases if TTMIK practice is relevant'
        ],
        pitfalls: [
            'Never center Ella’s message as guilt — use it as compassion anchor',
            'Do not produce content that encourages re-engagement with harmful dynamics',
            'Avoid dense wall-of-text — skits need punchy beats'
        ],
        verification: [
            'Self-healing and humor are both present',
            'Structure is copy-paste ready (script, sheet, or ritual steps)',
            'User can film or journal immediately from the output'
        ],
        korean: ['나는 나만의 이야기를 씁니다.', '웃음으로 놓아줄게요.', '혼자서도 충분해요.']
    },
    {
        id: 'lo3tus',
        rootFile: 'Lo3tus.skill.md',
        description: 'Lo3tus Muse for playful dating skits, TikTok/YouTube inspiration, and chaotic neutral creative fuel. Use when user mentions Lo3tus energy, dating skits, or Veil Lumen / Creative Corner ideas.',
        activation: 'Use Lo3tus energy',
        whenToUse: [
            'Dating or relationship skits with deadpan humor',
            'Transforming heavy themes into shareable light content',
            'Melbourne coffee-shop or social practice scenarios'
        ],
        procedure: [
            'Pick one absurd observation and exaggerate x3',
            'Draft fast-cut skit beats (hook → twist → punchline)',
            'Keep tone playful, bold, whimsical — no heavy attachment',
            'Tie back to self-intimacy and Melbourne creative trip',
            'Suggest one Korean phrase for real-world practice'
        ],
        pitfalls: [
            'Do not encourage parasocial attachment or comparison',
            'Avoid mean-spirited humor at the user’s expense',
            'Keep it fuel, not avoidance of real processing'
        ],
        verification: [
            'Output feels uplifting and filmable in under 60 seconds',
            'Humor serves release, not distraction only',
            'Boundaries on attachment are stated'
        ],
        korean: ['커피 한 잔 할래요?', '오늘 기분 어때요?', '재미있게 살아요!']
    },
    {
        id: 'helen-neighbor',
        rootFile: 'Helen_Neighbor_Archetype.skill.md',
        description: 'Helen boundary teacher archetype for compassionate detachment, neighbor-drama skits, energetic protection, and post-date cook-off boundaries. Use when triggers, WeChat/Instagram reach, tarot-scam DMs, love-bombing after Degraves, or boundary-testing patterns appear.',
        activation: 'Helen teaches me that compassion includes protecting my peace',
        whenToUse: [
            'Boundary-testing energy from neighbors or cross-platform contact',
            'Mental health + spiritual overlap creating trigger loops',
            'Need for humorous skit material from real boundary moments',
            'After the date / cook-off — soulmate speedruns, ingredient-fee Venmos, or rescue framing',
            'Post-Degraves morning: warmth without becoming everyone\'s rescue soup',
            'Tarot-predicted romance scam DMs — Helen procedure, not debate',
            'After Divine Insight Blessing skit — quiet reflection, no re-watch spiral'
        ],
        procedure: [
            'Quick cord-cutting + neighbor release (no drama narrative)',
            'Affirm: "I choose my own timeline and energy field"',
            'Cook-off rule: no soulmate declarations before plating — apply to texts too',
            'Boundary Miso-Ginger Soup beat: warm, clear, no rescue missions in the broth',
            'RED FLAG scan (2+ = abort): destiny/soulmate language, invoice/fees, love-bomb speedrun',
            'Draft boundary script or chaotic-neutral skit beat',
            'Recommend minimal engagement / delete protocol if needed',
            'After the date: offer tea before feelings — mean both',
            'Practice Korean boundary phrases for real situations',
            'Post-DIB self-healing: GoPro off · phone face-down · one breath · whisper 괜찮아요, 괜찮아요',
            'Cord-cut after humor: no reply owed to expired blessings — optional dib-aftercare at HOTEL'
        ],
        pitfalls: [
            'Do not encourage rescue energy or re-engagement',
            'Avoid vilifying — mirror with humor, not hatred',
            'Do not absorb the trigger into the user’s identity',
            'Do not confuse shared soup with shared bank details'
        ],
        verification: [
            'User leaves with a clear boundary phrase or action',
            'Compassion and protection are both honored',
            'Creative outlet offered if skit mode fits',
            'No wire, gift card, crypto, or "ingredient fee" path remains open'
        ],
        korean: [
            '죄송하지만 지금은 어려워요.',
            '제 시간을 지킬게요.',
            '괜찮아요, 괜찮아요.',
            '공유는 괜찮아요. 거래는 아니에요.',
            '잠시 쉬어도 괜찮아요.'
        ],
        integrations: [
            'lets-cook `/date-night` — Helen station: Boundary Miso-Ginger Soup',
            'girls-love **After the Date** Ch.2–4 — slow-burn POV, "I like you. Slowly. On purpose."',
            'audit/tarot-scam-avoidance-audit.md — RED FLAG checklist + block protocol'
        ]
    },
    {
        id: 'sua-tattoo-artist',
        rootFile: 'Sua_Tattoo_Artist.skill.md',
        description: 'Sua tattoo flame muse for releasing intimate creative attachments with gratitude. Use for cord-cutting rituals, temporary-flame skits, cicada/shedding metaphors, or Veil Lumen pieces.',
        activation: "Sua's flame taught me release",
        whenToUse: [
            'Processing past intimate creative connections',
            'Cord-cutting for tattoo/artistic flame dynamics',
            'Video essays or skits about shedding old skins'
        ],
        procedure: [
            'Acknowledge the beauty of what was shared',
            'Release with love: "I return your flame with gratitude"',
            'Anchor self-intimacy: "My own creative fire is enough"',
            'Optional skit or Veil Lumen one-liner',
            'Offer Korean release phrases for shadowing'
        ],
        pitfalls: [
            'Do not reopen attachment or jealousy narratives',
            'Avoid romanticizing what was already released',
            'Never suggest re-contact for "closure"'
        ],
        verification: [
            'Tone is grateful and sovereign, not bitter',
            'User has a ritual or creative next step',
            'Status remains: released with love'
        ],
        korean: ['고마웠어요. 이제 놓아줄게요.', '나만의 불꽃이면 충분해요.', '새 껍질을 벗을게요.']
    },
    {
        id: 'asuka-brisbane',
        rootFile: 'Asuka_Brisbane_Archetype.skill.md',
        description: 'Asuka distant-flame muse for sovereign choice and releasing "what if" paths. Japanese native input + Korean TTMIK shadowing. Use when user reflects on Brisbane maybe vs Melbourne yes, Ep 5, or graceful release of extra trip legs.',
        activation: 'Brisbane was a beautiful maybe. Melbourne is my yes.',
        whenToUse: [
            'Choosing self over an tempting extra trip leg',
            'Creative reflection on distant flames and possibility',
            'Skit: almost extending the trip for a connection',
            'Ep 5 rain-glass monologue — Japanese native before Korean shadow',
            'TTMIK.html?asuka=1 — invoke Asuka maybe practice'
        ],
        procedure: [
            'Japanese native first: メルボルンが私の選択です — name the yes calmly',
            'Name the "maybe" without regret or fantasy replay',
            'Affirm the "yes" actually chosen (Melbourne path)',
            'Korean shadow: 멜버른이 제 선택이에요 · 제 길을 믿어요',
            'Draft one creative line or skit hook celebrating sovereign choice',
            'Release: no extra leg required · preset 11 · quest main-others'
        ],
        pitfalls: [
            'Do not induce FOMO or second-guessing',
            'Avoid contact prompts toward released connections',
            'Keep Asuka as symbol, not active attachment'
        ],
        verification: [
            'Melbourne choice feels affirmed, not mourned',
            'Output celebrates sovereignty',
            'No suggestion to re-open Brisbane extension'
        ],
        korean: ['멜버른이 제 선택이에요.', '아름다운 "만약에"도 놓을 수 있어요.', '제 길을 믿어요.'],
        japanese: [
            'メルボルンが私の選択です。',
            '美しい「もしも」も手放せます。',
            '自分の道を信じます。',
            'ブリスベンは美しい「もしかしたら」。メルボルンが私の「はい」。'
        ],
        integrations: [
            'Ep 5 · preset 11 · FED rain glass',
            'TTMIK.html?asuka=1 — Japanese native input boot',
            'Quest main-others · Transportation + Melbourne Arrival lessons'
        ]
    },
    {
        id: 'rach3l',
        rootFile: 'rach3l.skill.md',
        description: 'rach3l cautionary mirror for discerning chaotic social media energy without absorption. Use when user processes concerning TikTok content, altered states, or observe-but-do-not-absorb practice.',
        activation: 'Observe but do not absorb',
        whenToUse: [
            'Concerning or unstable energy observed online',
            'Need to strengthen discernment without entanglement',
            'Humorous skit about what not to engage with'
        ],
        procedure: [
            'Notice without judgment — name the pattern, not the person',
            'Say aloud: "This is not my energy to carry"',
            'Ground: one breath, feet on floor',
            'Redirect to Flame-Kissed Bard creative outlet if useful',
            'Log boundary win; do not scroll further'
        ],
        pitfalls: [
            'Never encourage engagement, rescue, or debate',
            'Do not shame the user for having looked',
            'Avoid absorbing chaos into mood or identity'
        ],
        verification: [
            'User feels lighter and more boundaried',
            'No hook or compulsive re-check suggested',
            'Creative or grounding next step offered'
        ],
        korean: ['이건 제 에너지가 아니에요.', '관찰만 하고 흡수하지 않을게요.', '다시 제 길로 돌아갈게요.']
    },
    {
        id: 'ignan-pilgrim',
        rootFile: 'Ignan_Pilgrim.skill.md',
        description: 'Ignan (Ilokano) native archetype for trilingual self-healing walks — Ilokano, Korean, English — after scam skits or diaspora trigger loops. Use when user mentions Ignan, Mari, Ep 2.6, or post-DIB healing journey in Melbourne.',
        activation: 'Mari walks her own dalan — ok laeng, aginana',
        whenToUse: [
            'Self-healing journey after Ep 2.5 DIB or post-scam humor landing',
            'Ignan / Ilokano native processing diaspora grief without rescue framing',
            'TTMIK team trilingual shadowing — Korean practice with Ilokano grounding',
            'Botanic Gardens quiet walk — no performance invoice'
        ],
        procedure: [
            'GoPro on Bard bag — Mari leads; consent each frame',
            'Three-language release: Ilokano (body), Korean (TTMIK), English (anchor)',
            'Walk HOTEL → FED optional rain → BOTANIC lake path',
            'Name one homeward grief without dramatizing; no post before feet stop',
            'Close: bukodko a dalan · quest side-ignan-heal · preset 10'
        ],
        pitfalls: [
            'Do not make Mari a rescue mission or Bard romance subplot',
            'Do not film tears for algorithm engagement',
            'Honor Ilokano — do not collapse into subtitle jokes',
            'No soulmate or Gofundme hooks on diaspora pain'
        ],
        verification: [
            'Three phrases spoken (Ilokano + Korean + English)',
            'Calmer than DIB wrap — no re-watch spiral',
            'Quest side-ignan-heal logged; optional ignan-healing-journey export'
        ],
        korean: ['괜찮아요, 괜찮아요.', '잠시 쉬어도 괜찮아요.', '제 길을 믿어요.'],
        integrations: [
            'Ep 2.6 · ignan-healing-journey · preset 10 · BOTANIC',
            'Post-DIB preset 9 → hand off when Mari is ready',
            'TTMIK.html?ignan=1 — Ignan healing journey boot',
            'Veil Lumen — trilingual spoken clip'
        ],
        ilokano: ['Ok laeng, ok laeng.', 'Nasaem met ti aginana.', 'Piliem ti bukodko a dalan.']
    },
    {
        id: 'ignan-grounding',
        rootFile: 'Ignan_Grounding.skill.md',
        description: 'Ignan grounding skill — Ilokano body-first release before Korean TTMIK shadowing. Use after post-DIB landing, scam humor wrap, or when user needs ok laeng breath pairs without performance.',
        activation: 'Ok laeng, aginana — Ilokano first',
        whenToUse: [
            'Shoulders still tight after preset 9 quiet heal',
            'User wants Ilokano before Korean in trilingual practice',
            'FED rain optional — body calm before ignan-pilgrim walk',
            'TTMIK team drill: Ilokano aloud, then Korean shadow'
        ],
        procedure: [
            'Phone face-down · GoPro off — no re-watch spiral',
            'Ilokano first: Ok laeng, ok laeng — shoulders drop',
            'One slow breath — aginana / Nasaem met ti aginana',
            'Korean shadow only after body lands: 괜찮아요, 괜찮아요',
            'Hand off to ignan-pilgrim or ignan-dalan when calm'
        ],
        pitfalls: [
            'Do not rush Korean before Ilokano body release',
            'Do not film tears or voice cracks for content',
            'Honor Ilokano — not a gag subtitle line'
        ],
        verification: [
            'Shoulders visibly lower or user reports calmer breath',
            'At least one Ilokano + one Korean phrase spoken',
            'No compulsive re-check of DIB or scam skit'
        ],
        korean: ['괜찮아요, 괜찮아요.', '잠시 쉬어도 괜찮아요.', '숨 쉬어도 괜찮아요.'],
        ilokano: ['Ok laeng, ok laeng.', 'Nasaem met ti aginana.', 'Aginana met.'],
        integrations: [
            'Ignan Library · Ilokano Grounding category',
            'Post-DIB preset 9 → ignan-grounding → ignan-pilgrim',
            'HEALING_FACTORS step 4 companion'
        ]
    },
    {
        id: 'ignan-dalan',
        rootFile: 'Ignan_Dalan.skill.md',
        description: 'Ignan dalan sovereignty skill — bukodko a dalan own-path anchor in Ilokano, Korean, and English. Use at BOTANIC walk close, diaspora grief naming, or when user needs path sovereignty without rescue framing.',
        activation: 'Piliem ti bukodko a dalan',
        whenToUse: [
            'BOTANIC lake-path close — preset 10',
            'Naming homeward grief once without dramatizing',
            'English anchor after trilingual shadowing deck',
            'Quest side-ignan-heal log at walk end'
        ],
        procedure: [
            'Name one borrowed shame — no post before feet stop',
            'Ilokano: Piliem ti bukodko a dalan',
            'Korean: 제 길을 믿어요',
            'English: I choose my own timeline and energy field',
            'Wide hold — Maysa nga anges, maysa a talna · log side-ignan-heal'
        ],
        pitfalls: [
            'No soulmate, Gofundme, or rescue hooks on diaspora pain',
            'Do not make Mari a Bard romance subplot',
            'Export ignan-healing-journey only with consent'
        ],
        verification: [
            'Three languages spoken for path sovereignty',
            'Calmer close than DIB wrap',
            'Quest side-ignan-heal logged if walk completed'
        ],
        korean: ['제 길을 믿어요.', '나는 나만의 이야기를 씁니다.', '제 시간표를 선택해요.'],
        ilokano: ['Piliem ti bukodko a dalan.', 'Maysa nga anges, maysa a talna.', 'Bukodko a panawen.'],
        integrations: [
            'Ignan Library · Healing Walk Route + Trilingual Shadowing',
            'Ep 2.6 IG7–IG8 · preset 10',
            'TTMIK.html?ignan=1&step=6'
        ]
    }
];

function buildSkillMd(skill) {
    const title = skill.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const list = (items) => items.map(i => `- ${i}`).join('\n');
    const ko = skill.korean.map((k) => `- ${k}`).join('\n');
    const ilo = skill.ilokano?.length
        ? `\n## Ilokano Practice (Ignan)\n\n${skill.ilokano.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const ja = skill.japanese?.length
        ? `\n## Japanese Practice (Asuka)\n\n${skill.japanese.map((p) => `- ${p}`).join('\n')}\n`
        : '';
    const integrations = skill.integrations?.length
        ? `\n## Cross-App Links\n\n${list(skill.integrations)}\n`
        : '';

    return `---
name: ${skill.id}
description: ${skill.description}
version: 1.2.0
metadata:
  hermes:
    tags: [creative, korean, melbourne, ttmtk, sovereign]
    category: creative
---

# ${title}

**Activation phrase:** "${skill.activation}"

## When to Use

${list(skill.whenToUse)}

## Procedure

${list(skill.procedure)}

## Pitfalls

${list(skill.pitfalls)}

## Verification

${list(skill.verification)}

## Korean Practice (TTMIK)

${ko}
${ilo}${ja}${integrations}
## TTMIK App Integration

- Skill id: \`${skill.id}\` in \`skills-data.js\`
- Set active in **Skills** tab → feeds **Shadowing** phrases
- Linked lessons via **Open linked lessons**

---
*Healed to Hermes agentskills.io format — ${new Date().toISOString().slice(0, 10)}*
`;
}

function writeFileEnsuringDir(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
}

function healSkills(root) {
    const projectRoot = path.resolve(root);
    const devinSkills = path.join(projectRoot, '.devin', 'skills');
    const hermesSkills = path.join(process.env.USERPROFILE || process.env.HOME, '.hermes', 'skills', 'creative');

    let healed = 0;
    for (const skill of SKILLS) {
        const content = buildSkillMd(skill);
        const devinPath = path.join(devinSkills, skill.id, 'SKILL.md');
        const hermesPath = path.join(hermesSkills, skill.id, 'SKILL.md');
        const rootPath = path.join(projectRoot, skill.rootFile);

        writeFileEnsuringDir(devinPath, content);
        writeFileEnsuringDir(hermesPath, content);
        writeFileEnsuringDir(rootPath, content);
        healed++;
        console.log(`Healed: ${skill.id}`);
    }

    const configPath = path.join(process.env.USERPROFILE || process.env.HOME, '.hermes', 'config.yaml');
    const externalDir = devinSkills.replace(/\\/g, '/');
    const configBlock = `skills:
  external_dirs:
    - ${externalDir}
`;
    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
        fs.writeFileSync(configPath, configBlock, 'utf8');
        console.log(`Created ${configPath}`);
    } else {
        const existing = fs.readFileSync(configPath, 'utf8');
        if (!existing.includes(externalDir)) {
            fs.appendFileSync(configPath, `\n${configBlock}`, 'utf8');
            console.log(`Appended external_dirs to ${configPath}`);
        }
    }

    console.log(`\nDone — ${healed} skills healed to .devin/skills, repo root, and ~/.hermes/skills/creative/`);
    return healed;
}

module.exports = { healSkills, SKILLS };