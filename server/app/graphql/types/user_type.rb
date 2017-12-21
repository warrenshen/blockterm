module Types
  UserType = GraphQL::ObjectType.define do
  name 'UserType'

  field :id, !types.ID
  field :email, !types.String
  field :dashboardItems, !types[Types::DashboardItemType] do
    description 'The dashboard items associated with user'

    resolve -> (obj, args, ctx) {
      obj.dashboard_items
    }
    end
  end
end
