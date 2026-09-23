export interface ApplicationEnvironment {
  production: boolean;
  /** Browser-visible API base URL. Development points directly to the Spring API. */
  apiBaseUrl: string;
}
