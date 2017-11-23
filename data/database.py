import sqlite3

def get_cursor():
    # Get database name from config later
    conn = sqlite3.connect('test.db')
    return conn.cursor()

