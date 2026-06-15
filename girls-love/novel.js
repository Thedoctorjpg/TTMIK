import {
  NOVEL_META,
  GIRLS,
  BARD,
  ROMANCE_TROPES,
  CHAPTERS,
  buildChapterContext,
  renderChapter,
  allChapterText
} from './data/afterTheDate.js';

const winnerSelect = document.getElementById('winnerSelect');
const focusSelect = document.getElementById('focusSelect');
const tropeSelect = document.getElementById('tropeSelect');
const readerNameInput = document.getElementById('readerName');
const chapterList = document.getElementById('chapterList');
const novelTitle = document.getElementById('novelTitle');
const novelMeta = document.getElementById('novelMeta');
const chapterHeading = document.getElementById('chapterHeading');
const chapterTime = document.getElementById('chapterTime');
const chapterBody = document.getElementById('chapterBody');
const novelStatus = document.getElementById('novelStatus');
const readChapterBtn = document.getElementById('readChapterBtn');
const readAllBtn = document.getElementById('readAllBtn');
const copyNovelBtn = document.getElementById('copyNovelBtn');
const prevChapterBtn = document.getElementById('prevChapterBtn');
const nextChapterBtn = document.getElementById('nextChapterBtn');

let activeChapterIndex = 0;

function populateSelects() {
  GIRLS.forEach((girl) => {
    const opt = document.createElement('option');
    opt.value = girl.id;
    opt.textContent = `${girl.emoji} ${girl.name} — ${girl.dish}`;
    winnerSelect.appendChild(opt);
  });

  const focusOptions = [
    { id: 'you', label: '✨ You (second person)' },
    { id: 'bard', label: `${BARD.emoji} ${BARD.name}` },
    ...GIRLS.map((g) => ({ id: g.id, label: `${g.emoji} ${g.name}` }))
  ];

  focusOptions.forEach((item) => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.label;
    focusSelect.appendChild(opt);
  });

  ROMANCE_TROPES.forEach((trope) => {
    const opt = document.createElement('option');
    opt.value = trope.id;
    opt.textContent = trope.label;
    tropeSelect.appendChild(opt);
  });
}

function getContext() {
  return buildChapterContext({
    winnerId: winnerSelect.value,
    focusId: focusSelect.value,
    tropeId: tropeSelect.value,
    readerName: readerNameInput.value.trim() || 'you'
  });
}

function renderChapterList() {
  chapterList.innerHTML = '';
  CHAPTERS.forEach((ch, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = index === activeChapterIndex ? 'chapter-pill active' : 'chapter-pill';
    btn.textContent = `${ch.number}. ${ch.title}`;
    btn.addEventListener('click', () => {
      activeChapterIndex = index;
      renderChapterList();
      displayChapter();
    });
    chapterList.appendChild(btn);
  });
}

function displayChapter() {
  const chapter = CHAPTERS[activeChapterIndex];
  const context = getContext();
  const body = renderChapter(chapter, context);

  novelTitle.textContent = NOVEL_META.title;
  novelMeta.textContent = `${NOVEL_META.subtitle} · ${NOVEL_META.venue}`;
  chapterHeading.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
  chapterTime.textContent = chapter.time;
  chapterBody.textContent = body;
  novelStatus.textContent = `POV: ${context.focus.name} · Winner: ${context.winner.name}`;

  prevChapterBtn.disabled = activeChapterIndex === 0;
  nextChapterBtn.disabled = activeChapterIndex === CHAPTERS.length - 1;
}

function displayFullNovel() {
  const context = getContext();
  novelTitle.textContent = NOVEL_META.title;
  novelMeta.textContent = `${NOVEL_META.subtitle} · ${NOVEL_META.korean}`;
  chapterHeading.textContent = 'Full novel — After the Date';
  chapterTime.textContent = 'Four chapters · Degraves cook-off aftermath';
  chapterBody.textContent = allChapterText(context);
  novelStatus.textContent = 'Full read generated';
  prevChapterBtn.disabled = true;
  nextChapterBtn.disabled = true;
}

populateSelects();
renderChapterList();
displayChapter();

readChapterBtn.addEventListener('click', displayChapter);
readAllBtn.addEventListener('click', displayFullNovel);

prevChapterBtn.addEventListener('click', () => {
  if (activeChapterIndex > 0) {
    activeChapterIndex -= 1;
    renderChapterList();
    displayChapter();
  }
});

nextChapterBtn.addEventListener('click', () => {
  if (activeChapterIndex < CHAPTERS.length - 1) {
    activeChapterIndex += 1;
    renderChapterList();
    displayChapter();
  }
});

[winnerSelect, focusSelect, tropeSelect, readerNameInput].forEach((el) => {
  el.addEventListener('change', displayChapter);
  el.addEventListener('input', displayChapter);
});

copyNovelBtn.addEventListener('click', async () => {
  const text = chapterBody.textContent.trim();
  if (!text) {
    novelStatus.textContent = 'Nothing to copy yet';
    return;
  }
  try {
    await navigator.clipboard.writeText(
      `${NOVEL_META.title}\n${chapterHeading.textContent}\n${chapterTime.textContent}\n\n${text}`
    );
    novelStatus.textContent = 'Copied to clipboard';
  } catch {
    novelStatus.textContent = 'Copy failed — use browser copy';
  }
});