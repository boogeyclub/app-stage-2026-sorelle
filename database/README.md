# Database SQL scripts

This directory keeps database SQL under version control before it is executed.

## Convention

- Store one schema definition per file.
- Name the file after the PostgreSQL schema: `<schema-name>.sql`.
- Scripts in this directory are intentionally **not** executed automatically by Spring Boot.

## Current schemas

| Schema | Script | Tables |
| --- | --- | --- |
| `gu` | [`gu.sql`](./gu.sql) | `type_utilisateur`, `utilisateurs`, `basic_rights`, `type_utilisateur_basic_right`, `password_history` |

## User types

`gu.type_utilisateur` is the user-type lookup table. Its seeded values determine whether an `utilisateurs` row is a `CLIENT`, `VENDEUR`, or `ADMINISTRATEUR`.

| Column | Purpose |
| --- | --- |
| `id` | Identity primary key |
| `code` | Unique role code: `CLIENT`, `VENDEUR`, or `ADMINISTRATEUR` |
| `tu_name` | Human-readable user-type name |

## Utilisateurs

`gu.utilisateurs` replaces the separate `client`, `vendeur`, and `administrateur` tables. Each row references one user type through `type_utilisateur_id`.

| Column | Purpose |
| --- | --- |
| `id` | Identity primary key |
| `type_utilisateur_id` | Required reference to `type_utilisateur` |
| `nom` | Last name |
| `prenom` | First name |
| `email` | Globally unique email address |
| `login` | Globally unique login name |
| `statut` | Account status, defaulting to `ACTIF` |
| `dateCreation` | Timestamp set when the row is created |

## Basic rights and type associations

`gu.basic_rights` stores the rights catalog.

| Column | Purpose |
| --- | --- |
| `id` | Identity primary key |
| `code` | Unique, stable right code |
| `br_name` | Human-readable basic-right name |

`gu.type_utilisateur_basic_right` manages the many-to-many association between a user type and its basic rights. Its composite primary key is `(type_utilisateur_id, basic_right_id)`.

The initial right is seeded as follows:

```text
APP-CONN — Connexion a l'application CacaoMARKETCM
```

`APP-CONN` is associated with every user type so all users can connect to the application. `ADMINISTRATEUR` is automatically associated with every basic right, including any added in the future. A database trigger prevents an administrator right from being removed or reassigned.

## Password history

Passwords are stored only in `gu.password_history`, not in `utilisateurs`.

- Each row references one account through `utilisateur_id`.
- `password` must contain a secure password hash, never a plaintext password.
- The quoted `"current"` boolean identifies the active password for that user.
- `date_insertion` records when the password was added.
- `date_changement` records when a current password was replaced and became an old password.
- A database trigger automatically archives the previous current password when a new current password row is inserted.
- A unique partial index prevents more than one current password for the same user.

To apply a script manually to the local database, run it from the repository root:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d connectmarket -f database/gu.sql
```
