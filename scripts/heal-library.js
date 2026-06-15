#!/usr/bin/env node
/**
 * Heal Healing Factors Library from source files.
 * Run: node scripts/heal-library.js
 */
const path = require('path');
const { healLibrary } = require('../packages/ttmik-heal-skills/lib/heal-library');

healLibrary(path.join(__dirname, '..'));