export interface ApplicationEnvironment {
  production: boolean;
  /**
   * Browser-visible API base path. It intentionally stays same-origin; the
   * development server proxies it to the configured local Spring host.
   */
  apiBaseUrl: string;
}
