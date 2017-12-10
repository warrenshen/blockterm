import argparse
import json
import praw
import sqlite3
import time

from datetime import datetime
from praw.models import MoreComments

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

from api import Api
from database import SQLite3Database

ONE_DAY = 86400

db = SQLite3Database('comments.db')
server = Api()

def get_subreddit_by_name(subreddit_name):
    response = server.get_subreddit_by_name(subreddit_name)
    return response['data']['subredditByName']

def backfill_comments_for_subreddit(subreddit_name, praw_subreddit, start, end):
    posts = praw_subreddit.submissions(start, end)

    success_count = 0
    for post in posts:
        post_comments = post.comments.list()
        # Note we count an instance of MoreComments as one comment.
        for comment in post_comments:
            comment_id = comment.id
            parent_id = comment.parent_id
            if isinstance(comment, MoreComments):
                link_id = None
                body = None
                created_utc = None
            else:
                link_id = comment.link_id
                body = comment.body
                created_utc = comment.created_utc

            try:
                if db.insert_comment(
                    subreddit_name,
                    comment_id,
                    parent_id,
                    link_id,
                    body,
                    created_utc
                ):
                    success_count += 1
            except sqlite3.IntegrityError:
                continue

    return success_count

# Note that `api` refers to Rails API and `praw` refers to Reddit API.
def run_for_subreddit(subreddit_name):
    api_subreddit = get_subreddit_by_name(subreddit_name)
    if not api_subreddit:
        print('Subreddit with name %s does not exist on server' % subreddit_name)
        return

    praw_subreddit = reddit.subreddit(subreddit_name)

    start_date = api_subreddit['startDate']
    start_date_timestamp = int(datetime.strptime(start_date, '%Y-%m-%d').strftime('%s'))

    today_timestamp = int(time.mktime(datetime.today().date().timetuple()))

    for timestamp in range(start_date_timestamp, today_timestamp, ONE_DAY):
        success_count = backfill_comments_for_subreddit(
            subreddit_name,
            praw_subreddit,
            timestamp,
            timestamp + ONE_DAY
        )
        time.sleep(10)

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

