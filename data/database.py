import sqlite3

def get_cursor(db_name='test.db'):
    # Get database name from config later
    conn = sqlite3.connect(db_name)
    return conn.cursor()

class SQLite3Database:
    def __init__(self, db='test.db'):
        self.conn = sqlite3.connect(db)
        self.cursor = self.conn.cursor()
        
    def insert_comment(self,
                       subreddit_name,
                       comment_id,
                       parent_id,
                       link_id,
                       body,
                       created_utc
                      ):
        if comment_id.find('t1_') != 0:
            comment_id = 't1_' + comment_id

        try:
            self.cursor.execute('''
                INSERT INTO comments (
                    comment_id,
                    parent_id,
                    subreddit_name,
                    link_id,
                    body,
                    created_utc
                )
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                comment_id,
                parent_id,
                subreddit_name,
                link_id,
                body,
                created_utc
            ))
        except sqlite3.IntegrityError:
            raise sqlite3.IntegrityError
        
        try:
            self.conn.commit()
            return True
        except:
            return False
        