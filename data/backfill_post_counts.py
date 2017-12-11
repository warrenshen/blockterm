import json
import argparse
import praw
import time

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

from api import Api
from utils import datetime_string_to_unix_timestamp, \
                  unix_timestamp_to_datetime_string, \
                  unix_timestamps_until_today

ONE_DAY = 86400

server = Api()

def get_subreddit_by_name(subreddit_name):
    response = server.get_subreddit_by_name(subreddit_name)
    return response['data']['subredditByName']

def create_post_count(subreddit_name, count, timestamp):
    response = server.create_post_count(subreddit_name, count, timestamp)
    if 'errors' in response:
        return False
    else:
        return True

def create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end):
    posts = praw_subreddit.submissions(start, end)
    post_count = len(list(posts))
    timestamp_string = unix_timestamp_to_datetime_string(start)
    return create_post_count(subreddit_name, post_count, timestamp_string)

# Note that `api` refers to Rails API and `praw` refers to Reddit API.
def run_for_subreddit(subreddit_name):
    api_subreddit = get_subreddit_by_name(subreddit_name)
    if not api_subreddit:
        print('Subreddit with name %s does not exist on server' % subreddit_name)
        return

    praw_subreddit = reddit.subreddit(subreddit_name)

    start_date = api_subreddit['startDate']

    for unix_timestamp in unix_timestamps_until_today(start_date):
        success = create_post_count_for_subreddit(
            subreddit_name,
            praw_subreddit,
            unix_timestamp,
            unix_timestamp + ONE_DAY
        )

        if not success:
          break

        time.sleep(5)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Get market tickers', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument(
        '-s',
        dest='subreddit_name',
        help='Name of subreddit to backfill post counts for',
        required=True,
        type=str
    )
    args = parser.parse_args()

    run_for_subreddit(args.subreddit_name)

