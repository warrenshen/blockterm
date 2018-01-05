import time

from api import Api
from database import SQLite3Database
from logger import logger
from utils import unix_timestamp_to_datetime_string, \
                  unix_timestamps_until_today

ONE_DAY = 86400

server = Api()

response = server.get_all_keywords()
keywords = response['data']['allKeywords']

keyword_id_to_words = {}
for keyword in keywords:
  keyword_id_to_words[keyword['id']] = keyword['word']

def get_subreddit_by_name(subreddit_name):
  response = server.get_subreddit_by_name(subreddit_name)
  return response['data']['subredditByName']

def create_counts_for_subreddit(subreddit_name, start, end):
  datetime_string = unix_timestamp_to_datetime_string(start)

  success = True

  for keyword_id, word in keyword_id_to_words.items():
    db = SQLite3Database('comments.db')
    mention_count = db.get_keyword_count_for_subreddit(subreddit_name, word, start, end)
    db.close()
    logger.info('Keyword {} mentioned {} times in subreddit {}'.format(
      word,
      mention_count,
      subreddit_name
    ))

    response = server.create_mention_count(
      subreddit_name,
      keyword_id,
      mention_count,
      datetime_string
    )

    success = success and 'errors' not in response

  return success

def run_for_subreddit(subreddit_name):
  api_subreddit = get_subreddit_by_name(subreddit_name)
  if not api_subreddit:
    print('Subreddit with name %s does not exist on server' % subreddit_name)
    return

  start_date = api_subreddit['startDate']

  for unix_timestamp in unix_timestamps_until_today(start_date, '%Y-%m-%d'):
    success = create_counts_for_subreddit(
      subreddit_name,
      unix_timestamp,
      unix_timestamp + ONE_DAY
    )
    if not success:
      raise Exception('Could not create mention count')

    # Don't need to sleep much since we aren't using reddit API.
    time.sleep(0.1)

SUBREDDITS = [
  'CryptoCurrency',
  'CryptoMarkets',
]

if __name__ == '__main__':
  logger.info('Starting backfill mention counts script...')
  for subreddit_name in SUBREDDITS:
    run_for_subreddit(subreddit_name)
  logger.info('Ending backfill mention counts script...')
