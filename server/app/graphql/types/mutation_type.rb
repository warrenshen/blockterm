module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createActiveUserCount, Types::ActiveUserCountType do
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
          subreddit = Subreddit.find_by(name: args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        ActiveUserCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: args[:timestamp],
        )
      }
    end

    field :createCommentCount, Types::CommentCountType do
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
          subreddit = Subreddit.find_by(name: args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        CommentCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: args[:timestamp],
        )
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

        Keyword.find_or_create_by(
          token_id: args[:tokenId],
          word: args[:word],
        )
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
          subreddit = Subreddit.find_by(name: args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        MentionCount.create(
          keyword_id: args[:keywordId],
          subreddit_id: args[:subredditId],
          count: args[:count],
          timestamp: args[:timestamp],
        )
      }
    end

    field :createPostCount, Types::PostCountType do
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
          subreddit = Subreddit.find_by(name: args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        post_count = PostCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: args[:timestamp],
        )

        if post_count.valid?
          post_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create post count'
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

        Subreddit.find_or_create_by(
          name: args[:name],
          start_date: args[:startDate],
        )
      }
    end

    field :createSubscriberCount, Types::SubscriberCountType do
      description 'Creates a subscriber count'

      argument :apiKey, !types.String
      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        SubscriberCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:timestamp],
        )
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

        Token.find_or_create_by(
          short_name: args[:shortName],
          long_name: args[:longName],
        )
      }
    end

    field :updateSubredditBlob, Types::SubredditType do
      description 'Updates blob column of subreddit'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :postCount24h, types.Int
      argument :commentCount24h, types.Int
      argument :activeUserCountNow, types.Int
      argument :subscriberCountNow, types.Int

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
          subreddit = Subreddit.find_by(name: args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
        end


        if !args[:activeUserCountNow].nil?
          subreddit.update_blob_attribute(:active_user_count_now, args[:activeUserCountNow])
        end
        if !args[:postCount24h].nil?
          subreddit.update_blob_attribute(:post_count_24h, args[:postCount24h])
        end
        if !args[:commentCount24h].nil?
          subreddit.update_blob_attribute(:comment_count_24h, args[:commentCount24h])
        end
        if !args[:subscriberCountNow].nil?
          subreddit.update_blob_attribute(:subscriber_count_now, args[:subscriberCountNow])
        end
        subreddit
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

        Market.find_or_create_by(
          name: args[:name],
        )
      }
    end

    field :createMarketTicker, Types::MarketTickerType do
      description 'Creates a market ticker'

      argument :apiKey, !types.String
      argument :marketId, !types.ID
      argument :value, !types.Float
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        MarketTicker.find_or_create_by(
          market_id: args[:marketId],
          value: args[:value],
          timestamp: args[:timestamp],
        )
      }
    end
  end
end
