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

function completeQuestObjective(objectiveId) {
    if (!appState.questProgress) appState.questProgress = {};
    if (isQuestObjectiveDone(objectiveId)) return false;
    appState.questProgress[objectiveId] = true;
    persistState();
    renderQuestPanel();
    updateProgressUI();
    return true;
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

function openLessonsForCategories(categories, preferMelbourne = true) {
    const cats = Array.isArray(categories) ? categories.filter(Boolean) : [];
    const ignanCats = typeof IGNAN_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => IGNAN_LIBRARY_CATEGORIES.includes(c))
        : [];
    const asukaCats = typeof ASUKA_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => ASUKA_LIBRARY_CATEGORIES.includes(c))
        : [];
    const heidiCats = typeof HEIDI_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => HEIDI_LIBRARY_CATEGORIES.includes(c))
        : [];
    const healCats = typeof HEALING_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => HEALING_LIBRARY_CATEGORIES.includes(c))
        : [];
    const mexicoCats = typeof MEXICO_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => MEXICO_LIBRARY_CATEGORIES.includes(c))
        : [];
    const canadaCats = typeof CANADA_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => CANADA_LIBRARY_CATEGORIES.includes(c))
        : [];
    const usaCats = typeof USA_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => USA_LIBRARY_CATEGORIES.includes(c))
        : [];
    if (mexicoCats.length) {
        activeLibraryGroup = 'Mexico Library';
        activeCategory = mexicoCats[0];
    } else if (canadaCats.length) {
        activeLibraryGroup = 'Canada Library';
        activeCategory = canadaCats[0];
    } else if (usaCats.length) {
        activeLibraryGroup = 'USA Library';
        activeCategory = usaCats[0];
    } else if (healCats.length) {
        activeLibraryGroup = 'Healing Factors Library';
        activeCategory = healCats[0];
    } else if (ignanCats.length) {
        activeLibraryGroup = 'Ignan Library';
        activeCategory = ignanCats[0];
    } else if (asukaCats.length) {
        activeLibraryGroup = 'Asuka Library';
        activeCategory = asukaCats[0];
    } else if (heidiCats.length) {
        activeLibraryGroup = 'Heidi Library';
        activeCategory = heidiCats[0];
    } else if (preferMelbourne) {
        activeLibraryGroup = 'Melbourne Journey';
        activeCategory = cats.length ? cats[0] : 'All';
    } else {
        activeLibraryGroup = 'Sovereign Guide';
        activeCategory = cats.length ? cats[0] : 'All';
    }
    renderLibraryGroupFilters();
    renderCategoryFilters();
    renderLessons();
    switchTab(1);
}

function openSkillLessons(skillId) {
    const skill = getSkillById(skillId);
    if (!skill) return;

    const hasIgnan = skill.linkedGroups?.includes('ignan');
    const hasAsuka = skill.linkedGroups?.includes('asuka');
    const hasHeidi = skill.linkedGroups?.includes('heidi');
    const hasMexico = skill.linkedGroups?.includes('mexico');
    const hasCanada = skill.linkedGroups?.includes('canada');
    const hasUsa = skill.linkedGroups?.includes('usa');
    const preferMelbourne = !hasIgnan && !hasAsuka && !hasHeidi && !hasMexico && !hasCanada && !hasUsa && (
        skill.linkedGroups?.includes('melbourne')
        || !(skill.linkedGroups?.includes('sovereign'))
    );
    if (hasIgnan || hasAsuka || hasHeidi || hasMexico || hasCanada || hasUsa) {
        openLessonsForCategories(skill.linkedCategories, false);
        return;
    }
    if (skill.linkedGroups?.includes('sovereign') && !skill.linkedGroups?.includes('melbourne')) {
        activeLibraryGroup = 'Sovereign Guide';
    } else if (skill.linkedGroups?.includes('melbourne')) {
        activeLibraryGroup = 'Melbourne Journey';
    }

    openLessonsForCategories(skill.linkedCategories, preferMelbourne);
}

function syncMatchesPreset(cfg, preset) {
    const epMatch = String(cfg.episode) === String(preset.episode);
    const reelMatch = (cfg.reel == null && preset.reel == null)
        || String(cfg.reel) === String(preset.reel);
    return cfg.pin === preset.pin && epMatch && reelMatch;
}

function sortSyncEpisodeKeys(keys) {
    return [...keys].sort((a, b) => {
        const na = parseFloat(a);
        const nb = parseFloat(b);
        if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
        return String(a).localeCompare(String(b), undefined, { numeric: true });
    });
}

function getResolvedSyncConfig() {
    if (!appState.webdramaSync) {
        appState.webdramaSync = { pin: 'HOSIER', episode: 2, reel: 'B' };
    }
    const { pin, episode, reel } = appState.webdramaSync;
    const pinCfg = getSyncPin(pin);
    const epCfg = getSyncEpisode(episode);
    const reelCfg = getSyncReel(reel);

    const skillId = pinCfg?.skillId || epCfg?.skillId || reelCfg?.skillId || 'melbourne-lantern-bard';
    const categories = [
        ...(pinCfg?.categories || []),
        ...(epCfg?.categories || []),
        ...(reelCfg?.categories || [])
    ].filter((c, i, arr) => arr.indexOf(c) === i);

    const questIds = [
        ...(pinCfg?.questIds || []),
        ...(epCfg?.questIds || []),
        ...(reelCfg?.questIds || [])
    ].filter((q, i, arr) => arr.indexOf(q) === i);

    const shadowIdx = epCfg?.shadowingIndex ?? 0;
    return { pin, episode, reel, pinCfg, epCfg, reelCfg, skillId, categories, questIds, shadowIdx };
}

function applyTtmikSync() {
    const cfg = getResolvedSyncConfig();
    setActiveSkill(cfg.skillId);
    selectedSkillId = cfg.skillId;
    persistState();
    renderSyncPanel();
    renderSkillsUI();
}

function openTtmikSyncLessons() {
    const cfg = getResolvedSyncConfig();
    applyTtmikSync();
    openLessonsForCategories(cfg.categories, true);
}

