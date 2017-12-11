import praw

import secrets

reddit = praw.Reddit(
  client_id=secrets.CLIENT_ID,
  client_secret=secrets.CLIENT_SECRET,
  user_agent=secrets.USER_AGENT
)
