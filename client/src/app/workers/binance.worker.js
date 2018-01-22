import 'babel-polyfill';
import ccxt from 'ccxt';

// JavaScript
(async () => {
  console.log (ccxt.exchanges);
  let binance = new ccxt.binance();
  console.log(binance.has.CORS);
  console.log(binance.has.fetchOrderBook);
  console.log(binance.has.fetchClosedOrders);
  console.log(binance.has.fetchTrades);
  binance.proxy = 'https://cors-anywhere.herokuapp.com/';
  console.log (await (binance.fetchTrades('BNB/BTC'))); // ticker for BTC/USD
  // let symbols = Object.keys (exchange.markets)
  // let random = Math.floor ((Math.random () * symbols.length)) - 1
  // console.log (exchange.fetchTicker (symbols[random])) // ticker for a random symbol
})();
