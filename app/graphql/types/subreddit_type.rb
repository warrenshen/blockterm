module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String
    field :displayName, !types.String do
      description 'The display name of subreddit'

      resolve -> (obj, args, ctx) {
        obj.name_with_r
      }
    end
    field :startDate, !types.String do
      resolve -> (obj, args, ctx) {
        obj.start_date.to_s
      }
    end

    field :postCounts, types[Types::PostCountType] do
      description 'The page counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        time_range = args[:timeRange]
        today = Date.today
        clause = 'timestamp > ?'

        post_counts = obj.post_counts

        if time_range.nil? or args[:timeRange] == 'ONE_WEEK'
          post_counts = post_counts.where(clause, today - 7.days)
        elsif time_range == 'ONE_MONTH'
          post_counts = post_counts.where(clause, today - 1.month)
        elsif time_range == 'THREE_MONTHS'
          post_counts = post_counts.where(clause, today - 3.months)
        elsif time_range == 'ONE_YEAR'
          post_counts = post_counts.where(clause, today - 1.year)
        end

        post_counts.order(timestamp: :asc)
      }
    end

    field :subscriptionCounts, types[Types::SubscriptionCountType] do
      description 'The subscription counts associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.subscription_counts.order(timestamp: :asc)
      }
    end
  end
end
