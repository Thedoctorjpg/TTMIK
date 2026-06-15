# ttmik-heal-skills

CLI to sync TTMIK creative archetype skills into Hermes `agentskills.io` SKILL.md format.

## Install

```bash
npm install -g ttmik-heal-skills
```

## Usage

From your TTMIK checkout:

```bash
ttmik-heal-skills
```

Or specify a project root:

```bash
ttmik-heal-skills --root /path/to/TTMIK
```

Writes skill files to:

- `.devin/skills/<id>/SKILL.md`
- repo-root `*.skill.md` files
- `~/.hermes/skills/creative/<id>/SKILL.md`

## License

MIT