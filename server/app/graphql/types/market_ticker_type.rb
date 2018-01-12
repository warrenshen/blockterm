module Types
  MarketTickerType = GraphQL::ObjectType.define do
    name "MarketTicker"

    field :id, !types.ID
    field :marketId, !types.ID, property: :market_id
    field :value, !types.Float
    field :timestamp, !types.String do
      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::localize_timestamp(
          obj.timestamp,
          time_zone,
        ).to_s
      }
    end
  end
end
