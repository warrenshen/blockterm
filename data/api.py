import json
import requests

class Api:

  def __init__(api_url):
    if not api_url:
      raise Exception('A api url is required')
    else:
      self.api_url = api_url

    def create_subreddit(name, start_date='2017-01-01'):
	query = { 'query' : '''
	    mutation {
	      createSubreddit(name: "%s", startDate: "%s") {
		id
	      }
	    }''' % (name, start_date)
	}

	r = requests.post(url=self.api_url, json=query)
	response = json.loads(r.text)
	return response

    def create_post_count(subreddit_id, count, timestamp):
	query = { 'query' : '''
	    mutation {
	      createPostCount(subredditId: %s, count: %s, timestamp: "%s") {
		subredditId
		count
		timestamp
	      }
	    }''' % (subreddit_id, count, timestamp)
	}

	r = requests.post(url=self.api_url, json=query)
	response = json.loads(r.text)
	return response

    def create_comment_count(subreddit_id, count, timestamp):
	query = { 'query' : '''
	    mutation {
	      createCommentCount(subredditId: %s, count: %s, timestamp: "%s") {
		subredditId
		count
		timestamp
	      }
	    }''' % (subreddit_id, count, timestamp)
	}

	r = requests.post(url=self.api_url, json=query)
	response = json.loads(r.text)
	return response

    def gql_create_active_user_count(subreddit_id, count, timestamp):
	query = { 'query' : '''
	    mutation {
	      createActiveUserCount(subredditId: %s, count: %s, timestamp: "%s") {
		subredditId
		count
		timestamp
	      }
	    }''' % (subreddit_id, count, timestamp)
	}

	r = requests.post(url=self.api_url, json=query)
	response = json.loads(r.text)
	return response

    def gql_update_subreddit_blob(subreddit_id,
				  post_count_24h=None,
				  comment_count_24h=None,
				  active_user_count=None,
				  subscriber_count=None
				 ):
	params = 'id: "%s"' % subreddit_id
	if post_count_24h:
	    params += ', postCount24h: %s' % post_count_24h
	if comment_count_24h:
	    params += ', commentCount24h: %s' % comment_count_24h
	if active_user_count:
	    params += ', activeUserCountNow: %s' % active_user_count
	if subscriber_count:
	    params += ', subscriberCountNow: %s' % subscriber_count

	query = { 'query': '''
	    mutation {
	      updateSubredditBlob(%s) {
		id
		name
		blob
	      }
	    }''' % (params)
	}

	r = requests.post(url=graphql_url, json=query)
	response = json.loads(r.text)
	return response

