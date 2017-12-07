import json
import praw
import time

from datetime import datetime

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

import api
import subreddits

from database import SQLite3Database

db = SQLite3Database('comments.db')
server = api.Api()

ONE_DAY = 86400

def create_comment_count_for_subreddit(subreddit_name, start, end):
    result = db.cursor.execute('''
    	SELECT COUNT(*)
    	FROM comments
    	WHERE comments.subreddit_name = ?
    	AND comments.created_utc >= ?
    	AND comments.created_utc < ?
        ''',
        (subreddit_name, start, end)
    )
    comment_count = list(result)[0][0]

    unix_dt = datetime.fromtimestamp(end)
    date_t = unix_dt.strftime('%Y-%m-%d %H:%M:%S')

    response = server.create_comment_count(subreddit_name, comment_count, date_t)
    return comment_count, response

for subreddit_name in subreddits.SUBREDDITS:
    # End timestamp is start of today, since we are getting post count for yesterday.
    end = int(time.mktime(datetime.today().date().timetuple()))
    start = end - ONE_DAY
    comment_count, response = create_comment_count_for_subreddit(
        subreddit_name,
        start,
        end
    )
    print(response)

