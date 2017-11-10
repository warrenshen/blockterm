module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :allSubreddits, types[Types::SubredditType] do
      description 'Gets all subreddits'

      resolve -> (obj, args, ctx) {
        Subreddit.all
      }
    end

    field :mostRecentPostCountBySubredditId, Types::PostCountType do
      description 'Gets the most recent post count associated with given subreddit id'

      argument :subredditId, !types.ID

      resolve -> (obj, args, ctx) {
        PostCount.where(subreddit_id: args[:subredditId]).order(when: :desc).first
      }
    end

    field :subredditById, Types::SubredditType do
      description 'Gets the subreddit associated with given subreddit id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Subreddit.find(args[:id])
      }
    end

    field :tokenById, Types::TokenType do
      description 'Gets the token associated with given token id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Token.find(args[:id])
      }
    end
  end
end
