# Database SQL scripts

This directory keeps database SQL under version control before it is executed.

## Convention

- Store one schema definition per file.
- Name the file after the PostgreSQL schema: `<schema-name>.sql`.
- Scripts in this directory are intentionally **not** executed automatically by Spring Boot.

## Current schemas

| Schema | Script | Tables |
| --- | --- | --- |
| `gu` | [`gu.sql`](./gu.sql) | `client`, `administrateur`, `vendeur`, `password_history` |

## Account tables

The `client`, `administrateur`, and `vendeur` tables share these initial columns:

| Column | Purpose |
| --- | --- |
| `id` | Identity primary key |
| `nom` | Last name |
| `prenom` | First name |
| `email` | Unique email address |
| `login` | Unique login name |
| `statut` | Account status, defaulting to `ACTIF` |
| `dateCreation` | Timestamp set when the row is created |

## Password history

Passwords are stored only in `gu.password_history`, not in the account tables.

- Each row references exactly one account through `client_id`, `administrateur_id`, or `vendeur_id`.
- `password` must contain a secure password hash, never a plaintext password.
- The quoted `"current"` boolean identifies the active password for that account.
- `date_insertion` records when the password was added.
- `date_changement` records when a current password was replaced and became an old password.
- A database trigger automatically archives the previous current password when a new current password row is inserted.
- A unique partial index prevents more than one current password for the same account.

To apply a script manually to the local database, run it from the repository root:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d connectmarket -f database/gu.sql
```
