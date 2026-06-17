#!/usr/bin/env node
/**
 * Post TTMIK status update to @adhdloganberry via webhook + live X API.
 * Falls back to X compose intent when OAuth creds are missing.
 */
import dotenv from 'dotenv';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { postToTwitter, lookupPost } from '../src/twitter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const handle = (process.env.X_TWITTER_HANDLE || 'adhdloganberry').replace(/^@/, '');
const lesson = 'Hermes audit chain + Rei mercy heal — 358 tracks · 19 skills · 0 findings · c765a76';
const tweetText = `TTMIK status: ${lesson}. 관찰만 하고 흡수하지 않을게요 #LearnKorean #TTMIK #HealTheFeed`;
const port = process.env.PORT || '3000';

async function postWebhook() {
  const payload = {
    event: 'ttmik_progress',
    lesson,
    progress: 100,
    timestamp: new Date().toISOString(),
    platform: 'TTMIK Status Update',
    user: handle,
  };
  const res = await fetch(`http://localhost:${port}/api/ttmik-webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

function openIntent(text) {
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  if (process.platform === 'win32') {
    exec(`start "" "${url}"`);
  } else {
    exec(`open "${url}"`, { shell: true });
  }
  return url;
}

const webhook = await postWebhook();
console.log('Webhook:', JSON.stringify(webhook, null, 2));

const direct = await postToTwitter(tweetText);
console.log('Direct X:', JSON.stringify(direct, null, 2));

if (direct.mock || !direct.success) {
  const intent = openIntent(tweetText);
  console.log('Opened X compose intent:', intent);
  process.exit(direct.mock ? 2 : 1);
}

const lookup = direct.lookup || await lookupPost(direct.tweetId);
console.log('Post lookup (GET /2/tweets/:id):', JSON.stringify({
  verified: lookup.available === true,
  postId: direct.tweetId,
  url: direct.url,
  text: lookup.post?.text,
  author: lookup.author?.username,
  metrics: lookup.post?.public_metrics,
  editHistory: lookup.editHistory,
}, null, 2));

if (!lookup.available) {
  console.error('Post created but lookup verification failed.');
  process.exit(3);
}

console.log(`Posted + verified → ${direct.url}`);
process.exit(0);