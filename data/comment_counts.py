from api import Api
from database import SQLite3Database
from logger import logger
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

db = SQLite3Database('comments.db')
server = Api()

ONE_DAY = 86400

logger.info('Starting comment counts script...')

def create_comment_count_for_subreddit(subreddit_name, start, end):
	comment_count = db.get_comment_count_for_subreddit(
		subreddit_name,
		start,
		end
	)

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
