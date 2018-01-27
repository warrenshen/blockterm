import ccxt             from 'ccxt';
import {
  GREATER_THAN,
  LESS_THAN,
  parseAlertIdentifier,
}                       from '../constants/alerts';

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

async function monitorAlert(alert)
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
      alert: alert,
    });
    return true;
  }
  else
  {
    setTimeout(() => f(alert), 16384);
  }
}

onmessage = (event) => {
  const alerts = event.data.alerts;
  if (alerts.length > 0)
  {
    alerts.forEach((alert) => monitorAlert(alert));
  }
};
