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

        obj.post_counts.order(timestamp: :asc)
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
