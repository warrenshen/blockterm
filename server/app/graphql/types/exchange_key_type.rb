module Types
  ExchangeKeyType = GraphQL::ObjectType.define do
    name 'ExchangeKeyType'

    field :id, !types.ID
    field :userId, !types.ID, property: :user_id
    field :exchange, !types.String
    field :status, !types.String
    field :apiKey, !types.String, property: :api_key
    field :secretKey, !types.String, property: :secret_key
  end
end
