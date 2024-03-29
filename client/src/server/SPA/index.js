// @flow weak

'use strict';

const chalk           = require('chalk');
const express         = require('express');
const fs              = require('fs');
const path            = require('path');
const prerender       = require('prerender-node');

const app       = express();
const DOCS_PATH = '../../../docs/';
const PORT      = 80;
const IP_ADRESS = '0.0.0.0';

app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

app.use(express.static(path.join(__dirname, DOCS_PATH)));
// Production only: use prerender middleware.
app.use(prerender.set('prerenderToken', 'rd7gKVjJ6BxewgQ2nKqm'));

app.get('/health', (req, res) => res.sendStatus(200));
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
