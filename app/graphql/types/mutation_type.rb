module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createCommentCount, Types::CommentCountType do
      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        CommentCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
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
      argument :when, !types.String
      argument :count, !types.String

      resolve -> (obj, args, ctx) {
        MentionCount.create(
          keyword_id: args[:keywordId],
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
        )
      }
    end

    field :createPostCount, Types::PostCountType do
      description 'Create a post count'

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        PostCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
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
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        SubscriptionCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
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
  end
end
