module Types
  MarketType = GraphQL::ObjectType.define do
    name "Market"

    field :id, !types.ID
    field :name, !types.String
    field :createdAt, !types.String do
      resolve -> (obj, args, ctx) {
        obj.created_at.to_s
      }
    end
    field :updatedAt, !types.String do
      resolve -> (obj, args, ctx) {
        obj.updated_at.to_s
      }
    end
    field :marketTickers, types[Types::MarketTickerType] do
      description 'The tickers associated with the market'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        time_range = args[:timeRange]
        today = Date.today
        clause = 'timestamp > ?'

        market_tickers = obj.market_tickers

        if time_range.nil? or args[:timeRange] == 'ONE_HOUR'
          market_tickers = market_tickers.where(clause, today - 1.hour)
        elsif time_range == 'ONE_DAY'
          market_tickers = market_tickers.where(clause, today - 1.day)
        elsif time_range == 'ONE_WEEK'
          market_tickers = market_tickers.where(clause, today - 1.week)
        elsif time_range == 'ONE_MONTH'
          market_tickers = market_tickers.where(clause, today - 1.month)
        elsif time_range == 'ONE_YEAR'
          market_tickers = market_tickers.where(clause, today - 1.year)
        end

        market_tickers.order(timestamp: :asc)
      }
    end
  end
end
