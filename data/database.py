import sqlite3

def get_cursor(db_name='test.db'):
    # Get database name from config later
    conn = sqlite3.connect(db_name)
    return conn.cursor()

class SQLite3Database:
	def __init__(self, db='test.db', ):
		self.conn = sqlite3.connect(db)
		self.cursor = self.conn.cursor()
