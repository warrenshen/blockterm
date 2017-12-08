import sqlite3

class SQLite3Database:
  def __init__(self, db_name):
    self.db_name = db_name
    self.conn = sqlite3.connect(self.db_name)
    self.cursor = self.conn.cursor()

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
      self.cursor.execute(
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

  def get_comment_count_for_subreddit(self, subreddit_name, start, end):
    assert self.db_name == 'comments.db'

    result = self.cursor.execute(
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

