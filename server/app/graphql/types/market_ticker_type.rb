module Types
  MarketTickerType = GraphQL::ObjectType.define do
    name "MarketTicker"

    field :id, !types.ID
    field :marketId, !types.ID, property: :market_id
    field :value, !types.Float
    field :timestamp, !types.String do
      resolve -> (obj, args, ctx) {
        QueryHelper::localize_timestamp(obj.timestamp).to_s
      }
    end
  end
end
