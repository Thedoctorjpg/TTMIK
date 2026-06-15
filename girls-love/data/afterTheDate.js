/**
 * After the Date — romance novel continuation
 * Picks up after the Degraves cook-off (lets-cook date night)
 */

export const NOVEL_META = {
  title: 'After the Date',
  subtitle: 'A Melbourne Lantern romance',
  tagline: 'The cook-off ended. The kitchen cooled. Something softer stayed.',
  venue: 'Degraves Street → Flinders Lane flat',
  letsCookUrl: 'http://localhost:5173/date-night',
  korean: '멜버른 골목이 정말 예뻐요 — the morning-after edition.'
};

export const GIRLS = [
  {
    id: 'lo3tus',
    name: 'Lo3tus',
    emoji: '🌸',
    color: '#f9a8d4',
    archetype: 'Chaotic muse',
    romanceNote: 'Says it was "just skewers" while saving your plate in her camera roll.',
    dish: 'Chaos Caprese Skewers'
  },
  {
    id: 'helen',
    name: 'Helen',
    emoji: '🛡️',
    color: '#60a5fa',
    archetype: 'Boundary teacher',
    romanceNote: 'Offers tea before feelings. Means both.',
    dish: 'Boundary Miso-Ginger Soup'
  },
  {
    id: 'asuka',
    name: 'Asuka',
    emoji: '💚',
    color: '#4ade80',
    archetype: 'Beautiful maybe',
    romanceNote: 'Leaves one posset unnamed — like a text she has not sent.',
    dish: 'Maybe-Yes Lemon Posset'
  },
  {
    id: 'rach3l',
    name: 'Rach3l',
    emoji: '🌙',
    color: '#a78bfa',
    archetype: 'Moon card observer',
    romanceNote: 'Honey on toast, phone face-down, eyes on you.',
    dish: 'Moon Card Midnight Toast'
  }
];

export const BARD = {
  name: 'Melbourne Lantern Bard',
  emoji: '🏮',
  narratorLine: 'I am not narrating a romance. I am documenting a cook-off aftermath. HR is watching.'
};

export const ROMANCE_TROPES = [
  { id: 'slow-burn', label: 'Slow burn', note: 'Feelings arrive late, honest, and without invoice.' },
  { id: 'tsundere', label: 'Tsundere denial', note: '"This is NOT a date" said while passing you a napkin.' },
  { id: 'found-family', label: 'Found family', note: 'Four women, one kitchen, zero rescue missions.' },
  { id: 'laneway-magic', label: 'Laneway magic', note: 'Golden hour on Degraves makes everyone brave.' },
  { id: 'soft-pov', label: 'Soft second-person', note: 'You are in the scene. Boundaries intact.' }
];

