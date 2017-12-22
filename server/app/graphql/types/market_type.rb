module Types
  MarketType = GraphQL::ObjectType.define do
    name "Market"

    field :id, !types.ID
    field :name, !types.String
    field :lastPrice, !types.String do
      resolve -> (obj, args, ctx) {
        obj.market_tickers.order(timestamp: :desc).first.value
      }
    end
    field :updatedAt, !types.String do
      resolve -> (obj, args, ctx) {
        market_ticker = obj.market_tickers.order(timestamp: :desc).first
        if market_ticker.valid?
          market_ticker.created_at.to_s
        else
          obj.created_at.to_s
        end
      }
    end

    field :marketTickers, types[Types::MarketTickerType] do
      description 'The tickers associated with the market'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.market_tickers,
          args[:timeRange]
        )
      }
    end
  end
end
