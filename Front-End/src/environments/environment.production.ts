import { ApplicationEnvironment } from './environment.model';

export const environment: ApplicationEnvironment = {
  production: true,
  // Production uses a same-origin reverse-proxy route below the CacaoMarket context.
  apiBaseUrl: '/CacaoMarket/api'
};
