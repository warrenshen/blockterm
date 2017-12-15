from api import Api
from database import SQLite3Database
from logger import logger
from reddit import reddit
from subreddits import SUBREDDITS
from utils import unix_timestamp_now, datetime_string_now

server = Api()

logger.info('Starting active user and subscriber counts script...')

for subreddit_name in SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    active_user_count = praw_subreddit.active_user_count
    subscriber_count = praw_subreddit.subscribers

    unix_timestamp = unix_timestamp_now()
    datetime_string = datetime_string_now()

    active_user_counts_db = SQLite3Database('active_user_counts.db')
    result = active_user_counts_db.cursor.execute('''
        INSERT INTO active_user_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_name, active_user_count, unix_timestamp))
    active_user_counts_db.conn.commit()
    active_user_counts_db.close()
    response = server.create_active_user_count(subreddit_name, active_user_count, datetime_string)

    subscriber_counts_db = SQLite3Database('subscriber_counts.db')
    result = subscriber_counts_db.cursor.execute('''
        INSERT INTO subscriber_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_name, subscriber_count, unix_timestamp))
    subscriber_counts_db.conn.commit()
    subscriber_counts_db.close()
    response = server.create_subscriber_count(subreddit_name, subscriber_count, datetime_string)

logger.info('Ending active user and subscriber counts script...')
