module Types
  TokenUserType = GraphQL::ObjectType.define do
    name 'TokenUserType'

    field :id, !types.ID
    field :tokenId, !types.ID, property: :token_id
    field :userId, !types.ID, property: :user_id
    field :index, !types.Int
    field :amount, !types.Float

    field :token, !Types::TokenType do
      'The token associated with token user'

      resolve -> (obj, args, ctx) {
        obj.token
      }
    end
  end
end
