import ccxt
import json
import time

from api import Api
from logger import logger

server = Api()

def parse_tokens_to_markets(markets_data):
  token_to_markets = {}
  for market_data in markets_data:
    token = market_data['base']
    if 'baseId' in market_data:
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
  btc_usd_last,
  eth_usd_last,
  eth_btc_last,
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
      # If the last market USD price is `None` we replace it with 0.0.
      market_usd_last = market_usd['last'] or 0.0
      token_usd = market_usd_last
      token_btc = market_usd_last / btc_usd_last
      token_eth = market_usd_last / eth_usd_last
      done = True

    btc_ticker = list(filter(lambda market: '/BTC' in market, markets))
    if not done and len(btc_ticker) > 0:
      if all_tickers == None:
        market_btc = exchange.fetchTicker(btc_ticker[0])
      else:
        market_btc = all_tickers[btc_ticker[0]]
      token_usd = market_btc['last'] * btc_usd_last
      token_btc = market_btc['last']
      token_eth = market_btc['last'] / eth_btc_last
      done = True

    eth_ticker = list(filter(lambda market: '/ETH' in market, markets))
    if not done and len(eth_ticker) > 0:
      if all_tickers == None:
        market_eth = exchange.fetchTicker(eth_ticker[0])
      else:
        market_eth = all_tickers[eth_ticker[0]]
      token_usd = market_eth['last'] * eth_usd_last
      token_btc = market_eth['last'] * eth_btc_last
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

def generate_token_exchanges(exchange, token_to_prices):
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

def update_token_exchanges(token_exchanges):
  step = 128
  for i in range(0, len(token_exchanges), step):
    batch_token_exchanges = token_exchanges[i:i + step]
    payload = json.dumps(batch_token_exchanges).replace('"', '\\"')
    response = server.update_token_exchanges(payload)
    time.sleep(4)
    print(response)
  time.sleep(48)




logger.info('Starting token exchanges script...')



### Coinmarketcap ###
# cmc = ccxt.coinmarketcap()
# cmc_all_tickers = cmc.fetchTickers()

# cmc_btc_usd_last = cmc_all_tickers['BTC/USD']['last']
# cmc_eth_usd_last = cmc_all_tickers['ETH/USD']['last']
# cmc_eth_btc_last = cmc_eth_usd_last / cmc_btc_usd_last

# token_to_markets = parse_tokens_to_markets(cmc.fetchMarkets())
# token_to_prices = calculate_token_to_prices(
#   cmc,
#   token_to_markets,
#   cmc_btc_usd_last,
#   cmc_eth_usd_last,
#   cmc_eth_btc_last,
#   cmc_all_tickers
# )

# token_exchanges = generate_token_exchanges('coinmarketcap', token_to_prices)
# update_token_exchanges(token_exchanges)



### GDAX ###
gdax = ccxt.gdax()

gdax_btc_usd_last = gdax.fetchTicker('BTC/USD')['last']
gdax_eth_usd_last = gdax.fetchTicker('ETH/USD')['last']
gdax_eth_btc_last = gdax.fetchTicker('ETH/BTC')['last']

token_to_markets = parse_tokens_to_markets(gdax.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  gdax,
  token_to_markets,
  gdax_btc_usd_last,
  gdax_eth_usd_last,
  gdax_eth_btc_last
)

token_exchanges = generate_token_exchanges('gdax', token_to_prices)
update_token_exchanges(token_exchanges)



### Binance ###
binance = ccxt.binance()
binance_all_tickers = binance.fetchTickers()

binance_btc_usd_last = binance_all_tickers['BTC/USDT']['last']
binance_eth_usd_last = binance_all_tickers['ETH/USDT']['last']
binance_eth_btc_last = binance_all_tickers['ETH/BTC']['last']

token_to_markets = parse_tokens_to_markets(binance.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  binance,
  token_to_markets,
  binance_btc_usd_last,
  binance_eth_usd_last,
  binance_eth_btc_last,
  binance_all_tickers
)

token_exchanges = generate_token_exchanges('binance', token_to_prices)
update_token_exchanges(token_exchanges)



### Bittrex ###
bittrex = ccxt.bittrex()
bittrex_all_tickers = bittrex.fetchTickers()

bittrex_btc_usd_last = bittrex_all_tickers['BTC/USDT']['last']
bittrex_eth_usd_last = bittrex_all_tickers['ETH/USDT']['last']
bittrex_eth_btc_last = bittrex_all_tickers['ETH/BTC']['last']

token_to_markets = parse_tokens_to_markets(bittrex.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  bittrex,
  token_to_markets,
  bittrex_btc_usd_last,
  bittrex_eth_usd_last,
  bittrex_eth_btc_last,
  bittrex_all_tickers
)

token_exchanges = generate_token_exchanges('bittrex', token_to_prices)
update_token_exchanges(token_exchanges)



### Kucoin ###
kucoin = ccxt.kucoin()
kucoin_all_tickers = kucoin.fetchTickers()

kucoin_btc_usd_last = kucoin_all_tickers['BTC/USDT']['last']
kucoin_eth_usd_last = kucoin_all_tickers['ETH/USDT']['last']
kucoin_eth_btc_last = kucoin_all_tickers['ETH/BTC']['last']

token_to_markets = parse_tokens_to_markets(kucoin.fetchMarkets())
token_to_prices = calculate_token_to_prices(
  kucoin,
  token_to_markets,
  kucoin_btc_usd_last,
  kucoin_eth_usd_last,
  kucoin_eth_btc_last,
  kucoin_all_tickers
)

token_exchanges = generate_token_exchanges('kucoin', token_to_prices)
update_token_exchanges(token_exchanges)



logger.info('Ending token exchanges script...')
