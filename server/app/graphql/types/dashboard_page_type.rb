module Types
  DashboardPageType = GraphQL::ObjectType.define do
    name 'DashboardPageType'

    field :id, !types.ID
    field :userId, !types.ID, property: :user_id
    field :index, !types.Int
    field :name, !types.String

    field :dashboardItems, !types[Types::DashboardItemType] do
      description 'The dashboard items associated with dashboard page'

      resolve -> (obj, args, ctx) {
        ForeignKeyLoader.for(DashboardItem, :dashboard_page_id).load([obj.id])
      }
    end
  end
end
