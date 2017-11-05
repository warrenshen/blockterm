module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createSubreddit, Types::SubredditType do
      description 'Creates a subreddit'

      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        Subreddit.find_or_create_by(
          name: args[:name]
        )
      }
    end

    field :createSubscriptionCount, Types::SubscriptionCountType do
      description 'Creates a subscription count'

      argument :subreddit_id, !types.ID
      argument :count, !types.Int
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        SubscriptionCount.find_or_create(
          subreddit_id: args[:subreddit_id],
          count: args[:count],
          when: args[:when],
        )
      }
    end
  end
end
