import ccxt             from 'ccxt';
import {
  GREATER_THAN,
  LESS_THAN,
  parseAlertIdentifier,
}                       from '../constants/alerts';
import {
  WORKER_MESSAGE_TYPE_ALERTS,
  WORKER_MESSAGE_TYPE_EXCHANGE_KEYS,
  WORKER_MESSAGE_TYPE_TICKERS,
  WORKER_REPLY_TYPE_ALERT,
  WORKER_REPLY_TYPE_BALANCE,
  WORKER_REPLY_TYPE_TICKER,
}                           from '../constants/workers';

function getBinanceAPI()
{
  const binance = new ccxt.binance();
  if (process.env.NODE_ENV == 'dev')
  {
    binance.proxy = 'http://localhost:9876/';
  }
  else
  {
    binance.proxy = 'https://cors.blockterm.com/';
  }
  return binance;
}

function getBittrexAPI()
{
  const bittrex = new ccxt.bittrex();
  if (process.env.NODE_ENV == 'dev')
  {
    bittrex.proxy = 'http://localhost:9876/';
  }
  else
  {
    bittrex.proxy = 'https://cors.blockterm.com/';
  }
  return bittrex;
}

function getKucoinApi()
{
  const kucoin = new ccxt.kucoin();
  if (process.env.NODE_ENV == 'dev')
  {
    kucoin.proxy = 'http://localhost:9876/';
  }
  else
  {
    kucoin.proxy = 'https://cors.blockterm.com/';
  }
  return kucoin;
}

// Note we make the assumption that the right hand symbol is three letters.
function formatTickerBittrex(ticker)
{
  const tickerLength = ticker.length;
  return `${ticker.substring(0, tickerLength - 3)}/${ticker.substring(tickerLength - 3)}`;
}

function isConditionFulfilledBittrex(condition, price, createdAtUnix, trade)
{
  if (createdAtUnix * 1000 > trade.timestamp)
  {
    return false;
  }

  if (condition === GREATER_THAN)
  {
    return trade.price >= parseFloat(price);
  }
  else
  {
    return trade.price <= parseFloat(price);
  }
}

// Note we make the assumption that the right hand symbol is three letters.
function formatTickerBinance(ticker)
{
  const tickerLength = ticker.length;
  return `${ticker.substring(0, tickerLength - 3)}/${ticker.substring(tickerLength - 3)}`;
}

function isConditionFulfilledBinance(condition, price, createdAtUnix, trade)
{
  if (createdAtUnix * 1000 > trade.timestamp)
  {
    return false;
  }

  if (condition === GREATER_THAN)
  {
    return trade.price >= parseFloat(price);
  }
  else
  {
    return trade.price <= parseFloat(price);
  }
}

async function pollAlert(alert)
{
  const {
    id,
    createdAtUnix,
    identifier,
  } = alert;

  const [market, price, condition] = parseAlertIdentifier(identifier);
  const [exchange, ticker] = market.split(':', 2);

  let api = null;
  let apiTicker = null;
  switch (exchange) {
    case 'BINANCE':
      api = getBinanceAPI();
      apiTicker = formatTickerBinance(ticker);
      break;
    case 'BITTREX':
      api = getBittrexAPI();
      apiTicker = formatTickerBittrex(ticker);
      break;
    default:
      return false;
  }

  const trades = await api.fetchTrades(apiTicker);

  let fulfillingTrades = null;
  switch (exchange) {
    case 'BINANCE':
      fulfillingTrades = trades.filter(
        (trade) => isConditionFulfilledBinance(condition, price, createdAtUnix, trade)
      );
      break;
    case 'BITTREX':
      fulfillingTrades = trades.filter(
        (trade) => isConditionFulfilledBittrex(condition, price, createdAtUnix, trade)
      );
      break;
    default:
      fulfillingTrades = [];
      break;
  }

  if (fulfillingTrades.length > 0)
  {
    postMessage({
      payload: alert,
      type: WORKER_REPLY_TYPE_ALERT,
    });
  }
}

async function pollTicker(ticker)
{
  const {
    exchange,
    symbol,
  } = ticker;

  let api = null;
  let apiTicker = null;
  switch (exchange) {
    case 'BINANCE':
      api = getBinanceAPI();
      apiTicker = formatTickerBinance(symbol);
      break;
    case 'BITTREX':
      api = getBittrexAPI();
      apiTicker = formatTickerBittrex(symbol);
      break;
    default:
      return false;
  }

  const response = await api.fetchTicker(apiTicker);

  postMessage({
    payload: {
      exchange: exchange,
      symbol: symbol,
      ticker: response,
    },
    type: WORKER_REPLY_TYPE_TICKER,
  });
};

async function syncExchangeBalance(exchangeKey)
{
  const {
    id,
    exchange,
    apiKey,
    secretKey,
  } = exchangeKey;

  let api = null;

  switch (exchange)
  {
    case 'binance':
      api = getBinanceAPI();
      break;
    case 'bittrex':
      api = getBittrexAPI();
      break;
    default:
      return false;
  }

  api.apiKey = apiKey;
  api.secret = secretKey;

  try
  {
    const balance = await api.fetchBalance();

    postMessage({
      payload: {
        balance: balance,
        exchange: exchange,
      },
      type: WORKER_REPLY_TYPE_BALANCE,
    });
  }
  catch (err)
  {
    console.log(err);
  }
}

let alertPollIds = [];
let tickerPollIds = [];

onmessage = (event) => {
  const {
    payload,
    type,
  } = event.data;

  switch (event.data.type)
  {
    case WORKER_MESSAGE_TYPE_ALERTS:
      const alerts = payload;
      if (alerts.length > 0)
      {
        alertPollIds.forEach((alertPollId) => clearInterval(alertPollId));
        alertPollIds = alerts.map(
          (alert) => setInterval(() => pollAlert(alert), 8192)
        );
      }
      break;
    case WORKER_MESSAGE_TYPE_EXCHANGE_KEYS:
      const exchangeKeys = payload;
      if (exchangeKeys.length > 0)
      {
        exchangeKeys.forEach((exchangeKey) => syncExchangeBalance(exchangeKey));
      }
      break;
    case WORKER_MESSAGE_TYPE_TICKERS:
      const tickers = payload;
      if (tickers.length > 0)
      {
        tickerPollIds.forEach((tickerPollId) => clearInterval(tickerPollId));
        // tickerPollIds = tickers.map(
        //   (ticker) => setInterval(() => pollTicker(ticker), 8192)
        // );
      }
      break;
    default:
      if (process.env.NODE_ENV == 'dev')
      {
        console.log('Unknown worker message type');
      }
      break;
  }
};
