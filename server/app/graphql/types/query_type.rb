module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :placeholder, types.String do
      description 'Returns a placeholder string'

      resolve -> (obj, args, ctx) {
        'placeholder'
      }
    end

    field :allKeywords, types[Types::KeywordType] do
      description 'Gets all keywords'

      resolve -> (obj, args, ctx) {
        Keyword.all
      }
    end

    field :allSubreddits, types[Types::SubredditType] do
      description 'Gets all subreddits'

      resolve -> (obj, args, ctx) {
        Subreddit.all.order(subscriber_count: :desc)
      }
    end

    field :allTokens, types[Types::TokenType] do
      description 'Get all tokens'

      resolve -> (obj, args, ctx) {
        Token.all
      }
    end

    field :marketByName, Types::MarketType do
      description 'Gets the market associated with given name'

      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        Market.find_by_name(args[:name])
      }
    end

    field :subredditById, Types::SubredditType do
      description 'Gets the subreddit associated with given subreddit id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Subreddit.find(args[:id])
      }
    end

    field :subredditByName, Types::SubredditType do
      description 'Gets the subreddit associated with given name'

      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::find_subreddit_by_name(args[:name])
      }
    end

    field :subredditsByIds, !types[Types::SubredditType] do
      description 'Gets the subreddits with given subreddit ids'

      argument :ids, !types[types.ID]

      resolve -> (obj, args, ctx) {
        Subreddit.where(id: args[:ids])
      }
    end

    field :tokenById, Types::TokenType do
      description 'Gets the token associated with given token id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Token.find(args[:id])
      }
    end

    field :tokenByShortName, Types::TokenType do
      description 'Gets the token associated with given short name'

      argument :shortName, !types.String

      resolve -> (obj, args, ctx) {
        Token.find_by_short_name(args[:shortName])
      }
    end

    field :allMarkets, types[Types::MarketType] do
      description 'Gets all the markets'

      resolve -> (obj, args, ctx) {
        Market.all
      }
    end

    field :allMarketTickers, types[Types::MarketTickerType] do
      description 'Gets all the market tickers'

      resolve -> (obj, args, ctx) {
        MarketTicker.all
      }
    end

    field :user, Types::UserType do
      description 'Gets the current user if logged in'

      resolve -> (obj, args, ctx) {
        ctx[:current_user]
      }
    end
  end
end
