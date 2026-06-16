# Rick & Morty SQL — Melbourne Bardic Multiverse Index

PostgreSQL schema and seed data for the **Ep 7.2 Citadel portal** lane in Melbourne Lantern webdrama.

Full library (schema, seeds, example queries, import script):

`~/.grok/skills/postgresql-sql-helper/library/`

## Quick start

```bash
psql -d postgres -f ~/.grok/skills/postgresql-sql-helper/library/00-schema.sql
psql -d postgres -f ~/.grok/skills/postgresql-sql-helper/library/01-seed-core.sql
```

## Webseries mapping

| SQL entity | Webdrama meaning |
|------------|------------------|
| `rm_locations.dimension` | Multiverse dimension (C-137, Replacement, etc.) |
| `rm_episodes` | Episode arcs the Bard has crossed |
| `rm_characters` | Guest pilgrims / muse allies |
| `rm_episode_characters` | Who appeared in which arc |
| `rm_character_aliases` | Rick C-137, Pickle Rick, etc. |

## TTMIK boots

- `TTMIK.html?rickmorty=1` — multiverse shadowing lane
- `TTMIK.html?heal-factor=multiverse-query` — SQL index heal ritual
- `TTMIK.html?pin=CITADEL&episode=7.2` — sync panel preset 22