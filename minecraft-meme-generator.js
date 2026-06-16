/**
 * Minecraft Wiki meme generator UI — Journey tab panel
 * Hipposgrumm parody articles · Melbourne Bardic humor lane
 */

let minecraftMemeState = {
    templateId: 'lantern-block',
    title: '',
    lore: '',
    english: '',
    korean: '',
    identifier: '',
    showRemoved: null,
    lastArticle: null
};

function resetMinecraftMemeForm(templateId) {
    const t = getMinecraftMemeTemplate(templateId || minecraftMemeState.templateId);
    minecraftMemeState = {
        templateId: t.id,
        title: t.title,
        lore: t.lore,
        english: t.english,
        korean: t.korean,
        identifier: t.identifier,
        showRemoved: t.removed || false,
        lastArticle: null
    };
}

function renderMinecraftMemeGeneratorPanel() {
    const panel = document.getElementById('minecraft-meme-generator-panel');
    if (!panel || typeof MINECRAFT_MEME_TEMPLATES === 'undefined') return;
    if (!minecraftMemeState.title) {
        resetMinecraftMemeForm(minecraftMemeState.templateId || 'lantern-block');
    }
    panel.textContent = '';

    const header = document.createElement('div');
    header.className = 'flex flex-wrap items-start justify-between gap-4 mb-6';
    const titleBlock = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold text-lime-200';
    h3.textContent = 'Minecraft Wiki Meme Generator';
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm mt-1';
    meta.textContent = 'Hipposgrumm parody articles · humor alchemy · observe wiki memes without absorbing';
    titleBlock.appendChild(h3);
    titleBlock.appendChild(meta);

    const wikiLink = document.createElement('a');
    wikiLink.href = MINECRAFT_MEME_HUB;
    wikiLink.target = '_blank';
    wikiLink.rel = 'noopener noreferrer';
    wikiLink.className = 'bg-lime-500/20 text-lime-300 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-lime-500/30';
    wikiLink.textContent = 'minecraft.wiki memes';

    header.appendChild(titleBlock);
    header.appendChild(wikiLink);
    panel.appendChild(header);

    const layout = document.createElement('div');
    layout.className = 'grid grid-cols-1 xl:grid-cols-2 gap-6';

    const formCol = document.createElement('div');
    formCol.className = 'space-y-4';

    const templateLabel = document.createElement('label');
    templateLabel.className = 'block';
    const templateLbl = document.createElement('span');
    templateLbl.className = 'text-xs uppercase tracking-widest text-zinc-500 block mb-2';
    templateLbl.textContent = 'Meme template';
    const templateSelect = document.createElement('select');
    templateSelect.className = 'w-full bg-zinc-800 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-500';
    MINECRAFT_MEME_VERSION_GROUPS.forEach(group => {
        const og = document.createElement('optgroup');
        og.label = `${group.version} · ${group.label}`;
        MINECRAFT_MEME_TEMPLATES
            .filter(t => t.version === group.version)
            .forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.textContent = t.title + (t.melbourne ? ' · Melbourne' : '');
                if (t.id === minecraftMemeState.templateId) opt.selected = true;
                og.appendChild(opt);
            });
        templateSelect.appendChild(og);
    });
    templateSelect.onchange = () => {
        resetMinecraftMemeForm(templateSelect.value);
        renderMinecraftMemeGeneratorPanel();
    };
    templateLabel.appendChild(templateLbl);
    templateLabel.appendChild(templateSelect);
    formCol.appendChild(templateLabel);

    const fields = [
        { key: 'title', label: 'Article title', placeholder: 'Lantern Block' },
        { key: 'identifier', label: 'Identifier', placeholder: 'lantern_block' },
        { key: 'lore', label: 'Usage / lore', placeholder: 'Emits light from flame…', multiline: true },
        { key: 'english', label: 'English shadow line', placeholder: 'I create from flame…' },
        { key: 'korean', label: 'Korean TTMIK line', placeholder: '유머로 풀어낼게요…' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.className = 'block';
        const lbl = document.createElement('span');
        lbl.className = 'text-xs uppercase tracking-widest text-zinc-500 block mb-2';
        lbl.textContent = field.label;
        let input;
        if (field.multiline) {
            input = document.createElement('textarea');
            input.rows = 3;
        } else {
            input = document.createElement('input');
            input.type = 'text';
        }
        input.className = 'w-full bg-zinc-800 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-500';
        input.placeholder = field.placeholder;
        input.value = minecraftMemeState[field.key] || '';
        input.oninput = () => {
            minecraftMemeState[field.key] = input.value;
        };
        label.appendChild(lbl);
        label.appendChild(input);
        formCol.appendChild(label);
    });

    const removedRow = document.createElement('label');
    removedRow.className = 'flex items-center gap-3 text-sm text-zinc-400';
    const removedCheck = document.createElement('input');
    removedCheck.type = 'checkbox';
    removedCheck.className = 'rounded bg-zinc-800 border-zinc-600 text-lime-500 focus:ring-lime-500';
    removedCheck.checked = !!minecraftMemeState.showRemoved;
    removedCheck.onchange = () => {
        minecraftMemeState.showRemoved = removedCheck.checked;
    };
    removedRow.appendChild(removedCheck);
    removedRow.appendChild(document.createTextNode('Show "removed from game" banner (Hipposgrumm style)'));
    formCol.appendChild(removedRow);

    const actions = document.createElement('div');
    actions.className = 'flex flex-wrap gap-3 pt-2';
    const generateBtn = document.createElement('button');
    generateBtn.type = 'button';
    generateBtn.className = 'px-5 py-3 bg-lime-600 hover:bg-lime-500 text-white rounded-2xl text-sm font-medium';
    generateBtn.textContent = 'Generate wiki article';
    generateBtn.onclick = () => {
        minecraftMemeState.lastArticle = buildMinecraftMemeArticle({
            templateId: minecraftMemeState.templateId,
            title: minecraftMemeState.title,
            lore: minecraftMemeState.lore,
            english: minecraftMemeState.english,
            korean: minecraftMemeState.korean,
            identifier: minecraftMemeState.identifier,
            showRemoved: minecraftMemeState.showRemoved
        });
        renderMinecraftMemeGeneratorPanel();
        if (typeof completeQuestObjective === 'function') {
            completeQuestObjective('side-humor');
        }
    };
    actions.appendChild(generateBtn);

    const randomBtn = document.createElement('button');
    randomBtn.type = 'button';
    randomBtn.className = 'px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-sm font-medium';
    randomBtn.textContent = 'Random template';
    randomBtn.onclick = () => {
        const pick = MINECRAFT_MEME_TEMPLATES[Math.floor(Math.random() * MINECRAFT_MEME_TEMPLATES.length)];
        resetMinecraftMemeForm(pick.id);
        renderMinecraftMemeGeneratorPanel();
    };
    actions.appendChild(randomBtn);

    const syncWikiBtn = document.createElement('button');
    syncWikiBtn.type = 'button';
    syncWikiBtn.className = 'px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-sm font-medium';
    syncWikiBtn.textContent = 'Fetch wiki navbox';
    syncWikiBtn.title = 'Pull live Template:User-Hipposgrumm/Memes/content wikitext';
    syncWikiBtn.onclick = async () => {
        syncWikiBtn.disabled = true;
        syncWikiBtn.textContent = 'Fetching…';
        try {
            const wikitext = await fetchMinecraftWikiMemeNavbox();
            minecraftMemeState.lastArticle = {
                title: 'Hipposgrumm Memes Navbox',
                markdown: '```wikitext\n' + wikitext.slice(0, 4000) + (wikitext.length > 4000 ? '\n…' : '') + '\n```',
                english: 'Wiki synced.',
                korean: '위키 동기화했어요.',
                spriteUrl: minecraftWikiImageUrl('BlockSprite_grass-block.png'),
                wikiUrl: MINECRAFT_MEME_HUB
            };
            renderMinecraftMemeGeneratorPanel();
        } catch (err) {
            alert('Wiki fetch failed — use curated templates offline. ' + (err.message || err));
        } finally {
            syncWikiBtn.disabled = false;
            syncWikiBtn.textContent = 'Fetch wiki navbox';
        }
    };
    actions.appendChild(syncWikiBtn);

    formCol.appendChild(actions);

    const deck = document.createElement('div');
    deck.className = 'mt-4 p-4 bg-zinc-800/40 rounded-2xl ring-1 ring-lime-500/10';
    const deckTitle = document.createElement('p');
    deckTitle.className = 'text-xs uppercase tracking-widest text-lime-500/80 mb-3';
    deckTitle.textContent = 'Bardic meme deck';
    deck.appendChild(deckTitle);
    MINECRAFT_MEME_BARDIC_DECK.forEach(line => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'block w-full text-left text-sm text-zinc-300 hover:text-lime-200 py-1.5 transition';
        btn.textContent = `${line.en} · ${line.ko}`;
        btn.onclick = () => {
            resetMinecraftMemeForm(line.templateId);
            minecraftMemeState.english = line.en;
            minecraftMemeState.korean = line.ko;
            renderMinecraftMemeGeneratorPanel();
        };
        deck.appendChild(btn);
    });
    formCol.appendChild(deck);

    layout.appendChild(formCol);

    const previewCol = document.createElement('div');
    previewCol.className = 'bg-zinc-800/50 rounded-2xl p-5 ring-1 ring-lime-500/20 min-h-[320px]';

    if (!minecraftMemeState.lastArticle) {
        const t = getMinecraftMemeTemplate(minecraftMemeState.templateId);
        const placeholder = document.createElement('div');
        placeholder.className = 'text-center text-zinc-500 py-12';
        const img = document.createElement('img');
        img.src = minecraftWikiImageUrl(t.sprite);
        img.alt = t.title;
        img.className = 'w-16 h-16 mx-auto mb-4 pixelated';
        img.style.imageRendering = 'pixelated';
        const p = document.createElement('p');
        p.className = 'text-sm';
        p.textContent = `Select ${t.title} · generate a parody wiki article`;
        placeholder.appendChild(img);
        placeholder.appendChild(p);
        previewCol.appendChild(placeholder);
    } else {
        const article = minecraftMemeState.lastArticle;
        const previewHead = document.createElement('div');
        previewHead.className = 'flex items-start gap-4 mb-4';
        const sprite = document.createElement('img');
        sprite.src = article.spriteUrl;
        sprite.alt = article.title;
        sprite.className = 'w-12 h-12 shrink-0';
        sprite.style.imageRendering = 'pixelated';
        const headText = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.className = 'font-semibold text-lg text-lime-100';
        h4.textContent = article.title;
        const idLine = document.createElement('p');
        idLine.className = 'text-xs text-zinc-500 font-mono';
        idLine.textContent = article.identifier;
        headText.appendChild(h4);
        headText.appendChild(idLine);
        previewHead.appendChild(sprite);
        previewHead.appendChild(headText);
        previewCol.appendChild(previewHead);

        const shadow = document.createElement('div');
        shadow.className = 'mb-4 p-3 bg-zinc-900/80 rounded-xl text-sm';
        shadow.innerHTML = `<p class="text-zinc-300">${article.english}</p><p class="text-lime-300/90 mt-1">${article.korean}</p>`;
        previewCol.appendChild(shadow);

        const pre = document.createElement('pre');
        pre.className = 'text-xs text-zinc-400 whitespace-pre-wrap max-h-64 overflow-y-auto font-mono leading-relaxed';
        pre.textContent = article.markdown;
        previewCol.appendChild(pre);

        const exportRow = document.createElement('div');
        exportRow.className = 'flex flex-wrap gap-2 mt-4';
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl text-xs font-medium';
        copyBtn.textContent = 'Copy markdown';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(article.markdown).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = 'Copy markdown'; }, 1500);
            }).catch(() => alert('Copy failed'));
        };
        exportRow.appendChild(copyBtn);

        const tweetBtn = document.createElement('button');
        tweetBtn.type = 'button';
        tweetBtn.className = 'px-4 py-2 bg-sky-900/50 hover:bg-sky-800/60 text-sky-200 rounded-xl text-xs font-medium';
        tweetBtn.textContent = 'Post meme';
        tweetBtn.onclick = () => {
            const text = buildMinecraftMemeTweetText(article);
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
        };
        exportRow.appendChild(tweetBtn);

        const srcLink = document.createElement('a');
        srcLink.href = article.wikiUrl;
        srcLink.target = '_blank';
        srcLink.rel = 'noopener noreferrer';
        srcLink.className = 'px-4 py-2 bg-lime-900/40 hover:bg-lime-800/50 text-lime-200 rounded-xl text-xs font-medium';
        srcLink.textContent = 'Wiki source';
        exportRow.appendChild(srcLink);

        previewCol.appendChild(exportRow);
    }

    layout.appendChild(previewCol);
    panel.appendChild(layout);
}

function openMinecraftMemeGenerator(opts = {}) {
    if (opts.templateId) {
        resetMinecraftMemeForm(opts.templateId);
    } else if (!minecraftMemeState.title) {
        resetMinecraftMemeForm('lantern-block');
    }
    if (typeof setWebdramaSyncValues === 'function') {
        setWebdramaSyncValues('CRAFT', '7.3', null);
        if (typeof renderSyncPanel === 'function') renderSyncPanel();
    }
    switchTab(4);
    renderMinecraftMemeGeneratorPanel();
    if (opts.logQuest !== false && typeof completeQuestObjective === 'function') {
        completeQuestObjective('side-humor');
    }
}