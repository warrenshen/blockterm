import json
import praw
import time

from datetime import datetime
from gensim.utils import simple_preprocess

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

import api
import subreddits
from database import SQLite3Database

ONE_DAY = 86400

comments_db = SQLite3Database('comments.db')

server = api.Api()
response = server.get_all_keywords()
keywords = response['data']['allKeywords']

keyword_id_to_words = {}
for keyword in keywords:
    keyword_id_to_words[keyword['id']] = keyword['word']

def create_mention_counts_for_subreddit(subreddit_name, keyword_id_to_words, start, end):
    result = comments_db.cursor.execute('''
        SELECT *
        FROM comments
        WHERE comments.subreddit_name = ?
        AND comments.created_utc >= ?
        AND comments.created_utc < ?
    ''', (subreddit_name, start, end))
    comments = list(result)

    comment_bodies = [comment[4] for comment in comments if type(comment[4]) is unicode]
    # A text blob of all comments in given range, separated by a special delimeter.
    text = ' &&& '.join(comment_bodies)
    text_lower = text.lower()
    tokens = simple_preprocess(text_lower)

    unix_dt = datetime.fromtimestamp(end)
    date_t = unix_dt.strftime('%Y-%m-%d %H:%M:%S')

    for keyword_id, word in keyword_id_to_words.iteritems():
        count = tokens.count(word.lower())
        response = server.create_mention_count(subreddit_name, keyword_id, count, date_t)
        print(response)

for subreddit_name in subreddits.SUBREDDITS:
    # End timestamp is start of today, since we are getting post count for yesterday.
    end = int(time.mktime(datetime.today().date().timetuple()))
    start = end - ONE_DAY
    create_mention_counts_for_subreddit(subreddit_name, keyword_id_to_words, start, end)

