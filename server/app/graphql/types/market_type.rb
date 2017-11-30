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
  end
end
