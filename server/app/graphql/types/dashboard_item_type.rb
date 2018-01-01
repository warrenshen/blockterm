module Types
  DashboardItemType = GraphQL::ObjectType.define do
    name 'DashboardItemType'

    field :id, !types.ID
    field :userId, !types.ID, property: :user_id
    field :identifier, !types.String
    field :static, !types.Boolean
    field :w, !types.Int
    field :h, !types.Int
    field :x, !types.Int
    field :y, !types.Int
  end
end
