const apiHost = process.env.API_HOST?.trim() || 'localhost';
const apiPort = process.env.API_PORT?.trim() || '8080';
const apiProtocol = process.env.API_PROTOCOL?.trim() || 'http';

if (!/^[a-z][a-z\d+.-]*$/i.test(apiProtocol)) {
  throw new Error('API_PROTOCOL must be a URL protocol such as http or https.');
}

if (!/^\d{1,5}$/.test(apiPort)) {
  throw new Error('API_PORT must be a numeric port number.');
}

// API_HOST accepts a hostname or a local LAN IP address, for example:
// localhost, 192.168.1.42, or cacao-api.local.
const apiTarget = `${apiProtocol}://${apiHost}:${apiPort}`;

export default {
  '/CacaoMarket/api': {
    target: apiTarget,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/CacaoMarket': ''
    }
  }
};
