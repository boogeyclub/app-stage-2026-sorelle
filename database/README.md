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

Each of the three tables uses the same initial columns:

| Column | Purpose |
| --- | --- |
| `id` | Identity primary key |
| `nom` | Last name |
| `prenom` | First name |
| `email` | Unique email address |
| `login` | Unique login name |
| `password` | Password hash only; never plaintext |
| `statut` | Account status, defaulting to `ACTIF` |
| `dateCreation` | Timestamp set when the row is created |

To apply a script manually to the local database, run it from the repository root:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d connectmarket -f database/gu.sql
```
