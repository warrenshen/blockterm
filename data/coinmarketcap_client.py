import argparse
import json
import requests
import time

from api import Api
from base_client_runner import Client
from database import SQLite3Database
from logger import logger
from utils import unix_timestamp_to_datetime_string

class CoinmarketcapClient:
  def __init__(self):
    self.api = Api()

  def _curl_result(self, url):
    result = None
    try:
      response = requests.get(url)
      str_response = response.content.decode('utf-8')
      result = json.loads(str_response)
    except Exception as e:
      print('Failure with error message {}'.format(e))
    return result

  def _get_global(self):
    global_target_url = 'https://api.coinmarketcap.com/v1/global/'
    global_result = self._curl_result(global_target_url)

    if global_result == None:
      logger.info('Something went wrong with fetching globals')
      raise Exception('Something went wrong with fetching globals')
    elif 'total_market_cap_usd' not in global_result:
      logger.info('Globals response different than expected: {}'.format(global_result))
      raise Exception('Globals response different than expected: {}'.format(global_result))

    bitcoin_target_url = 'https://api.coinmarketcap.com/v1/ticker/bitcoin'
    bitcoin_result = self._curl_result(bitcoin_target_url)

    if bitcoin_result == None or len(bitcoin_result) <= 0:
      raise Exception('Something went wrong with fetching bitcoin ticker')

    ethereum_target_url = 'https://api.coinmarketcap.com/v1/ticker/ethereum'
    ethereum_result = self._curl_result(ethereum_target_url)

    if ethereum_result == None or len(ethereum_result) <= 0:
      raise Exception('Something went wrong with fetching bitcoin ticker')

    total_market_cap_usd = global_result['total_market_cap_usd']
    global_timestamp = global_result['last_updated']
    datetime_string = unix_timestamp_to_datetime_string(global_timestamp)

    db = SQLite3Database('total_market_caps.db')
    db.insert_total_ticker(str(global_result), global_timestamp)
    db.close()

    response = self.api.create_market_ticker_by_market_name(
      'TOTAL',
      total_market_cap_usd,
      datetime_string
    )

    if 'errors' in response:
      logger.info('Something went wrong with saving total market ticker')
      raise Exception('Something went wrong with saving total market ticker')

    ethereum_market_cap_usd = ethereum_result[0]['market_cap_usd']
    ethereum_timestamp = ethereum_result[0]['last_updated']
    datetime_string = unix_timestamp_to_datetime_string(int(ethereum_timestamp))

    bitcoin_market_cap_usd = bitcoin_result[0]['market_cap_usd']
    bitcoin_timestamp = bitcoin_result[0]['last_updated']
    datetime_string = unix_timestamp_to_datetime_string(int(bitcoin_timestamp))

    response = self.api.create_market_ticker_by_market_name(
      'TOTAL_BITCOIN',
      bitcoin_market_cap_usd,
      datetime_string
    )

    # TODO: total ethereum?

    altcoins_market_cap_usd = str(int(total_market_cap_usd) - int(bitcoin_market_cap_usd))
    response = self.api.create_market_ticker_by_market_name(
      'TOTAL_ALTCOINS',
      altcoins_market_cap_usd,
      datetime_string
    )

    bitcoin_percent = round(int(bitcoin_market_cap_usd) * 100 / int(total_market_cap_usd), 2)
    response = self.api.create_market_ticker_by_market_name(
      'PERCENT_BITCOIN',
      str(bitcoin_percent),
      datetime_string
    )

    ethereum_percent = round(int(ethereum_market_cap_usd) * 100 / int(total_market_cap_usd), 2)
    response = self.api.create_market_ticker_by_market_name(
      'PERCENT_ETHEREUM',
      str(ethereum_percent),
      datetime_string
    )

    altcoins_percent = round(100.0 - bitcoin_percent - ethereum_percent, 2)
    response = self.api.create_market_ticker_by_market_name(
      'PERCENT_ALTCOINS',
      str(altcoins_percent),
      datetime_string
    )

  def _get_tickers(self):
    target_url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0'
    result = self._curl_result(target_url)

    if result == None:
      logger.info('Something went wrong with fetching market tickers')
      return

    db = SQLite3Database('cmc_tickers.db')

    # [{'id': 'bitcoin', 'name': 'Bitcoin', ... }, { ... }]
    step = 64
    for i in range(0, len(result), step):
      tokens = result[i:i + step]
      tokens_string = json.dumps(tokens)
      tokens_string = tokens_string.replace('"', '\\"')
      response = self.api.update_tokens(tokens_string)
      time.sleep(8)

      if 'errors' in response:
        print('Something went wrong with saving market ticker: %s' % response['errors'])
        logger.info('Something went wrong with saving market ticker: %s' % response['errors'])

    for token_dict in result:
      str_timestamp = token_dict['last_updated']
      if str_timestamp is None:
        continue
      else:
        timestamp = int(str_timestamp)

      datetime_string = unix_timestamp_to_datetime_string(timestamp)
      db.insert_cmc_ticker(str(token_dict), timestamp)

      # response = self.api.update_token(
      #   token_dict['symbol'],
      #   token_dict['id'],
      #   token_dict['name'],
      #   token_dict['id'],
      #   token_dict['price_usd'],
      #   token_dict['price_btc'],
      #   token_dict['24h_volume_usd'],
      #   token_dict['market_cap_usd'],
      #   token_dict['available_supply'],
      #   token_dict['total_supply'],
      #   token_dict['max_supply'],
      #   token_dict['percent_change_1h'],
      #   token_dict['percent_change_24h'],
      #   token_dict['percent_change_7d']
      # )
      # time.sleep(0.1)

    db.close()

  def run_global(self):
    self._get_global()

  def run_tickers(self):
    self._get_tickers()

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Collection coinmarketcap data', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
  parser.add_argument(
    '-t',
    dest='type',
    help='What type of data to collect',
    required=True,
    type=str
  )
  args = parser.parse_args()

  logger.info('Starting coinmarketcap script...')
  client = CoinmarketcapClient()

  if args.type == 'global':
    client.run_global()
  elif args.type == 'tickers':
    client.run_tickers()
  else:
    raise Exception('Invalid type argument')
  logger.info('Ending coinmarketcap script...')
