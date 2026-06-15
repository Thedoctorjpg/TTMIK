/**
 * Melbourne Lantern multiformat edit timelines
 * Bridges webdrama shot lists → video-editor suite (FFmpeg.wasm / Pro / AI)
 * @see https://github.com/Thedoctorjpg/video-editor
 */

const VIDEO_EDITOR_ENTRIES = {
    launcher: { path: 'index.html', label: 'Suite Launcher' },
    ultimate: { path: 'video-editor-ultimate.html', label: 'Ultimate FFmpeg' },
    pro: { path: 'Video%20Editor%20Pro', label: 'Editor Pro' },
    worker: { path: 'video-editor-pro-worker.html', label: 'Worker Edition' },
    ai: { path: 'AI%20video%20editor', label: 'AI + Subtitles' }
};

const DEFAULT_VIDEO_EDITOR_BASE = 'http://localhost:8000';

/** Aspect → FFmpeg scale/crop hint for 1080p masters */
const ASPECT_PRESETS = {
    '9:16': { width: 1080, height: 1920, label: 'Vertical Reels / TikTok / Webdrama' },
    '16:9': { width: 1920, height: 1080, label: 'Veil Lumen essay / YouTube' },
    '1:1': { width: 1080, height: 1080, label: 'Square social' }
};

