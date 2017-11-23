import praw
import sqlite3

import subreddits

from database import get_cursor

import secrets
reddit = praw.Reddit(client_id=secrets.CLIENT_ID, client_secret=secrets.CLIENT_SECRET, user_agent=secrets.USER_AGENT)
reddit.read_only

c = get_cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        comment_id string PRIMARY KEY,
        parent_id string,
        subreddit_id string,
        link_id string,
        body string,
        created_utc int
    )
''')

def insert_comments(comments):
    success_count = 0

    try:
        for comment in comments:
            comment_id = 't1_' + comment.id
            subreddit_id = comment.subreddit_id
            parent_id = comment.parent_id
            link_id = comment.link_id
            body = comment.body
            created_utc = comment.created_utc

            response = c.execute('''
                INSERT INTO comments (
                    comment_id,
                    parent_id,
                    subreddit_id,
                    link_id,
                    body,
                    created_utc
                )
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                comment_id,
                parent_id,
                subreddit_id,
                link_id,
                body,
                created_utc
            ))
            success_count += 1

    except sqlite3.IntegrityError:
        pass

    return success_count

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
        success_count = insert_comments(comments)

        if success_count < len(comments):
            done = True
        else:
            after = earliest_id

        fetch_count += success_count

    return fetch_count

for subreddit_name in subreddits.SUBREDDITS:
    fetch_count = fetch_new_comments_for_subreddit(subreddit_name)
    print(subreddit_name, fetch_count)

