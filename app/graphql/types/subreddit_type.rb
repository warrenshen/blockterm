module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String

    field :subscriptionCounts, types[Types::SubscriptionCountType] do
      description 'The subscription counts associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.subscription_counts
      }
    end
  end
end
