module Types
  ActiveUserCountType = GraphQL::ObjectType.define do
    name 'ActiveUserCountType'

    field :id, !types.ID
    field :subredditId
  end
end
