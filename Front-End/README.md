# FrontEnd

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/CacaoMarket/`. The application will automatically reload whenever you modify any of the source files.

## Authentication API proxy

The application is served below `/CacaoMarket/`, so registration and login use application-relative `api/auth/...` endpoints. In the browser these become `/CacaoMarket/api/auth/...`.

During `ng serve`, [`proxy.conf.json`](./proxy.conf.json) forwards `/CacaoMarket/api/...` to the Spring service at `http://localhost:8080/api/...` and removes the `/CacaoMarket` prefix. Start the backend service separately before submitting a registration:

```bash
cd ../Back-End/service-connectmarket
mvnw.cmd spring-boot:run
```

`mvnw.cmd install` only builds the backend; it does not keep the API running. After changing `proxy.conf.json`, stop and restart `ng serve` because proxy settings are loaded at startup.

### Verify the connection

With the backend running, first open this URL directly:

```text
http://localhost:8080/api/health
```

It should return:

```json
{"status":"UP","service":"service-connectmarket"}
```

Then, while `ng serve` is running, open:

```text
http://localhost:4200/CacaoMarket/api/health
```

The same JSON confirms that the Angular development proxy is connected to Spring. The backend logs each `/api/...` request without logging request bodies, passwords, or confirmation-token query values.

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
