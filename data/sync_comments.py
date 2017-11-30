import praw
import sqlite3

import subreddits
import secrets

reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)

from database import SQLite3Database

db = SQLite3Database('comments.db')
db.cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        comment_id string PRIMARY KEY,
        parent_id string,
        subreddit_name string,
        link_id string,
        body string,
        created_utc int
    )
''')
db.cursor.execute('''
    CREATE INDEX IF NOT EXISTS comments_subreddit_name_and_created_utc
    ON comments (subreddit_name, created_utc)
''')

def insert_comments(subreddit_name, comments):
    success_count = 0

    try:
        for comment in comments:
            comment_id = 't1_' + comment.id
            parent_id = comment.parent_id
            link_id = comment.link_id
            body = comment.body
            created_utc = comment.created_utc

            response = db.cursor.execute('''
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
            success_count += 1

    except sqlite3.IntegrityError:
        pass

    try:
        db.conn.commit()
        return success_count
    except:
        return 0

def fetch_new_comments_for_subreddit(subreddit_name):
    subreddit = reddit.subreddit(subreddit_name)
    done = False
    after = None

    fetch_count = 0

    while not done:
        if not after:
            comments_generator = subreddit.comments(limit=100)
        else:
            comments_generator = subreddit.comments(
                limit=100,
                params={ 'after': after }
            )

        comments = list(comments_generator)

        if len(comments) == 0:
            # This means we've hit the 1000 comment limit and likely
            # are misssing some comments.
            done = True
            continue

        earliest_id = 't1_' + comments[-1].id
        earliest_created = comments[-1].created_utc
        success_count = insert_comments(subreddit_name, comments)

        if success_count < len(comments):
            done = True
        else:
            after = earliest_id

        fetch_count += success_count

    return fetch_count

for subreddit_name in subreddits.SUBREDDITS:
    fetch_count = fetch_new_comments_for_subreddit(subreddit_name)
    print(subreddit_name, fetch_count)

