import argparse
import sqlite3
import time

from api import Api
from database import SQLite3Database
from logger import logger
from subreddits import SUBREDDITS
from utils import unix_timestamp_to_datetime_string, \
                  unix_timestamps_until_today

ONE_DAY = 86400

db = SQLite3Database('comments.db')
server = Api()

ONE_DAY = 86400

def get_subreddit_by_name(subreddit_name):
  response = server.get_subreddit_by_name(subreddit_name)
  if 'errors' in response:
    return None
  else:
    return response['data']['subredditByName']

def create_comment_count_for_subreddit(subreddit_name, start, end):
  comment_count = db.get_comment_count_for_subreddit(
    subreddit_name,
    start,
    end
  )

  datetime_string = unix_timestamp_to_datetime_string(start)
  return server.create_comment_count(subreddit_name, comment_count, datetime_string)

# Note that `api` refers to Rails API and `praw` refers to Reddit API.
def run_for_subreddit(subreddit_name):
  api_subreddit = get_subreddit_by_name(subreddit_name)
  if not api_subreddit:
    print('Subreddit with name %s does not exist on server' % subreddit_name)
    return

  start_date = api_subreddit['startDate']

  for unix_timestamp in unix_timestamps_until_today(start_date):
    success = create_comment_count_for_subreddit(
      subreddit_name,
      unix_timestamp,
      unix_timestamp + ONE_DAY
    )

    if not success:
      break

    # Don't need to sleep much since we aren't using reddit API.
    time.sleep(1)

if __name__ == '__main__':
  parser = argparse.ArgumentParser(
    description='Backfill comment counts',
    formatter_class=argparse.ArgumentDefaultsHelpFormatter
  )
  parser.add_argument(
    '-s',
    dest='subreddit_name',
    help='Name of subreddit to backfill post counts for',
    required=True,
    type=str
  )
  args = parser.parse_args()

  logger.info('Starting backfill comment counts script...')
  run_for_subreddit(args.subreddit_name)
  logger.info('Ending backfill comment counts script...')