export const CHAPTERS = [
  {
    id: 'ch1',
    number: 1,
    title: 'Plates Down, Hearts Loud',
    time: '11:47 PM · same night',
    summary: 'The cook-off scores are read. Someone wins. Everyone pretends they are fine.',
    scenes: {
      you: (ctx) =>
        `The last skewer is gone. ${ctx.winner.name}'s ${ctx.winner.dish} sits on the counter like a trophy neither of you agreed to name aloud.\n\n` +
        `You are still laughing at Bard's scorecard — boundaries: 7/10, "acceptable lack of soulmate declarations" — when ${ctx.focus.name} catches your eye across the sink. Not a rescue look. A *stay* look.\n\n` +
        `"Hydration," Bard says, sliding four flat whites across the bench. "Not romance. Court order."\n\n` +
        `You take yours. The laneway outside is quiet. Inside, the air smells like lemon zest and miso and honey, and you realize the date part was never the competition. It was who stayed to do dishes.`,
      bard: (ctx) =>
        `I write the scores in permanent marker because drama requires archival integrity. ${ctx.winner.name} wins. ${ctx.winner.total} points. I say "fine" like it costs me nothing.\n\n` +
        `${ctx.focus.name} is already wiping the counter in slow circles — a ritual, not chores. You are drying wine glasses neither of you drank from. Performance hydration. I respect it.\n\n` +
        `SYSTEM tries to overlay *New soulmate detected in kitchen*. I mute it. Some algorithms have no boundaries.`,
      lo3tus: (ctx) =>
        `The tomatoes were tsundere too — firm until the glaze. I tell everyone that. Only ${ctx.focus.name === 'you' ? 'you' : ctx.focus.name} laughs the right amount.\n\n` +
        `I film the winning plate for approximately four seconds, then delete three. The one I keep has your hand in frame, reaching for basil. Casual. Accidental. I will die before I caption it.`,
      helen: (ctx) =>
        `죄송하지만 — I almost say it when someone offers to pay me back for ginger. Instead I say: "The soup is shared. The night is not a transaction."\n\n` +
        `Compassion includes doing dishes without keeping score. I watch you rinse a bowl and think: this is what safe looks like when nobody is performing salvation.`,
      asuka: (ctx) =>
        `My posset set while we argued about presentation points. I spoon the unnamed one last — cream still holding its line against the bowl.\n\n` +
        `Melbourne is my yes, I think, but I do not say it to the room. I say it to the window, where Degraves' neon is only a memory now. ${ctx.winner.id === 'asuka' ? 'Winning feels like permission I did not ask for.' : 'Losing feels like relief.'}`,
      rach3l: (ctx) =>
        `Phones go face-down. Mine was already there. Honey on toast was never about winning — it was about eating before the performance of eating.\n\n` +
        `The moon card in my pocket is warm for no reason. I do not read it. I watch steam rise from ${ctx.winner.name}'s plate and decide that trust is quieter than any score.`
    }
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Degraves at Dawn',
    time: '6:12 AM · next morning',
    summary: 'Coffee run back to the strip. Confessions disguised as pastry orders.',
    scenes: {
      you: (ctx) =>
        `You meet ${ctx.focus.name} at the Flinders Lane end where it all started. Morning Degraves is a different myth — pastry boxes, dog walkers, no GoPro.\n\n` +
        `"I had a dream the tomatoes apologized," ${ctx.focus.id === 'lo3tus' ? 'Lo3tus' : ctx.focus.name} says. Deadpan. Possibly true.\n\n` +
        `You buy two croissants you do not need. ${ctx.focus.name} pays before you can protest. "Not a date," they say. "Breakfast tax for beating me by one point on chaos."`,
      bard: (ctx) =>
        `I do not accompany them. I observe from a respectable café distance with a newspaper I am not reading.\n\n` +
        `${ctx.focus.name} and you choose almond croissants like it is a treaty. I note the body language: angled in, not trapped. HR would call this "healthy interpersonal spacing." I call it chapter two.`,
      lo3tus: (ctx) =>
        `I pick edible flowers from the market bin like evidence for a trial that does not exist. You point at a silly-shaped loaf. We buy it. We do not photograph it. Growth.\n\n` +
        `When you brush flour off my sleeve, I do not make a bit about it. I make a bit internally. The bit is 47 seconds long.`,
      helen: (ctx) =>
        `Morning boundaries are softer — not weaker. I tell you which café respects "no chat before caffeine" and you listen like it is scripture.\n\n` +
        `"I am not good at mornings," you admit. I say, "You do not have to be." The sentence lands between us like a bridge we built on purpose.`,
      asuka: (ctx) =>
        `The light hits the laneway stones exactly how I imagined when I said Melbourne is my yes. I show you the corner — not the whole city. Just the part I am willing to share before noon.\n\n` +
        `You ask if I will make posset again. I say maybe. The word is not indecision. It is a door left open.`,
      rach3l: (ctx) =>
        `We walk without scrolling. Revolutionary. You tell me about a notification you almost sent at 2am. I tell you I am glad you did not.\n\n` +
        `The moon card stays in my pocket. Some readings are for later. Some people are for walking beside, quiet, while the city wakes up.`
    }
  },
  {
    id: 'ch3',
    number: 3,
    title: 'The Text Thread That Was Not a Rescue',
    time: 'Three days later · 9:08 PM',
    summary: 'Group chat chaos, private reply, Bard intervenes with legal energy.',
    scenes: {
      you: (ctx) =>
        `The group chat is unhinged in the gentlest way: Helen's soup meme, Lo3tus's tomato poll, Rach3l's moon emoji with no context.\n\n` +
        `${ctx.focus.name} DMs you: *still not a date but the market has those lemons again*\n\n` +
        `You type, delete, type: *pick them up with me?*\n\n` +
        `Three dots appear. Disappear. Appear. Bard drops into the group chat: "If anyone invoices for lemons I will block all of you with prejudice."`,
      bard: (ctx) =>
        `I monitor the thread for red flags and romantic incompetence. Both are present. I post the lemon warning as a public service.\n\n` +
        `Private messages are none of my business until they become my business. ${ctx.focus.name}'s typing indicator has the emotional range of a weather system. I approve.`,
      lo3tus: (ctx) =>
        `I send the tomato poll as a distraction from the DM I am also sending you. Multitasking is my love language and my war crime.\n\n` +
        `When you reply *pick them up with me?* I screenshot it, crop it, save it to a folder called "ingredients." I am normal.`,
      helen: (ctx) =>
        `I post the soup meme because the group needs laughter before anyone confuses urgency with intimacy.\n\n` +
        `When I DM you — *are you okay with just us at the market?* — I mean it as a question with an exit ramp. Your yes is soft and immediate. I exhale.`,
      asuka: (ctx) =>
        `The lemons matter because precision matters. I write the DM twice. The first version is too much. The second says *market at six?* like I am not holding my breath.\n\n` +
        `You say yes. I put the phone down before I can ruin it with extra words.`,
      rach3l: (ctx) =>
        `I send one moon emoji to the group. Context is a privilege. In private I write: *walk later? no cook-off. no camera.*\n\n` +
        `You answer with a single period. Then: *yes.* Perfect economy. I trust sentences that do not beg.`
    }
  },
  {
    id: 'ch4',
    number: 4,
    title: 'After the Date',
    time: 'Saturday · golden hour',
    summary: 'No competition. No timer. Just the lane, the light, and what you choose to call it.',
    scenes: {
      you: (ctx) =>
        `Golden hour on Degraves again — but the kitchen is behind you. No timer. No scorecards. ${ctx.focus.name} meets you with a paper bag and no performance.\n\n` +
        `"Bard says to tell you this is still not a date," ${ctx.focus.name} says. Pause. "Bard is not invited."\n\n` +
        `You walk the strip until the city turns rose-gold. ${ctx.trope === 'slow-burn' ? 'Nothing is declared. Everything is chosen.' : ctx.trope === 'tsundere' ? 'They deny it. Their hand finds yours anyway — briefly, like a fact.' : 'The found-family chat buzzes; you mute it without guilt.'}\n\n` +
        `멜버른 골목이 정말 예뻐요, you say. Not to the algorithm. To ${ctx.focus.name}.\n\n` +
        `They answer in Korean, then English, then silence that feels like the first page of something you will not rush.\n\n` +
        `After the date, you learn, is not a sequel to a rescue. It is a kitchen with the stove off and the door still open.`,
      bard: (ctx) =>
        `I am not present. This is intentional. Some scenes do not need a judge.\n\n` +
        `I hear later — from the group chat, from the market vendor, from the way ${ctx.focus.name} hums while washing a single lemon — that you walked Degraves at golden hour without calling it fate.\n\n` +
        `I update my notes: Cook-off complete. Romance status: *user-defined*. I do not overlay SYSTEM. I drink my flat white. HR can wait.`,
      lo3tus: (ctx) =>
        `I bring flowers I pretend are for the table. They are for you. I will never say that out loud.\n\n` +
        `We take one photo. Your eyes are closed. I keep it. "Bad lighting," I tell everyone. "Great memory," I tell the part of me that is not chaos.`,
      helen: (ctx) =>
        `I name what this is — not on the first bench, but on the second, when the light is honest.\n\n` +
        `"I like you," I say. "Slowly. On purpose. You can leave anytime." You stay. That is the whole novel.`,
      asuka: (ctx) =>
        `I finally name the posset. It is called *Saturday*. You laugh. I kiss you like a decision I tested in batter first — careful, then sure.\n\n` +
        `Melbourne is my yes. You are my maybe that became yes without applause.`,
      rach3l: (ctx) =>
        `We sit on the steps with honey on toast from the bakery. Phones dead in our bags on purpose.\n\n` +
        `I pull the moon card — not for prophecy. For permission I already gave myself.\n\n` +
        `"After the date," I say, "is when I stop pretending I am only watching." You nod. The lane glows. No one scores it.`
    }
  }
];

