'''
Example:
    python3 sync_markets.py --debug 1 config.yaml
'''

from database import SQLite3Database
from bittrex_client import BittrexClient, BittrexClientRunner

import argparse
import yaml


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

    runners = []
    for market, config in configs.items():
        debug = args.debug == 1 or ('debug' in config and config['debug'])
        if debug:
            print(market, config)
        runners.append(BittrexClientRunner(config, update_interval=config['update_interval'], db_name='bittrex_markets.db', debug=debug))
        runners[-1].run()
