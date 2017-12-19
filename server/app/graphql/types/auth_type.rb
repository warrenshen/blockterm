module Types
  AuthType = GraphQL::ObjectType.define do
    name 'AuthType'

    field :email, !types.String
    field :authToken, !types.String, property: :auth_token
  end
end
