module Types
  TokenExchangeType = GraphQL::ObjectType.define do
    name 'TokenExchangeType'

    field :id, !types.ID
    field :tokenId, types.ID
    field :exchange, !types.String
    field :identifier, !types.String
    field :priceUSD, !types.Float, property: :price_usd
    field :priceBTC, !types.Float, property: :price_btc
    field :priceETH, !types.Float, property: :price_eth
  end
end
