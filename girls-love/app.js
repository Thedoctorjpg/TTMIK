const nameAInput = document.getElementById('nameA');
const nameBInput = document.getElementById('nameB');
const settingInput = document.getElementById('setting');
const keywordsInput = document.getElementById('keywords');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const storyOutput = document.getElementById('storyOutput');
const storyStatus = document.getElementById('storyStatus');

const goddessArchetypes = [
  'roadside oracle',
  'neon priestess',
  'diner goddess',
  'highway weaver',
  'secret shrine keeper',
];

const scenes = [
  (names, setting, mood) =>
    `${names.A} felt the highway hum beneath her as she steered toward ${setting}. She carried a quiet certainty that the world had shifted just enough for something impossible to begin.`,

  (names, setting, mood) =>
    `${names.B} lit a candle in a laundromat shrine, the smoke dancing like a whispered promise. She smiled because every ritual she built was also a message for ${names.A}.`,

  (names, setting, mood) =>
    `The night was a blend of neon and warm asphalt. They talked about old legends, new heartbreaks, and the possibility that a modern goddess could be born between two hands that learned to trust each other.`,

  (names, setting, mood) =>
    `In the shared silence, ${names.A} and ${names.B} made the strange, sacred choice to become each other’s home. It was less a declaration than a steady act of showing up, again and again.`,
];

const tropeNotes = {
  'road trip': 'A highway pilgrimage gives the romance a moving, cinematic quality.',
  'modern goddess': 'The old gods have become modern women with unexpected power.',
  'secret shrine': 'A private ritual space makes their connection feel sacred and intimate.',
  'food truck': 'Ordinary tasks become magical when they are shared.',
  'late night coding': 'Soft, focused moments build trust and reveal hidden vulnerability.',
};

function buildStory() {
  const nameA = nameAInput.value.trim() || 'Mara';
  const nameB = nameBInput.value.trim() || 'June';
  const setting = settingInput.value.trim() || 'the Oklahoma highway and a hidden desert shrine';
  const keywords = keywordsInput.value.trim() || 'warm, tender, restless';

  const selectedTropes = Array.from(document.querySelectorAll('fieldset input[type="checkbox"]:checked')).map(
    (checkbox) => checkbox.value,
  );

  const goddess = goddessArchetypes[Math.floor(Math.random() * goddessArchetypes.length)];
  const mood = keywords.split(',').map((word) => word.trim()).filter(Boolean).join(', ');

  const opening = `On a late summer night, ${nameA} and ${nameB} were drawn together by a shared myth: a ${goddess} waiting for the right pair to unlock it.`;
  const middle = scenes[Math.floor(Math.random() * scenes.length)]({ A: nameA, B: nameB }, setting, mood);
  const third = `They built a quiet world from fragments of ${selectedTropes.join(', ')}. Every ordinary detail became a spell: a diner order, a candle breath, a promise whispered into the dark.`;
  const ending = `By the time dawn painted the horizon, they understood that love in this story was not only a feeling. It was a choice to keep the shrine alive together.`;

  const tropeSection = selectedTropes.length
    ? `\n\nTropes chosen:\n${selectedTropes.map((trope) => `- ${tropeNotes[trope] || trope}`).join('\n')}`
    : '\n\nTropes chosen:\n- A subtle, atmosphere-driven bond that blooms in shared creativity and myth.';

  return `${opening}\n\n${middle}\n\n${third}\n\n${ending}\n\nKeywords: ${mood}${tropeSection}`;
}

generateBtn.addEventListener('click', () => {
  const story = buildStory();
  storyOutput.textContent = story;
  storyStatus.textContent = 'Story generated';
});

copyBtn.addEventListener('click', async () => {
  const story = storyOutput.textContent.trim();
  if (!story) {
    storyStatus.textContent = 'Nothing to copy yet';
    return;
  }

  try {
    await navigator.clipboard.writeText(story);
    storyStatus.textContent = 'Copied to clipboard';
  } catch (error) {
    storyStatus.textContent = 'Copy failed — use browser copy';
  }
});
