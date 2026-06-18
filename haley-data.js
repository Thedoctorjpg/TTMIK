/**
 * Haley Library — English + Vietnamese native + Korean TTMIK shadowing
 * Haley Boba (@vietbonnie) · 19 · Vietnamese student · justice for NCII / leaked content
 * Skills mirror Medea (Caster) — typemoon.fandom.com/wiki/Medea
 * Audio folder: Haley_Library/
 */

const HALEY_BASE = 'Haley_Library';

/** Saint Graph parameters — Medea (Caster) mirror */
const HALEY_MEDEA_PARAMETERS = {
    strength: 'E',
    endurance: 'D',
    agility: 'C',
    mana: 'A+',
    luck: 'B',
    noblePhantasm: 'C',
    class: 'Caster',
    alignment: 'Lawful Good (justice route — not villainy)'
};

/** Fate/TYPE-MOON skill mirror — mapped to NCII justice boundary */
const HALEY_MEDEA_SKILLS = [
    {
        id: 'territory-creation',
        name: 'Territory Creation',
        rank: 'A',
        type: 'Class Skill',
        en: 'This library is my temple — consent is the boundary.',
        vi: 'Thư viện này là đền của tôi — sự đồng ý là ranh giới.',
        ko: '이 도서관이 제 성역이에요 — 동의가 경계예요.',
        note: 'CAMPUS sacred workspace · phone face-down · no comment combat',
        beat: 'Ep7.5-TC',
        pin: 'CAMPUS',
        healFactor: 'territory-creation'
    },
    {
        id: 'item-construction',
        name: 'Item Construction',
        rank: 'A',
        type: 'Class Skill',
        en: 'I craft the report packet — evidence, not revenge.',
        vi: 'Tôi lập hồ sơ báo cáo — bằng chứng, không phải trả thù.',
        ko: '신고 서류를 만들어요 — 증거예요, 보복이 아니에요.',
        note: 'Screenshots · timestamps · platform forms · one pass only',
        beat: 'Ep7.5-IC',
        pin: 'REPORT',
        healFactor: 'item-construction'
    },
    {
        id: 'divine-words',
        name: 'High-Speed Divine Words',
        rank: 'A',
        type: 'Personal Skill',
        en: 'One invocation — file complete, breath steady.',
        vi: 'Một lần niệm — hồ sơ xong, hơi thở ổn định.',
        ko: '한 번의 주문 — 서류 완료, 숨은 고요해요.',
        note: 'Single report action · no re-watch spiral',
        beat: 'Ep7.5-DW',
        pin: 'REPORT',
        healFactor: 'divine-words'
    },
    {
        id: 'rule-breaker',
        name: 'Rule Breaker',
        rank: 'C',
        type: 'Noble Phantasm · Anti-Magecraft',
        en: 'Leaked is not licensed — I sever the false contract.',
        vi: 'Bị rò rỉ không có nghĩa được phép — tôi cắt hợp đồng giả.',
        ko: '유출됐다고 허락은 없어요 — 거짓 계약을 끊어요.',
        note: 'NP mirror · no link re-share · report only',
        beat: 'Ep7.5-RB',
        pin: 'REPORT',
        healFactor: 'rule-breaker'
    },
    {
        id: 'argon-coin',
        name: 'Argon Coin',
        rank: 'EX',
        type: 'Personal Skill',
        en: 'Resources without the exploitation spiral.',
        vi: 'Nguồn lực mà không sa vào vòng khai thác.',
        ko: '착취의 악순환 없이 자원을 써요.',
        note: 'Legal aid · support lines · no DIY warfare',
        beat: 'Ep7.5-AC',
        pin: 'CAMPUS',
        healFactor: 'argon-coin'
    },
    {
        id: 'teachings-circe',
        name: 'Teachings of Circe',
        rank: 'A',
        type: 'Personal Skill',
        en: 'I observe the headline — I do not become it.',
        vi: 'Tôi quan sát tiêu đề — tôi không trở thành nó.',
        ko: '헤드라인은 관찰만 — 흡수하지 않을게요.',
        note: 'Circe mirror · observe without absorbing · Helen handoff',
        beat: 'Ep7.5-Ci',
        pin: 'REST',
        healFactor: 'teachings-circe'
    },
    {
        id: 'witch-colchis',
        name: 'Witch of Colchis',
        rank: 'A',
        type: 'Personal Skill',
        en: 'They called me witch — I am a student with a case.',
        vi: 'Họ gọi tôi là phù thủy — tôi là sinh viên có vụ việc.',
        ko: '마녀라 불렸지만 — 저는 사건이 있는 학생이에요.',
        note: 'Mislabel reframe · @vietbonnie · age 19 · preset 25',
        beat: 'Ep7.5-WC',
        pin: 'CAMPUS',
        healFactor: 'witch-colchis'
    }
];