const MULTIFORMAT_EDITS = {
    'reel-a': {
        id: 'reel-a',
        label: 'Reel A · Tsundere Scam PSA',
        duration: 30,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'warm',
        overlay: 'MELBOURNE LANTERN',
        overlayPosition: 'W-tw-10:10',
        ttmikSync: { pin: 'HOSIER', episode: 2, reel: 'A' },
        pins: ['HOSIER', 'CENTRE', 'COLLINS', 'DEGRAVES'],
        exportTargets: ['Instagram Reel', 'YouTube Short clip', 'Ep 3 montage'],
        shots: [
            { id: 'A1', time: '0:00', pin: 'HOSIER', note: 'Selfie MCU cold open', dur: 3 },
            { id: 'A2', time: '0:02', pin: 'HOSIER', note: 'Divine insight SYSTEM UI', dur: 2 },
            { id: 'A3', time: '0:03', pin: 'HOSIER', note: 'Tsundere pan → snap', dur: 4 },
            { id: 'A4', time: '0:07', pin: 'CENTRE', note: 'Rule 1 walk', dur: 5 },
            { id: 'A6', time: '0:12', pin: 'COLLINS', note: 'Invoice / headset gag', dur: 5 },
            { id: 'A7', time: '0:17', pin: 'DEGRAVES', note: 'Not blushing coffee', dur: 4 },
            { id: 'A8', time: '0:21', pin: 'HOSIER', note: 'Sovereign chest tap', dur: 4 },
            { id: 'A9', time: '0:25', pin: 'HOSIER', note: 'Korean soft selfie', dur: 3 },
            { id: 'A10', time: '0:28', pin: 'CENTRE', note: 'Walk-off exit', dur: 2 }
        ]
    },
    'reel-b': {
        id: 'reel-b',
        label: 'Reel B · Not Enjoying Melbourne',
        duration: 30,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'cinematic',
        overlay: 'NOT IMPRESSED',
        overlayPosition: '10:H-th-10',
        ttmikSync: { pin: 'HOSIER', episode: 2, reel: 'B' },
        pins: ['HOSIER', 'CENTRE'],
        exportTargets: ['TikTok', 'Instagram Reel', 'Ep 2 main'],
        shots: [
            { id: 'W1', time: '0:00', pin: 'HOSIER', note: 'Wide vertical — not impressed', dur: 3 },
            { id: 'W2', time: '0:03', pin: 'HOSIER', note: 'Graffiti CU drift', dur: 3 },
            { id: 'B3', time: '0:06', pin: 'HOSIER', note: 'Selfie MCU snap', dur: 4 },
            { id: 'B5', time: '0:10', pin: 'HOSIER', note: 'GoPro mount content dept', dur: 5 },
            { id: 'B6', time: '0:15', pin: 'CENTRE', note: '4G > fate walk', dur: 5 },
            { id: 'B7', time: '0:20', pin: 'HOSIER', note: 'Korean slip golden hour', dur: 6 },
            { id: 'B8', time: '0:26', pin: 'HOSIER', note: 'Fine face medium wide', dur: 2 },
            { id: 'B9', time: '0:29', pin: 'CENTRE', note: 'Walk-off OC', dur: 1 }
        ]
    },
    'ep-2-5-dib': {
        id: 'ep-2-5-dib',
        label: 'Ep 2.5 · Divine Insight Blessing',
        duration: 30,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'warm',
        overlay: '4G > FATE',
        overlayPosition: 'W/2-tw/2:H-th-10',
        ttmikSync: { pin: 'HOSIER', episode: '2.5', reel: 'A' },
        pins: ['HOSIER'],
        exportTargets: ['Standalone Short', 'Reel A insert', 'Scam PSA', 'dib-aftercare follow-up'],
        shots: [
            { id: 'DIB2', time: '0:00', pin: 'HOSIER', note: 'Not impressed selfie', dur: 3 },
            { id: 'DIB3', time: '0:03', pin: 'HOSIER', note: 'SYSTEM blessing UI', dur: 3 },
            { id: 'DIB4', time: '0:06', pin: 'HOSIER', note: 'Cards have GPS', dur: 4 },
            { id: 'DIB8', time: '0:10', pin: 'HOSIER', note: 'Content dept / GoPro mount', dur: 5 },
            { id: 'DIB9', time: '0:15', pin: 'HOSIER', note: '4G > fate loader', dur: 5 },
            { id: 'DIB10', time: '0:20', pin: 'HOSIER', note: 'Korean lane slip', dur: 5 },
            { id: 'DIB11', time: '0:25', pin: 'HOSIER', note: 'RED FLAG #2 toss', dur: 3 },
            { id: 'DIB12', time: '0:28', pin: 'HOSIER', note: 'Expire faster walk-off', dur: 2 }
        ]
    },
    'dib-aftercare': {
        id: 'dib-aftercare',
        label: 'Post-DIB · Quiet Reflection & Self-Healing (45s)',
        duration: 45,
        aspect: '9:16',
        editor: 'pro',
        visualPreset: 'noir',
        overlay: '괜찮아요',
        overlayPosition: '10:H-th-10',
        ttmikSync: { pin: 'HOTEL', episode: '2.5', reel: null },
        pins: ['HOTEL'],
        exportTargets: ['Ep 2.5 coda', 'Helen ritual clip', 'Veil Lumen soft cut', 'Self-intimacy reel'],
        shots: [
            { id: 'HEAL1', time: '0:00', pin: 'HOTEL', note: 'GoPro off · phone face-down on desk', dur: 8 },
            { id: 'HEAL2', time: '0:08', pin: 'HOTEL', note: 'Mirror or window — one breath, one laugh', dur: 10 },
            { id: 'HEAL3', time: '0:18', pin: 'HOTEL', note: 'HELEN VO: compassion includes protecting your peace', dur: 8 },
            { id: 'HEAL4', time: '0:26', pin: 'HOTEL', note: 'Whisper 괜찮아요, 괜찮아요 — no re-watch spiral', dur: 9 },
            { id: 'HEAL5', time: '0:35', pin: 'HOTEL', note: 'Cord-cut gesture · SYSTEM blessing UI stays expired', dur: 6 },
            { id: 'HEAL6', time: '0:41', pin: 'HOTEL', note: 'Lantern dim · I create from flame, not from lack', dur: 4 }
        ]
    },
    'tiktok-15': {
        id: 'tiktok-15',
        label: 'TikTok 15s duet cuts',
        duration: 15,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'none',
        overlay: '',
        pins: ['HOSIER'],
        exportTargets: ['TikTok duet', 'B3 only', 'DIB10 Korean only'],
        variants: [
            { id: 'tiktok-b3', label: 'B3 snap only', shots: [{ id: 'B3', pin: 'HOSIER', dur: 15 }] },
            { id: 'tiktok-a9', label: 'A9 Korean line', shots: [{ id: 'A9', pin: 'HOSIER', dur: 15 }] },
            { id: 'tiktok-dib10', label: 'DIB10 Korean', shots: [{ id: 'DIB10', pin: 'HOSIER', dur: 15 }] }
        ]
    },
    'webdrama-ep2': {
        id: 'webdrama-ep2',
        label: 'Webdrama Ep 2 · Arrival Tsundere (90s)',
        duration: 90,
        aspect: '9:16',
        editor: 'pro',
        visualPreset: 'cinematic',
        overlay: 'EP 2 · 도착',
        pins: ['HOSIER', 'DEGRAVES'],
        exportTargets: ['Full episode', 'Season assembly'],
        shots: [
            { id: 'cold', time: '0:00', pin: 'HOSIER', note: 'Wide golden hour', dur: 8 },
            { id: 'kind-of', time: '0:08', pin: 'HOSIER', note: 'Kind of pretty', dur: 15 },
            { id: 'content', time: '0:23', pin: 'HOSIER', note: 'Content department', dur: 20 },
            { id: '4g-fate', time: '0:43', pin: 'HOSIER', note: 'RED FLAG #1', dur: 15 },
            { id: 'cliff', time: '0:58', pin: 'DEGRAVES', note: 'Coffee cliffhanger', dur: 32 }
        ]
    },
    'date-night-cookoff': {
        id: 'date-night-cookoff',
        label: 'Ep 2.75 · Cook-Off Not a Date (90s)',
        duration: 90,
        aspect: '9:16',
        editor: 'pro',
        visualPreset: 'warm',
        overlay: 'NOT A DATE',
        overlayPosition: 'W-tw-10:10',
        ttmikSync: { pin: 'DEGRAVES', episode: '2.75', reel: 'B' },
        pins: ['FLINDERS', 'DEGRAVES', 'HOTEL'],
        exportTargets: ['Webdrama insert', 'lets-cook hook', 'girls-love Ch.1'],
        pipeline: ['letsCook', 'girlsLove'],
        shots: [
            { id: 'DN1', time: '0:00', pin: 'FLINDERS', note: 'Meet Flinders Lane — no love-bomb speedrun', dur: 8 },
            { id: 'DN2', time: '0:08', pin: 'DEGRAVES', note: 'Silly ingredient picks · 15 min cap', dur: 12 },
            { id: 'DN3', time: '0:20', pin: 'DEGRAVES', note: 'Flat white to-go — hydration not romance', dur: 10 },
            { id: 'DN4', time: '0:30', pin: 'HOTEL', note: 'Stations set · GoPro consent · 45 min timer', dur: 25 },
            { id: 'DN5', time: '0:55', pin: 'HOTEL', note: 'Plating montage — Lo3tus / Helen / Asuka / Rach3l', dur: 15 },
            { id: 'DN6', time: '1:10', pin: 'DEGRAVES', note: 'Bard scorecards — boundaries category mandatory', dur: 12 },
            { id: 'DN7', time: '1:22', pin: 'HOTEL', note: 'Dishes · SYSTEM mute · plates down hearts loud', dur: 8 }
        ]
    },
    'after-the-date': {
        id: 'after-the-date',
        label: 'After the Date · Dawn Degraves (60s)',
        duration: 60,
        aspect: '9:16',
        editor: 'pro',
        visualPreset: 'cinematic',
        overlay: 'CH.2 · DAWN',
        ttmikSync: { pin: 'DEGRAVES', episode: '2.75', reel: 'B' },
        pins: ['DEGRAVES', 'FLINDERS'],
        exportTargets: ['girls-love novel', 'Veil Lumen soft cut', 'Morning reel'],
        pipeline: ['girlsLove'],
        shots: [
            { id: 'AT1', time: '0:00', pin: 'DEGRAVES', note: '6:12 AM — pastry boxes · no GoPro', dur: 10 },
            { id: 'AT2', time: '0:10', pin: 'FLINDERS', note: 'Flinders Lane end reunion — where it started', dur: 8 },
            { id: 'AT3', time: '0:18', pin: 'DEGRAVES', note: 'Croissant treaty — not a date / breakfast tax', dur: 12 },
            { id: 'AT4', time: '0:30', pin: 'DEGRAVES', note: 'Bard observes from café distance — newspaper prop', dur: 10 },
            { id: 'AT5', time: '0:40', pin: 'DEGRAVES', note: '멜버른 골목이 정말 예뻐요 — morning edition', dur: 10 },
            { id: 'AT6', time: '0:50', pin: 'DEGRAVES', note: 'Walk-off — phones optional boundaries intact', dur: 10 }
        ]
    },
    'pipeline-montage': {
        id: 'pipeline-montage',
        label: 'Pipeline Montage · All Sources (45s)',
        duration: 45,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'cinematic',
        overlay: 'BARDIC INSPIRATION',
        pins: ['MEL', 'HOSIER', 'DEGRAVES', 'HOTEL', 'PRINCES'],
        exportTargets: ['Pitch deck', 'Creative Corner', 'TTMIK Journey tab'],
        shots: [
            { id: 'PM1', pin: 'MEL', note: 'RTDB AKL → MEL land — pilgrimage open', dur: 5 },
            { id: 'PM2', pin: 'HOSIER', note: 'Morning block · Reel A/B + DIB', dur: 8 },
            { id: 'PM3', pin: 'DEGRAVES', note: '17:00 date night outing hook', dur: 8 },
            { id: 'PM4', pin: 'HOTEL', note: 'Cook-off timer · Helen boundaries', dur: 8 },
            { id: 'PM5', pin: 'DEGRAVES', note: 'Score + dawn Ch.2 beat', dur: 8 },
            { id: 'PM6', pin: 'PRINCES', note: 'World close — lantern to viewer', dur: 8 }
        ]
    },
    'trailer-30': {
        id: 'trailer-30',
        label: 'Season 1 Trailer (30s)',
        duration: 30,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'cinematic',
        overlay: 'MELBOURNE LANTERN',
        pins: ['MEL', 'HOSIER', 'DEGRAVES', 'HOTEL', 'FLINDERS', 'SOUTH', 'PRINCES'],
        exportTargets: ['Trailer', 'Pitch deck', 'pipeline-montage source'],
        shots: [
            { id: 't-mel', pin: 'MEL', dur: 2 },
            { id: 't-hosier', pin: 'HOSIER', dur: 3 },
            { id: 't-degraves', pin: 'DEGRAVES', dur: 2 },
            { id: 't-cookoff', pin: 'HOTEL', note: 'Cook-off NOT a date hook', dur: 3 },
            { id: 't-flinders', pin: 'FLINDERS', dur: 2 },
            { id: 't-south', pin: 'SOUTH', dur: 3 },
            { id: 't-dawn', pin: 'DEGRAVES', note: 'Dawn croissant beat', dur: 2 },
            { id: 't-princes', pin: 'PRINCES', dur: 3 },
            { id: 't-lantern', pin: 'HOSIER', dur: 2 }
        ]
    },
    'veil-lumen': {
        id: 'veil-lumen',
        label: 'Veil Lumen Essay (16:9 · 3–5 min)',
        duration: 240,
        aspect: '16:9',
        editor: 'ai',
        visualPreset: 'noir',
        overlay: 'VEIL LUMEN',
        pins: ['FED', 'COLLINS', 'HOTEL', 'FLINDERS', 'SOUTH', 'BOTANIC'],
        exportTargets: ['YouTube essay', 'Creative Corner'],
        shots: [
            { id: 'v-fed', pin: 'FED', note: 'Rain glass open', dur: 45 },
            { id: 'v-collins', pin: 'COLLINS', note: 'Scam as myth VO', dur: 40 },
            { id: 'v-hotel', pin: 'HOTEL', note: 'Helen mirror ritual', dur: 35 },
            { id: 'v-flinders', pin: 'FLINDERS', note: 'Tram monologue', dur: 50 },
            { id: 'v-south', pin: 'SOUTH', note: 'Moon / scroll', dur: 40 },
            { id: 'v-botanic', pin: 'BOTANIC', note: 'World close', dur: 30 }
        ]
    },
    'youtube-short-60': {
        id: 'youtube-short-60',
        label: 'YouTube Short 60s (Reel A+B combined)',
        duration: 60,
        aspect: '9:16',
        editor: 'ultimate',
        visualPreset: 'warm',
        pins: ['HOSIER', 'CENTRE', 'DEGRAVES'],
        exportTargets: ['YouTube Short'],
        shots: [
            { id: 'W1', pin: 'HOSIER', dur: 4 },
            { id: 'A3', pin: 'HOSIER', dur: 4 },
            { id: 'B5', pin: 'HOSIER', dur: 5 },
            { id: 'A4', pin: 'CENTRE', dur: 5 },
            { id: 'DIB9', pin: 'HOSIER', dur: 5 },
            { id: 'B7', pin: 'HOSIER', dur: 6 },
            { id: 'A8', pin: 'HOSIER', dur: 4 },
            { id: 'B9', pin: 'CENTRE', dur: 3 }
        ]
    }
};

