import ccxt
import json

from api import Api

server = Api()

def parse_tokens_to_markets(markets_data):
  token_to_markets = {}
  for market_data in markets_data:
    token = market_data['base']
    if 'baseId' in token:
      token = market_data['baseId']
    market = market_data['symbol']
    if token in token_to_markets:
      token_to_markets[token] += [market]
    else:
      token_to_markets[token] = [market]
  return token_to_markets

def calculate_token_to_prices(
  exchange,
  token_to_markets,
  btc_usd,
  eth_usd,
  eth_btc,
  all_tickers = None,
):
  token_to_prices = {}

  for token, markets in token_to_markets.items():
    done = False
    # Note this will include USD and USDT markets
    usd_ticker = list(filter(lambda market: '/USD' in market, markets))
    if len(usd_ticker) > 0:
      if all_tickers == None:
        market_usd = exchange.fetchTicker(usd_ticker[0])
      else:
        market_usd = all_tickers[usd_ticker[0]]
      token_usd = market_usd['last']
      token_btc = market_usd['last'] / btc_usd['last']
      token_eth = market_usd['last'] / eth_usd['last']
      done = True

    btc_ticker = list(filter(lambda market: '/BTC' in market, markets))
    if not done and len(btc_ticker) > 0:
      if all_tickers == None:
        market_btc = exchange.fetchTicker(btc_ticker[0])
      else:
        market_btc = all_tickers[btc_ticker[0]]
      token_usd = market_btc['last'] * btc_usd['last']
      token_btc = market_btc['last']
      token_eth = market_btc['last'] / eth_btc['last']
      done = True

    eth_ticker = list(filter(lambda market: '/ETH' in market, markets))
    if not done and len(eth_ticker) > 0:
      if all_tickers == None:
        market_eth = exchange.fetchTicker(eth_ticker[0])
      else:
        market_eth = all_tickers[eth_ticker[0]]
      token_usd = market_eth['last'] * eth_usd['last']
      token_btc = market_eth['last'] * eth_btc['last']
      token_eth = market_eth['last']
      done = True

    if not done:
      token_to_prices[token] = {
        'price_usd': 0,
        'price_btc': 0,
        'price_eth': 0,
      }
    else:
      token_to_prices[token] = {
        'price_usd': token_usd,
        'price_btc': token_btc,
        'price_eth': token_eth,
      }

  return token_to_prices

def generate_token_exchanges_for_server(exchange, token_to_prices):
  token_exchanges = []
  for token, prices in token_to_prices.items():
    token_exchanges.append({
      **prices,
      **{
        'exchange': exchange,
        'identifier': token,
      }
    })
  return token_exchanges



### GDAX ###
gdax = ccxt.gdax()

gdax_btc_usd = gdax.fetchTicker('BTC/USD')
gdax_eth_usd = gdax.fetchTicker('ETH/USD')
gdax_eth_btc = gdax.fetchTicker('ETH/BTC')

token_to_markets = parse_tokens_to_markets(gdax.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  gdax,
  token_to_markets,
  gdax_btc_usd,
  gdax_eth_usd,
  gdax_eth_btc
)

payload = generate_token_exchanges_for_server('gdax', token_to_prices)
payload_str = json.dumps(payload).replace('"', '\\"')
response = server.update_token_exchanges(payload_str)
print(response)



# ### Binance ###
binance = ccxt.binance()
binance_all_tickers = binance.fetchTickers()

binance_btc_usd = binance_all_tickers['BTC/USDT']
binance_eth_usd = binance_all_tickers['ETH/USDT']
binance_eth_btc = binance_all_tickers['ETH/BTC']

token_to_markets = parse_tokens_to_markets(binance.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  binance,
  token_to_markets,
  binance_btc_usd,
  binance_eth_usd,
  binance_eth_btc,
  binance_all_tickers
)

payload = generate_token_exchanges_for_server('binance', token_to_prices)
payload_str = json.dumps(payload).replace('"', '\\"')
response = server.update_token_exchanges(payload_str)
print(response)



# ### Bittrex ###
bittrex = ccxt.bittrex()
bittrex_all_tickers = bittrex.fetchTickers()

bittrex_btc_usd = bittrex_all_tickers['BTC/USDT']
bittrex_eth_usd = bittrex_all_tickers['ETH/USDT']
bittrex_eth_btc = bittrex_all_tickers['ETH/BTC']

token_to_markets = parse_tokens_to_markets(bittrex.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  bittrex,
  token_to_markets,
  bittrex_btc_usd,
  bittrex_eth_usd,
  bittrex_eth_btc,
  bittrex_all_tickers
)

payload = generate_token_exchanges_for_server('bittrex', token_to_prices)
payload_str = json.dumps(payload).replace('"', '\\"')
response = server.update_token_exchanges(payload_str)
print(response)