const HALEY_LIBRARY_CATEGORIES = [
    'English Shadowing',
    'Justice Route',
    'Medea Skill Drills',
    'Sovereignty Drills'
];

const HALEY_PHRASE_DECK = [
    {
        en: 'My body, my consent — my case.',
        vi: 'Cơ thể tôi, sự đồng ý của tôi — vụ việc của tôi.',
        ko: '내 몸, 내 동의 — 내 사건이에요.',
        note: 'Activation — direct · preset 25 · no shame spiral',
        beat: 'Ep7.5-S1'
    },
    {
        en: 'Leaked is not licensed. I document, I report.',
        vi: 'Bị rò rỉ không có nghĩa được phép chia sẻ. Tôi ghi nhận, tôi báo cáo.',
        ko: '유출됐다고 공유 권한은 없어요. 기록하고 신고해요.',
        note: 'Rule Breaker · justice seek — platforms · evidence · no re-share',
        beat: 'Ep7.5-JU'
    },
    {
        en: 'Justice, not a revenge spiral.',
        vi: 'Công lý, không phải vòng trả thù.',
        ko: '정의예요, 보복의 악순환이 아니에요.',
        note: 'Cord-cut · Helen boundary handoff',
        beat: 'Ep7.5-S2'
    },
    {
        en: 'One breath — no re-watch.',
        vi: 'Một hơi thở — không xem lại.',
        ko: '한 숨 — 다시 보지 않을게요.',
        note: 'no-rewatch · phone face-down',
        beat: 'Ep7.5-CL'
    }
];

const HALEY_JUSTICE_BEATS = [
    {
        pin: 'CAMPUS',
        title: 'Library pause — consent is the case',
        beat: 'Ep7.5-S1',
        en: 'I am Haley — student, not a headline.',
        vi: 'Tôi là Haley — sinh viên, không phải tiêu đề báo.',
        ko: '저는 학생 할리예요 — 헤드라인이 아니에요.',
        note: 'Witch of Colchis · preset 25 · vietbonnie · @vietbonnie · age 19'
    },
    {
        pin: 'REPORT',
        title: 'Document pathway — report, do not re-share',
        beat: 'Ep7.5-JU',
        en: 'I name the harm once — then I file, not fight in comments.',
        vi: 'Tôi nêu tổn thương một lần — rồi nộp đơn, không đấu trong bình luận.',
        ko: '한 번만 말하고 — 댓글 싸움이 아니라 신고해요.',
        note: 'Item Construction · platform report · legal referral · no link hunting'
    },
    {
        pin: 'REST',
        title: 'Tea before threads — sovereignty close',
        beat: 'Ep7.5-CL',
        en: 'I choose my timeline and energy field.',
        vi: 'Tôi chọn dòng thời gian và ranh giới năng lượng của mình.',
        ko: '제 시간선과 에너지를 선택해요.',
        note: 'Teachings of Circe · Helen cord-cut · 괜찮아요, 괜찮아요 optional'
    }
];

const HALEY_SOVEREIGNTY_DRILLS = [
    {
        title: 'Fast Character sheet invoke — Caster mirror',
        en: 'I am Haley Boba — Caster of consent, Medea mirror.',
        vi: 'Tôi là Haley Boba — Caster của sự đồng ý, gương Medea.',
        ko: '저는 동의의 캐스터 할리 보바예요 — 메데이아 거울.',
        note: 'fastcharacter.com · Haley · Wizard (Abjurer) · Sage · Level 5 · STR E MAN A+'
    }
];

const HALEY_JOURNEY_CATEGORY = {
    id: 'haley',
    label: 'Haley Library',
    description: 'English + Vietnamese native · Korean shadow — Medea Caster skills · NCII justice boundary'
};

