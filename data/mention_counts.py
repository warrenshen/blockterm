from gensim.utils import simple_preprocess

from api import Api
from database import SQLite3Database
from logger import logger
from reddit import reddit
from subreddits import SUBREDDITS
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

ONE_DAY = 86400

db = SQLite3Database('comments.db')

server = Api()

logger.info('Starting mention counts script...')

response = server.get_all_keywords()
keywords = response['data']['allKeywords']

keyword_id_to_words = {}
for keyword in keywords:
  keyword_id_to_words[keyword['id']] = keyword['word']

def create_mention_counts_for_subreddit(subreddit_name, keyword_id_to_words, start, end):
  result = db.cursor.execute(
    '''
    SELECT *
    FROM comments
    WHERE comments.subreddit_name = ?
    AND comments.created_utc >= ?
    AND comments.created_utc < ?
    ''',
    (subreddit_name, start, end)
  )
  comments = list(result)

  comment_bodies = [comment[4] for comment in comments if type(comment[4]) is unicode]
  # A text blob of all comments in given range, separated by a special delimeter.
  text = ' &&& '.join(comment_bodies)
  text_lower = text.lower()
  tokens = simple_preprocess(text_lower)

  datetime_string = unix_timestamp_to_datetime_string(start)

  for keyword_id, word in keyword_id_to_words.iteritems():
      count = tokens.count(word.lower())
      response = server.create_mention_count(subreddit_name, keyword_id, count, datetime_string)

for subreddit_name in SUBREDDITS:
    # End timestamp is start of today, since we are getting mention count for yesterday.
    end = unix_timestamp_today()
    start = end - ONE_DAY
    create_mention_counts_for_subreddit(subreddit_name, keyword_id_to_words, start, end)

logger.info('Ending mention counts script...')
