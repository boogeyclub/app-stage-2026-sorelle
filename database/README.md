# Database SQL scripts

This directory keeps database SQL under version control before it is executed.

## Convention

- Store one schema definition per file.
- Name the file after the PostgreSQL schema: `<schema-name>.sql`.
- Scripts in this directory are intentionally **not** executed automatically by Spring Boot.

## Current schemas

| Schema | Script |
| --- | --- |
| `gu` | [`gu.sql`](./gu.sql) |

To apply a script manually to the local database, run it from the repository root:

```bash
psql -h localhost -p 6000 -U sorelle -d connectmarket -f database/gu.sql
```