function practiceHealingFactor(factorId, opts = {}) {
    const deckEntry = typeof getHealingFactorById === 'function' ? getHealingFactorById(factorId) : null;
    const syncFactor = typeof HEALING_FACTORS !== 'undefined'
        ? HEALING_FACTORS.factors.find(f => f.id === factorId)
        : null;
    const factor = syncFactor || deckEntry;
    if (!factor) return false;

    if (factorId === 'post-dib') {
        practiceDibAftercare(opts);
        return true;
    }
    if (factorId === 'ignan-walk') {
        practiceIgnanHealingJourney(opts);
        return true;
    }
    if (factorId === 'fifa-celebrate') {
        practiceMariFifaCelebrate(opts);
        return true;
    }
    if (factorId === 'no-rewatch') {
        if (typeof startHealCategory === 'function') {
            startHealCategory('Daily Integration');
        }
        return true;
    }

    const skillId = factor.skillId || deckEntry?.skillId;
    if (!skillId) return false;

    if (factor.pin) {
        const episode = factorId === 'post-dib' ? '2.5' : (factor.pin === 'BOTANIC' ? '2.6' : factor.pin === 'CANTINA' ? '2.65' : null);
        if (episode) setWebdramaSyncValues(factor.pin, episode, null);
    } else if (factor.preset && typeof getSyncPreset === 'function' && getSyncPreset(factor.preset)) {
        const preset = getSyncPreset(factor.preset);
        setWebdramaSyncValues(preset.pin, preset.episode, preset.reel);
    }

    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    const shadowIdx = factor.shadowIndex ?? deckEntry?.shadowIndex ?? 0;
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(skillId);
    }

    if (opts.logQuest !== false && (factor.questId || deckEntry?.questId)) {
        completeQuestObjective(factor.questId || deckEntry.questId);
    }

    if (opts.openLibrary && typeof startHealCategory === 'function') {
        const cat = deckEntry?.subtitle || 'Post-DIB Landing';
        startHealCategory(cat);
        return true;
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
    return true;
}

function practiceDibAftercare(opts = {}) {
    const ritual = typeof getDibAftercareRitual === 'function' ? getDibAftercareRitual() : null;
    const epCfg = typeof getSyncEpisode === 'function' ? getSyncEpisode('2.5') : null;
    const healSkillId = ritual?.skillId || epCfg?.aftercare || 'helen-neighbor';
    const shadowIdx = ritual?.shadowIndex ?? epCfg?.aftercareShadowIndex ?? 2;

    setWebdramaSyncValues('HOTEL', '2.5', null);
    persistState();
    renderSyncPanel();

    setActiveSkill(healSkillId);
    selectedSkillId = healSkillId;

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(healSkillId);
    }

    if (opts.logQuest !== false) {
        completeQuestObjective(ritual?.questId || 'side-dib-heal');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceIgnanHealingJourney(opts = {}) {
    const epCfg = typeof getSyncEpisode === 'function' ? getSyncEpisode('2.6') : null;
    const skillId = epCfg?.skillId || 'ignan-pilgrim';
    const shadowIdx = epCfg?.shadowingIndex ?? 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(10)) {
        setWebdramaSyncValues('BOTANIC', '2.6', null);
    } else {
        setWebdramaSyncValues('BOTANIC', '2.6', null);
    }
    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(skillId);
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-ignan-heal');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function bootSkillById(skillId, opts = {}) {
    const skill = getSkillById(skillId);
    if (!skill) return false;

    const entry = typeof getSkillBootEntry === 'function' ? getSkillBootEntry(skillId) : null;

    if (entry?.invoke && typeof window[entry.invoke] === 'function') {
        window[entry.invoke]({ logQuest: opts.logQuest !== false });
        return true;
    }

    if (entry?.sync) {
        setWebdramaSyncValues(entry.sync.pin, entry.sync.episode, entry.sync.reel);
    } else if (entry?.preset && typeof getSyncPreset === 'function' && getSyncPreset(entry.preset)) {
        const preset = getSyncPreset(entry.preset);
        setWebdramaSyncValues(preset.pin, preset.episode, preset.reel);
    }

    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    const shadowIdx = entry?.shadowIndex ?? 0;
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    }

    if (opts.logQuest !== false && entry?.questId) {
        completeQuestObjective(entry.questId);
    }

    if (opts.lessons || opts.openLibrary) {
        if (entry?.libraryGroup === 'Healing Factors Library' && entry.libraryCategory) {
            startHealCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Mexico Library' && entry.libraryCategory) {
            startMexicoCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Canada Library' && entry.libraryCategory) {
            startCanadaCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'USA Library' && entry.libraryCategory) {
            startUsaCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Ignan Library' && entry.libraryCategory) {
            startIgnanCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Asuka Library' && entry.libraryCategory) {
            startAsukaCategory(entry.libraryCategory);
        } else {
            openSkillLessons(skillId);
        }
        return true;
    }

    if (opts.skillsTab) {
        switchTab(3);
        renderSkillDetail();
        renderSkillsGrid();
        return true;
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
    return true;
}

