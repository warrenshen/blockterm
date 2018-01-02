import argparse
import sqlite3
import time

from praw.models import MoreComments
from prawcore.exceptions import RequestException

from api import Api
from database import SQLite3Database
from logger import logger
from reddit import reddit
from utils import unix_timestamp_to_datetime_string, \
                  unix_timestamps_until_today

ONE_DAY = 86400

server = Api()

logger.info('Starting backfill comments script...')

def get_subreddit_by_name(subreddit_name):
    response = server.get_subreddit_by_name(subreddit_name)
    return response['data']['subredditByName']

def backfill_posts_and_comments(subreddit_name, praw_subreddit, start, end):
    posts = praw_subreddit.submissions(start, end)
    post_success_count = 0
    comment_success_count = 0

    datetime_string = unix_timestamp_to_datetime_string(start)
    logger.info('Backfilling subreddit %s posts and comments from %s' % (subreddit_name, datetime_string))

    for post in posts:
        db = SQLite3Database('posts.db')
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
                post_success_count += 1
        except sqlite3.IntegrityError:
            pass
        db.close()

        for i in range(10):
          try:
            post_comments = post.comments.list()
            break
          except RequestException:
            time.sleep(10)
            if i >= 9:
              logger.info('Request exception after 10 tries')
              raise Exception('Request exception after 10 tries')

        post_comments = post.comments.list()

        db = SQLite3Database('comments.db')
        last_created_utc = None

        # Note we count an instance of MoreComments as one comment.
        for comment in post_comments:
            comment_id = comment.id
            parent_id = comment.parent_id
            if isinstance(comment, MoreComments):
                link_id = None
                body = 'MORE_COMMENTS'
                created_utc = last_created_utc
            else:
                link_id = comment.link_id
                body = comment.body
                created_utc = comment.created_utc
                last_created_utc = created_utc

            try:
                if db.insert_comment(
                    subreddit_name,
                    comment_id,
                    parent_id,
                    link_id,
                    body,
                    created_utc
                ):
                    comment_success_count += 1
            except sqlite3.IntegrityError:
                continue

        db.close()

        time.sleep(5)

    logger.info('Backfilled %s posts for subreddit %s' % (post_success_count, subreddit_name))
    logger.info('Backfilled %s comments for subreddit %s' % (comment_success_count, subreddit_name))

# Note that `api` refers to Rails API and `praw` refers to Reddit API.
def run_for_subreddit(subreddit_name):
    api_subreddit = get_subreddit_by_name(subreddit_name)
    if not api_subreddit:
        print('Subreddit with name %s does not exist on server' % subreddit_name)
        return

    praw_subreddit = reddit.subreddit(subreddit_name)

    start_date = api_subreddit['startDate']

    for unix_timestamp in unix_timestamps_until_today('2017-12-30', '%Y-%m-%d'):
        backfill_posts_and_comments(
            subreddit_name,
            praw_subreddit,
            unix_timestamp,
            unix_timestamp + ONE_DAY
        )

        time.sleep(3)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Backfill comments in a subreddit', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument(
        '-s',
        dest='subreddit_name',
        help='Name of subreddit to backfill comments for',
        required=True,
        type=str
    )
    args = parser.parse_args()

    run_for_subreddit(args.subreddit_name)

logger.info('Ending backfill comments script...')
