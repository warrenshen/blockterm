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

import api
import subreddits

from database import get_cursor

c = get_cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS active_user_counts (
        subreddit_name string PRIMARY KEY,
        count int,
        timestamp int
    )
''')
c.execute('''
    CREATE TABLE IF NOT EXISTS subscriber_counts (
        subreddit_name string PRIMARY KEY,
        count int,
        timestamp int
    )
''')

for subreddit_name in subreddits.SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    active_users, subscribers = praw_subreddit.active_user_count, praw_subreddit.subscribers

    timestamp = int(time.time())
    result = c.execute('''
        INSERT INTO active_user_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_name, active_users, timestamp))

    c.execute('''
        INSERT INTO subscription_counts (subreddit_name, count, timestamp)
        VALUES (?, ?, ?)
    ''', (subreddit_id, subscribers, timestamp))

    conn.commit()

