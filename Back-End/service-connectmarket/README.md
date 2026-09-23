# CacaoMarket authentication service

This Spring service owns the first account flow for `CLIENT` and `VENDEUR` rows in the PostgreSQL `gu` schema.

## Registration and confirmation flow

1. `POST /api/auth/registration` validates a `CLIENT` or `VENDEUR` registration.
2. The service writes an `EN_ATTENTE_CONFIRMATION` row in `gu.utilisateurs`, stores a BCrypt password hash in `gu.password_history`, and stores only the SHA-256 hash of a cryptographically random confirmation token in `gu.registration_confirmation`.
3. The messaging module sends a single-use URL to the Angular confirmation page through Google Gmail SMTP. The URL is valid for exactly **3 hours**.
4. The Angular page captures the token, calls `GET /api/auth/registration/confirm?token=...`, shows the localized result, and redirects the user to sign in after confirmation. The backend activates the user (`ACTIF`) when the token is valid.
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

Only active `CLIENT`, `VENDEUR`, and `ADMINISTRATEUR` accounts with a valid current password and the `APP-CONN` basic right can sign in. The service establishes an HTTP session and returns the authenticated profile without a password hash. `rememberMe: true` extends the server-side idle-session limit from 30 minutes to 7 days. A pending account returns `403` with `REGISTRATION_PENDING_CONFIRMATION`. The tracked `gu.sql` schema seeds the development administrator login `root` with initial password `root1234`; change that bootstrap credential immediately after first use.

`POST /api/auth/logout` invalidates the active HTTP session.

## Run and verify the API connection

From `Back-End/service-connectmarket`, start the backend process (building with `mvnw.cmd install` alone does not start it):

```bat
mvnw.cmd spring-boot:run
```

Wait for Spring Boot to report that it has started on port `8080`, then open:

```text
http://localhost:8080/api/health
```

A running service returns:

```json
{"status":"UP","service":"service-connectmarket"}
```

## Structured API-call logs

Every `/api/...` call receives an `X-Request-Id` response header. That identifier is included on every ordered log entry made during the request, so one registration, confirmation, login, or logout flow can be followed from start to finish.

The logs are written to both the service console/IntelliJ Run view and, by default, to:

```text
Back-End/service-connectmarket/logs/cacaomarket-api.log
```

A successful registration produces a sequence similar to:

```text
event=api.request.received method=POST path=/api/auth/registration ...
event=registration.request.accepted role=VENDEUR email=d***@example.com login=ro***
event=registration.identity.available
event=registration.pending.persisted utilisateurId=42 expiresAt=...
event=registration.mail.smtp-send.completed
event=registration.workflow.completed expiresAt=...
event=api.request.completed method=POST path=/api/auth/registration status=202 outcome=success durationMs=...
```

Rejected requests also expose the safe API error code, for example `REGISTRATION_MAIL_DELIVERY_UNAVAILABLE`, `REGISTRATION_CONFIRMATION_EXPIRED`, or `INVALID_CREDENTIALS`. Request bodies, passwords, password hashes, raw confirmation tokens, mail credentials, and confirmation-token query values are intentionally never written to the logs.

The optional `APP_LOG_FILE` environment variable can move the log file to a different location.

When the Angular app is started with `ng serve`, its `/CacaoMarket/api/...` requests are proxied to this service's `/api/...` routes. See the [frontend proxy instructions](../../Front-End/README.md#authentication-api-proxy) for the second connection check.

## Google Gmail SMTP configuration

The reusable registration messaging module is [`SmtpRegistrationMessagingService`](src/main/java/cm/odigital/serviceconnectmarket/auth/messaging/SmtpRegistrationMessagingService.java). It uses Spring's `JavaMailSender` with Gmail's authenticated SMTP server (`smtp.gmail.com`, port `587`, STARTTLS) and sends each registration confirmation email through that account.

### Where to set the Google email and App Password

Set them only in this local, ignored file:

```text
Back-End/service-connectmarket/.env
```

Start from the tracked template:

```bash
cd Back-End/service-connectmarket
cp .env.example .env
```

Then edit these values in `.env`:

```properties
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-google-address@gmail.com
MAIL_PASSWORD=your-16-character-google-app-password
MAIL_SMTP_AUTH=true
MAIL_STARTTLS=true
MAIL_STARTTLS_REQUIRED=true
REGISTRATION_MAIL_FROM=your-google-address@gmail.com
```

Do **not** put the App Password in `application.properties`, commit `.env`, or use the normal Google account password. The repository ignores `.env` intentionally.

### Create the Google App Password

1. Enable **2-Step Verification** for the Google account that will send CacaoMarket mail.
2. Open [Google App Passwords](https://myaccount.google.com/apppasswords), create an App Password, and copy the generated 16-character value.
3. Paste that generated value into `MAIL_PASSWORD` in `Back-End/service-connectmarket/.env`. If Google displays it in groups, paste it without spaces.
4. Set `REGISTRATION_MAIL_FROM` to the same Gmail/Google Workspace mailbox or to an alias verified by that account. You may leave it blank to use `MAIL_USERNAME` automatically.

For Google Workspace accounts, App Password availability can be disabled by the organization administrator. If it is unavailable, ask the administrator to permit it or use an approved SMTP relay/OAuth configuration instead.

Set `REGISTRATION_CONFIRMATION_URL` in the same `.env` file to the public **Angular confirmation page**, for example:

```properties
REGISTRATION_CONFIRMATION_URL=http://localhost:4200/CacaoMarket/registration/confirm
```

For production, replace `localhost:4200` with the public frontend host/domain. Do not include a token in that environment variable; the service appends a fresh secure token, and the Angular page sends it safely to the backend confirmation endpoint.

Registration deliberately fails with `503 REGISTRATION_MAIL_DELIVERY_UNAVAILABLE` when Gmail SMTP is absent or cannot deliver. The transaction rolls back so the application never leaves an unconfirmable pending account in the database.

## Database setup

The tracked schema is [`../../database/gu.sql`](../../database/gu.sql). Apply it manually before starting the service:

```bash
psql -v ON_ERROR_STOP=1 -h localhost -p 6000 -U sorelle -d cacaomarketcm -f ../../database/gu.sql
```