function practiceMariFifaCelebrate(opts = {}) {
    const epCfg = typeof getSyncEpisode === 'function' ? getSyncEpisode('2.65') : null;
    const skillId = epCfg?.skillId || 'ignan-pilgrim';
    const shadowIdx = epCfg?.shadowingIndex ?? 4;

    setWebdramaSyncValues('CANTINA', '2.65', null);
    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(skillId);
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-fifa-celebrate');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceAsukaMaybe(opts = {}) {
    const epCfg = typeof getSyncEpisode === 'function' ? getSyncEpisode(5) : null;
    const skillId = epCfg?.skillId || 'asuka-brisbane';
    const shadowIdx = epCfg?.shadowingIndex ?? 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(11)) {
        setWebdramaSyncValues('FED', 5, null);
    } else {
        setWebdramaSyncValues('FED', 5, null);
    }
    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(skillId);
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('main-others');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceHeidiWayfarer(opts = {}) {
    const skillId = 'heidi-alpine-wayfarer';
    const shadowIdx = 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(13)) {
        setWebdramaSyncValues('HOSIER', 6, null);
    } else {
        setWebdramaSyncValues('HOSIER', 6, null);
    }
    persistState();
    renderSyncPanel();

    setActiveSkill(skillId);
    selectedSkillId = skillId;

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(shadowIdx);
    } else {
        startSkillPractice(skillId);
    }

    if (opts.openSheet && typeof openFastCharacterHeidi === 'function') {
        openFastCharacterHeidi();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('main-film');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceTtmikSyncShadowing() {
    const cfg = getResolvedSyncConfig();
    applyTtmikSync();
    startSkillPractice(cfg.skillId);
}

function updateWebdramaSync(field, value) {
    if (!appState.webdramaSync) {
        appState.webdramaSync = { pin: 'HOSIER', episode: 2, reel: 'B' };
    }
    if (field === 'pin' && getSyncPin(value)) appState.webdramaSync.pin = value;
    if (field === 'episode') {
        const key = typeof resolveEpisodeKey === 'function' ? resolveEpisodeKey(value) : value;
        if (getSyncEpisode(key)) appState.webdramaSync.episode = key;
    }
    if (field === 'reel') {
        if (!value) appState.webdramaSync.reel = null;
        else if (getSyncReel(value)) appState.webdramaSync.reel = value;
    }
    persistState();
    renderSyncPanel();
}

function setWebdramaSyncValues(pin, episode, reel) {
    if (!appState.webdramaSync) {
        appState.webdramaSync = { pin: 'HOSIER', episode: 2, reel: 'B' };
    }
    if (getSyncPin(pin)) appState.webdramaSync.pin = pin;
    const ep = typeof resolveEpisodeKey === 'function' ? resolveEpisodeKey(episode) : episode;
    if (getSyncEpisode(ep)) appState.webdramaSync.episode = ep;
    if (reel == null) appState.webdramaSync.reel = null;
    else if (getSyncReel(reel)) appState.webdramaSync.reel = reel;
    persistState();
}

function applyTtmikSyncPreset(presetId, opts = {}) {
    const preset = getSyncPreset(presetId);
    if (!preset) return false;

    setWebdramaSyncValues(preset.pin, preset.episode, preset.reel);
    applyTtmikSync();

    if (opts.skillsTab !== false) switchTab(3);

    if (opts.shadow) practiceTtmikSyncShadowing();
    else if (opts.lessons) openTtmikSyncLessons();

    return true;
}

function applyTtmikSyncRouteStep(step) {
    if (step.presetId) {
        applyTtmikSyncPreset(step.presetId, { skillsTab: false });
        return;
    }
    if (step.sync) {
        const { pin, episode, reel } = step.sync;
        setWebdramaSyncValues(pin, episode, reel);
        applyTtmikSync();
    }
}

function bootAllLibrariesAndSkills(opts = {}) {
    if (opts.composeTab !== false) {
        switchTab(4);
        renderJourneyDashboard();
    }
    if (typeof renderBootAllPanel === 'function') {
        renderBootAllPanel();
    }
    const anchorId = opts.anchorSkill || 'melbourne-lantern-bard';
    if (opts.anchorSkill !== false && getSkillById(anchorId)) {
        bootSkillById(anchorId, { logQuest: opts.logQuest !== false, skillsTab: false });
        if (opts.composeTab !== false) switchTab(4);
    }
    return true;
}

function renderBootAllPanel() {
    const panel = document.getElementById('boot-all-panel');
    if (!panel || typeof getAllSkillBootIds !== 'function') return;
    panel.textContent = '';

    const header = document.createElement('div');
    header.className = 'mb-6';
    const h3 = document.createElement('h3');
    h3.className = 'text-xl font-semibold text-violet-200 mb-1';
    h3.textContent = 'Boot All — Skills · Libraries · Heal · FIFA 2026';
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm';
    const skillCount = getAllSkillBootIds().length;
    const libCount = typeof getAllLibraryBootEntries === 'function' ? getAllLibraryBootEntries().length : 0;
    const trackNote = typeof BOOT_ALL_INDEX !== 'undefined' ? ` · ${BOOT_ALL_INDEX.trackCount} library tracks` : '';
    meta.textContent = `${skillCount} archetype skills · ${libCount} composed libraries${trackNote} · TTMIK.html?boot=all`;
    header.appendChild(h3);
    header.appendChild(meta);
    panel.appendChild(header);

    const runAll = document.createElement('button');
    runAll.type = 'button';
    runAll.className = 'mb-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-500';
    runAll.textContent = 'Boot all (anchor Lantern Bard + compose index)';
    runAll.title = 'TTMIK.html?boot=all';
    runAll.onclick = () => bootAllLibrariesAndSkills();
    panel.appendChild(runAll);

    const appendSection = (title, items, onItem) => {
        const block = document.createElement('div');
        block.className = 'mb-6';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-3';
        label.textContent = title;
        block.appendChild(label);
        const grid = document.createElement('div');
        grid.className = 'flex flex-wrap gap-2';
        items.forEach((item) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition';
            btn.textContent = item.label;
            btn.title = item.url || item.boot || '';
            btn.onclick = () => onItem(item);
            grid.appendChild(btn);
        });
        block.appendChild(grid);
        panel.appendChild(block);
    };

    const skillItems = getAllSkillBootIds().map((id) => {
        const skill = getSkillById(id);
        const entry = getSkillBootEntry(id);
        return {
            id,
            label: skill?.name || id,
            url: typeof getSkillBootUrl === 'function' ? getSkillBootUrl(id) : `?skill=${id}`,
            source: entry?.source
        };
    });
    appendSection('Archetype skills (.skill.md)', skillItems, (item) => bootSkillById(item.id));

    if (typeof getAllLibraryBootEntries === 'function') {
        const libItems = getAllLibraryBootEntries().map((lib) => ({
            id: lib.id,
            label: lib.label,
            boot: lib.boot
        }));
        appendSection('Composed libraries', libItems, (item) => openComposedLibrary(item.id));
    }

    if (typeof BOOT_ALL_HEAL_STEPS !== 'undefined') {
        appendSection('Heal lane steps', BOOT_ALL_HEAL_STEPS.map((s) => ({
            id: s.id,
            label: s.label,
            boot: s.boot
        })), (item) => {
            const params = new URLSearchParams(item.boot);
            const boot = Object.fromEntries(params);
            if (boot.heal === '1') practiceDibAftercare();
            else if (boot.asuka === '1') practiceAsukaMaybe();
            else if (boot.heidi === '1') practiceHeidiWayfarer({ openSheet: boot.sheet === '1' });
            else if (boot.ignan === '1') practiceIgnanHealingJourney();
            else if (boot.fifa === '1') practiceMariFifaCelebrate();
        });
    }

    if (typeof HEALING_FACTORS !== 'undefined' && HEALING_FACTORS.factors) {
        appendSection('Healing factors', HEALING_FACTORS.factors.map((f) => ({
            id: f.id,
            label: f.label,
            boot: `heal-factor=${f.id}`
        })), (item) => practiceHealingFactor(item.id));
    }
}

