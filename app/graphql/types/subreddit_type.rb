module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String

    field :postCounts, types[Types::PostCountType] do
      description 'The page counts associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.post_counts
      }
    end

    field :subscriptionCounts, types[Types::SubscriptionCountType] do
      description 'The subscription counts associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.subscription_counts
      }
    end
  end
end
