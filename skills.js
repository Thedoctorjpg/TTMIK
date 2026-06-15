/**
 * Skills tab — archetype gallery, quest tracker, practice integration
 */

let selectedSkillId = null;

function getActiveSkill() {
    return appState?.activeSkillId ? getSkillById(appState.activeSkillId) : null;
}

function getSkillShadowingPhrases() {
    const skill = getActiveSkill();
    if (!skill?.shadowingPhrases?.length) return [];
    return skill.shadowingPhrases.filter(p => p.ko);
}

function setActiveSkill(skillId) {
    if (!skillId || !getSkillById(skillId)) {
        appState.activeSkillId = null;
    } else {
        appState.activeSkillId = skillId;
    }
    persistState();
    renderSkillsUI();
    const hint = document.getElementById('shadowing-hint');
    if (hint && getActiveSkill()) {
        hint.textContent = `Active skill: ${getActiveSkill().name}`;
        hint.classList.remove('hidden');
    }
}

function toggleQuestObjective(objectiveId) {
    if (!appState.questProgress) appState.questProgress = {};
    appState.questProgress[objectiveId] = !appState.questProgress[objectiveId];
    persistState();
    renderQuestPanel();
    updateProgressUI();
}

function isQuestObjectiveDone(objectiveId) {
    return Boolean(appState.questProgress?.[objectiveId]);
}

function getQuestCompletionCount() {
    return MELBOURNE_QUEST.objectives.filter(o => isQuestObjectiveDone(o.id)).length;
}

function saveSkillNote(skillId, text) {
    if (!appState.skillNotes) appState.skillNotes = {};
    appState.skillNotes[skillId] = sanitizeLessonText(text, 5000);
    persistState();
}

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
    }
}

function selectSkill(skillId) {
    selectedSkillId = skillId;
    renderSkillsUI();
}

function startSkillPractice(skillId) {
    setActiveSkill(skillId);
    resetShadowing();
    switchTab(2);
}

function openSkillLessons(skillId) {
    const skill = getSkillById(skillId);
    if (!skill) return;

    if (skill.linkedGroups?.includes('melbourne')) {
        activeLibraryGroup = 'Melbourne Journey';
    } else if (skill.linkedGroups?.includes('sovereign')) {
        activeLibraryGroup = 'Sovereign Guide';
    }

    if (skill.linkedCategories?.length) {
        activeCategory = skill.linkedCategories[0];
    } else {
        activeCategory = 'All';
    }

    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function renderQuestPanel() {
    const panel = document.getElementById('quest-panel');
    if (!panel) return;
    panel.textContent = '';

    const done = getQuestCompletionCount();
    const total = MELBOURNE_QUEST.objectives.length;

    const header = document.createElement('div');
    header.className = 'flex flex-wrap items-start justify-between gap-4 mb-6';
    const titleBlock = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold';
    h3.textContent = MELBOURNE_QUEST.name;
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm mt-1';
    meta.textContent = `${MELBOURNE_QUEST.dates} · ${MELBOURNE_QUEST.location}`;
    titleBlock.appendChild(h3);
    titleBlock.appendChild(meta);

    const badge = document.createElement('div');
    badge.className = 'bg-pink-500/20 text-pink-300 px-4 py-2 rounded-2xl text-sm font-medium';
    badge.textContent = `${done} / ${total} objectives`;

    header.appendChild(titleBlock);
    header.appendChild(badge);
    panel.appendChild(header);

    const phrase = document.createElement('p');
    phrase.className = 'text-sm text-zinc-400 italic mb-6 border-l-2 border-pink-500 pl-4';
    phrase.textContent = MELBOURNE_QUEST.activationPhrase;
    panel.appendChild(phrase);

    const list = document.createElement('div');
    list.className = 'space-y-2';
    MELBOURNE_QUEST.objectives.forEach(obj => {
        const row = document.createElement('label');
        row.className = 'flex items-start gap-3 p-3 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 cursor-pointer transition';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'mt-1 accent-pink-500';
        cb.checked = isQuestObjectiveDone(obj.id);
        cb.onchange = () => toggleQuestObjective(obj.id);
        const text = document.createElement('span');
        text.className = 'text-sm flex-1';
        const typeLabel = obj.type === 'main' ? 'Main' : 'Side';
        text.textContent = `[${typeLabel}] ${obj.text}`;
        if (cb.checked) text.classList.add('line-through', 'text-zinc-500');
        row.appendChild(cb);
        row.appendChild(text);
        list.appendChild(row);
    });
    panel.appendChild(list);

    if (done === total) {
        const win = document.createElement('p');
        win.className = 'mt-4 text-emerald-400 text-sm font-medium';
        win.textContent = `Hidden objective: ${MELBOURNE_QUEST.hiddenObjective}`;
        panel.appendChild(win);
    }
}

function renderSkillsGrid() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.textContent = '';

    SKILLS.forEach(skill => {
        const active = appState.activeSkillId === skill.id;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = active
            ? 'text-left bg-zinc-900 rounded-3xl p-6 ring-2 ring-pink-500 hover:ring-pink-400 transition'
            : 'text-left bg-zinc-900 rounded-3xl p-6 hover:ring-2 hover:ring-pink-500/50 transition';

        const icon = document.createElement('div');
        icon.className = 'text-4xl mb-3';
        icon.textContent = skill.icon;

        const name = document.createElement('h4');
        name.className = 'font-semibold text-lg';
        name.textContent = skill.name;

        const tag = document.createElement('p');
        tag.className = 'text-xs text-zinc-500 mt-1';
        tag.textContent = skill.tagline;

        if (active) {
            const pill = document.createElement('span');
            pill.className = 'inline-block mt-3 text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full';
            pill.textContent = 'Active';
            card.appendChild(icon);
            card.appendChild(name);
            card.appendChild(tag);
            card.appendChild(pill);
        } else {
            card.appendChild(icon);
            card.appendChild(name);
            card.appendChild(tag);
        }

        card.onclick = () => selectSkill(skill.id);
        grid.appendChild(card);
    });
}