function handleTtmikSyncBoot() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('boot') === 'all') {
        bootAllLibrariesAndSkills({
            anchorSkill: params.get('anchor') || 'melbourne-lantern-bard',
            logQuest: params.get('quest') !== '0'
        });
        return;
    }
    const skillParam = params.get('skill');
    if (skillParam && getSkillById(skillParam)) {
        bootSkillById(skillParam, {
            lessons: params.get('lessons') === '1',
            skillsTab: params.get('tab') === 'skills',
            logQuest: params.get('quest') !== '0'
        });
        return;
    }
    if (params.get('fifa') === '1' || params.get('mari') === 'fifa' || params.get('step') === '7') {
        practiceMariFifaCelebrate();
        return;
    }
    if (params.get('asuka') === '1' || params.get('step') === '5') {
        practiceAsukaMaybe();
        return;
    }
    if (params.get('heidi') === '1') {
        practiceHeidiWayfarer({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('ignan') === '1' || params.get('step') === '6') {
        practiceIgnanHealingJourney();
        return;
    }
    const healFactor = params.get('heal-factor');
    if (healFactor) {
        practiceHealingFactor(healFactor, {
            logQuest: params.get('quest') !== '0',
            openLibrary: params.get('lessons') === '1'
        });
        return;
    }
    if (params.get('heal') === '1' || params.get('dib-aftercare') === '1' || params.get('step') === '4') {
        practiceDibAftercare();
        return;
    }
    const presetId = parseInt(params.get('preset'), 10);

    if (presetId && getSyncPreset(presetId)) {
        const preset = getSyncPreset(presetId);
        const shadowParam = params.get('shadow');
        const shadow = shadowParam === '1'
            || (shadowParam !== '0' && preset.autoShadow);
        applyTtmikSyncPreset(presetId, {
            shadow,
            lessons: params.get('lessons') === '1'
        });
        return;
    }

    const pin = params.get('pin');
    const episode = params.get('episode');
    const reel = params.get('reel');
    if (!pin && !episode && !reel) return;

    if (!appState.webdramaSync) {
        appState.webdramaSync = { pin: 'HOSIER', episode: 2, reel: 'B' };
    }
    if (pin && getSyncPin(pin.toUpperCase())) appState.webdramaSync.pin = pin.toUpperCase();
    if (episode) {
        const key = typeof resolveEpisodeKey === 'function' ? resolveEpisodeKey(episode) : episode;
        if (getSyncEpisode(key)) appState.webdramaSync.episode = key;
    }
    if (reel && getSyncReel(reel.toUpperCase())) appState.webdramaSync.reel = reel.toUpperCase();
    persistState();
    applyTtmikSync();
    switchTab(3);

    if (params.get('shadow') === '1') practiceTtmikSyncShadowing();
    else if (params.get('lessons') === '1') openTtmikSyncLessons();
}

function renderSyncPanel() {
    const panel = document.getElementById('ttmik-sync-panel');
    if (!panel || typeof TTMIK_SYNC_PINS === 'undefined') return;
    panel.textContent = '';

    const cfg = getResolvedSyncConfig();
    const phrase = getShadowingPhraseForSkill(cfg.skillId, cfg.shadowIdx);
    const skill = getSkillById(cfg.skillId);

    const header = document.createElement('div');
    header.className = 'flex flex-wrap items-start justify-between gap-4 mb-6';
    const titleBlock = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold';
    h3.textContent = 'TTMIK Sync';
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm mt-1';
    meta.textContent = 'Webdrama pins · episodes · reels → skills & Melbourne audio';
    titleBlock.appendChild(h3);
    titleBlock.appendChild(meta);

    const badge = document.createElement('div');
    badge.className = 'bg-violet-500/20 text-violet-300 px-4 py-2 rounded-2xl text-sm font-medium';
    badge.textContent = skill ? skill.name : 'Melbourne Lantern Bard';

    header.appendChild(titleBlock);
    header.appendChild(badge);
    panel.appendChild(header);

    if (typeof TTMIK_SYNC_PRESETS !== 'undefined' && TTMIK_SYNC_PRESETS.length) {
        const presetsWrap = document.createElement('div');
        presetsWrap.className = 'mb-6';

        const presetsLabel = document.createElement('p');
        presetsLabel.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-3';
        presetsLabel.textContent = 'On-set presets (1–12)';
        presetsWrap.appendChild(presetsLabel);

        const presetsRow = document.createElement('div');
        presetsRow.className = 'flex flex-wrap gap-2';

        TTMIK_SYNC_PRESETS.forEach(preset => {
            const active = syncMatchesPreset(cfg, preset);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.title = `${preset.label} — ${preset.note}`;
            btn.className = active
                ? 'px-4 py-2 rounded-2xl text-sm font-semibold bg-violet-500/30 text-violet-200 ring-2 ring-violet-500'
                : 'px-4 py-2 rounded-2xl text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700';
            btn.textContent = `${preset.id} · ${preset.shortLabel}`;
            btn.onclick = () => applyTtmikSyncPreset(preset.id, { skillsTab: false });
            presetsRow.appendChild(btn);
        });

        const shootBtn = document.createElement('button');
        shootBtn.type = 'button';
        shootBtn.className = 'px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 hover:brightness-110';
        shootBtn.textContent = 'Shoot now → shadow';
        shootBtn.title = 'Apply current sync and open shadowing practice';
        shootBtn.onclick = () => practiceTtmikSyncShadowing();
        presetsRow.appendChild(shootBtn);

        presetsWrap.appendChild(presetsRow);

        const activePreset = TTMIK_SYNC_PRESETS.find(p => syncMatchesPreset(cfg, p));
        if (activePreset) {
            const note = document.createElement('p');
            note.className = 'text-xs text-zinc-500 mt-2';
            note.textContent = `Preset ${activePreset.id}: ${activePreset.note}`;
            presetsWrap.appendChild(note);
        }

        panel.appendChild(presetsWrap);
    }

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6';

    const makeSelect = (label, field, options, current) => {
        const wrap = document.createElement('label');
        wrap.className = 'block';
        const lbl = document.createElement('span');
        lbl.className = 'text-xs uppercase tracking-widest text-zinc-500 block mb-2';
        lbl.textContent = label;
        const sel = document.createElement('select');
        sel.className = 'w-full bg-zinc-800 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500';
        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.value;
            o.textContent = opt.label;
            const cur = current == null ? '' : String(current);
            if (String(opt.value) === cur) o.selected = true;
            sel.appendChild(o);
        });
        sel.onchange = () => updateWebdramaSync(field, sel.value);
        wrap.appendChild(lbl);
        wrap.appendChild(sel);
        return wrap;
    };

    grid.appendChild(makeSelect(
        'Shoot pin',
        'pin',
        Object.entries(TTMIK_SYNC_PINS).map(([id, p]) => ({ value: id, label: `${id} · ${p.label}` })),
        cfg.pin
    ));
    grid.appendChild(makeSelect(
        'Episode',
        'episode',
        sortSyncEpisodeKeys(Object.keys(TTMIK_SYNC_EPISODES)).map(n => {
            const e = TTMIK_SYNC_EPISODES[n];
            return {
                value: n,
                label: `${e.display || `Ep ${n}`} · ${e.ko} ${e.title}`
            };
        }),
        cfg.episode
    ));
    grid.appendChild(makeSelect(
        'Reel',
        'reel',
        [
            { value: '', label: '— none —' },
            ...Object.entries(TTMIK_SYNC_REELS).map(([id, r]) => ({ value: id, label: r.label }))
        ],
        cfg.reel
    ));
    panel.appendChild(grid);

    const detail = document.createElement('div');
    detail.className = 'bg-zinc-800/50 rounded-2xl p-4 mb-6 text-sm space-y-2';
    const pinLine = document.createElement('p');
    pinLine.className = 'text-zinc-300';
    pinLine.textContent = cfg.pinCfg
        ? `📍 ${cfg.pinCfg.label} — ${cfg.pinCfg.place}`
        : '';
    const catLine = document.createElement('p');
    catLine.className = 'text-zinc-400';
    catLine.textContent = cfg.categories.length
        ? `Lessons: ${cfg.categories.join(' · ')}`
        : '';
    const questLine = document.createElement('p');
    questLine.className = 'text-zinc-500 text-xs';
    if (cfg.questIds.length) {
        const labels = cfg.questIds.map(id => {
            const obj = MELBOURNE_QUEST.objectives.find(o => o.id === id);
            return obj ? obj.text : id;
        });
        questLine.textContent = `Quest tie-in: ${labels.join(' · ')}`;
    }
    detail.appendChild(pinLine);
    detail.appendChild(catLine);
    if (cfg.questIds.length) detail.appendChild(questLine);
    panel.appendChild(detail);

    if (phrase) {
        const phraseBox = document.createElement('div');
        phraseBox.className = 'border-l-2 border-violet-500 pl-4 mb-6';
        const ko = document.createElement('p');
        ko.className = 'korean text-lg text-white';
        ko.textContent = phrase.ko;
        if (phrase.ilo) {
            const ilo = document.createElement('p');
            ilo.className = 'text-emerald-400/90 text-sm font-medium';
            ilo.textContent = phrase.ilo;
            phraseBox.appendChild(ilo);
        }
        if (phrase.ja) {
            const ja = document.createElement('p');
            ja.className = 'text-rose-400/90 text-sm font-medium';
            ja.textContent = phrase.ja;
            phraseBox.appendChild(ja);
        }
        if (phrase.de) {
            const de = document.createElement('p');
            de.className = 'text-yellow-400/90 text-sm font-medium';
            de.textContent = phrase.de;
            phraseBox.appendChild(de);
        }
        if (phrase.es) {
            const es = document.createElement('p');
            es.className = 'text-amber-400/90 text-sm font-medium';
            es.textContent = phrase.es;
            phraseBox.appendChild(es);
        }
        const en = document.createElement('p');
        en.className = 'text-zinc-400 text-sm mt-1';
        en.textContent = phrase.en;
        phraseBox.appendChild(ko);
        phraseBox.appendChild(en);
        panel.appendChild(phraseBox);
    }

    const actions = document.createElement('div');
    actions.className = 'flex flex-wrap gap-3 mb-6';

    const syncBtn = document.createElement('button');
    syncBtn.type = 'button';
    syncBtn.className = 'px-5 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl text-sm font-semibold hover:brightness-110';
    syncBtn.textContent = 'Sync & activate skill';
    syncBtn.onclick = () => applyTtmikSync();

    const lessonsBtn = document.createElement('button');
    lessonsBtn.type = 'button';
    lessonsBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
    lessonsBtn.textContent = 'Open synced lessons';
    lessonsBtn.onclick = () => openTtmikSyncLessons();

    const shadowBtn = document.createElement('button');
    shadowBtn.type = 'button';
    shadowBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
    shadowBtn.textContent = 'Practice shadowing';
    shadowBtn.onclick = () => practiceTtmikSyncShadowing();

    if (phrase) {
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'px-5 py-3 bg-zinc-800 rounded-2xl text-sm font-medium hover:bg-zinc-700';
        copyBtn.textContent = 'Copy phrase';
        copyBtn.onclick = () => copyToClipboard(shadowPhraseCopyText(phrase));
        actions.appendChild(copyBtn);
    }

    const healBtn = document.createElement('button');
    healBtn.type = 'button';
    healBtn.className = 'px-5 py-3 bg-sky-900/60 text-sky-200 rounded-2xl text-sm font-medium hover:bg-sky-800/80 ring-1 ring-sky-500/30';
    healBtn.textContent = 'Quiet heal after blessing skit';
    healBtn.title = 'Post-DIB reflection · preset 9 · Helen self-healing';
    healBtn.onclick = () => practiceDibAftercare();
    actions.appendChild(healBtn);

    const ignanBtn = document.createElement('button');
    ignanBtn.type = 'button';
    ignanBtn.className = 'px-5 py-3 bg-emerald-900/50 text-emerald-200 rounded-2xl text-sm font-medium hover:bg-emerald-800/70 ring-1 ring-emerald-500/30';
    ignanBtn.textContent = 'Ignan healing walk (Ep 2.6)';
    ignanBtn.title = 'Mari trilingual walk · preset 10 · BOTANIC';
    ignanBtn.onclick = () => practiceIgnanHealingJourney();
    actions.appendChild(ignanBtn);

    const asukaBtn = document.createElement('button');
    asukaBtn.type = 'button';
    asukaBtn.className = 'px-5 py-3 bg-rose-900/50 text-rose-200 rounded-2xl text-sm font-medium hover:bg-rose-800/70 ring-1 ring-rose-500/30';
    asukaBtn.textContent = 'Asuka maybe (Ep 5 · JA)';
    asukaBtn.title = 'Japanese native input · preset 11 · FED rain glass';
    asukaBtn.onclick = () => practiceAsukaMaybe();
    actions.appendChild(asukaBtn);

    const heidiBtn = document.createElement('button');
    heidiBtn.type = 'button';
    heidiBtn.className = 'px-5 py-3 bg-yellow-900/50 text-yellow-200 rounded-2xl text-sm font-medium hover:bg-yellow-800/70 ring-1 ring-yellow-500/30';
    heidiBtn.textContent = 'Heidi wayfarer (Ep 6 · DE)';
    heidiBtn.title = 'German native input · preset 13 · Fast Character Bard sheet';
    heidiBtn.onclick = () => practiceHeidiWayfarer();
    actions.appendChild(heidiBtn);

    const fifaBtn = document.createElement('button');
    fifaBtn.type = 'button';
    fifaBtn.className = 'px-5 py-3 bg-amber-900/50 text-amber-200 rounded-2xl text-sm font-medium hover:bg-amber-800/70 ring-1 ring-amber-500/30';
    fifaBtn.textContent = 'Mari FIFA cantina (Ep 2.65)';
    fifaBtn.title = 'Mexican restaurant · Ilokano native · preset 12';
    fifaBtn.onclick = () => practiceMariFifaCelebrate();
    actions.appendChild(fifaBtn);

    actions.appendChild(syncBtn);
    actions.appendChild(lessonsBtn);
    actions.appendChild(shadowBtn);
    panel.appendChild(actions);

    if (typeof BARDIC_INSPIRATION !== 'undefined') {
        const bardBlock = document.createElement('div');
        bardBlock.className = 'mb-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-sm';
        const bardTitle = document.createElement('p');
        bardTitle.className = 'text-violet-300 font-medium mb-1';
        bardTitle.textContent = 'Bardic inspiration';
        const bardTheme = document.createElement('p');
        bardTheme.className = 'text-zinc-400 italic';
        bardTheme.textContent = `"${BARDIC_INSPIRATION.theme}" · ${BARDIC_INSPIRATION.mantra}`;
        bardBlock.appendChild(bardTitle);
        bardBlock.appendChild(bardTheme);
        panel.appendChild(bardBlock);
    }

    if (typeof HEALING_FACTORS !== 'undefined') {
        const healBlock = document.createElement('div');
        healBlock.className = 'mb-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 text-sm';
        const healTitle = document.createElement('p');
        healTitle.className = 'text-sky-300 font-medium mb-2';
        healTitle.textContent = 'Healing factors';
        const healMantra = document.createElement('p');
        healMantra.className = 'text-zinc-400 italic mb-3';
        healMantra.textContent = HEALING_FACTORS.mantra;
        healBlock.appendChild(healTitle);
        healBlock.appendChild(healMantra);
        const list = document.createElement('ul');
        list.className = 'space-y-1 text-xs';
        HEALING_FACTORS.factors.forEach(f => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'text-left w-full text-zinc-400 hover:text-sky-200 rounded-lg px-1 py-0.5 hover:bg-sky-900/20 transition';
            const bit = f.ko || f.phrase || f.note || f.edit || f.questId || '';
            btn.textContent = `${f.label}${bit ? ` — ${bit}` : ''}`;
            btn.title = `TTMIK.html?heal-factor=${f.id}`;
            btn.onclick = () => practiceHealingFactor(f.id);
            li.appendChild(btn);
            list.appendChild(li);
        });
        healBlock.appendChild(list);
        const healActions = document.createElement('div');
        healActions.className = 'mt-3 flex flex-wrap gap-2';
        const healRun = document.createElement('button');
        healRun.type = 'button';
        healRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-600/30 text-sky-200 hover:bg-sky-600/50';
        healRun.textContent = 'Run healing factors (step 4)';
        healRun.onclick = () => practiceDibAftercare();
        const ignanRun = document.createElement('button');
        ignanRun.type = 'button';
        ignanRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600/30 text-emerald-200 hover:bg-emerald-600/50';
        ignanRun.textContent = 'Ignan healing walk (step 6)';
        ignanRun.onclick = () => practiceIgnanHealingJourney();
        const fifaHealRun = document.createElement('button');
        fifaHealRun.type = 'button';
        fifaHealRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-600/30 text-amber-200 hover:bg-amber-600/50';
        fifaHealRun.textContent = 'Mari FIFA cantina (step 7)';
        fifaHealRun.onclick = () => practiceMariFifaCelebrate();
        const healLibRun = document.createElement('button');
        healLibRun.type = 'button';
        healLibRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-800/40 text-sky-100 hover:bg-sky-700/50';
        healLibRun.textContent = 'Open Healing Factors Library';
        healLibRun.onclick = () => startHealCategory('Post-DIB Landing');
        healActions.appendChild(healRun);
        healActions.appendChild(ignanRun);
        healActions.appendChild(fifaHealRun);
        healActions.appendChild(healLibRun);
        healBlock.appendChild(healActions);
        panel.appendChild(healBlock);
    }

    const appendRouteList = (title, steps) => {
        const routeLabel = document.createElement('h4');
        routeLabel.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-3 mt-4';
        routeLabel.textContent = title;
        panel.appendChild(routeLabel);

        const routeList = document.createElement('div');
        routeList.className = 'space-y-2 text-sm';
        steps.forEach(step => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'flex gap-3 text-zinc-400 w-full text-left rounded-xl px-2 py-1 -mx-2 hover:bg-zinc-800/60 hover:text-zinc-200 transition';
            row.title = 'Tap to load this block into sync';
            const time = document.createElement('span');
            time.className = 'text-violet-400 font-mono shrink-0 w-12';
            time.textContent = step.time;
            const text = document.createElement('span');
            const pinLabel = step.pin || (step.rtdb ? `RTDB ${step.rtdb}` : '—');
            text.textContent = `${pinLabel} — ${step.note}`;
            row.appendChild(time);
            row.appendChild(text);
            row.onclick = () => applyTtmikSyncRouteStep(step);
            routeList.appendChild(row);
        });
        panel.appendChild(routeList);
    };

    appendRouteList('Jun 19 morning block (reels + ep 2/6)', TTMIK_BLOCK_ROUTE);
    if (typeof TTMIK_DATE_NIGHT_ROUTE !== 'undefined') {
        appendRouteList('Date night lane · Degraves 17:00 + dawn 06:12', TTMIK_DATE_NIGHT_ROUTE);
    }
    if (typeof TTMIK_IGNAN_HEAL_ROUTE !== 'undefined') {
        appendRouteList('Lane C · Ignan self-healing walk (Mari)', TTMIK_IGNAN_HEAL_ROUTE);
    }
    if (typeof TTMIK_FIFA_CELEBRATION_ROUTE !== 'undefined') {
        appendRouteList('Lane D · Mari FIFA cantina celebration', TTMIK_FIFA_CELEBRATION_ROUTE);
    }
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

    if (typeof TAROT_SCAM_RED_FLAGS !== 'undefined' && TAROT_SCAM_RED_FLAGS.length) {
        const tarotBlock = document.createElement('div');
        tarotBlock.className = 'mt-6';

        const tarotLabel = document.createElement('h4');
        tarotLabel.className = 'text-xs uppercase tracking-widest text-zinc-500 mb-2';
        tarotLabel.textContent = 'Hermes audit · tarot-predicted scam (any 2 = abort)';
        tarotBlock.appendChild(tarotLabel);

        const tarotHint = document.createElement('p');
        tarotHint.className = 'text-xs text-zinc-500 mb-3';
        tarotHint.textContent = '4G > fate — don\'t fund predictions. Helen: 죄송하지만 지금은 어려워요.';
        tarotBlock.appendChild(tarotHint);

        const tarotList = document.createElement('ul');
        tarotList.className = 'space-y-1 text-sm text-zinc-400';
        TAROT_SCAM_RED_FLAGS.forEach((flag, i) => {
            const li = document.createElement('li');
            li.className = 'flex gap-2';
            const num = document.createElement('span');
            num.className = 'text-pink-400 font-mono shrink-0 w-4';
            num.textContent = String(i + 1);
            const text = document.createElement('span');
            text.textContent = flag;
            li.appendChild(num);
            li.appendChild(text);
            tarotList.appendChild(li);
        });
        tarotBlock.appendChild(tarotList);
        panel.appendChild(tarotBlock);
    }

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
        const isIgnan = skill.linkedGroups?.includes('ignan');
        const isAsuka = skill.id === 'asuka-brisbane';
        const isHeidi = skill.id === 'heidi-alpine-wayfarer';
        const ringActive = isIgnan
            ? 'ring-emerald-500 hover:ring-emerald-400'
            : isAsuka
                ? 'ring-rose-500 hover:ring-rose-400'
                : isHeidi
                    ? 'ring-yellow-500 hover:ring-yellow-400'
                    : 'ring-pink-500 hover:ring-pink-400';
        const ringIdle = isIgnan
            ? 'hover:ring-emerald-500/50'
            : isAsuka
                ? 'hover:ring-rose-500/50'
                : isHeidi
                    ? 'hover:ring-yellow-500/50'
                    : 'hover:ring-pink-500/50';
        const card = document.createElement('button');
        card.type = 'button';
        card.className = active
            ? `text-left bg-zinc-900 rounded-3xl p-6 ring-2 ${ringActive} transition`
            : `text-left bg-zinc-900 rounded-3xl p-6 hover:ring-2 ${ringIdle} transition`;

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
            pill.className = isIgnan
                ? 'inline-block mt-3 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full'
                : isAsuka
                    ? 'inline-block mt-3 text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded-full'
                    : isHeidi
                        ? 'inline-block mt-3 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full'
                        : 'inline-block mt-3 text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full';
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

    if (skill.dibAftercareSteps?.length) {
        const aftercare = document.createElement('div');
        aftercare.className = 'mb-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-sky-400 mb-3';
        label.textContent = 'After blessing skit — quiet reflection';
        aftercare.appendChild(label);
        const ol = document.createElement('ol');
        ol.className = 'list-decimal list-inside space-y-2 text-sm text-zinc-300';
        skill.dibAftercareSteps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            ol.appendChild(li);
        });
        aftercare.appendChild(ol);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'mt-3 px-4 py-2 rounded-xl text-sm font-medium bg-sky-600/30 text-sky-200 hover:bg-sky-600/50';
        runBtn.textContent = 'Run post-DIB heal now';
        runBtn.onclick = () => practiceDibAftercare();
        aftercare.appendChild(runBtn);
        panel.appendChild(aftercare);
    }

    if (skill.id === 'ignan-pilgrim') {
        const fifaBlock = document.createElement('div');
        fifaBlock.className = 'mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4';
        const fifaLabel = document.createElement('h4');
        fifaLabel.className = 'text-xs uppercase tracking-widest text-amber-300 mb-2';
        fifaLabel.textContent = 'FIFA cantina · Ilokano native tongue';
        fifaBlock.appendChild(fifaLabel);
        const fifaNote = document.createElement('p');
        fifaNote.className = 'text-sm text-zinc-400 mb-3';
        fifaNote.textContent = 'Mexican restaurant celebration — Mari speaks Ilokano first, then Spanish toast + Korean shadow.';
        fifaBlock.appendChild(fifaNote);
        const fifaRun = document.createElement('button');
        fifaRun.type = 'button';
        fifaRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-600/30 text-amber-200 hover:bg-amber-600/50';
        fifaRun.textContent = 'Take Mari to FIFA cantina (Ep 2.65)';
        fifaRun.onclick = () => practiceMariFifaCelebrate();
        fifaBlock.appendChild(fifaRun);
        panel.appendChild(fifaBlock);
    }

    if (skill.id === 'ignan-grounding' || skill.id === 'ignan-dalan') {
        const ignanBlock = document.createElement('div');
        ignanBlock.className = 'mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-emerald-300 mb-2';
        label.textContent = skill.id === 'ignan-grounding' ? 'Boot Ilokano grounding' : 'Boot own-path dalan';
        ignanBlock.appendChild(label);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600/30 text-emerald-200 hover:bg-emerald-600/50';
        runBtn.textContent = `Invoke ${skill.name}`;
        runBtn.onclick = () => bootSkillById(skill.id);
        ignanBlock.appendChild(runBtn);
        panel.appendChild(ignanBlock);
    }

    if (skill.id === 'asuka-brisbane') {
        const asukaBlock = document.createElement('div');
        asukaBlock.className = 'mb-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-rose-300 mb-2';
        label.textContent = 'Japanese native input · Ep 5';
        asukaBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.ja, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        asukaBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-rose-600/30 text-rose-200 hover:bg-rose-600/50';
        runBtn.textContent = 'Invoke Asuka maybe (JA → KO)';
        runBtn.onclick = () => practiceAsukaMaybe();
        asukaBlock.appendChild(runBtn);
        panel.appendChild(asukaBlock);
    }

    if (skill.id === 'heidi-alpine-wayfarer') {
        const heidiBlock = document.createElement('div');
        heidiBlock.className = 'mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-yellow-300 mb-2';
        label.textContent = 'German native input · Ep 6 · Fast Character';
        heidiBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.de, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        heidiBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-yellow-600/30 text-yellow-200 hover:bg-yellow-600/50 mr-2';
        runBtn.textContent = 'Invoke Heidi wayfarer (DE → KO)';
        runBtn.onclick = () => practiceHeidiWayfarer();
        heidiBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Heidi sheet';
        sheetBtn.title = 'fastcharacter.com · Bard Lore · Wayfarer · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterHeidi === 'function') openFastCharacterHeidi();
        };
        heidiBlock.appendChild(sheetBtn);
        panel.appendChild(heidiBlock);
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

