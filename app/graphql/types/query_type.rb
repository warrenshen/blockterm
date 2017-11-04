module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :subreddit, Types::SubredditType do
      description 'The subreddit that associated with given subreddit id'

      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        Subreddit.find(args[:id])
      }
    end
  end
end