function renderSkillDetail() {
    const panel = document.getElementById('skill-detail');
    if (!panel) return;

    if (!selectedSkillId) {
        panel.classList.remove('hidden');
        panel.textContent = '';
        const empty = document.createElement('p');
        empty.className = 'text-zinc-500 text-sm leading-relaxed';
        empty.textContent = 'Select an archetype skill to view activation phrases, integration rituals, creative prompts, and linked Korean lessons.';
        panel.appendChild(empty);
        return;
    }

    const skill = getSkillById(selectedSkillId);
    if (!skill) {
        panel.classList.add('hidden');
        return;
    }

    panel.classList.remove('hidden');
    panel.textContent = '';

    const header = document.createElement('div');
    header.className = 'flex items-start gap-4 mb-6';
    const iconEl = document.createElement('span');
    iconEl.className = 'text-5xl';
    iconEl.textContent = skill.icon;
    const headText = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold';
    h3.textContent = skill.name;
    const role = document.createElement('p');
    role.className = 'text-zinc-400 text-sm mt-1';
    role.textContent = skill.role;
    headText.appendChild(h3);
    headText.appendChild(role);
    header.appendChild(iconEl);
    header.appendChild(headText);
    panel.appendChild(header);

    appendSection(panel, 'Activation', skill.activationPhrases, true);
    appendSection(panel, 'Capabilities', skill.capabilities);
    appendSection(panel, 'Creative prompts', skill.creativePrompts);

    if (skill.ritualSteps?.length) {
        const ritual = document.createElement('div');
        ritual.className = 'mb-6';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-3';
        label.textContent = 'Integration ritual';
        ritual.appendChild(label);
        const ol = document.createElement('ol');
        ol.className = 'list-decimal list-inside space-y-2 text-sm text-zinc-300';
        skill.ritualSteps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            ol.appendChild(li);
        });
        ritual.appendChild(ol);
        panel.appendChild(ritual);
    }

    const notesLabel = document.createElement('h4');
    notesLabel.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-2';
    notesLabel.textContent = 'Your creative notes';
    panel.appendChild(notesLabel);

    const notes = document.createElement('textarea');
    notes.rows = 4;
    notes.className = 'w-full bg-zinc-800 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-pink-500 mb-4';
    notes.placeholder = 'Skits, rituals, ideas for this skill...';
    notes.value = appState.skillNotes?.[skill.id] || '';
    notes.oninput = () => saveSkillNote(skill.id, notes.value);
    panel.appendChild(notes);

    const actions = document.createElement('div');
    actions.className = 'flex flex-wrap gap-3';

    const practiceBtn = document.createElement('button');
    practiceBtn.className = 'px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl text-sm font-semibold hover:brightness-110';
    practiceBtn.textContent = 'Practice shadowing';
    practiceBtn.onclick = () => startSkillPractice(skill.id);

    const lessonsBtn = document.createElement('button');
    lessonsBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
    lessonsBtn.textContent = 'Open linked lessons';
    lessonsBtn.onclick = () => openSkillLessons(skill.id);

    const activateBtn = document.createElement('button');
    activateBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
    activateBtn.textContent = appState.activeSkillId === skill.id ? 'Clear active skill' : 'Set active skill';
    activateBtn.onclick = () => {
        setActiveSkill(appState.activeSkillId === skill.id ? null : skill.id);
        renderSkillDetail();
    };

    if (skill.activationPhrases[0]) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
        copyBtn.textContent = 'Copy activation phrase';
        copyBtn.onclick = () => {
            copyToClipboard(skill.activationPhrases[0]);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy activation phrase'; }, 1500);
        };
        actions.appendChild(copyBtn);
    }

    actions.appendChild(practiceBtn);
    actions.appendChild(lessonsBtn);
    actions.appendChild(activateBtn);
    panel.appendChild(actions);

    const source = document.createElement('p');
    source.className = 'mt-6 text-xs text-zinc-600';
    source.textContent = `Source: ${skill.source}`;
    panel.appendChild(source);
}

function appendSection(parent, title, items, copyFirst) {
    if (!items?.length) return;
    const block = document.createElement('div');
    block.className = 'mb-6';
    const label = document.createElement('h4');
    label.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-3';
    label.textContent = title;
    block.appendChild(label);
    const ul = document.createElement('ul');
    ul.className = 'space-y-2 text-sm text-zinc-300';
    items.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2';
        const bullet = document.createElement('span');
        bullet.className = 'text-pink-400 mt-0.5';
        bullet.textContent = '\u2022';
        const text = document.createElement('span');
        text.className = 'flex-1';
        text.textContent = item;
        li.appendChild(bullet);
        li.appendChild(text);
        if (copyFirst && i === 0) {
            const copy = document.createElement('button');
            copy.className = 'text-xs text-pink-400 hover:text-pink-300 shrink-0';
            copy.textContent = 'Copy';
            copy.onclick = () => copyToClipboard(item);
            li.appendChild(copy);
        }
        ul.appendChild(li);
    });
    block.appendChild(ul);
    parent.appendChild(block);
}

function renderSkillsUI() {
    renderQuestPanel();
    renderSkillsGrid();
    renderSkillDetail();
}