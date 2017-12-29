module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createActiveUserCount, Types::CountType do
      description 'Creates a active user count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        active_user_count = ActiveUserCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: timestamp,
        )

        if active_user_count.valid?
          active_user_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create active user count'
          )
        end
      }
    end

    field :createCommentCount, Types::CountType do
      description 'Creates a comment count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        existing_comment_count = CommentCount.find_by(
          subreddit_id: subreddit_id,
          timestamp: timestamp,
        )

        if existing_comment_count.nil?
          comment_count = CommentCount.create(
            subreddit_id: subreddit_id,
            count: args[:count],
            timestamp: timestamp,
          )

          if comment_count.valid?
            comment_count
          else
            return GraphQL::ExecutionError.new(
              'Failed to create comment count'
            )
          end
        else
          existing_comment_count.update_attribute(:count, args[:count])
          existing_comment_count
        end
      }
    end

    field :createKeyword, Types::KeywordType do
      description 'Creates a keyword'

      argument :apiKey, !types.String
      argument :tokenId, !types.ID
      argument :word, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        keyword = Keyword.create(
          token_id: args[:tokenId],
          word: args[:word],
        )

        if keyword.valid?
          keyword
        else
          return GraphQL::ExecutionError.new(
            'Failed to create keyword'
          )
        end
      }
    end

    field :createMentionCount, Types::MentionCountType do
      description 'Creates a mention count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :keywordId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        mention_count = MentionCount.create(
          keyword_id: args[:keywordId],
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: timestamp,
        )

        if mention_count.valid?
          mention_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create mention count'
          )
        end
      }
    end

    field :createPostCount, Types::CountType do
      description 'Create a post count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        existing_post_count = PostCount.find_by(
          subreddit_id: subreddit_id,
          timestamp: timestamp,
        )

        if existing_post_count.nil?
          post_count = PostCount.create(
            subreddit_id: subreddit_id,
            count: args[:count],
            timestamp: timestamp,
          )

          if post_count.valid?
            post_count
          else
            return GraphQL::ExecutionError.new(
              'Failed to create post count'
            )
          end
        else
          existing_post_count.update_attribute(:count, args[:count])
          existing_post_count
        end
      }
    end

    field :createSubscriberCount, Types::CountType do
      description 'Creates a subscriber count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        subscriber_count = SubscriberCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: timestamp,
        )

        if subscriber_count.valid?
          subscriber_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create subscriber count'
          )
        end
      }
    end

    field :createSubreddit, Types::SubredditType do
      description 'Creates a subreddit'

      argument :apiKey, !types.String
      argument :name, !types.String
      argument :startDate, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        subreddit = Subreddit.create(
          name: args[:name],
          start_date: args[:startDate],
        )

        if subreddit.valid?
          subreddit
        else
          return GraphQL::ExecutionError.new(
            'Failed to create subreddit'
          )
        end
      }
    end

    field :createToken, Types::TokenType do
      description 'Creates a token'

      argument :apiKey, !types.String
      argument :shortName, !types.String
      argument :longName, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        token = Token.create(
          short_name: args[:shortName],
          long_name: args[:longName],
        )

        if token.valid?
          token
        else
          return GraphQL::ExecutionError.new(
            'Failed to create token'
          )
        end
      }
    end

    field :updateSubredditBlob, Types::SubredditType do
      description 'Updates blob column of subreddit'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :activeUserCount, types.Int
      argument :commentCount, types.Int
      argument :postCount, types.Int
      argument :subscriberCount, types.Int

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit = Subreddit.find(args[:subredditId])
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
        end

        if subreddit.nil?
          return GraphQL::ExecutionError.new(
            "No subreddit found for given 'subredditId' or 'subredditName'"
          )
        end

        if !args[:activeUserCount].nil?
          subreddit.active_user_count = args[:activeUserCount]
        end
        if !args[:commentCount].nil?
          subreddit.comment_count = args[:commentCount]
        end
        if !args[:postCount].nil?
          subreddit.post_count =  args[:postCount]
        end
        if !args[:subscriberCount].nil?
          subreddit.subscriber_count = args[:subscriberCount]
        end

        if subreddit.changed?
          if subreddit.save
            subreddit
          else
            return GraphQL::ExecutionError.new('Could not save subreddit')
          end
        else
          subreddit
        end
      }
    end

    field :createMarket, Types::MarketType do
      description 'Creates a market'

      argument :apiKey, !types.String
      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        market = Market.create(
          name: args[:name],
        )

        if market.valid?
          market
        else
          return GraphQL::ExecutionError.new(
            'Failed to create market'
          )
        end
      }
    end

    field :createMarketTicker, Types::MarketTickerType do
      description 'Creates a market ticker'

      argument :apiKey, !types.String
      argument :marketId, types.ID
      argument :marketName, types.String
      argument :value, !types.Float
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:marketId].nil? && args[:marketName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'marketId' or 'marketName' params is required"
          )
        end

        if !args[:marketId].nil?
          market = Market.find(args[:marketId])
        else
          market = Market.find_by_name(args[:marketName])
        end
        if market.nil?
          return GraphQL::ExecutionError.new(
            "No market found for given 'marketId' or 'marketName'"
          )
        end
        market_id = market.id

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        market_ticker = MarketTicker.find_or_create_by(
          market_id: market_id,
          value: args[:value],
          timestamp: timestamp,
        )

        if market_ticker.valid?
          market_ticker
        else
          return GraphQL::ExecutionError.new(
            'Failed to create market ticker'
          )
        end
      }
    end

    field :logIn, Types::AuthType do
      description 'Logs in user'

      argument :email, !types.String
      argument :password, !types.String

      resolve -> (obj, args, ctx) {
        command = AuthenticateUser.call(args[:email], args[:password])

        if command.success?
          result = command.result
          return Auth.new(result[:user], result[:auth_token])
        else
          return GraphQL::ExecutionError.new('Invalid credentials')
        end
      }
    end

    field :createUser, Types::AuthType do
      description 'Creates and logs in a user'

      argument :email, !types.String
      argument :password, !types.String

      resolve -> (obj, args, ctx) {
        user = User.create(
          email: args[:email],
          password: args[:password],
        )

        if user.valid?
          command = AuthenticateUser.call(args[:email], args[:password])

          if command.success?
            result = command.result
            return Auth.new(result[:user], result[:auth_token])
          end
        end

        return GraphQL::ExecutionError.new('Failed to create user')
      }
    end

    field :createDashboardItem, Types::UserType do
      # description ''

      argument :identifier, !types.String
      argument :w, types.Int
      argument :h, types.Int
      argument :x, types.Int
      argument :y, types.Int

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        # TODO: verify that identifier arg is in whitelist.
        dashboard_item = DashboardItem.create(
          user_id: current_user.id,
          identifier: args[:identifier],
          w: 3,
          h: 3,
          x: 0,
          y: 0,
        )

        if dashboard_item.valid?
          current_user.reload
        else
          return GraphQL::ExecutionError.new('Failed to create dashboard item')
        end
      }
    end

    field :destroyDashboardItem, Types::UserType do
      # description ''

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        dashboard_item = DashboardItem.find(args[:id])
        if dashboard_item.valid?
          dashboard_item.destroy
          if !dashboard_item.destroyed?
            return GraphQL::ExecutionError.new('Failed to destroy dashboard item')
          end
        end

        current_user.reload
      }
    end

    field :updateDashboardPage, Types::UserType do
      # description ''

      argument :dashboardItemsString, !types.String

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        temp = JSON.parse(args[:dashboardItemsString])
        temp.each do |item|
          dashboard_item_id = item['id']
          dashboard_item = DashboardItem.find(dashboard_item_id)
          dashboard_item.assign_attributes(
            w: item['w'],
            h: item['h'],
            x: item['x'],
            y: item['y'],
          )
          if dashboard_item.changed?
            if !dashboard_item.save
              return GraphQL::ExecutionError.new('Could not save dashboard item')
            end
          end
        end

        current_user.reload
      }
    end
  end
end
