// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

// function parseEnvList(env) {
//   if (!env) {
//     return [];
//   }
//   return env.split(',');
// }

var originWhitelist = [
  'http://localhost:3000',
  'https://www.blockterm.com',
  'https://blockterm.com',
];

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
  originWhitelist: originWhitelist,
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['origin'],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
