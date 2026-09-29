import { ApplicationEnvironment } from './environment.model';

export const environment: ApplicationEnvironment = {
  production: true,
  // Production uses the lower-case Spring backend context on the deployed origin.
  apiBaseUrl: '/cacaomarketcm/api'
};
