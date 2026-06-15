#!/usr/bin/env node
const path = require('path');
const { healSkills } = require('../lib/heal-skills');

function parseRoot(argv) {
    const idx = argv.indexOf('--root');
    if (idx !== -1 && argv[idx + 1]) {
        return path.resolve(argv[idx + 1]);
    }
    return process.cwd();
}

if (require.main === module) {
    const root = parseRoot(process.argv.slice(2));
    healSkills(root);
}