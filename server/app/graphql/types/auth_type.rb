module Types
  AuthType = GraphQL::ObjectType.define do
    name 'AuthType'

    field :authToken, !types.String, property: :auth_token
    field :user, !Types::UserType
  end
end