function renderSkillLibraryComposer() {
    const panel = document.getElementById('skill-library-composer');
    if (!panel || typeof COMPOSED_LIBRARIES === 'undefined') return;
    panel.textContent = '';

    const header = document.createElement('div');
    header.className = 'mb-6';
    const h3 = document.createElement('h3');
    h3.className = 'text-xl font-semibold text-violet-200 mb-2';
    h3.textContent = 'Skill Library Composer';
    const meta = document.createElement('p');
    meta.className = 'text-zinc-400 text-sm';
    meta.textContent = 'Boot every .skill.md — specialty libraries + archetype shadowing';
    header.appendChild(h3);
    header.appendChild(meta);
    panel.appendChild(header);

    const bootActions = document.createElement('div');
    bootActions.className = 'mb-6 flex flex-wrap gap-2';
    const bootAll = document.createElement('button');
    bootAll.type = 'button';
    bootAll.className = 'px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-500';
    bootAll.textContent = 'Boot all';
    bootAll.title = 'TTMIK.html?boot=all';
    bootAll.onclick = () => bootAllLibrariesAndSkills();
    const composeBtn = document.createElement('button');
    composeBtn.type = 'button';
    composeBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
    composeBtn.textContent = 'Compose index';
    composeBtn.title = 'TTMIK.html?library=compose';
    composeBtn.onclick = () => switchTab(4);
    bootActions.appendChild(bootAll);
    bootActions.appendChild(composeBtn);
    panel.appendChild(bootActions);

    COMPOSED_LIBRARIES.forEach(lib => {
        const block = document.createElement('div');
        block.className = 'mb-6 last:mb-0';

        const title = document.createElement('h4');
        title.className = 'text-sm font-semibold mb-1';
        if (lib.accent === 'emerald') title.className += ' text-emerald-300';
        else if (lib.accent === 'rose') title.className += ' text-rose-300';
        else if (lib.accent === 'violet') title.className += ' text-violet-300';
        else if (lib.accent === 'sky') title.className += ' text-sky-300';
        else if (lib.accent === 'amber') title.className += ' text-amber-300';
        else if (lib.accent === 'red') title.className += ' text-red-300';
        else if (lib.accent === 'blue') title.className += ' text-blue-300';
        else title.className += ' text-pink-300';
        title.textContent = lib.label;
        block.appendChild(title);

        const desc = document.createElement('p');
        desc.className = 'text-xs text-zinc-500 mb-3';
        desc.textContent = lib.description;
        block.appendChild(desc);

        const skillGrid = document.createElement('div');
        skillGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-2';

        lib.skills.forEach(skillId => {
            const skill = getSkillById(skillId);
            const entry = typeof getSkillBootEntry === 'function' ? getSkillBootEntry(skillId) : null;
            if (!skill) return;

            const row = document.createElement('div');
            row.className = 'flex flex-wrap items-center gap-2 bg-zinc-800/60 rounded-xl px-3 py-2 text-sm';

            const label = document.createElement('span');
            label.className = 'text-zinc-200 font-medium flex-1 min-w-[10rem]';
            label.textContent = skill.name;
            row.appendChild(label);

            const src = document.createElement('span');
            src.className = 'text-xs text-zinc-500 hidden lg:inline';
            src.textContent = entry?.source || `${skillId}.skill.md`;
            row.appendChild(src);

            const bootBtn = document.createElement('button');
            bootBtn.type = 'button';
            bootBtn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
            bootBtn.textContent = 'Boot';
            bootBtn.title = typeof getSkillBootUrl === 'function' ? getSkillBootUrl(skillId) : `?skill=${skillId}`;
            bootBtn.onclick = () => bootSkillById(skillId);
            row.appendChild(bootBtn);

            const libBtn = document.createElement('button');
            libBtn.type = 'button';
            libBtn.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-zinc-700 text-zinc-300 hover:bg-zinc-600';
            libBtn.textContent = 'Library';
            libBtn.onclick = () => bootSkillById(skillId, { openLibrary: true });
            row.appendChild(libBtn);

            skillGrid.appendChild(row);
        });

        block.appendChild(skillGrid);

        if (lib.boot) {
            const openLib = document.createElement('button');
            openLib.type = 'button';
            openLib.className = 'mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700';
            openLib.textContent = `Open ${lib.label}`;
            openLib.onclick = () => openComposedLibrary(lib.id);
            block.appendChild(openLib);
        }

        panel.appendChild(block);
    });
}

function renderSkillsUI() {
    renderSyncPanel();
    renderQuestPanel();
    renderSkillsGrid();
    renderSkillDetail();
}