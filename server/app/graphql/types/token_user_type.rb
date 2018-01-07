module Types
  TokenUserType = GraphQL::ObjectType.define do
    name 'TokenUserType'

    field :id, !types.ID
    field :index, !types.Int
    field :amount, !types.Float

    field :priceUSD, !types.Float do
      resolve -> (obj, args, ctx) {
        obj.token.price_usd
      }
    end

    field :priceBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        obj.token.price_btc
      }
    end

    field :percentChange24h, !types.Float do
      resolve -> (obj, args, ctx) {
        obj.token.percent_change_24h
      }
    end
  end
end