function getVideoEditorBase() {
    const fromState = appState?.settings?.videoEditorBase;
    if (typeof fromState === 'string' && fromState.trim()) {
        return fromState.trim().replace(/\/$/, '');
    }
    return DEFAULT_VIDEO_EDITOR_BASE;
}

function getMultiformatEdit(formatId) {
    return MULTIFORMAT_EDITS[formatId] || null;
}

function getAllMultiformatEdits() {
    return Object.values(MULTIFORMAT_EDITS);
}

function buildVideoEditorUrl(formatId, options = {}) {
    const edit = getMultiformatEdit(formatId);
    if (!edit) return getVideoEditorBase();

    const entryKey = options.editor || edit.editor || 'ultimate';
    const entry = VIDEO_EDITOR_ENTRIES[entryKey] || VIDEO_EDITOR_ENTRIES.ultimate;
    const base = getVideoEditorBase();
    const params = new URLSearchParams();

    params.set('project', 'melbourne-lantern');
    params.set('format', formatId);
    if (edit.aspect) params.set('aspect', edit.aspect);
    if (edit.visualPreset) params.set('preset', edit.visualPreset);
    if (edit.overlay) params.set('overlay', edit.overlay);
    if (edit.overlayPosition) params.set('overlayPos', edit.overlayPosition);
    if (edit.duration) params.set('duration', String(edit.duration));
    if (options.sync !== false && edit.ttmikSync) {
        params.set('pin', edit.ttmikSync.pin);
        params.set('episode', String(edit.ttmikSync.episode));
        if (edit.ttmikSync.reel) params.set('reel', edit.ttmikSync.reel);
    }

    return `${base}/${entry.path}?${params.toString()}`;
}

function exportEditTimelineJson(formatId) {
    const edit = getMultiformatEdit(formatId);
    if (!edit) return null;
    const aspect = ASPECT_PRESETS[edit.aspect] || null;
    return {
        project: 'melbourne-lantern',
        generatedAt: new Date().toISOString(),
        format: edit,
        aspect,
        editorUrl: buildVideoEditorUrl(formatId),
        editOrder: (edit.shots || []).map(s => `${s.id}@${s.pin}`).join(' → ')
    };
}

function copyEditTimeline(formatId) {
    const payload = exportEditTimelineJson(formatId);
    if (!payload) return;
    const text = [
        `${payload.format.label} (${payload.format.duration}s · ${payload.format.aspect})`,
        payload.editOrder,
        ...(payload.format.shots || []).map(s =>
            `${s.id} @${s.pin} ${s.time || ''} — ${s.note || ''} (${s.dur || '?'}s)`
        )
    ].filter(Boolean).join('\n');
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
    }
}