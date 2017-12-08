import json
import logging
import praw

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

from api import Api
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

ONE_DAY = 86400

server = Api()

def create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end):
    posts = praw_subreddit.submissions(start, end)
    post_count = len(list(posts))
    timestamp_string = unix_timestamp_to_datetime_string(start)
    return server.create_post_count(subreddit_name, post_count, timestamp_string)

logging.basicConfig(
    level=logging.INFO,
    filename='log.log',
    filemode='a+',
    format='%(asctime)-15s %(levelname)-8s %(message)s'
)
logging.info('Starting post counts script...')

for subreddit_name in SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    # End timestamp is start of today, since we are getting post count for yesterday.
    end = unix_timestamp_today()
    start = end - ONE_DAY
    response = create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end)

logging.info('Ending post counts script...')
