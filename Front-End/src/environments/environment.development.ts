import { ApplicationEnvironment } from './environment.model';

export const environment: ApplicationEnvironment = {
  production: false,
  // ng serve proxies this same-origin route to API_HOST (localhost by default) on API_PORT (8080 by default).
  apiBaseUrl: '/CacaoMarket/api'
};
