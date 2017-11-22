module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createActiveUserCount, Types::ActiveUserCountType do
      description 'Creates a active user count'

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        ActiveUserCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          timestamp: args[:timestamp],
        )
      }
    end

    field :createCommentCount, Types::CommentCountType do
      description 'Creates a comment count'

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        CommentCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          timestamp: args[:timestamp],
        )
      }
    end

    field :createKeyword, Types::KeywordType do
      description 'Creates a keyword'

      argument :tokenId, !types.ID
      argument :word, !types.String

      resolve -> (obj, args, ctx) {
        Keyword.find_or_create_by(
          token_id: args[:tokenId],
          word: args[:word],
        )
      }
    end

    field :createMentionCount, Types::MentionCountType do
      description 'Creates a mention count'

      argument :keywordId, !types.ID
      argument :subredditId, !types.Int
      argument :timestamp, !types.String
      argument :count, !types.String

      resolve -> (obj, args, ctx) {
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

      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = Subreddit.find_by(name: args[:subredditName])
          subreddit_id = subreddit.id
        end

        PostCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: args[:timestamp],
        )
      }
    end

    field :createSubreddit, Types::SubredditType do
      description 'Creates a subreddit'

      argument :name, !types.String
      argument :startDate, !types.String

      resolve -> (obj, args, ctx) {
        Subreddit.find_or_create_by(
          name: args[:name],
          start_date: args[:startDate],
        )
      }
    end

    field :createSubscriptionCount, Types::SubscriptionCountType do
      description 'Creates a subscription count'

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        SubscriptionCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:timestamp],
        )
      }
    end

    field :createToken, Types::TokenType do
      description 'Creates a token'

      argument :shortName, !types.String
      argument :longName, !types.String

      resolve -> (obj, args, ctx) {
        Token.find_or_create_by(
          short_name: args[:shortName],
          long_name: args[:longName],
        )
      }
    end

    field :updateSubredditBlob, Types::SubredditType do
      description 'Updates blob column of subreddit'

      argument :id, !types.ID
      argument :postCount24h, types.Int
      argument :commentCount24h, types.Int
      argument :activeUserCountNow, types.Int
      argument :subscriberCountNow, types.Int

      resolve -> (obj, args, ctx) {
        subreddit = Subreddit.find(args[:id])

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
  end
end
