import json
import requests

class Api:

    def __init__(self, api_url):
        if not api_url:
            raise Exception('A api url is required')
        else:
            self.api_url = api_url

    def _get_query_response(self, query):
        r = requests.post(url=self.api_url, json=query)
        response = json.loads(r.text)
        return response

    def get_all_keywords(self):
        query = { 'query': '''
            query {
                allKeywords {
                    id
                    word
                }
            } '''
        }
        return self._get_query_response(query)

    def create_subreddit(self, name, start_date='2017-01-01'):
        query = { 'query' : '''
            mutation {
              createSubreddit(name: "%s", startDate: "%s") {
                id
              }
            }''' % (name, start_date)
        }
        return self._get_query_response(query)

    def create_comment_count(self, subreddit_name, count, timestamp):
        query = { 'query' : '''
            mutation {
              createCommentCount(subredditName: "%s", count: %s, timestamp: "%s") {
                subredditId
                count
                timestamp
              }
            }''' % (subreddit_name, count, timestamp)
        }
        return self._get_query_response(query)

    def create_post_count(self, subreddit_name, count, timestamp):
        query = { 'query' : '''
            mutation {
              createPostCount(subredditName: "%s", count: %s, timestamp: "%s") {
                subredditId
                count
                timestamp
              }
            }''' % (subreddit_name, count, timestamp)
        }
        return self._get_query_response(query)

    def create_active_user_count(self, subreddit_id, count, timestamp):
        query = { 'query' : '''
            mutation {
              createActiveUserCount(subredditId: %s, count: %s, timestamp: "%s") {
                subredditId
                count
                timestamp
              }
            }''' % (subreddit_id, count, timestamp)
        }
        return self._get_query_response(query)

    def create_mention_count(self, subreddit_name, keyword_id, count, timestamp):
        query = { 'query': '''
            mutation {
                createMentionCount(subredditName: "%s", keywordId: %s, count: %s, timestamp: "%s") {
                    subredditId
                    keywordId
                    count
                    timestamp
                }
            }''' % (subreddit_name, keyword_id, count, timestamp)
        }
        return self._get_query_response(query)

    def update_subreddit_blob(self,
                              subreddit_id,
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
        return self._get_query_response(query)

    def create_market(self,
                      name
                     ):
        params = 'name: "%s"' % name
        query = { 'query': '''
            mutation {
              createMarket(%s) {
                id
                name
                updatedAt
              }
            }''' % (params)
        }
        return self._get_query_response(query)

    def get_all_markets(self):
        params = ''
        query = { 'query': '''
            query {
              allMarkets(%s) {
                id
                name
                updatedAt
              }
            }''' % (params)
        }
        return self._get_query_response(query)

    def create_market_tickers(self, market_id, value, timestamp):
        params = 'marketId: %s' % market_id
        params += ', value: %s' % value
        params += ', timestamp: "%s"' % timestamp
        query = { 'query': '''
            mutation {
              createMarketTicker(%s) {
                marketId
                value
                timestamp
              }
            }''' % (params)
        }
        return self._get_query_response(query)
