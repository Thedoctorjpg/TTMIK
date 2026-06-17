#!/usr/bin/env node
const path = require('path');
const { healSkills, patchHermesConfig, getHermesLocalUpdateCmd, getHermesCli } = require('../lib/heal-skills');

function parseRoot(argv) {
    const idx = argv.indexOf('--root');
    if (idx !== -1 && argv[idx + 1]) {
        return path.resolve(argv[idx + 1]);
    }
    return process.cwd();
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const root = parseRoot(args);
    if (args.includes('--patch') || args.includes('--patch-only')) {
        patchHermesConfig(root);
        console.log(getHermesLocalUpdateCmd(root, getHermesCli()));
    } else {
        healSkills(root);
    }
}