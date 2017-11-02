module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :testField, types.String do
      description "An example field added by the generator"
      resolve ->(obj, args, ctx) {
        "Hello World!"
      }
    end

    field :subreddit, Types::SubredditType do
      description "The subreddit that corresponds to the given subreddit id"
      resolve ->(obj, args, ctx) {
        Subreddit.find(args[:id])
      }
    end
  end
end
