module Types
  MentionTotalCountType = GraphQL::ObjectType.define do
    name 'MentionTotalCountType'

    field :subredditId, !types.ID, property: :subreddit_id
    field :count, !types.Int
    field :timestamp do
      type !types.String

      resolve -> (obj, args, ctx) {
        obj.timestamp.to_s
      }
    end
  end
end