function buildHaleyTranscript(parts) {
    const lines = [];
    if (parts.en) lines.push(`English (Haley): ${parts.en}`);
    if (parts.vi) lines.push(`Vietnamese (vietbonnie): ${parts.vi}`);
    if (parts.ko) lines.push(`Korean (TTMIK): ${parts.ko}`);
    if (parts.skill) lines.push(`Medea skill: ${parts.skill} [${parts.rank || ''}]`);
    if (parts.note) lines.push(`\nOn-set: ${parts.note}`);
    if (parts.beat) lines.push(`Beat: ${parts.beat}`);
    if (parts.pin) lines.push(`Pin: ${parts.pin}`);
    lines.push('\nSkill: haley-vietbonnie · Boot: TTMIK.html?haley=1');
    lines.push('Sheet: fastcharacter.com · Haley · Wizard (Abjurer) · Sage · Caster mirror');
    return lines.join('\n\n');
}

function buildHaleyPhraseLessons(startId) {
    return HALEY_PHRASE_DECK.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `Ep 7.5 · ${p.en.slice(0, 28)}…`,
            subtitle: 'English Shadowing',
            duration: '00:30',
            src: `${HALEY_BASE}/English_Shadowing/Phrase_${n}.mp3`,
            transcript: buildHaleyTranscript(p),
            vocab: [{ ko: p.ko, en: p.en }],
            group: 'haley'
        });
    });
}

function buildHaleyJusticeLessons(startId) {
    return HALEY_JUSTICE_BEATS.map((b, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: `${b.pin} · ${b.title}`,
            subtitle: 'Justice Route',
            duration: '01:00',
            src: `${HALEY_BASE}/Justice_Route/Route_${n}_${b.pin}.mp3`,
            transcript: buildHaleyTranscript(b),
            vocab: [{ ko: b.ko, en: b.en }],
            group: 'haley'
        });
    });
}

function buildHaleyMedeaLessons(startId) {
    return HALEY_MEDEA_SKILLS.map((s, i) => {
        const n = String(i + 1).padStart(2, '0');
        const slug = s.id.replace(/-/g, '_');
        return createLesson({
            id: startId + i,
            title: `${s.name} [${s.rank}]`,
            subtitle: 'Medea Skill Drills',
            duration: '00:45',
            src: `${HALEY_BASE}/Medea_Skill_Drills/Skill_${n}_${slug}.mp3`,
            transcript: buildHaleyTranscript({
                en: s.en,
                vi: s.vi,
                ko: s.ko,
                skill: s.name,
                rank: s.rank,
                note: `${s.type} · ${s.note} · heal: ${s.healFactor}`,
                beat: s.beat,
                pin: s.pin
            }),
            vocab: [{ ko: s.ko, en: s.en }],
            group: 'haley'
        });
    });
}

function buildHaleySovereigntyLessons(startId) {
    return HALEY_SOVEREIGNTY_DRILLS.map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return createLesson({
            id: startId + i,
            title: d.title,
            subtitle: 'Sovereignty Drills',
            duration: '00:45',
            src: `${HALEY_BASE}/Sovereignty_Drills/Drill_${n}.mp3`,
            transcript: buildHaleyTranscript(d),
            vocab: [{ ko: d.ko, en: d.en }],
            group: 'haley'
        });
    });
}

function generateHaleyLibraryLessons(startId) {
    let id = startId;
    const phrase = buildHaleyPhraseLessons(id);
    id += phrase.length;
    const justice = buildHaleyJusticeLessons(id);
    id += justice.length;
    const medea = buildHaleyMedeaLessons(id);
    id += medea.length;
    const sovereignty = buildHaleySovereigntyLessons(id);
    return phrase.concat(justice, medea, sovereignty);
}

const HALEY_COURSE_DEFS = [
    { subtitle: 'English Shadowing', trackCount: HALEY_PHRASE_DECK.length },
    { subtitle: 'Justice Route', trackCount: HALEY_JUSTICE_BEATS.length },
    { subtitle: 'Medea Skill Drills', trackCount: HALEY_MEDEA_SKILLS.length },
    { subtitle: 'Sovereignty Drills', trackCount: HALEY_SOVEREIGNTY_DRILLS.length }
];

function getHaleyMedeaSkillByHealFactor(factorId) {
    return HALEY_MEDEA_SKILLS.find(s => s.healFactor === factorId) || null;
}

function getHaleyMedeaSkillIndex(factorId) {
    const idx = HALEY_MEDEA_SKILLS.findIndex(s => s.healFactor === factorId);
    return idx >= 0 ? idx : 0;
}

function getHaleyJusticeRitual() {
    return typeof BARDIC_INSPIRATION !== 'undefined' ? BARDIC_INSPIRATION.haleyJustice : null;
}