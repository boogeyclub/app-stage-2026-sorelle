# CacaoMarket authentication service

This Spring service owns the first account flow for `CLIENT` and `VENDEUR` rows in the PostgreSQL `gu` schema.

## Registration and confirmation flow

1. `POST /api/auth/registration` validates a `CLIENT` or `VENDEUR` registration.
2. The service writes an `EN_ATTENTE_CONFIRMATION` row in `gu.utilisateurs`, stores a BCrypt password hash in `gu.password_history`, and stores only the SHA-256 hash of a cryptographically random confirmation token in `gu.registration_confirmation`.
3. The messaging module sends a single-use confirmation URL by SMTP. The URL is valid for exactly **3 hours**.
4. `GET /api/auth/registration/confirm?token=...` activates the user (`ACTIF`) when the token is valid.
5. A scheduler runs every minute, and registration/authentication requests also perform cleanup. Any unconfirmed expired registration is denied and its `utilisateurs`, `password_history`, and confirmation rows are removed transactionally.

Raw confirmation tokens are never persisted or returned by the registration API.

## API

### Start registration

```http
POST /api/auth/registration
Content-Type: application/json
```

```json
{
  "role": "VENDEUR",
  "prenom": "Amina",
  "nom": "Ngono",
  "email": "amina@example.com",
  "login": "amina-cocoa",
  "password": "a secure password",
  "confirmPassword": "a secure password",
  "acceptTerms": true,
  "language": "fr"
}
```

A successful request returns `202 Accepted` with the destination email and expiration timestamp. It does not return a token or password.

### Confirm registration

```http
GET /api/auth/registration/confirm?token=<token-from-email>
```

A link presented at or after its deadline is denied with `410 Gone` and `REGISTRATION_CONFIRMATION_EXPIRED` when its pending record is still present; after the scheduled purge it is treated as an invalid link. In either case, the pending account is removed and cannot be activated.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "identity": "amina-cocoa",
  "password": "a secure password",
  "rememberMe": false
}
```

Only active `CLIENT` and `VENDEUR` accounts with a valid current password and the `APP-CONN` basic right can sign in. The service establishes an HTTP session and returns the authenticated profile without a password hash. `rememberMe: true` extends the server-side idle-session limit from 30 minutes to 7 days. A pending account returns `403` with `REGISTRATION_PENDING_CONFIRMATION`.

`POST /api/auth/logout` invalidates the active HTTP session.

## SMTP configuration

Copy `.env.example` to an untracked `.env` file and fill in the SMTP settings. Registration deliberately fails with `503 REGISTRATION_MAIL_DELIVERY_UNAVAILABLE` when SMTP is absent or cannot deliver: this rolls back the pending account instead of leaving an unconfirmable account in the database.

Set `REGISTRATION_CONFIRMATION_URL` to the public backend confirmation endpoint that should be included in emails. Do not include a token in that environment variable; the service appends a fresh secure token.

## Database setup

The tracked schema is [`../../database/gu.sql`](../../database/gu.sql). Apply it manually before starting the service:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d cacaomarketcm -f ../../database/gu.sql
```
