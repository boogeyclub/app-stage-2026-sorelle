# FrontEnd

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/CacaoMarket/`. The application will automatically reload whenever you modify any of the source files.

## Authentication API connection

The development front-end calls the Spring API directly at `http://localhost:8080/api`; Angular does not proxy these requests. The backend must be running and CORS must allow the frontend origin (`http://localhost:4200`). For a different frontend origin, set `APP_CORS_ALLOWED_ORIGINS` on Spring to that exact origin.

Start the backend service separately before submitting a registration:

```bat
cd ..\Back-End\service-connectmarket
mvnw.cmd spring-boot:run
```

`mvnw.cmd install` only builds the backend; it does not keep the API running. The API URL is configured in [`src/environments/environment.development.ts`](./src/environments/environment.development.ts).

### Build environments

| Build configuration | Environment file | Browser API base |
| --- | --- | --- |
| Development (`ng serve`) | [`src/environments/environment.development.ts`](./src/environments/environment.development.ts) | `http://localhost:8080/api` (direct cross-origin request) |
| Production (`ng build`) | [`src/environments/environment.production.ts`](./src/environments/environment.production.ts) | `/CacaoMarket/api` on the deployed origin |

The production server must make `/CacaoMarket/api/...` available from the Spring backend. This is server/deployment routing, not an Angular development proxy.

### Verify the connection

With the backend running, open this URL directly:

```text
http://localhost:8080/api/health
```

It should return:

```json
{"status":"UP","service":"service-connectmarket"}
```

The Angular app makes its API requests directly to this Spring origin. The backend logs each `/api/...` request without logging request bodies, passwords, or registration/reset-token query values.

## Password reset

The sign-in form has a **Forgot password?** action that opens `/CacaoMarket/password-reset`. The request page accepts an account email and calls `POST /api/auth/password-reset/request`; it deliberately shows the same success message whether or not a link can be sent, so it does not disclose account existence.

Only confirmed (`ACTIF`) accounts receive a Gmail reset link at their stored email address. The link targets `/CacaoMarket/password-reset/confirm?token=...`, where the Angular confirmation page accepts a new password and calls `POST /api/auth/password-reset/confirm`. The page never renders the raw token, directs the user back to sign-in after success, and supports English and French like the rest of the public authentication flow.

The backend defaults the single-use link lifetime to one hour. Set `PASSWORD_RESET_URL` and, if needed, `PASSWORD_RESET_TOKEN_TTL` in the backend's local `src/main/resources/.env`; see the [backend Gmail and reset configuration](../Back-End/service-connectmarket/README.md#google-gmail-smtp-configuration). A successful reset invalidates all persistent browser sessions, so the user must sign in again.

## Role dashboards and browser sessions

A successful login routes each user type to its own protected workspace:

| Database user type | Angular route | Workspace |
| --- | --- | --- |
| `ADMINISTRATEUR` | `/CacaoMarket/dashboard/admin` | Administrator dashboard |
| `VENDEUR` | `/CacaoMarket/dashboard/vendeur` | Seller dashboard |
| `CLIENT` | `/CacaoMarket/dashboard/client` | User/client dashboard |

Dashboard routes first call `GET /api/auth/session`, so refreshing a page verifies both the browser cookie and the persistent `gu.sessions_utilisateur` record. The professional dashboard header contains the CacaoMarket logo, account menu, language selector, account settings link, and secure sign-out action.

`/CacaoMarket/dashboard/account` lists the current account's active browser sessions and can disconnect an unused browser. Apply the latest [`database/gu.sql`](../database/gu.sql) before using these features, because the login flow writes a session record after each successful sign-in.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
