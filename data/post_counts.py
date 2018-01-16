import sqlite3

from api import Api
from database import SQLite3Database
from logger import logger
from reddit import reddit
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

ONE_DAY = 86400

server = Api()

logger.info('Starting post counts script...')

def create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end):
  posts_generator = praw_subreddit.submissions(start, end)
  posts = list(posts_generator)

  db = SQLite3Database('posts.db')
  success_count = 0

  for post in posts:
    try:
      post_id = post.id
      self_text = post.selftext
      created_utc = post.created_utc

      if db.insert_post(
        subreddit_name,
        post_id,
        self_text,
        created_utc
      ):
        success_count += 1
    except sqlite3.IntegrityError:
      pass
  db.close()
  logger.info('Synced %s posts for subreddit %s' % (success_count, subreddit_name))

  post_count = len(posts)
  datetime_string = unix_timestamp_to_datetime_string(start)
  return server.create_post_count(subreddit_name, post_count, datetime_string)

for subreddit_name in SUBREDDITS:
  praw_subreddit = reddit.subreddit(subreddit_name)
  # End timestamp is start of today, since we are getting post count for yesterday.
  end = unix_timestamp_today()
  start = end - ONE_DAY

  response = create_post_count_for_subreddit(
    subreddit_name,
    praw_subreddit,
    start,
    end
  )

  if 'errors' in response:
    raise Exception(response['errors'])

logger.info('Ending post counts script...')
