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
    const svenCats = typeof SVEN_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => SVEN_LIBRARY_CATEGORIES.includes(c))
        : [];
    const martinCats = typeof MARTIN_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => MARTIN_LIBRARY_CATEGORIES.includes(c))
        : [];
    const ronaldoCats = typeof RONALDO_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => RONALDO_LIBRARY_CATEGORIES.includes(c))
        : [];
    const mbappeCats = typeof MBAPPE_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => MBAPPE_LIBRARY_CATEGORIES.includes(c))
        : [];
    const messiCats = typeof MESSI_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => MESSI_LIBRARY_CATEGORIES.includes(c))
        : [];
    const vinicusCats = typeof VINICUS_LIBRARY_CATEGORIES !== 'undefined'
        ? cats.filter(c => VINICUS_LIBRARY_CATEGORIES.includes(c))
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
    } else if (svenCats.length) {
        activeLibraryGroup = 'Sven Library';
        activeCategory = svenCats[0];
    } else if (martinCats.length) {
        activeLibraryGroup = 'Martin Library';
        activeCategory = martinCats[0];
    } else if (ronaldoCats.length) {
        activeLibraryGroup = 'Ronaldo Library';
        activeCategory = ronaldoCats[0];
    } else if (mbappeCats.length) {
        activeLibraryGroup = 'Mbappé Library';
        activeCategory = mbappeCats[0];
    } else if (messiCats.length) {
        activeLibraryGroup = 'Messi Library';
        activeCategory = messiCats[0];
    } else if (vinicusCats.length) {
        activeLibraryGroup = 'Vinicus Library';
        activeCategory = vinicusCats[0];
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
    const hasSven = skill.linkedGroups?.includes('sven');
    const hasMartin = skill.linkedGroups?.includes('martin');
    const hasRonaldo = skill.linkedGroups?.includes('ronaldo');
    const hasMbappe = skill.linkedGroups?.includes('mbappe');
    const hasMessi = skill.linkedGroups?.includes('messi');
    const hasVinicus = skill.linkedGroups?.includes('vinicus');
    const hasMexico = skill.linkedGroups?.includes('mexico');
    const hasCanada = skill.linkedGroups?.includes('canada');
    const hasUsa = skill.linkedGroups?.includes('usa');
    const hasMika = skill.linkedGroups?.includes('mika');
    const hasHaley = skill.linkedGroups?.includes('haley');
    const preferMelbourne = !hasIgnan && !hasAsuka && !hasHeidi && !hasSven && !hasMartin && !hasRonaldo && !hasMbappe && !hasMessi && !hasVinicus && !hasMexico && !hasCanada && !hasUsa && !hasMika && !hasHaley && (
        skill.linkedGroups?.includes('melbourne')
        || !(skill.linkedGroups?.includes('sovereign'))
    );
    if (hasHaley && typeof startHaleyCategory === 'function') {
        startHaleyCategory(skill.linkedCategories?.[0] || 'English Shadowing');
        return;
    }
    if (hasMika && typeof startMikaCategory === 'function') {
        startMikaCategory(skill.linkedCategories?.[0] || 'English Shadowing');
        return;
    }
    if (hasIgnan || hasAsuka || hasHeidi || hasSven || hasMartin || hasRonaldo || hasMbappe || hasMessi || hasVinicus || hasMexico || hasCanada || hasUsa) {
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
    if (factorId === 'match-attune') {
        practiceMatchAttune(opts);
        return true;
    }
    if (factorId === 'rei-mercy') {
        practiceReiMercyHeal(opts);
        return true;
    }
    if (factorId === 'cicada-attune') {
        practiceCicadaAttune(opts);
        return true;
    }
    if (factorId === 'twitter-feed-heal') {
        practiceTwitterFeedHeal(opts);
        return true;
    }
    if (factorId === 'multiverse-query') {
        practiceRickMortyMultiverse(opts);
        return true;
    }
    if (factorId === 'wiki-meme') {
        practiceMinecraftWikiMeme(opts);
        return true;
    }
    if (factorId === 'open-road') {
        practiceMikaRoadDreamer({ ...opts, shadowIndex: 0 });
        return true;
    }
    if (factorId === 'dream-teleport') {
        practiceMikaRoadDreamer({ ...opts, shadowIndex: 3 });
        return true;
    }
    if (factorId === 'justice-seek' || [
        'territory-creation', 'item-construction', 'divine-words', 'rule-breaker',
        'argon-coin', 'teachings-circe', 'witch-colchis'
    ].includes(factorId)) {
        const shadowIdx = factor.shadowIndex ?? opts.shadowIndex ?? 0;
        practiceHaleyVietbonnie({ ...opts, shadowIndex: shadowIdx });
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
        } else if (entry?.libraryGroup === 'Evangelion Library' && entry.libraryCategory) {
            startEvangelionCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Rick & Morty Multiverse Library' && entry.libraryCategory) {
            startRickMortyCategory(entry.libraryCategory);
        } else if (entry?.libraryGroup === 'Mika Library' && entry.libraryCategory) {
            startMikaCategory(entry.libraryCategory);
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

function continueMatchAttuneLane(laneId, opts = {}) {
    const handlers = {
        kane: () => practiceHarryKaneStriker({
            openSheet: opts.openSheet,
            openWatch: opts.openWatch,
            logQuest: opts.logQuest
        }),
        vinicus: () => practiceVinicusSamba({ openSheet: opts.openSheet, logQuest: opts.logQuest }),
        messi: () => practiceMessiPlaymaker({ openSheet: opts.openSheet, logQuest: opts.logQuest }),
        mbappe: () => practiceMbappeAttack({ openSheet: opts.openSheet, logQuest: opts.logQuest }),
        ronaldo: () => practiceRonaldoGlory({ openSheet: opts.openSheet, logQuest: opts.logQuest }),
        fifa: () => practiceMariFifaCelebrate({ logQuest: opts.logQuest }),
        sua: () => practiceCicadaAttune({ logQuest: opts.logQuest })
    };
    const run = handlers[laneId];
    if (run) run();
}

function runHealAllStep(step, opts = {}) {
    if (!step?.invoke || typeof window[step.invoke] !== 'function') return false;
    window[step.invoke]({ logQuest: opts.logQuest !== false, ...(step.opts || {}) });
    return true;
}

function practiceHealAll(opts = {}) {
    const lane = typeof getHealAllLane === 'function' ? getHealAllLane() : [];
    if (!lane.length) return false;

    const stepIdx = opts.step != null ? parseInt(opts.step, 10) : 0;
    const idx = Math.min(Math.max(0, isNaN(stepIdx) ? 0 : stepIdx), lane.length - 1);

    if (opts.logQuest !== false && opts.logAllQuests !== false) {
        const questIds = new Set();
        lane.forEach((s) => { if (s.questId) questIds.add(s.questId); });
        questIds.forEach((q) => completeQuestObjective(q));
    }

    if (opts.chain) {
        lane.forEach((s, i) => {
            runHealAllStep(s, { ...opts, logQuest: false });
            if (i < lane.length - 1) return;
        });
    } else {
        runHealAllStep(lane[idx], {
            ...opts,
            logQuest: opts.logAllQuests ? false : opts.logQuest
        });
    }

    if (opts.openLibrary && typeof startHealCategory === 'function') {
        startHealCategory('Post-DIB Landing');
    }

    switchTab(3);
    renderSyncPanel();
    return true;
}

function practiceCicadaAttune(opts = {}) {
    const ritual = typeof getCicadaAttuneRitual === 'function' ? getCicadaAttuneRitual() : null;
    const skillId = ritual?.skillId || 'sua-tattoo';
    const shadowIdx = ritual?.shadowIndex ?? 2;

    setWebdramaSyncValues(ritual?.pin || 'FED', null, null);
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
        completeQuestObjective(ritual?.questId || 'side-boundary');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function postTwitterFeedHealTweet(ritual, opts = {}) {
    const handle = (ritual?.handle || 'adhdloganberry').replace(/^@/, '');
    const text = ritual?.healTweet
        || '괜찮아요, 괜찮아요 — feed rest OK. One breath · one boundary · no re-watch spiral. #HealTheFeed #TTMIK';
    const payload = {
        event: 'ttmik_heal_feed',
        lesson: 'Twitter feed heal',
        progress: 100,
        timestamp: new Date().toISOString(),
        platform: 'TTMIK Feed Heal',
        user: handle,
        tweet: text,
    };

    const webhookUrl = opts.webhookUrl
        || localStorage.getItem('ttmik_webhook_url')
        || '/api/ttmik-heal-feed';

    if (typeof isValidWebhookUrl === 'function' && !isValidWebhookUrl(webhookUrl)) {
        window.open(`http://localhost:5174/?heal-feed=1`, '_blank', 'noopener,noreferrer');
        return;
    }

    const headers = { 'Content-Type': 'application/json' };
    const webhookSecret = localStorage.getItem('ttmik_webhook_secret');
    if (webhookSecret) headers['X-Webhook-Secret'] = webhookSecret;

    fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    }).catch(() => {
        window.open(`http://localhost:5174/?heal-feed=1`, '_blank', 'noopener,noreferrer');
    });
}

function practiceTwitterFeedHeal(opts = {}) {
    const ritual = typeof getTwitterFeedHealRitual === 'function' ? getTwitterFeedHealRitual() : null;
    const skillId = ritual?.skillId || 'melbourne-lantern-bard';
    const shadowIdx = ritual?.shadowIndex ?? 3;

    setWebdramaSyncValues(ritual?.pin || 'HOME', null, null);
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

    if (opts.postTweet !== false) {
        postTwitterFeedHealTweet(ritual, opts);
    }

    if (opts.logQuest !== false) {
        completeQuestObjective(ritual?.questId || 'side-boundary');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceReiMercyHeal(opts = {}) {
    const ritual = typeof getReiMercyHealRitual === 'function' ? getReiMercyHealRitual() : null;
    const skillId = ritual?.skillId || 'neon-evangelion';
    const shadowIdx = ritual?.shadowIndex ?? 1;

    setWebdramaSyncValues(ritual?.pin || 'NERV', ritual?.episode || '7.1', null);
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

    if (opts.installLook !== false && typeof installNeonEvangelionLook === 'function') {
        installNeonEvangelionLook();
    }

    if (opts.openSheet && typeof openFastCharacterRei === 'function') {
        openFastCharacterRei();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective(ritual?.questId || 'side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMatchAttune(opts = {}) {
    const ritual = typeof getMatchAttuneRitual === 'function' ? getMatchAttuneRitual() : null;
    const skillId = ritual?.skillId || 'melbourne-lantern-bard';
    const shadowIdx = ritual?.shadowIndex ?? 0;

    setWebdramaSyncValues(ritual?.pin || 'FED', null, null);
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
        completeQuestObjective(ritual?.questId || 'side-fifa-celebrate');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();

    if (opts.chainLane && opts.lane) {
        continueMatchAttuneLane(opts.lane, opts);
    }
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

function practiceSvenRanger(opts = {}) {
    const skillId = 'sven-nordic-ranger';
    const shadowIdx = 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(14)) {
        setWebdramaSyncValues('FLINDERS', 7, null);
    } else {
        setWebdramaSyncValues('FLINDERS', 7, null);
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

    if (opts.openSheet && typeof openFastCharacterSven === 'function') {
        openFastCharacterSven();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMartinGuide(opts = {}) {
    const skillId = 'martin-nordic-guide';
    const shadowIdx = 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(15)) {
        setWebdramaSyncValues('BOTANIC', 8, null);
    } else {
        setWebdramaSyncValues('BOTANIC', 8, null);
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

    if (opts.openSheet && typeof openFastCharacterMartin === 'function') {
        openFastCharacterMartin();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('main-veil');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceCinemaBeckham(opts = {}) {
    const skillId = 'ronaldo-portugal-glory';
    const epCfg = typeof getSyncEpisode === 'function' ? getSyncEpisode('2.64') : null;
    const shadowIdx = epCfg?.shadowingIndex ?? 5;

    setWebdramaSyncValues('CINEMA', '2.64', null);
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

    if (opts.openSheet && typeof openFastCharacterRonaldo === 'function') {
        openFastCharacterRonaldo();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMessiPlaymaker(opts = {}) {
    const skillId = 'messi-argentina-playmaker';
    const shadowIdx = 0;

    setWebdramaSyncValues('BOCA', '2.76', null);
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

    if (opts.openSheet && typeof openFastCharacterMessi === 'function') {
        openFastCharacterMessi();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceVinicusSamba(opts = {}) {
    const skillId = 'vinicus-brasil-samba';
    const shadowIdx = 0;

    setWebdramaSyncValues('SAMBA', '2.77', null);
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

    if (opts.openSheet && typeof openFastCharacterVinicus === 'function') {
        openFastCharacterVinicus();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-fifa-celebrate');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMinecraftWikiMeme(opts = {}) {
    setWebdramaSyncValues('CRAFT', '7.3', null);
    persistState();
    renderSyncPanel();

    setActiveSkill('melbourne-lantern-bard');
    selectedSkillId = 'melbourne-lantern-bard';

    resetShadowing();
    if (typeof goToShadowingPhrase === 'function') {
        goToShadowingPhrase(0);
    } else {
        startSkillPractice('melbourne-lantern-bard');
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    if (typeof openMinecraftMemeGenerator === 'function') {
        openMinecraftMemeGenerator({
            templateId: opts.templateId || 'lantern-block',
            logQuest: false
        });
    } else {
        switchTab(4);
    }
}

function practiceHaleyVietbonnie(opts = {}) {
    const skillId = 'haley-vietbonnie';
    const shadowIdx = opts.shadowIndex ?? 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(25)) {
        const preset = getSyncPreset(25);
        setWebdramaSyncValues(preset.pin, preset.episode, preset.reel);
    } else {
        setWebdramaSyncValues('CAMPUS', '7.5', null);
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

    if (opts.openSheet && typeof openFastCharacterHaley === 'function') {
        openFastCharacterHaley();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-boundary');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMikaRoadDreamer(opts = {}) {
    const skillId = 'mika-road-dreamer';
    const shadowIdx = opts.shadowIndex ?? 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(24)) {
        const preset = getSyncPreset(24);
        setWebdramaSyncValues(preset.pin, preset.episode, preset.reel);
    } else {
        setWebdramaSyncValues('OPEN', '7.4', null);
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

    if (opts.openSheet && typeof openFastCharacterMika === 'function') {
        openFastCharacterMika();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceRickMortyMultiverse(opts = {}) {
    const skillId = 'rick-morty-multiverse';
    const shadowIdx = 0;

    setWebdramaSyncValues('CITADEL', '7.2', null);
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

    if (opts.openSheet && typeof openFastCharacterRick === 'function') {
        openFastCharacterRick();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceNeonEvangelion(opts = {}) {
    const skillId = 'neon-evangelion';
    const shadowIdx = 0;

    setWebdramaSyncValues('NERV', '7.1', null);
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

    if (opts.installLook !== false && typeof installNeonEvangelionLook === 'function') {
        installNeonEvangelionLook();
    }

    if (opts.openSheet && typeof openFastCharacterRei === 'function') {
        openFastCharacterRei();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-humor');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceHarryKaneStriker(opts = {}) {
    const skillId = 'harry-kane-england-striker';
    const shadowIdx = 0;

    setWebdramaSyncValues('WEMBLEY', '2.78', null);
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

    if (opts.openSheet && typeof openFastCharacterKane === 'function') {
        openFastCharacterKane();
    }

    if (opts.openWatch && typeof openKaneFifaWatch === 'function') {
        openKaneFifaWatch();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-fifa-celebrate');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceMbappeAttack(opts = {}) {
    const skillId = 'mbappe-france-attack';
    const shadowIdx = 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(17)) {
        setWebdramaSyncValues('STADE', '2.66', null);
    } else {
        setWebdramaSyncValues('STADE', '2.66', null);
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

    if (opts.openSheet && typeof openFastCharacterMbappe === 'function') {
        openFastCharacterMbappe();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-fifa-celebrate');
    }

    switchTab(2);
    renderSkillDetail();
    renderSkillsGrid();
}

function practiceRonaldoGlory(opts = {}) {
    const skillId = 'ronaldo-portugal-glory';
    const shadowIdx = 0;

    if (typeof getSyncPreset === 'function' && getSyncPreset(16)) {
        setWebdramaSyncValues('CANTINA', '2.65', null);
    } else {
        setWebdramaSyncValues('CANTINA', '2.65', null);
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

    if (opts.openSheet && typeof openFastCharacterRonaldo === 'function') {
        openFastCharacterRonaldo();
    }

    if (opts.logQuest !== false) {
        completeQuestObjective('side-fifa-celebrate');
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

    if (typeof getHealAllLane === 'function') {
        const healAllBtn = document.createElement('button');
        healAllBtn.type = 'button';
        healAllBtn.className = 'mb-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-sky-600 text-white hover:bg-sky-500';
        healAllBtn.textContent = 'Heal all lane (step 4 → Rei mercy → attune)';
        healAllBtn.title = 'TTMIK.html?heal=all';
        healAllBtn.onclick = () => practiceHealAll({ logAllQuests: true });
        panel.appendChild(healAllBtn);
    }

    if (typeof getHermesPreloadCmd === 'function') {
        const preloadRow = document.createElement('div');
        preloadRow.className = 'mb-6 flex flex-wrap gap-2';
        const preloadBtn = document.createElement('button');
        preloadBtn.type = 'button';
        preloadBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800/70 ring-1 ring-emerald-500/30';
        preloadBtn.textContent = `Copy Hermes preload (all ${HERMES_PRELOAD_SKILL_IDS.length})`;
        preloadBtn.title = getHermesPreloadCmd();
        preloadBtn.onclick = () => copyToClipboard(getHermesPreloadCmd());
        preloadRow.appendChild(preloadBtn);
        if (typeof getHermesBundleCmd === 'function') {
            const bundleBtn = document.createElement('button');
            bundleBtn.type = 'button';
            bundleBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700';
            bundleBtn.textContent = 'Copy Hermes bundle (/ttmik-all)';
            bundleBtn.title = getHermesBundleCmd();
            bundleBtn.onclick = () => copyToClipboard(getHermesBundleCmd());
            preloadRow.appendChild(bundleBtn);
        }
        panel.appendChild(preloadRow);
    }

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
            if (boot['heal-factor']) practiceHealingFactor(boot['heal-factor']);
            else if (boot.heal === '1') practiceDibAftercare();
            else if (boot.asuka === '1') practiceAsukaMaybe();
            else if (boot.heidi === '1') practiceHeidiWayfarer({ openSheet: boot.sheet === '1' });
            else if (boot.sven === '1') practiceSvenRanger({ openSheet: boot.sheet === '1' });
            else if (boot.martin === '1') practiceMartinGuide({ openSheet: boot.sheet === '1' });
            else if (boot.ronaldo === '1') practiceRonaldoGlory({ openSheet: boot.sheet === '1' });
            else if (boot.mbappe === '1') practiceMbappeAttack({ openSheet: boot.sheet === '1' });
            else if (boot.messi === '1') practiceMessiPlaymaker({ openSheet: boot.sheet === '1' });
            else if (boot.vinicus === '1') practiceVinicusSamba({ openSheet: boot.sheet === '1' });
            else if (boot.kane === '1') practiceHarryKaneStriker({ openSheet: boot.sheet === '1', openWatch: boot.watch === '1' });
            else if (boot.sua === '1' || boot.cicada === '1') practiceCicadaAttune({ logQuest: true });
            else if (boot.rickmorty === '1' || boot.rick === '1' || boot.multiverse === '1') practiceRickMortyMultiverse({ openSheet: boot.sheet === '1' });
            else if (boot['minecraft-meme'] === '1' || boot.meme === '1') practiceMinecraftWikiMeme({ templateId: boot.template });
            else if (boot.mika === '1') practiceMikaRoadDreamer({ openSheet: boot.sheet === '1', shadowIndex: boot['heal-factor'] === 'dream-teleport' ? 3 : 0 });
            else if (boot.haley === '1' || boot.vietbonnie === '1') practiceHaleyVietbonnie({ openSheet: boot.sheet === '1' });
            else if (boot.neon === '1' || boot.evangelion === '1' || boot.rei === '1') practiceNeonEvangelion({ openSheet: boot.sheet === '1' });
            else if (boot.cinema === '1' || boot.beckham === '1') practiceCinemaBeckham({ openSheet: boot.sheet === '1' });
            else if (boot.ignan === '1') practiceIgnanHealingJourney();
            else if (boot.fifa === '1') practiceMariFifaCelebrate();
            else if (boot.attune === '1' || boot['before-match'] === '1') {
                practiceMatchAttune({
                    lane: boot.lane || null,
                    openWatch: boot.watch === '1',
                    openSheet: boot.sheet === '1',
                    chainLane: boot.chain === '1'
                });
            }
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

function resolveAttuneLane(params) {
    if (params.get('lane')) return params.get('lane');
    if (params.get('sua') === '1' || params.get('cicada') === '1') return 'sua';
    if (params.get('kane') === '1') return 'kane';
    if (params.get('vinicus') === '1') return 'vinicus';
    if (params.get('messi') === '1') return 'messi';
    if (params.get('mbappe') === '1') return 'mbappe';
    if (params.get('ronaldo') === '1') return 'ronaldo';
    if (params.get('fifa') === '1' || params.get('mari') === 'fifa') return 'fifa';
    return null;
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
    if (params.get('attune') === '1' || params.get('before-match') === '1') {
        practiceMatchAttune({
            lane: resolveAttuneLane(params),
            openWatch: params.get('watch') === '1',
            openSheet: params.get('sheet') === '1',
            chainLane: params.get('chain') === '1',
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
    if (params.get('sven') === '1') {
        practiceSvenRanger({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('martin') === '1') {
        practiceMartinGuide({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('ronaldo') === '1') {
        practiceRonaldoGlory({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('mbappe') === '1') {
        practiceMbappeAttack({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('messi') === '1') {
        practiceMessiPlaymaker({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('vinicus') === '1') {
        practiceVinicusSamba({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('kane') === '1') {
        practiceHarryKaneStriker({
            openSheet: params.get('sheet') === '1',
            openWatch: params.get('watch') === '1'
        });
        return;
    }
    if (params.get('sua') === '1' || params.get('cicada') === '1') {
        practiceCicadaAttune({
            logQuest: params.get('quest') !== '0',
            chainLane: params.get('chain') === '1',
            lane: resolveAttuneLane(params)
        });
        return;
    }
    if (params.get('tweet-heal') === '1' || params.get('feed-heal') === '1' || params.get('tweet') === 'heal') {
        practiceTwitterFeedHeal({
            logQuest: params.get('quest') !== '0',
            postTweet: params.get('post') !== '0'
        });
        return;
    }
    if (params.get('rickmorty') === '1' || params.get('rick') === '1' || params.get('multiverse') === '1') {
        practiceRickMortyMultiverse({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('minecraft-meme') === '1' || params.get('meme') === '1') {
        practiceMinecraftWikiMeme({ templateId: params.get('template') });
        return;
    }
    if (params.get('mika') === '1') {
        practiceMikaRoadDreamer({
            openSheet: params.get('sheet') === '1',
            shadowIndex: params.get('heal-factor') === 'dream-teleport' ? 3 : 0
        });
        return;
    }
    if (params.get('haley') === '1' || params.get('vietbonnie') === '1') {
        practiceHaleyVietbonnie({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('neon') === '1' || params.get('evangelion') === '1' || params.get('rei') === '1') {
        practiceNeonEvangelion({ openSheet: params.get('sheet') === '1' });
        return;
    }
    if (params.get('cinema') === '1' || params.get('beckham') === '1') {
        practiceCinemaBeckham({ openSheet: params.get('sheet') === '1' });
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
    if (params.get('heal') === 'all') {
        practiceHealAll({
            logQuest: params.get('quest') !== '0',
            logAllQuests: params.get('quests') !== '0',
            openLibrary: params.get('lessons') === '1',
            chain: params.get('chain') === '1',
            step: params.get('lane-step') ?? params.get('step-index')
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
        if (phrase.fr) {
            const fr = document.createElement('p');
            fr.className = 'text-sky-400/90 text-sm font-medium';
            fr.textContent = phrase.fr;
            phraseBox.appendChild(fr);
        }
        if (phrase.de) {
            const de = document.createElement('p');
            de.className = 'text-yellow-400/90 text-sm font-medium';
            de.textContent = phrase.de;
            phraseBox.appendChild(de);
        }
        if (phrase.sv) {
            const sv = document.createElement('p');
            sv.className = 'text-cyan-400/90 text-sm font-medium';
            sv.textContent = phrase.sv;
            phraseBox.appendChild(sv);
        }
        if (phrase.no) {
            const no = document.createElement('p');
            no.className = 'text-indigo-400/90 text-sm font-medium';
            no.textContent = phrase.no;
            phraseBox.appendChild(no);
        }
        if (phrase.en && phrase.enFirst) {
            const enLead = document.createElement('p');
            enLead.className = 'text-blue-400/90 text-sm font-medium';
            enLead.textContent = phrase.en;
            phraseBox.appendChild(enLead);
        }
        if (phrase.pt) {
            const pt = document.createElement('p');
            pt.className = 'text-orange-400/90 text-sm font-medium';
            pt.textContent = phrase.pt;
            phraseBox.appendChild(pt);
        }
        if (phrase.es) {
            const es = document.createElement('p');
            es.className = 'text-amber-400/90 text-sm font-medium';
            es.textContent = phrase.es;
            phraseBox.appendChild(es);
        }
        phraseBox.appendChild(ko);
        if (phrase.en && !phrase.enFirst) {
            const en = document.createElement('p');
            en.className = 'text-zinc-400 text-sm mt-1';
            en.textContent = phrase.en;
            phraseBox.appendChild(en);
        }
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

    const svenBtn = document.createElement('button');
    svenBtn.type = 'button';
    svenBtn.className = 'px-5 py-3 bg-cyan-900/50 text-cyan-200 rounded-2xl text-sm font-medium hover:bg-cyan-800/70 ring-1 ring-cyan-500/30';
    svenBtn.textContent = 'Sven ranger (Ep 7 · SV)';
    svenBtn.title = 'Swedish native input · preset 14 · Fast Character Ranger sheet';
    svenBtn.onclick = () => practiceSvenRanger();
    actions.appendChild(svenBtn);

    const martinBtn = document.createElement('button');
    martinBtn.type = 'button';
    martinBtn.className = 'px-5 py-3 bg-indigo-900/50 text-indigo-200 rounded-2xl text-sm font-medium hover:bg-indigo-800/70 ring-1 ring-indigo-500/30';
    martinBtn.textContent = 'Martin guide (Ep 8 · NO)';
    martinBtn.title = 'Norwegian native input · preset 15 · Fast Character Guide sheet';
    martinBtn.onclick = () => practiceMartinGuide();
    actions.appendChild(martinBtn);

    const ronaldoBtn = document.createElement('button');
    ronaldoBtn.type = 'button';
    ronaldoBtn.className = 'px-5 py-3 bg-orange-900/50 text-orange-200 rounded-2xl text-sm font-medium hover:bg-orange-800/70 ring-1 ring-orange-500/30';
    ronaldoBtn.textContent = 'Ronaldo glory (Ep 2.65 · PT)';
    ronaldoBtn.title = 'Portuguese native input · preset 16 · Fast Character Glory Paladin sheet';
    ronaldoBtn.onclick = () => practiceRonaldoGlory();
    actions.appendChild(ronaldoBtn);

    const mbappeBtn = document.createElement('button');
    mbappeBtn.type = 'button';
    mbappeBtn.className = 'px-5 py-3 bg-sky-900/50 text-sky-200 rounded-2xl text-sm font-medium hover:bg-sky-800/70 ring-1 ring-sky-500/30';
    mbappeBtn.textContent = 'Mbappé attack (Ep 2.66 · FR)';
    mbappeBtn.title = 'French native input · preset 17 · Fast Character Battle Master sheet';
    mbappeBtn.onclick = () => practiceMbappeAttack();
    actions.appendChild(mbappeBtn);

    const messiBtn = document.createElement('button');
    messiBtn.type = 'button';
    messiBtn.className = 'px-5 py-3 bg-emerald-900/50 text-emerald-200 rounded-2xl text-sm font-medium hover:bg-emerald-800/70 ring-1 ring-emerald-500/30';
    messiBtn.textContent = 'Messi playmaker (Ep 2.76 · AR)';
    messiBtn.title = 'After cook-off · Argentine Spanish · preset 18 · Fast Character Mastermind sheet';
    messiBtn.onclick = () => practiceMessiPlaymaker();
    actions.appendChild(messiBtn);

    const vinicusBtn = document.createElement('button');
    vinicusBtn.type = 'button';
    vinicusBtn.className = 'px-5 py-3 bg-lime-900/50 text-lime-200 rounded-2xl text-sm font-medium hover:bg-lime-800/70 ring-1 ring-lime-500/30';
    vinicusBtn.textContent = 'Vinicus samba (Ep 2.77 · BR)';
    vinicusBtn.title = 'After La Boca · Brazilian Portuguese · preset 19 · Fast Character Open Hand Monk sheet';
    vinicusBtn.onclick = () => practiceVinicusSamba();
    actions.appendChild(vinicusBtn);

    const kaneBtn = document.createElement('button');
    kaneBtn.type = 'button';
    kaneBtn.className = 'px-5 py-3 bg-rose-900/50 text-rose-200 rounded-2xl text-sm font-medium hover:bg-rose-800/70 ring-1 ring-rose-500/30';
    kaneBtn.textContent = 'Kane striker (Ep 2.78 · EN)';
    kaneBtn.title = 'After Brasil samba · English captain · preset 20 · Fast Character Champion Fighter sheet';
    kaneBtn.onclick = () => practiceHarryKaneStriker();
    actions.appendChild(kaneBtn);

    const neonBtn = document.createElement('button');
    neonBtn.type = 'button';
    neonBtn.className = 'px-5 py-3 bg-violet-900/50 text-violet-200 rounded-2xl text-sm font-medium hover:bg-violet-800/70 ring-1 ring-violet-500/30';
    neonBtn.textContent = 'Neon Evangelion (Ep 7.1 · JA)';
    neonBtn.title = 'Moon-card neon · Japanese native · preset 21 · install neon look';
    neonBtn.onclick = () => practiceNeonEvangelion();
    actions.appendChild(neonBtn);

    const rickmortyBtn = document.createElement('button');
    rickmortyBtn.type = 'button';
    rickmortyBtn.className = 'px-5 py-3 bg-teal-900/50 text-teal-200 rounded-2xl text-sm font-medium hover:bg-teal-800/70 ring-1 ring-teal-500/30';
    rickmortyBtn.textContent = 'Rick & Morty multiverse (Ep 7.2 · EN)';
    rickmortyBtn.title = 'Citadel portal · English native · preset 22 · rickmorty SQL schema';
    rickmortyBtn.onclick = () => practiceRickMortyMultiverse();
    actions.appendChild(rickmortyBtn);

    const memeBtn = document.createElement('button');
    memeBtn.type = 'button';
    memeBtn.className = 'px-5 py-3 bg-lime-900/50 text-lime-200 rounded-2xl text-sm font-medium hover:bg-lime-800/70 ring-1 ring-lime-500/30';
    memeBtn.textContent = 'Minecraft Wiki meme (Ep 7.3)';
    memeBtn.title = 'Hipposgrumm parody articles · humor alchemy · preset 23';
    memeBtn.onclick = () => practiceMinecraftWikiMeme();
    actions.appendChild(memeBtn);

    const mikaBtn = document.createElement('button');
    mikaBtn.type = 'button';
    mikaBtn.className = 'px-5 py-3 bg-orange-900/50 text-orange-200 rounded-2xl text-sm font-medium hover:bg-orange-800/70 ring-1 ring-orange-500/30';
    mikaBtn.textContent = 'Mika open road (Ep 7.4 · EN)';
    mikaBtn.title = 'Highway pause · crew loyalty · preset 24 · dream-teleport heal';
    mikaBtn.onclick = () => practiceMikaRoadDreamer();
    actions.appendChild(mikaBtn);

    const haleyBtn = document.createElement('button');
    haleyBtn.type = 'button';
    haleyBtn.className = 'px-5 py-3 bg-rose-900/50 text-rose-200 rounded-2xl text-sm font-medium hover:bg-rose-800/70 ring-1 ring-rose-500/30';
    haleyBtn.textContent = 'Haley Boba justice (Ep 7.5 · EN/VI)';
    haleyBtn.title = 'vietbonnie · NCII report boundary · preset 25 · no re-share';
    haleyBtn.onclick = () => practiceHaleyVietbonnie();
    actions.appendChild(haleyBtn);

    const cinemaBtn = document.createElement('button');
    cinemaBtn.type = 'button';
    cinemaBtn.className = 'px-5 py-3 bg-blue-900/50 text-blue-200 rounded-2xl text-sm font-medium hover:bg-blue-800/70 ring-1 ring-blue-500/30';
    cinemaBtn.textContent = 'Bend It Like Beckham (Ep 2.64 · EN)';
    cinemaBtn.title = 'Cinema encounter · English fan · fast scene 30s · prelude to cantina';
    cinemaBtn.onclick = () => practiceCinemaBeckham();
    actions.appendChild(cinemaBtn);

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

    if (typeof getCicadaAttuneRitual === 'function') {
        const ritual = getCicadaAttuneRitual();
        if (ritual?.steps?.length) {
            const cicadaBlock = document.createElement('div');
            cicadaBlock.className = 'mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-sm';
            const cicadaTitle = document.createElement('p');
            cicadaTitle.className = 'text-amber-300 font-medium mb-2';
            cicadaTitle.textContent = ritual.label || 'Sua cicada attune';
            cicadaBlock.appendChild(cicadaTitle);
            const cicadaPhrase = document.createElement('p');
            cicadaPhrase.className = 'text-zinc-400 italic mb-3';
            const sp = ritual.shadowPhrase;
            const ap = ritual.attunePhrase;
            cicadaPhrase.textContent = sp
                ? `"${ritual.activation}" · ${ap?.ko || ''} · ${sp.ko || ''}`
                : ritual.activation;
            cicadaBlock.appendChild(cicadaPhrase);
            const steps = document.createElement('ol');
            steps.className = 'list-decimal list-inside space-y-1 text-zinc-300 mb-3';
            ritual.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                steps.appendChild(li);
            });
            cicadaBlock.appendChild(steps);
            const cicadaActions = document.createElement('div');
            cicadaActions.className = 'flex flex-wrap gap-2';
            const runCicada = document.createElement('button');
            runCicada.type = 'button';
            runCicada.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-600/30 text-amber-200 hover:bg-amber-600/50';
            runCicada.textContent = 'Run Sua cicada attune';
            runCicada.title = 'TTMIK.html?heal-factor=cicada-attune';
            runCicada.onclick = () => practiceCicadaAttune();
            cicadaActions.appendChild(runCicada);
            const attuneSua = document.createElement('button');
            attuneSua.type = 'button';
            attuneSua.className = 'px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/60';
            attuneSua.textContent = 'Attune → Sua lane';
            attuneSua.title = 'TTMIK.html?attune=1&lane=sua';
            attuneSua.onclick = () => practiceMatchAttune({ lane: 'sua', chainLane: true });
            cicadaActions.appendChild(attuneSua);
            cicadaBlock.appendChild(cicadaActions);
            panel.appendChild(cicadaBlock);
        }
    }

    if (typeof getTwitterFeedHealRitual === 'function') {
        const ritual = getTwitterFeedHealRitual();
        if (ritual?.steps?.length) {
            const feedBlock = document.createElement('div');
            feedBlock.className = 'mb-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 text-sm';
            const feedTitle = document.createElement('p');
            feedTitle.className = 'text-sky-300 font-medium mb-2';
            feedTitle.textContent = ritual.label || 'Twitter feed heal';
            feedBlock.appendChild(feedTitle);
            const feedPhrase = document.createElement('p');
            feedPhrase.className = 'text-zinc-400 italic mb-3';
            const sp = ritual.shadowPhrase;
            feedPhrase.textContent = sp
                ? `"${ritual.activation}" · ${sp.ko || ''}`
                : ritual.activation;
            feedBlock.appendChild(feedPhrase);
            const steps = document.createElement('ol');
            steps.className = 'list-decimal list-inside space-y-1 text-zinc-300 mb-3';
            ritual.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                steps.appendChild(li);
            });
            feedBlock.appendChild(steps);
            const feedActions = document.createElement('div');
            feedActions.className = 'flex flex-wrap gap-2';
            const runFeed = document.createElement('button');
            runFeed.type = 'button';
            runFeed.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-600/30 text-sky-200 hover:bg-sky-600/50';
            runFeed.textContent = 'Heal @adhdloganberry feed';
            runFeed.title = 'TTMIK.html?heal-factor=twitter-feed-heal';
            runFeed.onclick = () => practiceTwitterFeedHeal();
            feedActions.appendChild(runFeed);
            feedBlock.appendChild(feedActions);
            panel.appendChild(feedBlock);
        }
    }

    if (typeof getReiMercyHealRitual === 'function') {
        const ritual = getReiMercyHealRitual();
        if (ritual?.steps?.length) {
            const mercyBlock = document.createElement('div');
            mercyBlock.className = 'mb-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-sm';
            const mercyTitle = document.createElement('p');
            mercyTitle.className = 'text-violet-300 font-medium mb-2';
            mercyTitle.textContent = ritual.label || 'Rei mercy heal';
            mercyBlock.appendChild(mercyTitle);
            const mercyPhrase = document.createElement('p');
            mercyPhrase.className = 'text-zinc-400 italic mb-3';
            const sp = ritual.shadowPhrase;
            mercyPhrase.textContent = sp
                ? `"${ritual.activation}" · ${sp.ja || ''} · ${sp.ko || ''}`
                : ritual.activation;
            mercyBlock.appendChild(mercyPhrase);
            const steps = document.createElement('ol');
            steps.className = 'list-decimal list-inside space-y-1 text-zinc-300 mb-3';
            ritual.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                steps.appendChild(li);
            });
            mercyBlock.appendChild(steps);
            const mercyActions = document.createElement('div');
            mercyActions.className = 'flex flex-wrap gap-2';
            const runMercy = document.createElement('button');
            runMercy.type = 'button';
            runMercy.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
            runMercy.textContent = 'Run Rei mercy heal';
            runMercy.title = 'TTMIK.html?heal-factor=rei-mercy';
            runMercy.onclick = () => practiceReiMercyHeal();
            mercyActions.appendChild(runMercy);
            mercyBlock.appendChild(mercyActions);
            panel.appendChild(mercyBlock);
        }
    }

    if (typeof getMatchAttuneRitual === 'function') {
        const ritual = getMatchAttuneRitual();
        if (ritual?.steps?.length) {
            const attuneBlock = document.createElement('div');
            attuneBlock.className = 'mb-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-sm';
            const attuneTitle = document.createElement('p');
            attuneTitle.className = 'text-violet-300 font-medium mb-2';
            attuneTitle.textContent = ritual.label || 'Attune before match';
            attuneBlock.appendChild(attuneTitle);
            const attunePhrase = document.createElement('p');
            attunePhrase.className = 'text-zinc-400 italic mb-3';
            const sp = ritual.shadowPhrase;
            attunePhrase.textContent = sp
                ? `"${ritual.activation}" · ${sp.en} · ${sp.ko}`
                : ritual.activation;
            attuneBlock.appendChild(attunePhrase);
            const steps = document.createElement('ol');
            steps.className = 'list-decimal list-inside space-y-1 text-zinc-300 mb-3';
            ritual.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                steps.appendChild(li);
            });
            attuneBlock.appendChild(steps);
            const attuneActions = document.createElement('div');
            attuneActions.className = 'flex flex-wrap gap-2';
            const runAttune = document.createElement('button');
            runAttune.type = 'button';
            runAttune.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
            runAttune.textContent = 'Run attune ritual';
            runAttune.onclick = () => practiceMatchAttune();
            attuneActions.appendChild(runAttune);
            if (ritual.lanes) {
                Object.entries(ritual.lanes).forEach(([laneId, lane]) => {
                    const laneBtn = document.createElement('button');
                    laneBtn.type = 'button';
                    laneBtn.className = 'px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/60';
                    laneBtn.textContent = lane.label || laneId;
                    laneBtn.title = `TTMIK.html?attune=1&lane=${laneId}`;
                    laneBtn.onclick = () => practiceMatchAttune({ lane: laneId, chainLane: true });
                    attuneActions.appendChild(laneBtn);
                });
            }
            attuneBlock.appendChild(attuneActions);
            panel.appendChild(attuneBlock);
        }
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
        const healAllRun = document.createElement('button');
        healAllRun.type = 'button';
        healAllRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-600/50 text-white hover:bg-sky-600/70';
        healAllRun.textContent = 'Heal all lane';
        healAllRun.title = 'Post-DIB → Rei mercy → Asuka → Ignan → FIFA → attune · TTMIK.html?heal=all';
        healAllRun.onclick = () => practiceHealAll({ logAllQuests: true });
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
        const attuneRun = document.createElement('button');
        attuneRun.type = 'button';
        attuneRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
        attuneRun.textContent = 'Attune before match';
        attuneRun.title = 'Federation pause · one breath before cheer · TTMIK.html?attune=1';
        attuneRun.onclick = () => practiceMatchAttune();
        const reiMercyRun = document.createElement('button');
        reiMercyRun.type = 'button';
        reiMercyRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
        reiMercyRun.textContent = 'Rei mercy heal';
        reiMercyRun.title = 'NERV pause · observe without absorbing · TTMIK.html?heal-factor=rei-mercy';
        reiMercyRun.onclick = () => practiceReiMercyHeal();
        const healLibRun = document.createElement('button');
        healLibRun.type = 'button';
        healLibRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-800/40 text-sky-100 hover:bg-sky-700/50';
        healLibRun.textContent = 'Open Healing Factors Library';
        healLibRun.onclick = () => startHealCategory('Post-DIB Landing');
        healActions.appendChild(healAllRun);
        healActions.appendChild(healRun);
        healActions.appendChild(ignanRun);
        healActions.appendChild(attuneRun);
        healActions.appendChild(reiMercyRun);
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
        const isSven = skill.id === 'sven-nordic-ranger';
        const isMartin = skill.id === 'martin-nordic-guide';
        const isRonaldo = skill.id === 'ronaldo-portugal-glory';
        const isMbappe = skill.id === 'mbappe-france-attack';
        const isMessi = skill.id === 'messi-argentina-playmaker';
        const isVinicus = skill.id === 'vinicus-brasil-samba';
        const isKane = skill.id === 'harry-kane-england-striker';
        const ringActive = isIgnan
            ? 'ring-emerald-500 hover:ring-emerald-400'
            : isAsuka
                ? 'ring-rose-500 hover:ring-rose-400'
                : isHeidi
                    ? 'ring-yellow-500 hover:ring-yellow-400'
                    : isSven
                        ? 'ring-cyan-500 hover:ring-cyan-400'
                        : isMartin
                            ? 'ring-indigo-500 hover:ring-indigo-400'
                            : isRonaldo
                                ? 'ring-orange-500 hover:ring-orange-400'
                                : isMbappe
                                    ? 'ring-sky-500 hover:ring-sky-400'
                                    : isMessi
                                        ? 'ring-emerald-500 hover:ring-emerald-400'
                                        : isVinicus
                                            ? 'ring-lime-500 hover:ring-lime-400'
                                            : isKane
                                                ? 'ring-rose-500 hover:ring-rose-400'
                                                : 'ring-pink-500 hover:ring-pink-400';
        const ringIdle = isIgnan
            ? 'hover:ring-emerald-500/50'
            : isAsuka
                ? 'hover:ring-rose-500/50'
                : isHeidi
                    ? 'hover:ring-yellow-500/50'
                    : isSven
                        ? 'hover:ring-cyan-500/50'
                        : isMartin
                            ? 'hover:ring-indigo-500/50'
                            : isRonaldo
                                ? 'hover:ring-orange-500/50'
                                : isMbappe
                                    ? 'hover:ring-sky-500/50'
                                    : isMessi
                                        ? 'hover:ring-emerald-500/50'
                                        : isVinicus
                                            ? 'hover:ring-lime-500/50'
                                            : isKane
                                                ? 'hover:ring-rose-500/50'
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
                        : isSven
                            ? 'inline-block mt-3 text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full'
                            : isMartin
                                ? 'inline-block mt-3 text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full'
                                : isRonaldo
                                    ? 'inline-block mt-3 text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full'
                                    : isMbappe
                                        ? 'inline-block mt-3 text-xs bg-sky-500/20 text-sky-300 px-2 py-1 rounded-full'
                                        : isMessi
                                            ? 'inline-block mt-3 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full'
                                            : isVinicus
                                                ? 'inline-block mt-3 text-xs bg-lime-500/20 text-lime-300 px-2 py-1 rounded-full'
                                                : isKane
                                                    ? 'inline-block mt-3 text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded-full'
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

    if (skill.id === 'sven-nordic-ranger') {
        const svenBlock = document.createElement('div');
        svenBlock.className = 'mb-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-cyan-300 mb-2';
        label.textContent = 'Swedish native input · Ep 7 · Fast Character';
        svenBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.sv, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        svenBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-cyan-600/30 text-cyan-200 hover:bg-cyan-600/50 mr-2';
        runBtn.textContent = 'Invoke Sven ranger (SV → KO)';
        runBtn.onclick = () => practiceSvenRanger();
        svenBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Sven sheet';
        sheetBtn.title = 'fastcharacter.com · Ranger Fey Wanderer · Outlander · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterSven === 'function') openFastCharacterSven();
        };
        svenBlock.appendChild(sheetBtn);
        panel.appendChild(svenBlock);
    }

    if (skill.id === 'martin-nordic-guide') {
        const martinBlock = document.createElement('div');
        martinBlock.className = 'mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-indigo-300 mb-2';
        label.textContent = 'Norwegian native input · Ep 8 · Fast Character';
        martinBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.no, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        martinBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50 mr-2';
        runBtn.textContent = 'Invoke Martin guide (NO → KO)';
        runBtn.onclick = () => practiceMartinGuide();
        martinBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Martin sheet';
        sheetBtn.title = 'fastcharacter.com · Barbarian World Tree · Guide · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterMartin === 'function') openFastCharacterMartin();
        };
        martinBlock.appendChild(sheetBtn);
        panel.appendChild(martinBlock);
    }

    if (skill.id === 'ronaldo-portugal-glory') {
        const cinemaBlock = document.createElement('div');
        cinemaBlock.className = 'mb-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4';
        const cinemaLabel = document.createElement('h4');
        cinemaLabel.className = 'text-xs uppercase tracking-widest text-blue-300 mb-2';
        cinemaLabel.textContent = 'Cinema encounter · Bend It Like Beckham · English fan';
        cinemaBlock.appendChild(cinemaLabel);
        const cinemaNote = document.createElement('p');
        cinemaNote.className = 'text-sm text-zinc-400 mb-3';
        cinemaNote.textContent = 'Ep 2.64 fast scene 30s — English fan first, Portuguese reply, Korean shadow — handoff to cantina.';
        cinemaBlock.appendChild(cinemaNote);
        const cinemaRun = document.createElement('button');
        cinemaRun.type = 'button';
        cinemaRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-blue-600/30 text-blue-200 hover:bg-blue-600/50';
        cinemaRun.textContent = 'Open cinema encounter (EN → PT → KO)';
        cinemaRun.onclick = () => practiceCinemaBeckham();
        cinemaBlock.appendChild(cinemaRun);
        panel.appendChild(cinemaBlock);

        const ronaldoBlock = document.createElement('div');
        ronaldoBlock.className = 'mb-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-orange-300 mb-2';
        label.textContent = 'Portuguese native input · Ep 2.65 · Fast Character';
        ronaldoBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.pt, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        ronaldoBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-orange-600/30 text-orange-200 hover:bg-orange-600/50 mr-2';
        runBtn.textContent = 'Invoke Ronaldo glory (PT → KO)';
        runBtn.onclick = () => practiceRonaldoGlory();
        ronaldoBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Ronaldo sheet';
        sheetBtn.title = 'fastcharacter.com · Paladin Glory · Entertainer · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterRonaldo === 'function') openFastCharacterRonaldo();
        };
        ronaldoBlock.appendChild(sheetBtn);
        panel.appendChild(ronaldoBlock);
    }

    if (skill.id === 'mbappe-france-attack') {
        const mbappeBlock = document.createElement('div');
        mbappeBlock.className = 'mb-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-sky-300 mb-2';
        label.textContent = 'French native input · Ep 2.66 · Fast Character';
        mbappeBlock.appendChild(label);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.fr, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        mbappeBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-sky-600/30 text-sky-200 hover:bg-sky-600/50 mr-2';
        runBtn.textContent = 'Invoke Mbappé attack (FR → KO)';
        runBtn.onclick = () => practiceMbappeAttack();
        mbappeBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Mbappé sheet';
        sheetBtn.title = 'fastcharacter.com · Fighter Battle Master · Soldier · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterMbappe === 'function') openFastCharacterMbappe();
        };
        mbappeBlock.appendChild(sheetBtn);
        panel.appendChild(mbappeBlock);
    }

    if (skill.id === 'messi-argentina-playmaker') {
        const messiBlock = document.createElement('div');
        messiBlock.className = 'mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-emerald-300 mb-2';
        label.textContent = 'Argentine Spanish · Ep 2.76 · After cook-off';
        messiBlock.appendChild(label);
        const note = document.createElement('p');
        note.className = 'text-sm text-zinc-400 mb-3';
        note.textContent = 'Plates down at HOTEL → Degraves stroll → La Boca screen. Not a date. No performance invoice.';
        messiBlock.appendChild(note);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.es, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        messiBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600/30 text-emerald-200 hover:bg-emerald-600/50 mr-2';
        runBtn.textContent = 'Invoke Messi playmaker (ES → KO)';
        runBtn.onclick = () => practiceMessiPlaymaker();
        messiBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Messi sheet';
        sheetBtn.title = 'fastcharacter.com · Rogue Mastermind · Urchin · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterMessi === 'function') openFastCharacterMessi();
        };
        messiBlock.appendChild(sheetBtn);
        panel.appendChild(messiBlock);
    }

    if (skill.id === 'vinicus-brasil-samba') {
        const vinicusBlock = document.createElement('div');
        vinicusBlock.className = 'mb-6 bg-lime-500/10 border border-lime-500/20 rounded-2xl p-4';
        const label = document.createElement('h4');
        label.className = 'text-xs uppercase tracking-widest text-lime-300 mb-2';
        label.textContent = 'Brazilian Portuguese · Ep 2.77 · Samba jogo bonito';
        vinicusBlock.appendChild(label);
        const note = document.createElement('p');
        note.className = 'text-sm text-zinc-400 mb-3';
        note.textContent = 'After La Boca → Federation samba screen → laneway stroll. Jogo bonito not a date invoice.';
        vinicusBlock.appendChild(note);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.pt, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        vinicusBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-lime-600/30 text-lime-200 hover:bg-lime-600/50 mr-2';
        runBtn.textContent = 'Invoke Vinicus samba (PT-BR → KO)';
        runBtn.onclick = () => practiceVinicusSamba();
        vinicusBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Vinicus sheet';
        sheetBtn.title = 'fastcharacter.com · Monk Open Hand · Entertainer · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterVinicus === 'function') openFastCharacterVinicus();
        };
        vinicusBlock.appendChild(sheetBtn);
        panel.appendChild(vinicusBlock);
    }

    if (skill.id === 'harry-kane-england-striker') {
        const kaneBlock = document.createElement('div');
        kaneBlock.className = 'mb-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4';
        const kaneLabel = document.createElement('h4');
        kaneLabel.className = 'text-xs uppercase tracking-widest text-rose-300 mb-2';
        kaneLabel.textContent = 'Three Lions striker · Harry Kane · England';
        kaneBlock.appendChild(kaneLabel);
        const note = document.createElement('p');
        note.className = 'text-sm text-zinc-400 mb-3';
        note.textContent = 'After Brasil samba → Wembley screen → pub pause. Captain cheer not a date invoice.';
        kaneBlock.appendChild(note);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.en, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        kaneBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-rose-600/30 text-rose-200 hover:bg-rose-600/50 mr-2';
        runBtn.textContent = 'Invoke Kane striker (EN → KO)';
        runBtn.onclick = () => practiceHarryKaneStriker();
        kaneBlock.appendChild(runBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Kane sheet';
        sheetBtn.title = 'fastcharacter.com · Fighter Champion · Soldier · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterKane === 'function') openFastCharacterKane();
        };
        kaneBlock.appendChild(sheetBtn);
        const watchBtn = document.createElement('button');
        watchBtn.type = 'button';
        watchBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-rose-900/40 text-rose-100 hover:bg-rose-800/50 ml-2';
        watchBtn.textContent = 'Open FIFA+ watch';
        watchBtn.title = 'Wembley screen · FIFA+ England clip';
        watchBtn.onclick = () => {
            if (typeof openKaneFifaWatch === 'function') openKaneFifaWatch();
        };
        kaneBlock.appendChild(watchBtn);
        panel.appendChild(kaneBlock);
    }

    if (skill.id === 'sua-tattoo') {
        const suaBlock = document.createElement('div');
        suaBlock.className = 'mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4';
        const suaLabel = document.createElement('h4');
        suaLabel.className = 'text-xs uppercase tracking-widest text-amber-300 mb-2';
        suaLabel.textContent = 'Sua Tattoo · Cicada attune · FED shedding pause';
        suaBlock.appendChild(suaLabel);
        const note = document.createElement('p');
        note.className = 'text-sm text-zinc-400 mb-3';
        note.textContent = 'Attune at Federation → shed old skin at Hosier. Release the flame with gratitude — not re-contact.';
        suaBlock.appendChild(note);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.ko, p.en].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        suaBlock.appendChild(deck);
        const cicadaBtn = document.createElement('button');
        cicadaBtn.type = 'button';
        cicadaBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-600/30 text-amber-200 hover:bg-amber-600/50 mr-2';
        cicadaBtn.textContent = 'Sua cicada attune';
        cicadaBtn.title = '새 껍질을 벗을게요 · TTMIK.html?heal-factor=cicada-attune';
        cicadaBtn.onclick = () => practiceCicadaAttune();
        suaBlock.appendChild(cicadaBtn);
        const attuneBtn = document.createElement('button');
        attuneBtn.type = 'button';
        attuneBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50';
        attuneBtn.textContent = 'Attune → Sua lane';
        attuneBtn.title = 'TTMIK.html?attune=1&lane=sua';
        attuneBtn.onclick = () => practiceMatchAttune({ lane: 'sua', chainLane: true });
        suaBlock.appendChild(attuneBtn);
        panel.appendChild(suaBlock);
    }

    if (skill.id === 'neon-evangelion') {
        const neonBlock = document.createElement('div');
        neonBlock.className = 'mb-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4';
        const neonLabel = document.createElement('h4');
        neonLabel.className = 'text-xs uppercase tracking-widest text-violet-300 mb-2';
        neonLabel.textContent = 'Neon Evangelion · Ep 7.1 · Moon-card observe';
        neonBlock.appendChild(neonLabel);
        const note = document.createElement('p');
        note.className = 'text-sm text-zinc-400 mb-3';
        note.textContent = 'NERV pause → SOUTH neon railing → observe without absorbing. Installs Veil neon + NERV background.';
        neonBlock.appendChild(note);
        const deck = document.createElement('ul');
        deck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.ja, p.ko].filter(Boolean).join(' · ');
            deck.appendChild(li);
        });
        neonBlock.appendChild(deck);
        const runBtn = document.createElement('button');
        runBtn.type = 'button';
        runBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50 mr-2';
        runBtn.textContent = 'Invoke Neon Evangelion (JA → KO)';
        runBtn.onclick = () => practiceNeonEvangelion();
        neonBlock.appendChild(runBtn);
        const mercyBtn = document.createElement('button');
        mercyBtn.type = 'button';
        mercyBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/30 text-violet-200 hover:bg-violet-600/50 mr-2';
        mercyBtn.textContent = 'Rei mercy heal';
        mercyBtn.title = '観測するだけ。吸収しない。 · TTMIK.html?heal-factor=rei-mercy';
        mercyBtn.onclick = () => practiceReiMercyHeal();
        neonBlock.appendChild(mercyBtn);
        const lookBtn = document.createElement('button');
        lookBtn.type = 'button';
        lookBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-violet-900/40 text-violet-100 hover:bg-violet-800/50 mr-2';
        lookBtn.textContent = 'Install neon look';
        lookBtn.title = 'Veil Lumen · outfit neon · background nerv';
        lookBtn.onclick = () => {
            if (typeof installNeonEvangelionLook === 'function') installNeonEvangelionLook();
        };
        neonBlock.appendChild(lookBtn);
        const sheetBtn = document.createElement('button');
        sheetBtn.type = 'button';
        sheetBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        sheetBtn.textContent = 'Create Rei Ayanami sheet';
        sheetBtn.title = 'fastcharacter.com · Rei · Cleric Life · Hermit · Level 5';
        sheetBtn.onclick = () => {
            if (typeof openFastCharacterRei === 'function') openFastCharacterRei();
        };
        neonBlock.appendChild(sheetBtn);
        panel.appendChild(neonBlock);
    }

    if (skill.id === 'rick-morty-multiverse') {
        const rmBlock = document.createElement('div');
        rmBlock.className = 'mb-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl p-4';
        const rmLabel = document.createElement('h4');
        rmLabel.className = 'text-xs uppercase tracking-widest text-teal-300 mb-2';
        rmLabel.textContent = 'Rick & Morty Multiverse · Ep 7.2 · Citadel SQL';
        rmBlock.appendChild(rmLabel);
        const rmNote = document.createElement('p');
        rmNote.className = 'text-sm text-zinc-400 mb-3';
        rmNote.textContent = 'CITADEL portal → CABLE clip → SOUTH return. PostgreSQL rickmorty schema · index without absorbing.';
        rmBlock.appendChild(rmNote);
        const rmDeck = document.createElement('ul');
        rmDeck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.en, p.ko].filter(Boolean).join(' · ');
            rmDeck.appendChild(li);
        });
        rmBlock.appendChild(rmDeck);
        const rmRun = document.createElement('button');
        rmRun.type = 'button';
        rmRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-teal-600/30 text-teal-200 hover:bg-teal-600/50 mr-2';
        rmRun.textContent = 'Invoke multiverse lane (EN → KO)';
        rmRun.onclick = () => practiceRickMortyMultiverse();
        rmBlock.appendChild(rmRun);
        const sqlBtn = document.createElement('button');
        sqlBtn.type = 'button';
        sqlBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-teal-600/30 text-teal-200 hover:bg-teal-600/50 mr-2';
        sqlBtn.textContent = 'Multiverse SQL heal';
        sqlBtn.title = 'TTMIK.html?heal-factor=multiverse-query';
        sqlBtn.onclick = () => practiceHealingFactor('multiverse-query');
        rmBlock.appendChild(sqlBtn);
        const rickSheet = document.createElement('button');
        rickSheet.type = 'button';
        rickSheet.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        rickSheet.textContent = 'Create Rick sheet';
        rickSheet.title = 'fastcharacter.com · Rick · Artificer · Sage · Level 5';
        rickSheet.onclick = () => {
            if (typeof openFastCharacterRick === 'function') openFastCharacterRick();
        };
        rmBlock.appendChild(rickSheet);
        panel.appendChild(rmBlock);
    }

    if (skill.id === 'mika-road-dreamer') {
        const mikaBlock = document.createElement('div');
        mikaBlock.className = 'mb-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4';
        const mikaLabel = document.createElement('h4');
        mikaLabel.className = 'text-xs uppercase tracking-widest text-orange-300 mb-2';
        mikaLabel.textContent = 'Mika Open Road · Ep 7.4 · crew loyalty';
        mikaBlock.appendChild(mikaLabel);
        const mikaNote = document.createElement('p');
        mikaNote.className = 'text-sm text-zinc-400 mb-3';
        mikaNote.textContent = 'OPEN highway → HOSIER cheer → DEGRAVES dream stop. Heartbeat · soundtrack · dream-teleport pivot.';
        mikaBlock.appendChild(mikaNote);
        const mikaDeck = document.createElement('ul');
        mikaDeck.className = 'space-y-2 text-sm text-zinc-300 mb-3';
        skill.shadowingPhrases?.forEach(p => {
            const li = document.createElement('li');
            li.textContent = [p.en, p.ko].filter(Boolean).join(' · ');
            mikaDeck.appendChild(li);
        });
        mikaBlock.appendChild(mikaDeck);
        const mikaRun = document.createElement('button');
        mikaRun.type = 'button';
        mikaRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-orange-600/30 text-orange-200 hover:bg-orange-600/50 mr-2';
        mikaRun.textContent = 'Invoke open road lane (EN → KO)';
        mikaRun.onclick = () => practiceMikaRoadDreamer();
        mikaBlock.appendChild(mikaRun);
        const openRoadBtn = document.createElement('button');
        openRoadBtn.type = 'button';
        openRoadBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-orange-600/30 text-orange-200 hover:bg-orange-600/50 mr-2';
        openRoadBtn.textContent = 'Open road heal';
        openRoadBtn.title = 'TTMIK.html?heal-factor=open-road';
        openRoadBtn.onclick = () => practiceHealingFactor('open-road');
        mikaBlock.appendChild(openRoadBtn);
        const dreamBtn = document.createElement('button');
        dreamBtn.type = 'button';
        dreamBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-orange-600/30 text-orange-200 hover:bg-orange-600/50 mr-2';
        dreamBtn.textContent = 'Dream teleport pivot';
        dreamBtn.title = 'TTMIK.html?heal-factor=dream-teleport';
        dreamBtn.onclick = () => practiceHealingFactor('dream-teleport');
        mikaBlock.appendChild(dreamBtn);
        const mikaSheet = document.createElement('button');
        mikaSheet.type = 'button';
        mikaSheet.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50';
        mikaSheet.textContent = 'Create Mika sheet';
        mikaSheet.title = 'fastcharacter.com · Mika · Ranger Horizon Walker · Outlander · Level 5';
        mikaSheet.onclick = () => {
            if (typeof openFastCharacterMika === 'function') openFastCharacterMika();
        };
        mikaBlock.appendChild(mikaSheet);
        panel.appendChild(mikaBlock);
    }

    if (skill.id === 'haley-vietbonnie') {
        const haleyBlock = document.createElement('div');
        haleyBlock.className = 'mb-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4';
        const haleyLabel = document.createElement('h4');
        haleyLabel.className = 'text-xs uppercase tracking-widest text-rose-300 mb-2';
        haleyLabel.textContent = 'Haley Boba · Medea Caster mirror · Ep 7.5';
        haleyBlock.appendChild(haleyLabel);
        const haleyNote = document.createElement('p');
        haleyNote.className = 'text-sm text-zinc-400 mb-3';
        haleyNote.textContent = 'Territory Creation → Item Construction → Rule Breaker → Circe close. STR E · MAN A+ · document · report · no re-share.';
        haleyBlock.appendChild(haleyNote);
        const haleyRun = document.createElement('button');
        haleyRun.type = 'button';
        haleyRun.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-rose-600/30 text-rose-200 hover:bg-rose-600/50 mr-2 mb-2';
        haleyRun.textContent = 'Run justice seek';
        haleyRun.onclick = () => practiceHaleyVietbonnie();
        haleyBlock.appendChild(haleyRun);
        const medeaSkills = typeof HALEY_MEDEA_SKILLS !== 'undefined' ? HALEY_MEDEA_SKILLS : [];
        medeaSkills.forEach((s) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-900/40 text-purple-200 hover:bg-purple-800/50 mr-2 mb-2';
            btn.textContent = `${s.name} [${s.rank}]`;
            btn.title = `TTMIK.html?heal-factor=${s.healFactor}`;
            btn.onclick = () => practiceHealingFactor(s.healFactor);
            haleyBlock.appendChild(btn);
        });
        const haleySheet = document.createElement('button');
        haleySheet.type = 'button';
        haleySheet.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-zinc-700/50 text-zinc-200 hover:bg-zinc-600/50 mt-1';
        haleySheet.textContent = 'Create Haley sheet';
        haleySheet.title = 'fastcharacter.com · Haley · Wizard Abjurer · Sage · Medea Caster mirror';
        haleySheet.onclick = () => {
            if (typeof openFastCharacterHaley === 'function') openFastCharacterHaley();
        };
        haleyBlock.appendChild(haleySheet);
        panel.appendChild(haleyBlock);
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
    if (typeof getHermesPreloadCmd === 'function') {
        const preloadBtn = document.createElement('button');
        preloadBtn.type = 'button';
        preloadBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800/70';
        preloadBtn.textContent = `Hermes preload (${HERMES_PRELOAD_SKILL_IDS.length})`;
        preloadBtn.title = getHermesPreloadCmd();
        preloadBtn.onclick = () => copyToClipboard(getHermesPreloadCmd());
        bootActions.appendChild(preloadBtn);
    }
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
        else if (lib.accent === 'yellow') title.className += ' text-yellow-300';
        else if (lib.accent === 'cyan') title.className += ' text-cyan-300';
        else if (lib.accent === 'indigo') title.className += ' text-indigo-300';
        else if (lib.accent === 'orange') title.className += ' text-orange-300';
        else if (lib.accent === 'emerald') title.className += ' text-emerald-300';
        else if (lib.accent === 'lime') title.className += ' text-lime-300';
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