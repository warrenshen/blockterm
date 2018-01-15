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
      description 'The token users associated with user sorted by index'

      resolve -> (obj, args, ctx) {
        ForeignKeyLoader.for(TokenUser, :user_id).load([obj.id]).then do |token_users|
          token_users.sort_by do |token_user|
            token_user.index
          end
        end
      }
    end
  end
end
