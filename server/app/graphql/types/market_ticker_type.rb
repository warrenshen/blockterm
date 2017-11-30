module Types
  MarketTickerType = GraphQL::ObjectType.define do
    name "MarketTicker"

    field :id, !types.ID
    field :marketId, !types.ID, property: :market_id
    field :value, !types.Float
    field :timestamp, !types.String do
      resolve -> (obj, args, ctx) {
        obj.timestamp.to_s
      }
    end
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
  end
end
