module Types
  UserType = GraphQL::ObjectType.define do
    name 'UserType'

    field :id, !types.ID
    field :email, !types.String

    field :dashboardPages, !types[Types::DashboardPageType] do
      description 'The dashboard pages associated with user'

      resolve -> (obj, args, ctx) {
        obj.dashboard_pages.order(index: :asc)
      }
    end
    field :tokenUsers, !types[Types::TokenUserType] do
      description 'The token users associated with user'

      resolve -> (obj, args, ctx) {
        obj.token_users.order(index: :asc)
      }
    end

    field :tokenUsersBulk, !types[Types::TokenUserType] do
      resolve -> (obj, args, ctx) {
        ForeignKeyLoader.for(TokenUser, :user_id).load([obj.id])
      }
    end
  end
end
