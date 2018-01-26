import ccxt             from 'ccxt';
import {
  GREATER_THAN,
  LESS_THAN,
  parseAlertIdentifier,
}                       from '../constants/alerts';

const binance = new ccxt.binance();
binance.proxy = 'https://cors-anywhere.herokuapp.com/';

// TODO: fix this function to handle 4 letter symbols
function formatTickerBinance(ticker)
{
  return `${ticker.substring(0, 3)}/${ticker.substring(3)}`;
}

function isConditionFulfilled(condition, price, createdAtUnix, trade)
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

async function f(alert)
{
  const {
    id,
    createdAtUnix,
    identifier,
  } = alert;

  const [market, price, condition] = parseAlertIdentifier(identifier);
  const [exchange, ticker] = market.split(':', 2);

  // console.log(exchange);
  // console.log(ticker);
  const trades = await binance.fetchTrades(formatTickerBinance(ticker));
  // console.log('fetched');
  // console.log(trades);

  const fulfillingTrades = trades.filter(
    (trade) => isConditionFulfilled(condition, price, createdAtUnix, trade)
  );
  if (fulfillingTrades.length > 0)
  {
    postMessage({
      alert: alert,
    });
  }

  setTimeout(() => f(alert), 16384);
}

onmessage = (event) => {
  const alerts = event.data.alerts;
  if (alerts.length > 0)
  {
    alerts.forEach((alert) => f(alert));
  }
};

// // JavaScript
// (async () => {
//   console.log (ccxt.exchanges);
//   let binance = new ccxt.binance();
//   // console.log(binance.has.CORS);
//   // console.log(binance.has.fetchOrderBook);
//   // console.log(binance.has.fetchClosedOrders);
//   // console.log(binance.has.fetchTrades);
//   binance.proxy = 'https://cors-anywhere.herokuapp.com/';
//   console.log (await (binance.fetchTrades('BNB/BTC'))); // ticker for BTC/USD
//   // let symbols = Object.keys (exchange.markets)
//   // let random = Math.floor ((Math.random () * symbols.length)) - 1
//   // console.log (exchange.fetchTicker (symbols[random])) // ticker for a random symbol
// })();
