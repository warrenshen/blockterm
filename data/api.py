import json
import requests

from configs import API_URL
from logger import logger
from secrets import API_KEY

class Api:

    def __init__(self, api_url=None):
        if api_url is None:
            self.api_url = API_URL
        else:
            self.api_url = api_url

    def _get_query_response(self, query):
        logger.info('Sending api request...')
        logger.info(query)

        try:
          r = requests.post(url=self.api_url, json=query)
          response = json.loads(r.text)

          logger.info('Loading api response...')
          logger.info(response)

          return response

        except requests.exceptions.ConnectionError:
          logger.info('Could not connect to api...')
          return { 'errors': 'Could not connect to api' }

        except Exception:
          logger.info('Unknown exception caught...')
          return { 'errors': 'Unkown exception caught' }


    def _inject_api_key(self, params):
        return 'apiKey: "%s", %s' % (API_KEY, params)

    def create_active_user_count(self, subreddit_name, count, timestamp):
        params = 'subredditName: "%s", count: %s, timestamp: "%s"' % \
                 (subreddit_name, count, timestamp)
        params = self._inject_api_key(params)

        query = { 'query' : '''
            mutation {
              createActiveUserCount(%s) {
                subredditId
                count
                timestamp
              }
            }''' % params
        }
        return self._get_query_response(query)

    def create_comment_count(self, subreddit_name, count, timestamp):
        params = 'subredditName: "%s", count: %s, timestamp: "%s"' % \
                 (subreddit_name, count, timestamp)
        params = self._inject_api_key(params)

        query = { 'query' : '''
            mutation {
              createCommentCount(%s) {
                subredditId
                count
                timestamp
              }
            }''' % params
        }
        return self._get_query_response(query)

    def create_post_count(self, subreddit_name, count, timestamp):
        params = 'subredditName: "%s", count: %s, timestamp: "%s"' % \
                 (subreddit_name, count, timestamp)
        params = self._inject_api_key(params)

        query = { 'query' : '''
            mutation {
              createPostCount(%s) {
                subredditId
                count
                timestamp
              }
            }''' % params
        }
        return self._get_query_response(query)

    def create_mention_count(self, subreddit_name, keyword_id, count, timestamp):
        params = 'subredditName: "%s", keywordId: %s, count: %s, timestamp: "%s"' % \
                 (subreddit_name, keyword_id, count, timestamp)
        params = self._inject_api_key(params)

        query = { 'query': '''
            mutation {
                createMentionCount(%s) {
                    subredditId
                    keywordId
                    count
                    timestamp
                }
            }''' % params
        }
        return self._get_query_response(query)

    def create_subscriber_count(self, subreddit_name, count, timestamp):
      params = 'subredditName: "%s", count: %s, timestamp: "%s"' % \
               (subreddit_name, count, timestamp)
      params = self._inject_api_key(params)

      query = { 'query': '''
          mutation {
              createSubscriberCount(%s) {
                  subredditId
                  count
                  timestamp
              }
          }''' % params
      }
      return self._get_query_response(query)

    def create_subreddit(self, name, start_date):
        params = 'name: "%s", startDate: "%s"' % (name, start_date)
        params = self._inject_api_key(params)

        query = { 'query' : '''
            mutation {
              createSubreddit(%s) {
                id
              }
            }''' % params
        }
        return self._get_query_response(query)

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

    def get_subreddit_by_name(self, subreddit_name):
        params = 'name: "%s"' % (subreddit_name)

        query = { 'query' : '''
            query {
                subredditByName(%s) {
                    id
                    startDate
                    earliestPostCountDate
                }
            }''' % params
        }
        return self._get_query_response(query)

    def update_subreddit_blob(self,
                              subreddit_name,
                              post_count=None,
                              comment_count=None,
                              active_user_count=None,
                              subscriber_count=None
                             ):
        params = 'subredditName: "%s"' % subreddit_name
        if post_count is not None:
            params += ', postCount24h: %s' % post_count
        if comment_count is not None:
            params += ', commentCount24h: %s' % comment_count
        if active_user_count is not None:
            params += ', activeUserCountNow: %s' % active_user_count
        if subscriber_count is not None:
            params += ', subscriberCountNow: %s' % subscriber_count
        params = self._inject_api_key(params)

        query = { 'query': '''
            mutation {
              updateSubredditBlob(%s) {
                id
                name
                blob
              }
            }''' % params
        }
        return self._get_query_response(query)

    def create_market(self,
                      name
                     ):
        params = 'name: "%s"' % name
        params = self._inject_api_key(params)

        query = { 'query': '''
            mutation {
              createMarket(%s) {
                id
                name
                updatedAt
              }
            }''' % params
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

    def create_market_ticker(self, market_id, value, timestamp):
        params = 'marketId: %s, value: %s, timestamp: "%s"' % \
                 (market_id, value, timestamp)
        params = self._inject_api_key(params)

        query = { 'query': '''
            mutation {
              createMarketTicker(%s) {
                marketId
                value
                timestamp
              }
            }''' % params
        }
        return self._get_query_response(query)
