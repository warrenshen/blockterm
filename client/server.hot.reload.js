// @flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */
const chalk              = require('chalk');
const path               = require('path');
const webpack            = require('webpack');
const express            = require('express');
const devMiddleware      = require('webpack-dev-middleware');
const hotMiddleware      = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const config             = require('./webpack.hot.reload.config');

const app       = express();
const compiler  = webpack(config);

const PORT      = 80;
const IP_ADRESS = '0.0.0.0';

app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

app.use(historyApiFallback({ verbose: false }));

app.use(express.static(path.join(__dirname, 'docs/tv/')));

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));

app.use(hotMiddleware(compiler));

app.get('/health', (req, res) => res.sendStatus(200));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(
  PORT,
  IP_ADRESS,
  (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(
    `
      -> Server (${chalk.bgBlue('Hot reload')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    `
  );
});
