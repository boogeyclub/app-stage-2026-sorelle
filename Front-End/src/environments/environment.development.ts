import { ApplicationEnvironment } from './environment.model';

export const environment: ApplicationEnvironment = {
  production: false,
  // Development calls Spring directly; configure CORS on the backend for this frontend origin.
  apiBaseUrl: 'http://localhost:8080/api'
};
