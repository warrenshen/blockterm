from base_client_runner import Client, BaseClientRunner
from database import SQLite3Database
from datetime import datetime as dt
from datetime import timedelta
from pprint import pprint

import argparse
import json
import requests
import yaml


class BittrexClient(Client):
    def __init__(self, config=None, key=None, secret=None, min_wait_time=30, markets=None, base='BTC', debug=False):
        self.key = key
        self.secret = secret
        self.base = config['base'] if 'base' in config else base
        if self.base != 'BTC' and self.base != 'USDT':
            raise Exception('Base type not supported, please use "BTC" or "USDT"')
        self.markets = config['markets'] if 'markets' in config else markets
        self.min_wait_time = config['min_wait_time'] if 'min_wait_time' in config else min_wait_time
        self.debug = config['debug'] if 'debug' in config else debug
        self.last_update_dt = None
        self.update()

    def get_ticker(self, coin, base='BTC'):
        api_url = 'https://bittrex.com/api/v1.1/public/getticker?market={}-{}'.format(base, coin)
        return self._curl_result(api_url)

    def update(self):
        if not self.last_update_dt or (dt.now() - self.last_update_dt > timedelta(seconds=self.min_wait_time)):
            self.market_summaries = self._get_all_market_summaries()
            self.last_update_dt = dt.now()

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
                print('[INFO] Bittrex data for {} updated at: {}'.format(self.base, self.last_update_dt))
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
            content = json.loads((response.content))
            if not content['success']:
                raise Exception('Request failed with server response message: {}'.format(content['message']))
            result = content['result']
        except Exception as e:
            print(e)
        return result


class BittrexClientRunner(BaseClientRunner):
    def __init__(self, config, update_interval=5, db_name='bittrex_markets.db', debug=False):
        client = BittrexClient(config)
        super().__init__(client, update_interval=update_interval)
        self.db_name = db_name
        db = SQLite3Database(self.db_name)
        self.debug = config['debug'] if 'debug' in config else debug
        query = '''
            CREATE TABLE IF NOT EXISTS {} (
                name string,
                last double,
                ts datetime,
                dt datetime
            )'''.format(self.client.base)
        if self.debug:
            print(query)
        db.cursor.execute(query)

    def run(self):
        super().run()
        db = SQLite3Database(self.db_name)
        for _, summary in self.client.market_summaries.items():
            query = '''
                INSERT INTO {} (
                    name,
                    last,
                    ts,
                    dt
                )
                VALUES (?, ?, ?, ?)'''.format(self.client.base)

            values = (summary['MarketName'], summary['Last'], summary['TimeStamp'], dt.now())
            db.cursor.execute(query, values)
        db.conn.commit()
        if self.debug:
            print('[INFO] Data committed to sqlite database {} table {}'.format(self.db_name, self.client.base))


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
        runners.append(BittrexClientRunner(config, update_interval=config['update_interval'], db_name='bittrex_markets.db', debug=debug))
        runners[-1].run()
