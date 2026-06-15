#!/usr/bin/env node
/**
 * Verify live X OAuth credentials (no server required).
 * Usage: npm run verify:twitter
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyTwitterCredentials } from '../src/twitter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const handle = (process.env.X_TWITTER_HANDLE || 'adhdloganberry').replace(/^@/, '');

const result = await verifyTwitterCredentials();

if (result.mock) {
  console.error('✗ Twitter credentials missing — still in mock mode.');
  console.error('  Run: npm run setup:twitter');
  process.exit(1);
}

if (!result.ok) {
  console.error('✗ Verification failed:', result.error);
  process.exit(1);
}

const username = result.user?.username;
console.log('✓ Live X auth OK');
console.log(`  Authorized: @${username}`);
console.log(`  Target:     @${handle}`);

if (username && username !== handle) {
  console.warn(`\n  Warning: token is for @${username}, expected @${handle}`);
  process.exit(2);
}

process.exit(0);