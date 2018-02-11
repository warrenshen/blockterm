module Types
  TokenExchangeType = GraphQL::ObjectType.define do
    name 'TokenExchangeType'

    field :id, !types.ID
    field :tokenId, types.ID, property: :token_id
    field :exchange, !types.String
    field :identifier, !types.String
    field :priceUSD, !types.Float, property: :price_usd
    field :priceBTC, !types.Float, property: :price_btc
    field :priceETH, !types.Float, property: :price_eth

    field :token, !Types::TokenType do
      'The token associated with token exchange'

      resolve -> (obj, args, ctx) {
        FindLoader.for(Token).load(obj.token_id)
      }
    end
  end
end
