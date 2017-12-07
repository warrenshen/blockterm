import json
import praw
import time

from datetime import datetime

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

import api
import subreddits

ONE_DAY = 86400

server = api.Api()

def create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end):
    posts = praw_subreddit.submissions(start, end)
    post_count = len(list(posts))
    unix_dt = datetime.fromtimestamp(end)
    date_t = unix_dt.strftime('%Y-%m-%d %H:%M:%S')
    response = server.create_post_count(subreddit_name, post_count, date_t)
    return post_count, response

for subreddit_name in subreddits.SUBREDDITS:
    praw_subreddit = reddit.subreddit(subreddit_name)
    # End timestamp is start of today, since we are getting post count for yesterday.
    end = int(time.mktime(datetime.today().date().timetuple()))
    start = end - ONE_DAY
    post_count, response = create_post_count_for_subreddit(subreddit_name, praw_subreddit, start, end)
    print(response)

