module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createPostCount, Types::PostCountType do
      description 'Create a post count'

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        PostCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
        )
      }
    end

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

      argument :subredditId, !types.ID
      argument :count, !types.Int
      argument :when, !types.String

      resolve -> (obj, args, ctx) {
        SubscriptionCount.create(
          subreddit_id: args[:subredditId],
          count: args[:count],
          when: args[:when],
        )
      }
    end
  end
end
