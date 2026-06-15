#!/usr/bin/env node
/**
 * Heal TTMIK archetype skills to Hermes agentskills.io SKILL.md format.
 * Run: node scripts/heal-skills.js
 */
const path = require('path');
const { healSkills } = require('../packages/ttmik-heal-skills/lib/heal-skills');

healSkills(path.join(__dirname, '..'));