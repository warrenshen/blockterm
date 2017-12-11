import sqlite3

from praw.models import MoreComments

from api import Api
from database import SQLite3Database
from logger import logger
from reddit import reddit
from subreddits import SUBREDDITS
from utils import unix_timestamp_now

ONE_DAY = 86400

server = Api()

db = SQLite3Database('comments.db')
db.cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        comment_id string PRIMARY KEY,
        parent_id string,
        subreddit_name string,
        link_id string,
        body string,
        created_utc int
    )
''')
db.cursor.execute('''
    CREATE INDEX IF NOT EXISTS comments_subreddit_name_and_created_utc
    ON comments (subreddit_name, created_utc)
''')

logger.info('Starting sync blob and comments script...')

def insert_comments(subreddit_name, comments):
    success_count = 0

    for comment in comments:
        # Same logic as in backfill_comments.py - refactor?
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
            response = db.insert_comment(
                subreddit_name,
                comment_id,
                parent_id,
                link_id,
                body,
                created_utc
            )
            success_count += 1

        except sqlite3.IntegrityError:
            pass

    return success_count

def fetch_new_comments_for_subreddit(subreddit_name, praw_subreddit):
    done = False
    after = None

    fetch_count = 0

    while not done:
        if not after:
            comments_generator = praw_subreddit.comments(limit=100)
        else:
            comments_generator = praw_subreddit.comments(
                limit=100,
                params={ 'after': after }
            )

        comments = list(comments_generator)

        if len(comments) == 0:
            # This means we've hit the 1000 comment limit and likely
            # are misssing some comments.
            done = True
            continue

        earliest_id = 't1_' + comments[-1].id
        earliest_created = comments[-1].created_utc
        success_count = insert_comments(subreddit_name, comments)

        if success_count < len(comments):
            done = True
        else:
            after = earliest_id

        fetch_count += success_count

    return fetch_count

def update_subreddit_blob(subreddit_name, praw_subreddit, start, end):
  posts = praw_subreddit.submissions(start, end)
  post_count = len(list(posts))

  comment_count = db.get_comment_count_for_subreddit(
    subreddit_name,
    start,
    end
  )

  active_user_count = praw_subreddit.active_user_count
  subscriber_count = praw_subreddit.subscribers

  return server.update_subreddit_blob(
    subreddit_name,
    post_count,
    comment_count,
    active_user_count,
    subscriber_count
  )

for subreddit_name in SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    fetch_count = fetch_new_comments_for_subreddit(subreddit_name, praw_subreddit)
    logger.info('Synced %s comments for subreddit %s' % (fetch_count, subreddit_name))

    end = unix_timestamp_now()
    start = end - ONE_DAY
    response = update_subreddit_blob(subreddit_name, praw_subreddit, start, end)

logger.info('Ending sync blob and comments script...')
