import ccxt from 'ccxt';

const binance = new ccxt.binance();
binance.proxy = 'https://cors-anywhere.herokuapp.com/';

async function f(alert)
{
  const identifier = alert.identifier;
  const trades = await binance.fetchTrades('BNB/BTC');
  console.log(trades);

  setTimeout(() => f(alert), 16384);
  console.log('Posting message back to main script');
  postMessage('hey');
}

onmessage = (event) => {
  console.log('Message received from main script');

  const user = event.data;
  const alerts = user.alerts;
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
