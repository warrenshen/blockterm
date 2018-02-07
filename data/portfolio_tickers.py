from api import Api
from logger import logger

server = Api()

logger.info('Starting portfolio tickers script...')
response = server.create_portfolio_tickers()
if 'errors' in response:
  raise Exception(response['errors'])
logger.info('Ending portfolio tickers script...')

