/**
 * TTMIK ↔ video-editor multiformat bridge UI
 */

function renderMultiformatEditorPanel() {
    const panel = document.getElementById('multiformat-editor-panel');
    if (!panel || typeof MULTIFORMAT_EDITS === 'undefined') return;
    panel.textContent = '';

    const header = document.createElement('div');
    header.className = 'flex flex-wrap items-start justify-between gap-4 mb-6';
    const titleBlock = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold';
    h3.textContent = 'Multiformat Editor';
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm mt-1';
    meta.textContent = 'Melbourne Lantern cut lists → video-editor suite (FFmpeg.wasm · Pro · AI)';
    titleBlock.appendChild(h3);
    titleBlock.appendChild(meta);

    const badge = document.createElement('div');
    badge.className = 'bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-2xl text-sm font-medium';
    badge.textContent = `${getAllMultiformatEdits().length} formats`;

    header.appendChild(titleBlock);
    header.appendChild(badge);
    panel.appendChild(header);

    const baseRow = document.createElement('div');
    baseRow.className = 'flex flex-wrap gap-3 items-end mb-6';
    const baseLabel = document.createElement('label');
    baseLabel.className = 'flex-1 min-w-[200px]';
    const baseLbl = document.createElement('span');
    baseLbl.className = 'text-xs uppercase tracking-widest text-zinc-500 block mb-2';
    baseLbl.textContent = 'Video editor base URL';
    const baseInput = document.createElement('input');
    baseInput.type = 'url';
    baseInput.className = 'w-full bg-zinc-800 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500';
    baseInput.placeholder = 'http://localhost:8000';
    baseInput.value = getVideoEditorBase();
    baseInput.onchange = () => {
        if (!appState.settings) appState.settings = {};
        appState.settings.videoEditorBase = baseInput.value.trim() || DEFAULT_VIDEO_EDITOR_BASE;
        persistState();
        renderMultiformatEditorPanel();
    };
    baseLabel.appendChild(baseLbl);
    baseLabel.appendChild(baseInput);

    const launchAll = document.createElement('a');
    launchAll.href = `${getVideoEditorBase()}/index.html`;
    launchAll.target = '_blank';
    launchAll.rel = 'noopener noreferrer';
    launchAll.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
    launchAll.textContent = 'Open suite';

    baseRow.appendChild(baseLabel);
    baseRow.appendChild(launchAll);
    panel.appendChild(baseRow);

    const hint = document.createElement('p');
    hint.className = 'text-xs text-zinc-500 mb-6';
    hint.textContent = 'Serve video-editor locally: cd video-editor && python -m http.server 8000';
    panel.appendChild(hint);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-4';

    getAllMultiformatEdits().forEach(edit => {
        const card = document.createElement('div');
        card.className = 'bg-zinc-800/50 rounded-2xl p-5 border border-zinc-800 hover:border-emerald-500/40 transition';

        const cardHead = document.createElement('div');
        cardHead.className = 'flex justify-between items-start gap-2 mb-2';
        const cardTitle = document.createElement('h4');
        cardTitle.className = 'font-semibold text-white';
        cardTitle.textContent = edit.label;
        const durBadge = document.createElement('span');
        durBadge.className = 'text-xs text-emerald-400 font-mono shrink-0';
        durBadge.textContent = `${edit.duration}s · ${edit.aspect}`;
        cardHead.appendChild(cardTitle);
        cardHead.appendChild(durBadge);
        card.appendChild(cardHead);

        if (edit.pins?.length) {
            const pins = document.createElement('p');
            pins.className = 'text-xs text-zinc-500 mb-2';
            pins.textContent = edit.pins.join(' → ');
            card.appendChild(pins);
        }

        const order = document.createElement('p');
        order.className = 'text-sm text-zinc-400 font-mono mb-3 break-all';
        order.textContent = (edit.shots || [])
            .map(s => `${s.id}@${s.pin}`)
            .join(' → ') || (edit.variants ? `${edit.variants.length} variants` : '');
        card.appendChild(order);

        const actions = document.createElement('div');
        actions.className = 'flex flex-wrap gap-2';

        const openBtn = document.createElement('a');
        openBtn.href = buildVideoEditorUrl(edit.id);
        openBtn.target = '_blank';
        openBtn.rel = 'noopener noreferrer';
        openBtn.className = 'px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-sm font-semibold hover:brightness-110';
        openBtn.textContent = 'Open in editor';

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'px-4 py-2 bg-zinc-700 rounded-xl text-sm hover:bg-zinc-600';
        copyBtn.textContent = 'Copy timeline';
        copyBtn.onclick = () => copyEditTimeline(edit.id);

        const syncBtn = document.createElement('button');
        syncBtn.type = 'button';
        syncBtn.className = 'px-4 py-2 bg-zinc-700 rounded-xl text-sm hover:bg-zinc-600';
        syncBtn.textContent = 'TTMIK Sync';
        syncBtn.onclick = () => {
            if (!edit.ttmikSync) {
                switchTab(3);
                return;
            }
            const { pin, episode, reel } = edit.ttmikSync;
            setWebdramaSyncValues(pin, episode, reel);
            applyTtmikSync();
            switchTab(3);
        };

        actions.appendChild(openBtn);
        actions.appendChild(copyBtn);
        if (edit.ttmikSync) actions.appendChild(syncBtn);
        card.appendChild(actions);

        if (edit.variants?.length) {
            const varList = document.createElement('ul');
            varList.className = 'mt-3 text-xs text-zinc-500 space-y-1';
            edit.variants.forEach(v => {
                const li = document.createElement('li');
                li.textContent = `· ${v.label}`;
                varList.appendChild(li);
            });
            card.appendChild(varList);
        }

        grid.appendChild(card);
    });

    panel.appendChild(grid);

    const tools = document.createElement('div');
    tools.className = 'mt-6 flex flex-wrap gap-3';
    Object.entries(VIDEO_EDITOR_ENTRIES).forEach(([key, entry]) => {
        if (key === 'launcher') return;
        const a = document.createElement('a');
        a.href = `${getVideoEditorBase()}/${entry.path}?project=melbourne-lantern`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'px-4 py-2 bg-zinc-800 rounded-xl text-sm text-zinc-300 hover:bg-zinc-700';
        a.textContent = entry.label;
        tools.appendChild(a);
    });
    panel.appendChild(tools);
}