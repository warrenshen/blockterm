module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :allKeywords, types[Types::KeywordType] do
      description 'Gets all keywords'

      resolve -> (obj, args, ctx) {
        Keyword.all
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

    field :allSubreddits, types[Types::SubredditType] do
      description 'Gets all subreddits'

      resolve -> (obj, args, ctx) {
        Subreddit.all.order(active_user_count: :desc)
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

    field :marketsByName, types[Types::MarketType] do
      description 'Gets the markets associated with given list of names'

      argument :names, !types.String

      resolve -> (obj, args, ctx) {
        market_names = args[:names].split(',')
        Market.where(name: market_names)
      }
    end

    field :subredditById, Types::SubredditType do
      description 'Gets the subreddit associated with given subreddit id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Subreddit.find_by_id(args[:id])
      }
    end

    field :subredditByName, Types::SubredditType do
      description 'Gets the subreddit associated with given name'

      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::find_subreddit_by_name(args[:name])
      }
    end

    field :subredditsAll, types[Types::SubredditType] do
      description 'Gets all subreddits'

      resolve -> (obj, args, ctx) {
        Subreddit.all.order(active_user_count: :desc)
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
        Token.find_by_id(args[:id])
      }
    end

    field :tokenByIdentifier, Types::TokenType do
      description 'Gets the token associated with given identifier'

      argument :identifier, !types.String

      resolve -> (obj, args, ctx) {
        Token.find_by_identifier(args[:identifier])
      }
    end

    field :tokenByShortName, Types::TokenType do
      description 'Gets the token associated with given short name'

      argument :shortName, !types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::find_token_by_short_name(args[:shortName])
      }
    end

    field :tokensAll, types[Types::TokenType] do
      description 'Gets all tokens'

      resolve -> (obj, args, ctx) {
        Token.all.order(short_name: :asc)
      }
    end

    field :tokensByPage, types[Types::TokenType] do
      argument :page, !types.Int

      resolve -> (obj, args, ctx) {
        TokenSearch.results(filters: { sort: 'volume_usd_24h desc' }, page: args[:page])
      }
    end

    field :user, Types::UserType do
      description 'Gets the current user if logged in'

      resolve -> (obj, args, ctx) {
        QueryHelper.get_current_user(ctx)
      }
    end

    field :usersByPage, types[Types::UserType] do
      argument :page, !types.Int

      resolve -> (obj, args, ctx) {
        current_user = QueryHelper.get_current_user(ctx)
        if !QueryHelper::is_current_user_admin(current_user)
          return GraphQL::ExecutionError.new(
            'Nothing to see here'
          )
        end

        UserSearch.results(filters: { sort: 'last_active_at desc' }, page: args[:page])
      }
    end
  end
end
