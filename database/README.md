# Database SQL scripts

This directory keeps database SQL under version control before it is executed.

## Convention

- Store one schema definition per file.
- Name the file after the PostgreSQL schema: `<schema-name>.sql`.
- Scripts in this directory are intentionally **not** executed automatically by Spring Boot.

## Current schemas

| Schema | Script | Tables |
| --- | --- | --- |
| `gu` | [`gu.sql`](./gu.sql) | `client`, `administrateur`, `vendeur` |

The three initial tables keep authentication data in `mot_de_passe_hash`; passwords must never be stored in plaintext.

To apply a script manually to the local database, run it from the repository root:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d connectmarket -f database/gu.sql
```
