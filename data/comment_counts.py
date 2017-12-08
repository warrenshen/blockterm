import json
import praw
import time

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

import api
from database import SQLite3Database
from logger import logger
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

db = SQLite3Database('comments.db')
server = api.Api()

ONE_DAY = 86400

logger.info('Starting comment counts script...')

def create_comment_count_for_subreddit(subreddit_name, start, end):
	result = db.cursor.execute(
		'''
		SELECT COUNT(*)
		FROM comments
		WHERE comments.subreddit_name = ?
		AND comments.created_utc >= ?
		AND comments.created_utc < ?
		''',
		(subreddit_name, start, end)
	)
	comment_count = list(result)[0][0]

	datetime_string = unix_timestamp_to_datetime_string(start)
	return server.create_comment_count(subreddit_name, comment_count, datetime_string)

for subreddit_name in SUBREDDITS:
	# End timestamp is start of today, since we are getting comment count for yesterday.
	end = unix_timestamp_today()
	start = end - ONE_DAY
	response = create_comment_count_for_subreddit(
			subreddit_name,
			start,
			end
	)

logger.info('Ending comment counts script...')
