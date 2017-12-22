from database import SQLite3Database

db = SQLite3Database('active_user_counts.db')
db.execute('''
    CREATE TABLE IF NOT EXISTS active_user_counts (
        subreddit_name string,
        count int,
        timestamp int
    )
''')
db.execute('''
    CREATE INDEX IF NOT EXISTS active_user_counts_subreddit_name_and_timestamp
    ON active_user_counts (subreddit_name, timestamp)
''')
db.close()

########################################

db = SQLite3Database('comments.db')
db.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        comment_id string PRIMARY KEY,
        parent_id string,
        subreddit_name string,
        link_id string,
        body string,
        created_utc int
    )
''')
db.execute('''
    CREATE INDEX IF NOT EXISTS comments_subreddit_name_and_created_utc
    ON comments (subreddit_name, created_utc)
''')
db.close()

########################################

db = SQLite3Database('posts.db')
db.execute('''
    CREATE TABLE IF NOT EXISTS posts (
        post_id string PRIMARY KEY,
        subreddit_name string,
        self_text string,
        created_utc int
    )
''')
db.execute('''
    CREATE INDEX IF NOT EXISTS posts_subreddit_name_and_created_utc
    ON posts (subreddit_name, created_utc)
''')
db.close()

########################################

db = SQLite3Database('subscriber_counts.db')
db.execute('''
    CREATE TABLE IF NOT EXISTS subscriber_counts (
        subreddit_name string,
        count int,
        timestamp int
    )
''')
db.execute('''
    CREATE INDEX IF NOT EXISTS subscriber_counts_subreddit_name_and_timestamp
    ON subscriber_counts (subreddit_name, timestamp)
''')
db.close()

########################################

db = SQLite3Database('market_tickers.db')
db.execute('''
  CREATE TABLE IF NOT EXISTS market_tickers (
    name string,
    last double,
    timestamp datetime,
    created_at datetime
  )
''')
db.close()

########################################

db = SQLite3Database('total_market_caps.db')
db.execute('''
  CREATE TABLE IF NOT EXISTS total_market_caps (
    blob string,
    last_updated int
  )
''')
db.close()
