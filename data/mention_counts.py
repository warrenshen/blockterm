from api import Api
from database import SQLite3Database
from logger import logger
from utils import unix_timestamp_today, unix_timestamp_to_datetime_string

ONE_DAY = 86400

server = Api()

logger.info('Starting mention counts script...')

response = server.get_all_keywords()
keywords = response['data']['allKeywords']

keyword_id_to_words = {}
for keyword in keywords:
  keyword_id_to_words[keyword['id']] = keyword['word']

def create_mention_counts_for_subreddit(subreddit_name, keyword_id_to_words, start, end):
  datetime_string = unix_timestamp_to_datetime_string(start)

  for keyword_id, word in keyword_id_to_words.items():
    db = SQLite3Database('comments.db')
    mention_count = db.get_keyword_count_for_subreddit(subreddit_name, word, start, end)
    db.close()
    logger.info('Keyword {} mentioned {} times in subreddit {}'.format(
      word,
      mention_count,
      subreddit_name
    ))

    response = server.create_mention_count(
      subreddit_name,
      keyword_id,
      mention_count,
      datetime_string
    )

SUBREDDITS = [
  'CryptoCurrency',
  'CryptoMarkets',
]

for subreddit_name in SUBREDDITS:
    # End timestamp is start of today, since we are getting mention count for yesterday.
    end = unix_timestamp_today()
    start = end - ONE_DAY
    create_mention_counts_for_subreddit(
      subreddit_name,
      keyword_id_to_words,
      start,
      end
    )

logger.info('Ending mention counts script...')
