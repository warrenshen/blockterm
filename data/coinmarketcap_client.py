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
    target_url = 'https://api.coinmarketcap.com/v1/global/'
    result = self._curl_result(target_url)

    if result == None:
      logger.info('Something went wrong with fetching globals')
      return
    elif 'total_market_cap_usd' not in result:
      logger.info('Globals response different than expected: {}'.format(result))
      return

    value = result['total_market_cap_usd']
    timestamp = result['last_updated']
    datetime_string = unix_timestamp_to_datetime_string(timestamp)

    db = SQLite3Database('total_market_caps.db')
    db.insert_total_ticker(str(result), timestamp)
    db.close()

    response = self.api.create_market_ticker_by_market_name(
      'TOTAL',
      value,
      datetime_string
    )
    if 'errors' in response:
      logger.info('Something went wrong with saving total market ticker')
      return False
    else:
      return True

  def _get_tickers(self):
    target_url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0'
    result = self._curl_result(target_url)

    if result == None:
      logger.info('Something went wrong with fetching market tickers')
      return

    db = SQLite3Database('cmc_tickers.db')

    # [{'id': 'bitcoin', 'name': 'Bitcoin', ... }, { ... }]
    for token_dict in result[:500]:
      str_timestamp = token_dict['last_updated']
      if str_timestamp is None:
        continue
      else:
        timestamp = int(str_timestamp)

      datetime_string = unix_timestamp_to_datetime_string(timestamp)
      db.insert_cmc_ticker(str(token_dict), timestamp)

      response = self.api.update_token(
        token_dict['symbol'],
        token_dict['price_usd'],
        token_dict['price_btc'],
        token_dict['24h_volume_usd'],
        token_dict['market_cap_usd'],
        token_dict['available_supply'],
        token_dict['total_supply'],
        token_dict['max_supply'],
        token_dict['percent_change_1h'],
        token_dict['percent_change_24h'],
        token_dict['percent_change_7d']
      )

      time.sleep(1)

    db.close()

    if 'errors' in response:
      logger.info('Something went wrong with saving market ticker: %s' % response['errors'])

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
