import sqlite3

from configs import DB_PATH

class SQLite3Database:
  def __init__(self, db_name):
    self.db_name = db_name
    db_path = '%s/%s' % (DB_PATH, self.db_name)
    self.conn = sqlite3.connect(db_path, timeout=10)
    self.cursor = self.conn.cursor()

  def close(self):
    self.conn.close()

  def commit(self):
    self.conn.commit()

  def execute(self, query, params=None):
    if params:
      return self.cursor.execute(query, params)
    else:
      return self.cursor.execute(query)

  def insert_comment(
    self,
    subreddit_name,
    comment_id,
    parent_id,
    link_id,
    body,
    created_utc
  ):
    assert self.db_name == 'comments.db'

    if comment_id.find('t1_') != 0:
      comment_id = 't1_' + comment_id

    try:
      self.execute(
        '''
        INSERT INTO comments (
          comment_id,
          parent_id,
          subreddit_name,
          link_id,
          body,
          created_utc
        )
        VALUES (?, ?, ?, ?, ?, ?)
        ''',
        (
          comment_id,
          parent_id,
          subreddit_name,
          link_id,
          body,
          created_utc
        )
      )
    except sqlite3.IntegrityError:
      raise sqlite3.IntegrityError

    try:
      self.conn.commit()
      return True
    except:
      return False

  def insert_market_ticker(self, name, last, timestamp, created_at):
    assert self.db_name == 'market_tickers.db'

    self.execute(
      '''
      INSERT INTO market_tickers (
          name,
          last,
          timestamp,
          created_at
      )
      VALUES (?, ?, ?, ?)
      ''',
      (name, last, timestamp, created_at)
    )

    try:
      self.conn.commit()
      return True
    except:
      return False

  def insert_post(
    self,
    subreddit_name,
    post_id,
    self_text,
    created_utc
  ):
    assert self.db_name == 'posts.db'

    if post_id.find('t2_') != 0:
      post_id = 't2_' + post_id


    try:
      self.execute(
        '''
        INSERT INTO posts (
          post_id,
          subreddit_name,
          self_text,
          created_utc
        )
        VALUES (?, ?, ?, ?)
        ''',
        (
          post_id,
          subreddit_name,
          self_text,
          created_utc
        )
      )
    except sqlite3.IntegrityError:
      raise sqlite3.IntegrityError

    try:
      self.conn.commit()
      return True
    except Exception as e:
      return False


  def insert_cmc_ticker(self, blob, last_updated):
    assert self.db_name == 'cmc_tickers.db'

    try:
      self.execute(
        '''
        INSERT INTO cmc_tickers (
          blob,
          last_updated
        ) VALUES (?, ?)
        ''',
        (blob, last_updated)
      )
    except Exception as e:
      print('Database insertion error: {}'.format(e))
      return False

    try:
      self.conn.commit()
      return True
    except:
      return False

  def insert_total_ticker(self, blob, last_updated):
    assert self.db_name == 'total_market_caps.db'

    try:
      self.execute(
        '''
        INSERT INTO total_market_caps (
          blob,
          last_updated
        ) VALUES (?, ?)
        ''',
        (blob, last_updated)
      )
    except Exception as e:
      print('Database insertion error: {}'.format(e))
      return False

    try:
      self.conn.commit()
      return True
    except:
      return False

  def get_comment_count_for_subreddit(self, subreddit_name, start, end):
    assert self.db_name == 'comments.db'

    result = self.execute(
      '''
      SELECT COUNT(*)
      FROM comments
      WHERE comments.subreddit_name = ?
      AND comments.created_utc >= ?
      AND comments.created_utc < ?
      ''',
      (subreddit_name, start, end)
    )
    return list(result)[0][0]

  def get_keyword_count_for_subreddit(self, subreddit_name, keyword, start, end):
    result = self.execute(
      '''
      SELECT COUNT(*)
      FROM comments
      WHERE comments.subreddit_name = ?
      AND LOWER(comments.body) LIKE "%" || ? || " %"
      AND comments.created_utc >= ?
      AND comments.created_utc < ?
      ''',
      (subreddit_name, keyword.lower(), start, end)
    )
    return list(result)[0][0]

  def get_post_count_for_subreddit(self, subreddit_name, start, end):
    assert self.db_name == 'posts.db'

    result = self.execute(
      '''
      SELECT COUNT(*)
      FROM posts
      WHERE posts.subreddit_name = ?
      AND posts.created_utc >= ?
      AND posts.created_utc < ?
      ''',
      (subreddit_name, start, end)
    )
    return list(result)[0][0]
