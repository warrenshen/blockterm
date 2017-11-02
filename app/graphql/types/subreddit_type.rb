module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String
  end
end
