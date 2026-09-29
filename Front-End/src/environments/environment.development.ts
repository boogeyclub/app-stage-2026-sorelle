import { ApplicationEnvironment } from './environment.model';

export const environment: ApplicationEnvironment = {
  production: false,
  // The Angular dev server proxies this same-origin path to Spring on port 8080.
  // Keeping the browser URL relative avoids cross-origin session/cookie surprises.
  apiBaseUrl: '/cacaomarketcm/api'
};