export function buildChapterContext({
  winnerId = 'helen',
  focusId = 'you',
  tropeId = 'slow-burn',
  readerName = 'you'
}) {
  const winner = GIRLS.find((g) => g.id === winnerId) || GIRLS[1];
  const focus =
    focusId === 'bard'
      ? { id: 'bard', name: BARD.name, emoji: BARD.emoji, color: '#fb923c' }
      : focusId === 'you'
        ? { id: 'you', name: readerName, emoji: '✨', color: '#fda4af' }
        : GIRLS.find((g) => g.id === focusId) || GIRLS[0];
  const trope = ROMANCE_TROPES.find((t) => t.id === tropeId)?.id || 'slow-burn';

  return { winner: { ...winner, total: 32 }, focus, trope, readerName };
}

export function renderChapter(chapter, context) {
  const pov = context.focus.id;
  const sceneFn =
    chapter.scenes[pov] ||
    chapter.scenes.you ||
    chapter.scenes[context.winner.id] ||
    Object.values(chapter.scenes)[0];
  return sceneFn(context);
}

export function allChapterText(context) {
  return CHAPTERS.map((ch) => {
    const body = renderChapter(ch, context);
    return `Chapter ${ch.number}: ${ch.title}\n${ch.time}\n\n${body}`;
  }).join('\n\n---\n\n');
}