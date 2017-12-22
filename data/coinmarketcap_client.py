import json
import requests

from api import Api
from base_client_runner import Client
from database import SQLite3Database
from logger import logger

class CoinmarketcapClient(Client):
  def __init__(self):
    self.api = Api()

  def _curl_result(self, url):
    result = None
    try:
      response = requests.get(url)
      str_response = response.content.decode('utf-8')
      content = json.loads(str_response)
      if 'total_market_cap_usd' not in content:
        raise Exception('Response different than expected: {}'.format(content))
      else:
        result = content
    except Exception as e:
      print('Failure with error message {}'.format(e))
    return result

  def run(self):
    result = self._curl_result('https://api.coinmarketcap.com/v1/global/')
    if result == None:
      return

    value = result['total_market_cap_usd']
    timestamp = result['last_updated']

    db = SQLite3Database('total_market_caps.db')
    db.insert_total_ticker(str(result), timestamp)
    db.close()

    response = self.api.create_market_ticker_by_market_name(
      'MARKET',
      value,
      timestamp
    )
    if 'errors' in response:
      logger.log('Something went wrong with saving total market ticker')
      return False
    else:
      return True

cc = CoinmarketcapClient()

if __name__ == '__main__':
  logger.info('Starting coinmarketcap script...')
  client = CoinmarketcapClient()
  client.run()
  logger.info('Ending coinmarketcap script...')
