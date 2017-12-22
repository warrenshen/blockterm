import argparse
import json
import requests
import yaml

from datetime import datetime as dt
from datetime import timedelta

from api import Api
from base_client_runner import Client, BaseClientRunner
from database import SQLite3Database
from logger import logger
from utils import datetime_string_utc_to_pst, unix_timestamp_to_datetime_string

class BittrexClient(Client):
  def __init__(self, config=None, key=None, min_wait_time=30, markets=None, base='BTC', debug=False):
    self.key = key
    self.base = config['base'] if 'base' in config else base
    if self.base != 'BTC' and self.base != 'USDT':
      raise Exception('Base type not supported, please use "BTC" or "USDT"')
    self.markets = config['markets'] if 'markets' in config else markets
    self.debug = config['debug'] if 'debug' in config else debug
    self.update()

  def get_ticker(self, coin, base='BTC'):
    api_url = 'https://bittrex.com/api/v1.1/public/getticker?market={}-{}'.format(base, coin)
    return self._curl_result(api_url)

  def update(self):
    self.market_summaries = self._get_all_market_summaries()

    summary_dict = {elem['MarketName']:elem for elem in self.market_summaries if elem['MarketName'].startswith(self.base)}
    if not self.markets:
      self.market_summaries = summary_dict
    else:
      self.market_summaries = {}
      for key in self.markets:
        summary_key = '{}-{}'.format(self.base, key)
        if summary_key in summary_dict:
          self.market_summaries[summary_key] = summary_dict[summary_key]

    if self.debug:
      print('[INFO] Bittrex data for {}'.format(self.base))
    return True

  def _get_all_market_summaries(self):
    api_url = 'https://bittrex.com/api/v1.1/public/getmarketsummaries'

    result = self._curl_result(api_url)
    return [
      {
        'MarketName': elem['MarketName'],
        'Last': elem['Last'],
        'TimeStamp': elem['TimeStamp']
      } for elem in result
    ]

  def _get_active_currencies(self):
    api_url = 'https://bittrex.com/api/v1.1/public/getcurrencies'
    result = self._curl_result(api_url)
    active_currencies = [
      {
        'TxFee': elem['TxFee'],
        'CurrencyLong': elem['CurrencyLong'],
        'Currency': elem['Currency'],
        'CoinType': elem['CoinType'],
      } for elem in result if elem['IsActive']
    ]
    return active_currencies

  def _curl_result(self, url):
    result = None
    try:
      response = requests.get(url)
      str_response = response.content.decode('utf-8')
      content = json.loads(str_response)
      if not content['success']:
        raise Exception('Request failed with server response message: {}'.format(content['message']))
      result = content['result']
    except Exception as e:
      print(e)
    return result

class BittrexClientRunner:
  def __init__(self, config, debug=False):
    self.client = BittrexClient(config)
    self.debug = config['debug'] if 'debug' in config else debug

    self.api = Api()
    response = self.api.get_all_markets()
    if 'data' in response and 'allMarkets' in response['data']:
      self.market_id_map = {market['name'] : market['id'] for market in response['data']['allMarkets']}
      if self.debug:
        print('[INFO] Market id map created.')

  def run(self):
    success_count = 0
    db = SQLite3Database('market_tickers.db')
    for _, summary in self.client.market_summaries.items():
      if db.insert_market_ticker(
        summary['MarketName'],
        summary['Last'],
        summary['TimeStamp'],
        dt.now()
      ):
        success_count += 1
    db.close()
    logger.info('Synced {} market tickers'.format(success_count))

    if self.debug:
      print('[INFO] Data committed to sqlite database {}'.format('market_tickers.db'))

    for _, summary in self.client.market_summaries.items():
      pst_timestamp = datetime_string_utc_to_pst(summary['TimeStamp'], '%Y-%m-%dT%H:%M:%S.%f')
      if summary['MarketName'] in self.market_id_map:
        self.api.create_market_ticker(
          self.market_id_map[summary['MarketName']],
          summary['Last'],
          pst_timestamp
        )

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Get market tickers', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
  parser.add_argument('config_file', help='Path to config yaml file')
  parser.add_argument('--markets', dest='markets', nargs='+', default=['bittrex'], help='Target markets to get the information')
  parser.add_argument('--debug', dest='debug', default=0, type=int, help='Set debug flag to 1 to debug mode')
  args = parser.parse_args()

  configs = {}
  with open(args.config_file, 'r') as f:
    try:
      configs = yaml.load(f)
    except yaml.YAMLError as exc:
      print(exc)
  debug = args.debug == 1 or ('debug' in config and config['debug'])
  runners = []
  for market, config in configs.items():
    if debug:
      print(market, config)
    runners.append(BittrexClientRunner(config, debug=debug))
    runners[-1].run()
