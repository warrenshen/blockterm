module Types
  UserType = GraphQL::ObjectType.define do
    name 'UserType'

    field :id, !types.ID
    field :email, !types.String
    field :lastActiveAt, !types.String do
      description 'The last active datetime of user'

      resolve -> (obj, args, ctx) {
        QueryHelper::localize_timestamp(
          obj.last_active_at,
          'Pacific Time (US & Canada)',
        ).to_s
      }
    end

    field :earliestPortfolioTickerDate, types.String do
      description 'The date time of earliest portfolio ticker of user'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.portfolio_tickers,
          time_zone,
        )
      }
    end

    field :alerts, !types[Types::AlertType] do
      description 'The active (not triggered nor expired) alerts associated with user'

      resolve -> (obj, args, ctx) {
        obj.alerts.where(status: :active).where('expires_at > ?', DateTime.now)
      }
    end
    field :dashboardPages, !types[Types::DashboardPageType] do
      description 'The dashboard pages associated with user'

      resolve -> (obj, args, ctx) {
        obj.dashboard_pages.order(index: :asc)
      }
    end
    field :portfolioTickers, types[Types::PortfolioTickerType] do
      description 'Gets the portfolio tickers associated with current user'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_portfolio_tickers_by_time_range(
          obj.portfolio_tickers,
          args[:timeRange],
          7.days
        )
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
