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
        obj.market_tickers
        # QueryHelper::filter_relation_by_time_range(
        #   obj.market_tickers,
        #   args[:timeRange]
        # )
      }
    end
  end
end
