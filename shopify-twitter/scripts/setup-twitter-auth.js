#!/usr/bin/env node
/**
 * OAuth 1.0a PIN flow for @adhdloganberry (or any X account).
 *
 * Prereqs (https://developer.x.com):
 *   1. Create a Project + App
 *   2. User authentication: OAuth 1.0a · Read and write
 *   3. Copy API Key + API Key Secret into .env as TWITTER_API_KEY / TWITTER_API_SECRET
 *
 * Usage:
 *   npm run setup:twitter
 *   npm run setup:twitter -- --pin 1234567
 */

import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.join(__dirname, '..', '.env');

dotenv.config({ path: ENV_PATH });

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function upsertEnv(lines, key, value) {
  const prefix = `${key}=`;
  const idx = lines.findIndex((line) => line.startsWith(prefix));
  const next = `${key}=${value}`;
  if (idx >= 0) lines[idx] = next;
  else lines.push(next);
  return lines;
}

function writeEnv(updates) {
  let lines = [];
  if (fs.existsSync(ENV_PATH)) {
    lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
  }
  for (const [key, value] of Object.entries(updates)) {
    lines = upsertEnv(lines, key, value);
  }
  const body = lines.filter((l, i, arr) => !(l === '' && i === arr.length - 1)).join('\n') + '\n';
  fs.writeFileSync(ENV_PATH, body, 'utf8');
}

async function main() {
  const pinArg = process.argv.find((a) => a.startsWith('--pin='))?.split('=')[1]
    || (process.argv.includes('--pin') ? process.argv[process.argv.indexOf('--pin') + 1] : null);

  let appKey = process.env.TWITTER_API_KEY;
  let appSecret = process.env.TWITTER_API_SECRET;

  if (!appKey || appKey.includes('your_')) {
    appKey = await prompt('TWITTER_API_KEY (from developer.x.com): ');
  }
  if (!appSecret || appSecret.includes('your_')) {
    appSecret = await prompt('TWITTER_API_SECRET: ');
  }

  if (!appKey || !appSecret) {
    console.error('\nMissing API key/secret. Add them to shopify-twitter/.env first.');
    process.exit(1);
  }

  writeEnv({
    TWITTER_API_KEY: appKey,
    TWITTER_API_SECRET: appSecret,
    X_TWITTER_HANDLE: process.env.X_TWITTER_HANDLE || 'adhdloganberry',
  });

  const appClient = new TwitterApi({ appKey, appSecret });
  const authLink = await appClient.generateAuthLink('oob');

  console.log('\n--- X OAuth 1.0a (log in as @adhdloganberry) ---');
  console.log('1. Open this URL in your browser:');
  console.log(`   ${authLink.url}`);
  console.log('2. Authorize the app · copy the PIN shown on X');
  console.log('3. Paste the PIN below\n');

  const pin = pinArg || await prompt('PIN: ');
  if (!pin) {
    console.error('No PIN provided.');
    process.exit(1);
  }

  const {
    accessToken,
    accessSecret,
    client: userClient,
  } = await appClient.login(pin);

  writeEnv({
    TWITTER_ACCESS_TOKEN: accessToken,
    TWITTER_ACCESS_SECRET: accessSecret,
    X_TWITTER_HANDLE: process.env.X_TWITTER_HANDLE || 'adhdloganberry',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '3000',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5174',
  });

  const me = await userClient.v2.me({ 'user.fields': ['username', 'name'] });
  const user = me.data;

  console.log('\n✓ Live X auth saved to shopify-twitter/.env');
  console.log(`  Account: @${user?.username} (${user?.name || 'unknown'})`);
  console.log(`  Target handle: ${process.env.X_TWITTER_HANDLE || 'adhdloganberry'}`);

  if (user?.username && user.username !== (process.env.X_TWITTER_HANDLE || 'adhdloganberry')) {
    console.warn(`\n  Warning: authorized as @${user.username}, not @adhdloganberry.`);
    console.warn('  Re-run and log in as @adhdloganberry, or update X_TWITTER_HANDLE in .env.');
  }

  console.log('\nNext: restart the server (npm start) and run: npm run verify:twitter');
}

main().catch((err) => {
  console.error('\nOAuth setup failed:', err?.data?.detail || err?.message || err);
  console.error('\nCheck: app has OAuth 1.0a · Read and write · PIN/oob callback enabled.');
  process.exit(1);
});