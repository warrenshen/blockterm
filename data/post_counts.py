from api import Api
from logger import logger
from reddit import reddit
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

ONE_DAY = 86400

server = Api()

logger.info('Starting post counts script...')

def create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end):
  posts = praw_subreddit.submissions(start, end)
  post_count = len(list(posts))
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

logger.info('Ending post counts script...')
