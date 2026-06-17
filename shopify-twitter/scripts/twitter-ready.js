#!/usr/bin/env node
/**
 * Check TTMIK → X pipeline readiness (OAuth, server, Post Lookup route).
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyTwitterCredentials } from '../src/twitter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

const port = process.env.PORT || '3000';
const handle = (process.env.X_TWITTER_HANDLE || 'adhdloganberry').replace(/^@/, '');

function isPlaceholder(value) {
  if (!value || typeof value !== 'string') return true;
  const v = value.trim().toLowerCase();
  return !v || v.startsWith('your_') || v.includes('xxx') || v === 'changeme';
}

const keys = {
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET,
};

const missing = Object.entries(keys).filter(([, v]) => isPlaceholder(v)).map(([k]) => k);
const credsReady = missing.length === 0;

let serverOk = false;
let lookupRouteOk = false;
let lookupMock = false;

try {
  const health = await fetch(`http://localhost:${port}/health`);
  serverOk = health.ok;
} catch {
  serverOk = false;
}

if (serverOk) {
  try {
    const lookup = await fetch(`http://localhost:${port}/twitter/post/1346889436626259968`);
    const body = await lookup.json();
    lookupRouteOk = lookup.status !== 404 || body.error !== 'API route not found';
    lookupMock = body.mock === true || body.error === 'X API not configured';
  } catch {
    lookupRouteOk = false;
  }
}

const auth = credsReady ? await verifyTwitterCredentials() : { ok: false, mock: true };

console.log('TTMIK → X pipeline readiness\n');
console.log(`  Target:           @${handle}`);
console.log(`  .env:             ${envPath}`);
console.log(`  OAuth creds:      ${credsReady ? '✓ set' : `✗ placeholders (${missing.join(', ')})`}`);
console.log(`  Live auth:        ${auth.ok ? `✓ @${auth.user?.username}` : auth.mock ? '✗ mock mode' : `✗ ${auth.error || 'failed'}`}`);
console.log(`  Server :${port}:   ${serverOk ? '✓ running' : '✗ not reachable'}`);
console.log(`  GET /twitter/post/:id  ${lookupRouteOk ? (lookupMock ? '✓ route live (X API mock)' : '✓ route live') : '✗ missing — restart server'}`);

if (!credsReady || !auth.ok) {
  console.log('\nNext:');
  console.log('  1. developer.x.com → App → OAuth 1.0a · Read and write');
  console.log('  2. Put TWITTER_API_KEY + TWITTER_API_SECRET in shopify-twitter/.env');
  console.log('  3. npm run setup:twitter   (PIN flow as @adhdloganberry)');
  console.log('  4. npm run verify:twitter');
  console.log('  5. npm run post:ttmik-status  (POST /2/tweets → GET /2/tweets/:id)');
  process.exit(1);
}

if (!serverOk || !lookupRouteOk) {
  console.log('\nNext: npm start   (from shopify-twitter/)');
  process.exit(2);
}

console.log('\nReady — run: npm run post:ttmik-status');
process.exit(0);