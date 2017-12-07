import json
import praw
import sqlite3
import time

from datetime import datetime
from praw.models import MoreComments

import secrets
reddit = praw.Reddit(
  client_id=secrets.CLIENT_ID,
  client_secret=secrets.CLIENT_SECRET,
  user_agent=secrets.USER_AGENT
)

from api import Api
from subreddits import SUBREDDITS
from database import SQLite3Database

server = Api()

active_user_counts_db = SQLite3Database('active_user_counts.db')
active_user_counts_db.cursor.execute('''
    CREATE TABLE IF NOT EXISTS active_user_counts (
        subreddit_name string,
        count int,
        timestamp int
    )
''')
active_user_counts_db.cursor.execute('''
    CREATE INDEX IF NOT EXISTS active_user_counts_subreddit_name_and_timestamp
    ON active_user_counts (subreddit_name, timestamp)
''')

subscriber_counts_db = SQLite3Database('subscriber_counts.db')
subscriber_counts_db.cursor.execute('''
    CREATE TABLE IF NOT EXISTS subscriber_counts (
        subreddit_name string,
        count int,
        timestamp int
    )
''')
subscriber_counts_db.cursor.execute('''
    CREATE INDEX IF NOT EXISTS subscriber_counts_subreddit_name_and_timestamp
    ON subscriber_counts (subreddit_name, timestamp)
''')

for subreddit_name in SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    active_user_count, subscriber_count = praw_subreddit.active_user_count, praw_subreddit.subscribers

    timestamp = int(time.time())
    unix_dt = datetime.fromtimestamp(timestamp)
    date_t = unix_dt.strftime('%Y-%m-%d %H:%M:%S')

    result = active_user_counts_db.cursor.execute('''
        INSERT INTO active_user_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_name, active_user_count, timestamp))
    active_user_counts_db.conn.commit()
    response = server.create_active_user_count(subreddit_name, active_user_count, date_t)

    result = subscriber_counts_db.cursor.execute('''
        INSERT INTO subscriber_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_name, subscriber_count, timestamp))
    subscriber_counts_db.conn.commit()
