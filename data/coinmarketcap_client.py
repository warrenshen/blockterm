import json
import requests

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

  def _get_globals(self):
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

    # [{'id': 'bitcoin', 'name': 'Bitcoin', ... }, { ... }]
    for token_dict in result:
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

      if 'errors' in response:
        logger.info('Something went wrong with saving market ticker: %s' % response['errors'])

  def run(self):
    self._get_globals()
    self._get_tickers()

if __name__ == '__main__':
  logger.info('Starting coinmarketcap script...')
  client = CoinmarketcapClient()
  client.run()
  logger.info('Ending coinmarketcap script...')
