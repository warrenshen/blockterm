// @flow weak

'use strict';

const chalk           = require('chalk');
const express         = require('express');
const fs              = require('fs');
const https           = require('https');
const path            = require('path');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const sslPath   = '/etc/letsencrypt/live/blockterm.com/';

const app       = express();
const DOCS_PATH = '../../../docs/';
const PORT      = 80;
const IP_ADRESS = '0.0.0.0';

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`.
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/]));

app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

app.use(express.static(path.join(__dirname, DOCS_PATH)));

app.get('/health', (req, res) => res.sendStatus(200));
app.get('/insecure', (req, res) => res.send('Dangerous!'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'index.html')));

/* eslint-disable no-console */
app.listen(
  PORT,
  IP_ADRESS,
  () => console.log(`
    =====================================================
    -> Server (${chalk.bgBlue('SPA')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `)
);
/* eslint-enable no-console */

var options = {
  key: fs.readFileSync(sslPath + 'privkey.pem'),
  cert: fs.readFileSync(sslPath + 'fullchain.pem')
};

this.server = http.createServer(options, this.app);
this.io = require('socket.io').listen(this.server);
this.server.listen(443);
